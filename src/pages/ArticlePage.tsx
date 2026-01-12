import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Facebook, Twitter } from 'lucide-react';
import { Layout } from '../components/layout/Layout';

interface Article {
  id: string;
  title: string;
  handle: string;
  content: string;
  excerpt: string;
  image?: string;
  author: string;
  publishedAt: string;
  tags?: string[];
}

// Mock article data - in real app, this would come from API
const articles: Record<string, Article> = {
  'sustainable-fashion': {
    id: '1',
    title: 'The Art of Sustainable Fashion',
    handle: 'sustainable-fashion',
    excerpt: 'Discover how sustainable practices are reshaping the fashion industry.',
    content: `
      <p>Sustainable fashion is more than just a trend—it's a movement that's reshaping how we think about clothing and its impact on our planet. In this article, we explore the key principles of sustainable fashion and how you can make more conscious choices.</p>

      <h2>What is Sustainable Fashion?</h2>
      <p>Sustainable fashion refers to clothing that is designed, manufactured, distributed, and used in ways that are environmentally friendly. This includes using eco-friendly materials, reducing waste, and ensuring fair labor practices throughout the supply chain.</p>

      <h2>Key Principles</h2>
      <ul>
        <li><strong>Quality over quantity:</strong> Invest in well-made pieces that last longer</li>
        <li><strong>Natural materials:</strong> Choose organic cotton, linen, and recycled fabrics</li>
        <li><strong>Ethical production:</strong> Support brands that pay fair wages</li>
        <li><strong>Circular fashion:</strong> Embrace recycling, upcycling, and secondhand shopping</li>
      </ul>

      <h2>Making a Difference</h2>
      <p>Every purchase is a vote for the kind of world you want to live in. By choosing sustainable fashion, you're not just updating your wardrobe—you're contributing to a healthier planet and more equitable industry.</p>
    `,
    author: 'Emma Wilson',
    publishedAt: '2024-01-15',
    tags: ['Sustainability', 'Fashion'],
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ArticlePage() {
  const { handle } = useParams<{ handle: string }>();
  const article = handle ? articles[handle] : null;

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-black hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article header */}
        <header className="max-w-3xl mx-auto text-center mb-12">
          {article.tags && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-600">
            <span>By {article.author}</span>
            <span>•</span>
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </div>
        </header>

        {/* Featured image */}
        {article.image ? (
          <div className="max-w-4xl mx-auto mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full rounded-lg"
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
          </div>
        )}

        {/* Article content */}
        <div
          className="max-w-3xl mx-auto prose prose-lg"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Share buttons */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Share this article:</span>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Copy link"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </article>
    </Layout>
  );
}
