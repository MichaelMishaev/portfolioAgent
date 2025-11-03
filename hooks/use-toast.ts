import { useState, useCallback } from "react";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

let toastCounter = 0;

const listeners = new Set<(toast: Toast) => void>();

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    ({ title, description, variant = "default" }: Omit<Toast, "id">) => {
      const id = `toast-${toastCounter++}`;
      const newToast: Toast = { id, title, description, variant };

      setToasts((prev) => [...prev, newToast]);
      listeners.forEach((listener) => listener(newToast));

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  return { toast, toasts };
}

export function subscribeToToasts(callback: (toast: Toast) => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
