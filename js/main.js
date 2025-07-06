
import { renderCategories, renderProducts } from "./ui.js";
import { loadProducts } from "./addedProducts.js";
import { setupCart } from "./cart.js";
import "./header.js";
import "./adv_slides.js";
import { initWheel } from './wheel.js';


document.addEventListener('DOMContentLoaded', async () => {
    const products = await loadProducts();
    const categories = [...new Set(products.map(p => p.category))];
    setupCart();
    renderCategories(categories, products, renderProducts);

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