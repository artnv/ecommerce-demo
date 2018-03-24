app.widgets.recentlyViewed.storage = (function() {
    
    var 
        // Локальное хранилище в браузере
        browserStorage  = {
            prefix  : 'appRecentlyViewed'
        }, 
        
        PUBLIC      = {},

        // Dependency injection container
        DI = {
            //maxItems
        };
        
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
            maxItems        = DI.maxItems + 1, // +1 элемент понадобится когда будем исключать текущий
            item;
        // --     

        if(!json) {return;}
        
        if(PUBLIC.inStorage(json.id)) {return;}
        
        // Добавляем новый элемент, а старый удаляем, если достигнут лимит
        if(arrItems.length >= maxItems) {
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
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {

    };
    
    return PUBLIC;
    
}());
