import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronRight, CircleHelp, LayoutDashboard, Menu, Orbit, Settings2, Users, X } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { Modal } from '@/components/Modal'

const navigation = [
  { to: '/', title: '工作台概览', icon: LayoutDashboard },
  { to: '/users', title: '用户管理', icon: Users },
  { to: '/settings', title: '系统设置', icon: Settings2 },
]

export function AdminLayout() {
  const collapsed = useAppStore((state) => state.sidebarCollapsed)
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)
  const workspaceName = useAppStore((state) => state.settings.workspaceName)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const location = useLocation()
  const title = navigation.find((item) => item.to === location.pathname)?.title ?? '页面未找到'

  return <div className={`app-shell ${collapsed ? 'is-collapsed' : ''}`}>
    {mobileOpen && <button className="sidebar-overlay" aria-label="关闭导航" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <NavLink to="/" className="brand" aria-label="Orbit Admin 首页"><span className="brand-icon"><Orbit size={25} /></span><span className="sidebar-label">orbit<span className="brand-admin">ADMIN</span></span></NavLink>
      <div className="workspace"><span className="workspace-icon">O</span><div className="sidebar-label"><strong>{workspaceName}</strong><small>团队管理空间</small></div></div>
      <p className="nav-heading sidebar-label">工作空间</p>
      <nav aria-label="主导航">{navigation.map(({ to, title: label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} title={label} onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-item ${isActive ? 'selected' : ''}`}><Icon size={19} /><span className="sidebar-label">{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="help-card sidebar-label"><span className="help-symbol">✦</span><strong>让管理更简单</strong><p>从这里开始，构建你的高效工作流。</p><button onClick={() => setHelpOpen(true)}>使用指南 <ArrowUpRight size={15} /></button></div><div className="sidebar-foot"><span className="live-dot" /><span className="sidebar-label">本地演示工作空间</span></div></div>
    </aside>
    <div className="main-shell"><header className="topbar">
      <div className="breadcrumb"><button className="icon-button desktop-menu" aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'} onClick={toggleSidebar}><Menu size={20} /></button><button className="icon-button mobile-menu" aria-label="打开导航" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button><span>工作空间</span><ChevronRight size={14} /><strong>{title}</strong></div>
      <div className="topbar-actions"><span className="demo-label">演示模式</span><button className="icon-button" aria-label="使用帮助" onClick={() => setHelpOpen(true)}><CircleHelp size={19} /></button><span className="topbar-divider" /><NavLink to="/settings" className="profile"><span className="avatar profile-avatar">AD</span><span><strong>Admin</strong><small>工作空间管理员</small></span></NavLink></div>
    </header><main className="main-content"><Outlet /></main><footer className="footer"><span>© {new Date().getFullYear()} Orbit Admin</span><span>专注每一次高效协作 <span className="footer-dot">·</span> v0.1.0</span></footer></div>
    {helpOpen && <Modal title="欢迎使用 Orbit Admin" onClose={() => setHelpOpen(false)}><div className="help-content"><p>在「用户管理」中新增、编辑、停用或删除用户，也可以将筛选结果导出为 CSV。</p><p>在「系统设置」中修改工作空间名称和表格密度。工作台的用户统计会随用户数据同步更新。</p><div className="notice">当前为纯前端演示：数据仅保存在当前浏览器中。角色和状态用于展示，尚未接入登录、权限校验或后端服务。</div></div><div className="modal-footer"><button className="button primary" onClick={() => setHelpOpen(false)}>开始使用</button></div></Modal>}
  </div>
}
