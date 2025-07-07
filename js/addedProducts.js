
export async function loadProducts(){
    try {
        const res = await fetch ('./data/products.json');
        return await res.json();
    } catch (error){
        console.log('Помилка завантаження продуктів:', error);
        return [];
    }
}
const buttons = document.querySelectorAll('.category-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // filterProductsByCategory(btn.textContent); // виклик фільтрації
  });
});
