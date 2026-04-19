// Shop page functionality
let currentCategory = 'All';

function renderProducts(category = 'All') {
    const productsGrid = document.getElementById('products-grid');
    
    const filteredProducts = category === 'All' 
        ? products 
        : products.filter(product => product.category === category);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div style="text-align: center; padding: 3rem; color: rgba(0,0,0,0.6); grid-column: 1/-1;">No products found in this category.</div>';
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image-container" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">KSH ${product.price.toLocaleString()}</div>
                </div>
            </div>
            <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(product).replace(/'/g, "\\'")})'>
                Add to Cart
            </button>
        </div>
    `).join('');
}

function filterProducts(category) {
    currentCategory = category;
    renderProducts(category);
    
    // Update active filter button
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    // Check for category parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam && ['Hoodies', 'T-Shirts', 'Shirts', 'Pants'].includes(categoryParam)) {
        currentCategory = categoryParam;
        renderProducts(categoryParam);
        
        // Update active filter button
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            if (btn.dataset.category === categoryParam) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    } else {
        renderProducts('All');
    }
});
