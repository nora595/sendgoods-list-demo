/* 发运单列表 Demo — 对齐现网 BFF/PaaS 逻辑（所见即所得） */
/** 每次发布 demo 时更新此时间，用于顶部提示条 */
const DEMO_UPDATED_AT = "2026-06-10 11:32:23";

(function () {
  const STATUS_CODE = {
    1: "草稿",
    22: "待付款",
    25: "待发运",
    2: "发运异常",
    6: "待装箱",
    61: "装箱中",
    3: "已发运",
    5: "已截货",
    4: "已放提单",
    "-2": "已作废",
    62: "部分发运",
    63: "等待NBO新批次",
    65: "修改NBO异常"
  };

  const TRADE_MODE = { "01": "FOB", "02": "EXW", "03": "CIF", "04": "CFR" };

  /** 导出装箱单 — 仅以下状态且存在装箱数据时可导出 */
  const PACKAGE_EXPORT_ALLOWED_STATES = new Set([3, 4, 62]);
  const PACKAGE_EXPORT_TIP = "仅「已发运 / 已放提单 / 部分发运」状态支持导出装箱单";

  /**
   * 操作列矩阵（来源：需求文档 — 发运单状态 × 申报状态）
   * 后端 SendgoodsCon 不提供操作列 API，由前端按 dataState + applyCustomsStatus 渲染
   */
  const ACTION_MAP = {
    "草稿-待处理": ["确认发运单", "临时授信", "日志"],
    "草稿-已申报": ["确认发运单", "临时授信", "日志"],
    "待付款-待处理": ["确认装箱", "临时授信", "日志"],
    "待付款-已申报": ["确认装箱", "临时授信", "日志"],
    "待发运-待处理": ["确认装箱", "修改进仓编号", "日志"],
    "待发运-已申报": ["确认装箱", "修改进仓编号", "查看报关详情", "日志"],
    "装箱中-待处理": ["补充装柜信息", "日志"],
    "装箱中-已申报": ["补充装柜信息", "日志"],
    "已发运-待处理": ["放提单", "补充装柜信息", "日志"],
    "已发运-已申报": ["放提单", "补充装柜信息", "日志"],
    "已放提单-待处理": ["补充装柜信息", "查看报关详情", "日志"],
    "已放提单-已申报": ["补充装柜信息", "查看报关详情", "日志"],
    "已截货-待处理": ["确认装箱", "日志"],
    "已截货-已申报": ["补充装柜信息", "查看报关详情", "日志"],
    "部分发运-待处理": ["补充装柜信息", "查看报关详情", "日志"],
    "部分发运-已申报": ["补充装柜信息", "查看报关详情", "日志"],
    "待装箱-待处理": ["补充装柜信息", "日志"],
    "待装箱-已申报": ["确认装箱", "修改进仓编号", "查看报关详情", "日志"],
    "发运异常-待处理": ["确认装箱", "日志"],
    "发运异常-已申报": ["确认装箱", "日志"],
    "等待NBO新批次-待处理": ["确认装箱", "日志"],
    "等待NBO新批次-已申报": ["确认装箱", "日志"],
    "修改NBO异常-待处理": ["确认装箱", "日志"],
    "修改NBO异常-已申报": ["确认装箱", "日志"],
    "已作废-待处理": ["日志"],
    "已作废-已申报": ["日志"]
  };

  /** 来自 GoodsExcel.covertSendGoodsListAllExcelParam() — exportSendGoodsList.json */
  const EXPORT_LIST_COLUMNS = [
    { showName: "客户", dataName: "memberBname" },
    { showName: "发运单号", dataName: "sendgoodsCode" },
    { showName: "状态", dataName: "dataStateStr" },
    { showName: "淘宝单号", dataName: "contractEcurl" },
    { showName: "创建日期", dataName: "gmtCreate" },
    { showName: "计划装柜日期", dataName: "gmtUse" },
    { showName: "实际装柜日期", dataName: "gmtVaild" },
    { showName: "贸易方式", dataName: "contractPumode" },
    { showName: "商品数量", dataName: "camountRes" },
    { showName: "包件数量", dataName: "goodsAhnumRes" },
    { showName: "报关单", dataName: "contractInvcode" },
    { showName: "装箱单", dataName: "packageFare" }
  ];

  /** 来自 GoodsExcel.covertSendGoodsDetailAllExcelParam() — exportSendGoods.json */
  const EXPORT_DETAIL_COLUMNS = [
    { showName: "客户ID", dataName: "memberBcode" },
    { showName: "林氏PI单号", dataName: "contractNbillcode" },
    { showName: "客户PO单号", dataName: "goodsSpec1" },
    { showName: "BPS订单号", dataName: "contractBillcode" },
    { showName: "商品编码", dataName: "skuNo" },
    { showName: "型号", dataName: "goodsNo" },
    { showName: "规格描述", dataName: "skuName" },
    { showName: "体积", dataName: "goodsCweight" },
    { showName: "包件", dataName: "goodsAhnum" },
    { showName: "金额", dataName: "contractGoodsPrice" },
    { showName: "毛重", dataName: "goodsTopweight1" },
    { showName: "装箱数量(计划)", dataName: "goodsCamount" },
    { showName: "装箱数量(实际)", dataName: "sgCamount" },
    { showName: "装箱体积(计划)", dataName: "goodsAhweightStr" },
    { showName: "装箱体积(实际)", dataName: "sgGoodsAhweightSumStr" },
    { showName: "装箱件数(计划)", dataName: "goodsCamount1" },
    { showName: "装箱毛重(计划)", dataName: "goodsTopweightStr" },
    { showName: "装箱毛重(实际)", dataName: "sgGoodsTopweightSumStr" },
    { showName: "装箱金额(计划)", dataName: "contractGoodsMoney" },
    { showName: "发货仓库", dataName: "warehouseName" },
    { showName: "进仓编号1", dataName: "goodsSpec4" },
    { showName: "进仓编号2", dataName: "goodsSpec5" },
    { showName: "编码(客户)", dataName: "goodsProperty4" },
    { showName: "规格(客户)", dataName: "goodsSpec" },
    { showName: "材质(客户)", dataName: "userinfoGoodsMaterial" },
    { showName: "预排柜号", dataName: "expressName" },
    { showName: "柜型", dataName: "packageName" },
    { showName: "实际柜号", dataName: "packageBillno" },
    { showName: "封条号", dataName: "expressCode" }
  ];

  const EXPORT_REBATE_COLUMNS = [
    { showName: "客户ID", dataName: "memberBcode" },
    { showName: "客户名称", dataName: "memberBname" },
    { showName: "发运单号", dataName: "sendgoodsCode" },
    { showName: "批次单号", dataName: "batchNo" },
    { showName: "发货时间", dataName: "sendgoodsVaildate" },
    { showName: "币种", dataName: "pricesetCurrency" },
    { showName: "返利总额", dataName: "rebateTotalPrice" },
    { showName: "建店返利", dataName: "storeRebateTotalPrice" },
    { showName: "销售返利", dataName: "salesRebateTotalPrice" },
    { showName: "售后返利", dataName: "afterSalesRebateTotalPrice" },
    { showName: "其他返利", dataName: "otherRebateTotalPrice" }
  ];

  const EXPORT_BATCH_COLUMNS = [
    { showName: "发运单号", dataName: "sendgoodsCode" },
    { showName: "BPS单号", dataName: "contractBillcode" },
    { showName: "批次单号", dataName: "batchNo" },
    { showName: "物料编号", dataName: "skuNo" },
    { showName: "子项", dataName: "goodsNo" },
    { showName: "客户编号", dataName: "memberBcode" },
    { showName: "客户名称", dataName: "memberBname" },
    { showName: "NBO店铺编号", dataName: "nboStoreCode" },
    { showName: "发运单状态", dataName: "dataStateStr" },
    { showName: "币种", dataName: "pricesetCurrency" },
    { showName: "物料单价", dataName: "contractGoodsPrice" },
    { showName: "批次物料数量", dataName: "goodsCamount" }
  ];

  /** 来自 GoodsExcel.covertPackageAllExcelParam() — generatePack.json / PackageTemplate */
  const EXPORT_PACKAGE_COLUMNS = [
    { showName: "父项编码&父项序号", dataName: "parentSkuNO" },
    { showName: "父项序号", dataName: "parentSkuNum" },
    { showName: "父项编码&中项编码", dataName: "parentAndSkuNO" },
    { showName: "PCS", dataName: "pcs" },
    { showName: "订单号(P.O.NO.)", dataName: "contractNbillcode" },
    { showName: "包件编码", dataName: "packageSkuNo" },
    { showName: "父项编码(ITEMNO.)", dataName: "skuNo" },
    { showName: "报关名称", dataName: "parentCATEGORY" },
    { showName: "型号", dataName: "goodsNo" },
    { showName: "规格(STANDARD)", dataName: "skuName" },
    { showName: "采购数量", dataName: "goodsCamount" },
    { showName: "包件数", dataName: "goodsAhnum" },
    { showName: "总包件数", dataName: "totalGoodsAhnum" },
    { showName: "单价(USA)", dataName: "contractGoodsPrice" },
    { showName: "总额（USA)", dataName: "totalContractGoodsPrice" },
    { showName: "实际出货金额", dataName: "realContractGoodsPrice" },
    { showName: "CBM", dataName: "cbm" },
    { showName: "总体积", dataName: "totalCbm" },
    { showName: "实际出货体积", dataName: "realCbm" },
    { showName: "中项编码", dataName: "midSkuNo" },
    { showName: "中项名称", dataName: "midName" },
    { showName: "中项规格", dataName: "midSkuName" },
    { showName: "中项采购数", dataName: "midGoodsCamount", key: "midGoodsCamount" },
    { showName: "中项采购单价", dataName: "fobPrice" },
    { showName: "中项总价", dataName: "totalFobPrice" },
    { showName: "中项包件数", dataName: "pakageQua" },
    { showName: "中项总包件数", dataName: "totalPakageQua" },
    { showName: "实际出货包件", dataName: "realPackageQua" },
    { showName: "CBM", dataName: "midCbm", key: "midCbm" },
    { showName: "总体积", dataName: "midTotalCbm", key: "midTotalCbm" },
    { showName: "实际出货体积", dataName: "midRealCbm", key: "midRealCbm" },
    { showName: "报关类目", dataName: "midCategory" },
    { showName: "产品尺寸MM", dataName: "midProductMM" },
    { showName: "包件编码", dataName: "packNumber", key: "packNumber" },
    { showName: "包件规格", dataName: "packSpec" },
    { showName: "采购数量", dataName: "packNum", key: "packNum" },
    { showName: "净重", dataName: "netWeight" },
    { showName: "总净重", dataName: "totalNetWeight" },
    { showName: "毛重", dataName: "grossWeight" },
    { showName: "总毛重", dataName: "totalGrossWeight" },
    { showName: "外箱尺寸MM", dataName: "packProductMM" },
    { showName: "备注", dataName: "memo" },
    { showName: "柜号", dataName: "packageName", key: "packCabinetNo" },
    { showName: "实际装柜柜号", dataName: "actualCabinetNo" },
    { showName: "柜号&封号", dataName: "cabinetAndSeal" },
    { showName: "订仓号", dataName: "bookingNo" }
  ];

  const PACKAGE_EXPORT_CONFIG = {
    api: "generatePack.json",
    template: "PackageTemplate",
    fileName: "PackageTemplate.xls",
    columns: EXPORT_PACKAGE_COLUMNS
  };

  const EXPORT_CONFIG = {
    list: { api: "exportSendGoodsList.json", template: "SendGoodsListTemplate", fileName: "SendGoodsList.xls", columns: EXPORT_LIST_COLUMNS },
    detail: { api: "exportSendGoods.json", template: "SendGoodsDetailTemplate", fileName: "SendGoodsDetail.xls", columns: EXPORT_DETAIL_COLUMNS },
    rebate: { api: "exportSgSendgoodsRebateDetail.json", template: "SgSendgoodsRebateDetail", fileName: "导出发运单的返利明细.xlsx", columns: EXPORT_REBATE_COLUMNS },
    batch: { api: "exportSgSendgoodsBatchInfoDetail.json", template: "SgSendgoodsBatchInfoDetail", fileName: "导出批次单详情.xlsx", columns: EXPORT_BATCH_COLUMNS }
  };

  const columns = [
    { key: "shipmentNo", label: "发运单号" },
    { key: "customerInfo", label: "客户信息" },
    { key: "detailNo", label: "明细单号" },
    { key: "status", label: "状态" },
    { key: "totalAmount", label: "总金额" },
    { key: "totalQuantity", label: "总数量" },
    { key: "totalVolume", label: "总方数" },
    { key: "shipTime", label: "发货时间" },
    { key: "creator", label: "创建人 / 创建时间" },
    { key: "aliOrderNo", label: "阿里订单号" },
    { key: "planCabinetDate", label: "计划装柜日期" },
    { key: "actualCabinetDate", label: "实际装柜日期" },
    { key: "tradeMode", label: "贸易方式" },
    { key: "productQuantity", label: "商品数量" },
    { key: "packageQuantity", label: "包件数量" },
    { key: "loadingPort", label: "装货港" },
    { key: "declareStatus", label: "申请报关状态" },
    { key: "customsNo", label: "报关单号" },
    { key: "customsAmount", label: "报关金额" },
    { key: "tradeCountry", label: "贸易国" },
    { key: "contractNo", label: "报关单合同协议号" },
    { key: "updater", label: "更新人/更新时间" },
    { key: "actions", label: "操作" }
  ];

  const PAGE_SIZE = 10;
  let shipments = [];
  let operateLogs = {};
  let logDialogCtx = null;
  let cabinetDialogCtx = null;
  let currentList = [];
  let pageNum = 1;

  function money(v, currency) {
    const c = currency || "USD";
    const n = Number(v || 0);
    return `${c === "USD" ? "$" : "¥"}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function moneySpaced(v, currency) {
    const sym = (currency || "USD") === "USD" ? "$" : "¥";
    const n = Number(v || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${sym} ${n}`;
  }

  function num(v, scale) {
    return Number(v || 0).toFixed(scale == null ? 2 : scale);
  }

  function createRow(partial) {
    const row = {
      sendgoodsId: partial.sendgoodsId,
      sendgoodsCode: partial.sendgoodsCode,
      memberBcode: partial.memberBcode,
      memberBname: partial.memberBname,
      contractNbillcode: partial.contractNbillcode || "",
      customerPo: partial.customerPo || "",
      contractBillcode: partial.contractBillcode || "",
      contractEcurl: partial.contractEcurl || "",
      dataState: partial.dataState,
      applyCustomsStatus: partial.applyCustomsStatus || "0",
      pricesetCurrency: partial.pricesetCurrency || "USD",
      contractPumode: partial.contractPumode || "01",
      settlementEntity: partial.settlementEntity || "LSMY-HK",
      gmtCreate: partial.gmtCreate,
      createUser: partial.createUser,
      sendgoodsVaildate: partial.sendgoodsVaildate || "",
      gmtUse: partial.gmtUse || "",
      gmtVaild: partial.gmtVaild || "",
      pricesetNpriceTotal: partial.pricesetNpriceTotal || 0,
      adjustedTotalPrice: partial.adjustedTotalPrice || 0,
      planSum: partial.planSum || 0,
      actualSum: partial.actualSum || 0,
      totalVolume: partial.totalVolume || 0,
      pricesetCurrencyPort: partial.pricesetCurrencyPort || "",
      pricesetCurrency1: partial.pricesetCurrency1 || "",
      destinationCountry: partial.destinationCountry || "",
      contractInvcode: partial.contractInvcode || "",
      customsAmountValue: partial.customsAmountValue || 0,
      areaName: partial.areaName || "",
      contractNo: partial.contractNo || "",
      updateUser: partial.updateUser || "",
      gmtModified: partial.gmtModified || "",
      lcrpMoney: partial.lcrpMoney || 0,
      customsInfoNo: partial.customsInfoNo || "",
      packageRemark: partial.packageRemark || "",
      packageMode: partial.packageMode || "",
      packageBillno: partial.packageBillno || "",
      packageName: partial.packageName || "",
      expressName: partial.expressName || "",
      expressCode: partial.expressCode || "",
      contractInvoice: partial.contractInvoice || "",
      packageFare: partial.packageFare || "",
      contractDelcode: partial.contractDelcode || "",
      sendgoodsGetdate: partial.sendgoodsGetdate || "",
      sendgoodsGddate: partial.sendgoodsGddate || "",
      sendgoodsPdate: partial.sendgoodsPdate || "",
      warehouseName: partial.warehouseName || "佛山仓",
      sendgoodsRemark: partial.sendgoodsRemark || "",
      warehouseInNo1: partial.warehouseInNo1 || "IN-A001",
      warehouseInNo2: partial.warehouseInNo2 || "BIN-01",
      deliveryMode: partial.deliveryMode || "送货到仓",
      shippingTemplate: partial.shippingTemplate || "海外散货模板",
      consignee: partial.consignee || "",
      customsCode: partial.customsCode || partial.customsInfoNo || "",
      exportCustomsFeeCny: partial.exportCustomsFeeCny || 0,
      freightDiffCny: partial.freightDiffCny || 0,
      interfaceInfo: partial.interfaceInfo || "NBO：待同步；SCM：待回写",
      bookingNo: partial.bookingNo || "",
      truckInfo: partial.truckInfo || "",
      lockedEnough: partial.lockedEnough !== false,
      paymentCreated: partial.paymentCreated || [22, 25, 61, 3, 4, 62].includes(Number(partial.dataState)),
      customerSkuEnabled: partial.customerSkuEnabled !== false,
      hasAfterSalePending: partial.hasAfterSalePending || false,
      goodsList: partial.goodsList || null
    };
    operateLogs[row.sendgoodsCode] = partial.logs || [
      { content: `创建发运单 ${row.sendgoodsCode}`, time: row.gmtCreate, user: row.createUser }
    ];
    return row;
  }

  function buildSampleOperateLogs(code) {
    return [
      { content: "更新发运单状态从：3 变为：25", user: "MALL-USER", time: "2026-06-04 12:13:04" },
      { content: "更新发运单状态从：25 变为：6", user: "Elaine", time: "2026-06-04 11:58:22" },
      { content: `NBO理货回调失败：{"code":"500","msg":"批次单不存在","sendgoodsCode":"${code}","traceId":"a8f3c2d1"}`, user: "AUTO", time: "2026-06-04 11:45:10" },
      { content: "确认发运单：推送 NBO 理货并生成付款批次单", user: "Amy", time: "2026-06-04 10:30:18" },
      { content: "更新发运单状态从：1 变为：22", user: "MALL-USER", time: "2026-06-03 18:22:05" },
      { content: "保存发运单排柜草稿", user: "Amy", time: "2026-06-03 17:10:44" },
      { content: "更新发运单商品排入数量与进仓编号", user: "Amy", time: "2026-06-03 16:55:31" },
      { content: "申请报关成功，预报关单号 YBG2605280002", user: "Elaine", time: "2026-06-02 14:08:19" },
      { content: "更新发运单状态从：6 变为：61", user: "AUTO", time: "2026-06-02 11:20:00" },
      { content: "确认装箱成功，状态变更为装箱中", user: "Lily", time: "2026-06-01 16:40:12" },
      { content: "补充装柜信息：更新装柜日期、柜号、封条号、船期与港口信息", user: "Lily", time: "2026-06-01 14:10:00" },
      { content: "提交临时授信申请，备注：客户已提供付款水单", user: "Amy", time: "2026-05-31 09:15:33" },
      { content: "更新发运单状态从：22 变为：25", user: "MALL-USER", time: "2026-05-30 15:22:18" },
      { content: "SCM 回写装柜信息成功", user: "AUTO", time: "2026-05-29 20:01:07" },
      { content: "导入发运数据：共 266 件商品", user: "Amy", time: "2026-05-28 11:05:00" },
      { content: "更新发运单状态从：0 变为：1", user: "MALL-USER", time: "2026-05-28 10:25:00" },
      { content: `创建发运单 ${code}`, user: "Amy", time: "2026-05-28 10:22:00" }
    ];
  }

  function buildDefaultGoods(row) {
    const totalAdj = Number(row.adjustedTotalPrice || 0);
    const q1 = Math.max(1, Math.floor(Number(row.planSum || 2) * 0.6) || 1);
    const q2 = Math.max(0, Number(row.planSum || 0) - q1);
    const lines = [{
      skuNo: "LS-SF-001",
      goodsNo: "M001",
      skuName: "实木床 1.8m",
      contractNbillcode: row.contractNbillcode,
      goodsSpec1: row.customerPo,
      contractBillcode: row.contractBillcode,
      goodsCamount: q1,
      sgCamount: q1,
      goodsAhnum: 2,
      goodsAhweight: 0.85,
      goodsTopweight: 12.5,
      contractGoodsPrice: 120,
      contractGoodsMoney: q1 * 120,
      warehouseName: row.warehouseName,
      goodsSpec4: row.warehouseInNo1,
      goodsSpec5: row.warehouseInNo2,
      goodsProperty4: "CUST-001",
      goodsSpec: "1800*2000",
      userinfoGoodsMaterial: "橡木",
      spuNo: "SPU-BED-18",
      unitName: "件",
      customerSkuName: "Oak Bed",
      financeStatus: "财审通过",
      financeTag: "绿标",
      lsCategory: "卧室家具",
      customsCategory: "木制床",
      customsUnit: "件",
      returnedQty: 0,
      returnedAmount: 0,
      refundAmount: 0,
      expressName: row.expressName || row.packageRemark || "PC-001",
      packageName: row.packageName || "40HQ",
      packageBillno: row.packageBillno || "",
      expressCode: row.expressCode || "",
      adjustedUnitPrice: q1 ? num(totalAdj * 0.55 / q1, 4) : 0,
      adjustedTotalPrice: num(totalAdj * 0.55, 2),
      transportationUnitPrice: q1 ? num(totalAdj * 0.25 / q1, 4) : 0,
      transportationTotalPrice: num(totalAdj * 0.25, 2),
      rebateUnitPrice: q1 ? num(totalAdj * 0.2 / q1, 4) : 0,
      rebateTotalPrice: num(totalAdj * 0.2, 2),
      batchNo: "BATCH-001"
    }];
    if (q2 > 0) {
      lines.push({
        skuNo: "LS-SF-002",
        goodsNo: "M002",
        skuName: "床头柜",
        contractNbillcode: row.contractNbillcode,
        goodsSpec1: row.customerPo,
        contractBillcode: row.contractBillcode,
        goodsCamount: q2,
        sgCamount: q2,
        goodsAhnum: 1,
        goodsAhweight: 0.12,
        goodsTopweight: 3.2,
        contractGoodsPrice: 45,
        contractGoodsMoney: q2 * 45,
        warehouseName: row.warehouseName,
        goodsSpec4: row.warehouseInNo1,
        goodsSpec5: row.warehouseInNo2,
        goodsProperty4: "CUST-002",
        goodsSpec: "500*400",
        userinfoGoodsMaterial: "橡木",
        spuNo: "SPU-NST-50",
        unitName: "件",
        customerSkuName: "Night Stand",
        financeStatus: "财审通过",
        financeTag: "绿标",
        lsCategory: "卧室家具",
        customsCategory: "木制柜",
        customsUnit: "件",
        returnedQty: 0,
        returnedAmount: 0,
        refundAmount: 0,
        expressName: row.expressName || row.packageRemark || "PC-001",
        packageName: row.packageName || "40HQ",
        packageBillno: row.packageBillno || "",
        expressCode: row.expressCode || "",
        adjustedUnitPrice: q2 ? num(totalAdj * 0.45 / q2, 4) : 0,
        adjustedTotalPrice: num(totalAdj * 0.45, 2),
        transportationUnitPrice: 0,
        transportationTotalPrice: 0,
        rebateUnitPrice: 0,
        rebateTotalPrice: 0,
        batchNo: "BATCH-002"
      });
    }
    return lines;
  }

  function ensureGoodsList(row) {
    if (!row.goodsList || !row.goodsList.length) {
      row.goodsList = buildDefaultGoods(row);
    }
    recalcAdjustedTotal(row);
    recalcVolume(row);
    return row.goodsList;
  }

  function recalcVolume(row) {
    const goods = row.goodsList || [];
    row.totalVolume = Number(goods.reduce((sum, g) => {
      const qty = Number(g.sgCamount || g.goodsCamount || 0);
      return sum + Number(g.goodsAhweight || 0) * qty;
    }, 0).toFixed(3));
    return row.totalVolume;
  }

  /** 对齐 SgSendgoodsServiceImpl.querySgSendgoodsReDomainModelPage 调价汇总逻辑 */
  function recalcAdjustedTotal(row) {
    const goods = row.goodsList || [];
    const sum = goods.reduce((acc, g) => {
      acc.adj += Number(g.adjustedTotalPrice || 0);
      acc.trans += Number(g.transportationTotalPrice || 0);
      acc.rebate += Number(g.rebateTotalPrice || 0);
      return acc;
    }, { adj: 0, trans: 0, rebate: 0 });
    row.adjustedTotalPrice = Number((sum.adj + sum.trans + sum.rebate).toFixed(2));
    row.priceBreakdown = sum;
    return sum;
  }

  /** 模拟 getSendgoods.json */
  function getSendgoods(sendgoodsId) {
    const row = shipments.find(r => r.sendgoodsId === sendgoodsId);
    if (!row) return null;
    ensureGoodsList(row);
    return JSON.parse(JSON.stringify(row));
  }

  /** 模拟 getSendgoodsChangePriceDetail.json（LsSgSendgoodsController → PaasContractFeign） */
  function getSendgoodsChangePriceDetail(sendgoodsCode) {
    const row = findRow(sendgoodsCode);
    if (!row) return null;
    const goods = ensureGoodsList(row);
    const lines = goods.map(g => ({
      skuNo: g.skuNo,
      contractNbillcode: g.contractNbillcode,
      contractBillcode: g.contractBillcode,
      goodsCamount: g.goodsCamount,
      adjustedUnitPrice: g.adjustedUnitPrice,
      adjustedTotalPrice: Number(g.adjustedTotalPrice || 0),
      transportationTotalPrice: Number(g.transportationTotalPrice || 0),
      rebateTotalPrice: Number(g.rebateTotalPrice || 0),
      storeRebateTotalPrice: Number(g.rebateTotalPrice || 0) * 0.4,
      salesRebateTotalPrice: Number(g.rebateTotalPrice || 0) * 0.3,
      afterSalesRebateTotalPrice: Number(g.rebateTotalPrice || 0) * 0.2,
      otherRebateTotalPrice: Number(g.rebateTotalPrice || 0) * 0.1,
      lineTotal: Number(g.adjustedTotalPrice || 0) + Number(g.transportationTotalPrice || 0) + Number(g.rebateTotalPrice || 0)
    }));
    const adjustedTotalPriceSum = lines.reduce((s, l) => s + l.adjustedTotalPrice, 0);
    const transportationTotalPriceSum = lines.reduce((s, l) => s + l.transportationTotalPrice, 0);
    const rebateTotalPriceSum = lines.reduce((s, l) => s + l.rebateTotalPrice, 0);
    const storeRebateTotalPriceSum = lines.reduce((s, l) => s + l.storeRebateTotalPrice, 0);
    const salesRebateTotalPriceSum = lines.reduce((s, l) => s + l.salesRebateTotalPrice, 0);
    const afterSalesRebateTotalPriceSum = lines.reduce((s, l) => s + l.afterSalesRebateTotalPrice, 0);
    const otherRebateTotalPriceSum = lines.reduce((s, l) => s + l.otherRebateTotalPrice, 0);
    return {
      sendgoodsCode: row.sendgoodsCode,
      sendgoodsId: row.sendgoodsId,
      pricesetCurrency: row.pricesetCurrency,
      adjustedTotalPriceSum,
      transportationTotalPriceSum,
      rebateTotalPriceSum,
      storeRebateTotalPriceSum,
      salesRebateTotalPriceSum,
      afterSalesRebateTotalPriceSum,
      otherRebateTotalPriceSum,
      adjustedTotalPrice: adjustedTotalPriceSum + transportationTotalPriceSum + rebateTotalPriceSum,
      detailList: lines
    };
  }

  function initData() {
    shipments = [
      createRow({ sendgoodsId: 1001, sendgoodsCode: "FYD260528024385", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26020431009", customerPo: "Customized-0112", contractBillcode: "B26020431021", contractEcurl: "ALI260528001", dataState: 6, applyCustomsStatus: "1", contractPumode: "01", gmtCreate: "2026-05-28 10:22:00", createUser: "Amy", gmtUse: "2026-06-06", pricesetNpriceTotal: 18289.87, adjustedTotalPrice: 2728.06, planSum: 266, actualSum: 448, pricesetCurrencyPort: "宁波港", contractInvcode: "BG260528002", customsAmountValue: 18289.87, customsInfoNo: "YBG2605280002", areaName: "中国", contractNo: "HT-260528-B", updateUser: "Lily", gmtModified: "2026-06-01 14:10:00", lcrpMoney: 5280, packageRemark: "PC-260528-A", expressName: "PC-260528-A", logs: buildSampleOperateLogs("FYD260528024385") }),
      createRow({ sendgoodsId: 1002, sendgoodsCode: "FYD260528024379", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26041536218", customerPo: "MAY STOCK PART 1", contractBillcode: "B26042036326", dataState: 25, applyCustomsStatus: "1", contractPumode: "03", gmtCreate: "2026-05-28 09:54:00", createUser: "Amy", gmtUse: "2026-06-05", pricesetNpriceTotal: 16552.12, adjustedTotalPrice: 1079.26, planSum: 230, actualSum: 389, pricesetCurrencyPort: "上海港", contractInvcode: "BG260528001", customsAmountValue: 16552.12, customsInfoNo: "YBG2605280001", areaName: "中国", contractNo: "HT-260528-A", updateUser: "Eric", gmtModified: "2026-06-02 09:08:00" }),
      createRow({ sendgoodsId: 1003, sendgoodsCode: "FYD260528024359", memberBcode: "10000210661092", memberBname: "DECORACIONES CASABELLA LECHERIA, C.A", contractNbillcode: "L26042736530", customerPo: "LS-BK260119", contractBillcode: "B26042736533", dataState: 3, applyCustomsStatus: "0", contractPumode: "01", gmtCreate: "2026-05-28 08:42:00", createUser: "Cindy", sendgoodsVaildate: "2026-06-02 11:00:00", gmtUse: "2026-05-31", gmtVaild: "2026-06-01", pricesetNpriceTotal: 1809.35, planSum: 9, actualSum: 15, pricesetCurrencyPort: "盐田港", areaName: "中国", updateUser: "Cindy", gmtModified: "2026-06-02 11:12:00" }),
      createRow({ sendgoodsId: 1004, sendgoodsCode: "FYD260528024312", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", dataState: -2, applyCustomsStatus: "0", gmtCreate: "2026-05-27 16:31:00", createUser: "Lily", updateUser: "Lily", gmtModified: "2026-05-28 12:21:00" }),
      createRow({ sendgoodsId: 1005, sendgoodsCode: "FYD260528024280", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26050137009", customerPo: "JUNE PROMO", contractBillcode: "B26050137010", dataState: 61, applyCustomsStatus: "0", contractPumode: "02", gmtCreate: "2026-05-26 19:20:00", createUser: "Ray", gmtUse: "2026-06-03", pricesetNpriceTotal: 8620, adjustedTotalPrice: 180, planSum: 88, actualSum: 122, pricesetCurrencyPort: "厦门港", areaName: "中国", updateUser: "Ray", gmtModified: "2026-06-01 18:30:00" }),
      createRow({ sendgoodsId: 1006, sendgoodsCode: "FYD260528024266", memberBcode: "10000210999121", memberBname: "SUNRISE HOME INC.", contractNbillcode: "L26033035110", customerPo: "SPRING-02", contractBillcode: "B26033035118", dataState: 4, applyCustomsStatus: "1", contractPumode: "01", settlementEntity: "LSMY-US", gmtCreate: "2026-05-20 10:11:00", createUser: "Nina", sendgoodsVaildate: "2026-05-30 16:08:00", gmtUse: "2026-05-28", gmtVaild: "2026-05-29", pricesetNpriceTotal: 23180.4, planSum: 310, actualSum: 510, pricesetCurrencyPort: "宁波港", contractInvcode: "BG260530007", customsAmountValue: 23180.4, customsInfoNo: "YBG2605300007", areaName: "中国", contractNo: "HT-260530-C", updateUser: "Nina", gmtModified: "2026-06-01 09:21:00" }),
      createRow({ sendgoodsId: 1007, sendgoodsCode: "FYD260528024201", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26050137011", contractBillcode: "B26050137012", dataState: 22, applyCustomsStatus: "0", contractPumode: "01", gmtCreate: "2026-05-25 15:00:00", createUser: "Amy", gmtUse: "2026-06-08", pricesetNpriceTotal: 3200, planSum: 40, actualSum: 60, pricesetCurrencyPort: "宁波港", areaName: "中国", lcrpMoney: 1800, updateUser: "Amy", gmtModified: "2026-05-26 09:00:00" }),
      createRow({ sendgoodsId: 1008, sendgoodsCode: "FYD260528024188", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26050137013", contractBillcode: "B26050137014", dataState: 63, applyCustomsStatus: "0", contractPumode: "01", gmtCreate: "2026-05-24 11:20:00", createUser: "Ray", gmtUse: "2026-06-10", pricesetNpriceTotal: 5600, planSum: 55, actualSum: 88, pricesetCurrencyPort: "上海港", areaName: "中国", lcrpMoney: 2100, updateUser: "Ray", gmtModified: "2026-05-25 10:00:00" }),
      createRow({ sendgoodsId: 1009, sendgoodsCode: "FYD260528024374", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26050137015", contractBillcode: "B26050137016", dataState: 1, applyCustomsStatus: "0", contractPumode: "01", gmtCreate: "2026-05-23 09:00:00", createUser: "Amy", gmtUse: "2026-06-12", pricesetNpriceTotal: 14539.02, planSum: 93, actualSum: 275, pricesetCurrencyPort: "宁波港", areaName: "中国", lcrpMoney: 600, updateUser: "Amy", gmtModified: "2026-05-23 09:30:00" }),
      createRow({ sendgoodsId: 1010, sendgoodsCode: "FYD260528024120", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26050137017", contractBillcode: "B26050137018", dataState: 2, applyCustomsStatus: "0", contractPumode: "01", gmtCreate: "2026-05-22 14:00:00", createUser: "Ray", gmtUse: "2026-06-11", pricesetNpriceTotal: 4500, planSum: 45, actualSum: 70, pricesetCurrencyPort: "上海港", areaName: "中国", lcrpMoney: 1500, updateUser: "Ray", gmtModified: "2026-05-22 16:00:00" }),
      createRow({ sendgoodsId: 1011, sendgoodsCode: "FYD260528024100", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26050137019", contractBillcode: "B26050137020", dataState: 5, applyCustomsStatus: "0", contractPumode: "01", gmtCreate: "2026-05-21 11:00:00", createUser: "Amy", gmtUse: "2026-06-09", pricesetNpriceTotal: 7800, planSum: 78, actualSum: 120, pricesetCurrencyPort: "宁波港", areaName: "中国", lcrpMoney: 2400, updateUser: "Amy", gmtModified: "2026-05-21 15:00:00" }),
      createRow({ sendgoodsId: 1012, sendgoodsCode: "FYD260528024080", memberBcode: "10000210999121", memberBname: "SUNRISE HOME INC.", contractNbillcode: "L26033035120", contractBillcode: "B26033035128", dataState: 62, applyCustomsStatus: "1", contractPumode: "01", settlementEntity: "LSMY-US", gmtCreate: "2026-05-20 08:00:00", createUser: "Nina", sendgoodsVaildate: "2026-05-29 10:00:00", gmtUse: "2026-05-27", gmtVaild: "2026-05-28", pricesetNpriceTotal: 9800, planSum: 120, actualSum: 200, pricesetCurrencyPort: "宁波港", contractInvcode: "BG260529001", customsAmountValue: 9800, customsInfoNo: "YBG2605290001", areaName: "中国", contractNo: "HT-260529-B", updateUser: "Nina", gmtModified: "2026-05-30 09:00:00" }),
      createRow({ sendgoodsId: 1013, sendgoodsCode: "FYD260528024060", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26050137021", contractBillcode: "B26050137022", dataState: 65, applyCustomsStatus: "0", contractPumode: "01", gmtCreate: "2026-05-19 10:00:00", createUser: "Ray", gmtUse: "2026-06-08", pricesetNpriceTotal: 3600, planSum: 36, actualSum: 58, pricesetCurrencyPort: "厦门港", areaName: "中国", lcrpMoney: 900, updateUser: "Ray", gmtModified: "2026-05-19 12:00:00" }),
      createRow({ sendgoodsId: 1014, sendgoodsCode: "FYD260528024050", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26050137023", customerPo: "JULY-01", contractBillcode: "B26050137024", dataState: 25, applyCustomsStatus: "0", contractPumode: "01", gmtCreate: "2026-05-18 10:00:00", createUser: "Amy", gmtUse: "2026-06-07", pricesetNpriceTotal: 9200, adjustedTotalPrice: 560, planSum: 92, actualSum: 150, pricesetCurrencyPort: "宁波港", areaName: "中国", lcrpMoney: 1200, updateUser: "Amy", gmtModified: "2026-05-18 14:00:00" }),
      createRow({ sendgoodsId: 1015, sendgoodsCode: "FYD260528024040", memberBcode: "10000210595407", memberBname: "FortyTwo Pte. Ltd.", contractNbillcode: "L26050137025", customerPo: "JULY-02", contractBillcode: "B26050137026", dataState: 6, applyCustomsStatus: "0", contractPumode: "01", gmtCreate: "2026-05-17 09:00:00", createUser: "Ray", gmtUse: "2026-06-08", pricesetNpriceTotal: 6400, adjustedTotalPrice: 320, planSum: 64, actualSum: 108, pricesetCurrencyPort: "上海港", areaName: "中国", lcrpMoney: 980, updateUser: "Ray", gmtModified: "2026-05-17 11:00:00" }),
      createRow({ sendgoodsId: 1016, sendgoodsCode: "FYD260528024030", memberBcode: "10000210661092", memberBname: "DECORACIONES CASABELLA LECHERIA, C.A", contractNbillcode: "L26042736540", customerPo: "LS-BK260120", contractBillcode: "B26042736541", dataState: 3, applyCustomsStatus: "1", contractPumode: "01", gmtCreate: "2026-05-16 08:00:00", createUser: "Cindy", sendgoodsVaildate: "2026-05-28 15:00:00", gmtUse: "2026-05-26", gmtVaild: "2026-05-27", pricesetNpriceTotal: 5200, adjustedTotalPrice: 210, planSum: 52, actualSum: 86, pricesetCurrencyPort: "盐田港", contractInvcode: "BG260516001", customsAmountValue: 5200, customsInfoNo: "YBG2605160001", areaName: "中国", contractNo: "HT-260516-A", updateUser: "Cindy", gmtModified: "2026-05-28 15:30:00" })
    ];
    shipments.forEach(ensureGoodsList);
    seedConfirmDetailDemo(findRow("FYD260528024374"));
  }

  function seedConfirmDetailDemo(row) {
    if (!row) return;
    row.packageRemark = "G260526024396";
    row.expressName = "G260526024396";
    row.packageName = "40HQ";
    row.planSum = 93;
    row.actualSum = 275;
    row.pricesetNpriceTotal = 14539.02;
    row.totalVolume = 62.588;
    const cabinet1 = "G260526024396";
    const cabinet2 = "G260526024397";
    const lines = [
      { skuNo: "YG008566", spuNo: "TO3D", skuName: "TO3D-A1", contractNbillcode: "L26050137015", goodsSpec1: "PO-260528-01", contractBillcode: "B26050137016", goodsCamount: 2, lockQty: 5, goodsAhnum: 2, goodsAhweight: 0.42, goodsTopweight: 8.5, contractGoodsPrice: 89.5, contractGoodsMoney: 179, goodsSpec4: "LS26CW20260604-3", goodsSpec5: "", financeTag: "白标", goodsSpec: "灰色/标准款", warehouseName: "佛山仓", cabinet: cabinet1 },
      { skuNo: "YG008567", spuNo: "TO3D", skuName: "TO3D-A2", contractNbillcode: "L26050137015", goodsSpec1: "PO-260528-01", contractBillcode: "B26050137016", goodsCamount: 2, lockQty: 4, goodsAhnum: 1, goodsAhweight: 0.35, goodsTopweight: 6.2, contractGoodsPrice: 72, contractGoodsMoney: 144, goodsSpec4: "LS26CW20260604-3", goodsSpec5: "BIN-02", financeTag: "白标", goodsSpec: "黑色/标准款", warehouseName: "佛山仓", cabinet: cabinet1 },
      { skuNo: "YG008568", spuNo: "TO3E", skuName: "TO3E-B1", contractNbillcode: "L26050137015", goodsSpec1: "PO-260528-02", contractBillcode: "B26050137016", goodsCamount: 1, lockQty: 3, goodsAhnum: 3, goodsAhweight: 0.58, goodsTopweight: 11.4, contractGoodsPrice: 128, contractGoodsMoney: 128, goodsSpec4: "LS26CW20260604-4", goodsSpec5: "", financeTag: "白标", goodsSpec: "原木色/大号", warehouseName: "佛山仓", cabinet: cabinet1 },
      { skuNo: "YG008569", spuNo: "TO3E", skuName: "TO3E-B2", contractNbillcode: "L26050137015", goodsSpec1: "PO-260528-02", contractBillcode: "B26050137016", goodsCamount: 3, lockQty: 6, goodsAhnum: 2, goodsAhweight: 0.48, goodsTopweight: 9.8, contractGoodsPrice: 95, contractGoodsMoney: 285, goodsSpec4: "LS26CW20260604-4", goodsSpec5: "BIN-03", financeTag: "白标", goodsSpec: "白色/中号", warehouseName: "佛山仓", cabinet: cabinet2, packageName: "40HQ" },
      { skuNo: "YG008570", spuNo: "TO3F", skuName: "TO3F-C1", contractNbillcode: "L26050137015", goodsSpec1: "PO-260528-03", contractBillcode: "B26050137016", goodsCamount: 2, lockQty: 5, goodsAhnum: 1, goodsAhweight: 0.31, goodsTopweight: 5.6, contractGoodsPrice: 56, contractGoodsMoney: 112, goodsSpec4: "LS26CW20260604-5", goodsSpec5: "", financeTag: "白标", goodsSpec: "蓝色/小号", warehouseName: "佛山仓", cabinet: cabinet2, packageName: "40HQ" },
      { skuNo: "YG008571", spuNo: "TO3F", skuName: "TO3F-C2", contractNbillcode: "L26050137015", goodsSpec1: "PO-260528-03", contractBillcode: "B26050137016", goodsCamount: 2, lockQty: 4, goodsAhnum: 2, goodsAhweight: 0.39, goodsTopweight: 7.1, contractGoodsPrice: 68, contractGoodsMoney: 136, goodsSpec4: "LS26CW20260604-5", goodsSpec5: "BIN-04", financeTag: "白标", goodsSpec: "绿色/小号", warehouseName: "佛山仓", cabinet: cabinet2, packageName: "40HQ" }
    ];
    row.goodsList = lines.map(item => ({
      ...item,
      sgCamount: item.goodsCamount,
      expressName: item.cabinet,
      packageRemark: item.cabinet,
      packageName: item.packageName || row.packageName,
      lockStatus: "全部锁货",
      goodsNo: item.skuNo,
      goodsProperty4: item.skuNo,
      userinfoGoodsMaterial: "板材",
      financeStatus: "财审通过",
      lsCategory: "客厅家具",
      customsCategory: "木制家具",
      customsUnit: "件",
      returnedQty: 0,
      returnedAmount: 0,
      refundAmount: 0,
      batchNo: "BATCH-DRAFT-001"
    }));
    recalcVolume(row);
  }

  function statusLabel(row) {
    return STATUS_CODE[String(row.dataState)] || "未知";
  }

  function declareLabel(code) {
    return code === "1" ? "已申报" : "待处理";
  }

  function tradeLabel(code) {
    return TRADE_MODE[code] || code || "-";
  }

  function formatDateTime(v) {
    return v ? String(v).slice(0, 16).replace("T", " ") : "-";
  }

  function getDateValue(row, field) {
    return {
      gmtCreate: row.gmtCreate ? row.gmtCreate.slice(0, 10) : "",
      sendgoodsVaildate: row.sendgoodsVaildate ? row.sendgoodsVaildate.slice(0, 10) : ""
    }[field] || "";
  }

  function buildQueryParams() {
    return {
      customerField: document.getElementById("customerField").value,
      customerKeyword: document.getElementById("customerKeyword").value.trim(),
      numberType: document.getElementById("numberType").value,
      numberKeyword: document.getElementById("numberKeyword").value.trim(),
      dataState: document.getElementById("shipmentStatus").value,
      applyCustomsStatus: document.getElementById("declareStatus").value,
      dateType: document.getElementById("dateType").value,
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value
    };
  }

  function matchesKeyword(row, keyword, field) {
    if (!keyword) return true;
    return String(row[field] || "").toLowerCase().includes(keyword.toLowerCase());
  }

  function matchesMultiCode(row, field, keyword) {
    if (!keyword) return true;
    return keyword.replace(/\s+/g, ",").split(",").filter(Boolean)
      .some(code => String(row[field] || "").toLowerCase().includes(code.toLowerCase()));
  }

  function querySendgoodsAudiPage(params) {
    return shipments.filter(row => {
      if (String(row.dataState) === "0") return false;
      const customerOk = matchesKeyword(row, params.customerKeyword, params.customerField);
      const numberOk = matchesMultiCode(row, params.numberType, params.numberKeyword);
      const statusOk = !params.dataState || String(row.dataState) === String(params.dataState);
      const declareOk = !params.applyCustomsStatus || row.applyCustomsStatus === params.applyCustomsStatus;
      const dateVal = getDateValue(row, params.dateType);
      const dateOk = (!params.startDate || (dateVal && dateVal >= params.startDate)) &&
        (!params.endDate || (dateVal && dateVal <= params.endDate));
      return customerOk && numberOk && statusOk && declareOk && dateOk;
    });
  }

  function getFilteredList() {
    return querySendgoodsAudiPage(buildQueryParams());
  }

  function getActions(row) {
    const key = `${statusLabel(row)}-${declareLabel(row.applyCustomsStatus)}`;
    return ACTION_MAP[key] || ["日志"];
  }

  function addLog(row, title, content) {
    if (!operateLogs[row.sendgoodsCode]) operateLogs[row.sendgoodsCode] = [];
    operateLogs[row.sendgoodsCode].unshift({
      content: content ? `${title}：${content}` : title,
      time: new Date().toISOString().slice(0, 19).replace("T", " "),
      user: "当前用户"
    });
  }

  function renderActions(row) {
    return getActions(row).map(action =>
      `<button type="button" class="action-link" data-action="${action}" data-code="${row.sendgoodsCode}">${action}</button>`
    ).join("");
  }

  function columnValue(row, key) {
    const code = row.sendgoodsCode;
    const detailNo = [
      `林氏PI：${row.contractNbillcode || "-"}`,
      `客户PO：${row.customerPo || "-"}`,
      `BPS订单：${row.contractBillcode || "-"}`
    ].join("<br />");

    const values = {
      shipmentNo: `<a class="link" data-detail="${code}">${code}</a><span class="copy" data-copy="${code}">⧉</span>`,
      customerInfo: `客户ID：${row.memberBcode}<br />客户名称：${row.memberBname}`,
      detailNo,
      status: `<span class="status">${statusLabel(row)}</span>`,
      totalAmount: `<div class="money">实际总额：${money(row.pricesetNpriceTotal, row.pricesetCurrency)}<br />调价总额：<a class="link" data-adjust="${code}">${money(row.adjustedTotalPrice, row.pricesetCurrency)}</a></div>`,
      totalQuantity: `商品数：${row.planSum}<br />包件数：${row.actualSum}`,
      totalVolume: `${num(row.totalVolume, 3)} m3`,
      shipTime: formatDateTime(row.sendgoodsVaildate),
      creator: `${row.createUser} / ${formatDateTime(row.gmtCreate)}`,
      aliOrderNo: row.contractEcurl || "-",
      planCabinetDate: row.gmtUse || "-",
      actualCabinetDate: row.gmtVaild || "-",
      tradeMode: tradeLabel(row.contractPumode),
      productQuantity: row.planSum,
      packageQuantity: row.actualSum,
      loadingPort: row.pricesetCurrencyPort || "-",
      declareStatus: declareLabel(row.applyCustomsStatus),
      customsNo: row.contractInvcode || "-",
      customsAmount: money(row.customsAmountValue || 0, row.pricesetCurrency),
      tradeCountry: row.areaName || "-",
      contractNo: row.contractNo || "-",
      updater: `${row.updateUser || "-"} / ${formatDateTime(row.gmtModified)}`,
      actions: `<div class="action-cell">${renderActions(row)}</div>`
    };
    return values[key] || "-";
  }

  function updatePagination(total) {
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (pageNum > totalPages) pageNum = totalPages;
    document.getElementById("totalCount").textContent = `共 ${total} 条`;
    document.getElementById("pageInput").value = pageNum;

    const numbers = document.getElementById("pageNumbers");
    numbers.innerHTML = "";
    for (let i = 1; i <= totalPages; i += 1) {
      const span = document.createElement("span");
      span.className = `page-no${i === pageNum ? " active" : ""}`;
      span.textContent = i;
      span.onclick = () => { pageNum = i; refreshList(false); };
      numbers.appendChild(span);
    }

    document.getElementById("pagePrev").classList.toggle("disabled", pageNum <= 1);
    document.getElementById("pageNext").classList.toggle("disabled", pageNum >= totalPages);
  }

  function renderTable(data) {
    currentList = data;
    const total = data.length;
    const pageData = data.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);

    document.getElementById("tableHead").innerHTML = `
      <th><input type="checkbox" id="checkAll" /></th>
      ${columns.map(c => `<th${c.key === "actions" ? ' class="col-fixed-right"' : ""}>${c.label}</th>`).join("")}
    `;

    document.getElementById("tableBody").innerHTML = pageData.map(row => `
      <tr data-code="${row.sendgoodsCode}">
        <td><input type="checkbox" class="row-check" data-code="${row.sendgoodsCode}" /></td>
        ${columns.map(c => `<td${c.key === "actions" ? ' class="col-fixed-right"' : ""}>${columnValue(row, c.key)}</td>`).join("")}
      </tr>
    `).join("");

    document.getElementById("checkAll").onchange = function () {
      document.querySelectorAll(".row-check").forEach(item => { item.checked = this.checked; });
    };

    updatePagination(total);
  }

  function findRow(code) {
    return shipments.find(r => r.sendgoodsCode === code);
  }

  function getSelectedRows() {
    return Array.from(document.querySelectorAll(".row-check:checked"))
      .map(el => findRow(el.dataset.code))
      .filter(Boolean);
  }

  function refreshList(resetPage) {
    if (resetPage !== false) pageNum = 1;
    renderTable(getFilteredList());
  }

  function openDialog(title, bodyHtml, footerHtml, sizeClass) {
    document.getElementById("dialogTitle").textContent = title;
    document.getElementById("dialogBody").innerHTML = bodyHtml;
    document.getElementById("dialogFooter").innerHTML = footerHtml || `<button class="btn-default" onclick="closeDialog()">关闭</button>`;
    document.getElementById("dialogPanel").classList.remove("dialog-wide", "dialog-xl", "dialog-dispatch", "dialog-price", "dialog-confirm-edit", "dialog-credit", "dialog-log", "dialog-cabinet", "dialog-bl", "dialog-pack");
    if (sizeClass) {
      String(sizeClass).split(/\s+/).filter(Boolean).forEach(cls => {
        document.getElementById("dialogPanel").classList.add(cls);
      });
    }
    document.getElementById("dialogMask").classList.add("open");
  }

  function confirmDialog(title, message, onOk) {
    openDialog(
      title,
      `<p>${message}</p>`,
      `<button class="btn-default" onclick="closeDialog()">取消</button>
       <button class="btn-action" id="dialogOkBtn">确定</button>`
    );
    document.getElementById("dialogOkBtn").onclick = () => {
      closeDialog();
      onOk();
    };
  }

  function confirmOnTop(title, message, onOk) {
    const old = document.getElementById("confirmOverlay");
    if (old) old.remove();
    const overlay = document.createElement("div");
    overlay.id = "confirmOverlay";
    overlay.className = "confirm-overlay open";
    overlay.innerHTML = `
      <div class="confirm-overlay-card dialog">
        <div class="dialog-header">
          <strong>${escapeHtml(title)}</strong>
          <button class="btn-default" type="button" id="confirmOverlayClose">关闭</button>
        </div>
        <div class="dialog-body"><p>${escapeHtml(message)}</p></div>
        <div class="dialog-footer">
          <button class="btn-default" type="button" id="confirmOverlayCancel">取消</button>
          <button class="btn-action" type="button" id="confirmOverlayOk">确定</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.onclick = event => { if (event.target === overlay) close(); };
    document.getElementById("confirmOverlayClose").onclick = close;
    document.getElementById("confirmOverlayCancel").onclick = close;
    document.getElementById("confirmOverlayOk").onclick = () => {
      close();
      onOk();
    };
  }

  window.closeDialog = function () {
    document.getElementById("dialogMask").classList.remove("open");
    confirmEditCtx = null;
    confirmUnarrangedInsertIndex = null;
    logDialogCtx = null;
    cabinetDialogCtx = null;
  };

  function getCabinetCapacity(packageName) {
    return ({ "40HQ": 67.5, "40GP": 58, "20GP": 28 })[packageName] || 67.5;
  }

  function buildCabinetSummary(detail, goods) {
    return goods.reduce((acc, g) => {
      const planQty = Number(g.goodsCamount || 0);
      const actualQty = Number(g.sgCamount || g.goodsCamount || 0);
      const pkg = Number(g.goodsAhnum || 0);
      const cbm = Number(g.goodsAhweight || 0);
      const weight = Number(g.goodsTopweight || 0);
      acc.planQty += planQty;
      acc.actualQty += actualQty;
      acc.planPkg += pkg * planQty;
      acc.actualPkg += pkg * actualQty;
      acc.planCbm += cbm * planQty;
      acc.actualCbm += cbm * actualQty;
      acc.planWeight += weight * planQty;
      acc.actualWeight += weight * actualQty;
      acc.amount += Number(g.contractGoodsMoney || 0);
      return acc;
    }, { planQty: 0, actualQty: 0, planPkg: 0, actualPkg: 0, planCbm: 0, actualCbm: 0, planWeight: 0, actualWeight: 0, amount: 0 });
  }

  function buildCabinetRows(detail, goods) {
    const summary = buildCabinetSummary(detail, goods);
    const bpsNos = [...new Set(goods.map(g => g.contractBillcode).filter(Boolean))].join(", ") || "-";
    const batchNos = [...new Set(goods.map(g => g.batchNo).filter(Boolean))].join(", ") || "-";
    return `
      <tr>
        <td>1</td>
        <td>${detail.packageRemark || detail.expressName || "G260528001"}</td>
        <td>${detail.packageName || "40HQ"}</td>
        <td>${num(summary.planCbm, 3)} / ${num(summary.actualCbm, 3)}</td>
        <td>${summary.planQty} / ${summary.actualQty}</td>
        <td>${summary.planPkg} / ${summary.actualPkg}</td>
        <td>${num(summary.planWeight, 2)} / ${num(summary.actualWeight, 2)}</td>
        <td>${money(summary.amount, detail.pricesetCurrency)} / ${money(0, detail.pricesetCurrency)}</td>
        <td>${bpsNos}<span class="copy" data-copy="${bpsNos}">⧉</span></td>
        <td>${batchNos}<span class="copy" data-copy="${batchNos}">⧉</span></td>
        <td>${detail.bookingNo || "-"}</td>
        <td>${detail.packageBillno || "-"}</td>
        <td>${detail.expressCode || "-"}</td>
        <td>${detail.truckInfo || "-"}</td>
      </tr>`;
  }

  function buildGoodsSummary(goods) {
    return goods.reduce((acc, g) => {
      const planQty = Number(g.goodsCamount || 0);
      const actualQty = Number(g.sgCamount || g.goodsCamount || 0);
      const pkg = Number(g.goodsAhnum || 0);
      const cbm = Number(g.goodsAhweight || 0);
      const weight = Number(g.goodsTopweight || 0);
      acc.planQty += planQty;
      acc.actualQty += actualQty;
      acc.planCbm += cbm * planQty;
      acc.actualCbm += cbm * actualQty;
      acc.planPkg += pkg * planQty;
      acc.actualPkg += pkg * actualQty;
      acc.planWeight += weight * planQty;
      acc.actualWeight += weight * actualQty;
      acc.planAmount += Number(g.contractGoodsMoney || 0);
      acc.actualAmount += Number(g.contractGoodsPrice || 0) * actualQty;
      acc.returnedQty += Number(g.returnedQty || 0);
      acc.returnedAmount += Number(g.returnedAmount || 0);
      acc.refundAmount += Number(g.refundAmount || 0);
      return acc;
    }, { planQty: 0, actualQty: 0, planCbm: 0, actualCbm: 0, planPkg: 0, actualPkg: 0, planWeight: 0, actualWeight: 0, planAmount: 0, actualAmount: 0, returnedQty: 0, returnedAmount: 0, refundAmount: 0 });
  }

  function renderGoodsSummary(summary, currency) {
    return `
      <span>装箱数量：${summary.planQty} / ${summary.actualQty}</span>
      <span>装箱体积：${num(summary.planCbm, 3)} / ${num(summary.actualCbm, 3)}</span>
      <span>装箱件数：${summary.planPkg} / ${summary.actualPkg}</span>
      <span>装箱毛重：${num(summary.planWeight, 2)} / ${num(summary.actualWeight, 2)}</span>
      <span>装箱金额：${money(summary.planAmount, currency)} / ${money(summary.actualAmount, currency)}</span>
      <span>退单数量：${summary.returnedQty}</span>
      <span>退单金额：${money(summary.returnedAmount, currency)}</span>
      <span>退款金额：${money(summary.refundAmount, currency)}</span>`;
  }

  function renderCabinetTable(detail, goods) {
    const summary = buildCabinetSummary(detail, goods);
    const bpsNos = [...new Set(goods.map(g => g.contractBillcode).filter(Boolean))].join(", ") || "-";
    const batchNos = [...new Set(goods.map(g => g.batchNo).filter(Boolean))].join(", ") || "-";
    const planAmount = summary.amount;
    const actualAmount = 0;
    return `
      <div class="detail-table-wrap dispatch-cabinet-grid">
        <table class="detail-table">
          <thead><tr>
            <th>序号</th><th>预排柜号</th><th>柜型</th><th>装柜体积m<sup>3</sup> (计划/实际)</th>
            <th>商品总件数 (计划/实际)</th><th>总包件数 (计划/实际)</th><th>总重量kg(计划/实际)</th>
            <th>总金额（计划/实际）</th><th>BPS单号 <span class="copy" data-copy="${bpsNos}">⧉</span></th>
            <th>批次单号 <span class="copy" data-copy="${batchNos}">⧉</span></th><th>订舱号</th><th>实际柜号</th><th>封条号</th><th>车辆信息</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>${detail.packageRemark || detail.expressName || "G260528001"}</td>
              <td>${detail.packageName || "40HQ"}</td>
              <td>${num(summary.planCbm, 3)}m<sup>3</sup>/${num(summary.actualCbm, 3)}m<sup>3</sup></td>
              <td>${summary.planQty}/${summary.actualQty}</td>
              <td>${summary.planPkg}/${summary.actualPkg}</td>
              <td>${num(summary.planWeight, 2)}/${num(summary.actualWeight, 2)}</td>
              <td>${money(planAmount, detail.pricesetCurrency)}/${money(actualAmount, detail.pricesetCurrency)}</td>
              <td>${bpsNos}</td>
              <td>${batchNos}</td>
              <td>${detail.bookingNo || "-"}</td>
              <td>${detail.packageBillno || "-"}</td>
              <td>${detail.expressCode || "-"}</td>
              <td>${detail.truckInfo || "-"}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>合计:</td><td></td><td></td>
              <td>${num(summary.planCbm, 3)}/${num(summary.actualCbm, 3)}</td>
              <td>${summary.planQty}/${summary.actualQty}</td>
              <td>${summary.planPkg}/${summary.actualPkg}</td>
              <td>${num(summary.planWeight, 2)}/${num(summary.actualWeight, 2)}</td>
              <td>${num(planAmount, 2)}/${num(actualAmount, 2)}</td>
              <td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
          </tfoot>
        </table>
      </div>`;
  }

  const GOODS_DETAIL_COLUMNS = 35;

  function renderGoodsDataTable(rows, detail) {
    const summary = buildGoodsSummary(rows);
    const body = rows.map((g, index) => {
      const planQty = Number(g.goodsCamount || 0);
      const actualQty = Number(g.sgCamount || g.goodsCamount || 0);
      const unitCbm = Number(g.goodsAhweight || 0);
      const unitPkg = Number(g.goodsAhnum || 0);
      const unitWeight = Number(g.goodsTopweight || 0);
      const actualAmount = Number(g.contractGoodsPrice || 0) * actualQty;
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${g.contractBillcode || "-"}</td>
          <td>${g.skuNo || "-"}</td>
          <td>${g.contractNbillcode || "-"}</td>
          <td>${g.goodsSpec1 || "-"}</td>
          <td>${g.spuNo || "-"}</td>
          <td>${g.skuName || "-"}</td>
          <td>${num(unitCbm, 3)}m<sup>3</sup></td>
          <td>${unitPkg}</td>
          <td>${money(g.contractGoodsPrice || 0, detail.pricesetCurrency)}</td>
          <td>${planQty}/${actualQty}</td>
          <td>${num(unitCbm * planQty, 3)}m<sup>3</sup> / ${num(unitCbm * actualQty, 3)}m<sup>3</sup></td>
          <td>${unitPkg * planQty}/${unitPkg * actualQty}</td>
          <td>${num(unitWeight * planQty, 2)}/${num(unitWeight * actualQty, 2)}</td>
          <td>${money(g.contractGoodsMoney, detail.pricesetCurrency)} / ${money(actualAmount, detail.pricesetCurrency)}</td>
          <td>${g.returnedQty || 0}</td>
          <td>${money(g.returnedAmount || 0, detail.pricesetCurrency)}</td>
          <td>${money(g.refundAmount || 0, detail.pricesetCurrency)}</td>
          <td>${g.warehouseName || "-"}</td>
          <td>${g.goodsSpec4 || "-"}</td>
          <td>${g.goodsSpec5 || "-"}</td>
          <td>${g.goodsProperty4 || "-"}</td>
          <td>${g.goodsSpec || "-"}</td>
          <td>${g.userinfoGoodsMaterial || "-"}</td>
          <td>${g.batchNo || "-"}</td>
          <td>${g.financeStatus || "-"}</td>
          <td>${g.financeTag || "-"}</td>
          <td>${num(unitWeight, 2)}</td>
          <td>${g.lsCategory || "-"}</td>
          <td>${g.customsCategory || "-"}</td>
          <td>${g.customsUnit || "-"}</td>
          <td>${g.expressName || "-"}</td>
          <td>${g.packageName || "-"}</td>
          <td>${g.packageBillno || "-"}</td>
          <td>${g.expressCode || "-"}</td>
        </tr>`;
    }).join("") || `<tr><td colspan="${GOODS_DETAIL_COLUMNS}"><div class="dispatch-empty">暂无商品数据</div></td></tr>`;
    return `
      <div class="detail-table-wrap dispatch-goods-grid">
        <table class="detail-table">
          <thead><tr>
            <th>序号</th><th>BPS订单</th><th>SKU</th><th>林氏PI 单号</th><th>客户PO单号</th><th>SPU</th><th>规格描述</th>
            <th>单位体积</th><th>单位包件</th><th>单价</th><th>装箱数量（计划/实际）</th>
            <th>装箱体积（计划/实际）</th><th>装箱件数（计划/实际）</th><th>装箱毛重（计划/实际）</th>
            <th>装箱金额（计划/实际）</th><th>退单数量</th><th>退单金额</th><th>退款金额</th>
            <th>发货仓库</th><th>进仓编号1</th><th>进仓编号2</th>
            <th>编码（客户）</th><th>规格（客户）</th><th>材质（客户）</th><th>批次单号</th>
            <th>财审状态</th><th>标签颜色</th><th>单位毛重</th><th>林氏类目</th><th>报关类目</th><th>报关单位</th>
            <th>预排柜号</th><th>柜型</th><th>实际柜号</th><th>封条号</th>
          </tr></thead>
          <tbody>${body}</tbody>
          <tfoot>
            <tr>
              <td>合计:</td><td></td><td></td>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              <td>${summary.planQty}/${summary.actualQty}</td>
              <td>${num(summary.planCbm, 3)}/${num(summary.actualCbm, 3)}</td>
              <td>${summary.planPkg}/${summary.actualPkg}</td>
              <td>${num(summary.planWeight, 2)}/${num(summary.actualWeight, 2)}</td>
              <td>${num(summary.planAmount, 2)}/${num(summary.actualAmount, 2)}</td>
              <td>${summary.returnedQty}</td>
              <td>${num(summary.returnedAmount, 2)}</td>
              <td>${num(summary.refundAmount, 2)}</td>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
          </tfoot>
        </table>
      </div>`;
  }

  let confirmEditCtx = null;
  let confirmUnarrangedInsertIndex = null;

  function getSelectedConfirmCabinetKeys() {
    return Array.from(document.querySelectorAll("[data-confirm-cabinet-check]:checked"))
      .map(el => el.dataset.confirmCabinetCheck);
  }

  function getSelectedConfirmGoodsIndexes() {
    return Array.from(document.querySelectorAll("[data-confirm-goods-check]:checked"))
      .map(el => Number(el.dataset.confirmGoodsCheck));
  }

  function renderConfirmCurrentRow(cab, stats, currency) {
    if (!cab) {
      return `<div class="confirm-current-row"><span>当前柜：<strong>—</strong></span></div>`;
    }
    const capacity = getCabinetCapacity(cab.packageName || "40HQ");
    const remain = Math.max(0, capacity - stats.cbm);
    return `
      <div class="confirm-current-row">
        <span>当前柜：<strong>${escapeHtml(cab.key)}（${escapeHtml(cab.packageName || "40HQ")}）</strong></span>
        <span>已排体积：<strong>${num(stats.cbm, 3)} m³</strong></span>
        <span>剩余容量：<strong>${num(remain, 3)} m³</strong></span>
        <span>排入数量：<strong>${stats.qty}</strong></span>
        <span>总包件数：<strong>${stats.pkg}</strong></span>
        <span>总金额：<strong>${money(stats.amount, currency)}</strong></span>
      </div>`;
  }

  function groupGoodsByCabinet(goods) {
    const map = new Map();
    goods.forEach((g, index) => {
      const key = g.expressName || g.packageRemark || "DEFAULT";
      if (!map.has(key)) {
        map.set(key, { key, packageName: g.packageName || "40HQ", goods: [] });
      }
      map.get(key).goods.push({ ...g, _goodsIndex: index });
    });
    return [...map.values()];
  }

  function calcCabinetStats(goods) {
    return goods.reduce((acc, g) => {
      const qty = Number(g.goodsCamount || 0);
      const pkg = Number(g.goodsAhnum || 0);
      const cbm = Number(g.goodsAhweight || 0);
      acc.qty += qty;
      acc.pkg += pkg * qty;
      acc.cbm += cbm * qty;
      acc.amount += Number(g.contractGoodsMoney || 0);
      return acc;
    }, { qty: 0, pkg: 0, cbm: 0, amount: 0 });
  }

  function matchConfirmBatchField(value, keyword) {
    if (!keyword) return true;
    const keys = String(keyword).replace(/\s+/g, ",").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
    const text = String(value || "").toLowerCase();
    return keys.some(k => text.includes(k));
  }

  function filterConfirmGoods(goods, filter) {
    const skuField = filter.skuField || "skuNo";
    const sku = (filter.sku || "").trim().toLowerCase();
    const lockStatus = filter.lockStatus || "";
    const po = (filter.po || "").trim();
    const bps = (filter.bps || "").trim();
    const customerPo = (filter.customerPo || "").trim().toLowerCase();
    return goods.filter(g => {
      const skuValue = skuField === "goodsNo" ? g.skuName : g[skuField];
      if (sku && !String(skuValue || "").toLowerCase().includes(sku)) return false;
      if (lockStatus && g.lockStatus !== lockStatus) return false;
      if (po && !matchConfirmBatchField(g.contractNbillcode, po)) return false;
      if (bps && !matchConfirmBatchField(g.contractBillcode, bps)) return false;
      if (customerPo && !String(g.goodsSpec1 || "").toLowerCase().includes(customerPo)) return false;
      return true;
    });
  }

  function syncConfirmInputsToRow() {
    if (!confirmEditCtx) return;
    const { row } = confirmEditCtx;
    document.querySelectorAll("[data-confirm-goods-index]").forEach(el => {
      const index = Number(el.dataset.confirmGoodsIndex);
      const field = el.dataset.confirmField;
      const goods = row.goodsList[index];
      if (!goods || !field) return;
      goods[field] = el.type === "number" ? Number(el.value || 0) : el.value.trim();
      if (field === "goodsCamount") {
        goods.sgCamount = goods.goodsCamount;
        goods.contractGoodsMoney = Number((goods.goodsCamount * Number(goods.contractGoodsPrice || 0)).toFixed(2));
      }
      if (field === "goodsSpec4") goods.goodsSpec4 = el.value.trim();
      if (field === "goodsSpec5") goods.goodsSpec5 = el.value.trim();
    });
    recalcVolume(row);
  }

  function calcAllCabinetStats(cabinets) {
    return cabinets.reduce((acc, cab) => {
      const stats = calcCabinetStats(cab.goods);
      acc.cbm += stats.cbm;
      acc.qty += stats.qty;
      acc.pkg += stats.pkg;
      acc.amount += stats.amount;
      return acc;
    }, { cbm: 0, qty: 0, pkg: 0, amount: 0 });
  }

  function renderConfirmCabinetSummary(cabinets, currency) {
    const total = calcAllCabinetStats(cabinets);
    return `
      <div class="confirm-stats-bar">
        <div class="confirm-stat-item">
          <span class="confirm-stat-label">柜子数量</span><span class="confirm-stat-value">${cabinets.length}</span>
        </div>
        <div class="confirm-stat-item">
          <span class="confirm-stat-label">总数量</span><span class="confirm-stat-value">${total.qty}</span><span class="confirm-stat-unit">件</span>
        </div>
        <div class="confirm-stat-item">
          <span class="confirm-stat-label">总体积</span><span class="confirm-stat-value">${num(total.cbm, 3)}</span><span class="confirm-stat-unit">m³</span>
        </div>
        <div class="confirm-stat-item">
          <span class="confirm-stat-label">总包件数</span><span class="confirm-stat-value">${total.pkg}</span><span class="confirm-stat-unit">件</span>
        </div>
        <div class="confirm-stat-item">
          <span class="confirm-stat-label">总金额</span><span class="confirm-stat-value">${num(total.amount, 2)}</span>
        </div>
      </div>`;
  }

  function isWarehouseNoEditMode() {
    return confirmEditCtx?.mode === "warehouseNo";
  }

  function renderConfirmCabinetPanel(cabinets, activeKey) {
    const items = cabinets.map(cab => {
      const stats = calcCabinetStats(cab.goods);
      const active = cab.key === activeKey ? "active" : "";
      const packageName = cab.packageName || "40HQ";
      const capacity = getCabinetCapacity(packageName);
      const remain = Math.max(0, capacity - stats.cbm);
      return `
        <div class="confirm-cabinet-item ${active}" data-confirm-cabinet="${escapeHtml(cab.key)}">
          <input type="checkbox" data-confirm-cabinet-check="${escapeHtml(cab.key)}" onclick="event.stopPropagation()" />
          <div>
            <div class="confirm-cabinet-name"><span class="cabinet-no-text">${escapeHtml(cab.key)}</span><span class="cabinet-type-link">${escapeHtml(packageName)}</span></div>
            <div class="confirm-cabinet-meta">${num(stats.cbm, 3)}m³ / ${num(capacity, 1)}m³<br />剩余 ${num(remain, 3)}m³</div>
          </div>
          <select class="confirm-cabinet-select" data-confirm-cabinet-type="${escapeHtml(cab.key)}" onclick="event.stopPropagation()">
            <option value="40HQ"${packageName === "40HQ" ? " selected" : ""}>40HQ</option>
            <option value="40GP"${packageName === "40GP" ? " selected" : ""}>40GP</option>
            <option value="20GP"${packageName === "20GP" ? " selected" : ""}>20GP</option>
          </select>
          <div class="confirm-cabinet-count">${stats.qty} 件</div>
        </div>`;
    }).join("");
    return `
      <div class="confirm-cabinet-side">
        <div class="confirm-panel-header">
          <strong>柜列表</strong>
          ${isWarehouseNoEditMode() ? "" : `<button type="button" class="confirm-btn-panel-danger" id="confirmDeleteCabinetBtn">删除柜</button>`}
        </div>
        <div class="confirm-cabinet-list-wrap" id="confirmCabinetList">
          ${items || `<div class="confirm-cabinet-empty">暂无柜数据</div>`}
        </div>
      </div>`;
  }

  function renderConfirmGoodsPanel(goods, currency, activeCab) {
    const stats = activeCab ? calcCabinetStats(activeCab.goods) : { qty: 0, pkg: 0, cbm: 0, amount: 0 };
    const body = goods.map(g => {
      const qty = Number(g.goodsCamount || 0);
      const unitCbm = Number(g.goodsAhweight || 0);
      const amount = Number(g.contractGoodsMoney || 0);
      return `
        <tr>
          <td><input type="checkbox" data-confirm-goods-check="${g._goodsIndex}" /></td>
          <td>${escapeHtml(g.contractNbillcode || "-")}</td>
          <td>${escapeHtml(g.goodsSpec1 || "-")}</td>
          <td>${escapeHtml(g.contractBillcode || "-")}</td>
          <td>${escapeHtml(g.skuNo || "-")}</td>
          <td>${escapeHtml(g.spuNo || "-")}</td>
          <td>${escapeHtml(g.skuName || "-")}</td>
          <td><input class="cell-input" data-confirm-goods-index="${g._goodsIndex}" data-confirm-field="goodsSpec4" value="${escapeHtml(g.goodsSpec4 || "")}" aria-label="进仓编码1" /></td>
          <td><input class="cell-input" data-confirm-goods-index="${g._goodsIndex}" data-confirm-field="goodsSpec5" value="${escapeHtml(g.goodsSpec5 || "")}" aria-label="进仓编码2" /></td>
          <td>${g.lockQty != null ? g.lockQty : qty}</td>
          <td><input class="cell-input qty" type="number" min="0" data-confirm-goods-index="${g._goodsIndex}" data-confirm-field="goodsCamount" value="${qty}" aria-label="排入数量" /></td>
          <td><span class="confirm-tag-label">${escapeHtml(g.financeTag || "白标")}</span></td>
          <td>${num(unitCbm, 3)}</td>
          <td>${num(unitCbm * qty, 3)}</td>
          <td>${money(g.contractGoodsPrice || 0, currency)}</td>
          <td>${money(amount, currency)}</td>
          <td>${escapeHtml(g.goodsSpec || "-")}</td>
          <td>${escapeHtml(g.warehouseName || "-")}</td>
          <td class="operation-col">
            <span class="confirm-row-actions">
              <button type="button" class="text-action insert" data-confirm-insert="${g._goodsIndex}">插入</button>
              <button type="button" class="text-action delete" data-confirm-delete="${g._goodsIndex}">删除</button>
            </span>
          </td>
        </tr>`;
    }).join("") || `<tr><td colspan="19" style="text-align:center;color:#909399;padding:24px">暂无商品明细</td></tr>`;
    return `
      <div class="confirm-goods-side">
        <div class="confirm-panel-header">
          <strong>商品明细</strong>
          ${isWarehouseNoEditMode() ? "" : `<button type="button" class="confirm-btn-panel-danger" id="confirmDeleteGoodsBtn">删除明细</button>`}
        </div>
        ${renderConfirmCurrentRow(activeCab, stats, currency)}
        <div class="confirm-goods-list-wrap">
          <table class="confirm-goods-table">
            <thead><tr>
              <th style="width:36px"><input type="checkbox" id="confirmGoodsCheckAll" /></th>
              <th>PO单号</th><th>客户PO单号</th><th>BPS单号</th>
              <th>SKU</th><th>SPU</th><th>物料名称</th>
              <th>进仓编码1</th><th>进仓编码2</th>
              <th>锁货数量</th><th>排入数量</th><th>标签颜色</th>
              <th>单位体积</th><th>排入体积</th><th>单价</th><th>总价</th>
              <th>规格描述</th><th>发货仓库</th>
              <th class="operation-col">操作</th>
            </tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      </div>`;
  }

  function renderConfirmDetailContent() {
    const { row, cabinets, activeCabinet, filter } = confirmEditCtx;
    const active = cabinets.find(c => c.key === activeCabinet) || cabinets[0];
    const visibleGoods = filterConfirmGoods(active ? active.goods : [], filter);
    const warehouseMode = isWarehouseNoEditMode();
    const toolbarBtns = warehouseMode
      ? `<div class="confirm-dropdown" id="confirmBatchDropdown">
            <button type="button" class="confirm-btn-outline" onclick="toggleConfirmBatchDropdown(event)">批量操作 ▾</button>
            <div class="confirm-dropdown-menu">
              <button type="button" id="confirmBatchInNoBtn">修改进仓编号</button>
            </div>
          </div>
          <button type="button" class="confirm-btn-success" id="confirmSaveEditBtn">确认修改</button>`
      : `<button type="button" class="confirm-btn-outline" id="confirmImportBtn">导入发运数据</button>
          <div class="confirm-dropdown" id="confirmBatchDropdown">
            <button type="button" class="confirm-btn-outline" onclick="toggleConfirmBatchDropdown(event)">批量操作 ▾</button>
            <div class="confirm-dropdown-menu">
              <button type="button" id="confirmBatchInNoBtn">修改进仓编码</button>
              <button type="button" id="confirmTagColorBtn">修改标签颜色</button>
            </div>
          </div>
          <button type="button" class="confirm-btn-primary" id="confirmSaveDraftBtn">保存草稿</button>
          <button type="button" class="confirm-btn-success" id="confirmSubmitBtn">确认发运单</button>
          <button type="button" class="confirm-btn-success" id="confirmSaveEditBtn">确认修改</button>`;
    return `
      <div class="confirm-edit-page${warehouseMode ? " is-warehouse-mode" : ""}">
        <div class="confirm-filter-wrap">
          <div class="confirm-filter-line">
            <div class="confirm-sku-field">
              <select id="confirmSkuField">
                <option value="skuNo"${(filter.skuField || "skuNo") === "skuNo" ? " selected" : ""}>SKU</option>
                <option value="spuNo"${filter.skuField === "spuNo" ? " selected" : ""}>SPU</option>
              </select>
              <input id="confirmSkuNo" placeholder="请输入" value="${escapeHtml(filter.sku || "")}" />
            </div>
            <div class="confirm-filter-field">
              <label>锁货状态：</label>
              <select id="confirmLockStatus">
                <option value=""${filter.lockStatus === "" ? " selected" : ""}>请选择</option>
                <option value="全部锁货"${filter.lockStatus === "全部锁货" ? " selected" : ""}>全部锁货</option>
                <option value="部分锁货"${filter.lockStatus === "部分锁货" ? " selected" : ""}>部分锁货</option>
                <option value="未锁货"${filter.lockStatus === "未锁货" ? " selected" : ""}>未锁货</option>
              </select>
            </div>
            <div class="confirm-filter-field">
              <label>PO单号：</label>
              <input id="confirmPoNo" placeholder="批量查询用英文逗号隔开" value="${escapeHtml(filter.po || "")}" />
            </div>
            <div class="confirm-filter-field">
              <label>BPS单号：</label>
              <input id="confirmBpsNo" placeholder="批量查询用英文逗号隔开" value="${escapeHtml(filter.bps || "")}" />
            </div>
          </div>
          <div class="confirm-filter-line confirm-filter-line-second">
            <div class="confirm-filter-field">
              <label>客户PO单：</label>
              <input id="confirmCustomerPo" placeholder="模糊搜索" value="${escapeHtml(filter.customerPo || "")}" />
            </div>
            <button type="button" id="confirmSearchBtn">查询</button>
          </div>
        </div>
        ${renderConfirmCabinetSummary(cabinets, row.pricesetCurrency)}
        <div class="confirm-toolbar">
          <div class="confirm-toolbar-right">
            ${toolbarBtns}
          </div>
        </div>
        <div class="confirm-edit-layout">
          <div class="confirm-cabinet-panel" id="confirmCabinetPanel">
            ${renderConfirmCabinetPanel(cabinets, activeCabinet)}
          </div>
          <div class="confirm-goods-panel" id="confirmGoodsPanel">
            ${renderConfirmGoodsPanel(visibleGoods, row.pricesetCurrency, active)}
          </div>
        </div>
      </div>`;
  }

  function refreshConfirmDetailPage() {
    if (!confirmEditCtx) return;
    syncConfirmInputsToRow();
    confirmEditCtx.cabinets = groupGoodsByCabinet(confirmEditCtx.row.goodsList);
    if (!confirmEditCtx.cabinets.some(c => c.key === confirmEditCtx.activeCabinet)) {
      confirmEditCtx.activeCabinet = confirmEditCtx.cabinets[0]?.key || "";
    }
    document.getElementById("dialogTitle").textContent = `发运单详情—${confirmEditCtx.row.sendgoodsCode}（${statusLabel(confirmEditCtx.row)}）`;
    document.getElementById("dialogBody").innerHTML = renderConfirmDetailContent();
    bindConfirmDetailEvents();
  }

  function submitConfirmShipment(row) {
    syncConfirmInputsToRow();
    const err = validateConfirmShipment(row);
    if (err) return showToast(err);
    confirmOnTop("确认发运单", `确认对发运单 ${row.sendgoodsCode} 发起理货？`, () => {
      const fullCredit = row.memberBcode === "10000210999121";
      row.dataState = fullCredit ? 25 : 22;
      row.paymentCreated = true;
      row.gmtModified = new Date().toISOString().slice(0, 19).replace("T", " ");
      addLog(row, "确认发运单", `推送 NBO 理货并生成付款批次单，状态变更为${fullCredit ? "待发运" : "待付款"}`);
      confirmEditCtx = null;
      closeDialog();
      refreshList(false);
      showToast("确认发运单成功");
    });
  }

  function bindConfirmDetailEvents() {
    if (!confirmEditCtx) return;
    const { row } = confirmEditCtx;

    const applyConfirmFilter = () => {
      syncConfirmInputsToRow();
      confirmEditCtx.filter = {
        skuField: document.getElementById("confirmSkuField").value,
        sku: document.getElementById("confirmSkuNo").value,
        lockStatus: document.getElementById("confirmLockStatus").value,
        po: document.getElementById("confirmPoNo").value,
        bps: document.getElementById("confirmBpsNo").value,
        customerPo: document.getElementById("confirmCustomerPo").value
      };
      refreshConfirmDetailPage();
      const active = confirmEditCtx.cabinets.find(c => c.key === confirmEditCtx.activeCabinet);
      const count = filterConfirmGoods(active ? active.goods : [], confirmEditCtx.filter).length;
      showToast(`查询完成，共 ${count} 条`);
    };

    document.getElementById("confirmSearchBtn").onclick = applyConfirmFilter;
    ["confirmSkuNo", "confirmPoNo", "confirmBpsNo", "confirmCustomerPo"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.onkeydown = event => { if (event.key === "Enter") applyConfirmFilter(); };
    });

    document.querySelectorAll(".confirm-cabinet-item[data-confirm-cabinet]").forEach(item => {
      item.onclick = () => {
        syncConfirmInputsToRow();
        confirmEditCtx.activeCabinet = item.dataset.confirmCabinet;
        refreshConfirmDetailPage();
      };
    });

    document.querySelectorAll("[data-confirm-cabinet-type]").forEach(select => {
      select.onchange = event => {
        event.stopPropagation();
        const cabinetKey = select.dataset.confirmCabinetType;
        const packageName = select.value;
        row.goodsList.forEach(g => {
          if ((g.expressName || g.packageRemark || "") === cabinetKey) {
            g.packageName = packageName;
          }
        });
        confirmEditCtx.cabinets = groupGoodsByCabinet(row.goodsList);
        const cab = confirmEditCtx.cabinets.find(c => c.key === cabinetKey);
        if (cab) cab.packageName = packageName;
        refreshConfirmDetailPage();
      };
    });

    const cabinetCheckAll = document.getElementById("confirmCabinetCheckAll");
    if (cabinetCheckAll) {
      cabinetCheckAll.onchange = function () {
        document.querySelectorAll("[data-confirm-cabinet-check]").forEach(item => {
          item.checked = this.checked;
        });
      };
    }

    const goodsCheckAll = document.getElementById("confirmGoodsCheckAll");
    if (goodsCheckAll) {
      goodsCheckAll.onchange = function () {
        document.querySelectorAll("[data-confirm-goods-check]").forEach(item => {
          item.checked = this.checked;
        });
      };
    }

    document.getElementById("confirmDeleteCabinetBtn")?.addEventListener("click", () => {
      syncConfirmInputsToRow();
      const keys = getSelectedConfirmCabinetKeys();
      if (!keys.length) return showToast("请先勾选需要删除的柜");
      row.goodsList = row.goodsList.filter(g => !keys.includes(g.expressName || g.packageRemark || "DEFAULT"));
      if (!row.goodsList.length) {
        row.expressName = "";
        row.packageRemark = "";
      }
      confirmEditCtx.activeCabinet = row.goodsList[0]?.expressName || row.goodsList[0]?.packageRemark || "";
      refreshConfirmDetailPage();
      showToast(`已删除 ${keys.length} 个柜`);
    });

    document.getElementById("confirmDeleteGoodsBtn")?.addEventListener("click", () => {
      syncConfirmInputsToRow();
      const indexes = getSelectedConfirmGoodsIndexes().sort((a, b) => b - a);
      if (!indexes.length) return showToast("请先勾选需要删除的商品明细");
      indexes.forEach(index => row.goodsList.splice(index, 1));
      refreshConfirmDetailPage();
      showToast(`已删除 ${indexes.length} 条商品明细`);
    });

    document.getElementById("confirmImportBtn")?.addEventListener("click", () => openConfirmImportModal());
    document.getElementById("confirmBatchInNoBtn")?.addEventListener("click", () => {
      document.getElementById("confirmBatchDropdown")?.classList.remove("open");
      showToast(isWarehouseNoEditMode()
        ? "已进入批量修改进仓编号模式，可同时维护进仓编码1和进仓编码2"
        : "已进入批量修改进仓编号模式，可同时维护进仓编码1和进仓编码2");
    });
    document.getElementById("confirmTagColorBtn")?.addEventListener("click", () => {
      document.getElementById("confirmBatchDropdown")?.classList.remove("open");
      showToast("已进入修改标签颜色模式");
    });

    document.getElementById("confirmSaveDraftBtn")?.addEventListener("click", () => {
      syncConfirmInputsToRow();
      row.gmtModified = new Date().toISOString().slice(0, 19).replace("T", " ");
      addLog(row, "保存草稿", "保存发运单排柜草稿");
      showToast("草稿已保存");
    });

    document.getElementById("confirmSaveEditBtn")?.addEventListener("click", () => {
      syncConfirmInputsToRow();
      row.gmtModified = new Date().toISOString().slice(0, 19).replace("T", " ");
      if (isWarehouseNoEditMode()) {
        addLog(row, "修改进仓编号", "更新发运单商品进仓编号");
      } else {
        addLog(row, "确认修改", "更新发运单商品排入数量与进仓编号");
      }
      refreshList(false);
      showToast("修改已保存");
    });

    document.getElementById("confirmSubmitBtn")?.addEventListener("click", () => submitConfirmShipment(row));

    document.querySelectorAll("[data-confirm-delete]").forEach(btn => {
      btn.onclick = event => {
        event.stopPropagation();
        const index = Number(btn.dataset.confirmDelete);
        row.goodsList.splice(index, 1);
        refreshConfirmDetailPage();
        showToast("已删除商品行");
      };
    });

    document.querySelectorAll("[data-confirm-insert]").forEach(btn => {
      btn.onclick = event => {
        event.stopPropagation();
        syncConfirmInputsToRow();
        confirmUnarrangedInsertIndex = Number(btn.dataset.confirmInsert);
        openConfirmUnarrangedModal();
      };
    });
  }

  window.openConfirmImportModal = function () {
    document.getElementById("confirmImportMask").classList.add("open");
  };

  window.closeConfirmImportModal = function () {
    document.getElementById("confirmImportMask").classList.remove("open");
  };

  window.mockConfirmImport = function () {
    closeConfirmImportModal();
    showToast("导入成功");
  };

  function updateConfirmUnarrangedStats() {
    const selected = Array.from(document.querySelectorAll(".confirm-unarranged-check:checked"));
    const qty = selected.reduce((sum, el) => sum + Number(el.dataset.qty || 0), 0);
    const cbm = selected.reduce((sum, el) => sum + Number(el.dataset.cbm || 0), 0);
    const qtyEl = document.getElementById("confirmUnarrangedQty");
    const cbmEl = document.getElementById("confirmUnarrangedVolume");
    if (qtyEl) qtyEl.textContent = qty;
    if (cbmEl) cbmEl.textContent = num(cbm, 3);
  }

  function bindConfirmUnarrangedEvents() {
    document.querySelectorAll(".confirm-unarranged-check").forEach(item => {
      item.onchange = updateConfirmUnarrangedStats;
    });
    const checkAll = document.getElementById("confirmUnarrangedCheckAll");
    if (checkAll) {
      checkAll.onchange = function () {
        document.querySelectorAll(".confirm-unarranged-check").forEach(item => {
          item.checked = this.checked;
        });
        updateConfirmUnarrangedStats();
      };
    }
  }

  window.openConfirmUnarrangedModal = function () {
    ["confirmUnarrangedGoodsCode", "confirmUnarrangedBps", "confirmUnarrangedSku"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    document.querySelectorAll(".confirm-unarranged-check").forEach(item => { item.checked = false; });
    const checkAll = document.getElementById("confirmUnarrangedCheckAll");
    if (checkAll) checkAll.checked = false;
    updateConfirmUnarrangedStats();
    document.getElementById("confirmUnarrangedMask").classList.add("open");
    bindConfirmUnarrangedEvents();
  };

  window.closeConfirmUnarrangedModal = function () {
    document.getElementById("confirmUnarrangedMask").classList.remove("open");
    confirmUnarrangedInsertIndex = null;
  };

  window.searchConfirmUnarranged = function () {
    showToast("已按商品编码、BPS订单号、SKU 筛选未排入商品");
  };

  window.insertConfirmUnarranged = function () {
    if (!confirmEditCtx) return;
    const selected = Array.from(document.querySelectorAll(".confirm-unarranged-check:checked"));
    if (!selected.length) return showToast("请先勾选需要选入的商品");
    const { row } = confirmEditCtx;
    const cabinetKey = confirmEditCtx.activeCabinet || row.expressName || row.packageRemark || "G260526024396";
    const insertAt = Number.isInteger(confirmUnarrangedInsertIndex) ? confirmUnarrangedInsertIndex + 1 : row.goodsList.length;
    const sampleRows = [
      ["L2606010012", "PO-260601", "B2606010032", "LSC23DD009848", "UV3E", "三斗柜", 0.072, 8],
      ["L2605280062", "PO-260528", "B2605310041", "LSC24YG030454", "TR20", "两门衣柜", 0.286, 6],
      ["L2605280060", "PO-260528", "B2605310031", "LSC23SF009024", "TB5039", "单人位沙发", 0.495, 3],
      ["L2605280059", "PO-260528", "B2605310025", "LS02XGLS4N006", "JS4N", "梳妆柜", 0.049, 12],
      ["L2605250014", "PO-260525", "B2605250015", "LSC25XZ073241", "LS690V5", "儿童学习桌", 0.191, 5]
    ];
    selected.forEach((item, offset) => {
      const rowIndex = item.closest("tr").rowIndex - 1;
      const sample = sampleRows[rowIndex] || sampleRows[0];
      const qty = Number(item.dataset.qty || 1);
      row.goodsList.splice(insertAt + offset, 0, {
        contractNbillcode: sample[0],
        goodsSpec1: sample[1],
        contractBillcode: sample[2],
        skuNo: sample[3],
        spuNo: sample[4],
        skuName: sample[5],
        goodsCamount: qty,
        sgCamount: qty,
        lockQty: qty,
        goodsAhnum: 1,
        goodsAhweight: sample[6],
        goodsTopweight: 5,
        contractGoodsPrice: 88,
        contractGoodsMoney: Number((qty * 88).toFixed(2)),
        goodsSpec4: "",
        goodsSpec5: "",
        financeTag: "白标",
        goodsSpec: "规格描述",
        warehouseName: "佛山仓",
        expressName: cabinetKey,
        packageRemark: cabinetKey,
        packageName: row.packageName || "40HQ",
        lockStatus: "全部锁货"
      });
    });
    closeConfirmUnarrangedModal();
    refreshConfirmDetailPage();
    showToast(`已选入 ${selected.length} 条商品至当前柜`);
  };

  /** 确认发运单 / 修改进仓编号 — 排柜编辑详情页 */
  function openConfirmDetail(row, mode) {
    ensureGoodsList(row);
    confirmEditCtx = {
      row,
      mode: mode || "confirm",
      cabinets: groupGoodsByCabinet(row.goodsList),
      activeCabinet: (row.expressName || row.packageRemark || row.goodsList[0]?.expressName || ""),
      filter: { skuField: "skuNo", sku: "", lockStatus: "", po: "", bps: "", customerPo: "" }
    };
    if (!confirmEditCtx.activeCabinet && confirmEditCtx.cabinets[0]) {
      confirmEditCtx.activeCabinet = confirmEditCtx.cabinets[0].key;
    }
    openDialog(
      `发运单详情—${row.sendgoodsCode}（${statusLabel(row)}）`,
      renderConfirmDetailContent(),
      `<span></span>`,
      "dialog-xl dialog-confirm-edit"
    );
    bindConfirmDetailEvents();
  }

  function hasPackageExportData(row) {
    const goods = ensureGoodsList(row);
    if (!goods.length) return false;
    const hasGoodsCabinet = goods.some(g => g.expressName || g.packageRemark || g.packageBillno);
    const hasRowCabinet = row.packageRemark || row.expressName || row.packageBillno;
    return !!(hasGoodsCabinet || hasRowCabinet);
  }

  function canExportPackageExcel(row) {
    if (!row) return false;
    if (!PACKAGE_EXPORT_ALLOWED_STATES.has(Number(row.dataState))) return false;
    return hasPackageExportData(row);
  }

  function renderPackageExportButton(detail) {
    const code = escapeHtml(detail.sendgoodsCode);
    const enabled = canExportPackageExcel(detail);
    const tipBlock = enabled ? "" : `
      <span class="dispatch-export-tip-wrap">
        <span class="dispatch-export-tip-icon">!</span>
        <span class="dispatch-export-tip-popup">${escapeHtml(PACKAGE_EXPORT_TIP)}</span>
      </span>`;
    const btn = enabled
      ? `<button class="dispatch-export-btn" type="button" onclick="exportPackageExcel('${code}')">导出装箱单</button>`
      : `<button class="dispatch-export-btn is-disabled" type="button" disabled>导出装箱单</button>`;
    return `<div class="dispatch-export-bar">${tipBlock}${btn}</div>`;
  }

  /** 对齐 getSendgoods.json — 发运单详情弹窗 */
  function openDetail(row) {
    const detail = getSendgoods(row.sendgoodsId);
    if (!detail) return;
    const goods = detail.goodsList || [];

    openDialog(
      `发运单详情—${detail.sendgoodsCode}（${statusLabel(detail)}）`,
      `<div class="dispatch-detail-page">
        <div class="dispatch-basic-strip">
          <span>客户名称：<strong>${detail.memberBname}</strong></span>
          <span>总商品件数：<strong>${detail.planSum}</strong></span>
          <span>总包件数：<strong>${detail.actualSum}</strong></span>
          <span>实际装柜日期：<strong>${detail.gmtVaild || "— —"}</strong></span>
          <span>贸易国：<strong>${detail.areaName || "— —"}</strong></span>
          <span>送货方式：<strong class="blue-link">${detail.deliveryMode || "— —"}</strong></span>
          <span>海关编号：<strong>${detail.customsCode || "— —"}</strong></span>
          <span>阿里订单号：<strong>${detail.contractEcurl || "— —"}</strong></span>
          <span>出口报关费（CNY）：<strong>${detail.exportCustomsFeeCny ? num(detail.exportCustomsFeeCny, 2) : "— —"}</strong></span>
          <span>运费补差价（CNY）：<strong>${detail.freightDiffCny ? num(detail.freightDiffCny, 2) : "— —"}</strong></span>
          <span>备注：<strong>${detail.sendgoodsRemark || "— —"}</strong></span>
          <span>接口信息：<strong>${detail.interfaceInfo || "-"}</strong></span>
        </div>
        <div class="dispatch-top-actions">
          ${renderPackageExportButton(detail)}
        </div>
        <div class="dispatch-tabs">
          <button class="dispatch-tab active" type="button" data-dispatch-tab="cabinet">柜数据</button>
          <button class="dispatch-tab" type="button" data-dispatch-tab="goods">商品数据</button>
        </div>
        <div class="dispatch-panel active" data-dispatch-panel="cabinet">
          ${renderCabinetTable(detail, goods)}
        </div>
        <div class="dispatch-panel" data-dispatch-panel="goods">
          <div class="dispatch-search-row">
            <select id="detailGoodsField">
              <option value="skuNo">SKU</option>
              <option value="contractBillcode">BPS订单</option>
              <option value="contractNbillcode">林氏PI 单号</option>
              <option value="goodsSpec1">客户PO单号</option>
              <option value="spuNo">SPU</option>
              <option value="batchNo">批次单号</option>
            </select>
            <input id="detailGoodsKeyword" value="" placeholder="批量查询用英文逗号/空格隔开" />
            <button id="detailGoodsSearchBtn" type="button">查询</button>
          </div>
          <div id="detailGoodsTable">${renderGoodsDataTable(goods, detail)}</div>
        </div>
       </div>`,
      `<span></span>`,
      "dialog-xl dialog-dispatch"
    );

    const searchInput = document.getElementById("detailGoodsKeyword");
    const searchField = document.getElementById("detailGoodsField");
    const searchBtn = document.getElementById("detailGoodsSearchBtn");
    const applyDetailGoodsSearch = () => {
      const keywords = searchInput.value.replace(/\s+/g, ",").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
      const field = searchField.value;
      const filtered = keywords.length ? goods.filter(g => keywords.some(k => String(g[field] || "").toLowerCase().includes(k))) : goods;
      document.getElementById("detailGoodsTable").innerHTML = renderGoodsDataTable(filtered, detail);
      showToast(`商品明细查询完成，共 ${filtered.length} 行`);
    };
    searchBtn.onclick = applyDetailGoodsSearch;
    searchInput.onkeydown = event => {
      if (event.key === "Enter") applyDetailGoodsSearch();
    };
    document.querySelectorAll("[data-dispatch-tab]").forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll("[data-dispatch-tab]").forEach(item => item.classList.toggle("active", item === tab));
        document.querySelectorAll("[data-dispatch-panel]").forEach(panel => {
          panel.classList.toggle("active", panel.dataset.dispatchPanel === tab.dataset.dispatchTab);
        });
      };
    });
  }

  /** 对齐现网 — 调价总额弹窗（getSendgoodsChangePriceDetail.json） */
  function openChangePriceDialog(sendgoodsCode) {
    const data = getSendgoodsChangePriceDetail(sendgoodsCode);
    if (!data) return;
    const hasRebate = Number(data.rebateTotalPriceSum || 0) > 0;
    const rebateSubRows = [
      { label: "建店返利：", value: data.storeRebateTotalPriceSum },
      { label: "销售返利：", value: data.salesRebateTotalPriceSum },
      { label: "售后返利：", value: data.afterSalesRebateTotalPriceSum },
      { label: "其他返利：", value: data.otherRebateTotalPriceSum }
    ].filter(item => Number(item.value || 0) > 0).map(item => `
      <div class="price-adjust-row price-adjust-sub" data-rebate-sub>
        <span class="price-adjust-label">${item.label}</span>
        <span class="price-adjust-value">${moneySpaced(item.value, data.pricesetCurrency)}</span>
      </div>`).join("");

    openDialog(
      "订单调价明细",
      `<div class="price-adjust-panel">
         <div class="price-adjust-row">
           <span class="price-adjust-label">调价总额：</span>
           <span class="price-adjust-value">${moneySpaced(data.adjustedTotalPrice, data.pricesetCurrency)}</span>
         </div>
         <div class="price-adjust-row">
           <span class="price-adjust-label">运费总额：</span>
           <span class="price-adjust-value">${moneySpaced(data.transportationTotalPriceSum, data.pricesetCurrency)}</span>
         </div>
         <div class="price-adjust-row price-adjust-toggle" id="rebateToggleRow"${hasRebate ? "" : ' style="pointer-events:none"'}>
           <span class="price-adjust-label">返利总额：${hasRebate ? '<span class="price-adjust-arrow">&gt;</span>' : ""}</span>
           <span class="price-adjust-value">${moneySpaced(data.rebateTotalPriceSum, data.pricesetCurrency)}</span>
         </div>
         ${rebateSubRows}
       </div>`,
      `<span></span>`,
      "dialog-price"
    );

    const toggleRow = document.getElementById("rebateToggleRow");
    if (toggleRow && hasRebate) {
      toggleRow.onclick = () => {
        document.querySelectorAll("[data-rebate-sub]").forEach(row => {
          row.classList.toggle("collapsed");
        });
      };
      if (!rebateSubRows) toggleRow.style.pointerEvents = "none";
    }
  }

  function normalizeLogEntry(log) {
    if (log.content) {
      return {
        content: log.content,
        user: log.user || log.operator || "-",
        time: log.time || "-"
      };
    }
    const text = log.title ? `${log.title}${log.content ? `：${log.content}` : ""}` : "-";
    return {
      content: text,
      user: log.user || log.operator || "-",
      time: log.time || "-"
    };
  }

  function renderLogDialogBody() {
    const ctx = logDialogCtx;
    if (!ctx) return;
    const total = ctx.logs.length;
    const totalPages = Math.max(1, Math.ceil(total / ctx.pageSize));
    if (ctx.pageNum > totalPages) ctx.pageNum = totalPages;
    const start = (ctx.pageNum - 1) * ctx.pageSize;
    const pageData = ctx.logs.slice(start, start + ctx.pageSize);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).map(i =>
      `<span class="page-no${i === ctx.pageNum ? " active" : ""}" data-log-page="${i}">${i}</span>`
    ).join("");

    document.getElementById("dialogBody").innerHTML = `
      <div class="log-dialog-wrap">
        <div class="log-table-wrap">
          <table class="log-table">
            <colgroup>
              <col class="log-col-content">
              <col class="log-col-user">
              <col class="log-col-time">
            </colgroup>
            <thead>
              <tr>
                <th>操作内容</th>
                <th>操作人</th>
                <th>操作时间</th>
              </tr>
            </thead>
            <tbody>
              ${pageData.length ? pageData.map(log => `
                <tr>
                  <td class="log-op-content">${escapeHtml(log.content)}</td>
                  <td class="log-op-user">${escapeHtml(log.user)}</td>
                  <td class="log-op-time">${escapeHtml(log.time)}</td>
                </tr>`).join("") : `<tr><td class="log-empty" colspan="3">暂无操作日志</td></tr>`}
            </tbody>
          </table>
        </div>
        <div class="log-pagination">
          <label class="log-page-size">
            <span>显示行数</span>
            <select id="logPageSizeSelect">
              <option value="10"${ctx.pageSize === 10 ? " selected" : ""}>10条/页</option>
              <option value="20"${ctx.pageSize === 20 ? " selected" : ""}>20条/页</option>
              <option value="50"${ctx.pageSize === 50 ? " selected" : ""}>50条/页</option>
            </select>
          </label>
          <span>共 ${total} 条</span>
          <span class="page-no${ctx.pageNum <= 1 ? " disabled" : ""}" data-log-page="${ctx.pageNum - 1}" data-log-boundary="prev">‹</span>
          <span id="logPageNumbers">${pageNumbers}</span>
          <span class="page-no${ctx.pageNum >= totalPages ? " disabled" : ""}" data-log-page="${ctx.pageNum + 1}" data-log-boundary="next">›</span>
          <span>前往</span>
          <input id="logPageInput" class="page-input" value="${ctx.pageNum}">
          <span>页</span>
        </div>
      </div>`;

    document.getElementById("logPageSizeSelect").onchange = function () {
      ctx.pageSize = Number(this.value) || 10;
      ctx.pageNum = 1;
      renderLogDialogBody();
    };

    document.getElementById("logPageInput").addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      const value = Number(event.target.value);
      if (value >= 1 && value <= totalPages) {
        ctx.pageNum = value;
        renderLogDialogBody();
      }
    });

    document.querySelectorAll("[data-log-page]").forEach(el => {
      el.onclick = () => {
        const page = Number(el.dataset.logPage);
        const boundary = el.dataset.logBoundary;
        if (boundary === "prev" && ctx.pageNum <= 1) return;
        if (boundary === "next" && ctx.pageNum >= totalPages) return;
        if (page >= 1 && page <= totalPages) {
          ctx.pageNum = page;
          renderLogDialogBody();
        }
      };
    });
  }

  function openLogDialog(row) {
    logDialogCtx = {
      sendgoodsCode: row.sendgoodsCode,
      logs: (operateLogs[row.sendgoodsCode] || []).map(normalizeLogEntry),
      pageNum: 1,
      pageSize: 10
    };
    openDialog("查看日志", "", "", "dialog-log");
    renderLogDialogBody();
  }

  function openCustomsDetail(row) {
    navigateToCustomsManagement(row);
  }

  function getCustomsRecords() {
    return shipments
      .filter(row => row.applyCustomsStatus === "1" && (row.customsInfoNo || row.contractInvcode))
      .map(row => ({
        customsInfoNo: row.customsInfoNo || "-",
        customsNo: row.contractInvcode || "-",
        sendgoodsCode: row.sendgoodsCode,
        memberBname: row.memberBname || "-",
        customsAmount: money(row.customsAmountValue || 0, row.pricesetCurrency),
        contractNo: row.contractNo || "-",
        status: "已申报"
      }));
  }

  function switchMainPage(page, highlightRow) {
    const isCustoms = page === "customs";
    document.getElementById("shipmentListView").hidden = isCustoms;
    document.getElementById("customsManageView").hidden = !isCustoms;
    document.querySelectorAll(".sidebar .menu-item[data-page]").forEach(el => {
      el.classList.toggle("active", el.dataset.page === page);
    });
    document.getElementById("mainTabs").innerHTML = isCustoms
      ? `<div class="tab" data-page="shipment"><span>发运单列表</span><span>×</span></div>
         <div class="tab active" data-page="customs"><span>报关管理</span><span>×</span></div>`
      : `<div class="tab active" data-page="shipment"><span>发运单列表</span><span>×</span></div>`;
    bindMainTabEvents();
    if (isCustoms) renderCustomsManagePage(highlightRow);
  }

  function navigateToCustomsManagement(row) {
    closeDialog();
    if (row) {
      document.getElementById("customsSearchNo").value = row.customsInfoNo || "";
      document.getElementById("customsSearchShipment").value = row.sendgoodsCode || "";
    }
    switchMainPage("customs", row ? row.sendgoodsCode : "");
    showToast(`已跳转至报关管理${row ? `，发运单 ${row.sendgoodsCode}` : ""}`);
  }

  window.renderCustomsManagePage = function (highlightCode) {
    const noKeyword = document.getElementById("customsSearchNo").value.trim().toLowerCase();
    const shipmentKeyword = document.getElementById("customsSearchShipment").value.trim().toLowerCase();
    const highlight = highlightCode || window._customsHighlightCode || "";
    const rows = getCustomsRecords().filter(item => {
      const matchNo = !noKeyword || String(item.customsInfoNo).toLowerCase().includes(noKeyword);
      const matchShipment = !shipmentKeyword || String(item.sendgoodsCode).toLowerCase().includes(shipmentKeyword);
      return matchNo && matchShipment;
    });
    document.getElementById("customsTableBody").innerHTML = rows.length ? rows.map(item => `
      <tr class="${highlight && item.sendgoodsCode === highlight ? "customs-highlight" : ""}">
        <td>${escapeHtml(item.customsInfoNo)}</td>
        <td>${escapeHtml(item.customsNo)}</td>
        <td>${escapeHtml(item.sendgoodsCode)}</td>
        <td>${escapeHtml(item.memberBname)}</td>
        <td>${escapeHtml(item.customsAmount)}</td>
        <td>${escapeHtml(item.contractNo)}</td>
        <td>${escapeHtml(item.status)}</td>
      </tr>`).join("") : `<tr><td colspan="7" style="text-align:center;color:#909399;padding:24px;">暂无报关数据</td></tr>`;
    window._customsHighlightCode = highlight;
  };

  window.resetCustomsSearch = function () {
    document.getElementById("customsSearchNo").value = "";
    document.getElementById("customsSearchShipment").value = "";
    window._customsHighlightCode = "";
    renderCustomsManagePage();
  };

  function bindMainTabEvents() {
    document.querySelectorAll("#mainTabs .tab").forEach(tab => {
      tab.onclick = event => {
        if (event.target.closest("span:last-child")) {
          const page = tab.dataset.page;
          if (page === "customs") return switchMainPage("shipment");
          return;
        }
        const page = tab.dataset.page;
        if (page) switchMainPage(page);
      };
    });
  }

  function openCreditDialog(row) {
    const currency = row.pricesetCurrency || "USD";
    const applyAmount = Number(row.lcrpMoney || row.pricesetNpriceTotal || 0);
    const totalCredit = Number(row.creditTotalLimit || 0);
    const availableCredit = Number(row.creditAvailableLimit || 0);
    window._creditUploadMock = false;

    openDialog(
      `临时授信-${row.sendgoodsCode} (${currency})`,
      `<div class="credit-form">
        <div class="credit-form-row">
          <label>客户名称</label>
          <div class="credit-readonly">${escapeHtml(row.memberBname || "-")}</div>
        </div>
        <div class="credit-form-row">
          <label>总信用额度</label>
          <div class="credit-readonly">${money(totalCredit, currency)}</div>
        </div>
        <div class="credit-form-row">
          <label>可用信用额度</label>
          <div class="credit-readonly">${money(availableCredit, currency)}</div>
        </div>
        <div class="credit-form-row">
          <label>本次申请临时额度</label>
          <div class="credit-readonly">${money(applyAmount, currency)}</div>
        </div>
        <div class="credit-form-row">
          <label class="required">付款水单</label>
          <div class="credit-upload-block">
            <button class="credit-upload-btn" type="button" onclick="mockCreditUpload()">上传附件</button>
            <div class="credit-upload-hint">支持JPG/PNG/PDF/Excel/Word/ZIP格式文件上传，单个文件不能超过50M</div>
          </div>
        </div>
        <div class="credit-form-row">
          <label class="required">备注</label>
          <div class="credit-textarea-wrap">
            <textarea id="creditRemark" class="credit-textarea" maxlength="500" placeholder="请输入备注"></textarea>
            <span class="credit-textarea-count"><span id="creditRemarkCount">0</span>/500</span>
          </div>
        </div>
      </div>`,
      `<button class="btn-default" type="button" onclick="closeDialog()">取消</button>
       <button class="btn-action" type="button" onclick="submitCreditApplication('${escapeHtml(row.sendgoodsCode)}')">确认</button>`,
      "dialog-credit"
    );

    const remarkEl = document.getElementById("creditRemark");
    const countEl = document.getElementById("creditRemarkCount");
    if (remarkEl && countEl) {
      remarkEl.oninput = () => {
        countEl.textContent = remarkEl.value.length;
      };
    }
  }

  window.mockCreditUpload = function () {
    window._creditUploadMock = true;
    showToast("附件上传成功");
  };

  window.submitCreditApplication = function (sendgoodsCode) {
    const row = findRow(sendgoodsCode);
    if (!row) return showToast("未找到发运单");
    if (!window._creditUploadMock) return showToast("请上传付款水单");
    const remark = document.getElementById("creditRemark")?.value.trim();
    if (!remark) return showToast("请输入备注");
    row.gmtModified = new Date().toISOString().slice(0, 19).replace("T", " ");
    addLog(row, "临时授信", `提交临时授信申请，备注：${remark}`);
    window._creditUploadMock = false;
    closeDialog();
    showToast("临时授信申请已提交");
  };

  function blField(label, innerHtml, required) {
    return `<div class="bl-form-item"><label${required ? ' class="required"' : ""}>${label}</label>${innerHtml}</div>`;
  }

  function blReadonly(value) {
    return `<div class="bl-readonly">${escapeHtml(value)}</div>`;
  }

  function blInput(id, placeholder) {
    return `<input class="bl-input" id="${id}" type="text" placeholder="${escapeHtml(placeholder)}" />`;
  }

  function openReleaseBlDialog(row) {
    window._blUploads = { guarantee: false, slip: false, other: false };
    openDialog(
      "放提单",
      `<div class="bl-form">
        <div class="bl-form-grid">
          ${blField("文件类型：", blReadonly("财务类"))}
          ${blField("文件具体类型：", blReadonly("出境报关、清关、产地证、提单、发票、装箱单"))}
          ${blField("是否需要公章：", blReadonly("是"))}
          ${blField("印章主体：", blReadonly("佛山市林氏生活家居有限公司"))}
          ${blField("印章名称：", blReadonly("公章（林氏生活家居）"))}
          ${blField("文件名称：", blInput("blFileName", "请输入文件名称"), true)}
          ${blField("文件页数：", blInput("blFilePages", "请输入文件页数"), true)}
          ${blField("文件份数：", blInput("blFileCopies", "请输入文件份数"), true)}
          ${blField("资料流向：", blInput("blInfoFlow", "请输入资料流向"), true)}
          ${blField("备注：", blInput("blRemark", "请输入备注"), true)}
        </div>
        <div class="bl-upload-row">
          <div class="bl-upload-item">
            <label class="required">保函文件附件：</label>
            <div class="bl-upload-box" id="blUploadGuarantee" onclick="mockBlUpload('guarantee')">+</div>
          </div>
          <div class="bl-upload-item">
            <label>水单附件：</label>
            <div class="bl-upload-box" id="blUploadSlip" onclick="mockBlUpload('slip')">+</div>
          </div>
          <div class="bl-upload-item">
            <label>其他附件：</label>
            <div class="bl-upload-box" id="blUploadOther" onclick="mockBlUpload('other')">+</div>
          </div>
        </div>
      </div>`,
      `<button class="btn-default" type="button" onclick="closeDialog()">取消</button>
       <button class="btn-action" type="button" onclick="submitReleaseBl('${escapeHtml(row.sendgoodsCode)}')">确定</button>`,
      "dialog-bl"
    );
  }

  window.mockBlUpload = function (type) {
    if (!window._blUploads) window._blUploads = {};
    window._blUploads[type] = true;
    const map = { guarantee: "blUploadGuarantee", slip: "blUploadSlip", other: "blUploadOther" };
    const el = document.getElementById(map[type]);
    if (el) {
      el.classList.add("uploaded");
      el.textContent = "已上传";
    }
    showToast("附件上传成功");
  };

  window.submitReleaseBl = function (sendgoodsCode) {
    const row = findRow(sendgoodsCode);
    if (!row) return showToast("未找到发运单");
    const fileName = document.getElementById("blFileName")?.value.trim();
    const filePages = document.getElementById("blFilePages")?.value.trim();
    const fileCopies = document.getElementById("blFileCopies")?.value.trim();
    const infoFlow = document.getElementById("blInfoFlow")?.value.trim();
    const remark = document.getElementById("blRemark")?.value.trim();
    if (!fileName) return showToast("请输入文件名称");
    if (!filePages) return showToast("请输入文件页数");
    if (!fileCopies) return showToast("请输入文件份数");
    if (!infoFlow) return showToast("请输入资料流向");
    if (!remark) return showToast("请输入备注");
    if (!window._blUploads?.guarantee) return showToast("请上传保函文件附件");
    row.dataState = 4;
    row.gmtModified = new Date().toISOString().slice(0, 19).replace("T", " ");
    addLog(row, "放提单", `放提单申请已提交，文件名称：${fileName}，资料流向：${infoFlow}`);
    window._blUploads = null;
    closeDialog();
    refreshList(false);
    showToast("放提单提交成功");
  };

  function packField(label, innerHtml) {
    return `<div class="pack-confirm-form-row"><label class="required">${label}</label>${innerHtml}</div>`;
  }

  function openConfirmPackingDialog(row) {
    const planDate = row.gmtUse || "";
    const delivery = row.deliveryMode || "自提";
    const customsYes = row.applyCustomsStatus === "1";
    const template = row.shippingTemplate || "海外散货模板";
    const consignee = row.consignee || "123";
    window._packConsignee = consignee;

    openDialog(
      "确认发运单信息",
      `<div class="pack-confirm-form">
        ${packField("计划装柜日期", `<input class="pack-input" id="packPlanDate" type="date" value="${escapeHtml(planDate)}" />`)}
        ${packField("送货方式", `<select class="pack-input" id="packDeliveryMode">
          <option value="自提"${delivery === "自提" ? " selected" : ""}>自提</option>
          <option value="送货到仓"${delivery === "送货到仓" ? " selected" : ""}>送货到仓</option>
          <option value="快递"${delivery === "快递" ? " selected" : ""}>快递</option>
        </select>`)}
        ${packField("是否报关", `<select class="pack-input" id="packCustomsFlag">
          <option value="1"${customsYes ? " selected" : ""}>是</option>
          <option value="0"${!customsYes ? " selected" : ""}>否</option>
        </select>`)}
        ${packField("发货模板", `<select class="pack-input" id="packShippingTemplate">
          <option value="海外散货模板"${template === "海外散货模板" ? " selected" : ""}>海外散货模板</option>
          <option value="海外整柜模板"${template === "海外整柜模板" ? " selected" : ""}>海外整柜模板</option>
          <option value="国内发货模板"${template === "国内发货模板" ? " selected" : ""}>国内发货模板</option>
        </select>`)}
        ${packField("收货人", `<div class="pack-consignee-field">
          <span class="pack-consignee-value" id="packConsigneeText">${escapeHtml(consignee)}</span>
          <button type="button" class="pack-address-link" onclick="mockSelectConsigneeAddress()">+选择/新增地址</button>
        </div>`)}
      </div>`,
      `<button class="btn-default" type="button" onclick="closeDialog()">取消</button>
       <button class="btn-action" type="button" onclick="submitConfirmPacking('${escapeHtml(row.sendgoodsCode)}')">确定</button>`,
      "dialog-pack"
    );
  }

  window.mockSelectConsigneeAddress = function () {
    window._packConsignee = "FortyTwo Pte. Ltd. / 123 Warehouse Rd";
    const el = document.getElementById("packConsigneeText");
    if (el) el.textContent = window._packConsignee;
    showToast("已选择收货地址");
  };

  window.submitConfirmPacking = function (sendgoodsCode) {
    const row = findRow(sendgoodsCode);
    if (!row) return showToast("未找到发运单");
    const planDate = document.getElementById("packPlanDate")?.value;
    const deliveryMode = document.getElementById("packDeliveryMode")?.value;
    const customsFlag = document.getElementById("packCustomsFlag")?.value;
    const shippingTemplate = document.getElementById("packShippingTemplate")?.value;
    const consignee = window._packConsignee || document.getElementById("packConsigneeText")?.textContent.trim();
    if (!planDate) return showToast("请选择计划装柜日期");
    if (!consignee) return showToast("请选择收货人");
    row.gmtUse = planDate;
    row.deliveryMode = deliveryMode;
    row.applyCustomsStatus = customsFlag;
    row.shippingTemplate = shippingTemplate;
    row.consignee = consignee;
    row.dataState = 61;
    row.gmtModified = new Date().toISOString().slice(0, 19).replace("T", " ");
    addLog(row, "确认装箱", `确认装箱成功，送货方式：${deliveryMode}，发货模板：${shippingTemplate}`);
    window._packConsignee = "";
    closeDialog();
    refreshList(false);
    showToast("确认装箱成功");
  };

  function calcCabinetWeight(goods) {
    return goods.reduce((sum, g) => sum + Number(g.goodsTopweight || 0) * Number(g.goodsCamount || 0), 0);
  }

  function ensureCabinetList(row) {
    const goods = ensureGoodsList(row);
    if (row.cabinetList && row.cabinetList.length) return row.cabinetList;
    const grouped = groupGoodsByCabinet(goods);
    row.cabinetList = grouped.map(cab => {
      const stats = calcCabinetStats(cab.goods);
      return {
        virtualNo: cab.key,
        packageName: cab.packageName || row.packageName || "40HQ",
        cbm: stats.cbm,
        qty: stats.qty,
        pkg: stats.pkg,
        weight: calcCabinetWeight(cab.goods),
        bookingNo: row.bookingNo || "",
        packageBillno: cab.goods[0]?.packageBillno || row.packageBillno || "",
        expressCode: cab.goods[0]?.expressCode || row.expressCode || ""
      };
    });
    if (!row.cabinetList.length) {
      row.cabinetList = [{
        virtualNo: row.packageRemark || row.expressName || "G260526024328",
        packageName: row.packageName || "40HQ",
        cbm: Number(row.totalVolume || 0),
        qty: Number(row.planSum || 0),
        pkg: Number(row.actualSum || 0),
        weight: goods.length ? calcCabinetWeight(goods) : 0,
        bookingNo: row.bookingNo || "",
        packageBillno: row.packageBillno || "",
        expressCode: row.expressCode || ""
      }];
    }
    return row.cabinetList;
  }

  function calcCabinetListTotals(cabinets) {
    return cabinets.reduce((acc, cab) => {
      acc.cbm += Number(cab.cbm || 0);
      acc.qty += Number(cab.qty || 0);
      acc.pkg += Number(cab.pkg || 0);
      acc.weight += Number(cab.weight || 0);
      return acc;
    }, { cbm: 0, qty: 0, pkg: 0, weight: 0 });
  }

  function cabinetField(label, innerHtml, extraClass) {
    return `<div class="cabinet-form-item${extraClass ? ` ${extraClass}` : ""}"><label>${label}</label>${innerHtml}</div>`;
  }

  function cabinetReadonly(value) {
    return `<div class="cabinet-readonly">${escapeHtml(value ?? "— —")}</div>`;
  }

  function cabinetInput(id, value, placeholder, type) {
    const safeVal = escapeHtml(value || "");
    const safePh = escapeHtml(placeholder || "");
    if (type === "date") {
      return `<input class="cabinet-input" id="${id}" type="date" value="${safeVal}" />`;
    }
    if (type === "number") {
      return `<input class="cabinet-input cabinet-number" id="${id}" type="number" step="1" min="0" value="${safeVal || "0"}" />`;
    }
    return `<input class="cabinet-input" id="${id}" type="text" value="${safeVal}" placeholder="${safePh}" />`;
  }

  function renderCabinetSupplementTable(row) {
    const cabinets = ensureCabinetList(row);
    const totals = calcCabinetListTotals(cabinets);
    const code = escapeHtml(row.sendgoodsCode);
    const rowsHtml = cabinets.map((cab, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(cab.virtualNo)}</td>
        <td>${escapeHtml(cab.packageName || "40HQ")}</td>
        <td>${num(cab.cbm, 3)}m³</td>
        <td>${cab.qty}</td>
        <td>${cab.pkg}</td>
        <td>${num(cab.weight, 2)}</td>
        <td>${escapeHtml(cab.bookingNo || "")}</td>
        <td>${escapeHtml(cab.packageBillno || "")}</td>
        <td>${escapeHtml(cab.expressCode || "")}</td>
        <td><button type="button" class="cabinet-edit-link" data-cabinet-edit="${index}" data-cabinet-code="${code}">修改柜数据</button></td>
      </tr>`).join("");
    return `
      <div class="cabinet-supplement-table-wrap">
        <table class="cabinet-supplement-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>虚拟柜号</th>
              <th>柜型</th>
              <th>装柜体积m³</th>
              <th>商品总件数</th>
              <th>总包件数</th>
              <th>总重量kg</th>
              <th>订舱号</th>
              <th>实际柜号</th>
              <th>封条号</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
          <tfoot>
            <tr>
              <td>合计:</td>
              <td></td><td></td>
              <td>${num(totals.cbm, 3)}</td>
              <td>${totals.qty}</td>
              <td>${totals.pkg}</td>
              <td>${num(totals.weight, 2)}</td>
              <td colspan="4"></td>
            </tr>
          </tfoot>
        </table>
      </div>`;
  }

  function renderCabinetSupplementBody(row) {
    const totalCbm = Number(row.totalVolume || 0);
    return `
      <div class="cabinet-supplement-page">
        <div class="cabinet-form-grid">
          ${cabinetField("客户名称", cabinetReadonly(row.memberBname))}
          ${cabinetField("总商品件数", cabinetReadonly(row.planSum))}
          ${cabinetField("总包件数", cabinetReadonly(row.actualSum))}
          ${cabinetField("总体积", cabinetReadonly(`${num(totalCbm, 3)}m³`))}
          ${cabinetField("总金额", cabinetReadonly(money(row.pricesetNpriceTotal, row.pricesetCurrency)))}
          ${cabinetField("实际装柜日期", cabinetInput("cabActualDate", row.gmtVaild || "", "", "date"))}
          ${cabinetField("装船日期", cabinetInput("cabShipLoadDate", row.sendgoodsGetdate || "", "", "date"))}
          ${cabinetField("开船日期", cabinetInput("cabShipStartDate", row.sendgoodsGddate || "", "", "date"))}
          ${cabinetField("贸易国", cabinetInput("cabTradeCountry", row.areaName || "中国", "中国"))}
          ${cabinetField("抵达国", cabinetInput("cabDestCountry", row.destinationCountry || "", "抵达国"))}
          ${cabinetField("起运港", cabinetInput("cabLoadingPort", row.pricesetCurrencyPort || "", "起运港"))}
          ${cabinetField("到达港", cabinetInput("cabArrivalPort", row.pricesetCurrency1 || "", "到达港"))}
          ${cabinetField("船司", cabinetInput("cabCarrier", row.packageMode || "", "船司"))}
          ${cabinetField("ETA", cabinetInput("cabEtaDate", row.sendgoodsPdate || "", "", "date"))}
          ${cabinetField("CI单&PL装箱单", cabinetInput("cabCiPl", row.contractInvoice || "", "CI单&PL装箱单"))}
          ${cabinetField("海关编号", cabinetInput("cabCustomsCode", row.customsCode || row.customsInfoNo || "", "海关编号"))}
          ${cabinetField("出口报关费", cabinetInput("cabExportFee", row.exportCustomsFeeCny || 0, "", "number"))}
          ${cabinetField("阿里订单号", cabinetInput("cabAliOrder", row.contractEcurl || "", "阿里订单号"))}
          ${cabinetField("运费补差价", cabinetInput("cabFreightDiff", row.freightDiffCny || 0, "", "number"))}
          ${cabinetField("备注", cabinetInput("cabRemark", row.sendgoodsRemark || "", "备注"), "cabinet-form-span5")}
        </div>
        <div class="cabinet-supplement-tabs">
          <button type="button" class="cabinet-supplement-tab active">柜数据(计划数据)</button>
        </div>
        ${renderCabinetSupplementTable(row)}
      </div>`;
  }

  function syncCabinetFormToRow(row) {
    row.gmtVaild = document.getElementById("cabActualDate")?.value || "";
    row.sendgoodsGetdate = document.getElementById("cabShipLoadDate")?.value || "";
    row.sendgoodsGddate = document.getElementById("cabShipStartDate")?.value || "";
    row.areaName = document.getElementById("cabTradeCountry")?.value.trim() || row.areaName;
    row.destinationCountry = document.getElementById("cabDestCountry")?.value.trim() || "";
    row.pricesetCurrencyPort = document.getElementById("cabLoadingPort")?.value.trim() || "";
    row.pricesetCurrency1 = document.getElementById("cabArrivalPort")?.value.trim() || "";
    row.packageMode = document.getElementById("cabCarrier")?.value.trim() || "";
    row.sendgoodsPdate = document.getElementById("cabEtaDate")?.value || "";
    row.contractInvoice = document.getElementById("cabCiPl")?.value.trim() || "";
    row.customsCode = document.getElementById("cabCustomsCode")?.value.trim() || "";
    row.exportCustomsFeeCny = Number(document.getElementById("cabExportFee")?.value || 0);
    row.contractEcurl = document.getElementById("cabAliOrder")?.value.trim() || "";
    row.freightDiffCny = Number(document.getElementById("cabFreightDiff")?.value || 0);
    row.sendgoodsRemark = document.getElementById("cabRemark")?.value.trim() || "";
    row.gmtModified = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  function bindCabinetSupplementEvents(row) {
    document.querySelectorAll("[data-cabinet-edit]").forEach(btn => {
      btn.onclick = () => openEditCabinetData(row.sendgoodsCode, Number(btn.dataset.cabinetEdit));
    });
  }

  function openEditCabinetData(sendgoodsCode, index) {
    const row = findRow(sendgoodsCode);
    if (!row) return;
    syncCabinetFormToRow(row);
    const cabinets = ensureCabinetList(row);
    const cab = cabinets[index];
    if (!cab) return;
    cabinetDialogCtx = { sendgoodsCode, mode: "edit" };
    openDialog(
      "修改柜数据",
      `<div class="cabinet-edit-form">
        ${cabinetField("虚拟柜号", cabinetReadonly(cab.virtualNo))}
        ${cabinetField("订舱号", cabinetInput("cabEditBooking", cab.bookingNo, "请输入订舱号"))}
        ${cabinetField("实际柜号", cabinetInput("cabEditBillno", cab.packageBillno, "请输入实际柜号"))}
        ${cabinetField("封条号", cabinetInput("cabEditSeal", cab.expressCode, "请输入封条号"))}
      </div>`,
      `<button class="btn-default" type="button" id="cabEditCancel">取消</button>
       <button class="btn-action" type="button" id="cabEditSave">确认</button>`,
      "dialog-credit"
    );
    document.getElementById("cabEditCancel").onclick = () => openCabinetDialog(row);
    document.getElementById("cabEditSave").onclick = () => {
      cab.bookingNo = document.getElementById("cabEditBooking").value.trim();
      cab.packageBillno = document.getElementById("cabEditBillno").value.trim();
      cab.expressCode = document.getElementById("cabEditSeal").value.trim();
      row.bookingNo = cab.bookingNo;
      row.packageBillno = cab.packageBillno;
      row.expressCode = cab.expressCode;
      openCabinetDialog(row);
      showToast("柜数据已更新");
    };
  }

  function openCabinetDialog(row) {
    cabinetDialogCtx = { sendgoodsCode: row.sendgoodsCode, mode: "main" };
    const code = escapeHtml(row.sendgoodsCode);
    openDialog(
      `补充装柜信息—${row.sendgoodsCode}（${statusLabel(row)}）`,
      renderCabinetSupplementBody(row),
      `<button class="btn-default" type="button" onclick="closeDialog()">取消</button>
       <button class="btn-action" type="button" onclick="submitCabinetSupplement('${code}')">确定</button>`,
      "dialog-xl dialog-cabinet"
    );
    bindCabinetSupplementEvents(row);
    const closeBtn = document.querySelector("#dialogPanel .dialog-header .btn-default");
    if (closeBtn) closeBtn.onclick = closeDialog;
  }

  window.submitCabinetSupplement = function (sendgoodsCode) {
    const row = findRow(sendgoodsCode);
    if (!row) return showToast("未找到发运单");
    syncCabinetFormToRow(row);
    addLog(row, "补充装柜信息", "更新装柜日期、柜号、封条号、船期与港口信息");
    closeDialog();
    refreshList(false);
    showToast("保存成功");
  };

  function validateConfirmShipment(row) {
    const goods = ensureGoodsList(row);
    if (!goods.length) return "商品信息为空";
    if (!(row.packageRemark || row.expressName || goods.every(g => g.expressName))) return "预排柜号不能为空";
    if (goods.some(g => !g.goodsSpec4 && !g.goodsSpec5)) return "请维护进仓编号";
    if (!row.lockedEnough) return "锁货不足";
    if (row.paymentCreated) return "发运单已经生成付款单，不能重复生成";
    return "";
  }

  function handleAction(action, code) {
    const row = findRow(code);
    if (!row) return;

    if (action === "日志") return openLogDialog(row);
    if (action === "查看报关详情") return openCustomsDetail(row);
    if (action === "临时授信") return openCreditDialog(row);
    if (action === "补充装柜信息") return openCabinetDialog(row);
    if (action === "放提单") return openReleaseBlDialog(row);

    if (action === "确认发运单") return openConfirmDetail(row);

    if (action === "修改进仓编号") return openConfirmDetail(row, "warehouseNo");

    if (action === "确认装箱") {
      if (!row.customerSkuEnabled) return showToast("客户商品库未维护启用记录，不能确认装箱");
      return openConfirmPackingDialog(row);
    }
  }

  function preCheckCustoms(selected) {
    const invalid = selected.filter(r => r.dataState === -2);
    if (invalid.length) return `${invalid.map(r => r.sendgoodsCode).join(",")} 已作废，不能申请报关`;
    const linked = selected.filter(r => r.applyCustomsStatus === "1");
    if (linked.length) return `部分发运单已生成报关单：${linked.map(r => r.sendgoodsCode).join(",")}`;
    const customers = new Set(selected.map(r => r.memberBcode));
    const currencies = new Set(selected.map(r => r.pricesetCurrency));
    const trades = new Set(selected.map(r => r.contractPumode));
    const entities = new Set(selected.map(r => r.settlementEntity));
    if (customers.size > 1 || currencies.size > 1 || trades.size > 1) {
      return "只允许相同客户、相同币种、相同贸易方式生成同一个报关单，请检查数据";
    }
    if (entities.size > 1) return "发运单对应的PO单店铺组织主体不一致，不能申请报关";
    return "";
  }

  window.applyCustomsDeclaration = function () {
    const selected = getSelectedRows();
    if (!selected.length) return showToast("请先勾选需要申请报关的发运单");
    const err = preCheckCustoms(selected);
    if (err) return showToast(err);

    confirmDialog(
      "申请报关",
      `已选择 ${selected.length} 条发运单，确认提交报关申请？`,
      () => {
        const ybgNo = `YBG${new Date().toISOString().slice(2, 10).replace(/-/g, "")}${String(Math.floor(Math.random() * 9000) + 1000)}`;
        selected.forEach(row => {
          row.applyCustomsStatus = "1";
          row.customsInfoNo = ybgNo;
          row.gmtModified = new Date().toISOString().slice(0, 19).replace("T", " ");
          addLog(row, "申请报关", `报关申请成功，预报关单号 ${ybgNo}`);
        });
        refreshList(false);
        showToast(`报关申请成功，预报关单号 ${ybgNo}`);
      }
    );
  };

  function mapListExportRow(row) {
    return {
      memberBname: row.memberBname,
      sendgoodsCode: row.sendgoodsCode,
      dataStateStr: statusLabel(row),
      contractEcurl: row.contractEcurl || "",
      gmtCreate: formatDateTime(row.gmtCreate),
      gmtUse: row.gmtUse || "",
      gmtVaild: row.gmtVaild || "",
      contractPumode: tradeLabel(row.contractPumode),
      camountRes: row.planSum,
      goodsAhnumRes: row.actualSum,
      contractInvcode: row.contractInvcode || "",
      packageFare: row.packageFare || ""
    };
  }

  function mapDetailExportRows(row) {
    ensureGoodsList(row);
    return row.goodsList.map(g => {
      const camount = Number(g.goodsCamount || 0);
      const sgCamount = Number(g.sgCamount || g.goodsCamount || 0);
      const ahweight = Number(g.goodsAhweight || 0);
      const topweight = Number(g.goodsTopweight || 0);
      const ahnum = Number(g.goodsAhnum || 0);
      return {
        memberBcode: row.memberBcode,
        contractNbillcode: g.contractNbillcode,
        goodsSpec1: g.goodsSpec1,
        contractBillcode: g.contractBillcode,
        skuNo: g.skuNo,
        goodsNo: g.goodsNo,
        skuName: g.skuName,
        goodsCweight: num(ahweight, 3),
        goodsAhnum: ahnum,
        contractGoodsPrice: num(g.contractGoodsPrice, 2),
        goodsTopweight1: num(topweight, 2),
        goodsCamount: camount,
        sgCamount: sgCamount,
        goodsAhweightStr: num(ahweight * camount, 3),
        sgGoodsAhweightSumStr: num(ahweight * sgCamount, 3),
        goodsCamount1: Math.round(ahnum * camount),
        goodsTopweightStr: num(topweight * camount, 2),
        sgGoodsTopweightSumStr: num(topweight * sgCamount, 2),
        contractGoodsMoney: num(g.contractGoodsMoney, 2),
        warehouseName: g.warehouseName,
        goodsSpec4: g.goodsSpec4,
        goodsSpec5: g.goodsSpec5,
        goodsProperty4: g.goodsProperty4,
        goodsSpec: g.goodsSpec,
        userinfoGoodsMaterial: g.userinfoGoodsMaterial,
        expressName: g.expressName,
        packageName: g.packageName,
        packageBillno: g.packageBillno,
        expressCode: g.expressCode
      };
    });
  }

  function mapRebateExportRows(row) {
    ensureGoodsList(row);
    const batchMap = {};
    row.goodsList.forEach(g => {
      const rebate = Number(g.rebateTotalPrice || 0);
      if (rebate <= 0) return;
      const batchNo = g.batchNo || "";
      if (!batchMap[batchNo]) {
        batchMap[batchNo] = { rebateTotal: 0, store: 0, sales: 0, afterSales: 0, other: 0 };
      }
      batchMap[batchNo].rebateTotal += rebate;
      batchMap[batchNo].store += rebate * 0.4;
      batchMap[batchNo].sales += rebate * 0.3;
      batchMap[batchNo].afterSales += rebate * 0.2;
      batchMap[batchNo].other += rebate * 0.1;
    });
    return Object.entries(batchMap).map(([batchNo, agg]) => ({
      memberBcode: row.memberBcode,
      memberBname: row.memberBname,
      sendgoodsCode: row.sendgoodsCode,
      batchNo,
      sendgoodsVaildate: formatDateTime(row.sendgoodsVaildate),
      pricesetCurrency: row.pricesetCurrency,
      rebateTotalPrice: num(agg.rebateTotal, 2),
      storeRebateTotalPrice: num(agg.store, 2),
      salesRebateTotalPrice: num(agg.sales, 2),
      afterSalesRebateTotalPrice: num(agg.afterSales, 2),
      otherRebateTotalPrice: num(agg.other, 2)
    }));
  }

  function mapBatchExportRows(row) {
    ensureGoodsList(row);
    return row.goodsList.map(g => ({
      sendgoodsCode: row.sendgoodsCode,
      contractBillcode: g.contractBillcode || row.contractBillcode || "",
      batchNo: g.batchNo || "",
      skuNo: g.skuNo || "",
      goodsNo: g.goodsNo || "",
      memberBcode: row.memberBcode,
      memberBname: row.memberBname,
      nboStoreCode: row.nboStoreCode || row.settlementEntity || "",
      dataStateStr: statusLabel(row),
      pricesetCurrency: row.pricesetCurrency,
      contractGoodsPrice: num(g.contractGoodsPrice, 2),
      goodsCamount: g.goodsCamount
    }));
  }

  function mapPackageExportRows(row) {
    ensureGoodsList(row);
    return row.goodsList.map((g, index) => {
      const packCabinetNo = g.expressName || g.packageRemark || row.packageRemark || row.expressName || "";
      const actualCabinetNo = g.packageBillno || row.packageBillno || "";
      const cabinetAndSeal = [actualCabinetNo, g.expressCode || row.expressCode].filter(Boolean).join("&") || "";
      const qty = Number(g.goodsCamount || 0);
      const actualQty = Number(g.sgCamount || g.goodsCamount || 0);
      const pkg = Number(g.goodsAhnum || 0);
      const unitCbm = Number(g.goodsAhweight || 0);
      const unitWeight = Number(g.goodsTopweight || 0);
      const unitPrice = Number(g.contractGoodsPrice || 0);
      const totalPkg = pkg * qty;
      const totalCbm = unitCbm * qty;
      const realCbm = unitCbm * actualQty;
      const totalAmount = Number(g.contractGoodsMoney || unitPrice * qty);
      const realAmount = unitPrice * actualQty;
      const midSku = g.goodsNo || g.skuNo || "";
      return {
        parentSkuNO: `${g.skuNo || ""}&${index + 1}`,
        parentSkuNum: index + 1,
        parentAndSkuNO: `${g.skuNo || ""}&${midSku}`,
        pcs: 1,
        contractNbillcode: g.goodsSpec1 || row.customerPo || g.contractNbillcode || "",
        packageSkuNo: `${g.skuNo || ""}-P01`,
        skuNo: g.skuNo || "",
        parentCATEGORY: g.customsCategory || g.skuName || "",
        goodsNo: g.goodsNo || "",
        skuName: g.skuName || "",
        goodsCamount: qty,
        goodsAhnum: pkg,
        totalGoodsAhnum: totalPkg,
        contractGoodsPrice: num(unitPrice, 2),
        totalContractGoodsPrice: num(totalAmount, 2),
        realContractGoodsPrice: num(realAmount, 2),
        cbm: num(unitCbm, 3),
        totalCbm: num(totalCbm, 3),
        realCbm: num(realCbm, 3),
        midSkuNo: midSku,
        midName: g.skuName || "",
        midSkuName: g.goodsSpec || "",
        midGoodsCamount: qty,
        fobPrice: num(unitPrice, 2),
        totalFobPrice: num(totalAmount, 2),
        pakageQua: pkg,
        totalPakageQua: totalPkg,
        realPackageQua: pkg * actualQty,
        midCbm: num(unitCbm, 3),
        midTotalCbm: num(totalCbm, 3),
        midRealCbm: num(realCbm, 3),
        midCategory: g.customsCategory || "",
        midProductMM: g.goodsSpec || "",
        packNumber: `${g.skuNo || ""}-PK01`,
        packSpec: g.goodsSpec || "",
        packNum: qty,
        netWeight: num(unitWeight * 0.9, 2),
        totalNetWeight: num(unitWeight * 0.9 * qty, 2),
        grossWeight: num(unitWeight, 2),
        totalGrossWeight: num(unitWeight * qty, 2),
        packProductMM: g.goodsSpec || "",
        memo: row.sendgoodsRemark || "",
        packCabinetNo,
        actualCabinetNo,
        cabinetAndSeal,
        bookingNo: g.bookingNo || row.bookingNo || ""
      };
    });
  }

  function escapeHtml(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function downloadExcel(fileName, headers, rows) {
    let html = '<html><head><meta charset="UTF-8"></head><body><table border="1">';
    html += "<tr>" + headers.map(h => `<th>${escapeHtml(h.showName)}</th>`).join("") + "</tr>";
    rows.forEach(row => {
      html += "<tr>" + headers.map(h => `<td>${escapeHtml(row[h.key || h.dataName])}</td>`).join("") + "</tr>";
    });
    html += "</table></body></html>";
    const blob = new Blob(["\uFEFF" + html], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  window.exportPackageExcel = function (sendgoodsCode) {
    const row = findRow(sendgoodsCode);
    if (!row) return showToast("未找到发运单");
    if (!canExportPackageExcel(row)) return;
    const rows = mapPackageExportRows(row);
    if (!rows.length) return showToast("暂无可导出装箱数据");
    const cfg = PACKAGE_EXPORT_CONFIG;
    const fileName = `${row.sendgoodsCode}_${cfg.fileName}`;
    downloadExcel(fileName, cfg.columns, rows);
    showToast(`已导出装箱单 ${rows.length} 行（${cfg.api} / ${cfg.template}）`);
  };

  window.handleExport = function (type) {
    document.getElementById("exportDropdown").classList.remove("open");
    const cfg = EXPORT_CONFIG[type];
    const source = currentList.length ? currentList : getFilteredList();
    if (!source.length) return showToast("暂无可导出数据");

    let rows = [];
    if (type === "list") {
      rows = source.map(mapListExportRow);
    } else if (type === "detail") {
      source.forEach(r => { rows = rows.concat(mapDetailExportRows(r)); });
    } else if (type === "rebate") {
      source.forEach(r => { rows = rows.concat(mapRebateExportRows(r)); });
    } else if (type === "batch") {
      source.forEach(r => { rows = rows.concat(mapBatchExportRows(r)); });
    }

    if (!rows.length) return showToast("暂无可导出数据");
    downloadExcel(cfg.fileName, cfg.columns, rows);
    showToast(`已导出 ${rows.length} 行（${cfg.api} / ${cfg.template}）`);
  };

  window.applyFilters = function () {
    pageNum = 1;
    const data = getFilteredList();
    renderTable(data);
    showToast(`查询完成，共 ${data.length} 条`);
  };

  window.resetFilters = function () {
    ["customerKeyword", "numberKeyword"].forEach(id => { document.getElementById(id).value = ""; });
    document.getElementById("shipmentStatus").value = "";
    document.getElementById("declareStatus").value = "";
    document.getElementById("customerField").value = "memberBname";
    document.getElementById("numberType").value = "sendgoodsCode";
    document.getElementById("dateType").value = "gmtCreate";
    document.getElementById("startDate").value = "2025-12-02";
    document.getElementById("endDate").value = "2026-06-02";
    pageNum = 1;
    refreshList();
    showToast("已重置筛选条件");
  };

  window.toggleExport = function (event) {
    if (event) event.stopPropagation();
    document.getElementById("exportDropdown").classList.toggle("open");
  };

  window.copyText = function (text) {
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    showToast(`已复制：${text}`);
  };

  window.showToast = function (message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  };

  document.getElementById("tableBody").addEventListener("click", event => {
    const actionBtn = event.target.closest("[data-action]");
    if (actionBtn) {
      handleAction(actionBtn.dataset.action, actionBtn.dataset.code);
      return;
    }
    const detailLink = event.target.closest("[data-detail]");
    if (detailLink) {
      const row = findRow(detailLink.dataset.detail);
      if (row) openDetail(row);
      return;
    }
    const copyBtn = event.target.closest("[data-copy]");
    if (copyBtn) copyText(copyBtn.dataset.copy);
    const adjustLink = event.target.closest("[data-adjust]");
    if (adjustLink) openChangePriceDialog(adjustLink.dataset.adjust);
  });

  document.getElementById("dialogBody").addEventListener("click", event => {
    const copyBtn = event.target.closest("[data-copy]");
    if (copyBtn) copyText(copyBtn.dataset.copy);
  });

  document.getElementById("pagePrev").onclick = () => {
    if (pageNum > 1) {
      pageNum -= 1;
      refreshList(false);
    }
  };

  document.getElementById("pageNext").onclick = () => {
    const totalPages = Math.max(1, Math.ceil(currentList.length / PAGE_SIZE));
    if (pageNum < totalPages) {
      pageNum += 1;
      refreshList(false);
    }
  };

  document.getElementById("pageInput").addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    const totalPages = Math.max(1, Math.ceil(currentList.length / PAGE_SIZE));
    const value = Number(event.target.value);
    if (value >= 1 && value <= totalPages) {
      pageNum = value;
      refreshList(false);
    }
  });

  window.toggleConfirmBatchDropdown = function (event) {
    if (event) event.stopPropagation();
    document.getElementById("confirmBatchDropdown")?.classList.toggle("open");
  };

  document.addEventListener("click", event => {
    if (!event.target.closest("#exportDropdown")) {
      document.getElementById("exportDropdown").classList.remove("open");
    }
    if (!event.target.closest("#confirmBatchDropdown")) {
      document.getElementById("confirmBatchDropdown")?.classList.remove("open");
    }
    if (event.target.id === "dialogMask") closeDialog();
    if (event.target.id === "confirmImportMask") closeConfirmImportModal();
    if (event.target.id === "confirmUnarrangedMask") closeConfirmUnarrangedModal();
  });

  document.querySelectorAll(".sidebar .menu-item[data-page]").forEach(item => {
    item.addEventListener("click", () => {
      const page = item.dataset.page;
      if (page === "customs") {
        document.getElementById("customsSearchNo").value = "";
        document.getElementById("customsSearchShipment").value = "";
        window._customsHighlightCode = "";
      }
      switchMainPage(page);
    });
  });

  function formatDateTime(date) {
    const pad = n => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  /** 展示 demo 最新更新时间（优先 DEMO_UPDATED_AT） */
  function initDemoUpdateBanner() {
    const timeEl = document.getElementById("demoUpdateTime");
    if (!timeEl) return;

    const meta = document.querySelector('meta[name="demo-updated-at"]');
    const metaTime = meta && meta.getAttribute("content");
    const builtIn = typeof DEMO_UPDATED_AT === "string" ? DEMO_UPDATED_AT.trim() : "";

    if (builtIn) {
      timeEl.textContent = builtIn;
      return;
    }
    if (metaTime) {
      timeEl.textContent = metaTime.trim();
      return;
    }
    if (document.lastModified) {
      const fallback = new Date(document.lastModified);
      if (!Number.isNaN(fallback.getTime())) {
        timeEl.textContent = formatDateTime(fallback);
        return;
      }
    }
    timeEl.textContent = "—";
  }

  initData();
  bindMainTabEvents();
  refreshList();
  initDemoUpdateBanner();
})();
