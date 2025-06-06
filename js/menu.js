fetch('hot-menu.html') // Путь от корня проекта!
  .then(response => response.text())
  .then(html => {
    document.getElementById('menu-hot').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));

fetch('menu-breakfast.html') // Путь от корня проекта!
  .then(response => response.text())
  .then(html => {
    document.getElementById('menu-breakfast').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));

fetch('salads.html') // Путь от корня проекта!
  .then(response => response.text())
  .then(html => {
    document.getElementById('menu-salads').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));

fetch('snacks.html') // Путь от корня проекта!
  .then(response => response.text())
  .then(html => {
    document.getElementById('menu-snacks').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));

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

