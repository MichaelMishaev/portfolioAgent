'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  apiKey: string | null;
  login: (key: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for stored API key on mount
    const storedKey = localStorage.getItem('admin_api_key');
    if (storedKey) {
      validateApiKey(storedKey);
    } else {
      setIsLoading(false);
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, []);

  const validateApiKey = async (key: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/discount?page=1&limit=1', {
        headers: {
          'x-api-key': key,
        },
      });

      if (response.ok) {
        setApiKey(key);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  };

  const login = async (key: string): Promise<boolean> => {
    const isValid = await validateApiKey(key);
    if (isValid) {
      localStorage.setItem('admin_api_key', key);
      router.push('/admin');
    }
    return isValid;
  };

  const logout = () => {
    localStorage.removeItem('admin_api_key');
    setApiKey(null);
    setIsAuthenticated(false);
    setIsLoading(false);
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        apiKey,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
