/**
 * Sync Server for Tanqory Starter Theme
 *
 * This server handles file synchronization from Studio API.
 * It runs alongside the Vite dev server.
 *
 * Usage:
 *   npx ts-node sync-server.ts
 *
 * Or add to package.json:
 *   "sync": "ts-node sync-server.ts"
 */

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const PORT = 3001;
const SYNC_SECRET = process.env.SYNC_SECRET || 'tanqory-sync-secret';
const PROJECT_ROOT = process.cwd();

interface SyncFile {
  path: string;
  content: string;
  checksum: string;
}

interface SyncRequest {
  files: SyncFile[];
}

/**
 * Verify HMAC signature
 */
function verifySignature(projectId: string, timestamp: number, signature: string): boolean {
  const now = Date.now();
  // Allow 5 minutes clock skew
  if (Math.abs(now - timestamp) > 5 * 60 * 1000) {
    return false;
  }

  const payload = `${projectId}:${timestamp}`;
  const expectedSignature = crypto
    .createHmac('sha256', SYNC_SECRET)
    .update(payload)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    );
  } catch {
    return false;
  }
}

/**
 * Calculate MD5 checksum
 */
function calculateChecksum(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Ensure directory exists
 */
function ensureDir(filePath: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Handle sync request
 */
async function handleSync(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  // Verify signature
  const projectId = req.headers['x-sync-project'] as string;
  const timestamp = parseInt(req.headers['x-sync-timestamp'] as string, 10);
  const signature = req.headers['x-sync-signature'] as string;

  if (!projectId || !timestamp || !signature) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Missing authentication headers' }));
    return;
  }

  if (!verifySignature(projectId, timestamp, signature)) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid signature' }));
    return;
  }

  // Parse body
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }

  let data: SyncRequest;
  try {
    data = JSON.parse(body);
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON' }));
    return;
  }

  // Process files
  let updated = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const file of data.files) {
    try {
      const fullPath = path.join(PROJECT_ROOT, file.path);

      // Check if file exists and has same checksum
      if (fs.existsSync(fullPath)) {
        const existingContent = fs.readFileSync(fullPath, 'utf-8');
        const existingChecksum = calculateChecksum(existingContent);

        if (existingChecksum === file.checksum) {
          skipped++;
          continue;
        }
      }

      // Write file
      ensureDir(fullPath);
      fs.writeFileSync(fullPath, file.content, 'utf-8');
      updated++;

      console.log(`[Sync] Updated: ${file.path}`);
    } catch (error: any) {
      errors.push(`${file.path}: ${error.message}`);
    }
  }

  console.log(`[Sync] Complete: ${updated} updated, ${skipped} skipped`);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ updated, skipped, errors }));
}

/**
 * Handle export request (get all files)
 */
async function handleExport(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  // Verify signature
  const projectId = req.headers['x-sync-project'] as string;
  const timestamp = parseInt(req.headers['x-sync-timestamp'] as string, 10);
  const signature = req.headers['x-sync-signature'] as string;

  if (!projectId || !timestamp || !signature) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Missing authentication headers' }));
    return;
  }

  if (!verifySignature(projectId, timestamp, signature)) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid signature' }));
    return;
  }

  // Collect all source files
  const files: Array<{ path: string; content: string }> = [];
  const srcDir = path.join(PROJECT_ROOT, 'src');

  function walkDir(dir: string, basePath: string = ''): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
          walkDir(fullPath, relativePath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        const sourceExts = ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html', '.md'];

        if (sourceExts.includes(ext)) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          files.push({ path: `src/${relativePath}`, content });
        }
      }
    }
  }

  if (fs.existsSync(srcDir)) {
    walkDir(srcDir);
  }

  console.log(`[Export] Sending ${files.length} files`);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ files }));
}

/**
 * Main server
 */
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Sync-Project, X-Sync-Timestamp, X-Sync-Signature');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);

  if (req.method === 'POST' && url.pathname === '/api/sync') {
    await handleSync(req, res);
  } else if (req.method === 'GET' && url.pathname === '/api/sync/export') {
    await handleExport(req, res);
  } else if (req.method === 'GET' && url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`[Sync Server] Running on http://localhost:${PORT}`);
  console.log(`[Sync Server] Endpoints:`);
  console.log(`  POST /api/sync        - Receive file updates`);
  console.log(`  GET  /api/sync/export - Export all files`);
  console.log(`  GET  /api/health      - Health check`);
});
