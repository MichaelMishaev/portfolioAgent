'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Pencil,
  Trash2,
  Power,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

interface DiscountCode {
  id: string;
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  maxUses: number | null;
  currentUses: number;
  isActive: boolean;
  isPublic: boolean;
  validFrom: string;
  validUntil: string | null;
  totalRevenue: number;
  totalDiscountGiven: number;
}

interface DiscountCodesTableProps {
  codes: DiscountCode[];
  isLoading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  onPageChange: (page: number) => void;
  onEdit: (code: DiscountCode) => void;
  onDelete: (codeId: string) => void;
  onToggleActive: (codeId: string, isActive: boolean) => void;
}

export function DiscountCodesTable({
  codes,
  isLoading,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
  onToggleActive,
}: DiscountCodesTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (codes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          No discount codes found. Create your first code to get started.
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Коды скидок не найдены. Создайте первый код для начала.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Code / Код
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type / Тип
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Value / Значение
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Uses / Исп.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {codes.map((code) => (
              <tr
                key={code.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {code.code}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                      {code.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="outline">
                    {code.discountType === 'PERCENTAGE' ? 'Percentage' : 'Fixed'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {code.discountType === 'PERCENTAGE'
                    ? `${code.discountValue}%`
                    : `$${code.discountValue}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="text-gray-900 dark:text-white">
                    {code.currentUses}
                    {code.maxUses && ` / ${code.maxUses}`}
                  </div>
                  {code.maxUses && (
                    <div className="text-xs text-gray-500">
                      {((code.currentUses / code.maxUses) * 100).toFixed(0)}% used
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <Badge variant={code.isActive ? 'default' : 'secondary'}>
                      {code.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {code.isPublic && (
                      <Badge variant="outline" className="text-xs">
                        Public
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/discounts/${code.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(code)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleActive(code.id, code.isActive)}
                      className={code.isActive ? 'text-yellow-600' : 'text-green-600'}
                    >
                      <Power className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(code.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
        {codes.map((code) => (
          <div key={code.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {code.code}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {code.description}
                </div>
              </div>
              <div className="flex gap-1">
                <Badge variant={code.isActive ? 'default' : 'secondary'}>
                  {code.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <div className="text-gray-500 dark:text-gray-400">Type</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {code.discountType === 'PERCENTAGE' ? 'Percentage' : 'Fixed'}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400">Value</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {code.discountType === 'PERCENTAGE'
                    ? `${code.discountValue}%`
                    : `$${code.discountValue}`}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400">Uses</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {code.currentUses}
                  {code.maxUses && ` / ${code.maxUses}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Link href={`/admin/discounts/${code.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(code)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleActive(code.id, code.isActive)}
              >
                <Power className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(code.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
          {pagination.total} results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Page {pagination.page} of {pagination.pages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
