// Главный файл приложения и начало пространства имен
var app = (function() {
    
    var
        configMap = {
            // Автоматическое обновление категорий, если добавился или удалился товар.
            // Если 0 то функция отключена.
            // Если больше нуля, например 30000, то каждые 30 секунд функция будет проверять контент
            contentAutoUpdateTime   : 0,
            
            // alias категории "по умолчанию"
            defaultCategory         : 'main',

            // Скрыть категорию "по умолчанию"            
            hideDefaultCategory     : false,
            
            // Включение кеширования. Без него не работает автообновление
            cacheEnabled            : true,         
            
            // Путь к картинкам
            imagesPath              : 'uploads/images/'
        },
        
        PUBLIC = {
            
            eventManager        : _.clone(Backbone.Events),
            router              : undefined,
            
            // Namespace
            moduleManagers      : {},
            components          : {},
            widgets             : {},
            controllers         : {},
            models              : {},
            views               : {}

        };
        
    // End vars
    
    PUBLIC.initModule = function() {

        var
            ROUTER              = PUBLIC.router,
            MODULE_MANAGERS     = PUBLIC.moduleManagers;
        // --

       
       /* --------------------- Dependency injection --------------------- */
        
        MODULE_MANAGERS.controllersManager.addDependencies({
            configMap       : configMap
        });         
 
        MODULE_MANAGERS.modelsManager.addDependencies({
            configMap       : configMap
        });        
        
        MODULE_MANAGERS.widgetsManager.addDependencies({
            configMap       : configMap
        });

        MODULE_MANAGERS.viewsManager.addDependencies({
            configMap       : configMap,
        });
        

        /* --------------------- Initialization modules --------------------- */
        
        MODULE_MANAGERS.widgetsManager.initModule();
        MODULE_MANAGERS.componentsManager.initModule();
        MODULE_MANAGERS.viewsManager.initModule();
        MODULE_MANAGERS.modelsManager.initModule();
        MODULE_MANAGERS.controllersManager.initModule();
        
        ROUTER.initModule();

    };

    return PUBLIC;
    
}());
