app.models.productPage = (function() {
    
    var
        PUBLIC      = {},
        PRIVATE     = {},
        
        // Dependency injection container
        DI = {
            //configMap
            //stateMap
        };
        
    // End var
    
    // Получение страницы с товаром
    PRIVATE.getProductPage = function(obj) {
        
        var lastPageNum;
        
        // Если перешли из категории общих товаров на страницу продукта, то не пишем в хлебных крошках номер страницы с которой пришли, т.к. страница уже указывает на свою родную категорию
        if(DI.stateMap.lastPageNum) {
            if(DI.configMap.defaultCategory !== DI.stateMap.lastCat) {
                lastPageNum = DI.stateMap.lastPageNum;
            }
        }
        
        app.eventManager.trigger('Models/productPage/getProductPage', {
            json                : obj.json,
            lastPageNum         : lastPageNum
        });

    };

    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/net/getProductPage', PRIVATE.getProductPage);
    };

    return PUBLIC;
    
}());  
