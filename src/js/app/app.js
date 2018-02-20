// Главный файл приложения и начало пространства имен
var app = (function() {
    
    var
        configMap = {
            contentAutoUpdateTime   : 0,            // Автоматическое обновление категорий, если добавися новый товар. Если 0 то функция отключена
            defaultCategory         : 'main',       // alias категории "по умолчанию"
            hideDefaultCategory     : false,        // Скрыть категорию "по умолчанию"
            cacheEnabled            : true,         // Включение кеширования. Без него не работает автообновление
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
        // End vars

       
       /* --------------------- Dependency injection --------------------- */
        
        CONTROLLERS.routerController.addDependencies({
            configMap       : configMap
        });      
        
        MODELS.modelController.addDependencies({
            configMap       : configMap
        });

        VIEWS.viewController.addDependencies({
            configMap       : configMap
        });


        /* --------------------- Initialization modules --------------------- */
        
        VIEWS.viewController.initModule();
        CONTROLLERS.routerController.initModule();
        MODELS.modelController.initModule();
        ROUTER.initModule();


        /* --------------------- DEMO (Далее можно всё удалять) --------------------- */
        /*
        setTimeout(function() {
            // Эмулируем добавление нового продукта в каталог
            VIEWS.updateLabel.showUpdLabel({
                plus : 2,
                alias : 'main',
            });
        }, 7000);
        */
        // end. DEMO
        
    };

    
    return PUBLIC;
    
}());
