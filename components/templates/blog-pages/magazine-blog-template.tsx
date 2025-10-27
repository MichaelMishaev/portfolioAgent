"use client";

import { useState } from "react";
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
  FiBookmark,
  FiTrendingUp,
  FiUser,
  FiMessageCircle,
  FiShare2,
  FiChevronRight,
  FiFilter,
} from "react-icons/fi";
import Link from "next/link";

const magazineData = {
  featured: [
    {
      id: 1,
      title: "The Complete Guide to Modern Web Performance",
      excerpt: "Deep dive into performance optimization techniques that matter in 2025. Learn how to make your websites blazingly fast.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop",
      category: "Development",
      author: {
        name: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      date: "Jan 18, 2025",
      readTime: "12 min",
      comments: 45,
      featured: true,
    },
    {
      id: 2,
      title: "Designing for Accessibility: A Practical Framework",
      excerpt: "Make your designs inclusive for everyone with this comprehensive accessibility guide.",
      image: "https://images.unsplash.com/photo-1558403194-611308249627?w=600&h=400&fit=crop",
      category: "Design",
      author: {
        name: "Emma Chen",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
      },
      date: "Jan 17, 2025",
      readTime: "10 min",
      comments: 32,
    },
  ],
  trending: [
    {
      id: 3,
      title: "AI Tools That Changed My Design Workflow",
      category: "Tools",
      author: "Marcus Wong",
      readTime: "8 min",
      views: "12.5K",
    },
    {
      id: 4,
      title: "Building Scalable Design Systems from Scratch",
      category: "Design",
      author: "Lisa Park",
      readTime: "15 min",
      views: "10.2K",
    },
    {
      id: 5,
      title: "The Future of CSS: What's Coming in 2025",
      category: "Development",
      author: "David Kim",
      readTime: "7 min",
      views: "9.8K",
    },
  ],
  latest: [
    {
      id: 6,
      title: "Micro-interactions: The Details That Make a Difference",
      excerpt: "Small animations and interactions can transform the user experience. Here's how to get them right.",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
      category: "UX Design",
      author: {
        name: "Sarah Thompson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
      date: "Jan 16, 2025",
      readTime: "9 min",
      comments: 28,
    },
    {
      id: 7,
      title: "Server Components vs Client Components: A Complete Guide",
      excerpt: "Understanding the difference and when to use each in your Next.js applications.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      category: "Development",
      author: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      date: "Jan 15, 2025",
      readTime: "11 min",
      comments: 52,
    },
    {
      id: 8,
      title: "Color Psychology in Product Design",
      excerpt: "How color choices influence user behavior and emotion in digital products.",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop",
      category: "Design",
      author: {
        name: "Nina Patel",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
      },
      date: "Jan 14, 2025",
      readTime: "6 min",
      comments: 19,
    },
    {
      id: 9,
      title: "TypeScript Best Practices for Large Codebases",
      excerpt: "Proven patterns and practices for maintaining type safety in enterprise applications.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
      category: "Development",
      author: {
        name: "Robert Chang",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      },
      date: "Jan 13, 2025",
      readTime: "14 min",
      comments: 67,
    },
  ],
  categories: [
    { name: "All", count: 234 },
    { name: "Design", count: 89 },
    { name: "Development", count: 102 },
    { name: "UX Design", count: 43 },
    { name: "Tools", count: 31 },
    { name: "Career", count: 28 },
  ],
  editors: [
    {
      name: "Alex Rivera",
      role: "Editor in Chief",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      articles: 45,
    },
    {
      name: "Emma Chen",
      role: "Design Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
      articles: 38,
    },
    {
      name: "Sarah Thompson",
      role: "UX Writer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      articles: 52,
    },
  ],
};

export function MagazineBlogTemplate() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-6 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FiTrendingUp className="w-4 h-4" />
              Trending Now
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>Jan 18, 2025</span>
            <span>|</span>
            <a href="#newsletter" className="hover:text-blue-400 transition-colors">Subscribe</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-3xl font-bold">
              CREATIVE<span className="text-blue-600">MAG</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 w-64"
                />
              </div>
              <Button size="sm">Write</Button>
            </div>
          </div>
          <nav className="flex items-center gap-6 text-sm overflow-x-auto">
            {["Latest", "Trending", "Design", "Development", "UX", "Tools", "Career"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-medium hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero - Featured Articles */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main Featured */}
            <FadeIn>
              <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all group">
                <div className="relative h-96">
                  <img
                    src={magazineData.featured[0].image}
                    alt={magazineData.featured[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <Badge className="mb-4 bg-blue-600">{magazineData.featured[0].category}</Badge>
                    <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
                      {magazineData.featured[0].title}
                    </h2>
                    <p className="text-gray-200 mb-4">{magazineData.featured[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <div className="flex items-center gap-2">
                        <img
                          src={magazineData.featured[0].author.avatar}
                          alt={magazineData.featured[0].author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{magazineData.featured[0].author.name}</span>
                      </div>
                      <span>•</span>
                      <span>{magazineData.featured[0].readTime} read</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiMessageCircle className="w-4 h-4" />
                        {magazineData.featured[0].comments}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            {/* Secondary Featured + Trending */}
            <div className="space-y-8">
              <FadeIn delay={0.1}>
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="relative h-64">
                      <img
                        src={magazineData.featured[1].image}
                        alt={magazineData.featured[1].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <Badge variant="outline" className="w-fit mb-3">{magazineData.featured[1].category}</Badge>
                      <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                        {magazineData.featured[1].title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <img
                          src={magazineData.featured[1].author.avatar}
                          alt={magazineData.featured[1].author.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{magazineData.featured[1].readTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>

              {/* Trending List */}
              <FadeIn delay={0.2}>
                <Card className="p-6 border-0 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <FiTrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold">Trending Articles</h3>
                  </div>
                  <div className="space-y-4">
                    {magazineData.trending.map((article, idx) => (
                      <div key={article.id} className="flex items-start gap-3 group cursor-pointer">
                        <span className="text-3xl font-bold text-gray-200">{String(idx + 1).padStart(2, '0')}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Badge variant="outline" className="text-xs">{article.category}</Badge>
                            <span>•</span>
                            <span>{article.readTime}</span>
                            <span>•</span>
                            <span>{article.views} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-y">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {magazineData.categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    selectedCategory === cat.name
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <FiFilter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <Button variant="ghost">
              View All
              <FiChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {magazineData.latest.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 0.05}>
                <Card className="overflow-hidden border hover:shadow-xl transition-all group">
                  <div className="flex gap-6">
                    <div className="w-1/3 flex-shrink-0">
                      <div className="relative h-full min-h-[200px]">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1">
                      <Badge variant="outline" className="mb-3">{article.category}</Badge>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium">{article.author.name}</p>
                            <p className="text-xs text-gray-500">{article.date} • {article.readTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <FiBookmark className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <FiShare2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Meet Our Editors</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {magazineData.editors.map((editor, index) => (
              <ScrollReveal key={editor.name} delay={index * 0.1}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <img
                    src={editor.avatar}
                    alt={editor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-100"
                  />
                  <h3 className="text-xl font-bold mb-1">{editor.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{editor.role}</p>
                  <Badge variant="outline">{editor.articles} Articles</Badge>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the best articles, insights, and news delivered to your inbox weekly.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary" className="bg-white text-blue-600">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-blue-100 mt-4">Join 50,000+ designers and developers</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">CREATIVE<span className="text-blue-500">MAG</span></h3>
              <p className="text-gray-400">Your source for design and development insights.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Design</a>
                <a href="#" className="block hover:text-white transition-colors">Development</a>
                <a href="#" className="block hover:text-white transition-colors">UX Design</a>
                <a href="#" className="block hover:text-white transition-colors">Career</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Authors</a>
                <a href="#" className="block hover:text-white transition-colors">Advertise</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="block hover:text-white transition-colors">GitHub</a>
                <a href="#" className="block hover:text-white transition-colors">RSS Feed</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex items-center justify-between text-sm text-gray-400">
            <p>© 2025 CreativeMag. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
