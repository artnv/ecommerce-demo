//  Компонент переключения шаблонов.
//  Так же запускает и другие методы при переключении, если есть.
app.components.templateSwitcher = (function() {
    
    var
        PUBLIC      = {},

        template = {
            $allTemplates       : $('.app-template')
        },
        
        // Массив из объектов с методами, которые запускаются при переключении шаблона
        templateStorage = [],
        
        // Шаблон который до этого был активным
        lastTemplate,
        
        // Dependency injection container
        DI = {
            //
        };
        
    // End var

    // Перемотка страницы наверх
    PUBLIC.scrollUp = function() {
        window.scroll(0, 0);
    };
    
    // Переключает шаблоны и запускает функцию, которая содержит другие методы
    PUBLIC.switchTemplate = function(templateName) {

        var
            i = templateStorage.length;
        // --
        
        while(i--) {
            if(templateName == templateStorage[i].templateName) {
                
                // Если был определен метод afterSwitch то вызываем его перед переключением на новый шаблон
                if(lastTemplate) {
                    if(lastTemplate.afterSwitch) {
                        lastTemplate.afterSwitch();
                    }
                }
                
                lastTemplate = templateStorage[i];
                
                // Скрываем все шаблоны у которые есть специальный класс
                template.$allTemplates.hide();      
                
                // Запускаем методы при переключении (если есть)
                if(templateStorage[i].onSwitch) { 
                    templateStorage[i].onSwitch();
                }    
                
                PUBLIC.scrollUp();                 
                break;
                
            }
        }
        
    };

    // Регистрирует методы которые исполняются при переключении шаблона
    PUBLIC.registerTemplates = function(arr) {
        templateStorage = arr;
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {

    };

    return PUBLIC;
    
}());  
