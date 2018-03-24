// Инициализация всех модулей контроллеров и установка их зависимостей
app.moduleManagers.controllersManager = (function() {
    
    var
        PUBLIC      = {},
        
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
            CONTROLLERS     = app.controllers;
        // --
        
       /* --------------------- Dependency injection --------------------- */
        
        CONTROLLERS.siteController.addDependencies({
            configMap       : DI.configMap
        });         
        
        CONTROLLERS.accountController.addDependencies({
            configMap       : DI.configMap
        });   
        
        
        /* --------------------- Initialization modules --------------------- */
        
        CONTROLLERS.siteController.initModule();
        CONTROLLERS.accountController.initModule();
        
    };

    return PUBLIC;
    
}());  
