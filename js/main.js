
import { renderCategories, renderProducts } from "./ui.js";
import { loadProducts } from "./addedProducts.js";
import { setupCart } from "./cart.js";
import "./header.js";
import "./adv_slides.js";


document.addEventListener('DOMContentLoaded', async () => {
    const products = await loadProducts();
    const categories = [...new Set(products.map(p => p.category))];

    setupCart();
    renderCategories(categories, products, renderProducts);
})