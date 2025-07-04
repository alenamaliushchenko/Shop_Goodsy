// // Бургер-меню та показ кошика
// import { showCart } from './cart.js';

// function setupBurgerMenu() {
//   const menuToggle = document.getElementById('menu-toggle');
//   const mobileMenu = document.querySelector('.mobile-menu-content');
//   if (!menuToggle || !mobileMenu) return;

//   // Сховати меню при старті
//   mobileMenu.style.display = 'none';

//   // Показ/сховати меню
//   menuToggle.addEventListener('change', () => {
//     if (menuToggle.checked) {
//       mobileMenu.style.display = 'block';
//       document.body.style.overflow = 'hidden';
//       showCart(true);
//     } else {
//       mobileMenu.style.display = 'none';
//       document.body.style.overflow = '';
//       showCart(false);
//     }
//   });

//   // Закривати меню при кліку на посилання
//   mobileMenu.querySelectorAll('a').forEach(link => {
//     link.addEventListener('click', () => {
//       menuToggle.checked = false;
//       mobileMenu.style.display = 'none';
//       document.body.style.overflow = '';
//     });
//   });

//   // При кліку на "Кошик" у меню — показати кошик
//   const cartLink = mobileMenu.querySelector('a[href="#cart"]');
//   if (cartLink) {
//     cartLink.addEventListener('click', (e) => {
//       e.preventDefault();
//       showCart(true);
//     });
//   }
// }

// // Показ кошика при відкритті товарів
// export function showCartOnProducts() {
//   showCart(true);
// }

// // ініціалізація після DOMContentLoaded
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', setupBurgerMenu);
// } else {
//   setupBurgerMenu();
// }
