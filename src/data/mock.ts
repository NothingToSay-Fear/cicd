import type { Settings, User } from '@/types'

export const defaultSettings: Settings = {
  workspaceName: 'Orbit 工作空间',
  contactEmail: 'admin@example.com',
  compactTable: false,
}

export const initialUsers: User[] = [
  { id: 'u001', name: '林沐', email: 'linmu@example.com', department: '产品设计部', role: '管理员', status: '正常', createdAt: '2026-10-14T01:30:00Z' },
  { id: 'u002', name: '陈一', email: 'chenyi@example.com', department: '研发中心', role: '编辑', status: '正常', createdAt: '2026-10-13T03:20:00Z' },
  { id: 'u003', name: '周可', email: 'zhouke@example.com', department: '市场运营部', role: '成员', status: '正常', createdAt: '2026-10-12T08:10:00Z' },
  { id: 'u004', name: '许知远', email: 'xuzhiyuan@example.com', department: '研发中心', role: '编辑', status: '正常', createdAt: '2026-10-11T06:00:00Z' },
  { id: 'u005', name: '苏晴', email: 'suqing@example.com', department: '产品设计部', role: '成员', status: '停用', createdAt: '2026-10-10T02:45:00Z' },
  { id: 'u006', name: '江宁', email: 'jiangning@example.com', department: '客户成功部', role: '成员', status: '正常', createdAt: '2026-10-09T09:15:00Z' },
  { id: 'u007', name: '宋予', email: 'songyu@example.com', department: '市场运营部', role: '编辑', status: '正常', createdAt: '2026-10-08T04:30:00Z' },
  { id: 'u008', name: '陆晨', email: 'luchen@example.com', department: '研发中心', role: '成员', status: '停用', createdAt: '2026-10-07T07:00:00Z' },
  { id: 'u009', name: '沈悦', email: 'shenyue@example.com', department: '客户成功部', role: '成员', status: '正常', createdAt: '2026-10-06T02:20:00Z' },
  { id: 'u010', name: '顾言', email: 'guyan@example.com', department: '产品设计部', role: '编辑', status: '正常', createdAt: '2026-10-05T05:00:00Z' },
  { id: 'u011', name: '温然', email: 'wenran@example.com', department: '研发中心', role: '管理员', status: '正常', createdAt: '2026-10-04T08:00:00Z' },
  { id: 'u012', name: '叶舟', email: 'yezhou@example.com', department: '市场运营部', role: '成员', status: '正常', createdAt: '2026-10-03T03:10:00Z' },
]

// 固定示例数据；接入后端时可替换为接口返回值。
export const traffic = {
  week: { labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], values: [1250, 1820, 1540, 2480, 2130, 2950, 3280], previous: [980, 1350, 1200, 1890, 1620, 2080, 2510] },
  month: { labels: ['第 1 周', '第 2 周', '第 3 周', '第 4 周'], values: [1810, 2350, 2080, 3280], previous: [1290, 1760, 1600, 2490] },
}
