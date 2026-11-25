/* پوشاک آوا — فروشگاه نمایشی
   همه‌چیز سمت کاربر است: سبد خرید، حساب و سفارش‌ها در localStorage ذخیره می‌شوند.
   هیچ داده‌ای به سرور فرستاده نمی‌شود و پرداختی انجام نمی‌گیرد. */

"use strict";

/* ---------------- داده‌ها ---------------- */
const CATS = { women: "زنانه", men: "مردانه", accessories: "اکسسوری" };

const PRODUCTS = [
  {
    id: "p01", name: "مانتو بلند کتان", cat: "women", price: 1850000, old: null,
    img: "assets/images/p01-coat.svg", badge: null,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "کرم", hex: "#c9ab7d" }, { name: "زیتونی", hex: "#7a7d4f" }, { name: "سرمه‌ای", hex: "#2e3a52" }],
    desc: "مانتو بلند راسته از پارچه کتان مرغوب؛ مناسب استفاده روزمره و مهمانی‌های غیررسمی. دوخت تمیز، کمربند هماهنگ و جیب‌های کاربردی دارد.",
    details: ["جنس: کتان ۱۰۰٪", "قد: بلند، تا زیر زانو", "شست‌وشو: با آب سرد، جدا از لباس‌های رنگی", "مدل: راسته با کمربند"],
  },
  {
    id: "p02", name: "پیراهن مجلسی گلدار", cat: "women", price: 2400000, old: 2900000,
    img: "assets/images/p02-dress.svg", badge: "پرفروش",
    sizes: ["S", "M", "L"],
    colors: [{ name: "گلبهی", hex: "#cf8f80" }, { name: "آبی", hex: "#7fa3c4" }],
    desc: "پیراهن مجلسی میدی با طرح گل‌های بهاری؛ دامن چین‌دار و آستین کوتاه. انتخابی راحت و شیک برای مهمانی‌ها.",
    details: ["جنس: ویسکوز", "قد: میدی", "آستین: کوتاه", "زیپ مخفی در پشت"],
  },
  {
    id: "p03", name: "تونیک نخی تابستانی", cat: "women", price: 980000, old: null,
    img: "assets/images/p03-tunic.svg", badge: null,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "سفید", hex: "#f4efe4" }, { name: "سبز نعنایی", hex: "#9db8a0" }],
    desc: "تونیک نخی خنک و سبک با یقه گرد؛ برای روزهای گرم تابستان و استایل‌های لایه‌ای.",
    details: ["جنس: نخ پنبه", "قد: تا روی باسن", "آستین: سه‌ربع", "قابلیت اتو با حرارت متوسط"],
  },
  {
    id: "p04", name: "شلوار جین زنانه مام‌فیت", cat: "women", price: 1450000, old: null,
    img: "assets/images/p04-jeans.svg", badge: null,
    sizes: ["36", "38", "40", "42", "44"],
    colors: [{ name: "آبی روشن", hex: "#7d9cbd" }, { name: "آبی تیره", hex: "#3c5a78" }],
    desc: "شلوار جین مام‌فیت با فاق بلند و پاچه راسته؛ پارچه کش‌دار برای راحتی بیشتر.",
    details: ["جنس: جین کش‌دار", "فاق: بلند", "پاچه: راسته", "جیب: چهار جیب کلاسیک"],
  },
  {
    id: "p05", name: "تیشرت نخی ساده", cat: "men", price: 480000, old: null,
    img: "assets/images/p05-tshirt.svg", badge: null,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "سفید", hex: "#f4f2ec" }, { name: "مشکی", hex: "#26221e" }, { name: "طوسی", hex: "#9aa0a3" }],
    desc: "تیشرت نخی ساده و تن‌خور معمولی؛ پایه‌ی هر استایل روزمره، با یقه گرد تقویت‌شده.",
    details: ["جنس: نخ پنبه ۱۰۰٪", "یقه: گرد", "تن‌خور: معمولی", "ضد آب‌رفتگی"],
  },
  {
    id: "p06", name: "هودی کلاه‌دار", cat: "men", price: 1350000, old: null,
    img: "assets/images/p06-hoodie.svg", badge: "جدید",
    sizes: ["M", "L", "XL"],
    colors: [{ name: "طوسی", hex: "#90959a" }, { name: "مشکی", hex: "#26221e" }, { name: "سبز", hex: "#4d6b52" }],
    desc: "هودی کلاه‌دار با جیب کانگورویی و بند قابل تنظیم؛ داخل کرکی و گرم، مناسب پاییز و زمستان.",
    details: ["جنس: دورس داخل کرک", "کلاه: دو لایه با بند", "جیب: کانگورویی", "زیپ: بدون زیپ، سرهمی"],
  },
  {
    id: "p07", name: "پیراهن مردانه رسمی", cat: "men", price: 1650000, old: null,
    img: "assets/images/p07-shirt.webp", badge: null,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [{ name: "آبی روشن", hex: "#a9c4e2" }, { name: "سفید", hex: "#f4f2ec" }],
    desc: "پیراهن مردانه رسمی با پارچه نخی لطیف و دکمه‌های مرواریدی؛ مناسب محل کار و مهمانی‌های رسمی.",
    details: ["جنس: نخ پنبه", "یقه: کلاسیک", "آستین: بلند با دکمه سرآستین", "نیاز به اتو دارد"],
  },
  {
    id: "p08", name: "شلوار کتان مردانه", cat: "men", price: 1290000, old: null,
    img: "assets/images/p08-chinos.webp", badge: null,
    sizes: ["46", "48", "50", "52", "54"],
    colors: [{ name: "کرم", hex: "#d3c4a8" }, { name: "سرمه‌ای", hex: "#2e3a52" }],
    desc: "شلوار کتان مردانه با تن‌خور راسته؛ سبک، تنفس‌پذیر و مناسب چهار فصل.",
    details: ["جنس: کتان", "تن‌خور: راسته", "کمر: دکمه و زیپ", "جیب: دو جیب جلو، دو جیب عقب"],
  },
  {
    id: "p09", name: "روسری حریر طرح‌دار", cat: "accessories", price: 620000, old: null,
    img: "assets/images/p09-scarf.webp", badge: "پرفروش",
    sizes: ["تک‌سایز"],
    colors: [{ name: "نارنجی", hex: "#c96a2e" }, { name: "آبی", hex: "#4a6b8a" }],
    desc: "روسری حریر با طرح کلاسیک و رنگ‌های گرم؛ لبه‌های دوخته‌شده و بافت نرم و لطیف.",
    details: ["جنس: حریر", "ابعاد: ۱۴۰×۱۴۰ سانتی‌متر", "لبه: دوردوزی", "شست‌وشو: دستی"],
  },
  {
    id: "p10", name: "کیف دستی چرم", cat: "accessories", price: 2900000, old: 3400000,
    img: "assets/images/p10-handbag.webp", badge: null,
    sizes: ["تک‌سایز"],
    colors: [{ name: "عسلی", hex: "#a9702f" }, { name: "قهوه‌ای", hex: "#6b4423" }],
    desc: "کیف دستی چرم طبیعی با بند دوشی قابل تنظیم؛ جادار، با جیب داخلی زیپ‌دار و آستر نرم.",
    details: ["جنس: چرم طبیعی گاوی", "بند: دستی + دوشی قابل تنظیم", "جیب داخلی: زیپ‌دار", "ابعاد: ۳۲×۲۴×۱۲ سانتی‌متر"],
  },
  {
    id: "p11", name: "کلاه بافت زمستانی", cat: "accessories", price: 540000, old: null,
    img: "assets/images/p11-beanie.webp", badge: null,
    sizes: ["تک‌سایز"],
    colors: [{ name: "کرم", hex: "#ece4d4" }, { name: "طوسی", hex: "#9aa0a3" }],
    desc: "کلاه بافت نرم و گرم با بافت درشت؛ مناسب روزهای سرد زمستان.",
    details: ["جنس: اکریلیک نرم", "بافت: درشت", "قابل شست‌وشو با دست"],
  },
  {
    id: "p12", name: "کمربند چرم مردانه", cat: "accessories", price: 390000, old: null,
    img: "assets/images/p12-belt.webp", badge: null,
    sizes: ["90", "100", "110", "120"],
    colors: [{ name: "قهوه‌ای", hex: "#7a4a26" }, { name: "مشکی", hex: "#26221e" }],
    desc: "کمربند چرم طبیعی با سگک فلزی ساده؛ عرض ۳٫۵ سانتی‌متر و دوخت محکم.",
    details: ["جنس: چرم طبیعی", "عرض: ۳٫۵ سانتی‌متر", "سگک: فلزی"],
  },
];

