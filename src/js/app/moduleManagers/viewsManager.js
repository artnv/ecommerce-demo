// Инициализация всех модулей представлений и установка их зависимостей
app.moduleManagers.viewsManager = (function() {

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
            ROUTER                      = app.router,
            VIEWS                       = app.views,
            COMPONENTS                  = app.components,
            WIDGETS                     = app.widgets;
        
        // --
        
        
        /* --------------------- Dependency injection --------------------- */
        
        VIEWS.productPage.addDependencies({
            widgets             : WIDGETS,
            configMap           : DI.configMap,
            switchTemplate      : COMPONENTS.templateSwitcher.switchTemplate
        });
        
        VIEWS.categoryPage.addDependencies({
            configMap           : DI.configMap,
            switchTemplate      : COMPONENTS.templateSwitcher.switchTemplate,
            widgets             : WIDGETS
        });
        
        VIEWS.updateLabel.addDependencies({
            ROUTER              : ROUTER
        });
        
        VIEWS.cart.addDependencies({
            widgets             : WIDGETS,
            CATEGORY_PAGE       : VIEWS.categoryPage,
            PRODUCT_PAGE        : VIEWS.productPage,
            configMap           : DI.configMap,
            switchTemplate      : COMPONENTS.templateSwitcher.switchTemplate
        });
        
        VIEWS.error404Page.addDependencies({
            widgets             : WIDGETS,
            switchTemplate      : COMPONENTS.templateSwitcher.switchTemplate
        });
        
        VIEWS.accountProfile.addDependencies({
            widgets             : WIDGETS,
            switchTemplate      : COMPONENTS.templateSwitcher.switchTemplate
        });

       
        /* --------------------- Register templates --------------------- */
        
        COMPONENTS.templateSwitcher.registerTemplates([
            {
                templateName : 'product',
                onSwitch : function() {
                    VIEWS.productPage.template.$tpl.show();
                }
            }, 
            {
                templateName : 'page',
                onSwitch : function() {
                    VIEWS.categoryPage.template.$tpl.show();
                }
            }, 
            {
                templateName : 'cart',
                onSwitch : function() {
                    VIEWS.cart.template.$tpl.show();
                    // Очищаем номер последней страницы в хлебных крошках у товара, чтобы он не применялся к другим товарам
                    COMPONENTS.stateStorage.flushLastPage(); 
                }
            }, 
            {
                templateName : 'accountProfile',
                onSwitch : function() {
                    VIEWS.accountProfile.template.$tpl.show();  
                }
            }, 
            {
                templateName : '404',
                onSwitch : function() {
                    VIEWS.error404Page.template.$tpl.show();
                }
            }
        ]);
        
        
        /* --------------------- Initialization modules --------------------- */
        
        // Views
        VIEWS.productPage.initModule();
        VIEWS.categoryPage.initModule();
        VIEWS.updateLabel.initModule();
        VIEWS.menuCategories.initModule();
        VIEWS.cart.initModule();
        VIEWS.error404Page.initModule();
        VIEWS.accountProfile.initModule();

    };

    return PUBLIC;
    
}());  
