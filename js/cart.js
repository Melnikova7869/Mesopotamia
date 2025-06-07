document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Проверяем, есть ли элементы корзины на странице
    if (cartItemsContainer && cartSummary) {
        updateCart();
    }

    // Обновление корзины
    function updateCart() {
        if (!cartItemsContainer || !cartSummary) return;
        
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Ваша корзина пуста</p>
                    <a href="menu.html" class="back-to-menu">Вернуться в меню</a>
                </div>
            `;
            renderEmptySummary();
            return;
        }
        
        let totalItems = 0;
        let totalPrice = 0;
        
        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    ${item.description ? `<p>${truncateDescription(item.description)}</p>` : ''}
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <span class="item-price">${(item.price * item.quantity).toLocaleString()} ₽</span>
                        <button class="remove-item" data-id="${item.id}">×</button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        renderSummary(totalItems, totalPrice);
        setupEventListeners();
    }
    
    // Функции рендеринга
    function renderEmptySummary() {
        cartSummary.innerHTML = `
            <h3>ИТОГО</h3>
            <div class="summary-row">
                <span>Товары (0)</span>
                <span>0 ₽</span>
            </div>
            <div class="summary-row">
                <span>Доставка</span>
                <span>0 ₽</span>
            </div>
            <div class="summary-row total">
                <span>К оплате</span>
                <span>0 ₽</span>
            </div>
            <button class="checkout-btn" disabled>ОФОРМИТЬ ЗАКАЗ</button>
            <p class="delivery-info">Добавьте товары в корзину</p>
        `;
    }
    
    function renderSummary(totalItems, totalPrice) {
        const deliveryPrice = totalPrice > 2000 ? 0 : 300;
        const totalWithDelivery = totalPrice + deliveryPrice;
        
        cartSummary.innerHTML = `
            <h3>ИТОГО</h3>
            <div class="summary-row">
                <span>Товары (${totalItems})</span>
                <span>${totalPrice.toLocaleString()} ₽</span>
            </div>
            <div class="summary-row">
                <span>Доставка</span>
                <span>${deliveryPrice === 0 ? 'Бесплатно' : deliveryPrice.toLocaleString() + ' ₽'}</span>
            </div>
            <div class="summary-row total">
                <span>К оплате</span>
                <span>${totalWithDelivery.toLocaleString()} ₽</span>
            </div>
            <button class="checkout-btn">ОФОРМИТЬ ЗАКАЗ</button>
            ${deliveryPrice === 0 ? 
                '<p class="delivery-info">Бесплатная доставка от 2000 ₽</p>' : 
                '<p class="delivery-info">Доставка осуществляется в течение 60 минут</p>'}
        `;
    }
    
    // Вспомогательные функции
    function truncateDescription(text, maxLength = 100) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Обработчики событий
    function setupEventListeners() {
        document.querySelectorAll('.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
                
                saveCart();
                updateCart();
            });
        });
        
        document.querySelectorAll('.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                item.quantity++;
                saveCart();
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                saveCart();
                updateCart();
            });
        });
        
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn && !checkoutBtn.disabled) {
            checkoutBtn.addEventListener('click', function() {
                alert('Заказ оформлен! Номер вашего заказа: #' + Math.floor(Math.random() * 10000));
                cart = [];
                saveCart();
                updateCart();
            });
        }
    }
});