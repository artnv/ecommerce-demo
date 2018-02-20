app.models.recentlyViewed = (function() {
    
    var 
        // Локальное хранилище в браузере
        browserStorage  = {
            prefix  : 'appRecentlyViewed'
        }, 
        
        PUBLIC      = {},
        PRIVATE     = {};
    
    // End vars
   
    browserStorage.addItems = function(arr) {
       localStorage.setItem(browserStorage.prefix, JSON.stringify(arr));
    };

    browserStorage.getItems = function() {
        
        var
            arrItems = localStorage.getItem(browserStorage.prefix);
        // --
        
        if(arrItems) {
            return JSON.parse(arrItems);
        }
        
       return [];

    };
   
    PUBLIC.addItem = function(obj) {
        
        var 
            json            = obj.json,
            arrItems        = browserStorage.getItems(),
            maxElements     = 7,
            item;
        // --     

        if(!json) {return;}
        
        if(PUBLIC.inStorage(json.id)) {return;}
        
        // Добавляем новый элемент, а старый удаляем
        if(arrItems.length >= maxElements) {
            arrItems.shift();
        }
        
        item    = {
            id      : json.id,
            img     : json.img,
            title   : json.title,
            price   : json.price,
            alias   : json.alias
        };
        
        arrItems.push(item);
        browserStorage.addItems(arrItems);

    };

    PUBLIC.getItems = function() {
       return browserStorage.getItems();
    };

    PUBLIC.inStorage = function(id) {
        
        var
            arrItems    = browserStorage.getItems(),
            ln          = arrItems.length;
        // --

        while(ln--) {
            if(arrItems[ln].id == id) {
                return true; // если уже есть товар то выходим
            }
        }
        
        return false;
        
    };
    
    PUBLIC.initModule = function() {
        
        /* --------------------- Listeners --------------------- */
        
        var callGetItemsEvent = function() {
            app.eventManager.trigger('Models/RecentlyViewed/getItems', {
                items    : PUBLIC.getItems()
            });
        };
        
        // Сохраняем
        app.eventManager.on('Models/productPage/getProductPage', function(data) {
            PUBLIC.addItem(data);
            callGetItemsEvent();
        });
        
        // Отдаем
        app.eventManager.on('Models/cart/getItems', callGetItemsEvent);
        app.eventManager.on('Router/accountProfile', callGetItemsEvent);
        app.eventManager.on('Models/productPage/getProductPage', callGetItemsEvent);
        
    };
    
    return PUBLIC;
    
}());
