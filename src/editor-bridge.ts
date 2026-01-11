/**
 * Tanqory Editor Bridge
 * Enables element selection when running inside Tanqory Studio iframe
 */

interface ElementInfo {
  tagName: string;
  id?: string;
  className?: string;
  textContent?: string;
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  computedStyles: {
    color: string;
    backgroundColor: string;
    fontSize: string;
    fontWeight: string;
    padding: string;
    margin: string;
    borderRadius: string;
  };
  path: string[];
}

// Only run if inside iframe
if (window.parent !== window) {
  let selectedElement: HTMLElement | null = null;
  let highlightOverlay: HTMLDivElement | null = null;
  let hoverOverlay: HTMLDivElement | null = null;
  let labelElement: HTMLDivElement | null = null;

  function createOverlay(id: string, color: string): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.id = id;
    overlay.style.cssText = `
      position: fixed;
      pointer-events: none;
      border: 2px solid ${color};
      background: ${color}20;
      z-index: 999999;
      transition: all 0.1s ease;
      display: none;
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  function createLabel(): HTMLDivElement {
    const label = document.createElement('div');
    label.id = '__tanqory_label';
    label.style.cssText = `
      position: fixed;
      background: #0ea5e9;
      color: white;
      padding: 2px 8px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 4px;
      z-index: 1000000;
      pointer-events: none;
      display: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    document.body.appendChild(label);
    return label;
  }

  function getElementPath(el: HTMLElement): string[] {
    const path: string[] = [];
    let current: HTMLElement | null = el;
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      if (current.id) {
        selector += '#' + current.id;
      } else if (current.className && typeof current.className === 'string') {
        const classes = current.className.trim().split(/\s+/).slice(0, 2).join('.');
        if (classes) selector += '.' + classes;
      }
      path.unshift(selector);
      current = current.parentElement;
    }
    return path;
  }

  function getElementInfo(el: HTMLElement): ElementInfo {
    const rect = el.getBoundingClientRect();
    const styles = window.getComputedStyle(el);

    return {
      tagName: el.tagName.toLowerCase(),
      id: el.id || undefined,
      className: el.className || undefined,
      textContent: el.textContent ? el.textContent.slice(0, 100) : undefined,
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
      computedStyles: {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        padding: styles.padding,
        margin: styles.margin,
        borderRadius: styles.borderRadius,
      },
      path: getElementPath(el),
    };
  }

  function updateOverlay(
    overlay: HTMLDivElement | null,
    rect: DOMRect | { top: number; left: number; width: number; height: number } | null,
    show: boolean
  ): void {
    if (!overlay || !show || !rect) {
      if (overlay) overlay.style.display = 'none';
      return;
    }
    overlay.style.display = 'block';
    overlay.style.top = rect.top + 'px';
    overlay.style.left = rect.left + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';
  }

  function updateLabel(
    el: HTMLElement | null,
    rect: DOMRect | { top: number; left: number; width: number; height: number } | null
  ): void {
    if (!labelElement || !el || !rect) {
      if (labelElement) labelElement.style.display = 'none';
      return;
    }
    labelElement.textContent = el.tagName.toLowerCase();
    labelElement.style.display = 'block';
    labelElement.style.top = Math.max(0, rect.top - 24) + 'px';
    labelElement.style.left = rect.left + 'px';
  }

  // Initialize overlays
  highlightOverlay = createOverlay('__tanqory_highlight', '#0ea5e9');
  hoverOverlay = createOverlay('__tanqory_hover', '#94a3b8');
  labelElement = createLabel();

  // Click handler
  document.addEventListener(
    'click',
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      selectedElement = e.target as HTMLElement;
      const info = getElementInfo(selectedElement);

      updateOverlay(highlightOverlay, info.rect, true);
      updateLabel(selectedElement, info.rect);
      updateOverlay(hoverOverlay, null, false);

      // Send to parent
      window.parent.postMessage(
        {
          type: 'TANQORY_ELEMENT_SELECT',
          payload: info,
        },
        '*'
      );
    },
    true
  );

  // Hover handler
  document.addEventListener(
    'mouseover',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target === selectedElement) return;
      const rect = target.getBoundingClientRect();
      updateOverlay(hoverOverlay, rect, true);
    },
    true
  );

  document.addEventListener(
    'mouseout',
    () => {
      updateOverlay(hoverOverlay, null, false);
    },
    true
  );

  // Listen for commands from parent
  window.addEventListener('message', (e: MessageEvent) => {
    if (e.data.type === 'TANQORY_DESELECT') {
      selectedElement = null;
      updateOverlay(highlightOverlay, null, false);
      updateLabel(null, null);
    }
    if (e.data.type === 'TANQORY_SELECT_PARENT' && selectedElement?.parentElement) {
      selectedElement = selectedElement.parentElement;
      const info = getElementInfo(selectedElement);
      updateOverlay(highlightOverlay, info.rect, true);
      updateLabel(selectedElement, info.rect);
      window.parent.postMessage(
        {
          type: 'TANQORY_ELEMENT_SELECT',
          payload: info,
        },
        '*'
      );
    }
  });

  // Notify parent that editor bridge is ready
  window.parent.postMessage({ type: 'TANQORY_EDITOR_READY' }, '*');
  console.log('[Tanqory] Editor bridge initialized - element selection enabled');
}

export {};
