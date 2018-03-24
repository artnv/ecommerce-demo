// Контроллер по умолчанию
app.controllers.siteController = (function() {
    
    var
        PUBLIC  = {},
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
        MODELS.menuCategories.clearNumberHint(cat);

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
        MODELS.menuCategories.clearNumberHint(cat);
        
        MODELS.cart.getTotalItems();
        
        // Запросы к серверу
        MODELS.net.getMenuCategories(cat, undefined);
        MODELS.net.getProductPage(id);
        
    };
    
    // Корзина
    ACTIONS.cart = function() {

        MODELS.cart.getTotalItems();
        
        // Запросы к серверу
        MODELS.net.getMenuCategories();
        MODELS.cart.getItems();
    };
    
    // Страница с ошибкой 404
    ACTIONS.pageNotFound = function() {

        VIEWS.error404Page.show404();
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
 
        // Страница 404
        app.eventManager.on('Router/pageNotFound', ACTIONS.pageNotFound);

    };
    
    return PUBLIC;
    
}());
