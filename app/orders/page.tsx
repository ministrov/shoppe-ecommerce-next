'use client';

import { ProtectedRoute } from '@/components/protectedRoute/ProtectedRoute';
import { useAppSelector } from '@/store/hooks';

export default function Orders() {
  const { token } = useAppSelector((state) => state.auth);
  return (
    <ProtectedRoute>
      {token && (
        <div>Orders</div>
      )}
    </ProtectedRoute>
  );
};