const FREE_SHIP_MIN = 1500000;
const SHIP_COST = 60000;

/* ---------------- ابزارها ---------------- */
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
const view = $("#view");

function fa(n) { return Number(n).toLocaleString("fa-IR"); }
function price(n) { return fa(n) + " تومان"; }
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function productById(id) { return PRODUCTS.find((p) => p.id === id); }

let toastTimer = null;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
}

/* ---------------- ذخیره‌سازی محلی ---------------- */
const store = {
  read(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  },
  write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* فضای ذخیره‌سازی پر است */ } },
};

let cart = store.read("ava_cart_v1", []);
function saveCart() { store.write("ava_cart_v1", cart); updateCartCount(); }
function cartQty() { return cart.reduce((s, i) => s + i.qty, 0); }
function cartTotal() {
  return cart.reduce((s, i) => {
    const p = productById(i.id);
    return p ? s + p.price * i.qty : s;
  }, 0);
}
function updateCartCount() {
  const n = cartQty();
  const badge = $("#cartCount");
  badge.hidden = n === 0;
  badge.textContent = fa(n);
}
function addToCart(id, size, color, qty) {
  const found = cart.find((i) => i.id === id && i.size === size && i.color === color);
  if (found) found.qty = Math.min(9, found.qty + qty);
  else cart.push({ id, size, color, qty });
  saveCart();
  toast("به سبد خرید اضافه شد");
}

/* ---------------- مسیریاب ---------------- */
function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [pathPart, queryPart] = raw.split("?");
  const parts = pathPart.split("/").filter(Boolean);
  return { parts, query: new URLSearchParams(queryPart || "") };
}

function go(hash) { location.hash = hash; }

function render() {
  const { parts, query } = parseHash();
  const route = parts[0] || "";
  window.scrollTo({ top: 0 });
  $("#navToggle").setAttribute("aria-expanded", "false");
  $("#mainNav").classList.remove("open");

  $$("[data-nav]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active",
      (route === "" && href === "#/") ||
      (route === "shop" && href === "#/shop") ||
      (route === "about" && href === "#/about") ||
      (route === "contact" && href === "#/contact"));
  });

  if (route === "") viewHome();
  else if (route === "shop") viewShop(query);
  else if (route === "product") viewProduct(parts[1]);
  else if (route === "cart") viewCart();
  else if (route === "checkout") viewCheckout();
  else if (route === "success") viewSuccess(query.get("code") || "");
  else if (route === "about") viewAbout();
  else if (route === "contact") viewContact();
  else if (route === "account") viewAccount();
  else viewNotFound();
}

window.addEventListener("hashchange", render);

