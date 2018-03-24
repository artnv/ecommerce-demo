// Работа с корзиной
app.models.cart = (function() {
    
    var 
        // Локальное хранилище в браузере
        browserStorage      = {
            prefix  : 'appCart'
        },
        
        PUBLIC      = {},
        PRIVATE     = {},
        
        // Dependency injection container
        DI = {
            //
        };

    // End vars
   
    browserStorage.addCart = function(arr) {
       localStorage.setItem(browserStorage.prefix, JSON.stringify(arr));
    };

    browserStorage.getCart = function() {
        
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
            arrItems   = browserStorage.getCart();
        // --     
 
        if(!obj) {return;}
        if(PUBLIC.inStorage(obj.id)) {return;}
        if(!obj.quantity) {
            obj.quantity = 1; // Количество предметов по умолчанию
        }
        
        arrItems.push(obj);
        browserStorage.addCart(arrItems);
    };
    
    PUBLIC.dropItem = function(obj) {

        var 
            items   = browserStorage.getCart(),
            ln      = items.length;
        // --     

        if(!obj) {return;}

        while(ln--) {
             if(items[ln].id == obj.id) {
                items.splice(ln, 1); // delete arr[i]
                browserStorage.addCart(items);
                return;
            }
        }
        
    };    
    
    PUBLIC.getItems = function() {
        app.eventManager.trigger('Models/cart/getItems', {
            items    : browserStorage.getCart()
        });
    };     
    
    PUBLIC.getTotalItems = function() {
        app.eventManager.trigger('Models/cart/getTotalItems', {
            totalItems    : browserStorage.getCart().length
        });
    };
    
    PUBLIC.inStorage = function(id) {
        
        var 
            arrItems    = browserStorage.getCart(),
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
        
        /* --------------------- Listeners --------------------- */
        
        app.eventManager.on('Views/cart/addToCart', function(data) {
            PUBLIC.addItem(data);
            PUBLIC.getTotalItems();
        });         
        
        app.eventManager.on('Views/cart/cartDropItem', function(data) {
            PUBLIC.dropItem(data);
            PUBLIC.getTotalItems();
            PUBLIC.getItems();
        });         
        
        app.eventManager.on('Views/cart/cartUpdateItemQuantity', function(data) {
            PUBLIC.dropItem(data);
            PUBLIC.addItem(data);
            PUBLIC.getItems();
        }); 
        
    };
    
    return PUBLIC;
    
}());
