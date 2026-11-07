// Mooki Order Popup Screen Modal
(function () {
  const products = {
    'choco-blast': {
      key: 'choco-blast',
      name: 'Choco Blast',
      desc: 'Chocolate Flavored Milk',
      img: 'assets/products/choco-blast.png',
      badgeBg: 'bg-[#B87042] text-white'
    },
    'creamy-vanilla': {
      key: 'creamy-vanilla',
      name: 'Creamy Vanilla',
      desc: 'Vanilla Flavored Milk',
      img: 'assets/products/creamy-vanilla.png',
      badgeBg: 'bg-[#BCE3ED] text-slate-800'
    },
    'strawberry-pop': {
      key: 'strawberry-pop',
      name: 'Strawberry Pop',
      desc: 'Fruity Sweetness',
      img: 'assets/products/strawberry-pop.png',
      badgeBg: 'bg-[#F6C6D6] text-slate-800'
    },
    'banana-bounce': {
      key: 'banana-bounce',
      name: 'Banana Bounce',
      desc: 'Banana Flavored Milk',
      img: 'assets/products/banana-bounce.png',
      badgeBg: 'bg-[#F8E58C] text-slate-800'
    }
  };

  const stores = [
    { name: 'Tokopedia', logo: 'assets/tokped.png', badge: 'Official Store', url: 'https://www.tokopedia.com' },
    { name: 'Shopee', logo: 'assets/shope.png', badge: 'Shopee Mall', url: 'https://shopee.co.id' },
    { name: 'Blibli', logo: 'assets/blibli.webp', badge: 'Official Store', url: 'https://www.blibli.com' },
    { name: 'Klik Indomaret', logo: 'assets/klikidm.png', badge: 'Delivery Kilat', url: 'https://www.klikindomaret.com' },
    { name: 'Alfagift', logo: 'assets/alfagift.png', badge: 'Bebas Ongkir', url: 'https://alfagift.id' },
    { name: 'Astro', logo: 'assets/astro.png', badge: '15 Menit Sampai', url: 'https://astronauts.id' }
  ];

  let selectedProduct = null;

  function createModalDOM() {
    if (document.getElementById('mooki-order-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'mooki-order-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div id="mooki-modal-content" class="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-sky-100 overflow-hidden transform scale-95 transition-transform duration-300 max-h-[90vh] flex flex-col">
        <!-- Header Modal -->
        <div class="relative bg-gradient-to-r from-sky-500 via-[#1FA2FF] to-sky-400 p-6 text-white shrink-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="assets/Mooki.png" alt="Mooki" class="w-12 h-12 rounded-full border-2 border-white bg-white shadow-md object-cover" />
              <div>
                <h3 class="text-xl md:text-2xl font-black tracking-wide" id="modal-title">Pesan Mooki</h3>
                <p class="text-xs md:text-sm text-sky-100 font-medium">Fuel up your day with fresh goodness!</p>
              </div>
            </div>
            <button id="modal-close-btn" class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer" aria-label="Tutup Popup">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6 overflow-y-auto space-y-5">
          <!-- Pilih Varian / Product Selected Card -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Pilih Varian Favorit</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5" id="product-pills-container">
              ${Object.values(products).map(p => `
                <button type="button" data-variant="${p.key}" class="product-variant-btn p-2 rounded-2xl border border-slate-200 hover:border-sky-400 bg-slate-50 hover:bg-sky-50/50 flex flex-col items-center text-center transition-all cursor-pointer group">
                  <img src="${p.img}" alt="${p.name}" class="w-12 h-12 object-contain mb-1 transition-transform group-hover:scale-110" />
                  <span class="text-xs font-bold text-slate-800 line-clamp-1">${p.name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Pilihan Marketplace / Toko -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Beli di Official Store Rekanan</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${stores.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-3 rounded-2xl border border-slate-200/90 bg-white hover:border-[#1FA2FF] hover:bg-sky-50/40 hover:shadow-sm transition-all group">
                  <div class="flex items-center gap-3">
                    <div class="w-14 h-9 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-1 overflow-hidden shrink-0">
                      <img src="${s.logo}" alt="${s.name}" class="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <div class="font-bold text-xs md:text-sm text-slate-900 group-hover:text-[#0075FF] transition-colors">${s.name}</div>
                      <div class="text-[10px] text-slate-400 font-medium">${s.badge}</div>
                    </div>
                  </div>
                  <span class="text-[11px] font-bold text-[#0075FF] bg-sky-50 group-hover:bg-[#0075FF] group-hover:text-white px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 shrink-0">
                    Beli
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </span>
                </a>
              `).join('')}
            </div>
          </div>

          <!-- Direct Order via WhatsApp -->
          <div class="pt-1">
            <a href="https://wa.me/6281234567890?text=Halo%20Mooki%2C%20saya%20ingin%20pesan%20produk%20Mooki" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5">
              <span>💬</span>
              <span>Pesan Langsung via WhatsApp (+62 812-3456-7890)</span>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners for close
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
        closeModal();
      }
    });

    // Variant pills click
    modal.querySelectorAll('.product-variant-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const variantKey = this.dataset.variant;
        selectVariant(variantKey);
      });
    });
  }

  function selectVariant(key) {
    selectedProduct = products[key] || null;
    const modal = document.getElementById('mooki-order-modal');
    if (!modal) return;

    const titleEl = document.getElementById('modal-title');
    if (selectedProduct && titleEl) {
      titleEl.textContent = `Pesan ${selectedProduct.name}`;
    } else if (titleEl) {
      titleEl.textContent = 'Pesan Mooki';
    }

    modal.querySelectorAll('.product-variant-btn').forEach(btn => {
      if (selectedProduct && btn.dataset.variant === key) {
        btn.classList.add('border-sky-500', 'bg-sky-50', 'ring-2', 'ring-sky-400');
        btn.classList.remove('border-slate-200', 'bg-slate-50');
      } else {
        btn.classList.remove('border-sky-500', 'bg-sky-50', 'ring-2', 'ring-sky-400');
        btn.classList.add('border-slate-200', 'bg-slate-50');
      }
    });
  }

  function openModal(variantKey) {
    createModalDOM();
    const modal = document.getElementById('mooki-order-modal');
    const content = document.getElementById('mooki-modal-content');
    if (!modal || !content) return;

    if (variantKey && products[variantKey]) {
      selectVariant(variantKey);
    } else {
      selectVariant(null);
    }

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    const modal = document.getElementById('mooki-order-modal');
    const content = document.getElementById('mooki-modal-content');
    if (!modal || !content) return;

    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    content.classList.add('scale-95');
    content.classList.remove('scale-100');
    document.body.classList.remove('overflow-hidden');
  }

  // Bind trigger buttons across page
  function bindTriggers() {
    createModalDOM();

    // CTA buttons (href="#buy" or data-order)
    document.querySelectorAll('a[href="#buy"], [data-order-cta]').forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    // Product cards in index.html
    const productGrid = document.querySelector('#products .grid');
    if (productGrid) {
      const cards = productGrid.querySelectorAll(':scope > div');
      const keys = ['choco-blast', 'creamy-vanilla', 'strawberry-pop', 'banana-bounce'];
      cards.forEach((card, idx) => {
        card.classList.add('cursor-pointer');
        card.setAttribute('title', 'Klik untuk pesan');
        card.addEventListener('click', function () {
          openModal(keys[idx]);
        });
      });
    }

    // Product cards in products.html
    const accordionContainer = document.querySelector('section > div.flex-col.md\\:flex-row');
    if (accordionContainer) {
      const cards = accordionContainer.querySelectorAll(':scope > div');
      const keys = ['choco-blast', 'creamy-vanilla', 'strawberry-pop', 'banana-bounce'];
      cards.forEach((card, idx) => {
        card.addEventListener('click', function () {
          openModal(keys[idx]);
        });
      });
    }
  }

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindTriggers);
  } else {
    bindTriggers();
  }

  // Expose global API
  window.MookiOrderModal = {
    open: openModal,
    close: closeModal
  };
})();
