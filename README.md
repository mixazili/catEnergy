# Cat Energy — landing (test task)

Адаптивная вёрстка лендинга по макету из Figma (desktop / tablet / mobile).  
Сделано вручную на чистом HTML/CSS/JS.

## Что сделано
- Семантическая HTML-разметка, базовая доступность (aria-label, focus-visible).
- Адаптив под 3 брейкпоинта: 1440 / 768 / 320.
- Секция **«Живой пример»**:
  - Desktop/Tablet — сравнение изображений через range.
  - Mobile — переключатель «Было/Стало».
- Подключена **Яндекс.Карта** через официальное API + кастомная метка.
- Без сторонних CSS/JS библиотек.

## Стек
- HTML5
- CSS3
- Vanilla JavaScript
- Yandex Maps API

## Запуск локально
- открыть `index.html` в браузере.

- VS Code → Live Server  

- `npx serve` (Node.js)

## Структура
- `index.html` — разметка
- `styles.css` — стили
- `script.js` — интерактив (burger/menu, compare, map)
- `assets/` — шрифты и изображения

## Деплой
Проект задеплоен на GitHub Pages:  
https://mixazili.github.io/catEnergy/