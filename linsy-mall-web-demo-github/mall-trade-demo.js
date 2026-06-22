(function () {
  const DEFAULT_EMPTY_IMG = 'https://www.linsydirect.com/paas/b2b-cli-pc/static/img/img_default.d0c2369.jpg';
  const DETAIL_TABS = ['description', 'sizeChart', 'material', 'installation', 'recommend'];

  const FURNITURE_IMAGES = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1617806117938-529d34949e8f?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1617103996701-966ffc08c9b0?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=480&h=480&fit=crop',
  ];

  const HOME_BANNERS = [
    {
      img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&h=480&fit=crop',
      title: 'Linsy Living Collection',
      sub: 'Modern furniture solutions for global distributors',
      link: 'products',
    },
    {
      img: 'https://images.unsplash.com/photo-1617806117938-529d34949e8f?w=1400&h=480&fit=crop',
      title: 'New Arrivals 2026',
      sub: 'Explore bestselling dining & bedroom series',
      link: 'products',
    },
    {
      img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&h=480&fit=crop',
      title: 'Stock Ready · 7-Day Delivery',
      sub: 'Bulk order with MOQ from 5 pcs',
      link: 'wishlist',
    },
    {
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&h=480&fit=crop',
      title: 'Inspire Series',
      sub: 'Premium upholstery for residential projects',
      link: 'products',
    },
  ];

  const PRODUCT_NAMES = [
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
  ];

  const CATEGORIES = [
    { id: 'all', name: 'All Categories', img: FURNITURE_IMAGES[0] },
    { id: 'new', name: 'New Arrivals', img: FURNITURE_IMAGES[1] },
    { id: 'best', name: 'Bestsellers', img: FURNITURE_IMAGES[2] },
    { id: 'living', name: 'Linsy Living', img: FURNITURE_IMAGES[3] },
    { id: 'kids', name: 'Kids Furniture', img: FURNITURE_IMAGES[5] },
    { id: 'inspire', name: 'Inspire Series', img: FURNITURE_IMAGES[4] },
    { id: 'livingroom', name: 'Living Room', img: FURNITURE_IMAGES[6] },
    { id: 'dining', name: 'Dining Room', img: FURNITURE_IMAGES[7] },
    { id: 'bedroom', name: 'Bedroom', img: FURNITURE_IMAGES[8] },
    { id: 'study', name: 'Study', img: FURNITURE_IMAGES[9] },
  ];

  const DETAIL_PRODUCT_DATA = {
    displayName: 'Purus Wood Color + White Dining Chair (Set of 2)',
    goodsName: 'Purus Wood Color + White Dining Chair (Set of 2)',
    item: 'LS387S7-LSC23YZ007597',
    goodsNo: 'LS387S7',
    skuNo: 'LSC23YZ007597',
    price: 78.56,
    strikePrice: 98.00,
    estDel: '7d',
    moq: 5,
    customMoq: 50,
    stock: 1000,
    tag: 'Bestsellers',
    status: 'Active',
    statusCode: 'onSale',
    countsLimit: 0,
    preStopProd: 1,
    category: 'dining',
    images: 12,
    image: FURNITURE_IMAGES[0],
    gallery: [
      FURNITURE_IMAGES[0],
      FURNITURE_IMAGES[1],
      FURNITURE_IMAGES[2],
      FURNITURE_IMAGES[3],
      FURNITURE_IMAGES[4],
      FURNITURE_IMAGES[5],
    ],
    lifestyleGallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=760&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=760&fit=crop',
      'https://images.unsplash.com/photo-1617806117938-529d34949e8f?w=1200&h=760&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=760&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=760&fit=crop',
    ],
    favorited: true,
    colors: [
      { label: 'Vintage + Black', img: FURNITURE_IMAGES[0] },
      { label: 'Vintage + Green', img: FURNITURE_IMAGES[3] },
      { label: 'Vintage + Soft Yarn', img: FURNITURE_IMAGES[5] },
      { label: 'Other', img: FURNITURE_IMAGES[7] },
    ],
    sizes: ['2.37m', '2.72m', '3.02m'],
    materials: ['Oak', 'Black Walnut'],
    otherAttrs: ['LS-C001-BK-180 (黑 + 180cm)'],
    dim: '1023mm(L) × 366mm(W) × 1098mm(H)',
    cbm: '0.154m³',
    gw: '46.3kg',
    goodsOneweight: '46.3kg',
    goodsProperty3: 'To be advised',
    pricesetCurrency: 'USD',
    pricesetCurrency1: 'CNY',
    skuName: 'Vintage + Black / 2.37m / Oak',
    skuRemark: 'length1:1023mm, width1:366mm, height1:1098mm',
    installTime: '40 minutes',
    deliveryDate: '7 days',
    tradeNote: 'Stock item ready for mixed container procurement',
    tabsData: {
      description: {
        overview: 'This upgraded detail page is designed around SKU-level trading information so overseas distributors can complete selection, evaluate delivery support and add items to wishlist faster.',
        sellingPoints: [
          'Unified hero area for gallery, status, price, delivery support and MOQ.',
          'Supports stock and custom purchase logic with different MOQ display.',
          'Provides list mode for bulk SKU selection and rapid wishlist accumulation.',
          'Structured tabs separate material, size chart and installation guidance for desktop and H5 consistency.',
        ],
        attributes: [
          ['Brand', 'LINSY'],
          ['Style', 'LINSY'],
          ['Unit', 'Set'],
          ['Series', 'Purus Dining'],
          ['Cat.', 'Dining Room'],
          ['Model', 'LS387S7'],
          ['Item', 'LS387S7-LSC23YZ007597'],
          ['Goods Type', 'Stock Furniture'],
          ['Color', 'Vintage + Black'],
          ['Grade Type', 'Standard'],
          ['For', 'Indoor / Distribution'],
          ['Status', 'Active'],
          ['Delivery Support', 'To be advised'],
          ['Currency', 'USD'],
          ['MOQ', '5 pcs'],
          ['Est. Del', '7 days'],
        ],
        longImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&h=900&fit=crop',
      },
      sizeChart: {
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=760&fit=crop',
        note: 'Size chart module focuses on packaged size and distribution-friendly data reading.',
      },
      material: {
        text: 'Material content is structured to clarify core material, finish and export attribute explanation instead of relying only on long images.',
        cards: [
          { title: 'Main Material', value: 'Oak / Black Walnut' },
          { title: 'Surface Finish', value: 'Wood color + white upholstery' },
          { title: 'Support Logic', value: 'SKU-level DIM / CBM / G.W. structured display' },
        ],
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=760&fit=crop',
      },
      installation: {
        steps: [
          'Unpack the chair set and verify all hardware against the packing list.',
          'Assemble the seat base and tighten screws in sequence to ensure stability.',
          'Confirm finish, upholstery and wobble tolerance before shipment or retail dispatch.',
        ],
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&h=760&fit=crop',
      },
    },
    specRows: [
      { id: 'sku1', item: 'G064-A-LSC25SF047688', image: FURNITURE_IMAGES[0], color: 'Vintage + Black', size: '2.37m', material: 'Oak', price: 450.00, estDel: '7days', stock: 1000, moq: 5, qty: 9999, checked: true, dim: 'DIM: 1023mm(L)*366mm(W)*1098mm(H)', cbm: 'CBM: 0.154m³', gw: 'G.W.: 46.3kg', code: 'Current' },
      { id: 'sku2', item: 'G064-A-LSC25SF047689', image: FURNITURE_IMAGES[1], color: 'Vintage + Black', size: '2.37m', material: 'Black Walnut', price: 1450.00, estDel: '7days', stock: 1000, moq: 5, qty: 0, checked: false, dim: 'DIM: 1023mm(L)*366mm(W)*1098mm(H)', cbm: 'CBM: 0.154m³', gw: 'G.W.: 46.3kg', code: 'Current' },
      { id: 'sku3', item: 'G064-A-LSC25SF047690', image: FURNITURE_IMAGES[2], color: 'Vintage + Black', size: '2.72m', material: 'Oak', price: 45000.00, estDel: '7days', stock: 1000, moq: 5, qty: 0, checked: false, dim: 'DIM: 1023mm(L)*366mm(W)*1098mm(H)', cbm: 'CBM: 0.154m³', gw: 'G.W.: 46.3kg', code: 'Current' },
      { id: 'sku4', item: 'G064-A-LSC25SF047691', image: FURNITURE_IMAGES[3], color: 'Vintage + Green', size: '2.37m', material: 'Oak', price: 450.00, estDel: '7days', stock: 1000, moq: 5, qty: 0, checked: false, dim: 'DIM: 1023mm(L)*366mm(W)*1098mm(H)', cbm: 'CBM: 0.154m³', gw: 'G.W.: 46.3kg', code: 'Current' },
      { id: 'sku5', item: 'G064-A-LSC25SF047692', image: FURNITURE_IMAGES[4], color: 'Vintage + Green', size: '2.72m', material: 'Black Walnut', price: 450.00, estDel: '7days', stock: 1000, moq: 5, qty: 0, checked: false, dim: 'DIM: 1023mm(L)*366mm(W)*1098mm(H)', cbm: 'CBM: 0.154m³', gw: 'G.W.: 46.3kg', code: 'Current' },
      { id: 'sku6', item: 'G064-A-LSC25SF047693', image: FURNITURE_IMAGES[5], color: 'Vintage + Soft Yarn', size: '3.02m', material: 'Oak', price: 450.00, estDel: '7days', stock: 1000, moq: 5, qty: 0, checked: false, dim: 'DIM: 1023mm(L)*366mm(W)*1098mm(H)', cbm: 'CBM: 0.154m³', gw: 'G.W.: 46.3kg', code: 'Current' },
    ],
  };

  const PRODUCTS = Array.from({ length: 20 }, (_, i) => {
    const imgIdx = i % FURNITURE_IMAGES.length;
    return {
      id: `p${i + 1}`,
      nameIndex: i % 10,
      item: `LSC25ZH07589${i}`,
      price: 78.56 + i * 2.3,
      estDel: '7d',
      moq: 5,
      stock: 1000,
      tag: i % 3 === 0 ? 'Bestsellers' : '',
      status: 'Active',
      category: ['living', 'dining', 'bedroom'][i % 3],
      images: 12,
      image: FURNITURE_IMAGES[imgIdx],
      gallery: [
        FURNITURE_IMAGES[imgIdx],
        FURNITURE_IMAGES[(imgIdx + 1) % FURNITURE_IMAGES.length],
        FURNITURE_IMAGES[(imgIdx + 2) % FURNITURE_IMAGES.length],
        FURNITURE_IMAGES[(imgIdx + 3) % FURNITURE_IMAGES.length],
        FURNITURE_IMAGES[(imgIdx + 4) % FURNITURE_IMAGES.length],
      ],
      favorited: i % 5 === 0,
      colors: ['Vintage + Black', 'Vintage + Green', 'Vintage + Cream White'],
      sizes: ['2.37ft', '2.72ft', '3.02ft'],
      materials: ['Oak', 'Black Walnut'],
      dim: '47.24" x 27.56" x 29.53"',
      cbm: '0.31m³',
      gw: '45.2kg',
      installTime: '40 mins',
      deliveryDate: '7 days',
    };
  });

  Object.assign(PRODUCTS[0], DETAIL_PRODUCT_DATA);

  const LIST_MODE_ROWS = Array.from({ length: 12 }, (_, i) => ({
    id: `sku${i + 1}`,
    item: `G064-A-LSC25SF04768${i}`,
    image: FURNITURE_IMAGES[i % FURNITURE_IMAGES.length],
    color: ['Vintage + Black', 'Vintage + Green', 'Vintage + Soft Yarn', 'Vintage + Cream White'][i % 4],
    size: ['2.37m', '2.72m', '3.02m'][i % 3],
    material: i % 2 === 0 ? 'Oak' : 'Black Walnut',
    price: [450, 1450, 780, 920][i % 4],
    estDel: '7days',
    stock: 1000,
    moq: 5,
    qty: i === 0 ? 10 : 0,
    checked: i === 0,
    dim: '47.24" x 27.56"',
    cbm: '0.31m³',
    gw: '45.2kg',
  }));

  const WISHLIST = [
    { id: 'w1', item: 'G064-A-LSC255F047688', image: FURNITURE_IMAGES[0], spec: { col: 'Vintage + Black', sz: '2.37m', mat: 'Oak' }, up: 358.08, qty: 10, moq: 5, stock: 1000, estDel: '7days', status: 'Current', remark: 'Please ship together with PO-20260411', reply: 'Noted, we will arrange consolidated shipment.' },
    { id: 'w2', item: 'G064-A-LSC255F047689', image: FURNITURE_IMAGES[2], spec: { col: 'Vintage + Green', sz: '2.72m', mat: 'Oak' }, up: 420.5, qty: 8, moq: 5, stock: 800, estDel: '7days', status: 'Current', remark: '', reply: '' },
    { id: 'w3', item: 'G064-A-LSC255F047690', image: FURNITURE_IMAGES[4], spec: { col: 'Vintage + Cream White', sz: '3.02m', mat: 'Black Walnut' }, up: 512.0, qty: 5, moq: 5, stock: 500, estDel: '15days', status: 'Current', remark: '', reply: '' },
    { id: 'w4', item: 'G064-A-LSC255F047691', image: FURNITURE_IMAGES[6], spec: { col: 'Vintage + Soft Yarn', sz: '2.37m', mat: 'Oak' }, up: 298.0, qty: 12, moq: 5, stock: 1200, estDel: '7days', status: 'Invalid', remark: '', reply: '' },
    { id: 'w5', item: 'G064-A-LSC255F047692', image: FURNITURE_IMAGES[8], spec: { col: 'Vintage + Black', sz: '2.72m', mat: 'Black Walnut' }, up: 680.0, qty: 6, moq: 5, stock: 300, estDel: '7days', status: 'Pending Disco', remark: '', reply: '' },
  ];

  const PO_LIST = Array.from({ length: 8 }, (_, i) => ({
    poNo: `PO26041100${100 + i}`,
    cpoNo: `CPO-2026-${1000 + i}`,
    status: ['Pending Shipment', 'Confirming', 'Unpaid', 'Wait Ship'][i % 4],
    currency: 'USD',
    created: '04/11/2026',
    qty: 58 + i * 3,
    amount: 2563.0 + i * 120,
    remarks: i % 2 === 0 ? 'Urgent' : '',
    tradeTerm: 'FOB',
  }));

  const DISPATCH_LIST = Array.from({ length: 10 }, (_, i) => ({
    no: i + 1,
    dispatchNo: `FYD26041102427${i}`,
    status: 'Pending Shipment',
    lsPiNo: `L2604113613${i}`,
    custPoNo: `CPO-2026-${1000 + i}`,
    entry1: `ENT-${2000 + i}`,
    entry2: `ENT-${3000 + i}`,
    planQty: '58Pcs/58Pcs',
    planDate: '04/11/2026',
    actualDate: i % 3 === 0 ? '04/12/2026' : '-',
  }));

  const PAYMENT_LIST = Array.from({ length: 8 }, (_, i) => ({
    payNo: `FKD2604112391${i}`,
    status: i % 3 === 0 ? 'Paid' : 'Unpaid',
    dueAmt: 365.58 + i * 50,
    paidAmt: i % 3 === 0 ? 365.58 + i * 50 : 65.58,
    unpaidAmt: i % 3 === 0 ? 0 : 300.0 + i * 50,
    cutoffAmt: 365.58 + i * 50,
    dueDate: '05/30/2026',
    remDays: '30day',
    payType: 'TT',
    relOrder: `PO26041100${100 + i}`,
    createTime: '04/11/2026',
    standardAmt: 320.0 + i * 40,
    discountAmt: 20.0,
    adjustAmt: 0,
    rebateAmt: 15.0,
    freight: 35.58,
    insurance: 5.0,
    payableAmt: 365.58 + i * 50,
    paidRecord: 65.58,
  }));

  const state = {
    route: 'index',
    routeParam: null,
    category: 'all',
    showFilter: true,
    sort: 'sales',
    page: 2,
    homeSlide: 0,
    detailThumb: 0,
    lifestyleSlide: 0,
    wishlist: WISHLIST.map((w) => ({ ...w, selected: w.status === 'Current' })),
    favorites: new Set(PRODUCTS.filter((p) => p.favorited).map((p) => p.id)),
    detailProduct: PRODUCTS[0],
    detailMode: 'variations',
    saleType: 'stock',
    selectedColor: 0,
    selectedSize: 0,
    selectedMaterial: 0,
    detailQty: 0,
    otherAttrIdx: 0,
    recSeriesSlide: 0,
    recCatSlide1: 0,
    recCatSlide2: 0,
    listModeOpen: false,
    listModeRows: (DETAIL_PRODUCT_DATA.specRows || LIST_MODE_ROWS).map((r) => ({ ...r })),
    showAttr: true,
    poTab: 'confirming',
    dispatchTab: 'transit',
    paymentTab: 'unpaid',
    accountPage: 'po',
    modal: null,
    paymentDetail: null,
    toast: null,
    homeTimer: null,
    locale: 'en',
    currency: 'USD',
    openDropdown: null,
    detailTab: 'description',
  };

  const { t, catName, productName, bannerText, statusText, money, currencyCode, renderTopbarSwitchers, loadPrefs, savePrefs } = MallI18n;
  loadPrefs(state);

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const tx = (key, vars) => t(state, key, vars);
  const fmt = (usd, short) => money(state, usd, short);
  const tabLabel = (id) => tx({ waitship: 'waitShip', waitrecv: 'waitReceive', transit: 'inTransit' }[id] || id);

  function img(src, cls, alt) {
    return `<img class="${cls}" src="${src}" alt="${alt || 'product'}" loading="lazy" />`;
  }

  function miniImg(src, alt) {
    return img(src, 'mini-img', alt);
  }

  function showToast(msg) {
    clearTimeout(state.toastTimer);
    let el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    state.toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function parseRoute() {
    const hash = location.hash.replace(/^#\/?/, '') || 'index';
    const parts = hash.split('/');
    state.route = parts[0] || 'index';
    state.routeParam = parts[1] || null;
    if (state.route === 'home') state.route = 'index';
    if (state.route === 'detail' && state.routeParam) {
      const p = PRODUCTS.find((x) => x.id === state.routeParam);
      if (p && state.detailProduct?.id !== p.id) {
        state.detailProduct = p;
        state.detailThumb = 0;
        state.lifestyleSlide = 0;
        state.detailTab = 'description';
        state.listModeRows = (p.specRows || LIST_MODE_ROWS).map((row) => ({ ...row }));
      } else if (p) {
        state.detailProduct = p;
        state.listModeRows = (p.specRows || LIST_MODE_ROWS).map((row) => ({ ...row }));
      }
    }
    if (state.route === 'account') {
      state.accountPage = state.routeParam || 'po';
    }
  }

  function navigate(route, param) {
    location.hash = param ? `#/${route}/${param}` : `#/${route}`;
  }

  function renderShell(contentHtml) {
    const wishCount = state.wishlist.filter((w) => w.status === 'Current').length;
    const navActive = (name) => {
      const map = {
        index: ['index'],
        products: ['products', 'detail'],
        wishlist: ['wishlist'],
        account: ['account'],
      };
      return map[name]?.includes(state.route) ? 'active' : '';
    };

    return `
      <div class="topbar">
        <div class="container topbar-inner">
          <div class="topbar-left">
            <span class="user-greet">${tx('hi')} <span class="icon-exit" title="Logout">↗</span></span>
          </div>
          <div class="topbar-center">
            <span class="service-info">${tx('serviceCall')}: 0757-81299039 &nbsp;|&nbsp; ${tx('serviceEmail')}: franchise@linsy.com</span>
          </div>
          <div class="topbar-right">
            ${renderTopbarSwitchers(state)}
          </div>
        </div>
      </div>
      <header class="header">
        <div class="container header-inner">
          <div class="brand" data-nav="index">
            <span class="brand-en">LINSY</span><span class="brand-cn">林氏</span>
          </div>
          <nav class="main-nav">
            <a href="#/index" class="nav-link ${navActive('index') ? 'active' : ''}">${tx('navHome')}</a>
            <a href="#/products" class="nav-link ${navActive('products') ? 'active' : ''}">${tx('navProducts')} <span class="arrow">▼</span></a>
            <a href="#/wishlist" class="nav-link ${navActive('wishlist') ? 'active' : ''}">${tx('navWishlist')}${wishCount ? `<span class="badge">${wishCount}</span>` : ''}</a>
            <a href="#/account/po" class="nav-link ${state.route === 'account' && state.accountPage === 'po' ? 'active' : ''}">${tx('navPO')}</a>
            <a href="#/account/po" class="nav-link ${navActive('account') ? 'active' : ''}">${tx('navAccount')}</a>
          </nav>
          <div class="search-box">
            <input type="text" placeholder="${tx('search')}" />
            <button type="button" class="search-btn" aria-label="Search">🔍</button>
          </div>
        </div>
      </header>
      <main class="main">${contentHtml}</main>
      <footer class="footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <div class="brand footer-logo"><span class="brand-en">LINSY</span><span class="brand-cn">林氏</span></div>
            <div class="footer-contact">Contact Us</div>
            <div>0757-81299039</div>
            <div class="globe">🌐</div>
          </div>
          <div class="footer-col"><h4>About LINSY</h4><a>Brand Story</a><a>Why Choose Us</a><a>Company News</a><a>Contact Us</a></div>
          <div class="footer-col"><h4>Investment Cooperation</h4><a>Apply to Be a Distributor</a><a>Global Outlets</a><a>Our Strengths</a></div>
          <div class="footer-col"><h4>Service Support</h4><a>Warranty Service</a><a>Packaging Service</a><a>Delivery Service</a><a>VR Showroom</a><a>FAQS</a></div>
          <div class="footer-col"><h4>Legal</h4><a>Terms & Conditions</a><a>Privacy Policy</a><a>Terms of Use</a><a>Dispute Resolution Process</a></div>
        </div>
        <div class="footer-bottom">FOSHAN LINSY HOME CO., LTD &nbsp;|&nbsp; 粤ICP备xxxxxxx号 &nbsp;|&nbsp; linsydirect.com</div>
      </footer>
    `;
  }

  function pName(p) {
    return p.displayName || p.goodsName || productName(state, p.nameIndex ?? 0);
  }

  function getProductTabData(p) {
    if (p.tabsData) return p.tabsData;
    const idx = p.nameIndex ?? 0;
    return {
      sizeChart: idx % 3 === 0 ? 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&h=560&fit=crop' : null,
      material: idx % 2 === 0 ? {
        text: tx('materialDesc'),
        image: FURNITURE_IMAGES[(idx + 2) % FURNITURE_IMAGES.length],
      } : null,
      installation: idx % 4 === 0 ? {
        steps: [tx('installStep1'), tx('installStep2'), tx('installStep3')],
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=900&h=560&fit=crop',
      } : null,
    };
  }

  function getSellStatus(product) {
    if (product.countsLimit === 1 || product.statusCode === 'discontinued') return 'Discontinued';
    if (product.countsLimit === 0 && product.preStopProd === 0 || product.statusCode === 'preStop') return 'Pre-discontinue';
    return 'On Sale';
  }

  function getCurrentSku(product) {
    const color = product.colors?.[state.selectedColor];
    const size = product.sizes?.[state.selectedSize];
    const material = product.materials?.[state.selectedMaterial];
    return {
      color: typeof color === 'string' ? color : color?.label,
      size,
      material,
      otherAttr: product.otherAttrs?.[0] || '-',
    };
  }

  function getDetailRecommendations(product, type) {
    const pool = PRODUCTS.filter((p) => p.id !== product.id);
    if (type === 'series') return pool.slice(0, 5);
    if (type === 'category') return pool.filter((p) => p.category === product.category).slice(0, 5);
    return pool.slice(0, 5);
  }

  function renderSpecAttrTable(rows) {
    return `
      <div class="spec-attr-table">
        ${rows.map(([k, v]) => `
          <div class="spec-attr-cell">
            <span class="spec-attr-k">${k}</span>
            <span class="spec-attr-v">${v}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderRecommendCard(p) {
    const fav = state.favorites.has(p.id);
    const name = pName(p);
    const shortName = name.length > 34 ? `${name.slice(0, 31)}...` : name;
    return `
      <article class="product-card recommend-card" data-detail="${p.id}">
        <div class="card-img">
          ${img(p.image, 'product-img', name)}
          <button class="fav-btn card-fav ${fav ? 'on' : ''}" data-fav="${p.id}" title="fav">♡</button>
          <div class="thumb-dots">
            ${p.gallery.slice(0, 3).map((t) => `<img class="dot-img" src="${t}" alt="" />`).join('')}
            <span class="more">+${p.images}</span>
          </div>
        </div>
        <div class="card-body">
          <h3 class="card-title card-title-single">${shortName}</h3>
          <div class="card-price">${fmt(p.price)}</div>
          <div class="card-meta card-meta-inline">
            <span>${tx('estDel')}: ${p.estDel}&nbsp;&nbsp;${tx('moq')}: ${p.moq} ${tx('pcs')}</span>
            <span>${tx('item')}: ${p.item}</span>
          </div>
        </div>
      </article>
    `;
  }

  function renderRecommendCarousel(title, products, slideKey) {
    const slide = state[slideKey] || 0;
    const maxStart = Math.max(0, products.length - 5);
    const offset = Math.min(slide, maxStart);
    const visible = products.slice(offset, offset + 5);
    return `
      <section class="recommend-section">
        <div class="recommend-section-head"><h3>${title}</h3></div>
        <div class="recommend-carousel">
          <button class="rec-arrow prev" data-rec-slide="${slideKey}" data-dir="prev" ${offset <= 0 ? 'disabled' : ''}>‹</button>
          <div class="recommend-grid recommend-grid-5">${visible.map(renderRecommendCard).join('')}</div>
          <button class="rec-arrow next" data-rec-slide="${slideKey}" data-dir="next" ${offset >= maxStart ? 'disabled' : ''}>›</button>
        </div>
      </section>
    `;
  }

  function renderTabEmpty() {
    return `
      <div class="tab-empty">
        ${img(DEFAULT_EMPTY_IMG, 'tab-empty-img', tx('noData'))}
        <p class="tab-empty-text">${tx('noData')}</p>
      </div>
    `;
  }

  function renderDetailTabPanel(p) {
    const tab = state.detailTab;
    const tabData = getProductTabData(p);

    if (tab === 'description') {
      const desc = tabData.description || {};
      const sellingPoints = desc.sellingPoints || [tx('point1'), tx('point2', { time: p.installTime }), tx('point3')];
      const attributes = desc.attributes || [
        ['Brand', 'LINSY'], ['Style', 'LINSY'], ['Unit', 'Set'], ['Series', 'Purus Dining'],
        ['Cat.', 'Dining Room'], ['Model', 'LS387S7'], ['Item', p.item], ['Goods Type', 'Stock Furniture'],
        ['Color', 'Vintage + Black'], ['Grade Type', 'Standard'], ['For', 'Indoor / Distribution'], ['Status', p.status || 'Active'],
        ['Delivery Support', 'To be advised'], ['Currency', currencyCode(state)], ['MOQ', `${p.moq} pcs`], ['Est. Del', p.deliveryDate],
      ];
      return `
        <h3 class="detail-block-title">${tx('overview')}</h3>
        <p class="detail-overview">${desc.overview || tx('overviewDesc')}</p>
        <h3 class="detail-block-title">${tx('sellingPoints')}</h3>
        <ul class="selling-points-list">${sellingPoints.map((point) => `<li>${point}</li>`).join('')}</ul>
        <h3 class="detail-block-title">Attributes</h3>
        ${renderSpecAttrTable(attributes)}
      `;
    }

    if (tab === 'sizeChart') {
      if (!tabData.sizeChart?.image && !tabData.sizeChart) return renderTabEmpty();
      return `
        <h3>${tx('sizeChart')}</h3>
        ${tabData.sizeChart.note ? `<p>${tabData.sizeChart.note}</p>` : ''}
        <div class="tab-image-wrap">${img(tabData.sizeChart.image || tabData.sizeChart, 'tab-content-img', tx('sizeChart'))}</div>
      `;
    }

    if (tab === 'material') {
      if (!tabData.material) return renderTabEmpty();
      return `
        <h3>${tx('materialTitle')}</h3>
        <p>${tabData.material.text}</p>
        ${tabData.material.cards ? `<div class="material-card-grid">${tabData.material.cards.map((card) => `<div class="material-card"><span>${card.title}</span><strong>${card.value}</strong></div>`).join('')}</div>` : ''}
        <div class="tab-image-wrap">${img(tabData.material.image, 'tab-content-img', tx('material'))}</div>
      `;
    }

    if (tab === 'installation') {
      if (!tabData.installation) return renderTabEmpty();
      return `
        <h3>${tx('installationTitle')}</h3>
        <ol class="install-steps">${tabData.installation.steps.map((s) => `<li>${s}</li>`).join('')}</ol>
        <div class="tab-image-wrap">${img(tabData.installation.image, 'tab-content-img', tx('installation'))}</div>
      `;
    }

    if (tab === 'recommend') {
      const picks = getDetailRecommendations(p, 'series');
      return `
        <h3>${tx('recommend')}</h3>
        <p>${tx('recommendDesc')}</p>
        <div class="recommend-grid tab-recommend-grid">${picks.map(renderRecommendCard).join('')}</div>
      `;
    }

    return renderTabEmpty();
  }

  function renderHomePage() {
    return renderShell(`
      <section class="hero-carousel">
        <div class="hero-track" style="transform:translateX(-${state.homeSlide * 100}%)">
          ${HOME_BANNERS.map((b, i) => `
            <div class="hero-slide">
              ${img(b.img, 'hero-img', bannerText(state, i, 'title'))}
              <div class="hero-overlay">
                <h2>${bannerText(state, i, 'title')}</h2>
                <p>${bannerText(state, i, 'sub')}</p>
                <button class="btn-primary" data-hero-link="${b.link}">${tx('shopNow')}</button>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="hero-arrow prev" data-hero-slide="prev">‹</button>
        <button class="hero-arrow next" data-hero-slide="next">›</button>
        <div class="hero-dots">
          ${HOME_BANNERS.map((_, i) => `<button class="hero-dot ${state.homeSlide === i ? 'on' : ''}" data-hero-dot="${i}"></button>`).join('')}
        </div>
      </section>
      <div class="container home-section">
        <h2 class="section-title">${tx('featuredCategories')}</h2>
        <div class="home-cats">
          ${CATEGORIES.slice(1, 7).map((c) => `
            <a href="#/products" class="home-cat-card" data-cat-jump="${c.id}">
              ${img(c.img, 'home-cat-img', catName(state, c.id))}
              <span>${catName(state, c.id)}</span>
            </a>
          `).join('')}
        </div>
      </div>
      <div class="container home-section">
        <div class="section-head">
          <h2 class="section-title">${tx('bestsellers')}</h2>
          <a href="#/products" class="link-btn">${tx('viewAll')}</a>
        </div>
        <div class="product-grid home-grid">${PRODUCTS.slice(0, 10).map(renderProductCard).join('')}</div>
      </div>
      <div class="container home-promo">
        <div class="promo-card">
          ${img('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=360&fit=crop', 'promo-img', tx('vrShowroom'))}
          <div><h3>${tx('vrShowroom')}</h3><p>${tx('vrDesc')}</p><button class="btn-ghost" data-nav="products">${tx('explore')}</button></div>
        </div>
        <div class="promo-card">
          ${img('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=360&fit=crop', 'promo-img', tx('newArrivals'))}
          <div><h3>${tx('newArrivals')}</h3><p>${tx('newArrivalsDesc')}</p><button class="btn-ghost" data-nav="products">${tx('browse')}</button></div>
        </div>
      </div>
    `);
  }

  function renderCategoryBar() {
    return `
      <div class="category-bar">
        <div class="container category-scroll">
          ${CATEGORIES.map((c) => `
            <button class="cat-item ${state.category === c.id ? 'active' : ''}" data-cat="${c.id}">
              ${img(c.img, 'cat-img', catName(state, c.id))}
              <span>${catName(state, c.id)}</span>
            </button>
          `).join('')}
          <button class="cat-arrow">›</button>
        </div>
      </div>
    `;
  }

  function renderProductCard(p) {
    const fav = state.favorites.has(p.id);
    const thumbs = p.gallery.slice(0, 3);
    const name = pName(p);
    return `
      <article class="product-card" data-detail="${p.id}">
        <div class="card-img">
          ${img(p.image, 'product-img', name)}
          <div class="thumb-dots">
            ${thumbs.map((t) => `<img class="dot-img" src="${t}" alt="" />`).join('')}
            <span class="more">+${p.images}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title">${name}</h3>
            <button class="fav-btn ${fav ? 'on' : ''}" data-fav="${p.id}" title="fav">♡</button>
          </div>
          <div class="card-price">${fmt(p.price)}</div>
          <div class="card-meta">
            <span>${tx('estDel')}: ${p.estDel}</span>
            <span>${tx('moq')}: ${p.moq} ${tx('pcs')}</span>
            <span>${tx('item')}: ${p.item}</span>
          </div>
        </div>
      </article>
    `;
  }

  function renderFilters() {
    if (!state.showFilter) return '';
    return `
      <aside class="filter-panel">
        <div class="filter-head">Filters (3) <button class="link-btn" data-action="reset-filter">🗑</button></div>
        <section class="filter-block"><h4>Label</h4><div class="chip-group"><button class="chip active">New Arrivals</button><button class="chip">Bestsellers</button></div></section>
        <section class="filter-block"><h4>Price</h4><div class="range-bar"><div class="range-fill"></div></div><div class="chip-group"><button class="chip active">Any</button><button class="chip">$0-$100</button><button class="chip">$101-$500</button><button class="chip">$501-$1000</button></div></section>
        <section class="filter-block"><h4>MOQ</h4><div class="chip-group wrap"><button class="chip active">Any</button><button class="chip">1 Pieces</button><button class="chip">5 Pieces</button><button class="chip">10 Pieces</button><button class="chip">50 Pieces</button><button class="chip">100 Pieces</button></div></section>
        <section class="filter-block"><h4>Delivery Time</h4><div class="chip-group wrap"><button class="chip active">Any</button><button class="chip">7 days</button><button class="chip">15 days</button><button class="chip">30 days</button><button class="chip">Over 30 days</button></div></section>
        <section class="filter-block"><h4>Product Material</h4><label class="check"><input type="checkbox" checked /> Any Material</label><label class="check"><input type="checkbox" /> Wood</label><label class="check"><input type="checkbox" /> Metal</label><label class="check"><input type="checkbox" /> Fabric</label></section>
        <section class="filter-block"><h4>Product Size</h4><label class="check"><input type="checkbox" checked /> Any Size</label><label class="check"><input type="checkbox" /> Small</label><label class="check"><input type="checkbox" /> Medium</label><label class="check"><input type="checkbox" /> Large</label></section>
      </aside>
    `;
  }

  function renderPagination() {
    const pages = [1, 2, 3, '...', 17];
    return `
      <div class="pagination">
        <button class="page-btn" data-page="prev">‹</button>
        ${pages.map((p) => typeof p === 'number'
    ? `<button class="page-btn ${state.page === p ? 'active' : ''}" data-page="${p}">${p}</button>`
    : `<span class="page-ellipsis">${p}</span>`).join('')}
        <button class="page-btn" data-page="next">›</button>
      </div>
    `;
  }

  function renderProductsPage() {
    const filtered = state.category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === state.category);
    return renderShell(`
      ${renderCategoryBar()}
      <div class="container page-products ${state.showFilter ? 'with-filter' : ''}">
        ${renderFilters()}
        <section class="product-area">
          <div class="sort-bar">
            <button class="sort-item ${state.sort === 'date' ? 'active' : ''}" data-sort="date">${tx('listingDate')} ↑</button>
            <button class="sort-item ${state.sort === 'price' ? 'active' : ''}" data-sort="price">${tx('price')} ↑</button>
            <button class="sort-item ${state.sort === 'delivery' ? 'active' : ''}" data-sort="delivery">${tx('deliveryTime')} ↑</button>
            <button class="sort-item ${state.sort === 'sales' ? 'active' : ''}" data-sort="sales">${tx('sales')} ↑</button>
            <button class="toggle-filter link-btn" data-action="toggle-filter">${state.showFilter ? tx('hideFilters') : tx('showFilters')}</button>
          </div>
          <div class="product-grid">${filtered.map(renderProductCard).join('')}</div>
          ${renderPagination()}
        </section>
      </div>
    `);
  }

  function renderDetailPage() {
    return renderDetailPageV2();
  }

  function renderListModeModal() {
    const rows = state.listModeRows;
    const selected = rows.filter((r) => r.checked && r.qty > 0);
    const totalPcs = selected.reduce((s, r) => s + r.qty, 0);
    const totalAmt = selected.reduce((s, r) => s + r.price * r.qty, 0);
    const renderAttrCell = (r) => (state.showAttr
      ? `<td class="attr-cell">${r.dim}<br/>${r.cbm}<br/>${r.gw}</td>`
      : '');

    return `
      <div class="modal-mask" data-action="close-list-mode">
        <div class="modal list-mode-modal" onclick="event.stopPropagation()">
          <button class="modal-close" data-action="close-list-mode">×</button>
          <div class="modal-head">
            <span class="tag-badge">Bestsellers</span>
            <h2>Purus Wood Color + White Dining Chair (Set of 2)</h2>
            <div class="detail-meta">Item: LS38797-LSC23YZ007597</div>
          </div>
          <div class="modal-toolbar">
            <div class="sale-type"><button class="pill active">Stock</button><button class="pill">Custom</button></div>
            <label class="attr-toggle"><input type="checkbox" id="attrToggle" ${state.showAttr ? 'checked' : ''} /> ${tx('attr')}</label>
          </div>
          <div class="modal-table-wrap">
            <table class="spec-table">
              <thead><tr><th></th><th>Item</th><th>Color</th><th>Size</th><th>Material</th>${state.showAttr ? '<th>Attr</th>' : ''}<th>Price</th><th>Est. Del</th><th>Stock</th><th>MOQ</th><th>Qty</th></tr></thead>
              <tbody>
                ${rows.map((r) => `
                  <tr class="${r.checked ? 'selected-row' : ''}">
                    <td><input type="checkbox" data-row-check="${r.id}" ${r.checked ? 'checked' : ''} /></td>
                    <td><div class="item-cell">${miniImg(r.image, r.item)}<div><div>${r.item}</div><span class="status-tag">Current</span></div></div></td>
                    <td>${r.color}</td><td>${r.size}</td><td>${r.material}</td>
                    ${renderAttrCell(r)}
                    <td>${fmt(r.price, true)}</td>
                    <td>${r.estDel}</td><td>${r.stock}pcs</td><td>${r.moq}pcs</td>
                    <td><div class="stepper small"><button data-row-qty="${r.id}" data-delta="-1">-</button><input value="${r.qty}" data-row-input="${r.id}" /><button data-row-qty="${r.id}" data-delta="1">+</button></div></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <div class="summary">${tx('selected')}: <b>${selected.length}</b> ${tx('items')}, <b>${totalPcs}</b> ${tx('pcs')} | ${tx('totalAmount')}: <b class="red">${fmt(totalAmt)}</b></div>
            <button class="btn-primary" data-action="batch-add-wishlist">${tx('addToWishlist')}</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderDetailPageV2() {
    const p = state.detailProduct;
    const name = pName(p);
    const mainImg = p.gallery[state.detailThumb] || p.image;
    const lifestyleImgs = p.lifestyleGallery || p.gallery.concat(FURNITURE_IMAGES.slice(0, 3));
    const lifestyleImg = lifestyleImgs[state.lifestyleSlide % lifestyleImgs.length];
    const stockMoq = state.saleType === 'custom' ? (p.customMoq || p.moq) : p.moq;
    const sameSeries = getDetailRecommendations(p, 'series');
    const sameCategory = getDetailRecommendations(p, 'category');
    const colorOptions = (p.colors || []).map((option) => typeof option === 'string' ? { label: option, img: p.gallery[0] } : option);

    return renderShell(`
      <div class="container page-detail detail-v2">
        <div class="detail-layout detail-layout-updated">
          <div class="detail-gallery">
            <div class="thumb-list">
              ${p.gallery.map((g, i) => `
                <button class="thumb ${state.detailThumb === i ? 'active' : ''}" data-detail-thumb="${i}">
                  ${img(g, 'thumb-img', name)}
                </button>
              `).join('')}
            </div>
            <div class="main-image">
              <button class="detail-image-nav prev" data-detail-slide="prev" aria-label="Previous image">‹</button>
              ${img(mainImg, 'detail-main-img', name)}
              <button class="detail-image-nav next" data-detail-slide="next" aria-label="Next image">›</button>
            </div>
          </div>
          <div class="detail-info detail-info-updated">
            ${p.tag ? `<span class="tag-badge">${tx('bestsellers')}</span>` : ''}
            <h1 class="detail-title">${name}</h1>
            <div class="detail-meta detail-code-row">${tx('item')}: ${p.item} <span class="detail-divider">|</span> ${tx('status')}: ${p.status || 'Active'}</div>
            <div class="sale-type sale-type-pills">
              <button class="pill ${state.saleType === 'stock' ? 'active' : ''}" data-sale="stock">${tx('stock')}</button>
              <button class="pill ${state.saleType === 'custom' ? 'active' : ''}" data-sale="custom">${tx('custom')}</button>
            </div>
            <div class="detail-price-wrap">
              <div class="detail-price">${fmt(p.price)}</div>
            </div>
            <div class="logistics detail-logistics-wrap">
              <div class="detail-logistics-line"><span class="logistics-ico">⏱</span> ${tx('installTime')}: ${p.installTime}</div>
              <div class="detail-logistics-line"><span class="logistics-ico">🚚</span> ${tx('deliveryDate')}: ${p.deliveryDate}</div>
              <div class="detail-logistics-line"><span class="logistics-ico">📐</span> DIM: ${p.dim.replace(/ × /g, '*')}</div>
              <div class="detail-logistics-line"><span class="logistics-ico">📦</span> CBM: ${p.cbm}</div>
              <div class="detail-logistics-line"><span class="logistics-ico">⚖</span> G.W.: ${p.gw}</div>
            </div>
            <div class="mode-switch">
              <button class="mode-btn ${state.detailMode === 'variations' ? 'active' : ''}" data-mode="variations">${tx('variations')}</button>
              <button class="mode-btn ${state.detailMode === 'list' ? 'active' : ''}" data-mode="list">${tx('listMode')}</button>
            </div>
            ${state.detailMode === 'variations' ? `
              <div class="attr-group">
                <label>${tx('color')}</label>
                <div class="attr-options attr-options-rich">
                  ${colorOptions.map((c, i) => `<button class="attr-btn attr-btn-rich ${state.selectedColor === i ? 'active' : ''}" data-color="${i}"><img src="${c.img}" alt="" class="option-img" /><span>${c.label}</span></button>`).join('')}
                </div>
              </div>
              <div class="attr-group"><label>${tx('size')}</label><div class="attr-options">${p.sizes.map((s, i) => `<button class="attr-btn ${state.selectedSize === i ? 'active' : ''}" data-size="${i}">${s}</button>`).join('')}</div></div>
              <div class="attr-group"><label>${tx('material')}</label><div class="attr-options">${p.materials.map((m, i) => `<button class="attr-btn ${state.selectedMaterial === i ? 'active' : ''}" data-material="${i}">${m}</button>`).join('')}</div></div>
              <div class="attr-group"><label>OthAttr</label>
                <select class="oth-attr-select" id="othAttrSelect">
                  ${(p.otherAttrs || []).map((v, i) => `<option value="${i}" ${state.otherAttrIdx === i ? 'selected' : ''}>${v}</option>`).join('')}
                </select>
              </div>
              <div class="qty-row">
                <label>${tx('qty')}</label>
                <div class="stepper"><button data-qty="-1">-</button><input type="number" value="${state.detailQty}" id="detailQtyInput" min="0" /><button data-qty="1">+</button></div>
                <span class="qty-hint">${tx('moq')}: ${stockMoq} ${tx('pcs')} | ${tx('stock')}: ${p.stock.toLocaleString()} ${tx('pcs')}</span>
              </div>
            ` : ''}
            <div class="detail-actions">
              <button class="btn-primary" data-action="add-wishlist">${tx('addToWishlist')}</button>
              <button class="btn-icon ${state.favorites.has(p.id) ? 'on' : ''}" data-action="toggle-fav-detail">&#9825;</button>
            </div>
          </div>
        </div>
        <div class="detail-tabs">
          ${DETAIL_TABS.map((tab) => `
            <button class="tab ${state.detailTab === tab ? 'active' : ''}" data-detail-tab="${tab}">${tx(tab)}</button>
          `).join('')}
        </div>
        <div class="detail-content detail-content-updated">
          ${renderDetailTabPanel(p)}
        </div>
        <div class="carousel-block carousel-block-updated">
          <div class="carousel-img">
            <button class="carousel-arrow" data-lifestyle-slide="prev">‹</button>
            ${img(lifestyleImg, 'lifestyle-img', 'Lifestyle')}
            <button class="carousel-arrow" data-lifestyle-slide="next">›</button>
          </div>
          <div class="carousel-dots">
            ${lifestyleImgs.slice(0, 4).map((_, i) => `<button class="carousel-dot ${state.lifestyleSlide % lifestyleImgs.length === i ? 'on' : ''}" data-lifestyle-dot="${i}"></button>`).join('')}
          </div>
        </div>
        ${renderRecommendCarousel(tx('sameSeries'), sameSeries, 'recSeriesSlide')}
        ${renderRecommendCarousel(tx('sameCategory'), sameCategory, 'recCatSlide1')}
        ${renderRecommendCarousel(tx('sameCategory'), sameCategory, 'recCatSlide2')}
      </div>
      ${state.listModeOpen ? renderListModeModalV2() : ''}
    `);
  }

  function renderListModeModalV2() {
    const p = state.detailProduct;
    const rows = state.listModeRows;
    const selected = rows.filter((r) => r.checked && r.qty > 0);
    const totalPcs = selected.reduce((s, r) => s + r.qty, 0);
    const totalAmt = selected.reduce((s, r) => s + r.price * r.qty, 0);
    const renderAttrCell = (r) => (state.showAttr
      ? `<td class="attr-cell">${r.dim}<br/>${r.cbm}<br/>${r.gw}</td>`
      : '');

    return `
      <div class="modal-mask" data-action="close-list-mode">
        <div class="modal list-mode-modal list-mode-modal-updated" onclick="event.stopPropagation()">
          <button class="modal-close" data-action="close-list-mode">×</button>
          <div class="modal-head">
            <span class="tag-badge">${p.tag || 'Bestsellers'}</span>
            <h2>${pName(p)}</h2>
            <div class="detail-meta">Item: ${p.item}</div>
          </div>
          <div class="modal-toolbar">
            <div class="sale-type sale-type-pills modal-pills">
              <button class="pill active">${tx('stock')}</button>
              <button class="pill">${tx('custom')}</button>
            </div>
          </div>
          <div class="spec-table-head">
            <h3>Specification</h3>
            <label class="attr-switch">
              <input type="checkbox" id="attrToggle" ${state.showAttr ? 'checked' : ''} />
              <span class="attr-switch-ui"></span>
              <span class="attr-switch-label">${tx('attr')}</span>
            </label>
          </div>
          <div class="modal-table-wrap">
            <table class="spec-table spec-table-updated ${state.showAttr ? 'show-attr' : ''}">
              <thead><tr><th></th><th>Item</th><th>Color</th><th>Size</th><th>Material</th>${state.showAttr ? '<th>Attr</th>' : ''}<th>Price</th><th>Est. Del</th><th>Stock</th><th>MOQ</th><th>Qty</th></tr></thead>
              <tbody>
                ${rows.map((r) => `
                  <tr class="${r.checked ? 'selected-row' : ''}">
                    <td><input type="checkbox" data-row-check="${r.id}" ${r.checked ? 'checked' : ''} /></td>
                    <td><div class="item-cell">${miniImg(r.image, r.item)}<div><div>${r.item}</div><span class="status-tag">${r.code || 'Current'}</span></div></div></td>
                    <td>${r.color}</td><td>${r.size}</td><td>${r.material}</td>
                    ${renderAttrCell(r)}
                    <td>${fmt(r.price, true)}</td>
                    <td>${r.estDel}</td><td>${r.stock}pcs</td><td>${r.moq}pcs</td>
                    <td><div class="stepper small"><button data-row-qty="${r.id}" data-delta="-1">-</button><input value="${r.qty}" data-row-input="${r.id}" /><button data-row-qty="${r.id}" data-delta="1">+</button></div></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <div class="summary">${tx('selected')}: <b>${selected.length}</b> ${tx('items')}, <b>${totalPcs}</b> ${tx('pcs')} | ${tx('totalAmount')}: <b class="red">${fmt(totalAmt)}</b></div>
            <button class="btn-primary" data-action="batch-add-wishlist">${tx('addToWishlist')}</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderWishlistPage() {
    const selected = state.wishlist.filter((w) => w.selected && w.status === 'Current');
    const totalQty = selected.reduce((s, w) => s + w.qty, 0);
    const totalAmt = selected.reduce((s, w) => s + w.up * w.qty, 0);
    const discount = selected.length ? 100 : 0;
    const payable = totalAmt - discount;

    return renderShell(`
      <div class="container page-wishlist">
        <div class="wishlist-layout">
          <div class="wishlist-main">
            <div class="action-bar">
              <button class="link-btn" data-wl="delete">${tx('delete')}</button>
              <button class="link-btn">${tx('inquiry')}</button>
              <button class="link-btn" data-wl="clear-invalid">${tx('clearInvalid')}</button>
              <button class="link-btn">${tx('addItem')} ▼</button>
              <button class="link-btn">${tx('import')}</button>
              <button class="link-btn">${tx('export')}</button>
            </div>
            <div class="filter-row">
              <select><option>All</option></select>
              <select><option>Products Status</option><option>Current</option><option>Invalid</option></select>
              <div class="search-box small"><input placeholder="Item" /><button aria-label="Search">🔍</button></div>
            </div>
            <table class="wishlist-table">
              <thead><tr><th></th><th>${tx('item')}</th><th>${tx('specification')}</th><th>${tx('price')}</th><th>${tx('estDel')}</th><th>${tx('qty')}</th><th>${tx('opt')}</th></tr></thead>
              <tbody>
                ${state.wishlist.map((w) => `
                  <tr class="${w.status !== 'Current' ? 'invalid-row' : ''}">
                    <td><input type="checkbox" data-wl-check="${w.id}" ${w.selected ? 'checked' : ''} ${w.status !== 'Current' ? 'disabled' : ''} /></td>
                    <td><div class="item-cell">${miniImg(w.image, w.item)}<div><div>${w.item}</div><span class="status-tag ${w.status === 'Invalid' ? 'danger' : ''}">${statusText(state, w.status)}</span></div></div></td>
                    <td>Col: ${w.spec.col}<br/>Sz: ${w.spec.sz}<br/>Mat: ${w.spec.mat}</td>
                    <td>UP: ${fmt(w.up, true)}<br/>Tot: ${fmt(w.up * w.qty, true)}</td>
                    <td>${w.estDel}</td>
                    <td><div class="stepper small"><button data-wl-qty="${w.id}" data-delta="-1">-</button><input value="${w.qty}" data-wl-input="${w.id}" /><button data-wl-qty="${w.id}" data-delta="1">+</button></div><div class="qty-hint">${tx('moq')}: ${w.moq}${tx('pcs')} | ${tx('stock')}: ${w.stock.toLocaleString()}${tx('pcs')}</div></td>
                    <td class="opt-cell"><button class="link-btn" data-wl-remark="${w.id}">+ ${tx('remark')}</button><button class="link-btn" data-wl-del="${w.id}">${tx('delete')}</button></td>
                  </tr>
                  ${w.remark ? `<tr class="remark-row"><td></td><td colspan="6"><div class="remark-box">${tx('remark')}: ${w.remark}${w.reply ? `<div class="reply">${tx('reply')}: ${w.reply}</div>` : ''}</div></td></tr>` : ''}
                `).join('')}
              </tbody>
            </table>
            ${renderPagination()}
          </div>
          <aside class="order-summary">
            <h3>${tx('orderDetails')}</h3>
            <div class="thumb-grid">
              ${selected.slice(0, 11).map((w) => miniImg(w.image, w.item)).join('')}
              ${selected.length > 11 ? `<span class="more-thumb">${tx('more')}</span>` : ''}
            </div>
            <dl class="summary-list">
              <div><dt>${tx('totalQty')}</dt><dd>${totalQty}${tx('pcs')}</dd></div>
              <div><dt>${tx('totalVol')}</dt><dd>18.553m³</dd></div>
              <div><dt>${tx('currency')}</dt><dd>${currencyCode(state)}</dd></div>
              <div><dt>${tx('totalAmount')}</dt><dd>${fmt(totalAmt, true)}</dd></div>
              <div><dt>${tx('discount')}</dt><dd class="red">-${fmt(discount, true)}</dd></div>
              <div class="payable"><dt>${tx('payable')}</dt><dd>${fmt(payable, true)}</dd></div>
            </dl>
            <button class="btn-primary full" data-action="buy-now" ${!selected.length ? 'disabled' : ''}>${tx('buyNow')} (${totalQty})</button>
          </aside>
        </div>
      </div>
      ${state.modal === 'exception' ? renderExceptionModal() : ''}
    `);
  }

  function renderExceptionModal() {
    return `
      <div class="modal-mask" data-action="close-modal">
        <div class="modal exception-modal" onclick="event.stopPropagation()">
          <h3>${tx('systemReminder')}</h3>
          <p class="warn-text">${tx('exceptionWarn')}</p>
          <table class="wishlist-table compact">
            <thead><tr><th>Item</th><th>Specification</th><th>Price</th><th>Recommended For You</th><th></th></tr></thead>
            <tbody>
              <tr>
                <td><div class="item-cell">${miniImg(FURNITURE_IMAGES[6], 'alt')}<div>G064-A-LSC255F047691<br/><span class="status-tag danger">Disco</span></div></div></td>
                <td>Col: Vintage + Soft Yarn<br/>Sz: 2.37m</td>
                <td>UP: $298.00</td>
                <td><div class="rec-items">${miniImg(FURNITURE_IMAGES[1], 'rec')} ${miniImg(FURNITURE_IMAGES[3], 'rec')}</div></td>
                <td><button class="link-btn">🗑</button><button class="link-btn">→</button></td>
              </tr>
            </tbody>
          </table>
          <div class="modal-actions">
            <button class="btn-ghost" data-action="close-modal">${tx('cancel')}</button>
            <button class="btn-primary" data-action="confirm-order">${tx('confirm')}</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderAccountSidebar() {
    const items = [
      { id: 'center', labelKey: 'personalCenter', icon: '👤' },
      { id: 'account', labelKey: 'accountInfo', icon: '📋' },
      { id: 'sub', labelKey: 'subAccount', icon: '👥' },
      { groupKey: 'myOrder', children: [
        { id: 'po', labelKey: 'poOrder' },
        { id: 'dispatch', labelKey: 'dispatchNote' },
        { id: 'payment', labelKey: 'paymentOrderMenu' },
      ]},
      { groupKey: 'myReport', children: [
        { id: 'stock', label: 'Stock Hold Report' },
        { id: 'lead', label: 'Lead Time Report' },
      ]},
      { id: 'favorite', labelKey: 'myFavorite', icon: '♥' },
    ];
    let html = '<aside class="account-sidebar">';
    items.forEach((item) => {
      if (item.groupKey) {
        html += `<div class="side-group"><div class="side-title">${tx(item.groupKey)}</div>`;
        item.children.forEach((c) => { html += `<a href="#/account/${c.id}" class="side-item ${state.accountPage === c.id ? 'active' : ''}">${c.labelKey ? tx(c.labelKey) : c.label}</a>`; });
        html += '</div>';
      } else {
        html += `<a href="#/account/${item.id}" class="side-item ${state.accountPage === item.id ? 'active' : ''}">${item.icon || ''} ${tx(item.labelKey)}</a>`;
      }
    });
    html += '</aside>';
    return html;
  }

  function renderPoPage() {
    const tabs = [
      { id: 'confirming', label: 'Confirming', count: 5 },
      { id: 'unpaid', label: 'Unpaid', count: 2 },
      { id: 'waitship', label: 'Wait Ship', count: 5 },
      { id: 'waitrecv', label: 'Wait Receive', count: 3 },
      { id: 'complete', label: 'Complete', count: 0 },
      { id: 'closed', label: 'Closed', count: 5 },
    ];
    return renderShell(`
      <div class="container page-account">
        ${renderAccountSidebar()}
        <section class="account-content">
          <h2 class="page-title">${tx('poList')}</h2>
          <div class="status-tabs">${tabs.map((t) => `<button class="status-tab ${state.poTab === t.id ? 'active' : ''}" data-po-tab="${t.id}">${tabLabel(t.id)}${t.count ? ` (${t.count})` : ''}</button>`).join('')}</div>
          <div class="query-bar">
            <input placeholder="PO NO." /><input placeholder="LS Code" /><input placeholder="Start Date - End Date" />
            <select><option>Create Type</option></select>
            <button class="btn-primary small">${tx('searchBtn')}</button><button class="link-btn">Adv</button>
          </div>
          <table class="data-table">
            <thead><tr><th>PO No.</th><th>C.PO NO.</th><th>Status</th><th>Currency</th><th>Created date</th><th>QTY</th><th>Total Amount</th><th>Remarks</th><th>Trade Term</th><th>Action</th></tr></thead>
            <tbody>${PO_LIST.map((r) => `
              <tr>
                <td><a class="link-btn" data-po-detail="${r.poNo}">${r.poNo}</a></td>
                <td>${r.cpoNo}</td><td>${statusText(state, r.status)}</td><td>${currencyCode(state)}</td><td>${r.created}</td>
                  <td>${r.qty}</td><td>${fmt(r.amount, true)}</td><td>${r.remarks}</td><td>${r.tradeTerm}</td>
                  <td class="action-cell"><button class="link-btn">${tx('copy')}</button><button class="link-btn">${tx('export')}</button><button class="link-btn danger">${tx('invalid')}</button></td>
              </tr>
            `).join('')}</tbody>
          </table>
          <div class="pagination right">${renderPagination()}</div>
        </section>
      </div>
      ${state.modal === 'po-detail' ? renderPoDetailModal() : ''}
    `);
  }

  function renderPoDetailModal() {
    return `
      <div class="modal-mask" data-action="close-modal">
        <div class="modal po-detail-modal" onclick="event.stopPropagation()">
          <button class="modal-close" data-action="close-modal">×</button>
          <div class="modal-head row-between">
            <div><h2>PO2604110100</h2><span class="status-tag">${statusText(state, 'Pending Shipment')}</span></div>
            <div class="head-meta">${tx('creatingDate')}: 04/11/2026 | ${tx('tradeTerm')}: FOB | ${tx('currency')}: ${currencyCode(state)}</div>
          </div>
          <table class="data-table compact">
            <thead><tr><th>Stat</th><th>Item</th><th>PO No.</th><th>Cust Item</th><th>LINSY Item</th><th>LINSY Specs</th><th>Est PCS/PKG</th><th>Act PCS/PKG</th></tr></thead>
            <tbody>${Array.from({ length: 4 }, (_, i) => `
              <tr>
                <td>${statusText(state, 'Preparing')}</td>
                <td><div class="item-cell">${miniImg(FURNITURE_IMAGES[i], 'item')}G064-A-LSC25${i}</div></td>
                <td>PO2604110100</td><td>CUST-${i}</td><td>LSC25${i}</td><td>Col: Black / Sz: 2.37m</td><td>10/10</td><td>-</td>
              </tr>
            `).join('')}</tbody>
          </table>
          <div class="po-summary"><span>${tx('totalQty')}: 58${tx('pcs')}</span><span>Total PKG: 58${tx('pcs')}</span><span>${tx('totalVol')}: 18.553m³</span><span>${tx('payable')}: <b>${fmt(2563, true)}</b></span></div>
          <div class="modal-actions"><button class="btn-ghost">${tx('cancel')}</button><button class="btn-primary" data-payment-jump="FKD26041123910">${tx('paymentRecord')}</button></div>
        </div>
      </div>
    `;
  }

  function renderDispatchPage() {
    const tabs = [
      { id: 'draft', label: 'Draft', count: 1 },
      { id: 'unpaid', label: 'Unpaid', count: 2 },
      { id: 'transit', label: 'In Transit', count: 10 },
      { id: 'complete', label: 'Complete', count: 0 },
    ];
    return renderShell(`
      <div class="container page-account">
        ${renderAccountSidebar()}
        <section class="account-content">
          <h2 class="page-title">${tx('dispatchList')}</h2>
          <div class="status-tabs">${tabs.map((t) => `<button class="status-tab ${state.dispatchTab === t.id ? 'active' : ''}" data-dispatch-tab="${t.id}">${tabLabel(t.id)}${t.count ? ` (${t.count})` : ''}</button>`).join('')}</div>
          <div class="query-bar"><select><option>Ship No.</option></select><select><option>LS PI No.</option></select><input placeholder="Start Date - End Date" /><button class="btn-primary small">${tx('searchBtn')}</button></div>
          <table class="data-table">
            <thead><tr><th>NO.</th><th>Dispatch No.</th><th>Status</th><th>LS PI No.</th><th>Cust PO No.</th><th>Entry No.1</th><th>Entry No.2</th><th>Plan Qty/Pkg</th><th>Plan Load Date</th><th>Actual Load Date</th><th>Action</th></tr></thead>
            <tbody>${DISPATCH_LIST.map((r) => `
              <tr><td>${r.no}</td><td>${r.dispatchNo}</td><td>${r.status}</td><td>${r.lsPiNo}</td><td>${r.custPoNo}</td>
              <td>${r.entry1}</td><td>${r.entry2}</td><td>${r.planQty}</td><td>${r.planDate}</td><td>${r.actualDate}</td>
              <td><button class="link-btn" data-dispatch-detail="${r.dispatchNo}">${tx('view')}</button></td></tr>
            `).join('')}</tbody>
          </table>
          <div class="pagination right">${renderPagination()}</div>
        </section>
      </div>
      ${state.modal === 'dispatch-detail' ? renderDispatchDetailModal() : ''}
    `);
  }

  function renderDispatchDetailModal() {
    return `
      <div class="modal-mask" data-action="close-modal">
        <div class="modal po-detail-modal" onclick="event.stopPropagation()">
          <button class="modal-close" data-action="close-modal">×</button>
          <div class="modal-head"><h2>FYD260411024270</h2><span class="status-tag">Pending Shipment</span></div>
          <div class="head-meta">Creating date: 04/11/2026 | Trade Term: FOB</div>
          <table class="data-table compact">
            <thead><tr><th>NO.</th><th>Item</th><th>PO No.</th><th>Cust Item</th><th>LINSY Item</th><th>LINSY Specs</th><th>Est PCS/PKG</th><th>Act PCS/PKG</th><th>Measure</th></tr></thead>
            <tbody>${Array.from({ length: 5 }, (_, i) => `
              <tr><td>${i + 1}</td><td><div class="item-cell">${miniImg(FURNITURE_IMAGES[i], 'item')}G064-${i}</div></td>
              <td>PO2604110100</td><td>CUST-${i}</td><td>LSC25${i}</td><td>Col: Black</td><td>10/10</td><td>-</td><td>0.31m³</td></tr>
            `).join('')}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderPaymentDetailModal(pay) {
    if (!pay) return '';
    const unpaid = pay.unpaidAmt;
    return `
      <div class="modal-mask" data-action="close-modal">
        <div class="modal payment-detail-modal" onclick="event.stopPropagation()">
          <button class="modal-close" data-action="close-modal">×</button>
          <div class="modal-head row-between">
            <div>
              <h2>${pay.payNo}</h2>
              <span class="status-tag ${pay.status === 'Unpaid' ? 'danger' : ''}">${statusText(state, pay.status)}</span>
            </div>
            <div class="head-meta">${tx('relOrder')}: ${pay.relOrder} | ${tx('createTime')}: ${pay.createTime} | ${tx('payType')}: ${pay.payType}</div>
          </div>
          <div class="payment-summary-grid">
            <div class="pay-stat"><span>${tx('dueAmt')}</span><b>${fmt(pay.dueAmt, true)}</b></div>
            <div class="pay-stat"><span>${tx('paidAmt')}</span><b>${fmt(pay.paidAmt, true)}</b></div>
            <div class="pay-stat highlight"><span>${tx('unpaidAmt')}</span><b class="red">${fmt(unpaid, true)}</b></div>
            <div class="pay-stat"><span>${tx('dueDate')}</span><b>${pay.dueDate}</b></div>
            <div class="pay-stat"><span>${tx('remDays')}</span><b>${pay.remDays}</b></div>
            <div class="pay-stat"><span>${tx('cutoffAmt')}</span><b>${fmt(pay.cutoffAmt, true)}</b></div>
          </div>
          <h3 class="sub-title">${tx('priceDetails')}</h3>
          <div class="price-details">
            <div class="price-row"><span>${tx('standardAmount')}</span><span>${fmt(pay.standardAmt, true)}</span></div>
            <div class="price-row"><span>${tx('discountAmount')}</span><span class="red">-${fmt(pay.discountAmt, true)}</span></div>
            <div class="price-row"><span>${tx('adjustAmount')}</span><span>${fmt(pay.adjustAmt, true)}</span></div>
            <div class="price-row"><span>${tx('rebateAmount')}</span><span class="red">-${fmt(pay.rebateAmt, true)}</span></div>
            <div class="price-row"><span>${tx('freight')}</span><span>${fmt(pay.freight, true)}</span></div>
            <div class="price-row"><span>${tx('insuranceFee')}</span><span>${fmt(pay.insurance, true)}</span></div>
            <div class="price-row total"><span>${tx('payableAmount')}</span><span>${fmt(pay.payableAmt, true)}</span></div>
            <div class="price-row"><span>${tx('paidAmount')}</span><span>${fmt(pay.paidRecord, true)}</span></div>
            <div class="price-row total"><span>${tx('unpaidAmount')}</span><span class="red">${fmt(unpaid, true)}</span></div>
          </div>
          <h3 class="sub-title">${tx('paymentRecords')}</h3>
          <table class="data-table compact">
            <thead><tr><th>Pay Date</th><th>Amount</th><th>Method</th><th>Reference</th><th>${tx('status')}</th></tr></thead>
            <tbody>
              <tr><td>04/15/2026</td><td>${fmt(pay.paidRecord, true)}</td><td>TT</td><td>REF-20260415001</td><td>${statusText(state, 'Confirmed')}</td></tr>
              ${unpaid > 0 ? `<tr><td>-</td><td>${fmt(unpaid, true)}</td><td>TT</td><td>-</td><td><span class="status-tag danger">${statusText(state, 'Pending')}</span></td></tr>` : ''}
            </tbody>
          </table>
          <div class="modal-actions">
            <button class="btn-ghost" data-action="close-modal">${tx('close')}</button>
            ${unpaid > 0 ? `<button class="btn-primary" data-action="collect-pay">${tx('collectPay')}</button>` : `<button class="btn-primary" disabled>${tx('paid')}</button>`}
          </div>
        </div>
      </div>
    `;
  }

  function renderPaymentPage() {
    const filtered = state.paymentTab === 'paid'
      ? PAYMENT_LIST.filter((p) => p.status === 'Paid')
      : PAYMENT_LIST.filter((p) => p.status === 'Unpaid');
    const unpaidCount = PAYMENT_LIST.filter((p) => p.status === 'Unpaid').length;
    const paidCount = PAYMENT_LIST.filter((p) => p.status === 'Paid').length;

    return renderShell(`
      <div class="container page-account">
        ${renderAccountSidebar()}
        <section class="account-content">
          <h2 class="page-title">${tx('paymentOrder')}</h2>
          <div class="status-tabs">
            <button class="status-tab ${state.paymentTab === 'unpaid' ? 'active' : ''}" data-payment-tab="unpaid">${tx('unpaid')} (${unpaidCount})</button>
            <button class="status-tab ${state.paymentTab === 'paid' ? 'active' : ''}" data-payment-tab="paid">${tx('paid')} (${paidCount})</button>
          </div>
          <div class="query-bar">
            <button class="btn-ghost small">${tx('batchRefund')}</button>
            <select><option>Rel. NO.</option></select>
            <select><option>Pay NO.</option></select>
            <input placeholder="Start Date - End Date" />
            <button class="btn-primary small">${tx('searchBtn')}</button>
          </div>
          <table class="data-table">
            <thead><tr><th></th><th>Pay No.</th><th>${tx('status')}</th><th>${tx('dueAmt')}</th><th>${tx('paidAmt')}</th><th>${tx('unpaidAmt')}</th><th>${tx('cutoffAmt')}</th><th>${tx('dueDate')}</th><th>${tx('remDays')}</th><th>${tx('payType')}</th><th>${tx('relOrder')}</th><th>${tx('createTime')}</th><th>${tx('opt')}</th></tr></thead>
            <tbody>
              ${filtered.map((r) => `
                <tr>
                  <td><input type="checkbox" /></td>
                  <td><button class="link-btn" data-payment-detail="${r.payNo}">${r.payNo}</button></td>
                  <td>${statusText(state, r.status)}</td>
                  <td>${fmt(r.dueAmt, true)}</td><td>${fmt(r.paidAmt, true)}</td>
                  <td><b>${fmt(r.unpaidAmt, true)}</b></td>
                  <td>${fmt(r.cutoffAmt, true)}</td><td>${r.dueDate}</td><td>${r.remDays}</td>
                  <td>${r.payType}</td><td>${r.relOrder}</td><td>${r.createTime}</td>
                  <td><button class="link-btn" data-payment-detail="${r.payNo}">${tx('collectPay')}</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="pagination right">${renderPagination()}</div>
        </section>
      </div>
      ${state.modal === 'payment-detail' ? renderPaymentDetailModal(state.paymentDetail) : ''}
    `);
  }

  function renderAccountPage() {
    switch (state.accountPage) {
      case 'dispatch': return renderDispatchPage();
      case 'payment': return renderPaymentPage();
      case 'po':
      default: return renderPoPage();
    }
  }

  function startHomeAutoplay() {
    clearInterval(state.homeTimer);
    if (state.route === 'index') {
      state.homeTimer = setInterval(() => {
        state.homeSlide = (state.homeSlide + 1) % HOME_BANNERS.length;
        const track = $('.hero-track');
        const dots = $$('.hero-dot');
        if (track) track.style.transform = `translateX(-${state.homeSlide * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('on', i === state.homeSlide));
      }, 5000);
    }
  }

  function render() {
    parseRoute();
    clearInterval(state.homeTimer);
    let html;
    switch (state.route) {
      case 'index': html = renderHomePage(); break;
      case 'detail': html = renderDetailPageV2(); break;
      case 'wishlist': html = renderWishlistPage(); break;
      case 'account': html = renderAccountPage(); break;
      case 'products':
      default: html = renderProductsPage(); break;
    }
    $('#app').innerHTML = html;
    bindEvents();
    startHomeAutoplay();
  }

  function bindEvents() {
    $$('[data-toggle-dropdown]').forEach((el) => el.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = el.dataset.toggleDropdown;
      state.openDropdown = state.openDropdown === key ? null : key;
      render();
    }));
    $$('[data-set-locale]').forEach((el) => el.addEventListener('click', (e) => {
      e.stopPropagation();
      state.locale = el.dataset.setLocale;
      state.openDropdown = null;
      savePrefs(state);
      render();
    }));
    $$('[data-set-currency]').forEach((el) => el.addEventListener('click', (e) => {
      e.stopPropagation();
      state.currency = el.dataset.setCurrency;
      state.openDropdown = null;
      savePrefs(state);
      render();
    }));
    if (state.openDropdown) {
      setTimeout(() => {
        const onDocClick = () => {
          state.openDropdown = null;
          document.removeEventListener('click', onDocClick);
          render();
        };
        document.addEventListener('click', onDocClick);
      }, 0);
    }

    $$('[data-nav]').forEach((el) => el.addEventListener('click', () => navigate(el.dataset.nav)));
    $$('[data-cat]').forEach((el) => el.addEventListener('click', () => { state.category = el.dataset.cat; navigate('products'); }));
    $$('[data-cat-jump]').forEach((el) => el.addEventListener('click', (e) => {
      e.preventDefault();
      state.category = el.dataset.catJump;
      navigate('products');
    }));
    $$('[data-hero-link]').forEach((el) => el.addEventListener('click', () => navigate(el.dataset.heroLink)));
    $$('[data-hero-slide]').forEach((el) => el.addEventListener('click', () => {
      const dir = el.dataset.heroSlide;
      state.homeSlide = dir === 'next'
        ? (state.homeSlide + 1) % HOME_BANNERS.length
        : (state.homeSlide - 1 + HOME_BANNERS.length) % HOME_BANNERS.length;
      render();
    }));
    $$('[data-hero-dot]').forEach((el) => el.addEventListener('click', () => { state.homeSlide = Number(el.dataset.heroDot); render(); }));
    $$('[data-detail]').forEach((el) => el.addEventListener('click', (e) => {
      if (e.target.closest('[data-fav]')) return;
      navigate('detail', el.dataset.detail);
    }));
    $$('[data-fav]').forEach((el) => el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = el.dataset.fav;
      if (state.favorites.has(id)) state.favorites.delete(id); else state.favorites.add(id);
      showToast(state.favorites.has(id) ? tx('toastFavOn') : tx('toastFavOff'));
      render();
    }));
    $$('[data-sort]').forEach((el) => el.addEventListener('click', () => { state.sort = el.dataset.sort; render(); }));
    $$('[data-page]').forEach((el) => {
      el.addEventListener('click', () => {
        const p = el.dataset.page;
        if (p === 'prev') state.page = Math.max(1, state.page - 1);
        else if (p === 'next') state.page = Math.min(17, state.page + 1);
        else state.page = Number(p);
        render();
      });
    });
    const toggleFilter = $('[data-action="toggle-filter"]');
    if (toggleFilter) toggleFilter.addEventListener('click', () => { state.showFilter = !state.showFilter; render(); });
    $$('[data-detail-tab]').forEach((el) => el.addEventListener('click', () => {
      state.detailTab = el.dataset.detailTab;
      render();
    }));
    $$('[data-detail-thumb]').forEach((el) => el.addEventListener('click', () => { state.detailThumb = Number(el.dataset.detailThumb); render(); }));
    $$('[data-detail-slide]').forEach((el) => el.addEventListener('click', () => {
      const len = (state.detailProduct.gallery || []).length || 1;
      state.detailThumb = el.dataset.detailSlide === 'next'
        ? (state.detailThumb + 1) % len
        : (state.detailThumb - 1 + len) % len;
      render();
    }));
    $$('[data-lifestyle-slide]').forEach((el) => el.addEventListener('click', () => {
      const p = state.detailProduct;
      const len = (p.lifestyleGallery || p.gallery).length;
      state.lifestyleSlide = el.dataset.lifestyleSlide === 'next'
        ? (state.lifestyleSlide + 1) % len
        : (state.lifestyleSlide - 1 + len) % len;
      render();
    }));
    $$('[data-lifestyle-dot]').forEach((el) => el.addEventListener('click', () => { state.lifestyleSlide = Number(el.dataset.lifestyleDot); render(); }));
    $$('[data-rec-slide]').forEach((el) => el.addEventListener('click', () => {
      const key = el.dataset.recSlide;
      const dir = el.dataset.dir;
      const pool = key === 'recSeriesSlide'
        ? getDetailRecommendations(state.detailProduct, 'series')
        : getDetailRecommendations(state.detailProduct, 'category');
      const maxStart = Math.max(0, pool.length - 5);
      state[key] = dir === 'next'
        ? Math.min(maxStart, (state[key] || 0) + 1)
        : Math.max(0, (state[key] || 0) - 1);
      render();
    }));
    const othSelect = $('#othAttrSelect');
    if (othSelect) othSelect.addEventListener('change', () => { state.otherAttrIdx = Number(othSelect.value); });
    $$('[data-sale]').forEach((el) => el.addEventListener('click', () => {
      state.saleType = el.dataset.sale;
      const p = state.detailProduct;
      state.selectedColor = 0;
      state.selectedSize = 0;
      state.selectedMaterial = 0;
      state.detailQty = state.saleType === 'custom' ? (p.customMoq || p.moq) : p.moq;
      render();
    }));
    $$('[data-mode]').forEach((el) => el.addEventListener('click', () => {
      if (el.dataset.mode === 'list') state.listModeOpen = true;
      else { state.detailMode = 'variations'; state.listModeOpen = false; }
      render();
    }));
    $$('[data-color]').forEach((el) => el.addEventListener('click', () => { state.selectedColor = Number(el.dataset.color); render(); }));
    $$('[data-size]').forEach((el) => el.addEventListener('click', () => { state.selectedSize = Number(el.dataset.size); render(); }));
    $$('[data-material]').forEach((el) => el.addEventListener('click', () => { state.selectedMaterial = Number(el.dataset.material); render(); }));
    $$('[data-qty]').forEach((el) => el.addEventListener('click', () => {
      const p = state.detailProduct;
      const minQty = state.saleType === 'custom' ? (p.customMoq || p.moq) : 0;
      state.detailQty = Math.max(minQty, Math.min(p.stock, state.detailQty + Number(el.dataset.qty)));
      render();
    }));
    const qtyInput = $('#detailQtyInput');
    if (qtyInput) qtyInput.addEventListener('change', () => {
      const p = state.detailProduct;
      const minQty = state.saleType === 'custom' ? (p.customMoq || p.moq) : 0;
      state.detailQty = Math.max(minQty, Math.min(p.stock, parseInt(qtyInput.value, 10) || minQty));
      render();
    });
    const addWish = $('[data-action="add-wishlist"]');
    if (addWish) addWish.addEventListener('click', () => showToast(tx('toastWishlist')));
    const toggleFavDetail = $('[data-action="toggle-fav-detail"]');
    if (toggleFavDetail) toggleFavDetail.addEventListener('click', () => {
      const id = state.detailProduct.id;
      if (state.favorites.has(id)) state.favorites.delete(id);
      else state.favorites.add(id);
      showToast(state.favorites.has(id) ? tx('toastFavOn') : tx('toastFavOff'));
      render();
    });
    $$('[data-action="close-list-mode"]').forEach((el) => el.addEventListener('click', () => { state.listModeOpen = false; render(); }));
    const attrToggle = $('#attrToggle');
    if (attrToggle) attrToggle.addEventListener('change', () => { state.showAttr = attrToggle.checked; render(); });
    $$('[data-row-check]').forEach((el) => el.addEventListener('change', () => {
      const row = state.listModeRows.find((r) => r.id === el.dataset.rowCheck);
      if (row) row.checked = el.checked;
      render();
    }));
    $$('[data-row-qty]').forEach((el) => el.addEventListener('click', () => {
      const row = state.listModeRows.find((r) => r.id === el.dataset.rowQty);
      if (row) { row.qty = Math.max(0, row.qty + Number(el.dataset.delta)); if (row.qty > 0) row.checked = true; render(); }
    }));
    const batchAdd = $('[data-action="batch-add-wishlist"]');
    if (batchAdd) batchAdd.addEventListener('click', () => { state.listModeOpen = false; showToast(tx('toastBatchWishlist')); render(); });
    $$('[data-wl-check]').forEach((el) => el.addEventListener('change', () => {
      const item = state.wishlist.find((w) => w.id === el.dataset.wlCheck);
      if (item) item.selected = el.checked;
      render();
    }));
    $$('[data-wl-qty]').forEach((el) => el.addEventListener('click', () => {
      const item = state.wishlist.find((w) => w.id === el.dataset.wlQty);
      if (item) { item.qty = Math.max(item.moq, item.qty + Number(el.dataset.delta)); render(); }
    }));
    $$('[data-wl-del]').forEach((el) => el.addEventListener('click', () => {
      state.wishlist = state.wishlist.filter((w) => w.id !== el.dataset.wlDel);
      showToast(tx('toastDeleted'));
      render();
    }));
    const clearInvalid = $('[data-wl="clear-invalid"]');
    if (clearInvalid) clearInvalid.addEventListener('click', () => {
      state.wishlist = state.wishlist.filter((w) => w.status === 'Current');
      showToast(tx('toastClearInvalid'));
      render();
    });
    const buyNow = $('[data-action="buy-now"]');
    if (buyNow) buyNow.addEventListener('click', () => {
      const hasException = state.wishlist.some((w) => w.selected && w.status !== 'Current');
      if (hasException || state.wishlist.some((w) => w.status === 'Pending Disco')) {
        state.modal = 'exception';
        render();
      } else {
        showToast(tx('toastOrderCreated'));
        navigate('account', 'po');
      }
    });
    $$('[data-action="close-modal"]').forEach((el) => el.addEventListener('click', () => { state.modal = null; state.paymentDetail = null; render(); }));
    const confirmOrder = $('[data-action="confirm-order"]');
    if (confirmOrder) confirmOrder.addEventListener('click', () => {
      state.modal = null;
      showToast(tx('toastOrderCreated'));
      navigate('account', 'po');
    });
    const collectPay = $('[data-action="collect-pay"]');
    if (collectPay) collectPay.addEventListener('click', () => showToast(tx('toastCollectPay')));
    $$('[data-po-tab]').forEach((el) => el.addEventListener('click', () => { state.poTab = el.dataset.poTab; render(); }));
    $$('[data-dispatch-tab]').forEach((el) => el.addEventListener('click', () => { state.dispatchTab = el.dataset.dispatchTab; render(); }));
    $$('[data-payment-tab]').forEach((el) => el.addEventListener('click', () => { state.paymentTab = el.dataset.paymentTab; render(); }));
    $$('[data-po-detail]').forEach((el) => el.addEventListener('click', () => { state.modal = 'po-detail'; render(); }));
    $$('[data-dispatch-detail]').forEach((el) => el.addEventListener('click', () => { state.modal = 'dispatch-detail'; render(); }));
    $$('[data-payment-detail]').forEach((el) => el.addEventListener('click', () => {
      const pay = PAYMENT_LIST.find((p) => p.payNo === el.dataset.paymentDetail);
      state.paymentDetail = pay || PAYMENT_LIST[0];
      state.modal = 'payment-detail';
      render();
    }));
    const paymentJump = $('[data-payment-jump]');
    if (paymentJump) paymentJump.addEventListener('click', () => {
      const pay = PAYMENT_LIST.find((p) => p.payNo === paymentJump.dataset.paymentJump) || PAYMENT_LIST[0];
      state.paymentDetail = pay;
      state.modal = 'payment-detail';
      navigate('account', 'payment');
    });
  }

  window.addEventListener('hashchange', render);
  if (!location.hash) location.hash = '#/detail/p1';
  render();
})();


