# TNORMAL

*Шаблон для быстрого старта разработки с [Gulp](http://gulpjs.com/), [Pug](https://pugjs.org/) и [Stylus](https://learnboost.github.io/stylus/)*

## Преимущества и возможности

* Быстрый и удобный сборщик (gulp)
* Простейшие модули (js, styl, pug, json, прочие файлы)
* Сборка svg спрайтов для инлайн подлючения и формирование превью (gulp-svg-sprite)
* Сборка png спрайтов и ретина спрайтов (gulp-spritesmith)
* Pug миксины для @media (rupture)
* Форматирование исходного html после jade (gulp-prettify)
* Склейка @media и перенос в конец файла (css-beautify)
* Сервер и синхронное тестирование сайта в браузерах (с помощью browser-sync)
* Авто-подстановка вендорных префиксов в CSS (autoprefixer)
* Шаблонизатор Jade и препроцессор HTML (gulp-jade)
* Конкатенация JavaScript и CSS файлов	(gulp-useref)
* Сжатие изображений (gulp-imagemin)
* Препроцессор CSS (gulp-stylus)
* Минификация CSS (minifyCss)
* Минификация JavaScript (gulp-uglify)
* Настроенная типографика на базе normalize.css
* Упаковка скомпилированных файлов в zip архив
* Создание скриншотов готовых страниц (gulp-webshot)
* Формирование стайлгайдов всего проекта (kss)
* Подстановка путей пакетов установленных через Bower (wiredep)
* Копирование готового проекта на ftp (vinyl-ftp)
* Создание директорий с файлалами инкапсулированных модулей 
* Создание скриншотов страниц в разном разрешении и браузерах (gulp-gemini)


## Быстрый старт

* Установить [node.js](https://nodejs.org)

* Клонировать сам репозиторий
	```bash
	git clone http://github.com/fantazer/tnormal.git .
	```
* Установить все пакеты
	```bash
	npm i
	```
* Установить зависимости
	```bash
	bower i
	```
* Набрать в консоли gulp
* В браузере откроется страница с проектом, по адрессу [`http://localhost:3000/`](http://localhost:3000/)


## Основные таски

* `gulp` - запускает вотчеры и сервер
* `gulp build` - собирает проект
* `gulp build` - собирает проект и выкладывает его на ftp
* `gulp template` - Создание директорий с файлалами инкапсулированных модулей 
* `gulp guide` - Создание стайлгайодов 
* `start sc gemini gather` - Создание скриншотов под разные разрешения и браузеры

## Генерация модулей и страниц

В файле file.json есть два объекта `block` и `page` для добавления блока на страницу использовать миксин jade `+nameblock()`

## Основные миксины stylus
* `flex()`- использовние свойства flex
* `flex(between)`- использовние свойства flex + space-between
* `flex(around)`- использовние свойства flex + space-around
* `bgi('имя изображения')`- задание фонового изображения
* `br(значение)`- border-radius
* `fl()`- свойство flex-column
* `fw()`- свойство flex-wrap
* `cp()`- при наведении cursor pointer
* `round()`- border-radius 50%
* `up()`- текст заглавными
* `placeholder(color)`- замена цвета у текста форм
* `center(val,pad)`- создание основного контейнера по центру страницы val - ширина, pad - падинги
* `triangle($direction = 'up', $size = 10px, $color = #000)`- создание треуголника
* `gradient($color1, $color2 = null, $strength = 10%)`- создание градиента
* `hover-underline($border-size = 1px, $type = 'solid', $color = null)`- создание эфекта подчеркивания при наведения
* `table($border = true, $striped = true, $condensed = false)`- оформление таблицы
* `breadcrumb($character = "/", $spacing = 10px, $divider-color = #CDCDCD)`- создание хлебных крошек
* `size(numbers)`- задание размеров элемента
* `ul-reset(), ol-reset()`- сброс отступов у списков
* `cf()`- clearfix
* `ellipsis($width = 100%)`добавление многоточия к тексту
* `icon-arrow($direction = 'right', $size = 40px, $color = #888, $stroke = 1px)`- иконка стрелки
* `icon-x($size = 40px, $color = #888, $stroke = 1px)`- иконка закрытия
* `font-url(file)`- указание пути к шрифту
* `webfont(family, file, hack-chrome-windows = false, weight = 'normal')`- подключение шрифта
* `bg-full()`- background на весь контейнер
* `focus(color)`- добавление цвета при фокусе объекта
* `init($breakpoints, $columns)`- задание настроек сетки

## Основные настройки сетки
В проекте используется сетка [Flexbox grid](http://flexboxgrid.vivid-websolutions.nl/)
### Для установки 
```
bower install flexbox-grid-stylus
```
### Использование 
```html
.строка
	@extend .row
.элемент
	@extend .col
	@extend .col--md-4
	@extend .col--xs-12
```
## Структура папок и файлов

```
Tnormal/										# корень проекта
├──/dist										# скомилированные файлы
├──/gemini										# настройка сценариев для gemini
├──/app											# исходные файлы
│	├── /bower									# скаченные зависимости
│	├──/css		 								# стили проекта
│		├── /icon								# стили для спрайтов растровых изображений
│		├──/variable							# переменные для стилей
│		│	├──/ component						# файлы стилей сетки
│		│	├── _constant.styl 					# основные константы стилей проекта
│		│	├── _default.styl 					# стили по умолчанию
│		│	└──_function.styl					# описание основных миксинов и функций
│		│	└──_grid.styl						# подключение сетки проекта
│		│	└──_helper.styl						# стили помошники
│		│	└──_ie.styl							# стили для старых версий браузеров
│		└── homepage.md							# файл для создания стайлгайдов
│		└── styles-edit.css 					# файл для внесений изменений сторонним разработчиком 
│		└── styles.styl							# основной файл стилей 
│	├── /fonts									# папка для шрифтов
│	├── /html									# папка с основными страницами
│		├──/block_html							# папка с файлами для конфигурации jade
│		│	├──_const.jade 						# файл для создания объектов используемых в jade
│		│	├──_mixin.jade 						# файл для создания миксинов в jade
│		│	├──_script.jade 					# файл для подключения всех скриптов	(footer) 
│		│	└──_style.jade 						# файл для подключения всех стилей	(header) 
│	├──	/img									# папка с изображениями
│		├──/css									# файлы стилей для спрайтов
│		├──/svg									# папка для всех svg иконок
│		├──favicon.ico							# иконка для сайта
│		├──pack.html							# файл спрайта svg
│		└──sprite.html							# файл для просмотра спрайта svg
│	├── /js										# папка со скриптами
│		├──script.js							# основной файл скриптов
│		└──script-edit.js						# файл скриптов для сторонних разработчиков
│		├── /module								# папка с создаными модулями проекта
│		├── /index.html 						# основная страница проекта
│		├── /allpage.html 						# страница для вывода всех страниц
├──/template									# файлы для стайлгайда
├──/zip											# архив всего проекта
├──.gemini.yml									# конфигурация gemini
└──file.json									# файл для быстрого создания страниц и модулей
├──gulpfile.js									# конфиг gulp.js
└──readme.md									# файл который вы читаете
```

## Лицензия
[The MIT License (MIT)](LICENSE)
