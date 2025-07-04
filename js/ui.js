import { addToCart, showCart } from './cart.js';

export function renderCategories (categories, products, renderProductsCallback){
    const container = document.createElement('div');
    container.classList.add('category-buttons');

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.textContent = category;

        btn.addEventListener('click', () => {
            const filtered = products.filter(p => p.category === category);
            renderProductsCallback(filtered);
            showCart(true); // Показати кошик при відкритті товарів
        });
        container.appendChild(btn);
    });
    document.body.appendChild(container);
}

export function renderProducts (products){
    let container = document.getElementById('product-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'product-container';
        document.body.appendChild(container);
    }
    container.innerHTML = '<h2>Товари</h2>';
    showCart(true); // Показати кошик при відкритті товарів

    const list = document.createElement('div');
    list.classList.add('product-list');

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Ціна:${product.price} грн/${product.unit}</p>
            <button>Додати в кошик</button>
        `;

        card.querySelector('button').addEventListener('click', () => addToCart(product));

        list.appendChild(card);
    });
    container.appendChild(list);
    document.body.appendChild(container);
}