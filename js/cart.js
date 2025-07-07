let cart = [];
let discount = 0;


export function setupCart() {
  let container = document.getElementById('cart-container');

  if (!container) {
    container = document.createElement('div');
    container.id = 'cart-container';
    container.style.display = 'none'; // Початково приховано

    container.innerHTML = `
      <h2>🧺 Кошик</h2>
      <ul id="cart-items"></ul>
      <p id="cart-total">Загальна сума: 0 грн</p>
      <div class="cart-buttons">
        <button id="clear-cart-btn">Очистити кошик</button>
        <button id="continue-shopping-btn">Продовжити покупки</button>
      </div>  
    `;

    document.body.appendChild(container);

    // Створюємо одну фіксовану кнопку-корзинку в нижньому правому куті
    const iconBtn = document.createElement('button');
    iconBtn.classList.add('cart-icon-btn');
    iconBtn.innerHTML = '🛒';
    iconBtn.title = 'Показати кошик';

    iconBtn.addEventListener('click', () => {
      const isVisible = container.style.display === 'flex';
      showCart(!isVisible);
    });

    document.body.appendChild(iconBtn);
  }

  document.getElementById('clear-cart-btn').addEventListener('click', () => {
    cart = [];
    discount = 0;
    updateCartUI();
  });

  document.getElementById('continue-shopping-btn').addEventListener('click', () => {
    showCart(false); // Приховати кошик
  });
}


// Додає товар до кошика
export function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.count += 1;
  } else {
    cart.push({ ...product, count: 1 });
  }

  updateCartUI();
}

// Оновлює вміст кошика: список і загальна сума
function updateCartUI() {
  const list = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!list || !totalEl) return;
  list.innerHTML = '';

  let total = 0;

  // Рендеримо кожен елемент кошика
  cart.forEach(item => {
    const itemSum = item.price * item.count;
    total += itemSum;

    const li = document.createElement('li');
    li.textContent = `${item.name} × ${item.count} = ${itemSum} грн`;
    list.appendChild(li);
  });

  // Застосовуємо знижку, якщо є
  const finalTotal = Math.round(total * (1 - discount));
  totalEl.textContent = `Загальна сума: ${finalTotal} грн ${discount > 0 ? `(зі знижкою ${discount * 100}%)` : ''}`;
}

// Показати/сховати кошик
export function showCart(show = true) {
  const container = document.getElementById('cart-container');
  if (container) {
    container.style.display = show ? 'flex' : 'none';
  }
}

// Приймає знижку від колеса фортуни і оновлює загальну суму
export function applyDiscount(percent) {
  discount = percent / 100;
  updateCartUI();
}
