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
  about: "With over 8 years of experience in data analytics and visualization, I help businesses make data-driven decisions through intuitive dashboards and comprehensive reports. Specialized in Python, R, SQL, and modern BI tools.",
  email: "contact@datavizpro.com",
  stats: [
    { label: "Projects Completed", value: "150+" },
    { label: "Companies Served", value: "50+" },
    { label: "Data Points Analyzed", value: "10M+" },
    { label: "Satisfaction Rate", value: "99%" },
  ],
  skills: [
    "Python & Pandas",
    "SQL & PostgreSQL",
    "Tableau & Power BI",
    "Data Visualization",
    "Statistical Analysis",
    "Machine Learning",
    "ETL Pipelines",
    "Dashboard Design",
  ],
  testimonials: [
    {
      quote: "DataViz Pro transformed our messy data into clear, actionable insights. The dashboards are stunning and incredibly useful.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc",
    },
    {
      quote: "Working with this team was seamless. They understood our data challenges and delivered solutions that exceeded expectations.",
      author: "Michael Chen",
      role: "Data Director, FinanceHub",
    },
    {
      quote: "The best data analyst we've worked with. Fast, professional, and delivers results that drive business decisions.",
      author: "Emma Williams",
      role: "VP Analytics, RetailCorp",
    },
  ],
  pricing: [
    {
      name: "Starter",
      price: "$1,500",
      period: "per project",
      features: [
        "Basic Dashboard Setup",
        "Up to 3 Data Sources",
        "5 Custom Visualizations",
        "Email Support",
        "1 Revision Round",
      ],
    },
    {
      name: "Professional",
      price: "$3,500",
      period: "per project",
      popular: true,
      features: [
        "Advanced Dashboard Design",
        "Unlimited Data Sources",
        "15 Custom Visualizations",
        "Priority Support",
        "3 Revision Rounds",
        "Data Pipeline Setup",
        "Training Session Included",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "Full BI Solution",
        "Custom Development",
        "Real-time Data Processing",
        "Dedicated Support",
        "Unlimited Revisions",
        "Team Training",
        "Ongoing Maintenance",
      ],
    },
  ],
  timeline: [
    {
      year: "2023-2024",
      title: "Senior Data Analyst",
      company: "Tech Giants Inc",
      description: "Led data visualization initiatives for Fortune 500 clients, creating executive dashboards and predictive models.",
    },
    {
      year: "2021-2023",
      title: "Data Analyst",
      company: "Analytics Pro",
      description: "Developed automated reporting systems and built interactive dashboards using Tableau and Power BI.",
    },
    {
      year: "2019-2021",
      title: "Junior Data Analyst",
      company: "StartupData",
      description: "Analyzed customer behavior data and created visualizations to support marketing decisions.",
    },
    {
      year: "2016-2019",
      title: "Data Science Degree",
      company: "University of Data",
      description: "Graduated with honors, specializing in statistical analysis and machine learning.",
    },
  ],
  faq: [
    {
      question: "What tools do you use for data visualization?",
      answer: "I work with industry-leading tools including Tableau, Power BI, Python (Matplotlib, Plotly, Seaborn), and custom web-based solutions using D3.js and Recharts.",
    },
    {
      question: "How long does a typical dashboard project take?",
      answer: "Most dashboard projects take 2-4 weeks depending on complexity. Simple dashboards can be completed in 1 week, while enterprise solutions may take 6-8 weeks.",
    },
    {
      question: "Do you provide training on how to use the dashboards?",
      answer: "Yes! All Professional and Enterprise packages include training sessions. I'll ensure your team knows how to use, update, and interpret the dashboards effectively.",
    },
    {
      question: "Can you work with our existing data infrastructure?",
      answer: "Absolutely. I have experience integrating with various databases (SQL, NoSQL), APIs, cloud platforms (AWS, Azure, GCP), and data warehouses.",
    },
    {
      question: "What if we need changes after the project is completed?",
      answer: "All projects include revision rounds based on your package. For ongoing changes, I offer maintenance contracts with monthly support hours.",
    },
  ],
  gallery: [
    { title: "Sales Dashboard", description: "Real-time sales tracking with predictive analytics" },
    { title: "Customer Analytics", description: "360-degree customer behavior visualization" },
    { title: "Financial Reports", description: "Automated financial reporting system" },
    { title: "Marketing Dashboard", description: "Campaign performance and ROI tracking" },
    { title: "Operations Monitor", description: "Real-time operational metrics dashboard" },
    { title: "Executive Overview", description: "High-level KPI dashboard for C-suite" },
  ],
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
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-3 sm:px-3 py-4 flex items-center justify-between">
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
      <section className="pt-32 pb-16 px-3">
        <div className="container mx-auto max-w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent break-words text-white">
              {portfolioData.name}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4">
              {portfolioData.title}
            </p>
            <p className="text-lg text-gray-400">
              {portfolioData.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-3 bg-gray-900/30">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Track Record
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {portfolioData.stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 break-words text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="py-8 px-3">
        <div className="container mx-auto max-w-full">
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
      <section className="py-12 px-3">
        <div className="container mx-auto max-w-full">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* About Section */}
      <section className="py-16 px-3 bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 text-white break-words">
              About Me
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
              {portfolioData.about}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-3">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 text-white break-words">
              Technical Skills
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {portfolioData.skills.map((skill, index) => (
              <ScrollReveal key={skill} delay={index * 0.05}>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center hover:border-blue-500 transition-all hover:scale-105">
                  <div className="text-sm md:text-base font-medium text-white">{skill}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-3 bg-gray-900/30">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 text-white break-words">
              Featured Dashboards
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.gallery.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all">
                      <FiActivity className="w-16 h-16 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-3">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-white break-words">
              Career Journey
            </h2>
          </ScrollReveal>
          <div className="space-y-8">
            {portfolioData.timeline.map((item, index) => (
              <ScrollReveal key={item.year} delay={index * 0.1}>
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
                    {index !== portfolioData.timeline.length - 1 && (
                      <div className="w-px flex-1 bg-gray-800 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="text-blue-400 font-semibold mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <div className="text-gray-400 text-sm mb-3">{item.company}</div>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-3 bg-gray-900/50">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-4 text-white break-words">
              Pricing Plans
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              Choose the perfect package for your data visualization needs
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.pricing.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.1}>
                <Card className={`bg-gray-900 border-gray-800 ${plan.popular ? 'ring-2 ring-blue-500' : ''} hover:border-blue-500 transition-all relative`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                      POPULAR
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-gray-300">
                          <FiActivity className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' : 'bg-gray-800 hover:bg-gray-700'} text-white border-0`}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-3">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 text-white break-words">
              Client Testimonials
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.author} delay={index * 0.1}>
                <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="text-blue-400 text-4xl mb-4">"</div>
                    <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>
                    <div className="mt-auto">
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-3 bg-gray-900/30">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 text-white break-words">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {portfolioData.faq.map((item, index) => (
              <ScrollReveal key={item.question} delay={index * 0.05}>
                <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white break-words">
              Ready to Transform Your Data?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-gray-300 mb-8">
              Let's turn your raw data into powerful insights that drive business decisions
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 text-lg px-8 py-6 h-auto"
              >
                Start Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
              >
                Schedule Consultation
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-3">
        <div className="container mx-auto max-w-full text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent break-words text-white">
              Let's Analyze Your Data
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-400 mb-12">
              Need help turning your data into insights? Let's work together to visualize your success.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 text-lg px-8 py-6 h-auto"
              >
                <FiMail className="mr-2 w-5 h-5" />
                {portfolioData.email}
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
        <div className="container mx-auto px-3 sm:px-3">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} {portfolioData.name}. Powered by Recharts & React.
          </p>
        </div>
      </footer>
    </div>
  );
}
