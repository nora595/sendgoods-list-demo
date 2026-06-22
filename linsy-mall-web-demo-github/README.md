# LINSY 商城 WEB 端交易链路 Demo

林氏家居 B2B 商城 WEB 端交互演示，覆盖商品详情、列表模式规格弹层、意向清单及 PO/发运/付款查询链路。

## 在线预览

GitHub Pages 部署后访问：`index.html`

本地打开：双击 `index.html`，或使用静态服务：

```bash
npx serve -l 8765 .
# 浏览器打开 http://localhost:8765/
```

## 功能

- 商品详情：图库、Stock/Custom、Variations / List Mode、规格选择、加意向清单
- 列表模式弹层：Specification 表格、Attr 开关（DIM/CBM/G.W.）
- Description / Size Chart / Material / Installation / Recommend 标签页
- 场景图轮播、Same Series / Same Category 推荐
- 完整交易链路：首页 → 列表 → 详情 → 意向清单 → PO → 发运 → 付款

## 文件

| 文件 | 说明 |
|------|------|
| `index.html` | 入口（推荐） |
| `商城WEB端交易链路Demo.html` | 同上 |
| `mall-trade-demo.js` | 页面逻辑与 mock 数据 |
| `mall-trade-demo.css` | 样式 |
| `mall-i18n.js` | 中英文 / USD·CNY |

## 路由

```
#/detail/p1      商品详情（默认）
#/products       商品列表
#/wishlist       意向清单
#/account/po     PO 单
```

## 数据说明

Mock 数据结构对齐 BPS-WS `bff-market` 商品域模型（`RsResourceGoodsDomain`、`RsSkuDomain` 等），便于后续对接真实 API。
