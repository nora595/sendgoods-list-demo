(function (global) {
  const CNY_RATE = 7.25;

  const I18N = {
    en: {
      hi: 'Hi, Linsytest',
      serviceCall: 'Service call',
      serviceEmail: 'Service email',
      guide: 'Guide',
      search: 'search',
      navHome: 'Home',
      navProducts: 'Products',
      navWishlist: 'Wishlist',
      navPO: 'PO',
      navAccount: 'Account',
      contactUs: 'Contact Us',
      aboutLinsy: 'About LINSY',
      investCoop: 'Investment Cooperation',
      serviceSupport: 'Service Support',
      legal: 'Legal',
      featuredCategories: 'Featured Categories',
      bestsellers: 'Bestsellers',
      viewAll: 'View All →',
      shopNow: 'Shop Now',
      vrShowroom: 'VR Showroom',
      vrDesc: 'Experience LINSY collections in immersive 3D',
      explore: 'Explore',
      newArrivals: 'New Arrivals',
      newArrivalsDesc: 'Latest designs with 7-day estimated delivery',
      browse: 'Browse',
      filters: 'Filters',
      label: 'Label',
      price: 'Price',
      moq: 'MOQ',
      deliveryTime: 'Delivery Time',
      productMaterial: 'Product Material',
      productSize: 'Product Size',
      any: 'Any',
      listingDate: 'Listing Date',
      sales: 'Sales',
      hideFilters: 'Hide Filters',
      showFilters: 'Show Filters',
      estDel: 'Est. Del',
      pcs: 'pcs',
      item: 'Item',
      stock: 'Stock',
      custom: 'Custom',
      variations: 'Variations',
      listMode: 'List Mode',
      color: 'Color',
      size: 'Size',
      material: 'Material',
      qty: 'Qty',
      addToWishlist: '+ add to wishlist',
      description: 'Description',
      sizeChart: 'Size Chart',
      installation: 'Installation',
      recommend: 'Recommend',
      overview: 'Overview',
      sellingPoints: 'Product Selling Points',
      sameSeries: 'Same Series',
      sameCategory: 'Same Category',
      status: 'Status',
      active: 'Active',
      installTime: 'Estimated Installation Time',
      deliveryDate: 'Delivery Date',
      selected: 'Selected',
      items: 'Items',
      totalAmount: 'Total Amount',
      delete: 'Delete',
      inquiry: 'Inquiry',
      clearInvalid: 'Clear Invalid',
      addItem: 'Add Item',
      import: 'Import',
      export: 'Export',
      specification: 'Specification',
      opt: 'Opt',
      remark: 'Remark',
      reply: 'Reply',
      orderDetails: 'Order Details',
      totalQty: 'Total Qty',
      totalVol: 'Total Vol',
      currency: 'Currency',
      discount: 'Discount',
      payable: 'Payable',
      buyNow: 'Buy Now',
      systemReminder: 'System Reminder',
      exceptionWarn: 'Your wishlist contains discontinued or invalid items. Please handle them before placing order.',
      recommended: 'Recommended For You',
      cancel: 'Cancel',
      confirm: 'Confirm',
      poList: 'PO List',
      dispatchList: 'Dispatch Note List',
      paymentOrder: 'Payment Order',
      searchBtn: 'Search',
      view: 'View',
      copy: 'Copy',
      invalid: 'Invalid',
      paymentRecord: 'Payment Record',
      collectPay: 'Collect Pay',
      batchRefund: 'Batch Refund',
      priceDetails: 'Price Details',
      paymentRecords: 'Payment Records',
      close: 'Close',
      paid: 'Paid',
      unpaid: 'Unpaid',
      personalCenter: 'Personal Center',
      accountInfo: 'Account Info',
      subAccount: 'Sub Account',
      myOrder: 'My Order',
      poOrder: 'PO Order',
      dispatchNote: 'Dispatch Note',
      paymentOrderMenu: 'Payment Order',
      myReport: 'My Report',
      myFavorite: 'My Favorite',
      toastFavOn: 'Added to favorites',
      toastFavOff: 'Removed from favorites',
      toastWishlist: 'Added to wishlist',
      toastBatchWishlist: 'Batch added to wishlist',
      toastDeleted: 'Deleted',
      toastClearInvalid: 'Invalid items cleared',
      toastOrderCreated: 'Purchase order created',
      toastCollectPay: 'Payment collection started',
      current: 'Current',
      pendingDisco: 'Pending Disco',
      disco: 'Disco',
      confirming: 'Confirming',
      waitShip: 'Wait Ship',
      waitReceive: 'Wait Receive',
      complete: 'Complete',
      closed: 'Closed',
      draft: 'Draft',
      inTransit: 'In Transit',
      pendingShipment: 'Pending Shipment',
      overviewDesc: 'Modern furniture piece featuring solid wood frame with premium finish. Suitable for residential and commercial projects worldwide.',
      point1: 'Ergonomic design with premium materials',
      point2: 'Easy assembly within {time}',
      point3: 'Multiple color and material options',
      more: 'more...',
      attr: 'Attr',
      standardAmount: 'Standard Amount',
      discountAmount: 'Discount Amount',
      adjustAmount: 'Adjust Amount',
      rebateAmount: 'Rebate Amount',
      freight: 'Freight',
      insuranceFee: 'Insurance Fee',
      payableAmount: 'Payable Amount',
      paidAmount: 'Paid Amount',
      unpaidAmount: 'Unpaid Amount',
      dueAmt: 'Due Amt',
      paidAmt: 'Paid Amt',
      unpaidAmt: 'Unpaid Amt',
      cutoffAmt: 'Cutoff Amt',
      dueDate: 'Due Date',
      remDays: 'Rem Days',
      payType: 'Pay Type',
      relOrder: 'Rel Order',
      createTime: 'Create Time',
      creatingDate: 'Creating date',
      tradeTerm: 'Trade Term',
      preparing: 'Preparing',
      confirmed: 'Confirmed',
      pending: 'Pending',
      noData: 'No data found',
      materialDesc: 'Premium solid wood frame with eco-friendly finish. Fabric meets commercial-grade durability standards.',
      materialTitle: 'Material Details',
      installationTitle: 'Installation Guide',
      installStep1: 'Unpack all parts and verify against the packing list.',
      installStep2: 'Assemble the frame according to the illustrated steps.',
      installStep3: 'Secure all fasteners and inspect stability before use.',
      recommendDesc: 'You may also like the following products from the same series or category.',
    },
    zh: {
      hi: '您好，Linsytest',
      serviceCall: '客服电话',
      serviceEmail: '客服邮箱',
      guide: '指南',
      search: '搜索',
      navHome: '首页',
      navProducts: '商品',
      navWishlist: '意向清单',
      navPO: '采购单',
      navAccount: '账户',
      contactUs: '联系我们',
      aboutLinsy: '关于林氏',
      investCoop: '招商合作',
      serviceSupport: '服务支持',
      legal: '法律条款',
      featuredCategories: '精选分类',
      bestsellers: '畅销商品',
      viewAll: '查看全部 →',
      shopNow: '立即选购',
      vrShowroom: 'VR 展厅',
      vrDesc: '沉浸式 3D 体验林氏家居全系列',
      explore: '进入展厅',
      newArrivals: '新品上市',
      newArrivalsDesc: '最新设计，预计 7 天交期',
      browse: '浏览新品',
      filters: '筛选',
      label: '标签',
      price: '价格',
      moq: '起订量',
      deliveryTime: '交期',
      productMaterial: '材质',
      productSize: '尺寸',
      any: '不限',
      listingDate: '上架时间',
      sales: '销量',
      hideFilters: '收起筛选',
      showFilters: '展开筛选',
      estDel: '预计交期',
      pcs: '件',
      item: '商品编码',
      stock: '现货',
      custom: '定制',
      variations: '规格选择',
      listMode: '列表模式',
      color: '颜色',
      size: '尺寸',
      material: '材质',
      qty: '数量',
      addToWishlist: '+ 加入意向清单',
      description: '商品描述',
      sizeChart: '尺寸图',
      installation: '安装说明',
      recommend: '推荐',
      overview: '概述',
      sellingPoints: '产品卖点',
      sameSeries: '同系列推荐',
      sameCategory: '同类推荐',
      status: '状态',
      active: '在售',
      installTime: '预计安装时长',
      deliveryDate: '交期',
      selected: '已选',
      items: '项',
      totalAmount: '总金额',
      delete: '删除',
      inquiry: '询价',
      clearInvalid: '清除失效',
      addItem: '添加商品',
      import: '导入',
      export: '导出',
      specification: '规格',
      opt: '操作',
      remark: '备注',
      reply: '回复',
      orderDetails: '订单汇总',
      totalQty: '总数量',
      totalVol: '总体积',
      currency: '币种',
      discount: '优惠',
      payable: '应付金额',
      buyNow: '立即下单',
      systemReminder: '系统提醒',
      exceptionWarn: '意向清单中存在停产或失效商品，请先处理后再下单。',
      recommended: '为您推荐',
      cancel: '取消',
      confirm: '确定',
      poList: '采购单列表',
      dispatchList: '发运单列表',
      paymentOrder: '付款单',
      searchBtn: '查询',
      view: '查看',
      copy: '复制',
      invalid: '作废',
      paymentRecord: '付款记录',
      collectPay: '收款',
      batchRefund: '批量退款',
      priceDetails: '金额明细',
      paymentRecords: '付款记录',
      close: '关闭',
      paid: '已付款',
      unpaid: '待付款',
      personalCenter: '个人中心',
      accountInfo: '账户信息',
      subAccount: '子账号',
      myOrder: '我的订单',
      poOrder: '采购单',
      dispatchNote: '发运单',
      paymentOrderMenu: '付款单',
      myReport: '我的报表',
      myFavorite: '我的收藏',
      toastFavOn: '已加入收藏',
      toastFavOff: '已取消收藏',
      toastWishlist: '已加入意向清单',
      toastBatchWishlist: '已批量加入意向清单',
      toastDeleted: '已删除',
      toastClearInvalid: '已清除失效商品',
      toastOrderCreated: '采购订单已生成',
      toastCollectPay: '已进入收款流程',
      current: '正常',
      pendingDisco: '预停产',
      disco: '已停产',
      confirming: '待确认',
      waitShip: '待发运',
      waitReceive: '待收货',
      complete: '已完成',
      closed: '已关闭',
      draft: '草稿',
      inTransit: '运输中',
      pendingShipment: '待发货',
      overviewDesc: '现代家具，采用优质实木框架与精工饰面，适用于住宅及商业工程项目。',
      point1: '人体工学设计，优质材料',
      point2: '约 {time} 即可完成安装',
      point3: '多种颜色与材质可选',
      more: '更多...',
      attr: '属性',
      standardAmount: '标准金额',
      discountAmount: '折扣金额',
      adjustAmount: '调整金额',
      rebateAmount: '返利金额',
      freight: '运费',
      insuranceFee: '保险费',
      payableAmount: '应付金额',
      paidAmount: '已付金额',
      unpaidAmount: '未付金额',
      dueAmt: '应付金额',
      paidAmt: '已付金额',
      unpaidAmt: '未付金额',
      cutoffAmt: '截止金额',
      dueDate: '到期日',
      remDays: '剩余天数',
      payType: '付款方式',
      relOrder: '关联单号',
      createTime: '创建时间',
      creatingDate: '创建日期',
      tradeTerm: '贸易条款',
      preparing: '备货中',
      confirmed: '已确认',
      pending: '待处理',
      noData: '暂无数据',
      materialDesc: '优质实木框架，环保饰面工艺，面料满足商用级耐用标准。',
      materialTitle: '材质说明',
      installationTitle: '安装说明',
      installStep1: '拆开包装，按装箱单核对全部配件。',
      installStep2: '按图示步骤组装框架结构。',
      installStep3: '紧固所有连接件，使用前检查稳固性。',
      recommendDesc: '您可能还喜欢以下同系列或同类商品。',
    },
  };

  const CATEGORY_LABELS = {
    all: { en: 'All Categories', zh: '全部分类' },
    new: { en: 'New Arrivals', zh: '新品上市' },
    best: { en: 'Bestsellers', zh: '畅销爆款' },
    living: { en: 'Linsy Living', zh: '林氏生活' },
    kids: { en: 'Kids Furniture', zh: '儿童家具' },
    inspire: { en: 'Inspire Series', zh: '灵感系列' },
    livingroom: { en: 'Living Room', zh: '客厅' },
    dining: { en: 'Dining Room', zh: '餐厅' },
    bedroom: { en: 'Bedroom', zh: '卧室' },
    study: { en: 'Study', zh: '书房' },
  };

  const PRODUCT_NAMES = {
    en: [
      'Oxygen Wood Grain Sintered Stone Dining Table',
      'Purus Wood Color Dining Chair (Set of 2)',
      'Nordic Fabric Accent Sofa 3-Seater',
      'Minimalist Oak Bed Frame Queen Size',
      'Scandinavian Round Coffee Table',
      'Kids Cloud Bunk Bed with Storage',
      'Modern LED TV Console Cabinet',
      'Velvet Upholstered Dining Bench',
      'Extendable Walnut Dining Table',
      'Linen Sectional Sofa with Chaise',
    ],
    zh: [
      '氧气木纹岩板餐桌',
      'Purus 木色餐椅（两把装）',
      '北欧布艺三人沙发',
      '极简橡木大床架',
      '北欧圆形茶几',
      '儿童云朵双层床（带储物）',
      '现代 LED 电视柜',
      '丝绒软包餐凳',
      '可伸缩胡桃木餐桌',
      '亚麻转角沙发',
    ],
  };

  const BANNER_TEXT = [
    { title: { en: 'Linsy Living Collection', zh: '林氏生活系列' }, sub: { en: 'Modern furniture solutions for global distributors', zh: '为全球经销商提供现代家居解决方案' } },
    { title: { en: 'New Arrivals 2026', zh: '2026 新品上市' }, sub: { en: 'Explore bestselling dining & bedroom series', zh: '探索畅销餐厅与卧室系列' } },
    { title: { en: 'Stock Ready · 7-Day Delivery', zh: '现货供应 · 7 天交期' }, sub: { en: 'Bulk order with MOQ from 5 pcs', zh: '最低 5 件起订，支持批量采购' } },
    { title: { en: 'Inspire Series', zh: '灵感系列' }, sub: { en: 'Premium upholstery for residential projects', zh: '高端软体，适配住宅工程项目' } },
  ];

  function getLocale(state) {
    return state.locale === 'zh' ? 'zh' : 'en';
  }

  function t(state, key, vars) {
    const loc = getLocale(state);
    let text = I18N[loc][key] ?? I18N.en[key] ?? key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        text = text.replace(`{${k}}`, vars[k]);
      });
    }
    return text;
  }

  function catName(state, id) {
    return CATEGORY_LABELS[id]?.[getLocale(state)] ?? id;
  }

  function productName(state, index) {
    const loc = getLocale(state);
    return PRODUCT_NAMES[loc][index % PRODUCT_NAMES[loc].length];
  }

  function bannerText(state, index, field) {
    return BANNER_TEXT[index]?.[field]?.[getLocale(state)] ?? '';
  }

  function statusText(state, status) {
    const map = {
      Active: 'active',
      Current: 'current',
      Invalid: 'invalid',
      'Pending Disco': 'pendingDisco',
      Disco: 'disco',
      'Pending Shipment': 'pendingShipment',
      Confirming: 'confirming',
      Unpaid: 'unpaid',
      Paid: 'paid',
      'Wait Ship': 'waitShip',
      Complete: 'complete',
      Closed: 'closed',
      Draft: 'draft',
      'In Transit': 'inTransit',
      Preparing: 'preparing',
      Confirmed: 'confirmed',
      Pending: 'pending',
    };
    const key = map[status];
    return key ? t(state, key) : status;
  }

  function convertAmount(state, usd) {
    return state.currency === 'CNY' ? usd * CNY_RATE : usd;
  }

  function money(state, usd, short) {
    const amount = convertAmount(state, usd);
    if (state.currency === 'CNY') {
      return short ? `¥ ${amount.toFixed(2)}` : `¥ ${amount.toFixed(2)} CNY`;
    }
    return short ? `$ ${amount.toFixed(2)}` : `$ ${amount.toFixed(2)} USD`;
  }

  function currencyCode(state) {
    return state.currency;
  }

  function langLabel(state) {
    return state.locale === 'zh' ? '中文' : 'English';
  }

  function renderTopbarSwitchers(state) {
    const langOpen = state.openDropdown === 'lang';
    const curOpen = state.openDropdown === 'currency';
    return `
      <div class="topbar-tools">
        <div class="switch-wrap">
          <button class="switch-btn" data-toggle-dropdown="lang">${langLabel(state)} ▾</button>
          <div class="switch-menu ${langOpen ? 'open' : ''}">
            <button class="switch-option ${state.locale === 'en' ? 'active' : ''}" data-set-locale="en">English</button>
            <button class="switch-option ${state.locale === 'zh' ? 'active' : ''}" data-set-locale="zh">中文</button>
          </div>
        </div>
        <span class="sep">|</span>
        <div class="switch-wrap">
          <button class="switch-btn" data-toggle-dropdown="currency">${state.currency} ▾</button>
          <div class="switch-menu ${curOpen ? 'open' : ''}">
            <button class="switch-option ${state.currency === 'USD' ? 'active' : ''}" data-set-currency="USD">USD</button>
            <button class="switch-option ${state.currency === 'CNY' ? 'active' : ''}" data-set-currency="CNY">CNY</button>
          </div>
        </div>
        <span class="sep">|</span>
        <span class="guide">📖 ${t(state, 'guide')}</span>
      </div>
    `;
  }

  function loadPrefs(state) {
    try {
      const loc = localStorage.getItem('mall_locale');
      const cur = localStorage.getItem('mall_currency');
      if (loc === 'en' || loc === 'zh') state.locale = loc;
      if (cur === 'USD' || cur === 'CNY') state.currency = cur;
    } catch (e) { /* ignore */ }
  }

  function savePrefs(state) {
    try {
      localStorage.setItem('mall_locale', state.locale);
      localStorage.setItem('mall_currency', state.currency);
    } catch (e) { /* ignore */ }
  }

  global.MallI18n = {
    CNY_RATE,
    t,
    catName,
    productName,
    bannerText,
    statusText,
    convertAmount,
    money,
    currencyCode,
    langLabel,
    renderTopbarSwitchers,
    loadPrefs,
    savePrefs,
  };
})(window);
