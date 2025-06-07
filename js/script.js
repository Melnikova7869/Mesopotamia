function showSection(id, event) {
    // 1. Убираем класс active у ВСЕХ кнопок
    document.querySelectorAll('.menu__button').forEach(button => {
        button.classList.remove('active');
    });

    // 2. Добавляем active только нажатой кнопке
    event.currentTarget.classList.add('active');

    // 3. Скрываем ВСЕ разделы меню
    document.querySelectorAll('.menu__breakfast').forEach(section => {
        section.classList.remove('active');
    });

    // 4. Показываем нужный раздел
    const sectionToShow = document.getElementById(id);
    if (sectionToShow) {
        sectionToShow.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.header__nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('active');
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Улучшенный обработчик для корзины (делегирование событий)
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            e.stopPropagation();

            const button = e.target;
            // Ищем ближайший родительский контейнер - теперь поддерживаются оба класса
            const card = button.closest('.menu__breakfast-div, .drink__breakfast-div');

            if (!card) {
                console.error('Не найден родительский элемент товара');
                return;
            }

            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            const image = card.querySelector('img')?.src || '';
            const description = card.querySelector('.menu__breakfast-text-p, .drink__breakfast-text-p')?.textContent || '';

            if (!id || !name || isNaN(price)) {
                console.error('Отсутствуют необходимые данные у кнопки');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    quantity: 1,
                    image,
                    description
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            // Улучшенное уведомление
            showNotification(`${name} добавлен в корзину!`);
        }
    });

    // Закрытие мобильного меню при клике на пункт
    document.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('.header__nav');
            nav.classList.remove('active');
        });
    });

    // Функция для показа уведомлений
    function showNotification(message) {
        // Удаляем предыдущие уведомления
        const existingNotifications = document.querySelectorAll('.cart-notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
});