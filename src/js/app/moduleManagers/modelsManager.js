// Инициализация всех моделей и установка их зависимостей
app.moduleManagers.modelsManager = (function() {
    
    var
        PUBLIC  = {},
        
        // Dependency injection container
        DI = {
            //configMap
        };
        
    // End var

    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        
        var 
            COMPONENTS          = app.components,
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
           stateMap             : COMPONENTS.stateStorage.stateMap
        });
        
        MODELS.categoryPage.addDependencies({
           configMap            : DI.configMap,
           stateMap             : COMPONENTS.stateStorage.stateMap,
           CART                 : MODELS.cart
        });
        
        MODELS.productPage.addDependencies({
           configMap            : DI.configMap,
           stateMap             : COMPONENTS.stateStorage.stateMap,
           CART                 : MODELS.cart
        });
        
        MODELS.autoUpdate.addDependencies({
           CACHE                : MODELS.cache,
           stateMap             : COMPONENTS.stateStorage.stateMap
        });
        
        
        /* --------------------- Initialization modules --------------------- */

        MODELS.cart.initModule();
        MODELS.cache.initModule();
        MODELS.net.initModule();
        MODELS.menuCategories.initModule();
        MODELS.categoryPage.initModule();
        MODELS.productPage.initModule();
        MODELS.autoUpdate.initModule();
        
    };
    
    return PUBLIC;
    
}());
