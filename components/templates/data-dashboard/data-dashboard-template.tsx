"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiActivity,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import Link from "next/link";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const portfolioData = {
  name: "DataViz Pro",
  title: "Data Analyst & Visualization Specialist",
  tagline: "Turning complex data into actionable insights",
};

// Mock data for visualizations
const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 35000 },
  { month: "Mar", revenue: 48000, expenses: 31000 },
  { month: "Apr", revenue: 61000, expenses: 38000 },
  { month: "May", revenue: 55000, expenses: 36000 },
  { month: "Jun", revenue: 67000, expenses: 40000 },
];

const userGrowthData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1900 },
  { month: "Mar", users: 2400 },
  { month: "Apr", users: 3100 },
  { month: "May", users: 3800 },
  { month: "Jun", users: 4500 },
];

const projectStatusData = [
  { name: "Completed", value: 45, color: "#10b981" },
  { name: "In Progress", value: 30, color: "#3b82f6" },
  { name: "Planning", value: 15, color: "#f59e0b" },
  { name: "On Hold", value: 10, color: "#ef4444" },
];

const performanceData = [
  { category: "Speed", value: 92 },
  { category: "Accuracy", value: 88 },
  { category: "Efficiency", value: 95 },
  { category: "Innovation", value: 85 },
];

const kpiData = [
  {
    title: "Total Revenue",
    value: "$328K",
    change: "+12.5%",
    trend: "up",
    icon: <FiDollarSign />,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Active Users",
    value: "4,500",
    change: "+18.2%",
    trend: "up",
    icon: <FiUsers />,
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-2.4%",
    trend: "down",
    icon: <FiActivity />,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Growth Rate",
    value: "24.8%",
    change: "+5.1%",
    trend: "up",
    icon: <FiTrendingUp />,
    color: "from-orange-500 to-red-600",
  },
];

export function DataDashboardTemplate() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </Link>
          <a
            href="#contact"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              {portfolioData.name}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              {portfolioData.title}
            </p>
            <p className="text-lg text-gray-400">
              {portfolioData.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <ScrollReveal key={kpi.title} delay={index * 0.1}>
                <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${kpi.color} flex items-center justify-center text-white text-2xl`}>
                        {kpi.icon}
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-semibold ${
                        kpi.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}>
                        {kpi.trend === "up" ? <FiArrowUp /> : <FiArrowDown />}
                        {kpi.change}
                      </div>
                    </div>
                    <h3 className="text-gray-400 text-sm mb-2">{kpi.title}</h3>
                    <p className="text-3xl font-bold text-white">{kpi.value}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Revenue & Expenses Chart */}
          <ScrollReveal>
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Revenue & Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorExpenses)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* User Growth Chart */}
            <ScrollReveal delay={0.1}>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Project Status Pie Chart */}
            <ScrollReveal delay={0.2}>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Project Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props: any) =>
                          `${props.name}: ${(props.percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Performance Metrics Bar Chart */}
          <ScrollReveal delay={0.3}>
            <Card className="bg-gray-900 border-gray-800 mt-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="category" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
              Key Insights
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Revenue Trend",
                description: "Revenue has grown 23% over the past 6 months with consistent month-over-month increases.",
                icon: <FiTrendingUp />,
              },
              {
                title: "User Engagement",
                description: "Active user count has increased by 275% since January, indicating strong product-market fit.",
                icon: <FiUsers />,
              },
              {
                title: "Project Success",
                description: "45% of projects completed successfully, with 30% actively in progress toward goals.",
                icon: <FiActivity />,
              },
            ].map((insight, index) => (
              <ScrollReveal key={insight.title} delay={index * 0.1}>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-2xl mb-4">
                    {insight.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{insight.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{insight.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Analyze Your Data
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-400 mb-12">
              Need help turning your data into insights? Let's work together to visualize your success.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 text-lg px-8 py-6 h-auto"
              >
                <FiMail className="mr-2 w-5 h-5" />
                data@vizpro.com
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800 hover:text-white text-lg px-8 py-6 h-auto"
              >
                <FiGithub className="mr-2 w-5 h-5" />
                GitHub
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800 hover:text-white text-lg px-8 py-6 h-auto"
              >
                <FiLinkedin className="mr-2 w-5 h-5" />
                LinkedIn
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} {portfolioData.name}. Powered by Recharts & React.
          </p>
        </div>
      </footer>
    </div>
  );
}
