import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface BlogPost {
  id: string;
  title: string;
  handle: string;
  excerpt?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
}

export interface FeaturedBlogPostsProps {
  // Content
  title?: string;
  posts?: BlogPost[];

  // Layout
  columns?: number;
  sectionWidth?: 'page' | 'full';
  gap?: number;

  // Display
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;

  // Appearance
  colorScheme?: 'light' | 'dark';
  imageRatio?: '1:1' | '4:3' | '16:9';

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
}

// =============================================================================
// Component
// =============================================================================

export function FeaturedBlogPosts({
  title,
  posts = [],
  columns = 3,
  sectionWidth = 'page',
  gap = 24,
  showExcerpt = true,
  showAuthor = true,
  showDate = true,
  colorScheme = 'light',
  imageRatio = '16:9',
  paddingTop = 48,
  paddingBottom = 48,
}: FeaturedBlogPostsProps) {
  const ratioClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
  };

  // Default posts if empty
  const displayPosts: BlogPost[] = posts.length > 0 ? posts : [
    {
      id: '1',
      title: 'Blog Post Title 1',
      handle: 'post-1',
      excerpt: 'A short description of the blog post content...',
      author: 'Author Name',
      publishedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Blog Post Title 2',
      handle: 'post-2',
      excerpt: 'A short description of the blog post content...',
      author: 'Author Name',
      publishedAt: '2024-01-10',
    },
    {
      id: '3',
      title: 'Blog Post Title 3',
      handle: 'post-3',
      excerpt: 'A short description of the blog post content...',
      author: 'Author Name',
      publishedAt: '2024-01-05',
    },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section
      className={cn(
        colorScheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      )}
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >
      <div className={cn(
        sectionWidth === 'page' ? 'container mx-auto px-4' : 'px-4'
      )}>
        {/* Header */}
        {title && (
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
        )}

        {/* Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: `${gap}px`,
          }}
        >
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blogs/${post.handle}`}
              className="group"
            >
              <article className="flex flex-col gap-4">
                {/* Image */}
                <div className={cn(
                  'overflow-hidden rounded-lg bg-gray-100',
                  ratioClasses[imageRatio]
                )}>
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  {/* Meta */}
                  {(showAuthor || showDate) && (
                    <div className="flex items-center gap-2 text-sm opacity-60">
                      {showAuthor && post.author && (
                        <span>{post.author}</span>
                      )}
                      {showAuthor && showDate && post.author && post.publishedAt && (
                        <span>•</span>
                      )}
                      {showDate && post.publishedAt && (
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-semibold text-lg group-hover:underline">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {showExcerpt && post.excerpt && (
                    <p className="text-sm opacity-70 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const featuredBlogPostsDefinition = {
  id: 'featured-blog-posts',
  name: 'Featured Blog Posts',
  description: 'Showcase blog posts in a grid layout',
  category: 'content',
  icon: 'FileText',

  propsSchema: [
    // Content
    { type: 'header', label: 'Content' },
    { name: 'title', label: 'Title', type: 'text' },

    // Layout
    { type: 'header', label: 'Layout' },
    { name: 'columns', label: 'Columns', type: 'range', min: 1, max: 4, default: 3 },
    {
      name: 'sectionWidth',
      label: 'Width',
      type: 'select',
      options: [
        { value: 'page', label: 'Page Width' },
        { value: 'full', label: 'Full Width' },
      ],
      default: 'page'
    },
    { name: 'gap', label: 'Gap', type: 'range', min: 8, max: 48, default: 24 },
    {
      name: 'imageRatio',
      label: 'Image Ratio',
      type: 'select',
      options: [
        { value: '1:1', label: 'Square (1:1)' },
        { value: '4:3', label: 'Standard (4:3)' },
        { value: '16:9', label: 'Wide (16:9)' },
      ],
      default: '16:9'
    },

    // Display
    { type: 'header', label: 'Display' },
    { name: 'showExcerpt', label: 'Show Excerpt', type: 'checkbox', default: true },
    { name: 'showAuthor', label: 'Show Author', type: 'checkbox', default: true },
    { name: 'showDate', label: 'Show Date', type: 'checkbox', default: true },

    // Appearance
    { type: 'header', label: 'Appearance' },
    {
      name: 'colorScheme',
      label: 'Color Scheme',
      type: 'select',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'light'
    },

    // Spacing
    { type: 'header', label: 'Spacing' },
    { name: 'paddingTop', label: 'Top Padding', type: 'range', min: 0, max: 100, default: 48 },
    { name: 'paddingBottom', label: 'Bottom Padding', type: 'range', min: 0, max: 100, default: 48 },
  ],

  defaultProps: {
    columns: 3,
    showExcerpt: true,
    showAuthor: true,
    showDate: true,
    colorScheme: 'light',
  },

  component: FeaturedBlogPosts,
};
