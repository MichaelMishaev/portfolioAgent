'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/components/admin/admin-auth-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

export default function AnalyticsPage() {
  const { isAuthenticated, apiKey } = useAdminAuth();
  const [codes, setCodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && apiKey) {
      fetchAnalytics();
    }
  }, [isAuthenticated, apiKey]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/discount?page=1&limit=1000', {
        headers: {
          'x-api-key': apiKey!,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCodes(data.codes);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !codes.length) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 p-6 lg:p-8">
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {isLoading ? 'Loading analytics...' : 'No data available'}
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Calculate analytics
  const totalRevenue = codes.reduce((sum, c) => sum + (c.totalRevenue || 0), 0);
  const totalDiscount = codes.reduce((sum, c) => sum + (c.totalDiscountGiven || 0), 0);
  const totalUsages = codes.reduce((sum, c) => sum + (c.currentUses || 0), 0);
  const avgDiscountPerUse = totalUsages > 0 ? totalDiscount / totalUsages : 0;

  // Top performing codes
  const topCodes = [...codes]
    .sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0))
    .slice(0, 5)
    .map(c => ({
      name: c.code,
      revenue: c.totalRevenue || 0,
      uses: c.currentUses || 0,
    }));

  // Discount type distribution
  const typeDistribution = [
    {
      name: 'Percentage',
      value: codes.filter(c => c.discountType === 'PERCENTAGE').length,
    },
    {
      name: 'Fixed',
      value: codes.filter(c => c.discountType === 'FIXED').length,
    },
  ];

  // Status distribution
  const statusDistribution = [
    {
      name: 'Active',
      value: codes.filter(c => c.isActive).length,
    },
    {
      name: 'Inactive',
      value: codes.filter(c => !c.isActive).length,
    },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Analytics / Аналитика
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Performance insights and discount code statistics
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Revenue / Общий доход
                </CardTitle>
                <DollarSign className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${totalRevenue.toFixed(2)}
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  From discounted purchases
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Discount / Общая скидка
                </CardTitle>
                <Percent className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${totalDiscount.toFixed(2)}
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  Total savings given
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Uses / Всего использований
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalUsages}
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  Code redemptions
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Avg Discount / Средняя скидка
                </CardTitle>
                <DollarSign className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${avgDiscountPerUse.toFixed(2)}
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  Per redemption
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Top Performing Codes */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Codes / Лучшие коды</CardTitle>
                <CardDescription>
                  Codes with highest revenue generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topCodes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Discount Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Discount Type Distribution / Распределение типов</CardTitle>
                <CardDescription>
                  Percentage vs Fixed amount codes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={typeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {typeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Usage by Code */}
            <Card>
              <CardHeader>
                <CardTitle>Usage by Code / Использования по кодам</CardTitle>
                <CardDescription>
                  Number of times each code has been used
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topCodes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="uses" fill="#10b981" name="Uses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Status Distribution / Распределение статусов</CardTitle>
                <CardDescription>
                  Active vs Inactive codes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? '#10b981' : '#6b7280'}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Codes Performance / Производительность всех кодов</CardTitle>
              <CardDescription>
                Detailed performance metrics for each discount code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-3">Code</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Uses</th>
                      <th className="pb-3">Revenue</th>
                      <th className="pb-3">Discount Given</th>
                      <th className="pb-3">Avg/Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {codes.map((code) => (
                      <tr key={code.id} className="text-sm">
                        <td className="py-3 font-medium">{code.code}</td>
                        <td className="py-3">
                          {code.discountType === 'PERCENTAGE'
                            ? `${code.discountValue}%`
                            : `$${code.discountValue}`}
                        </td>
                        <td className="py-3">{code.currentUses || 0}</td>
                        <td className="py-3">${(code.totalRevenue || 0).toFixed(2)}</td>
                        <td className="py-3 text-green-600">
                          ${(code.totalDiscountGiven || 0).toFixed(2)}
                        </td>
                        <td className="py-3">
                          ${code.currentUses > 0
                            ? ((code.totalDiscountGiven || 0) / code.currentUses).toFixed(2)
                            : '0.00'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