/* ---------------- اجزای مشترک ---------------- */
function productCard(p) {
  return `
  <article class="product-card">
    <a class="product-media" href="#/product/${p.id}" aria-label="${esc(p.name)}">
      ${p.badge ? `<span class="product-badge">${esc(p.badge)}</span>` : ""}
      <img src="${p.img}" alt="${esc(p.name)}" loading="lazy">
    </a>
    <div class="product-body">
      <span class="product-cat">${CATS[p.cat]}</span>
      <h3 class="product-name"><a href="#/product/${p.id}">${esc(p.name)}</a></h3>
      <div class="product-price">
        <span class="price">${price(p.price)}</span>
        ${p.old ? `<span class="price-old">${price(p.old)}</span>` : ""}
      </div>
      <button class="btn btn-sm" data-quick-add="${p.id}">افزودن به سبد</button>
    </div>
  </article>`;
}

function bindQuickAdd(scope) {
  $$("[data-quick-add]", scope).forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = productById(btn.getAttribute("data-quick-add"));
      if (!p) return;
      addToCart(p.id, p.sizes[0], p.colors[0].name, 1);
    });
  });
}

/* ---------------- خانه ---------------- */
function viewHome() {
  const featured = ["p02", "p07", "p09", "p10"].map(productById);
  view.innerHTML = `
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <h1>استایل تازه، <em>برای هر روز</em></h1>
        <p>پوشاک زنانه، مردانه و اکسسوری با کیفیت خوب و قیمت منصفانه؛ از مانتو و پیراهن تا کیف و روسری — همه‌چیز برای یک استایل کامل.</p>
        <div class="hero-actions">
          <a class="btn" href="#/shop">مشاهده فروشگاه</a>
          <a class="btn btn-ghost" href="#/shop?cat=women">زنانه</a>
          <a class="btn btn-ghost" href="#/shop?cat=men">مردانه</a>
        </div>
      </div>
      <div class="hero-media">
        <img src="assets/images/hero.webp" alt="مدل‌هایی با پوشاک آوا در یک فروشگاه روشن">
      </div>
    </div>
  </section>

  <section class="section container">
    <div class="section-head"><h2>دسته‌بندی‌ها</h2></div>
    <div class="cat-grid">
      <a class="cat-card" href="#/shop?cat=women">
        <img src="assets/images/p01-coat.svg" alt="پوشاک زنانه">
        <div class="cat-body"><h3>زنانه</h3><p>مانتو، پیراهن، تونیک و جین</p></div>
      </a>
      <a class="cat-card" href="#/shop?cat=men">
        <img src="assets/images/p07-shirt.webp" alt="پوشاک مردانه">
        <div class="cat-body"><h3>مردانه</h3><p>تیشرت، هودی، پیراهن و شلوار</p></div>
      </a>
      <a class="cat-card" href="#/shop?cat=accessories">
        <img src="assets/images/p10-handbag.webp" alt="اکسسوری">
        <div class="cat-body"><h3>اکسسوری</h3><p>روسری، کیف، کلاه و کمربند</p></div>
      </a>
    </div>
  </section>

  <section class="section container">
    <div class="section-head">
      <h2>محصولات منتخب</h2>
      <a class="link-more" href="#/shop">مشاهده همه ←</a>
    </div>
    <div class="product-grid">${featured.map(productCard).join("")}</div>
  </section>

  <section class="section container">
    <div class="features">
      <div class="feature">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg>
        <h3>ارسال سریع</h3><p>ارسال به سراسر کشور؛ رایگان برای سفارش‌های بالای ۱٬۵۰۰٬۰۰۰ تومان</p>
      </div>
      <div class="feature">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 8v4l3 2"/></svg>
        <h3>۷ روز ضمانت بازگشت</h3><p>اگر سایز یا مدل مناسب نبود، تا ۷ روز پس می‌گیریم</p>
      </div>
      <div class="feature">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
        <h3>پرداخت امن</h3><p>پرداخت آنلاین امن یا پرداخت هنگام تحویل</p>
      </div>
      <div class="feature">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13a8 8 0 0 1 16 0"/><rect x="2" y="13" width="4" height="6" rx="1.5"/><rect x="18" y="13" width="4" height="6" rx="1.5"/><path d="M20 19a3 3 0 0 1-3 3h-3"/></svg>
        <h3>پشتیبانی آنلاین</h3><p>پاسخ‌گویی شنبه تا پنجشنبه، ۹ تا ۱۸</p>
      </div>
    </div>

    <div class="newsletter">
      <h2>از تخفیف‌ها زودتر باخبر شوید</h2>
      <p>ایمیلت را بگذار تا خبرهای فروش ویژه را برایت بفرستیم. (نمایشی — ایمیلی ذخیره یا ارسال نمی‌شود.)</p>
      <form class="newsletter-form" id="newsletterForm">
        <input type="email" required placeholder="ایمیل شما" aria-label="ایمیل شما" dir="ltr">
        <button class="btn" type="submit">عضویت</button>
      </form>
    </div>
  </section>`;
  bindQuickAdd(view);
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    toast("عضویت شما ثبت شد — ممنون!");
  });
}

