// Mobile menu toggles for Категорії and Контакти

document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.toggle-btn');
  toggles.forEach(btn => {
    btn.addEventListener('click', function () {
      // Знайти наступний елемент (ul або div)
      const next = btn.nextElementSibling;
      if (!next) return;
      // Перемикаємо видимість
      next.classList.toggle('visible');
      next.classList.toggle('hidden');
      btn.classList.toggle('active');
    });
  });
});
