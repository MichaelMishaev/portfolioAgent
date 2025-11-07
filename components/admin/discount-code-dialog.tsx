'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface DiscountCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingCode?: any;
  apiKey: string;
}

export function DiscountCodeDialog({
  isOpen,
  onClose,
  onSuccess,
  editingCode,
  apiKey,
}: DiscountCodeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState('');
  const [maxUses, setMaxUses] = useState('');
  const [maxUsesPerUser, setMaxUsesPerUser] = useState('1');
  const [minPurchaseAmount, setMinPurchaseAmount] = useState('');
  const [maxDiscountAmount, setMaxDiscountAmount] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [internalNotes, setInternalNotes] = useState('');

  useEffect(() => {
    if (editingCode) {
      setCode(editingCode.code);
      setDescription(editingCode.description || '');
      setDiscountType(editingCode.discountType);
      setDiscountValue(editingCode.discountValue.toString());
      setMaxUses(editingCode.maxUses?.toString() || '');
      setMaxUsesPerUser(editingCode.maxUsesPerUser?.toString() || '1');
      setMinPurchaseAmount(editingCode.minPurchaseAmount?.toString() || '');
      setMaxDiscountAmount(editingCode.maxDiscountAmount?.toString() || '');
      setValidFrom(editingCode.validFrom ? new Date(editingCode.validFrom).toISOString().slice(0, 16) : '');
      setValidUntil(editingCode.validUntil ? new Date(editingCode.validUntil).toISOString().slice(0, 16) : '');
      setIsActive(editingCode.isActive);
      setIsPublic(editingCode.isPublic);
      setInternalNotes(editingCode.internalNotes || '');
    } else {
      resetForm();
    }
  }, [editingCode, isOpen]);

  const resetForm = () => {
    setCode('');
    setDescription('');
    setDiscountType('PERCENTAGE');
    setDiscountValue('');
    setMaxUses('');
    setMaxUsesPerUser('1');
    setMinPurchaseAmount('');
    setMaxDiscountAmount('');
    setValidFrom('');
    setValidUntil('');
    setIsActive(true);
    setIsPublic(true);
    setInternalNotes('');
    setError('');
  };

  const validateForm = (): string | null => {
    if (!code.trim()) return 'Code is required';
    if (!/^[A-Z0-9-]+$/.test(code)) {
      return 'Code must be uppercase letters, numbers, and hyphens only';
    }
    if (!discountValue || parseFloat(discountValue) <= 0) {
      return 'Discount value must be greater than 0';
    }
    if (discountType === 'PERCENTAGE' && parseFloat(discountValue) > 100) {
      return 'Percentage discount cannot exceed 100%';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const payload: any = {
        code: code.toUpperCase(),
        description,
        discountType,
        discountValue: parseFloat(discountValue),
        maxUses: maxUses ? parseInt(maxUses) : null,
        maxUsesPerUser: maxUsesPerUser ? parseInt(maxUsesPerUser) : 1,
        minPurchaseAmount: minPurchaseAmount ? parseFloat(minPurchaseAmount) : null,
        maxDiscountAmount: maxDiscountAmount ? parseFloat(maxDiscountAmount) : null,
        validFrom: validFrom || null,
        validUntil: validUntil || null,
        isActive,
        isPublic,
        internalNotes,
      };

      if (editingCode) {
        payload.reason = 'Updated via admin panel';
      }

      const url = editingCode
        ? `/api/admin/discount/${editingCode.id}`
        : '/api/admin/discount';

      const method = editingCode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess();
        onClose();
        resetForm();
      } else {
        setError(data.error || 'Failed to save discount code');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingCode ? 'Edit Discount Code / Редактировать код' : 'Create Discount Code / Создать код'}
          </DialogTitle>
          <DialogDescription>
            {editingCode
              ? 'Update the discount code details below'
              : 'Fill in the details to create a new discount code'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Basic Information / Основная информация
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">
                  Code * / Код
                </Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="SUMMER25"
                  disabled={!!editingCode || isLoading}
                />
                <p className="text-xs text-gray-500">
                  Uppercase letters, numbers, and hyphens only
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountType">
                  Type * / Тип
                </Label>
                <Select
                  value={discountType}
                  onValueChange={(value: 'PERCENTAGE' | 'FIXED') => setDiscountType(value)}
                  disabled={!!editingCode || isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Percentage / Процент</SelectItem>
                    <SelectItem value="FIXED">Fixed Amount / Фикс. сумма</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountValue">
                Discount Value * / Значение скидки
              </Label>
              <Input
                id="discountValue"
                type="number"
                step="0.01"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={discountType === 'PERCENTAGE' ? '25' : '10.00'}
                disabled={!!editingCode || isLoading}
              />
              <p className="text-xs text-gray-500">
                {discountType === 'PERCENTAGE'
                  ? 'Enter percentage (e.g., 25 for 25%)'
                  : 'Enter fixed amount in dollars (e.g., 10.00)'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description / Описание
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Summer sale - 25% off all templates"
                rows={2}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Usage Limits */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Usage Limits / Лимиты использования
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxUses">
                  Max Total Uses / Макс. использований
                </Label>
                <Input
                  id="maxUses"
                  type="number"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  placeholder="Unlimited"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxUsesPerUser">
                  Max Uses Per User / Макс. на пользователя
                </Label>
                <Input
                  id="maxUsesPerUser"
                  type="number"
                  value={maxUsesPerUser}
                  onChange={(e) => setMaxUsesPerUser(e.target.value)}
                  placeholder="1"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Price Limits */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Price Restrictions / Ценовые ограничения
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minPurchaseAmount">
                  Min Purchase Amount / Мин. сумма покупки
                </Label>
                <Input
                  id="minPurchaseAmount"
                  type="number"
                  step="0.01"
                  value={minPurchaseAmount}
                  onChange={(e) => setMinPurchaseAmount(e.target.value)}
                  placeholder="No minimum"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxDiscountAmount">
                  Max Discount Amount / Макс. сумма скидки
                </Label>
                <Input
                  id="maxDiscountAmount"
                  type="number"
                  step="0.01"
                  value={maxDiscountAmount}
                  onChange={(e) => setMaxDiscountAmount(e.target.value)}
                  placeholder="No maximum"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Validity Period */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Validity Period / Период действия
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validFrom">
                  Valid From / Действителен с
                </Label>
                <Input
                  id="validFrom"
                  type="datetime-local"
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="validUntil">
                  Valid Until / Действителен до
                </Label>
                <Input
                  id="validUntil"
                  type="datetime-local"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Settings / Настройки
            </h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={(checked) => setIsActive(checked as boolean)}
                  disabled={isLoading}
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  Active / Активный
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPublic"
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                  disabled={isLoading}
                />
                <Label htmlFor="isPublic" className="cursor-pointer">
                  Public (visible to all users) / Публичный (виден всем пользователям)
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="internalNotes">
                Internal Notes / Внутренние заметки
              </Label>
              <Textarea
                id="internalNotes"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Internal notes for team reference..."
                rows={2}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel / Отмена
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading
                ? 'Saving...'
                : editingCode
                ? 'Update Code / Обновить'
                : 'Create Code / Создать'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