/* ---------------- فروشگاه ---------------- */
function viewShop(query) {
  const q = (query.get("q") || "").trim();
  const cat = query.get("cat") || "all";
  const max = Number(query.get("max") || 3000000);
  const size = query.get("size") || "all";
  const sort = query.get("sort") || "new";

  let list = PRODUCTS.filter((p) => {
    if (cat !== "all" && p.cat !== cat) return false;
    if (p.price > max) return false;
    if (size !== "all" && !p.sizes.includes(size)) return false;
    if (q && !(p.name + " " + CATS[p.cat]).includes(q)) return false;
    return true;
  });

  if (sort === "cheap") list = list.slice().sort((a, b) => a.price - b.price);
  else if (sort === "expensive") list = list.slice().sort((a, b) => b.price - a.price);
  else if (sort === "discount") list = list.slice().sort((a, b) => (b.old ? b.old - b.price : 0) - (a.old ? a.old - a.price : 0));

  const allSizes = [...new Set(PRODUCTS.flatMap((p) => p.sizes))];

  view.innerHTML = `
  <section class="section container">
    <h1>فروشگاه</h1>
    <p style="color:var(--muted)">همه محصولات — جستجو کن، فیلتر بگذار و سایزت را پیدا کن.</p>

    <form class="filters" id="filterForm">
      <div class="filter-field">
        <label for="fSearch">جستجو</label>
        <input type="search" id="fSearch" placeholder="نام محصول… مثلا مانتو" value="${esc(q)}">
      </div>
      <div class="filter-field">
        <label for="fSize">سایز</label>
        <select id="fSize">
          <option value="all">همه سایزها</option>
          ${allSizes.map((s) => `<option value="${esc(s)}" ${size === s ? "selected" : ""}>${esc(s)}</option>`).join("")}
        </select>
      </div>
      <div class="filter-field">
        <label for="fMax">حداکثر قیمت: <span class="range-val" id="maxVal">${price(max)}</span></label>
        <input type="range" id="fMax" min="300000" max="3000000" step="100000" value="${max}">
      </div>
      <div class="filter-field">
        <label for="fSort">مرتب‌سازی</label>
        <select id="fSort">
          <option value="new" ${sort === "new" ? "selected" : ""}>جدیدترین</option>
          <option value="cheap" ${sort === "cheap" ? "selected" : ""}>ارزان‌ترین</option>
          <option value="expensive" ${sort === "expensive" ? "selected" : ""}>گران‌ترین</option>
          <option value="discount" ${sort === "discount" ? "selected" : ""}>بیشترین تخفیف</option>
        </select>
      </div>
      <div class="filter-field" style="grid-column: 1 / -1;">
        <div class="chips" role="group" aria-label="دسته‌بندی">
          <button type="button" class="chip ${cat === "all" ? "active" : ""}" data-cat="all">همه</button>
          ${Object.entries(CATS).map(([k, v]) => `<button type="button" class="chip ${cat === k ? "active" : ""}" data-cat="${k}">${v}</button>`).join("")}
        </div>
      </div>
    </form>

    <p class="results-meta">${fa(list.length)} محصول ${q ? `برای «${esc(q)}»` : ""} ${cat !== "all" ? `در دسته ${CATS[cat]}` : ""}</p>

    ${list.length
      ? `<div class="product-grid">${list.map(productCard).join("")}</div>`
      : `<div class="empty-state"><h3>محصولی پیدا نشد</h3><p>فیلترها را کمتر کن یا عبارت دیگری جستجو کن.</p><button class="btn btn-ghost" id="clearFilters">پاک کردن فیلترها</button></div>`}
  </section>`;

  bindQuickAdd(view);

  const form = $("#filterForm");
  const apply = () => {
    const params = new URLSearchParams();
    const qv = $("#fSearch").value.trim();
    const cv = form.querySelector(".chip.active").getAttribute("data-cat");
    const sv = $("#fSize").value;
    const mv = $("#fMax").value;
    const ov = $("#fSort").value;
    if (qv) params.set("q", qv);
    if (cv !== "all") params.set("cat", cv);
    if (sv !== "all") params.set("size", sv);
    if (Number(mv) < 3000000) params.set("max", mv);
    if (ov !== "new") params.set("sort", ov);
    const qs = params.toString();
    go("#/shop" + (qs ? "?" + qs : ""));
  };

  let debounce = null;
  $("#fSearch").addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(apply, 450);
  });
  $("#fSize").addEventListener("change", apply);
  $("#fSort").addEventListener("change", apply);
  $("#fMax").addEventListener("input", (e) => { $("#maxVal").textContent = price(Number(e.target.value)); });
  $("#fMax").addEventListener("change", apply);
  $$(".chip", form).forEach((chip) => {
    chip.addEventListener("click", () => {
      $$(".chip", form).forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      apply();
    });
  });
  form.addEventListener("submit", (e) => { e.preventDefault(); apply(); });
  const clearBtn = $("#clearFilters");
  if (clearBtn) clearBtn.addEventListener("click", () => go("#/shop"));
}

