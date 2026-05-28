import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import AdminNav from './AdminNav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuth = await getAdminSession();
  if (!isAuth) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
