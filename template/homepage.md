# TNORMAL 2.1.2
[Скачать начальный шаблон репозитория](https://github.com/fantazer/TNORMAL)

#### Описание
При сборке ипользуется

  - Node.js
  - Gulp
  - Bower
  - Stylus
  - Jade

### Расположение файлов

```sh
app - develop folder

app/module/ - jade module include style + template
app/font/ - main font + icon font
app/css/variable/  - css configuration files
app/css/icon/  - css sprite generation
app/html/block_html/_cont.jade  - json main pages for all page
template/ - instruction app
file.json - file for create modules

dist - prodaction
dist/module/ - for backend template

gemini - crossbrowser testing
```
#### Gulp task
Основные таски при работе.

  - guide - генерация гайдов
  - sprite - генерация спрайтов из папки app/img/sprites/
  - screenshot - генерация скриншотов для страницы Allpage
  - build - сборка jade - stylus - beauty - prefix - minif. and concat. js+css - minif. img  
  - build-ftp deploy on ftp add file ftp.json 
  - template - генерация модулей для backend
  - gulp - browserSync watch .jade .stylus file.json