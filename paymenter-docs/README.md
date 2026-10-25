# VMAUB CLOUD 服务与政策文档站

此目录是可独立构建的 VitePress 静态站点。仓库根目录仍是上游 VitePress 源码；部署本政策站时，请把项目根目录设为 `paymenter-docs`，不要构建仓库根目录的上游文档。

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

构建完成后，在 Pages 项目中绑定自己的文档域名。站点不写死 `pages.dev` 地址，不需要后端、数据库、Paymenter 密钥或 GitHub Token。

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
- 退款规则为不提供无理由退款、不因个人原因提前终止而按剩余时长退款；保留重复扣款、未按约交付、依法应退及有效承诺的处理条款。
- 经营主体、联系方式和实际启用的第三方处理方应保持准确；品牌名称不能代替依法必须披露的主体身份。
- 产品交付时间、续费与回收时间、退款特别规则应在购买前展示，并与后台执行方式一致。
- 政策中没有编造固定可用率、赔付比例、必然支持的退款接口、自动数据删除功能或不存在的备份服务。
- 实质调整条款时保留可核对的 Git 提交记录，更新页面日期，并按适用法律和既有订单约定通知用户。
- 当前代码使用本地搜索，没有接入广告追踪或外部字体服务。Cloudflare 托管本身可能处理必要的访问与安全数据。

撰写时核对的官方资料（法律是否适用于具体经营活动，仍取决于实际情况）：[个人信息保护法](https://www.miit.gov.cn/jgsj/zfs/fl/art/2022/art_515a4b20c12f430eab54bb4f56d89f56.html)、[消费者权益保护法实施条例](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2024/art_0aea188276a44f0baf940ab95ee00e0a.html)。