/* ---------------- صفحه محصول ---------------- */
function viewProduct(id) {
  const p = productById(id);
  if (!p) { viewNotFound(); return; }
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  view.innerHTML = `
  <div class="container">
    <nav class="breadcrumb" aria-label="مسیر">
      <a href="#/">خانه</a> / <a href="#/shop">فروشگاه</a> / <a href="#/shop?cat=${p.cat}">${CATS[p.cat]}</a> / ${esc(p.name)}
    </nav>
    <div class="product-detail">
      <div class="product-gallery">
        <img src="${p.img}" alt="${esc(p.name)}">
      </div>
      <div class="product-info">
        <span class="product-cat">${CATS[p.cat]}${p.badge ? " — " + esc(p.badge) : ""}</span>
        <h1>${esc(p.name)}</h1>
        <div class="detail-price">
          <span class="price">${price(p.price)}</span>
          ${p.old ? `<span class="price-old">${price(p.old)}</span>` : ""}
        </div>
        <p class="detail-desc">${esc(p.desc)}</p>

        <span class="option-label" id="sizeLabel">سایز — انتخاب: <b id="sizePicked">${esc(p.sizes[0])}</b></span>
        <div class="size-pills" role="group" aria-labelledby="sizeLabel">
          ${p.sizes.map((s, i) => `<button type="button" class="size-pill ${i === 0 ? "selected" : ""}" data-size="${esc(s)}">${esc(s)}</button>`).join("")}
        </div>

        <span class="option-label" id="colorLabel">رنگ — انتخاب: <b id="colorPicked">${esc(p.colors[0].name)}</b></span>
        <div class="color-swatches" role="group" aria-labelledby="colorLabel">
          ${p.colors.map((c, i) => `<button type="button" class="color-swatch ${i === 0 ? "selected" : ""}" data-color="${esc(c.name)}" style="background:${c.hex}" title="${esc(c.name)}" aria-label="رنگ ${esc(c.name)}"></button>`).join("")}
        </div>

        <div class="buy-row">
          <div class="qty-stepper">
            <button type="button" id="qtyMinus" aria-label="کم کردن تعداد">−</button>
            <output id="qtyOut">۱</output>
            <button type="button" id="qtyPlus" aria-label="زیاد کردن تعداد">+</button>
          </div>
          <button class="btn" id="addBtn">افزودن به سبد خرید</button>
        </div>

        <div class="ship-note">ارسال به سراسر کشور؛ سفارش‌های بالای ${price(FREE_SHIP_MIN)} رایگان ارسال می‌شوند. ۷ روز ضمانت بازگشت دارد.</div>

        <dl class="detail-meta">
          <dt>مشخصات</dt>
          ${p.details.map((d) => `<dd>• ${esc(d)}</dd>`).join("")}
          <dt>کد محصول</dt><dd dir="ltr">${p.id.toUpperCase()}-AVA</dd>
        </dl>
      </div>
    </div>

    ${related.length ? `
    <section class="section">
      <div class="section-head"><h2>محصولات مرتبط</h2></div>
      <div class="product-grid">${related.map(productCard).join("")}</div>
    </section>` : ""}
  </div>`;

  bindQuickAdd(view);

  let size = p.sizes[0];
  let color = p.colors[0].name;
  let qty = 1;

  $$(".size-pill", view).forEach((b) => b.addEventListener("click", () => {
    $$(".size-pill", view).forEach((x) => x.classList.remove("selected"));
    b.classList.add("selected");
    size = b.getAttribute("data-size");
    $("#sizePicked").textContent = size;
  }));
  $$(".color-swatch", view).forEach((b) => b.addEventListener("click", () => {
    $$(".color-swatch", view).forEach((x) => x.classList.remove("selected"));
    b.classList.add("selected");
    color = b.getAttribute("data-color");
    $("#colorPicked").textContent = color;
  }));
  const qtyOut = $("#qtyOut");
  $("#qtyMinus").addEventListener("click", () => { qty = Math.max(1, qty - 1); qtyOut.textContent = fa(qty); });
  $("#qtyPlus").addEventListener("click", () => { qty = Math.min(9, qty + 1); qtyOut.textContent = fa(qty); });
  $("#addBtn").addEventListener("click", () => addToCart(p.id, size, color, qty));
}

/* ---------------- سبد خرید ---------------- */
function cartRowsHTML() {
  return cart.map((item, idx) => {
    const p = productById(item.id);
    if (!p) return "";
    return `
    <div class="cart-item">
      <a href="#/product/${p.id}"><img src="${p.img}" alt="${esc(p.name)}"></a>
      <div>
        <h3><a href="#/product/${p.id}">${esc(p.name)}</a></h3>
        <p class="variant">سایز ${esc(item.size)} — رنگ ${esc(item.color)}</p>
        <div class="qty-stepper">
          <button type="button" data-dec="${idx}" aria-label="کم کردن تعداد">−</button>
          <output>${fa(item.qty)}</output>
          <button type="button" data-inc="${idx}" aria-label="زیاد کردن تعداد">+</button>
        </div>
        <br>
        <button type="button" class="remove-link" data-remove="${idx}">حذف از سبد</button>
      </div>
      <div class="cart-item-price">${price(p.price * item.qty)}</div>
    </div>`;
  }).join("");
}

function viewCart() {
  if (cart.length === 0) {
    view.innerHTML = `
    <section class="section container">
      <h1>سبد خرید</h1>
      <div class="empty-state">
        <h3>سبد خریدت خالی است</h3>
        <p>هنوز چیزی انتخاب نکرده‌ای؛ از فروشگاه دیدن کن.</p>
        <a class="btn" href="#/shop">رفتن به فروشگاه</a>
      </div>
    </section>`;
    return;
  }

  const subtotal = cartTotal();
  const shipping = subtotal >= FREE_SHIP_MIN ? 0 : SHIP_COST;

  view.innerHTML = `
  <section class="section container">
    <h1>سبد خرید</h1>
    <div class="cart-layout">
      <div>${cartRowsHTML()}</div>
      <aside class="summary-card" aria-label="خلاصه سفارش">
        <h2>خلاصه سفارش</h2>
        <div class="summary-row"><span>جمع اقلام</span><span>${price(subtotal)}</span></div>
        <div class="summary-row"><span>هزینه ارسال</span><span>${shipping === 0 ? "رایگان" : price(shipping)}</span></div>
        <div class="summary-row total"><span>مبلغ نهایی</span><span>${price(subtotal + shipping)}</span></div>
        ${shipping > 0 ? `<p class="free-ship-note">با ${price(FREE_SHIP_MIN - subtotal)} خرید بیشتر، ارسال رایگان می‌شود.</p>` : `<p class="free-ship-note">ارسال این سفارش رایگان است.</p>`}
        <a class="btn btn-block" href="#/checkout" style="margin-top:16px">ادامه و تسویه حساب</a>
        <a class="btn btn-ghost btn-block" href="#/shop" style="margin-top:10px">ادامه خرید</a>
      </aside>
    </div>
  </section>`;

  $$("[data-inc]", view).forEach((b) => b.addEventListener("click", () => {
    const i = Number(b.getAttribute("data-inc"));
    cart[i].qty = Math.min(9, cart[i].qty + 1);
    saveCart(); viewCart();
  }));
  $$("[data-dec]", view).forEach((b) => b.addEventListener("click", () => {
    const i = Number(b.getAttribute("data-dec"));
    cart[i].qty -= 1;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    saveCart(); viewCart();
  }));
  $$("[data-remove]", view).forEach((b) => b.addEventListener("click", () => {
    cart.splice(Number(b.getAttribute("data-remove")), 1);
    saveCart();
    toast("از سبد خرید حذف شد");
    viewCart();
  }));
}

