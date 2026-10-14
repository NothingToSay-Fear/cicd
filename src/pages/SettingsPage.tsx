import { useState, type FormEvent } from 'react'
import { Check, Info, Save, Settings2 } from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import { defaultSettings } from '@/data/mock'

export function SettingsPage() {
  const settings = useAppStore((state) => state.settings)
  const saveSettings = useAppStore((state) => state.saveSettings)
  const [form, setForm] = useState(settings)
  const [message, setMessage] = useState('')
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!form.workspaceName.trim()) { setMessage('请输入工作空间名称。'); return }
    saveSettings({ ...form, workspaceName: form.workspaceName.trim(), contactEmail: form.contactEmail.trim() })
    setMessage('设置已保存。')
  }
  return <><div className="page-heading"><div><div className="eyebrow">WORKSPACE PREFERENCES</div><h1>系统设置</h1><p>让工作空间，更符合你的工作习惯。</p></div></div><div className="settings-layout"><aside className="settings-aside"><span className="settings-active"><Settings2 size={18} />通用设置</span><p>管理工作空间的基本信息和界面偏好。</p></aside><div><form className="panel settings-panel" onSubmit={submit}><div className="panel-heading"><div><h2>基本信息</h2><p>自定义工作空间信息</p></div></div><div className="settings-body"><label>工作空间名称<input required maxLength={30} value={form.workspaceName} onChange={(event) => { setForm({ ...form, workspaceName: event.target.value }); setMessage('') }} /><small>展示在左侧导航栏中，最多 30 个字符。</small></label><label>联系邮箱<input required type="email" value={form.contactEmail} onChange={(event) => { setForm({ ...form, contactEmail: event.target.value }); setMessage('') }} /><small>保存为工作空间联系信息，当前不发送邮件。</small></label></div><div className="settings-divider" /><div className="settings-body"><h2>界面偏好</h2><div className="setting-row"><div><strong>紧凑表格</strong><p>缩小行间距，在一屏内展示更多用户信息。</p></div><button type="button" className={`switch ${form.compactTable ? 'on' : ''}`} role="switch" aria-checked={form.compactTable} aria-label="紧凑表格" onClick={() => { setForm({ ...form, compactTable: !form.compactTable }); setMessage('') }}><span /></button></div></div><div className="settings-actions"><button type="button" className="button" onClick={() => { setForm({ ...defaultSettings }); setMessage('已填入默认设置，点击保存后生效。') }}>恢复默认</button><button className="button primary" type="submit"><Save size={16} />保存设置</button></div>{message && <div className="settings-feedback" role="status"><Check size={16} />{message}</div>}</form><div className="notice settings-notice"><Info size={18} /><div><strong>关于当前工作空间</strong><p>这是一个前端演示项目，数据保存在当前浏览器中。清除浏览器站点数据后将恢复初始内容；不同浏览器之间不会同步。</p></div></div></div></div></>
}
