# Инструкция по использованию Sidebar

## Что такое sidebar.html
Это вертикальное боковое меню сайта MegaPrice.
Содержит навигацию по всем разделам сайта.

---

## Разделы меню
| Раздел | Папка | Описание |
|--------|-------|----------|
| Обзор | sections/overview | Главный дашборд |
| Закупка | sections/purchase | Управление закупками |
| Заказы | sections/orders | Список заказов |
| Аптеки | sections/pharmacies | База аптек |
| Отчеты | sections/reports | Аналитика и отчёты |

---

## Как подключить sidebar к разделу
В каждом разделе (sections/название/index.html) sidebar подключается через:
```html
<div id="sidebar-container"></div>
<script>
  fetch('../../layout/sidebar.html')
    .then(r => r.text())
    .then(html => document.getElementById('sidebar-container').innerHTML = html);
</script>
```

## Как выделить активный пункт меню
У активного пункта добавляется класс `active`:
```html
<a href="#" class="nav-item active">Заказы</a>
```
Класс `active` задаётся в каждом разделе индивидуально.

---

## Файлы layout/
- `sidebar.html` — HTML структура меню
- `header.html` — верхняя шапка сайта
- `layout.css` — стили для sidebar и header

## Стили берутся из
- `shared/base.css` — общие переменные и компоненты из UI Kit

---

## Когда заполняется
Sidebar заполняется в **Части 2** разработки.
До этого файл содержит только комментарий-заглушку.
