import { renderCategories } from "./ui.js";

import { loadProducts } from "./addedProducts.js";
import { setupCart } from "./cart.js";
import "./header.js";
import { initWheel } from './wheel.js';
import "./adv_slides.js";
import "./mobile-menu.js";

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Кнопка колеса фортуни працює першою (wheel.js ініціалізується нижче)

  // 2. Слайди (автоматично рендеряться через adv_slides.js)

  // 3. Категорії після слайдів
  const products = await loadProducts();
  const categories = [...new Set(products.map(p => p.category))];
  setupCart();
   waitForSlidesThenRenderCategories(categories, products);
 function waitForSlidesThenRenderCategories(categories, products) {
  const advSlides = document.getElementById('adv-slides');
  const categorySection = document.getElementById('category-section');

  if (advSlides && advSlides.children.length > 0 && categorySection) {
    // Вставляємо секцію категорій після слайдів
    advSlides.insertAdjacentElement('afterend', categorySection);
    renderCategories(categories, products, (filtered) => {
      // Дефолтний рендер товарів (картки)
      const container = document.getElementById('product-container');
      if (!container) return;
      container.innerHTML = '';
      if (!filtered.length) {
        container.innerHTML = '<p style="text-align:center;">Товарів у цій категорії немає.</p>';
        return;
      }
      const grid = document.createElement('div');
      grid.className = 'product-grid';
      filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="info">
            <h3>${product.name}</h3>
            <p>${product.unit ? 'Ціна за ' + product.unit : ''}</p>
            <div class="price">${product.price} грн</div>
            <button class="add-to-cart">Додати в кошик</button>
          </div>
        `;
        card.querySelector('.add-to-cart').addEventListener('click', () => {
          import('./cart.js').then(({ addToCart }) => addToCart(product));
        });
        grid.appendChild(card);
      });
      container.appendChild(grid);
    });
  } else {
    // Пробуємо ще раз через 100 мс
    setTimeout(() => waitForSlidesThenRenderCategories(categories, products), 100);
  }
}



  // wheel.js для модального вікна
  const fortuneModal = document.getElementById('fortune-modal');
  const openBtn = document.getElementById('open-fortune-modal');
  const closeBtn = document.getElementById('close-fortune-modal');
  let wheelInitialized = false;

  if (openBtn && fortuneModal && closeBtn) {
    openBtn.addEventListener('click', () => {
      fortuneModal.classList.remove('hidden');
      if (!wheelInitialized) {
        initWheel(fortuneModal);
        wheelInitialized = true;
      }
    });

    closeBtn.addEventListener('click', () => {
      fortuneModal.classList.add('hidden');
    });
  }
});
