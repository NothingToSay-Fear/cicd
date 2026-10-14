import type { User } from '@/types'

export const formatDate = (value: string) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai',
}).format(new Date(value))

export function exportUsers(users: User[]) {
  const escapeCell = (value: string) => {
    const safe = /^[=+@\-\t\r]/.test(value) ? `'${value}` : value
    return `"${safe.replaceAll('"', '""')}"`
  }
  const rows = [['姓名', '邮箱', '部门', '角色', '状态', '创建日期'], ...users.map((user) => [user.name, user.email, user.department, user.role, user.status, formatDate(user.createdAt)])]
  const blob = new Blob(['\uFEFF' + rows.map((row) => row.map(escapeCell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'Orbit-用户列表.csv'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
