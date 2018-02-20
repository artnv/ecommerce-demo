// Инициализация всех моделей
app.models.modelController = (function() {
    
    var
        // Динамически обновляемые параметры
        stateMap = {
            lastPageNum     : undefined,    // Для хлебных крошек. Номер с той страницы с которой перешли
            catDiffArr      : undefined,    // Разница между новыми данными и из кеша
            lastCat         : undefined     // Для повторного обновления меню-категорий, если без параметров в url 
        },

        PRIVATE = {},
        PUBLIC  = {},
        
        // Dependency injection container
        DI = {
            //configMap
        };
        
    // End vars

    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        

        var 
            MODELS              = app.models,
            ROUTER              = app.router;
        // --
        
        /* --------------------- Dependency injection --------------------- */

        MODELS.cache.addDependencies({
            configMap           : DI.configMap
        });   
        
        MODELS.net.addDependencies({
            configMap           : DI.configMap,
            CACHE               : MODELS.cache,
            ROUTER              : ROUTER
        });
        
        MODELS.menuCategories.addDependencies({
           configMap            : DI.configMap,
           stateMap             : stateMap
        });
        
        MODELS.categoryPage.addDependencies({
           configMap            : DI.configMap,
           stateMap             : stateMap
        });
        
        MODELS.productPage.addDependencies({
           configMap            : DI.configMap,
           stateMap             : stateMap
        });
        
        MODELS.autoUpdate.addDependencies({
           CACHE                : MODELS.cache,
           stateMap             : stateMap
        });
        
        MODELS.numberHint.addDependencies({
           stateMap            : stateMap
        });
        
        
        /* --------------------- Initialization modules --------------------- */

        MODELS.recentlyViewed.initModule();
        MODELS.cart.initModule();
        MODELS.net.initModule();
        MODELS.menuCategories.initModule();
        MODELS.categoryPage.initModule();
        MODELS.productPage.initModule();
        MODELS.autoUpdate.initModule();
        MODELS.numberHint.initModule();
        
    };
    
    return PUBLIC;
    
}());
