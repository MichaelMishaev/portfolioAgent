'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { useAdminAuth } from '@/components/admin/admin-auth-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Tag,
  Calendar,
  Users,
  DollarSign,
  Activity,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

export default function DiscountCodeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { isAuthenticated, apiKey } = useAdminAuth();
  const [code, setCode] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && apiKey) {
      fetchCodeDetails();
    }
  }, [isAuthenticated, apiKey, resolvedParams.id]);

  const fetchCodeDetails = async () => {
    try {
      const response = await fetch(`/api/admin/discount/${resolvedParams.id}`, {
        headers: {
          'x-api-key': apiKey!,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCode(data.code);
      }
    } catch (error) {
      console.error('Failed to fetch code details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 p-6 lg:p-8">
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Discount code not found</p>
            <Link href="/admin/discounts">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Codes
              </Button>
            </Link>
          </div>
        </main>
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
            <Link href="/admin/discounts">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Codes / Назад к кодам
              </Button>
            </Link>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {code.code}
                  </h1>
                  <Badge variant={code.isActive ? 'default' : 'secondary'}>
                    {code.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  {code.isPublic && (
                    <Badge variant="outline">Public</Badge>
                  )}
                </div>
                {code.description && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {code.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Discount Value
                </CardTitle>
                <Tag className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {code.discountType === 'PERCENTAGE'
                    ? `${code.discountValue}%`
                    : `$${code.discountValue}`}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {code.discountType === 'PERCENTAGE' ? 'Percentage' : 'Fixed Amount'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Uses
                </CardTitle>
                <Users className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {code.currentUses}
                  {code.maxUses && ` / ${code.maxUses}`}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {code.maxUses
                    ? `${((code.currentUses / code.maxUses) * 100).toFixed(0)}% used`
                    : 'Unlimited'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Revenue
                </CardTitle>
                <DollarSign className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(code.totalRevenue || 0).toFixed(2)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  From discounted purchases
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Discount
                </CardTitle>
                <Activity className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(code.totalDiscountGiven || 0).toFixed(2)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Total savings given
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Details and History Tabs */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details / Детали</TabsTrigger>
              <TabsTrigger value="usages">
                Usages ({code.usages?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="audit">
                Audit Log ({code.auditLogs?.length || 0})
              </TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Code Details / Детали кода</CardTitle>
                  <CardDescription>
                    Configuration and restrictions for this discount code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Code / Код
                      </h4>
                      <p className="text-gray-900 dark:text-white font-mono">
                        {code.code}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Type / Тип
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        {code.discountType === 'PERCENTAGE' ? 'Percentage' : 'Fixed Amount'}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Max Uses Per User / Макс. использований на пользователя
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        {code.maxUsesPerUser || 'Unlimited'}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Min Purchase Amount / Мин. сумма покупки
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        {code.minPurchaseAmount ? `$${code.minPurchaseAmount}` : 'No minimum'}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Max Discount Amount / Макс. сумма скидки
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        {code.maxDiscountAmount ? `$${code.maxDiscountAmount}` : 'No maximum'}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Valid From / Действителен с
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        {code.validFrom ? new Date(code.validFrom).toLocaleString() : 'No start date'}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Valid Until / Действителен до
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        {code.validUntil ? new Date(code.validUntil).toLocaleString() : 'No expiration'}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Created At / Создан
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(code.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {code.internalNotes && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Internal Notes / Внутренние заметки
                      </h4>
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                        {code.internalNotes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Usages Tab */}
            <TabsContent value="usages">
              <Card>
                <CardHeader>
                  <CardTitle>Usage History / История использований</CardTitle>
                  <CardDescription>
                    Recent applications of this discount code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {code.usages && code.usages.length > 0 ? (
                    <div className="space-y-4">
                      {code.usages.map((usage: any) => (
                        <div
                          key={usage.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Badge variant={
                                usage.status === 'CONFIRMED' ? 'default' :
                                usage.status === 'RESERVED' ? 'secondary' : 'outline'
                              }>
                                {usage.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(usage.createdAt).toLocaleString()}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">User ID</div>
                              <div className="font-mono text-xs">{usage.userId.slice(0, 8)}...</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Original</div>
                              <div className="font-semibold">${usage.originalAmount}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Discount</div>
                              <div className="font-semibold text-green-600">-${usage.discountAmount}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Final</div>
                              <div className="font-semibold">${usage.finalAmount}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No usages yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audit Log Tab */}
            <TabsContent value="audit">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Log / Журнал изменений</CardTitle>
                  <CardDescription>
                    History of changes made to this discount code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {code.auditLogs && code.auditLogs.length > 0 ? (
                    <div className="space-y-4">
                      {code.auditLogs.map((log: any) => (
                        <div
                          key={log.id}
                          className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex-shrink-0">
                            <Clock className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">{log.action}</Badge>
                              <span className="text-sm text-gray-500">
                                by {log.performedBy}
                              </span>
                            </div>
                            {log.reason && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {log.reason}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              {new Date(log.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No audit logs yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
