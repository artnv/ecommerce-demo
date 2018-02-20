// Действия для Маршрутизатора
app.controllers.routerController = (function() {
    
    var
        PUBLIC  = {},
        PRIVATE = {},
        ACTIONS = {},
        
        MODELS, VIEWS,
        
        // Dependency injection container
        DI = {
            //configMap
        };
        
    // End vars

    
    // Страница категорий
    ACTIONS.categoryPage = function(cat, pageNum) {

        console.time('categoryPage(getData+Render)');

        if(!cat) {
            cat = DI.configMap.defaultCategory;
        }

        if(!pageNum) {
            pageNum = 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        
        // Удаление подсказок (+1..+3 что пришли новые продукты) при переходе в каталог
        MODELS.numberHint.clearNumberHint(cat);

        // Переключить на страницу
        VIEWS.viewController.switchPage('page');
        
        // Индикатор количества товаров в корзине
        MODELS.cart.getTotalItems();
        
        // Запросы к серверу
        MODELS.net.getMenuCategories(cat, pageNum);
        MODELS.net.getCategoryPage(cat, pageNum);
 
    };
    
    // Страница с товаром
    ACTIONS.productPage = function(cat, id) {
        
        console.time('productPage(getData+Render)');
        
        if(!cat) {
            cat = DI.configMap.defaultCategory;
        }

        id = parseInt(id);
        
        // Удаление подсказок (+1..+3 что пришли новые продукты) при переходе в каталог
        MODELS.numberHint.clearNumberHint(cat);
        
        VIEWS.viewController.switchPage('product');
        MODELS.cart.getTotalItems();
        
        // Запросы к серверу
        MODELS.net.getMenuCategories(cat, undefined);
        MODELS.net.getProductPage(id);
        
    };
    
    // Корзина
    ACTIONS.cart = function() {

        VIEWS.viewController.switchPage('cart');

        MODELS.cart.getTotalItems();
        
        // Запросы к серверу
        MODELS.net.getMenuCategories(); 
        MODELS.cart.getItems();
    };

    // Профиль пользователя
    ACTIONS.accountProfile = function() {

        VIEWS.viewController.switchPage('accountProfile');
        MODELS.cart.getTotalItems();
        
        // Запросы к серверу
        MODELS.net.getMenuCategories(); 

    };
    
    // Страница с ошибкой 404
    ACTIONS.pageNotFound = function() {

        VIEWS.viewController.switchPage('404');
        MODELS.cart.getTotalItems();
        
        // Запросы к серверу
        MODELS.net.getMenuCategories(); 
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
 
    PUBLIC.initModule = function() {
        
        MODELS          = app.models;
        VIEWS           = app.views;
        
  
        /* --------------------- Listeners --------------------- */
        
        // Страницы
        app.eventManager.on('Router/categoryPage', ACTIONS.categoryPage);         

        // Страница с товаром
        app.eventManager.on('Router/productPage', ACTIONS.productPage);        

        // Страница с корзиной
        app.eventManager.on('Router/cart', ACTIONS.cart);        
 
        // Страница пользователя
        app.eventManager.on('Router/accountProfile', ACTIONS.accountProfile);        
        
        // Страница 404
        app.eventManager.on('Router/pageNotFound', ACTIONS.pageNotFound);

    };
    
    return PUBLIC;
    
}());
