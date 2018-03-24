// Виджет ранее просмотренных товаров
app.widgets.recentlyViewed = (function() {
    
    var
        PUBLIC      = {},
        PRIVATE     = {
            maxItems    : 6
        },
        
        // Modules
        STORAGE,    VIEW,

        // Dependency injection container
        DI = {
            //configMap
        };
        
    // End var

    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.addItem = function(data) {
        STORAGE.addItem(data);
    };   
    
    PUBLIC.getItems = function() {
        return STORAGE.getItems();
    };    
    
    PUBLIC.getItemsHtml = function(id) {
        return VIEW.getItemsHtml({
            exceptItemById      : id,   // Элемент который не нужно показывать, например текущий
            items               : PUBLIC.getItems()
        });
    };
    
    PUBLIC.initModule = function() {
        
        // Modules
        STORAGE     = PUBLIC.storage;
        VIEW        = PUBLIC.view;


        /* --------------------- Dependency injection --------------------- */
        
        VIEW.addDependencies({
           configMap            : DI.configMap,
           maxItems             : PRIVATE.maxItems
        });        
        
        STORAGE.addDependencies({
           maxItems             : PRIVATE.maxItems
        });
        
        
        /* --------------------- Initialization modules --------------------- */
        
        STORAGE.initModule();
        VIEW.initModule();
        
        
        /* --------------------- Listeners --------------------- */

        // Получаем данные
        app.eventManager.on('Models/productPage/getProductPage', PUBLIC.addItem);

    };

    return PUBLIC;
    
}());  
