"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FiBriefcase,
  FiZap,
  FiFolder,
  FiTrendingUp,
  FiFeather,
  FiBookOpen,
  FiPackage,
  FiUsers,
  FiStar,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import Link from "next/link";

const categories = [
  { id: "all", name: "Все", icon: FiStar },
  { id: "professional", name: "Профессиональные", icon: FiBriefcase },
  { id: "creative", name: "Творческие", icon: FiZap },
  { id: "portfolio", name: "Портфолио", icon: FiFolder },
  { id: "modern", name: "Современные", icon: FiTrendingUp },
  { id: "simple", name: "Простые", icon: FiFeather },
  { id: "blog", name: "Блог", icon: FiBookOpen },
  { id: "product", name: "Продукты", icon: FiPackage },
  { id: "service", name: "Услуги", icon: FiUsers },
  { id: "experimental", name: "Экспериментальные", icon: FiStar },
];

export default function TestNavigationPage() {
  const [activeTab1, setActiveTab1] = useState("all");
  const [activeTab2, setActiveTab2] = useState("all");
  const [activeTab3, setActiveTab3] = useState("all");
  const [activeTab4, setActiveTab4] = useState("all");
  const [activeTab5, setActiveTab5] = useState("all");
  const [activeTab6, setActiveTab6] = useState("all");
  const [activeTab7, setActiveTab7] = useState("all");
  const [activeTab8, setActiveTab8] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/" className="inline-block mb-4 text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Navigation Styles Test Lab</h1>
          <p className="text-xl text-gray-600">
            Compare different navigation concepts - click and interact to see animations
          </p>
        </div>

        <div className="space-y-16">
          {/* Option 1: Minimal Underline Animation */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">1. Minimal Underline Animation</CardTitle>
                  <p className="text-sm text-gray-600">Clean text with animated sliding underline - Most elegant & timeless</p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">⭐ RECOMMENDED</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <nav className="flex items-center justify-center gap-8 relative">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab1(cat.id)}
                    className={`relative px-2 py-3 text-sm font-medium transition-colors ${
                      activeTab1 === cat.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {cat.name}
                    {activeTab1 === cat.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300" />
                    )}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Option 2: Glassmorphism Floating Cards */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div>
                <CardTitle className="text-2xl mb-2">2. Glassmorphism Floating Cards</CardTitle>
                <p className="text-sm text-gray-600">Semi-transparent cards with backdrop blur - Premium feel</p>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab2(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab2 === cat.id
                        ? "bg-white/80 backdrop-blur-lg border-2 border-blue-400/50 shadow-lg shadow-blue-500/20 text-blue-700"
                        : "bg-white/40 backdrop-blur-md border border-gray-200/50 text-gray-700 hover:bg-white/60 hover:border-gray-300/50"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Option 3: Icon + Text Chips */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div>
                <CardTitle className="text-2xl mb-2">3. Icon + Text Chips</CardTitle>
                <p className="text-sm text-gray-600">Material Design 3 style with icons - Visual & scannable</p>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab3(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab3 === cat.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Option 4: Segmented iOS Control */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div>
                <CardTitle className="text-2xl mb-2">4. Segmented iOS Control</CardTitle>
                <p className="text-sm text-gray-600">iOS-style segmented control - Polished & smooth</p>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex bg-gray-100 rounded-2xl p-1.5 relative">
                  {categories.slice(0, 6).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab4(cat.id)}
                      className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 z-10 ${
                        activeTab4 === cat.id ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {activeTab4 === cat.id && (
                        <span className="absolute inset-0 bg-white rounded-xl shadow-md -z-10" />
                      )}
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Option 5: Vertical Sidebar Navigation */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div>
                <CardTitle className="text-2xl mb-2">5. Vertical Sidebar Navigation</CardTitle>
                <p className="text-sm text-gray-600">Fixed left sidebar - Best for 10+ categories</p>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-gray-50">
              <div className="flex gap-8 h-96">
                {/* Sidebar */}
                <div className="w-64 bg-white rounded-xl shadow-sm border p-4 overflow-y-auto">
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveTab5(cat.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                          activeTab5 === cat.id
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <cat.icon className="w-5 h-5" />
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Content Area */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border p-8 flex items-center justify-center">
                  <p className="text-gray-500">Content for {categories.find((c) => c.id === activeTab5)?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Option 6: Horizontal Scroll Cards */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div>
                <CardTitle className="text-2xl mb-2">6. Horizontal Scroll Cards</CardTitle>
                <p className="text-sm text-gray-600">Swipeable cards - Mobile-first, modern interaction</p>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 pb-4 min-w-max">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab6(cat.id)}
                      className={`flex-shrink-0 w-40 p-4 rounded-2xl text-center transition-all duration-300 ${
                        activeTab6 === cat.id
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <cat.icon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">{cat.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Option 7: Dropdown Mega Menu */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div>
                <CardTitle className="text-2xl mb-2">7. Dropdown Mega Menu</CardTitle>
                <p className="text-sm text-gray-600">Single dropdown - Clean & scalable</p>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <div className="relative max-w-md mx-auto">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {categories.find((c) => c.id === activeTab7)?.icon &&
                      (() => {
                        const Icon = categories.find((c) => c.id === activeTab7)!.icon;
                        return <Icon className="w-5 h-5" />;
                      })()}
                    <span className="font-medium">{categories.find((c) => c.id === activeTab7)?.name}</span>
                  </span>
                  <FiChevronDown
                    className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4">
                      <div className="relative mb-3">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Поиск категорий..."
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setActiveTab7(cat.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                              activeTab7 === cat.id
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <cat.icon className="w-5 h-5" />
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Option 8: Two-Tier Navigation */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div>
                <CardTitle className="text-2xl mb-2">8. Two-Tier Navigation</CardTitle>
                <p className="text-sm text-gray-600">Primary + secondary tiers - Better hierarchy</p>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <div className="space-y-4">
                {/* Primary Tier */}
                <div className="flex items-center justify-center gap-4">
                  {categories.slice(0, 6).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab8(cat.id)}
                      className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        activeTab8 === cat.id
                          ? "bg-gray-900 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                {/* Secondary Tier */}
                {activeTab8 !== "all" && (
                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Фильтры:</span>
                    {["Новые", "Популярные", "Премиум"].map((filter) => (
                      <button
                        key={filter}
                        className="px-4 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">Which style do you prefer?</h3>
              <p className="text-gray-600 mb-6">
                Each navigation style has its own personality. Choose one and I'll implement it!
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">I've decided!</Button>
                <Button variant="outline">Show me more options</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
