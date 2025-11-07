'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/components/admin/admin-auth-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

interface DashboardStats {
  totalCodes: number;
  activeCodes: number;
  totalRevenue: number;
  totalDiscountGiven: number;
  totalUsages: number;
}

export default function AdminDashboardPage() {
  const { isAuthenticated, isLoading, apiKey } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    if (isAuthenticated && apiKey) {
      fetchDashboardStats();
    }
  }, [isAuthenticated, apiKey]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/discount?page=1&limit=1000', {
        headers: {
          'x-api-key': apiKey!,
        },
      });

      if (response.ok) {
        const data = await response.json();

        const activeCodes = data.codes.filter((c: any) => c.isActive).length;
        const totalRevenue = data.codes.reduce((sum: number, c: any) => sum + (c.totalRevenue || 0), 0);
        const totalDiscountGiven = data.codes.reduce((sum: number, c: any) => sum + (c.totalDiscountGiven || 0), 0);
        const totalUsages = data.codes.reduce((sum: number, c: any) => sum + (c.currentUses || 0), 0);

        setStats({
          totalCodes: data.codes.length,
          activeCodes,
          totalRevenue,
          totalDiscountGiven,
          totalUsages,
        });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard / Панель управления
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Overview of your discount system performance
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Обзор эффективности вашей системы скидок
            </p>
          </div>

          {/* Stats Grid */}
          {isLoadingStats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-16 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Codes / Всего кодов
                  </CardTitle>
                  <Tag className="w-4 h-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats?.totalCodes || 0}
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                    {stats?.activeCodes || 0} active / активных
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Revenue / Общий доход
                  </CardTitle>
                  <DollarSign className="w-4 h-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${(stats?.totalRevenue || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    From discounted purchases
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Discount / Общая скидка
                  </CardTitle>
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${(stats?.totalDiscountGiven || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Total savings given
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Uses / Всего использований
                  </CardTitle>
                  <Users className="w-4 h-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats?.totalUsages || 0}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Discount code redemptions
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions / Быстрые действия</CardTitle>
              <CardDescription>
                Common tasks to manage your discount codes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="/admin/discounts?action=create"
                  className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Tag className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Create New Code
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add a new discount code
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Добавить новый код скидки
                  </p>
                </a>

                <a
                  href="/admin/discounts"
                  className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Activity className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    View All Codes
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage existing codes
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Управление существующими кодами
                  </p>
                </a>

                <a
                  href="/admin/analytics"
                  className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <TrendingUp className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    View Analytics
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Performance insights
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Аналитика эффективности
                  </p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
