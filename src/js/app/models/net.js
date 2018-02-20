// Модуль связи. Все запросы идут через него
app.models.net = (function() {
    
    var 

        // Methods
        PUBLIC      = {},
        PRIVATE     = {},
        
        // Dependency injection container
        DI = {
            //CACHE
            //configMap
            //ROUTER
        };

    // End vars
    
    // Автоматически опрашивает сервер на наличие обновлений
    PRIVATE.contentAutoUpdate = function() {
        
        var 
            updTime         = DI.configMap.contentAutoUpdateTime,
            cacheEnabled    = DI.configMap.cacheEnabled,
            lock            = false, // блокирует повторное обращение пока не придет ответ
            checkUpdate;
            
        // Если значение у таймера 0 или кеш отключен. То проверка обновлений работать не будет
        if(updTime <= 0 || !cacheEnabled) {
            return;
        }
 
        checkUpdate = function() {

            if(lock) {
                return;
            }

            lock = true;
  
            $.ajax({
                method      : 'POST',
                dataType    : 'json',
                url         : 'exec.php',
                data        : {act: 'getMenuCategories'}
            }).done(function(msg) {
                lock = false;
                app.eventManager.trigger('Models/net/checkUpdate', {
                    json    : msg
                });
            }); 

        };
        
        setInterval(checkUpdate, updTime);
        
    };
    
    // Список категорий для меню
    PUBLIC.getMenuCategories = function(cat, pageNum) {

        var
            result          = DI.CACHE.getMenuCategories(),
            returnObj       = {
                cat         : cat,
                pageNum     : pageNum,
                json        : undefined
            },
            callEvent;           
            
        callEvent = function(msg) {
            returnObj.json = msg;
            app.eventManager.trigger('Models/net/getMenuCategories', returnObj);
        };
        
        
        // Если нет в кеше, отправляем запрос
        if(!result) {

            $.ajax({
                method      : 'POST',
                dataType    : 'json',
                url         : 'exec.php',
                data        : {act: 'getMenuCategories'}
            }).done(function(msg) {
                if(msg) {
                    DI.CACHE.addMenuCategories(msg);
                }
                callEvent(msg);
            }); 
            
        } else {
            callEvent(result);
        }

    };
    
    // Страница с товарами
    PUBLIC.getCategoryPage = function(cat, pageNum) {

        var
            result          = DI.CACHE.getCategoryPage(cat, pageNum),
            returnObj       = {
                pageNum     : pageNum,
                cat         : cat,
                json        : undefined
            },
            callEvent,
            ajx;
        
        callEvent = function(msg) {
            returnObj.json = msg;
            app.eventManager.trigger('Models/net/getCategoryPage', returnObj);
        };    

        if(!result) {

            ajx = {
                method      : "POST",
                dataType    : 'json',
                url         : "exec.php",
                data        : {
                    act         : "getCategoryPage",
                    cat         : cat,
                    page        : pageNum
                }
            };

            $.ajax(ajx).done(function(msg) {
                if(msg && msg.status == 'ok') {
                    DI.CACHE.addCategoryPage(msg);
                    callEvent(msg);
                } else {
                    DI.ROUTER.redirectTo('#/404');
                }
            }); 
            
        } else {
            callEvent(result);
        }

    };
    
    // Страница с товаром
    PUBLIC.getProductPage = function(id) {

        var
            result      = DI.CACHE.getProductPage(id),
            returnObj   = {
                id      : id,
                json    : undefined
            },
            callEvent;

        callEvent = function(msg) {
            returnObj.json = msg;
            app.eventManager.trigger('Models/net/getProductPage', returnObj);
        };     

        if(!result) {

            $.ajax({
                method      : "POST",
                dataType    : 'json',
                url         : "exec.php",
                data        : {act: "getProductPage", id: id}
            }).done(function(msg) {
                if(msg && msg.status == 'ok') {
                    DI.CACHE.addProductPage(msg);
                    callEvent(msg);
                } else {
                    DI.ROUTER.redirectTo('#/404');
                }
            }); 

        } else {
            callEvent(result);
        }
 
    };    
    
    // Товары из корзины
    PUBLIC.getCartItems = function(obj) {

        var callEvent = function(msg) {
            app.eventManager.trigger('Models/net/getCartItems', msg);
        };
        // --
        
        if(obj.items <= 0) {
            callEvent();
            return;
        }
    
        $.ajax({
            method      : "POST",
            dataType    : 'json',
            url         : "exec.php",
            data        : {act: "getCartItems", items: JSON.stringify(obj.items)}
        }).done(function(msg) {
            callEvent(msg)
        });

    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        
        PRIVATE.contentAutoUpdate();
        
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/cart/getItems', PUBLIC.getCartItems);  
        
    };
    
    return PUBLIC;
    
}());
