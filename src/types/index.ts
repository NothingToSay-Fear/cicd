export type UserRole = '管理员' | '编辑' | '成员'
export type UserStatus = '正常' | '停用'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  department: string
  createdAt: string
}

export type UserInput = Omit<User, 'id' | 'createdAt'>

export interface Settings {
  workspaceName: string
  contactEmail: string
  compactTable: boolean
}
