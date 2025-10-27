"use client";

import { useState, useEffect } from "react";
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
  FiCode,
  FiMessageCircle,
  FiShare2,
  FiMoon,
  FiSun,
  FiFilter,
  FiTag,
  FiEye,
  FiHeart,
  FiGithub,
  FiPlay,
  FiBook,
  FiLayers,
  FiZap,
} from "react-icons/fi";
import Link from "next/link";

const techBlogData = {
  hero: {
    title: "Modern Web Development Insights",
    subtitle: "Deep dives, tutorials, and practical guides for developers",
    stats: [
      { label: "Articles", value: "500+" },
      { label: "Developers", value: "50K+" },
      { label: "Code Snippets", value: "1,200+" },
    ],
  },
  featured: {
    title: "Building a Real-Time Collaborative Editor with WebSockets",
    excerpt: "Learn how to build a production-ready collaborative text editor using WebSockets, OT algorithms, and React. Includes full source code and deployment guide.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&h=700&fit=crop",
    category: "Advanced",
    tags: ["WebSockets", "React", "TypeScript", "Real-time"],
    author: {
      name: "Michael Zhang",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      role: "Senior Engineer @ Google",
    },
    date: "Jan 19, 2025",
    readTime: "22 min",
    views: "45.2K",
    likes: 1243,
    comments: 189,
    hasDemo: true,
    hasCode: true,
  },
  series: [
    {
      id: 1,
      title: "Mastering Next.js 15",
      articles: 12,
      progress: 8,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      subscribers: "12.5K",
    },
    {
      id: 2,
      title: "System Design Fundamentals",
      articles: 18,
      progress: 0,
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      subscribers: "18.3K",
    },
    {
      id: 3,
      title: "TypeScript Deep Dive",
      articles: 10,
      progress: 10,
      thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
      subscribers: "9.8K",
    },
  ],
  latest: [
    {
      id: 1,
      title: "Optimizing React Performance with Concurrent Features",
      excerpt: "Practical guide to using React 19's concurrent features for better performance.",
      category: "React",
      tags: ["React 19", "Performance", "Concurrent"],
      author: {
        name: "Emma Watson",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop",
      },
      date: "Jan 18, 2025",
      readTime: "15 min",
      views: "23.4K",
      likes: 892,
      comments: 67,
      hasCode: true,
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "Building a CLI Tool with Node.js and TypeScript",
      excerpt: "Step-by-step tutorial on creating professional command-line tools.",
      category: "Node.js",
      tags: ["CLI", "TypeScript", "npm"],
      author: {
        name: "David Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      },
      date: "Jan 17, 2025",
      readTime: "18 min",
      views: "18.7K",
      likes: 654,
      comments: 43,
      hasCode: true,
      difficulty: "Beginner",
    },
    {
      id: 3,
      title: "Advanced SQL Optimization Techniques",
      excerpt: "Database performance tuning strategies used by top tech companies.",
      category: "Database",
      tags: ["SQL", "Performance", "PostgreSQL"],
      author: {
        name: "Sarah Kim",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
      },
      date: "Jan 16, 2025",
      readTime: "20 min",
      views: "31.2K",
      likes: 1123,
      comments: 98,
      hasCode: true,
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Microservices Architecture: Best Practices",
      excerpt: "Design patterns and anti-patterns learned from production systems.",
      category: "Architecture",
      tags: ["Microservices", "Docker", "K8s"],
      author: {
        name: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
      },
      date: "Jan 15, 2025",
      readTime: "25 min",
      views: "42.1K",
      likes: 1567,
      comments: 134,
      hasCode: false,
      difficulty: "Advanced",
    },
  ],
  topics: [
    { name: "JavaScript", count: 234, icon: FiCode },
    { name: "React", count: 189, icon: FiLayers },
    { name: "TypeScript", count: 156, icon: FiBook },
    { name: "Node.js", count: 143, icon: FiZap },
    { name: "DevOps", count: 98, icon: FiPlay },
  ],
};

export function TechBlogTemplate() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b backdrop-blur-lg bg-opacity-90`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2">
              <FiCode className="w-7 h-7 text-blue-600" />
              <span>DEV<span className="text-blue-600">INSIGHTS</span></span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#articles" className={`hover:text-blue-600 transition-colors`}>Articles</a>
              <a href="#series" className={`hover:text-blue-600 transition-colors`}>Series</a>
              <a href="#tutorials" className={`hover:text-blue-600 transition-colors`}>Tutorials</a>
              <a href="#newsletter" className={`hover:text-blue-600 transition-colors`}>Newsletter</a>
            </nav>

            <div className="flex items-center gap-3">
              <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                <FiSearch className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
              >
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
              <Button size="sm" className="hidden md:flex">
                <FiGithub className="w-4 h-4 mr-2" />
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`py-20 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
          <FadeIn>
            <Badge className="mb-6 bg-blue-600 text-white">
              <FiZap className="w-3 h-3 mr-1" />
              New: Interactive Code Playgrounds
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {techBlogData.hero.title}
            </h1>
            <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {techBlogData.hero.subtitle}
            </p>
            <div className="flex items-center justify-center gap-4 mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Reading
              </Button>
              <Button size="lg" variant="outline">
                Browse Topics
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {techBlogData.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Article */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex items-center gap-2 mb-8">
            <FiTrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Featured Tutorial</h2>
          </div>

          <ScrollReveal>
            <Card className={`overflow-hidden border-0 shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={techBlogData.featured.image}
                    alt={techBlogData.featured.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-blue-600">{techBlogData.featured.category}</Badge>
                    {techBlogData.featured.hasDemo && (
                      <Badge className="bg-green-600">
                        <FiPlay className="w-3 h-3 mr-1" />
                        Live Demo
                      </Badge>
                    )}
                    {techBlogData.featured.hasCode && (
                      <Badge className="bg-purple-600">
                        <FiGithub className="w-3 h-3 mr-1" />
                        Source Code
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-4 leading-tight">
                    {techBlogData.featured.title}
                  </h3>
                  <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {techBlogData.featured.excerpt}
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    {techBlogData.featured.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        <FiTag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={techBlogData.featured.author.avatar}
                      alt={techBlogData.featured.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{techBlogData.featured.author.name}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {techBlogData.featured.author.role}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      {techBlogData.featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {techBlogData.featured.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiEye className="w-4 h-4" />
                      {techBlogData.featured.views}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Read Full Tutorial
                    </Button>
                    <Button variant="outline" size="icon">
                      <FiBookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <FiShare2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Learning Series */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Learning Series</h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Structured courses to level up your skills
              </p>
            </div>
            <Button variant="ghost">View All</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {techBlogData.series.map((series, index) => (
              <ScrollReveal key={series.id} delay={index * 0.1}>
                <Card className={`overflow-hidden hover:shadow-xl transition-all group ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                  <div className="relative h-48">
                    <img
                      src={series.thumbnail}
                      alt={series.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="mb-2 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                        {series.articles} Articles
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {series.title}
                    </h3>
                    {series.progress > 0 && (
                      <div className="mb-3">
                        <div className={`flex items-center justify-between text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span>Progress</span>
                          <span>{Math.round((series.progress / series.articles) * 100)}%</span>
                        </div>
                        <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                            style={{ width: `${(series.progress / series.articles) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <div className={`flex items-center justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span>{series.subscribers} subscribers</span>
                      <Button variant="ghost" size="sm">
                        {series.progress > 0 ? 'Continue' : 'Start'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <FiFilter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {techBlogData.latest.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 0.05}>
                <Card className={`overflow-hidden hover:shadow-xl transition-all group ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">{article.category}</Badge>
                          <Badge
                            className={
                              article.difficulty === "Beginner"
                                ? "bg-green-100 text-green-700"
                                : article.difficulty === "Intermediate"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {article.difficulty}
                          </Badge>
                          {article.hasCode && (
                            <Badge className="bg-purple-100 text-purple-700">
                              <FiCode className="w-3 h-3 mr-1" />
                              Code
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {article.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={article.author.avatar}
                              alt={article.author.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">{article.author.name}</p>
                              <div className={`flex items-center gap-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <span>{article.date}</span>
                                <span>•</span>
                                <span>{article.readTime}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <FiEye className="w-3 h-3" />
                                  {article.views}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <button className={`flex items-center gap-1 text-sm ${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}>
                              <FiHeart className="w-4 h-4" />
                              <span>{article.likes}</span>
                            </button>
                            <button className={`flex items-center gap-1 text-sm ${darkMode ? 'text-gray-400 hover:text-blue-500' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                              <FiMessageCircle className="w-4 h-4" />
                              <span>{article.comments}</span>
                            </button>
                            <Button size="sm" variant="ghost">
                              Read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Explore Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {techBlogData.topics.map((topic, index) => (
              <ScrollReveal key={topic.name} delay={index * 0.05}>
                <Card className={`p-6 text-center hover:shadow-lg transition-all cursor-pointer group ${darkMode ? 'bg-gray-900 border-gray-700 hover:border-blue-600' : 'bg-white hover:border-blue-600'}`}>
                  <topic.icon className="w-8 h-8 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold mb-1">{topic.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{topic.count} articles</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-4">Join 50,000+ Developers</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get weekly tutorials, insights, and code snippets delivered to your inbox.
            </p>
            <div className="flex gap-4 max-w-md mx-auto mb-4">
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-blue-100">Free forever. No spam. Unsubscribe anytime.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold mb-4">
                <FiCode className="w-6 h-6 text-blue-600" />
                <span>DEV<span className="text-blue-600">INSIGHTS</span></span>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Empowering developers with knowledge.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Content</h4>
              <div className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Articles</a>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Tutorials</a>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Series</a>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Authors</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Discord</a>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>GitHub</a>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Twitter</a>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>LinkedIn</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>About</a>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Sponsor</a>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Advertise</a>
                <a href="#" className={`block ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Contact</a>
              </div>
            </div>
          </div>
          <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} pt-8 flex items-center justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>© 2025 DevInsights. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Privacy</a>
              <a href="#" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Terms</a>
              <a href="#" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>RSS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
