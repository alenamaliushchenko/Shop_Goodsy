
export async function loadProducts(){
    try {
        const res = await fetch ('./data/products.json');
        return await res.json();
    } catch (error){
        console.log('Помилка завантаження продуктів:', error);
        return [];
    }
}