/* ---------------- تسویه حساب ---------------- */
function viewCheckout() {
  if (cart.length === 0) { go("#/cart"); return; }
  const user = store.read("ava_user_v1", null);
  const subtotal = cartTotal();
  const shipping = subtotal >= FREE_SHIP_MIN ? 0 : SHIP_COST;

  view.innerHTML = `
  <section class="section container">
    <h1>تسویه حساب</h1>
    <div class="notice">این فروشگاه <strong>نمایشی</strong> است — با ثبت سفارش، هیچ پرداختی انجام نمی‌شود و کالایی ارسال نخواهد شد.</div>
    <div class="cart-layout">
      <form class="form-card" id="checkoutForm" novalidate>
        <div class="form-grid">
          <div class="form-field">
            <label for="coName">نام و نام خانوادگی <span class="req">*</span></label>
            <input id="coName" required minlength="3" placeholder="مثلا سارا محمدی" value="${user ? esc(user.name) : ""}">
            <span class="field-error"></span>
          </div>
          <div class="form-field">
            <label for="coPhone">موبایل <span class="req">*</span></label>
            <input id="coPhone" required inputmode="tel" dir="ltr" placeholder="09123456789" value="${user ? esc(user.phone || "") : ""}">
            <span class="field-error"></span>
          </div>
          <div class="form-field">
            <label for="coCity">شهر <span class="req">*</span></label>
            <input id="coCity" required placeholder="تهران">
            <span class="field-error"></span>
          </div>
          <div class="form-field">
            <label for="coPostal">کد پستی</label>
            <input id="coPostal" inputmode="numeric" dir="ltr" placeholder="1234567890">
            <span class="field-error"></span>
          </div>
          <div class="form-field full">
            <label for="coAddress">آدرس کامل <span class="req">*</span></label>
            <textarea id="coAddress" rows="2" required placeholder="خیابان، کوچه، پلاک، واحد…"></textarea>
            <span class="field-error"></span>
          </div>
          <div class="form-field full">
            <label>روش پرداخت <span class="req">*</span></label>
            <div class="radio-group">
              <label class="radio-card">
                <input type="radio" name="pay" value="online" checked>
                <span><strong>پرداخت آنلاین (نمایشی)</strong><span>درگاه پرداخت واقعی متصل نیست؛ فقط شبیه‌سازی می‌شود.</span></span>
              </label>
              <label class="radio-card">
                <input type="radio" name="pay" value="cod">
                <span><strong>پرداخت هنگام تحویل</strong><span>پرداخت موقع دریافت کالا انجام می‌شود.</span></span>
              </label>
            </div>
          </div>
          <div class="form-field full">
            <label for="coNote">توضیحات سفارش (اختیاری)</label>
            <textarea id="coNote" rows="2" placeholder="مثلا: لطفاً قبل از ارسال تماس بگیرید"></textarea>
          </div>
        </div>
        <button class="btn btn-block" type="submit" style="margin-top:20px">ثبت سفارش نمایشی</button>
      </form>

      <aside class="summary-card" aria-label="خلاصه سفارش">
        <h2>سفارش شما</h2>
        ${cart.map((item) => {
          const p = productById(item.id);
          return p ? `<div class="summary-row"><span>${esc(p.name)} × ${fa(item.qty)}</span><span>${price(p.price * item.qty)}</span></div>` : "";
        }).join("")}
        <div class="summary-row"><span>هزینه ارسال</span><span>${shipping === 0 ? "رایگان" : price(shipping)}</span></div>
        <div class="summary-row total"><span>مبلغ نهایی</span><span>${price(subtotal + shipping)}</span></div>
      </aside>
    </div>
  </section>`;

  $("#checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    const need = (id, test, msg) => {
      const input = $(id);
      const field = input.closest(".form-field");
      const err = $(".field-error", field);
      if (!test(input.value.trim())) {
        field.classList.add("invalid");
        err.textContent = msg;
        ok = false;
      } else {
        field.classList.remove("invalid");
        err.textContent = "";
      }
    };
    need("#coName", (v) => v.length >= 3, "نام را کامل وارد کن.");
    need("#coPhone", (v) => /^09\d{9}$/.test(v.replace(/[\s-]/g, "")), "موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
    need("#coCity", (v) => v.length >= 2, "شهر را وارد کن.");
    need("#coAddress", (v) => v.length >= 10, "آدرس کامل را وارد کن.");
    if (!ok) return;

    const code = "AVA-" + String(Math.floor(100000 + Math.random() * 900000));
    const orders = store.read("ava_orders_v1", []);
    orders.unshift({
      code,
      date: new Date().toLocaleDateString("fa-IR"),
      name: $("#coName").value.trim(),
      city: $("#coCity").value.trim(),
      pay: (document.querySelector('input[name="pay"]:checked') || {}).value || "online",
      items: cart.map((i) => {
        const p = productById(i.id);
        return { name: p ? p.name : i.id, size: i.size, color: i.color, qty: i.qty, price: p ? p.price : 0 };
      }),
      total: subtotal + shipping,
    });
    store.write("ava_orders_v1", orders);
    cart = [];
    saveCart();
    go("#/success?code=" + code);
  });
}

