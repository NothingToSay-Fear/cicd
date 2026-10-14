# Orbit Admin

React + TypeScript + Vite + Zustand 后台管理练习项目，位于 `D:\Study\cicd`。原有学习笔记与演示文件仍保留在 `D:\demo\八股`。暂不包含 CI/CD、后端接口、登录或真实权限系统。

## 本地启动

Node.js 要求：20.19+（20.x）或 22.12+，推荐使用 Node 22 LTS。

先执行 `cd D:\Study\cicd`，以下命令均在该项目目录内运行。

```bash
npm install
npm run dev
```

如果 Windows PowerShell 阻止运行 `npm.ps1`，使用 `npm.cmd install` 和 `npm.cmd run dev`，无需修改执行策略。打开终端打印的本地地址（默认 http://localhost:5173）。首次安装后，后续可用 `npm ci` 按 lockfile 安装。

## 功能

- 工作台 `/`：用户统计、团队角色分布、最近加入的用户；访问趋势为固定示例数据，支持切换时间范围。
- 用户管理 `/users`：新增、编辑、删除确认、启用/停用、姓名/邮箱/部门搜索、角色与状态筛选、分页、导出筛选结果为 CSV。
- 系统设置 `/settings`：工作空间名称、联系邮箱、紧凑表格；保存后生效，支持填入默认设置。
- 响应式布局、桌面侧边栏收起、移动端导航、404 页面。

用户、角色、状态均为演示数据，不具备真实身份认证或访问控制效果。邮箱使用 example.com；请勿把真实敏感信息当作演示数据录入。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm run lint` | 检查项目源码与 Vite 配置 |
| `npm run build` | 类型检查并构建到 dist |
| `npm run preview` | 本地预览构建结果，需要先执行 build |

## 目录

```text
src/
  components/     # 通用弹窗、用户表格
  data/           # 初始用户与示例趋势
  layouts/        # 后台布局和导航
  lib/            # 日期格式化与 CSV 导出
  pages/          # 工作台、用户管理、系统设置
  stores/         # Zustand 用户状态与界面偏好
  types/          # User / Settings 等类型
  App.tsx         # 路由
  main.tsx        # React 入口
  styles.css      # 全局样式及响应式布局
public/           # 静态资源
```

`@/` 指向 `src/`。页面通过 Zustand selector 订阅需要的状态。表单草稿、筛选条件和弹窗等页面临时状态使用 React useState。

Vite 配置使用 `.mts`、ESLint 配置使用 `.mjs`，前端源码正常使用 ESM。项目配置仅作用于本项目目录，不影响其他目录的学习脚本。

## 数据保存

`useUserStore` 使用 `persist` 将用户保存在 localStorage 的 `orbit-admin-users` 中；`useAppStore` 将工作空间设置和侧边栏偏好保存在 `orbit-admin-preferences` 中。刷新页面保留数据，浏览器之间不会同步。开发者工具中删除这两个键并刷新，可恢复初始内容。

后续接入真实 API 时，可增加 services 目录，替换用户状态中的本地操作；登录及权限必须配合服务端校验。当前使用 BrowserRouter，未来部署到静态服务器时需要为前端路由配置 index.html 回退；本项目尚未添加任何部署配置。
