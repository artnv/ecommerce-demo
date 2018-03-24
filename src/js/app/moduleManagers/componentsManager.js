// Инициализация всех модулей компонентов и установка их зависимостей
app.moduleManagers.componentsManager = (function() {
    
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
            COMPONENTS     = app.components;
        // --
        
        
        /* --------------------- Dependency injection --------------------- */
        
        
        /* --------------------- Initialization modules --------------------- */
        
        COMPONENTS.templateSwitcher.initModule();
        COMPONENTS.stateStorage.initModule();

        
    };

    return PUBLIC;
    
}());