/* ---------------- موفقیت سفارش ---------------- */
function viewSuccess(code) {
  const orders = store.read("ava_orders_v1", []);
  const order = orders.find((o) => o.code === code);
  view.innerHTML = `
  <section class="section container">
    <div class="form-card success-box">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <h1>سفارشت ثبت شد!</h1>
      <p>ممنون از اعتمادت. این یک سفارش نمایشی است — پرداختی انجام نشده و کالایی ارسال نمی‌شود.</p>
      <div class="order-code" dir="ltr">${esc(code)}</div>
      ${order ? `<p>مبلغ سفارش: <strong>${price(order.total)}</strong> — ${esc(order.city)}</p>` : ""}
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <a class="btn" href="#/account">پیگیری سفارش‌ها</a>
        <a class="btn btn-ghost" href="#/shop">بازگشت به فروشگاه</a>
      </div>
    </div>
  </section>`;
}

/* ---------------- درباره ما ---------------- */
function viewAbout() {
  view.innerHTML = `
  <section class="section container">
    <div class="about-grid">
      <div>
        <h1>درباره پوشاک آوا</h1>
        <p>پوشاک آوا یک فروشگاه اینترنتی پوشاک است؛ جایی برای پیدا کردن لباس‌های روزمره باکیفیت، با قیمت منصفانه و بدون دردسر. ما باور داریم استایل خوب نباید گران و پیچیده باشد.</p>
        <p>در این فروشگاه سه دسته اصلی داریم: پوشاک زنانه، پوشاک مردانه و اکسسوری — از مانتو و پیراهن تا کیف و روسری. هر محصول با مشخصات کامل، راهنمای سایز و عکس واقعی معرفی شده تا انتخاب راحت باشد.</p>
        <p><strong>نکته مهم:</strong> این وب‌سایت یک نمونه نمایشی (دمو) است؛ فروشگاه واقعی نیست و سفارش‌ها ثبت یا ارسال نمی‌شوند.</p>
      </div>
      <img src="assets/images/about.webp" alt="داخل فروشگاه پوشاک آوا">
    </div>
    <div class="values">
      <div class="value-card"><h3>کیفیت پیش از کمیت</h3><p>هر محصول پیش از عرضه از نظر دوخت، پارچه و تن‌خور بررسی می‌شود.</p></div>
      <div class="value-card"><h3>قیمت منصفانه</h3><p>قیمت‌ها شفاف‌اند؛ تخفیف‌ها واقعی‌اند و هزینه ارسال بالای ۱٬۵۰۰٬۰۰۰ تومان رایگان است.</p></div>
      <div class="value-card"><h3>بازگشت آسان</h3><p>تا ۷ روز بعد از تحویل، اگر سایز یا مدل مناسب نبود، کالا را پس می‌گیریم.</p></div>
    </div>
    <div class="features" style="margin-top:28px">
      <div class="feature"><h3>۳</h3><p>دسته‌بندی اصلی</p></div>
      <div class="feature"><h3>۱۲</h3><p>محصول در فروشگاه نمایشی</p></div>
      <div class="feature"><h3>۷ روز</h3><p>ضمانت بازگشت کالا</p></div>
      <div class="feature"><h3>۲۴ ساعته</h3><p>ثبت سفارش آنلاین</p></div>
    </div>
  </section>`;
}

/* ---------------- تماس با ما ---------------- */
function viewContact() {
  view.innerHTML = `
  <section class="section container">
    <h1>تماس با ما</h1>
    <p style="color:var(--muted)">سؤال داری یا سایزت را پیدا نمی‌کنی؟ پیام بگذار؛ پاسخ می‌دهیم. (فرم نمایشی است و پیامی ارسال نمی‌شود.)</p>
    <div class="contact-grid">
      <div class="contact-info form-card">
        <h2 style="font-size:1.15rem">اطلاعات تماس</h2>
        <p><strong>آدرس:</strong> تهران، خیابان ولیعصر، پلاک ۱۲۳ (آدرس نمایشی)</p>
        <p><strong>تلفن:</strong> <span dir="ltr">021 - 8877 6655</span></p>
        <p><strong>ایمیل:</strong> <span dir="ltr">hello@ava-demo.ir</span></p>
        <p><strong>ساعت کاری:</strong> شنبه تا پنجشنبه، ۹ تا ۱۸</p>
        <p><strong>پشتیبانی:</strong> پاسخ‌گویی در ساعات کاری</p>
      </div>
      <form class="form-card" id="contactForm" novalidate>
        <div class="form-grid">
          <div class="form-field">
            <label for="ctName">نام <span class="req">*</span></label>
            <input id="ctName" required minlength="2" placeholder="نام شما">
            <span class="field-error"></span>
          </div>
          <div class="form-field">
            <label for="ctEmail">ایمیل <span class="req">*</span></label>
            <input id="ctEmail" type="email" required placeholder="you@example.com" dir="ltr">
            <span class="field-error"></span>
          </div>
          <div class="form-field full">
            <label for="ctMsg">پیام <span class="req">*</span></label>
            <textarea id="ctMsg" rows="5" required placeholder="پیامت را بنویس…"></textarea>
            <span class="field-error"></span>
          </div>
        </div>
        <button class="btn" type="submit" style="margin-top:18px">ارسال پیام</button>
        <p class="hint" style="margin-top:10px">این فرم نمایشی است؛ پیامی به جایی ارسال نمی‌شود.</p>
      </form>
    </div>
  </section>`;

  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    const need = (id, test, msg) => {
      const input = $(id);
      const field = input.closest(".form-field");
      const err = $(".field-error", field);
      if (!test(input.value.trim())) { field.classList.add("invalid"); err.textContent = msg; ok = false; }
      else { field.classList.remove("invalid"); err.textContent = ""; }
    };
    need("#ctName", (v) => v.length >= 2, "نام را وارد کن.");
    need("#ctEmail", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "ایمیل معتبر وارد کن.");
    need("#ctMsg", (v) => v.length >= 5, "پیامت را بنویس.");
    if (!ok) return;
    e.target.reset();
    toast("پیامت ثبت شد — ممنون! (نمایشی)");
  });
}

