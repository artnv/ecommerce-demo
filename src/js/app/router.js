// Маршрутизатор приложения
app.router = (function() {
    
    var 
        PRIVATE     = {},
        PUBLIC      = {};

    // End vars
    
    PRIVATE.RoutesObj = Backbone.Router.extend({
    
        routes: {
            ''                  : 'categoryPage',
            '/'                 : 'categoryPage',
            '404'               : 'pageNotFound',
            '/404'              : 'pageNotFound',
            'account/profile'   : 'accountProfile',
            'cart'              : 'cart',
            'cart/'             : 'cart',
            ':cat/:id'          : 'productPage',
            ':cat'              : 'categoryPage',
            ':cat/'             : 'categoryPage',
            ':cat/page/:page'   : 'categoryPage',
            '*random'           : 'pageNotFound'
        },
        
        categoryPage    : function (cat, page) {
           app.eventManager.trigger("Router/categoryPage", cat, page);
        },
        
        productPage     : function (cat, id) {
           app.eventManager.trigger("Router/productPage", cat, id);
        },   
        
        pageNotFound    : function () {
           app.eventManager.trigger("Router/pageNotFound");
        },        
        
        cart            : function () {
           app.eventManager.trigger("Router/cart");
        },

        accountProfile  : function () {
           app.eventManager.trigger("Router/account/profile");
        }
        
    });

    PUBLIC.redirectTo = function (url) {
        PUBLIC.router.navigate(url, {trigger: true});     
    };
    
    PUBLIC.initModule = function () {
        PUBLIC.router = new PRIVATE.RoutesObj();
        Backbone.history.start();
    };

    return PUBLIC;
    
}());
