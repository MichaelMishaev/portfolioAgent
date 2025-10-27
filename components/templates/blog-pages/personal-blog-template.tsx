"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FiSearch,
  FiCalendar,
  FiClock,
  FiTag,
  FiArrowRight,
  FiMail,
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiBookmark,
  FiTrendingUp,
  FiHeart,
  FiMessageCircle,
  FiDownload,
  FiStar,
  FiAward,
} from "react-icons/fi";
import Link from "next/link";

const blogData = {
  author: {
    name: "Sarah Mitchell",
    bio: "Writer, designer, and creative thinker sharing insights on design, productivity, and life.",
    fullBio: "Sarah is a designer and writer with over 10 years of experience in digital product design. She's passionate about creating intuitive user experiences and sharing her knowledge with the creative community. When she's not designing, you can find her exploring coffee shops or reading design books.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    stats: {
      articles: "124",
      subscribers: "12.5K",
      views: "1.2M",
    },
    social: {
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  featured: {
    title: "The Art of Minimalist Design in 2025",
    excerpt: "Exploring how less is truly more in modern digital design, and why embracing simplicity can lead to more impactful user experiences.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop",
    category: "Design",
    date: "Jan 15, 2025",
    readTime: "8 min read",
    slug: "minimalist-design-2025",
  },
  posts: [
    {
      id: 1,
      title: "Building Better User Interfaces",
      excerpt: "A comprehensive guide to creating intuitive and beautiful user interfaces that users love.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
      category: "Design",
      date: "Jan 12, 2025",
      readTime: "6 min read",
      slug: "building-better-ui",
      views: "2.4K",
      likes: 127,
    },
    {
      id: 2,
      title: "Productivity Hacks for Designers",
      excerpt: "Simple techniques to boost your productivity and maintain creative flow throughout the day.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
      category: "Productivity",
      date: "Jan 10, 2025",
      readTime: "5 min read",
      slug: "productivity-hacks",
      views: "1.8K",
      likes: 94,
    },
    {
      id: 3,
      title: "The Future of Web Development",
      excerpt: "Exploring emerging trends and technologies shaping the future of web development.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
      category: "Development",
      date: "Jan 8, 2025",
      readTime: "7 min read",
      slug: "future-web-dev",
      views: "3.1K",
      likes: 156,
    },
    {
      id: 4,
      title: "Typography That Tells a Story",
      excerpt: "How to choose and pair fonts that enhance your message and create visual harmony.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
      category: "Design",
      date: "Jan 5, 2025",
      readTime: "4 min read",
      slug: "typography-story",
      views: "1.5K",
      likes: 82,
    },
    {
      id: 5,
      title: "Remote Work: A Year in Review",
      excerpt: "Lessons learned and best practices from a year of working remotely as a creative professional.",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&h=400&fit=crop",
      category: "Lifestyle",
      date: "Jan 3, 2025",
      readTime: "6 min read",
      slug: "remote-work-review",
      views: "2.7K",
      likes: 143,
    },
    {
      id: 6,
      title: "Color Theory for Beginners",
      excerpt: "Understanding the basics of color theory and how to apply it in your design work.",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop",
      category: "Design",
      date: "Dec 28, 2024",
      readTime: "5 min read",
      slug: "color-theory",
      views: "2.2K",
      likes: 118,
    },
    {
      id: 7,
      title: "Mastering CSS Grid Layouts",
      excerpt: "A deep dive into CSS Grid and how to create responsive, flexible layouts with ease.",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop",
      category: "Development",
      date: "Dec 25, 2024",
      readTime: "8 min read",
      slug: "css-grid-mastery",
      views: "3.5K",
      likes: 189,
    },
    {
      id: 8,
      title: "Design Systems 101",
      excerpt: "Building and maintaining consistent design systems that scale with your product.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
      category: "Design",
      date: "Dec 22, 2024",
      readTime: "9 min read",
      slug: "design-systems",
      views: "4.2K",
      likes: 234,
    },
    {
      id: 9,
      title: "Accessibility Best Practices",
      excerpt: "Creating inclusive digital experiences that work for everyone, regardless of ability.",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
      category: "Development",
      date: "Dec 20, 2024",
      readTime: "7 min read",
      slug: "accessibility-practices",
      views: "2.9K",
      likes: 167,
    },
    {
      id: 10,
      title: "The Power of Micro-interactions",
      excerpt: "Small animations and interactions that create delightful user experiences.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      category: "Design",
      date: "Dec 18, 2024",
      readTime: "5 min read",
      slug: "micro-interactions",
      views: "3.3K",
      likes: 201,
    },
    {
      id: 11,
      title: "Work-Life Balance Tips",
      excerpt: "Maintaining mental health and productivity in the fast-paced creative industry.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
      category: "Lifestyle",
      date: "Dec 15, 2024",
      readTime: "6 min read",
      slug: "work-life-balance",
      views: "1.9K",
      likes: 103,
    },
    {
      id: 12,
      title: "Mobile-First Design Approach",
      excerpt: "Why starting with mobile constraints leads to better overall design decisions.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      category: "Design",
      date: "Dec 12, 2024",
      readTime: "6 min read",
      slug: "mobile-first",
      views: "2.6K",
      likes: 145,
    },
  ],
  categories: ["All", "Design", "Development", "Productivity", "Lifestyle"],
  popularPosts: [
    { id: 1, title: "The Art of Minimalist Design in 2025", views: "12.5K" },
    { id: 2, title: "Design Systems 101", views: "4.2K" },
    { id: 3, title: "Mastering CSS Grid Layouts", views: "3.5K" },
    { id: 4, title: "The Power of Micro-interactions", views: "3.3K" },
  ],
  tags: [
    "Design", "Development", "UI/UX", "Typography", "CSS", "JavaScript",
    "Productivity", "Remote Work", "Accessibility", "Web Design",
  ],
  testimonials: [
    {
      id: 1,
      name: "Emily Chen",
      role: "Product Designer at Stripe",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      quote: "Sarah's articles have been instrumental in shaping my approach to user interface design. Her insights are practical, actionable, and always backed by real experience.",
    },
    {
      id: 2,
      name: "Michael Torres",
      role: "Frontend Developer at Airbnb",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      quote: "The technical depth combined with design thinking makes this blog unique. It's my go-to resource for staying current with web development trends.",
    },
    {
      id: 3,
      name: "Lisa Anderson",
      role: "Creative Director at Adobe",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      quote: "Refreshingly honest and insightful content. Sarah has a gift for breaking down complex topics into digestible, engaging stories.",
    },
  ],
  resources: [
    {
      id: 1,
      title: "Design System Starter Kit",
      description: "A comprehensive starter template for building your own design system with components and documentation.",
      downloads: "2.3K",
      size: "12 MB",
      icon: <FiLayers className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Color Palette Generator",
      description: "Free tool to generate accessible color palettes with WCAG compliance checking built-in.",
      downloads: "5.1K",
      size: "2 MB",
      icon: <FiZap className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Typography Pairing Guide",
      description: "Curated collection of 50+ beautiful font combinations with usage examples and tips.",
      downloads: "3.8K",
      size: "8 MB",
      icon: <FiBookOpen className="w-6 h-6" />,
    },
  ],
};

export function PersonalBlogTemplate() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Sarah Mitchell
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#blog" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Blog
            </a>
            <a href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#resources" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Resources
            </a>
            <a href="#newsletter" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Newsletter
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero / About Section */}
      <section className="bg-white py-16 border-b">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src={blogData.author.avatar}
                alt={blogData.author.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
              />
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">{blogData.author.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{blogData.author.bio}</p>
                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <a
                    href={blogData.author.social.twitter}
                    className="p-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <FiTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href={blogData.author.social.github}
                    className="p-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <FiGithub className="w-5 h-5" />
                  </a>
                  <a
                    href={blogData.author.social.linkedin}
                    className="p-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                </div>
                <div className="flex items-center gap-6 justify-center md:justify-start text-sm">
                  <div>
                    <div className="font-bold text-lg">{blogData.author.stats.articles}</div>
                    <div className="text-gray-500">Articles</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{blogData.author.stats.subscribers}</div>
                    <div className="text-gray-500">Subscribers</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{blogData.author.stats.views}</div>
                    <div className="text-gray-500">Total Views</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <ScrollReveal>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-0 shadow-lg">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-80 md:h-auto">
                  <img
                    src={blogData.featured.image}
                    alt={blogData.featured.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600">{blogData.featured.category}</Badge>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <Badge variant="outline" className="mb-4">Featured</Badge>
                    <h2 className="text-3xl font-bold mb-4 leading-tight">{blogData.featured.title}</h2>
                    <p className="text-gray-600 mb-6 text-lg">{blogData.featured.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      {blogData.featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {blogData.featured.readTime}
                    </span>
                  </div>
                  <Button className="w-fit">
                    Read Article
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section id="blog" className="py-8 bg-gray-50 border-t">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {blogData.categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="flex-shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid with Sidebar */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-8">
                {blogData.posts.map((post, index) => (
                  <ScrollReveal key={post.id} delay={index * 0.1}>
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group border-0 shadow">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900 hover:bg-white">
                          <FiTag className="w-3 h-3 mr-1" />
                          {post.category}
                        </Badge>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors">
                            <FiBookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-4 h-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                          <span className="flex items-center gap-1">
                            <FiHeart className="w-4 h-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiTrendingUp className="w-4 h-4" />
                            {post.views}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Popular Posts */}
              <Card className="border-0 shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FiTrendingUp className="w-5 h-5 text-blue-600" />
                    Popular Posts
                  </h3>
                  <div className="space-y-4">
                    {blogData.popularPosts.map((post) => (
                      <div key={post.id} className="group cursor-pointer">
                        <h4 className="font-semibold text-sm group-hover:text-blue-600 transition-colors mb-1">
                          {post.title}
                        </h4>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <FiTrendingUp className="w-3 h-3" />
                          {post.views} views
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags Cloud */}
              <Card className="border-0 shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FiTag className="w-5 h-5 text-blue-600" />
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blogData.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Widget */}
              <Card className="border-0 shadow bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <CardContent className="p-6">
                  <FiMail className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Never Miss an Update</h3>
                  <p className="text-blue-100 mb-4 text-sm">
                    Get the latest articles delivered to your inbox weekly.
                  </p>
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mb-3"
                  />
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Readers Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of designers and developers who trust this blog
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogData.testimonials.map((testimonial) => (
              <ScrollReveal key={testimonial.id}>
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                    <div className="flex gap-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Free Resources</h2>
            <p className="text-xl text-gray-600">
              Downloadable tools and templates to help you in your creative journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogData.resources.map((resource) => (
              <ScrollReveal key={resource.id}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <FiDownload className="w-4 h-4" />
                        {resource.downloads} downloads
                      </span>
                      <span>{resource.size}</span>
                    </div>
                    <Button className="w-full">
                      <FiDownload className="mr-2 w-4 h-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">About Sarah</h2>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  {blogData.author.fullBio}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FiAward className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">10+ years of experience in design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <FiBookOpen className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">124 articles published</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                      <FiHeart className="w-4 h-4 text-pink-600" />
                    </div>
                    <span className="text-gray-700">12.5K+ newsletter subscribers</span>
                  </div>
                </div>
                <Button size="lg">
                  <FiMail className="mr-2 w-5 h-5" />
                  Get in Touch
                </Button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"
                  alt="About Sarah"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-1">1.2M+</div>
                  <div className="text-sm text-gray-600">Total Article Views</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <ScrollReveal>
            <FiMail className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="text-4xl font-bold text-white mb-4">Join the Newsletter</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the latest articles and insights delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-blue-100 mt-4">No spam. Unsubscribe anytime.</p>
            <div className="flex items-center justify-center gap-8 mt-8 text-white">
              <div>
                <div className="text-2xl font-bold">{blogData.author.stats.subscribers}</div>
                <div className="text-sm text-blue-100">Subscribers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{blogData.author.stats.articles}</div>
                <div className="text-sm text-blue-100">Articles</div>
              </div>
              <div>
                <div className="text-2xl font-bold">Weekly</div>
                <div className="text-sm text-blue-100">Frequency</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="text-2xl font-bold mb-2">{blogData.author.name}</p>
              <p className="text-gray-600 text-sm mb-4">
                Sharing insights on design, development, and creativity.
              </p>
              <div className="flex items-center gap-3">
                <a href={blogData.author.social.twitter} className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FiTwitter className="w-5 h-5" />
                </a>
                <a href={blogData.author.social.github} className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FiGithub className="w-5 h-5" />
                </a>
                <a href={blogData.author.social.linkedin} className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Design</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Development</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Productivity</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Lifestyle</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Free Downloads</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Design Tools</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Me</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Use</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-gray-600">
            <p>© 2025 {blogData.author.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
