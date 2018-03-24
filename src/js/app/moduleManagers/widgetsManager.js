// Инициализация всех модулей виджетов и установка их зависимостей
app.moduleManagers.widgetsManager = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //
        };
        
    // End var
    

    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        
        var
            WIDGETS     = app.widgets;
        // --
        
        
        /* --------------------- Dependency injection --------------------- */
        
        WIDGETS.recentlyViewed.addDependencies({
           configMap           : DI.configMap
        });
        
        
        /* --------------------- Initialization modules --------------------- */
        
        WIDGETS.recentlyViewed.initModule();
        WIDGETS.breadcrumbs.initModule();
        WIDGETS.title.initModule();
        
    };

    return PUBLIC;
    
}());
