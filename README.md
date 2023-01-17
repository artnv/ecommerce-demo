Upd 2018. Фреймворк на основе данной архитектуры https://github.com/artnv/hybrid

# Поддержка старых устройств и скорость работы
!['скриншот'](screenshots/xp2.JPG?raw=true)

# E-commerce Demo
Пример одностраничного, расширяемого веб-приложения интернет магазина, со слабосвязанной архитектурой.

Из сторонних компонентов это Роутер и Диспетчер событий от Backbone. Для визуального оформления используется Bootstrap. Немного jQuery в представлениях и Pace.js в качестве автоматического индикатора загрузки.
А серверная часть состоит из PHP и MySQL. Обмен данными по Ajax формата JSON.

Компоненты могут быть заменены на компоненты от других библиотек, архитектура позволяет это сделать безболезненно, просто подключив модуль и реализовать аналогичный интерфейс взаимодействия, так как все зависимости передаются через DI-контейнеры.

## Краткое описание возможностей приложения
- Модульная, расширяемая MVC-архитектура построенная на объектах, с пространством имён, DI-контейнерами и системой Событий. Сама архитектура написана на чистом JavaScript (ES5)
- В приложении так же есть виджеты, компоненты, менеджеры модулей, система переключения шаблонов и многое другое
- Независимые друг от друга запросы (Не ждут результат ответа, на основе которого строят следующий запрос)
- Не жадная загрузка контента. Всё что видим на экране то и загружаем
- Кеширование всего что ранее было загружено. Страницы, товар и прочий статический и динамический контент
- Автообновление контента и настроек приложения. Если администратор добавил или удалил товар, то данные у пользователя автоматически обновляются, без перезагрузки страницы
- Следование принципу единственной ответственности, в модулях
- Так же используются паттерны проектирования
- Вес приложения (без картинок) с библиотеками, стилями, шрифтами ~100кб после gzip-сжатия на сервере Nginx
- Работает без лагов, на компе 2001 года с характеристиками: Windows Xp, Opera 9, Celeron 848Mhz, 128Mb Ram

## Архитектура приложения
Все модули реализованы через замыкание, имеют публичные и приватные свойства. Модули могут подключаться друг к другу, так как после загрузки они возвращают публичный объект. Эта особенность объектов используется в качестве пространства имен, которая позволяет не засорять глобальное пространство и при этом возникает возможность произвольно хранить файлы, в любых директориях и с разной вложенности, в рамках проекта.
Модуль всегда подключиться туда, куда нужно, а инструмент Gulp, автоматически найдет все файлы, потом минифицирует и объединит их в один bundle.

!['архитектура приложения'](/screenshots/app_architecture.png?raw=true)

### Установка зависимостей в модули
!['установка зависимостей в модули'](/screenshots/app_add_dependencies.png?raw=true)

### Обработка запроса
В приложении используется система Событий для общения между модулями, которая позволяет удобно реагировать на асинхронные ajax-запросы и вдобавок жестко не привязывать модули друг к другу.

#### MVC при асинхронных запросах
При переходе на url запрашивается контент, а потом отображается на странице

!['MVC при асинхронных запросах'](/screenshots/app_events_mvc.png?raw=true)

#### Если нужно отобразить статичную страницу

!['отображение статичной страницы'](/screenshots/app_static_page.png?raw=true)

#### Дополнение страницы динамическим контентом

!['дополнение страницы динамическим контентом'](/screenshots/app_view_get_data.png?raw=true)

### Скриншоты приложения
<details><summary>Открыть список</summary>
<p>
  
![](/screenshots/5.jpg?raw=true)

![](/screenshots/4.jpg?raw=true)

![](/screenshots/3.jpg?raw=true)

![](/screenshots/2.jpg?raw=true)

![](/screenshots/1.jpg?raw=true)

![](/screenshots/xp1.JPG?raw=true)

![](/screenshots/xp2.JPG?raw=true)

![](/screenshots/xp3.JPG?raw=true)

![](/screenshots/xp4.JPG?raw=true)

</p>
</details>
