import { Link, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/layouts/AdminLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { UsersPage } from '@/pages/UsersPage'
import { SettingsPage } from '@/pages/SettingsPage'

export default function App() {
  return <Routes><Route element={<AdminLayout />}>
    <Route index element={<DashboardPage />} />
    <Route path="users" element={<UsersPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="*" element={<div className="not-found"><span>404</span><h1>这个页面暂时不在轨道上</h1><p>请检查地址，或返回工作台继续操作。</p><Link className="button primary" to="/">返回工作台</Link></div>} />
  </Route></Routes>
}
