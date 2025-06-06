fetch('drinks-coctail.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('drinks-coctail').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));

fetch('drinks-wine.html') 
  .then(response => response.text())
  .then(html => {
    document.getElementById('drinks-wine').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));

fetch('drinks-hot.html') 
  .then(response => response.text())
  .then(html => {
    document.getElementById('drinks-hot').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));

fetch('/drinks-alcohol.html') 
  .then(response => response.text())
  .then(html => {
    document.getElementById('drinks-alcohol').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err)); 

function showSection(id, event) {
    // 1. Убираем класс active у ВСЕХ кнопок
    document.querySelectorAll('.drink__button').forEach(button => {
        button.classList.remove('active');
    });

    // 2. Добавляем active только нажатой кнопке
    event.currentTarget.classList.add('active');

    // 3. Скрываем ВСЕ разделы меню
    document.querySelectorAll('.drink__breakfast').forEach(section => {
        section.classList.remove('active');
    });

    // 4. Показываем нужный раздел
    const sectionToShow = document.getElementById(id);
    if (sectionToShow) {
        sectionToShow.classList.add('active');
    }
}


