app.models.productPage = (function() {
    
    var
        PUBLIC      = {},
        PRIVATE     = {},
        
        // Dependency injection container
        DI = {
            //configMap
            //stateMap
            //CART
        };
        
    // End var
    
    // Получение страницы с товаром
    PRIVATE.getProductPage = function(obj) {
        
        var 
            inCart          = false,
            json            = obj.json,
            lastPageNum;
        // --
        
        // Если перешли из категории общих товаров на страницу продукта, то не пишем в хлебных крошках номер страницы с которой пришли, т.к. страница уже указывает на свою родную категорию
        if(DI.stateMap.lastPageNum) {
            if(DI.configMap.defaultCategory !== DI.stateMap.lastCat) {
                lastPageNum = DI.stateMap.lastPageNum;
            }
        }
        
         // Если товар добавлен в корзину
        if(DI.CART.inStorage(json.id)) {
            inCart = true;
        }
        
        app.eventManager.trigger('Models/productPage/getProductPage', {
            json                : json,
            lastPageNum         : lastPageNum,
            inCart              : inCart
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
