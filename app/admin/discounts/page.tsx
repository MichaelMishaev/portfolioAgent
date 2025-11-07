'use client';

import { useEffect, useState, Suspense } from 'react';
import { useAdminAuth } from '@/components/admin/admin-auth-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { DiscountCodesTable } from '@/components/admin/discount-codes-table';
import { DiscountCodeDialog } from '@/components/admin/discount-code-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function DiscountCodesContent() {
  const { isAuthenticated, apiKey } = useAdminAuth();
  const searchParams = useSearchParams();
  const [codes, setCodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  // Filters
  const [search, setSearch] = useState('');
  const [isActiveFilter, setIsActiveFilter] = useState<string>('all');
  const [isPublicFilter, setIsPublicFilter] = useState<string>('all');

  // Dialog state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(
    searchParams?.get('action') === 'create'
  );
  const [editingCode, setEditingCode] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated && apiKey) {
      fetchCodes();
    }
  }, [isAuthenticated, apiKey, pagination.page, search, isActiveFilter, isPublicFilter]);

  const fetchCodes = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (search) params.append('search', search);
      if (isActiveFilter !== 'all') params.append('isActive', isActiveFilter);
      if (isPublicFilter !== 'all') params.append('isPublic', isPublicFilter);

      const response = await fetch(`/api/admin/discount?${params}`, {
        headers: {
          'x-api-key': apiKey!,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCodes(data.codes);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch codes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (code: any) => {
    setEditingCode(code);
  };

  const handleDelete = async (codeId: string) => {
    if (!confirm('Are you sure you want to delete this code?')) return;

    try {
      const response = await fetch(`/api/admin/discount/${codeId}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': apiKey!,
        },
      });

      if (response.ok) {
        fetchCodes();
      }
    } catch (error) {
      console.error('Failed to delete code:', error);
    }
  };

  const handleToggleActive = async (codeId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/discount/${codeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey!,
        },
        body: JSON.stringify({
          action: isActive ? 'deactivate' : 'activate',
          reason: `${isActive ? 'Deactivated' : 'Activated'} via admin panel`,
        }),
      });

      if (response.ok) {
        fetchCodes();
      }
    } catch (error) {
      console.error('Failed to toggle code status:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Discount Codes / Коды скидок
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and track your discount codes
              </p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="shrink-0">
              <Plus className="w-4 h-4 mr-2" />
              Create Code / Создать код
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-gray-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Filters / Фильтры
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Search / Поиск
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by code or description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Status / Статус
                </label>
                <Select value={isActiveFilter} onValueChange={setIsActiveFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All / Все</SelectItem>
                    <SelectItem value="true">Active / Активные</SelectItem>
                    <SelectItem value="false">Inactive / Неактивные</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Visibility / Видимость
                </label>
                <Select value={isPublicFilter} onValueChange={setIsPublicFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All / Все</SelectItem>
                    <SelectItem value="true">Public / Публичные</SelectItem>
                    <SelectItem value="false">Private / Приватные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Table */}
          <DiscountCodesTable
            codes={codes}
            isLoading={isLoading}
            pagination={pagination}
            onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
          />

          {/* Create/Edit Dialog */}
          <DiscountCodeDialog
            isOpen={isCreateDialogOpen || !!editingCode}
            onClose={() => {
              setIsCreateDialogOpen(false);
              setEditingCode(null);
            }}
            onSuccess={fetchCodes}
            editingCode={editingCode}
            apiKey={apiKey!}
          />
        </div>
      </main>
    </div>
  );
}

export default function DiscountCodesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <DiscountCodesContent />
    </Suspense>
  );
}
