import { addToCart, showCart } from './cart.js';

export function renderCategories(categories, products, renderProductsCallback) {
  const wrapper = document.getElementById('category-section');
  if (!wrapper) return;

  wrapper.innerHTML = ''; // очищаємо, щоб не було дублювання

  const container = document.createElement('div');
  container.classList.add('category-buttons');

  const categoryImages = {
    "Овочі": "https://media.istockphoto.com/id/1644577817/photo/assortment-of-various-types-of-vegetables-arranged-in-a-rainbow-gradient-pattern.webp?a=1&b=1&s=612x612&w=0&k=20&c=BWzxygiskIvtywJ34RSduTn09VjcnVTCF6lsCRyAXJI=",
    "Фрукти": "https://media.istockphoto.com/id/1718516554/photo/full-frame-of-assortment-of-healthy-and-fresh-fruits.webp?a=1&b=1&s=612x612&w=0&k=20&c=R5kRarCiJjLmzKIEv_8NEEscMdesZFWwYqxnDyJ7E2s=",
    "Молочні": "https://media.istockphoto.com/id/1130523609/photo/variation-of-dairy-products-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=pgeqM31YyJenLTFt-OExJYVMTQwXFyLoEGv0Ec6e-qI=",
    "Напої": "https://media.istockphoto.com/id/518095268/photo/summer-drinks.webp?a=1&b=1&s=612x612&w=0&k=20&c=ocdLobRjmUNmN-S-qbtBigucaDA0iAGqpnDY4t5f28c=",
    "Хімія": "https://media.istockphoto.com/id/478482323/photo/cleaning-product-plastic-container-for-house-clean.webp?a=1&b=1&s=612x612&w=0&k=20&c=wDClu7gaYzBsw3ah5quxIIFKXogKx8w6Cup7dwqLL_g="
};

  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.classList.add('category-btn');
    btn.textContent = category;
    if (categoryImages[category]) {
        const img = document.createElement('img');
        img.src = categoryImages[category];
        img.alt = category;
        img.classList.add('category-image');
        btn.appendChild(img);
    }



    btn.addEventListener('click', () => {
      const filtered = products.filter(p => p.category === category);
      renderProductsCallback(filtered);
    //   showCart(true);

      container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Прокрутити до товарів
      const productContainer = document.getElementById('product-container');
      productContainer?.scrollIntoView({ behavior: 'smooth' });
    });

    container.appendChild(btn);
  });

  wrapper.appendChild(container);

  // Робимо існуючі категорії у бургер-меню активними посиланнями
  const mobileMenuList = document.querySelector('.mobile-menu-list');
  if (mobileMenuList) {
    const liNodes = Array.from(mobileMenuList.children);
    liNodes.forEach(li => {
      if (li.querySelector('a')) return;
      const text = li.textContent.trim();
      if (categories.includes(text)) {
        li.textContent = '';
        const a = document.createElement('a');
        a.textContent = text;
        a.href = '#category-section';
        a.style.cursor = 'pointer';
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const catBtns = document.querySelectorAll('.category-btn');
          catBtns.forEach(btn => {
            let btnText = btn.textContent;
            if (btn.querySelector('img')) {
              btnText = btn.childNodes[1]?.textContent || btn.textContent;
            }
            if (btnText.trim() === text) {
              btn.click();
            }
          });
          const menuCheckbox = document.querySelector('.menu-checkbox');
          if (menuCheckbox) {
            menuCheckbox.checked = false;
          }
        });
        li.appendChild(a);
      }
    });
  }
}