/* ---------------- حساب کاربری ---------------- */
function viewAccount() {
  const user = store.read("ava_user_v1", null);
  const orders = store.read("ava_orders_v1", []);

  if (!user) {
    view.innerHTML = `
    <section class="section container" style="max-width:640px">
      <h1>حساب کاربری</h1>
      <p style="color:var(--muted)">ثبت‌نام کن تا سفارش‌هایت را پیگیری کنی. (نمایشی — اطلاعات فقط در مرورگر خودت ذخیره می‌شود و رمز عبور جایی ذخیره نمی‌شود.)</p>
      <form class="form-card" id="registerForm" novalidate>
        <div class="form-grid">
          <div class="form-field full">
            <label for="rgName">نام و نام خانوادگی <span class="req">*</span></label>
            <input id="rgName" required minlength="3" placeholder="مثلا سارا محمدی">
            <span class="field-error"></span>
          </div>
          <div class="form-field">
            <label for="rgEmail">ایمیل <span class="req">*</span></label>
            <input id="rgEmail" type="email" required placeholder="you@example.com" dir="ltr">
            <span class="field-error"></span>
          </div>
          <div class="form-field">
            <label for="rgPhone">موبایل <span class="req">*</span></label>
            <input id="rgPhone" required inputmode="tel" dir="ltr" placeholder="09123456789">
            <span class="field-error"></span>
          </div>
          <div class="form-field full">
            <label for="rgPass">رمز عبور <span class="req">*</span></label>
            <input id="rgPass" type="password" required minlength="6" placeholder="حداقل ۶ کاراکتر">
            <span class="hint">نمایشی: رمز عبور در این نسخه ذخیره نمی‌شود.</span>
            <span class="field-error"></span>
          </div>
        </div>
        <button class="btn btn-block" type="submit" style="margin-top:18px">ایجاد حساب کاربری</button>
      </form>
    </section>`;

    $("#registerForm").addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      const need = (id, test, msg) => {
        const input = $(id);
        const field = input.closest(".form-field");
        const err = $(".field-error", field);
        if (!test(input.value.trim())) { field.classList.add("invalid"); err.textContent = msg; ok = false; }
        else { field.classList.remove("invalid"); err.textContent = ""; }
      };
      need("#rgName", (v) => v.length >= 3, "نام را کامل وارد کن.");
      need("#rgEmail", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "ایمیل معتبر وارد کن.");
      need("#rgPhone", (v) => /^09\d{9}$/.test(v.replace(/[\s-]/g, "")), "موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
      need("#rgPass", (v) => v.length >= 6, "رمز عبور حداقل ۶ کاراکتر باشد.");
      if (!ok) return;
      store.write("ava_user_v1", {
        name: $("#rgName").value.trim(),
        email: $("#rgEmail").value.trim(),
        phone: $("#rgPhone").value.trim(),
      });
      toast("حساب کاربری‌ات ساخته شد — خوش آمدی!");
      viewAccount();
    });
    return;
  }

  view.innerHTML = `
  <section class="section container">
    <div class="account-head">
      <h1>سلام، ${esc(user.name)}</h1>
      <button class="btn btn-ghost btn-sm" id="logoutBtn">خروج از حساب</button>
    </div>
    <p style="color:var(--muted)">ایمیل: <span dir="ltr">${esc(user.email)}</span> — موبایل: <span dir="ltr">${esc(user.phone)}</span></p>
    <h2 style="margin-top:28px">سفارش‌های من</h2>
    ${orders.length ? `
    <div class="order-list">
      ${orders.map((o) => `
      <article class="order-card">
        <header>
          <span>سفارش <span dir="ltr">${esc(o.code)}</span></span>
          <span class="order-status">در حال آماده‌سازی</span>
        </header>
        <p style="margin:8px 0 0;color:var(--muted);font-size:.92rem">
          ${esc(o.date)} — ${esc(o.city)} — ${o.items.map((i) => `${esc(i.name)} × ${fa(i.qty)}`).join("، ")}
        </p>
        <p style="margin:4px 0 0"><strong>مبلغ: ${price(o.total)}</strong> — ${o.pay === "cod" ? "پرداخت هنگام تحویل" : "پرداخت آنلاین (نمایشی)"}</p>
      </article>`).join("")}
    </div>` : `
    <div class="empty-state">
      <h3>هنوز سفارشی نداری</h3>
      <p>سفارش‌های نمایشی‌ای که ثبت کنی، اینجا نمایش داده می‌شوند.</p>
      <a class="btn" href="#/shop">رفتن به فروشگاه</a>
    </div>`}
  </section>`;

  $("#logoutBtn").addEventListener("click", () => {
    store.write("ava_user_v1", null);
    toast("از حسابت خارج شدی.");
    viewAccount();
  });
}

/* ---------------- ۴۰۴ ---------------- */
function viewNotFound() {
  view.innerHTML = `
  <section class="section container">
    <div class="empty-state">
      <h3>این صفحه پیدا نشد</h3>
      <p>آدرسی که دنبالش هستی در این فروشگاه نمایشی وجود ندارد.</p>
      <a class="btn" href="#/">بازگشت به خانه</a>
    </div>
  </section>`;
}

/* ---------------- راه‌اندازی ---------------- */
$("#navToggle").addEventListener("click", () => {
  const nav = $("#mainNav");
  const open = nav.classList.toggle("open");
  $("#navToggle").setAttribute("aria-expanded", String(open));
});

updateCartCount();
render();
