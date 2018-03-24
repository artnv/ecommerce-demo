// Виджет для работы с title в браузере
app.widgets.title = (function() {
    
    var
        PUBLIC                  = {},
        defaultWindowTitle      = '',

        // Dependency injection container
        DI = {
            //
        };
        
    // End var

    PUBLIC.set = function(arg) {
        window.document.title = arg;
    };    
    
    PUBLIC.get = function() {
        return window.document.title;
    };    
    
    PUBLIC.getDefault = function() {
        return defaultWindowTitle;
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        defaultWindowTitle = PUBLIC.get();
    };

    return PUBLIC;
    
}());  
