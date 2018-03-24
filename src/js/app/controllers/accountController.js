// Контроллер для аккаунта пользователя
app.controllers.accountController = (function() {
    
    var
        PUBLIC  = {},
        ACTIONS = {},
        
        MODELS, VIEWS,
        
        // Dependency injection container
        DI = {
            //
        };
        
    // End vars

    // Профиль пользователя
    ACTIONS.profile = function() {

        VIEWS.accountProfile.showProfilePage();
        MODELS.cart.getTotalItems();
        
        // Запросы к серверу
        MODELS.net.getMenuCategories(); 

    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
 
    PUBLIC.initModule = function() {
        
        MODELS          = app.models;
        VIEWS           = app.views;
        
  
        /* --------------------- Listeners --------------------- */
        
        // Страница пользователя
        app.eventManager.on('Router/account/profile', ACTIONS.profile);        
        
    };
    
    return PUBLIC;
    
}());
