document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('banquetForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const inputs = form.querySelectorAll('input');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        // Проверка всех полей
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        // Проверка номера телефона
        const phoneInput = form.querySelector('input[type="tel"]');
        const phoneRegex = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
        if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
            isValid = false;
            phoneInput.style.borderColor = 'red';
            errorMessage.textContent = 'Введите корректный номер телефона';
            errorMessage.style.display = 'block';
        }

        if (!isValid) {
            if (!errorMessage.textContent) {
                errorMessage.textContent = 'Пожалуйста, заполните все обязательные поля';
                errorMessage.style.display = 'block';
            }
            return;
        }

        // Успешная отправка
        form.style.display = 'none';
        successMessage.style = 'display: flex; flex-direction: column; justify-content: center;';
    });

    // Очистка ошибок при вводе
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            this.style.borderColor = '#ddd';
            errorMessage.style.display = 'none';
        });
    });
});
