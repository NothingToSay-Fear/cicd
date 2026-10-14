import { Pencil, Trash2 } from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import { formatDate } from '@/lib/format'
import type { User } from '@/types'

export function UserTable({ users, onEdit, onDelete, onToggle }: { users: User[]; onEdit?: (user: User) => void; onDelete?: (user: User) => void; onToggle?: (user: User) => void }) {
  const compact = useAppStore((state) => state.settings.compactTable)
  return <div className="table-scroll"><table className={compact ? 'compact' : ''}>
    <thead><tr><th>用户</th><th>所属部门</th><th>角色</th><th>状态</th><th>创建日期</th>{onEdit && <th className="align-right">操作</th>}</tr></thead>
    <tbody>{users.map((user, index) => <tr key={user.id}>
      <td><div className="person"><span className={`avatar avatar-${index % 4}`}>{user.name.slice(-2)}</span><div><strong>{user.name}</strong><small>{user.email}</small></div></div></td>
      <td>{user.department}</td><td><span className={`role ${user.role === '管理员' ? 'role-admin' : ''}`}>{user.role}</span></td>
      <td>{onToggle ? <button title="点击切换状态" className={`status ${user.status === '正常' ? 'active' : ''}`} onClick={() => onToggle(user)} aria-label={`${user.status === '正常' ? '停用' : '启用'}${user.name}`}><i />{user.status}</button> : <span className={`status ${user.status === '正常' ? 'active' : ''}`}><i />{user.status}</span>}</td>
      <td className="date-cell">{formatDate(user.createdAt)}</td>
      {onEdit && <td><div className="row-actions"><button className="icon-button" aria-label={`编辑${user.name}`} onClick={() => onEdit(user)}><Pencil size={16} /></button><button className="icon-button danger-text" aria-label={`删除${user.name}`} onClick={() => onDelete?.(user)}><Trash2 size={16} /></button></div></td>}
    </tr>)}</tbody>
  </table>{users.length === 0 && <div className="empty-state"><strong>没有找到匹配的用户</strong><p>试试其他关键词，或调整筛选条件。</p></div>}</div>
}
