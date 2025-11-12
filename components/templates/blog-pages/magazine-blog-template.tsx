"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
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
  FiMail,
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiAward,
  FiEye,
  FiHeart,
  FiStar,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import { useTheme } from "next-themes";

export function MagazineBlogTemplate() {
  const { tt } = useI18n();
  const magazineData = tt?.blogMagazine;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  if (!magazineData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden max-w-full">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-3 max-w-full flex items-center justify-between text-sm text-white">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <span className="flex items-center gap-2">
              <FiTrendingUp className="w-4 h-4" />
              {magazineData.ui?.trendingNow || "Trending Now"}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>{magazineData.ui?.currentDate || "Jan 18, 2025"}</span>
            <span>|</span>
            <a href="#newsletter" className="hover:text-blue-400 transition-colors">{magazineData.ui?.subscribe || "Subscribe"}</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-3 max-w-full py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-3xl font-bold text-gray-900">
              <span className="hidden sm:inline">CREATIVE<span className="text-blue-600">MAG</span></span>
              <span className="inline sm:hidden">C<span className="text-blue-600">M</span></span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative hidden md:block">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 w-64"
                />
              </div>
              <Button size="sm" className="hidden sm:inline-flex">Write</Button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm mt-4 text-gray-900">
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

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t">
              <div className="flex flex-col gap-3">
                {["Latest", "Trending", "Design", "Development", "UX", "Tools", "Career"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="font-medium hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <Button size="sm" className="mt-2">Write</Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero - Featured Articles */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-3 max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        <FiEye className="w-4 h-4" />
                        {magazineData.featured[0].views}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
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
                    <h3 className="text-xl font-bold text-gray-900">Trending Articles</h3>
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
                            <Badge variant="outline" className="text-xs text-gray-900">{article.category}</Badge>
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

      {/* Stats Bar */}
      <section className="py-8 bg-white border-y">
        <div className="container mx-auto px-3 max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{magazineData.stats.subscribers}</div>
              <div className="text-sm text-gray-600">Newsletter Subscribers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{magazineData.stats.articles}</div>
              <div className="text-sm text-gray-600">Published Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{magazineData.stats.authors}</div>
              <div className="text-sm text-gray-600">Expert Authors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{magazineData.stats.monthlyReaders}</div>
              <div className="text-sm text-gray-600">Monthly Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-3 max-w-full">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {magazineData.categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3 py-2 rounded-full font-medium text-sm transition-all ${
                    selectedCategory === cat.name
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
            <Button variant="outline" className={darkMode ? 'text-white' : 'text-slate-900'} size="sm">
              <FiFilter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-3 max-w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <Button variant="ghost">
              View All
              <FiChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {magazineData.latest.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 0.05}>
                <Card className="overflow-hidden border hover:shadow-xl transition-all group">
                  <div className="flex flex-col sm:flex-row gap-6">
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
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
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

      {/* Editor's Picks & Tags */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-3 max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Editor's Picks */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <FiAward className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Editor's Picks</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {magazineData.editorsPicks.map((pick) => (
                  <Card key={pick.id} className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
                    <Badge variant="outline" className="mb-3">{pick.category}</Badge>
                    <h3 className="font-bold mb-4 group-hover:text-blue-600 transition-colors">{pick.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        {pick.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiEye className="w-4 h-4" />
                        {pick.views}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-900">Popular Topics</h3>
              <Card className="p-6">
                <div className="flex flex-wrap gap-2">
                  {magazineData.popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-3 max-w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Meet Our Editorial Team</h2>
            <p className="text-xl text-gray-600">
              Expert writers and industry leaders sharing their knowledge
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {magazineData.editors.map((editor, index) => (
              <ScrollReveal key={editor.name} delay={index * 0.1}>
                <Card className="p-8 text-center hover:shadow-xl transition-all group">
                  <img
                    src={editor.avatar}
                    alt={editor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-100 group-hover:border-blue-100 transition-colors"
                  />
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{editor.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{editor.role}</p>
                  <p className="text-sm text-gray-500 mb-4">{editor.bio}</p>
                  <Badge variant="outline" className="mb-4">{editor.articles} Articles</Badge>
                  <div className="flex justify-center gap-3 mt-4">
                    <button className="p-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors">
                      <FiTwitter className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors">
                      <FiLinkedin className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-3 max-w-full">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What Readers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {magazineData.testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-8 border-0 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-3 max-w-full text-center">
          <ScrollReveal>
            <FiMail className="w-16 h-16 mx-auto mb-6 text-white" aria-hidden="true" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the best articles, insights, and news delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary" className="bg-white !text-blue-600 hover:bg-gray-100 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-blue-100 mb-8">Join {magazineData.stats.subscribers} designers and developers</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-full mx-auto text-white">
              <div>
                <div className="text-2xl font-bold mb-1 text-gray-900">Weekly</div>
                <div className="text-sm text-blue-100">Frequency</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1 text-gray-900">No Spam</div>
                <div className="text-sm text-blue-100">Guaranteed</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1 text-gray-900">Free</div>
                <div className="text-sm text-blue-100">Always</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-3 max-w-full">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">CREATIVE<span className="text-blue-500">MAG</span></h3>
              <p className="text-gray-400 mb-6">Your source for design and development insights. Join our community of {magazineData.stats.monthlyReaders} monthly readers.</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <FiTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <FiGithub className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Categories</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Design</a>
                <a href="#" className="block hover:text-white transition-colors">Development</a>
                <a href="#" className="block hover:text-white transition-colors">UX Design</a>
                <a href="#" className="block hover:text-white transition-colors">Tools</a>
                <a href="#" className="block hover:text-white transition-colors">Career</a>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Company</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">About Us</a>
                <a href="#" className="block hover:text-white transition-colors">Our Team</a>
                <a href="#" className="block hover:text-white transition-colors">Write for Us</a>
                <a href="#" className="block hover:text-white transition-colors">Advertise</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Resources</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Newsletter</a>
                <a href="#" className="block hover:text-white transition-colors">RSS Feed</a>
                <a href="#" className="block hover:text-white transition-colors">Style Guide</a>
                <a href="#" className="block hover:text-white transition-colors">Media Kit</a>
                <a href="#" className="block hover:text-white transition-colors">Support</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© 2025 CreativeMag. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
