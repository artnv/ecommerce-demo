// Данные которые изменяют и используют различные модули
app.components.stateStorage = (function() {
    
    var
        PUBLIC  = {
            // Динамически обновляемые параметры
            stateMap    : {
                
                // Для хлебных крошек. Номер той страницы с которой перешли
                lastPageNum     : undefined,
                
                // Разница между новыми данными и из кеша
                catDiffArr      : undefined,
                
                // Для повторного обновления меню-категорий, если без параметров в url 
                lastCat         : undefined     
            }
        },

        // Dependency injection container
        DI = {
            //
        };
        
    // End var

    PUBLIC.flushLastPage = function() {
        PUBLIC.stateMap.lastPageNum    = undefined;
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {

    };

    return PUBLIC;
    
}());  
