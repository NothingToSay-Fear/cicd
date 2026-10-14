import { useState, type FormEvent } from 'react'
import { ArrowDownToLine, ChevronLeft, ChevronRight, Plus, Search, Users } from 'lucide-react'
import { useUserStore } from '@/stores/useUserStore'
import { UserTable } from '@/components/UserTable'
import { Modal } from '@/components/Modal'
import { exportUsers } from '@/lib/format'
import type { User, UserInput, UserRole, UserStatus } from '@/types'

const emptyInput: UserInput = { name: '', email: '', department: '', role: '成员', status: '正常' }

function UserForm({ user, onClose, onSaved }: { user: User | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<UserInput>(user ?? emptyInput)
  const [error, setError] = useState('')
  const saveUser = useUserStore((state) => state.saveUser)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!form.name.trim() || !form.department.trim()) { setError('姓名和部门不能为空。'); return }
    if (!saveUser(form, user?.id)) { setError('该邮箱已存在，请使用其他邮箱。'); return }
    onSaved()
  }
  return <Modal title={user ? '编辑用户' : '添加新用户'} onClose={onClose}><form onSubmit={submit}><div className="form-body"><p className="form-intro">填写用户信息，为工作空间添加一位协作者。</p><div className="form-grid"><label>姓名 <span>*</span><input required maxLength={30} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="请输入姓名" /></label><label>所属部门 <span>*</span><input required maxLength={40} value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} placeholder="例如：研发中心" /></label></div><label>邮箱地址 <span>*</span><input type="email" required maxLength={100} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="name@example.com" /></label><div className="form-grid"><label>角色<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value as UserRole })}><option>成员</option><option>编辑</option><option>管理员</option></select></label><label>用户状态<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as UserStatus })}><option>正常</option><option>停用</option></select></label></div>{error && <p role="alert" className="form-error">{error}</p>}</div><div className="modal-footer"><button className="button" type="button" onClick={onClose}>取消</button><button className="button primary" type="submit">{user ? '保存修改' : '创建用户'}</button></div></form></Modal>
}

export function UsersPage() {
  const users = useUserStore((state) => state.users)
  const deleteUser = useUserStore((state) => state.deleteUser)
  const toggleStatus = useUserStore((state) => state.toggleStatus)
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('全部角色')
  const [status, setStatus] = useState('全部状态')
  const [page, setPage] = useState(1)
  const [editor, setEditor] = useState<{ user: User | null } | null>(null)
  const [deleting, setDeleting] = useState<User | null>(null)
  const [message, setMessage] = useState('')
  const filtered = users.filter((user) => (!query.trim() || [user.name, user.email, user.department].some((value) => value.toLowerCase().includes(query.trim().toLowerCase()))) && (role === '全部角色' || user.role === role) && (status === '全部状态' || user.status === status))
  const pageSize = 6
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = Math.min(page, pages)
  return <>
    <div className="page-heading"><div><div className="eyebrow">TEAM & MEMBERS</div><h1>用户管理</h1><p>连接团队中的每一个人，轻松管理成员信息与角色。</p></div><div className="heading-actions"><button className="button" disabled={!filtered.length} onClick={() => { exportUsers(filtered); setMessage(`已导出 ${filtered.length} 位用户。`) }}><ArrowDownToLine size={16} />导出列表</button><button className="button primary" onClick={() => setEditor({ user: null })}><Plus size={18} />新增用户</button></div></div>
    {message && <div className="feedback" role="status">{message}<button onClick={() => setMessage('')} aria-label="关闭提示">×</button></div>}
    <section className="panel"><div className="panel-heading"><div><h2><Users size={19} />全部用户 <span className="count-badge">{users.length}</span></h2><p>在一个地方，管理整个工作空间的用户</p></div><span className="subtle-tag">本地数据</span></div><div className="filter-bar"><div className="search-input"><Search size={18} /><input aria-label="搜索用户" placeholder="搜索姓名、邮箱或部门..." value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} /></div><select aria-label="按角色筛选" value={role} onChange={(event) => { setRole(event.target.value); setPage(1) }}><option>全部角色</option><option>管理员</option><option>编辑</option><option>成员</option></select><select aria-label="按状态筛选" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1) }}><option>全部状态</option><option>正常</option><option>停用</option></select><button className="reset-button" onClick={() => { setQuery(''); setRole('全部角色'); setStatus('全部状态'); setPage(1) }}>重置</button></div>
      <UserTable users={filtered.slice((current - 1) * pageSize, current * pageSize)} onEdit={(user) => setEditor({ user })} onDelete={setDeleting} onToggle={(user) => { toggleStatus(user.id); setMessage(`已${user.status === '正常' ? '停用' : '启用'}用户「${user.name}」。`) }} />
      <div className="pagination"><span>共 {filtered.length} 条记录{filtered.length > 0 && `，显示第 ${(current - 1) * pageSize + 1}–${Math.min(current * pageSize, filtered.length)} 条`}</span><div><button className="icon-button" aria-label="上一页" disabled={current === 1} onClick={() => setPage(current - 1)}><ChevronLeft size={17} /></button><span className="page-number">{current}</span><span className="muted">/ {pages}</span><button className="icon-button" aria-label="下一页" disabled={current === pages} onClick={() => setPage(current + 1)}><ChevronRight size={17} /></button></div></div>
    </section><p className="page-note">提示：点击用户状态可以快速启用或停用用户。修改将保存在当前浏览器。</p>
    {editor && <UserForm user={editor.user} onClose={() => setEditor(null)} onSaved={() => { setMessage(editor.user ? '用户信息已更新。' : '新用户已创建。'); setEditor(null) }} />}
    {deleting && <Modal title="删除用户" onClose={() => setDeleting(null)}><div className="form-body"><p>确定删除用户「{deleting.name}」吗？删除后无法恢复。</p></div><div className="modal-footer"><button className="button" onClick={() => setDeleting(null)}>取消</button><button className="button danger" onClick={() => { deleteUser(deleting.id); setMessage(`已删除用户「${deleting.name}」。`); setDeleting(null) }}>确认删除</button></div></Modal>}
  </>
}
