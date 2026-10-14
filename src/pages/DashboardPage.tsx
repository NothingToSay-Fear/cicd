import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownToLine, ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, CircleCheck, ShieldCheck, UserPlus, Users } from 'lucide-react'
import { useUserStore } from '@/stores/useUserStore'
import { UserTable } from '@/components/UserTable'
import { traffic } from '@/data/mock'
import { exportUsers, formatDate } from '@/lib/format'

export function DashboardPage() {
  const users = useUserStore((state) => state.users)
  const [range, setRange] = useState<'week' | 'month'>('week')
  const active = users.filter((user) => user.status === '正常').length
  const admins = users.filter((user) => user.role === '管理员').length
  const departments = new Set(users.map((user) => user.department)).size
  const stats = [
    { title: '用户总数', value: users.length, icon: Users, color: 'blue', note: '工作空间内的全部用户', tag: '实时统计' },
    { title: '正常用户', value: active, icon: CircleCheck, color: 'green', note: '当前状态正常的用户', tag: `${users.length ? Math.round(active / users.length * 100) : 0}% 占比` },
    { title: '管理员', value: admins, icon: ShieldCheck, color: 'purple', note: '已分配管理员角色', tag: '角色统计' },
    { title: '协作部门', value: departments, icon: UserPlus, color: 'orange', note: '共同连接每一份创造力', tag: '团队协作' },
  ]
  const chart = traffic[range]
  const points = (values: number[]) => values.map((value, i) => `${48 + i * (652 / (values.length - 1))},${222 - value / 4000 * 190}`).join(' ')
  const recent = [...users].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)
  return <>
    <div className="page-heading"><div><div className="eyebrow">WORKSPACE OVERVIEW</div><h1>工作台概览v1.2<span className="hello">✦</span></h1><p>欢迎回来，Admin。这里是你的工作空间今日概况。</p></div><div className="heading-actions"><span className="date-badge"><CalendarDays size={16} />{formatDate(new Date().toISOString())}</span><button className="button" onClick={() => exportUsers(users)}><ArrowDownToLine size={16} />导出用户</button></div></div>
    <div className="stats-grid">{stats.map(({ title, value, icon: Icon, color, note, tag }) => <section className="stat-card" key={title}><div className="stat-top"><span>{title}</span><span className={`stat-icon ${color}`}><Icon size={20} /></span></div><div className="stat-value">{value.toLocaleString()}<span>个</span></div><div className="stat-bottom"><span>{note}</span><span className={`stat-tag ${color}`}>{tag}</span></div></section>)}</div>
    <div className="analytics-grid"><section className="panel traffic-panel"><div className="panel-heading"><div><h2>访问趋势 <span className="subtle-tag">示例数据</span></h2><p>了解工作空间的访问变化</p></div><label className="select-wrap"><span className="sr-only">趋势时间范围</span><select value={range} onChange={(event) => setRange(event.target.value as 'week' | 'month')}><option value="week">最近 7 天</option><option value="month">最近 4 周</option></select><ChevronDown size={14} /></label></div><div className="chart-summary"><strong>{chart.values.reduce((sum, value) => sum + value, 0).toLocaleString()}</strong><span>访问次数</span><span className="trend-up"><ArrowUpRight size={15} />{((chart.values.reduce((sum, value) => sum + value, 0) / chart.previous.reduce((sum, value) => sum + value, 0) - 1) * 100).toFixed(1)}%</span><div className="chart-legend"><span><i className="legend-current" />本期</span><span><i className="legend-previous" />上期</span></div></div>
      <svg className="line-chart" viewBox="0 0 730 265" role="img" aria-label={`${range === 'week' ? '最近七天' : '最近四周'}示例访问趋势，本期 ${chart.values.join('、')}，上期 ${chart.previous.join('、')}`}>
        <defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4f6cf3" stopOpacity=".19" /><stop offset="100%" stopColor="#4f6cf3" stopOpacity="0" /></linearGradient></defs>
        {[0, 1000, 2000, 3000, 4000].map((value) => <g key={value}><text x="0" y={226 - value / 4000 * 190}>{value === 0 ? '0' : `${value / 1000}k`}</text><line x1="48" x2="700" y1={222 - value / 4000 * 190} y2={222 - value / 4000 * 190} stroke="#edf0f6" strokeDasharray="4 5" /></g>)}
        <polygon points={`48,222 ${points(chart.values)} 700,222`} fill="url(#chart-fill)" /><polyline points={points(chart.previous)} fill="none" stroke="#c3cce6" strokeWidth="2.5" strokeDasharray="6 6" strokeLinejoin="round" /><polyline points={points(chart.values)} fill="none" stroke="#4f6cf3" strokeWidth="3" strokeLinejoin="round" />
        {chart.values.map((value, i) => <circle key={i} cx={48 + i * (652 / (chart.values.length - 1))} cy={222 - value / 4000 * 190} r="4" fill="#fff" stroke="#4f6cf3" strokeWidth="2"><title>{chart.labels[i]}：{value} 次访问</title></circle>)}
        {chart.labels.map((label, i) => <text key={label} x={48 + i * (652 / (chart.labels.length - 1))} y="254" textAnchor="middle">{label}</text>)}
      </svg>
    </section><section className="panel team-panel"><div className="panel-heading"><div><h2>团队角色分布</h2><p>每一个角色，都不可或缺</p></div><Users size={19} className="muted" /></div><div className="donut-wrap"><div className="donut" role="img" aria-label={`管理员 ${admins} 人，编辑 ${users.filter((user) => user.role === '编辑').length} 人，成员 ${users.filter((user) => user.role === '成员').length} 人`} style={{ background: users.length ? `conic-gradient(#4f6cf3 0 ${admins / users.length * 100}%, #9daaf9 ${admins / users.length * 100}% ${users.filter((user) => user.role !== '成员').length / users.length * 100}%, #e7ebff 0 100%)` : '#e7ebff' }}><div><strong>{users.length}</strong><span>团队用户</span></div></div></div><div className="role-legend">{(['管理员', '编辑', '成员'] as const).map((role, i) => <div key={role}><span><i style={{ background: ['#4f6cf3', '#9daaf9', '#e7ebff'][i] }} />{role}</span><strong>{users.filter((user) => user.role === role).length}<small> 人</small></strong><span>{users.length ? Math.round(users.filter((user) => user.role === role).length / users.length * 100) : 0}%</span></div>)}</div></section></div>
    <section className="panel"><div className="panel-heading"><div><h2>最近加入的用户 <span className="count-badge">{users.length}</span></h2><p>与你一起，创造更多可能</p></div><Link className="text-link" to="/users">查看全部 <ArrowRight size={16} /></Link></div><UserTable users={recent} /></section>
    <div className="workspace-tip"><span className="tip-icon"><ShieldCheck size={19} /></span><div><strong>有序管理，从每一位成员开始</strong><p>及时更新成员信息和角色，让团队协作井井有条。</p></div><Link to="/users">管理用户 <ArrowRight size={16} /></Link></div>
  </>
}
