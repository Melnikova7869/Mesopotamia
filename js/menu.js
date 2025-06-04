fetch('/hot-menu.html') // Путь от корня проекта!
  .then(response => response.text())
  .then(html => {
    document.getElementById('menu-hot').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));

fetch('/menu-breakfast.html') // Путь от корня проекта!
  .then(response => response.text())
  .then(html => {
    document.getElementById('menu-breakfast').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));

fetch('/salads.html') // Путь от корня проекта!
  .then(response => response.text())
  .then(html => {
    document.getElementById('menu-salads').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));

fetch('/snacks.html') // Путь от корня проекта!
  .then(response => response.text())
  .then(html => {
    document.getElementById('menu-snacks').innerHTML = html;
  })
  .catch(err => console.error('Не удалось загрузить меню:', err));
