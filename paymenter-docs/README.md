# VMAUB CLOUD 服务与政策文档站

此目录是可独立构建的 VitePress 静态站点，支持 Cloudflare Workers 静态资源及 Cloudflare Pages。仓库根目录仍是上游 VitePress 源码，默认的根目录 `pnpm build` 不会生成本政策站。

## Cloudflare Workers 部署（已有 Workers 项目使用此方案）

如果部署日志出现 `Executing user deploy command: npx wrangler deploy`，说明正在使用 Workers 构建。进入该项目的 **设置 → 构建**，选择下面一种目录配置，不要混用两种命令。

### 方案 A：根目录保持仓库根目录

适合已经创建项目、不方便修改根目录的情况：

| 项目 | 设置 |
| --- | --- |
| 生产分支 | `main` |
| 根目录 | 保持仓库根目录，留空或 `/` |
| 构建命令 | `cd paymenter-docs && pnpm install --frozen-lockfile && pnpm build` |
| 部署命令 | `cd paymenter-docs && pnpm deploy:worker` |
| 非生产分支部署命令（如果启用） | `cd paymenter-docs && pnpm exec wrangler versions upload --config wrangler.jsonc` |
| 构建变量 | `NODE_VERSION=24`、`SKIP_DEPENDENCY_INSTALL=1` |

构建命令和部署命令是分别执行的，因此两处都必须切换到 `paymenter-docs`。pnpm 版本由本目录 `package.json` 中的 `packageManager` 固定为 `11.25.0`。

### 方案 B：根目录设为 `paymenter-docs`

| 项目 | 设置 |
| --- | --- |
| 根目录 | `paymenter-docs` |
| 构建命令 | `pnpm install --frozen-lockfile && pnpm build` |
| 部署命令 | `pnpm deploy:worker` |
| 非生产分支部署命令（如果启用） | `pnpm exec wrangler versions upload --config wrangler.jsonc` |
| 构建变量 | `NODE_VERSION=24`、`SKIP_DEPENDENCY_INSTALL=1` |

`wrangler.jsonc` 会将 `.vitepress/dist` 作为静态资源发布，不需要后端入口脚本。Workers 项目不需要单独填写 Pages 的“输出目录”。配置中的 Worker 名称为 `vitepress`；如你的项目使用其他名称，应同步修改该字段。

本地无上传检查：

```sh
pnpm build
pnpm check:worker
```

`check:worker` 是 dry-run，不会向 Cloudflare 发布。实际上传由 Cloudflare 构建环境内的授权完成，不要把 API Token 或账户密钥写进仓库或政策页面。

官方参考：[Workers 静态资源](https://developers.cloudflare.com/workers/static-assets/get-started/)、[Wrangler 资源配置](https://developers.cloudflare.com/workers/wrangler/configuration/#assets)、[构建变量](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#environment-variables)。

## Cloudflare Pages 部署

关联 GitHub 仓库 `1331244/vitepress`，使用以下设置：

| 项目 | 设置 |
| --- | --- |
| 生产分支 | `main` |
| 根目录（Root directory） | `paymenter-docs` |
| 框架预设 | VitePress；若预设自动改写命令，以本表为准 |
| 构建命令 | `pnpm install --frozen-lockfile && pnpm build` |
| 输出目录 | `.vitepress/dist`（相对于上述根目录） |
| 环境变量 | `NODE_VERSION=24`、`PNPM_VERSION=11.25.0`、`SKIP_DEPENDENCY_INSTALL=1` |

这里显式安装本目录的锁定依赖，避免 Cloudflare 自动安装仓库根目录中的框架开发依赖。此目录有独立的 `pnpm-workspace.yaml`，不加入上游源码工作区。

构建完成后，在 Pages 项目中绑定自己的文档域名。站点不写死托管域名，不需要后端、数据库、Paymenter 密钥或 GitHub Token。

官方参考：[VitePress 部署到 Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/)、[构建镜像与版本变量](https://developers.cloudflare.com/pages/configuration/build-image/)。

## 本地开发

需要 Node.js 24 和 pnpm 11.25.0。在本目录执行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

生产构建和预览：

```sh
pnpm build
pnpm preview
```

## 页面与 Paymenter 接入

| 页面 | 部署后的路径 |
| --- | --- |
| 阅读指引 | `/` |
| 服务条款 | `/terms` |
| 隐私政策 | `/privacy` |
| 退款政策 | `/refund` |
| 禁止行为 | `/acceptable-use` |
| 服务终止 | `/termination` |

在 Paymenter 页脚或注册、结算页面，链接到自己部署的上述文档地址即可。本文档站的发布不会自动修改 Paymenter 的注册授权、退款、保留期限或数据删除流程。

## 维护要点

- 品牌使用 `VMAUB CLOUD`，联系渠道为 `https://vmaub.com/tickets` 站内工单。
- 退款页使用简短说明：`VMAUB CLOUD 不支持任何退款。`联系渠道为站内工单。
- 经营主体、联系方式和实际启用的第三方处理方应保持准确；品牌名称不能代替依法必须披露的主体身份。
- 产品交付时间、续费与回收时间、退款特别规则应在购买前展示，并与后台执行方式一致。
- 政策中没有编造固定可用率、赔付比例、必然支持的退款接口、自动数据删除功能或不存在的备份服务。
- 实质调整条款时保留可核对的 Git 提交记录，更新页面日期，并按适用法律和既有订单约定通知用户。
- 当前代码使用本地搜索，没有接入广告追踪或外部字体服务。Cloudflare 托管本身可能处理必要的访问与安全数据。

撰写时核对的官方资料（法律是否适用于具体经营活动，仍取决于实际情况）：[个人信息保护法](https://www.miit.gov.cn/jgsj/zfs/fl/art/2022/art_515a4b20c12f430eab54bb4f56d89f56.html)、[消费者权益保护法实施条例](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2024/art_0aea188276a44f0baf940ab95ee00e0a.html)。
