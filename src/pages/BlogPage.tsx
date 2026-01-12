import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';

interface BlogPost {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  image?: string;
  author: string;
  publishedAt: string;
  tags?: string[];
}

// Mock blog posts - in real app, this would come from API
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Sustainable Fashion',
    handle: 'sustainable-fashion',
    excerpt: 'Discover how sustainable practices are reshaping the fashion industry and what you can do to make a difference.',
    author: 'Emma Wilson',
    publishedAt: '2024-01-15',
    tags: ['Sustainability', 'Fashion'],
  },
  {
    id: '2',
    title: 'Spring Collection 2024: What to Expect',
    handle: 'spring-collection-2024',
    excerpt: 'Get a sneak peek at our upcoming spring collection featuring fresh colors and innovative designs.',
    author: 'Michael Chen',
    publishedAt: '2024-01-10',
    tags: ['Collections', 'New Arrivals'],
  },
  {
    id: '3',
    title: 'How to Style Your Basics',
    handle: 'style-your-basics',
    excerpt: 'Learn the art of creating stunning outfits using just your wardrobe essentials.',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-05',
    tags: ['Style Tips', 'Fashion'],
  },
  {
    id: '4',
    title: 'Behind the Scenes: Our Manufacturing Process',
    handle: 'manufacturing-process',
    excerpt: 'Take a tour of our ethical manufacturing facilities and meet the artisans behind your favorite products.',
    author: 'David Park',
    publishedAt: '2024-01-01',
    tags: ['Behind the Scenes', 'Sustainability'],
  },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stories, tips, and inspiration from our team
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts[0] && (
          <Link
            to={`/blog/${blogPosts[0].handle}`}
            className="block mb-12 group"
          >
            <article className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                {blogPosts[0].image ? (
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>{blogPosts[0].author}</span>
                  <span>•</span>
                  <time dateTime={blogPosts[0].publishedAt}>
                    {formatDate(blogPosts[0].publishedAt)}
                  </time>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:underline">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                {blogPosts[0].tags && (
                  <div className="flex flex-wrap gap-2">
                    {blogPosts[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Link>
        )}

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.handle}`}
              className="group"
            >
              <article>
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden mb-4">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{post.author}</span>
                  <span>•</span>
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:underline">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
