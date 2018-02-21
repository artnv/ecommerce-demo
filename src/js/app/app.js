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
            
            eventManager    : _.clone(Backbone.Events),
            
            router          : undefined,
            controllers     : {},
            models          : {},
            views           : {}

        };
        
    // End vars
    
    PUBLIC.initModule = function() {

        var
            MODELS          = PUBLIC.models,
            VIEWS           = PUBLIC.views,
            CONTROLLERS     = PUBLIC.controllers,
            ROUTER          = PUBLIC.router;
        // --

       
       /* --------------------- Dependency injection --------------------- */
        
        CONTROLLERS.routerController.addDependencies({
            configMap       : configMap
        });      
        
        MODELS.modelController.addDependencies({
            configMap       : configMap
        });

        VIEWS.viewController.addDependencies({
            configMap           : configMap,
            modelController     : MODELS.modelController
        });


        /* --------------------- Initialization modules --------------------- */
        
        VIEWS.viewController.initModule();
        CONTROLLERS.routerController.initModule();
        MODELS.modelController.initModule();
        ROUTER.initModule();

    };

    
    return PUBLIC;
    
}());
