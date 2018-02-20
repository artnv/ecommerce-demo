// Летающая плашка. Показывает сколько товаров было добавлено, после автообновления
app.views.updateLabel = (function() {
    
    var
        PUBLIC      = {},
        PRIVATE     = {
            updLabelAlias   : undefined
        },

        // Dependency injection container
        DI = {
            //ROUTER
        };
        
    // End var
    
    PUBLIC.template = {
        $container      : $("#upd-label"),
        $plus           : $("#upd-label-plus"),
        $minus          : undefined,                // Функционал есть, но не выводится (сколько удалили страниц)
        $button         : $("#upd-label-btn")
        //bindListeners
    };
    
    PRIVATE.onLabelPageUpdate = function(alias) {
        DI.ROUTER.redirectTo('#/'+alias);
    };
    
    PUBLIC.template.bindListeners = function() {
        
        // Летающая плашка
        $(window).scroll(function() {
            if ($(window).scrollTop() > 51) {
                PUBLIC.template.$container.addClass("upd-label-canfly");
            } else { 
                PUBLIC.template.$container.removeClass("upd-label-canfly");
            }
        });        
        
        // Кнопка обновления на летающей плашке
        PUBLIC.template.$button.click(function() {
            PUBLIC.template.$container.hide();
            PRIVATE.onLabelPageUpdate(PRIVATE.updLabelAlias);
            PRIVATE.updLabelAlias = '';
        });
        
    };

    PUBLIC.showUpdLabel = function(obj) {

        if(!obj) { return; }

        if(obj.plus > 0) {
           
           // minus = 2     Сколько продуктов было удалено из текущей категории
           // plus  = 3     Сколько добавлено
           
           PRIVATE.updLabelAlias = obj.alias;
           
           PUBLIC.template.$container.show();
           PUBLIC.template.$plus.html('+' + obj.plus);
           
        }
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        PUBLIC.template.bindListeners();
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/autoUpdate/checkUpdate', PUBLIC.showUpdLabel);
    };

    return PUBLIC;
    
}());  
