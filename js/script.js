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