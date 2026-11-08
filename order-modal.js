// Mooki Order Popup Screen Modal
(function () {
  const products = {
    "choco-blast": {
      key: "choco-blast",
      name: "Choco Blast",
      desc: "Chocolate Flavored Milk",
      img: "assets/products/choco-blast.png",
      badgeBg: "bg-[#B87042] text-white",
    },
    "creamy-vanilla": {
      key: "creamy-vanilla",
      name: "Creamy Vanilla",
      desc: "Vanilla Flavored Milk",
      img: "assets/products/creamy-vanilla.png",
      badgeBg: "bg-[#BCE3ED] text-slate-800",
    },
    "strawberry-pop": {
      key: "strawberry-pop",
      name: "Strawberry Pop",
      desc: "Fruity Sweetness",
      img: "assets/products/strawberry-pop.png",
      badgeBg: "bg-[#F6C6D6] text-slate-800",
    },
    "banana-bounce": {
      key: "banana-bounce",
      name: "Banana Bounce",
      desc: "Banana Flavored Milk",
      img: "assets/products/banana-bounce.png",
      badgeBg: "bg-[#F8E58C] text-slate-800",
    },
  };

  // 2x3 Grid matching reference design:
  // Row 1: Alfagift, Klik Indomaret, Shopee
  // Row 2: Blibli, Tokopedia, Astro
  const stores = [
    {
      name: "Alfagift",
      logo: "assets/ecommerce/alfagift.png",
      url: "https://alfagift.id",
    },
    {
      name: "Klik Indomaret",
      logo: "assets/ecommerce/klikidm.png",
      url: "https://www.klikindomaret.com",
    },
    {
      name: "Shopee",
      logo: "assets/ecommerce/shope.png",
      url: "https://shopee.co.id",
    },
    {
      name: "Blibli",
      logo: "assets/ecommerce/blibli.webp",
      url: "https://www.blibli.com",
    },
    {
      name: "Tokopedia",
      logo: "assets/ecommerce/tokped.png",
      url: "https://www.tokopedia.com",
    },
    {
      name: "Astro",
      logo: "assets/ecommerce/astro.png",
      url: "https://astronauts.id",
    },
  ];

  let selectedProduct = null;

  function createModalDOM() {
    if (document.getElementById("mooki-order-modal")) return;

    const modal = document.createElement("div");
    modal.id = "mooki-order-modal";
    modal.className =
      "fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-200";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div id="mooki-modal-content" class="relative bg-white w-full max-w-lg md:max-w-xl rounded-[28px] border-[2.5px] border-black shadow-[8px_8px_0px_#000] p-7 sm:p-9 transform scale-95 transition-transform duration-200 flex flex-col">
        
        <!-- Round Close Button Top-Right (Neo-Brutalist floating circle with hard shadow) -->
        <button
          id="modal-close-btn"
          type="button"
          aria-label="Close"
          class="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 rounded-full bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center transition-all cursor-pointer z-30"
        >
          <svg class="w-5 h-5 text-black stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Header: Centered Title matching reference -->
        <div class="text-center mb-6">
          <h3 id="modal-title" class="font-heading text-2xl sm:text-3xl font-bold text-slate-950 tracking-normal">
            Mooki official store
          </h3>
          <p id="modal-subtitle" class="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
            Buy Mooki from any of our official stores
          </p>
        </div>

        <!-- 2x3 Grid of Stores: Exactly like reference image -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
          ${stores
            .map(
              (s) => `
            <a
              href="${s.url}"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1.5px_1.5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none h-24 sm:h-28 flex items-center justify-center p-4 transition-all"
              title="Buy at ${s.name}"
            >
              <img
                src="${s.logo}"
                alt="${s.name}"
                class="max-h-12 sm:max-h-14 max-w-[85%] object-contain transition-transform group-hover:scale-105 duration-200"
              />
            </a>
          `,
            )
            .join("")}
        </div>

        <!-- Direct WhatsApp Link (with updated phone number) -->
        <div class="text-center pt-1 border-t border-slate-100">
          <a
            id="modal-wa-link"
            href="https://wa.me/6285143596912?text=Hi%20Mooki%20team%2C%20I%20want%20to%20order%20Mooki"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full border-2 border-black bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            <span>Or order on WhatsApp (+62 851-4359-6912)</span>
          </a>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners for close
    const closeBtn = document.getElementById("modal-close-btn");
    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (
        e.key === "Escape" &&
        !modal.classList.contains("pointer-events-none")
      ) {
        closeModal();
      }
    });

    // Variant pills click
    modal.querySelectorAll(".product-variant-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const variantKey = this.dataset.variant;
        selectVariant(variantKey);
      });
    });
  }

  function selectVariant(key) {
    selectedProduct = products[key] || null;
    const modal = document.getElementById("mooki-order-modal");
    if (!modal) return;

    const titleEl = document.getElementById("modal-title");
    const waLink = document.getElementById("modal-wa-link");

    if (selectedProduct) {
      if (titleEl) titleEl.textContent = `Order ${selectedProduct.name}`;
      if (waLink) {
        const msg = encodeURIComponent(
          `Hi Mooki team, I want to order ${selectedProduct.name}`,
        );
        waLink.href = `https://wa.me/6285143596912?text=${msg}`;
      }
    } else {
      if (titleEl) titleEl.textContent = "Mooki official store";
      if (waLink) {
        waLink.href =
          "https://wa.me/6285143596912?text=Hi%20Mooki%20team%2C%20I%20want%20to%20order%20Mooki";
      }
    }

    modal.querySelectorAll(".product-variant-btn").forEach((btn) => {
      if (selectedProduct && btn.dataset.variant === key) {
        btn.classList.add("bg-[#0075FF]", "text-white");
        btn.classList.remove("bg-slate-50", "text-slate-900");
      } else {
        btn.classList.remove("bg-[#0075FF]", "text-white");
        btn.classList.add("bg-slate-50", "text-slate-900");
      }
    });
  }

  function openModal(variantKey) {
    createModalDOM();
    const modal = document.getElementById("mooki-order-modal");
    const content = document.getElementById("mooki-modal-content");
    if (!modal || !content) return;

    if (variantKey && products[variantKey]) {
      selectVariant(variantKey);
    } else {
      selectVariant(null);
    }

    modal.classList.remove("opacity-0", "pointer-events-none");
    modal.classList.add("opacity-100");
    content.classList.remove("scale-95");
    content.classList.add("scale-100");
    document.body.classList.add("overflow-hidden");
  }

  function closeModal() {
    const modal = document.getElementById("mooki-order-modal");
    const content = document.getElementById("mooki-modal-content");
    if (!modal || !content) return;

    modal.classList.add("opacity-0", "pointer-events-none");
    modal.classList.remove("opacity-100");
    content.classList.add("scale-95");
    content.classList.remove("scale-100");
    document.body.classList.remove("overflow-hidden");
  }

  // Mobile Nav Toggle
  function initMobileNav() {
    const toggleBtn = document.getElementById("mobile-nav-toggle");
    const menu = document.getElementById("mobile-nav-menu");
    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", !isExpanded);
      menu.classList.toggle("hidden");
    });

    document.addEventListener("click", function (e) {
      if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add("hidden");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.classList.contains("hidden")) {
        menu.classList.add("hidden");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Bind trigger buttons across page
  function bindTriggers() {
    createModalDOM();
    initMobileNav();

    // CTA buttons (href="#buy" or data-order)
    document
      .querySelectorAll('a[href="#buy"], [data-order-cta]')
      .forEach((el) => {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          openModal();
        });
      });

    // Explicit variant triggers (index.html flavour sheet)
    const variantTriggers = document.querySelectorAll("[data-order-variant]");
    variantTriggers.forEach((el) => {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openModal(el.dataset.orderVariant);
      });
    });

    // Every variant entry point carries data-order-variant — no positional
    // bindings, so pages can be reordered without opening the wrong flavour.
  }

  // Init when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindTriggers);
  } else {
    bindTriggers();
  }

  // Expose global API
  window.MookiOrderModal = {
    open: openModal,
    close: closeModal,
  };
})();
