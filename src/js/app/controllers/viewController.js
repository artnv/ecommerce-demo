// Инициализация видов и так же содержит общие, управляющие методы шаблонами
app.views.viewController = (function() {
    
    var
        PUBLIC      = {},
        PRIVATE     = {},
    
        // Обновляемые данные
        stateMap    = {
            pageType            : undefined,
            defaultWindowTitle  : undefined
        },
        
        template = {
            $allTemplates       : $('.app-template')
        },
        
        // Dependency injection container
        DI = {
            //configMap
            //modelController
        },
        
        // Views modules
        PRODUCT_PAGE,       CATEGORY_PAGE,      UPDATE_LABEL,       CART,
        MENU_CATEGORIES,    RECENTLY_VIEWED,    ACCOUNT_PROFILE,    ERROR_404_PAGE;

    // End vars

    // Отображает хлебные крошки
    PRIVATE.showBreadcrumbs = function(obj) {

        var 
            html                = 'Категории',
            type                = obj.type,
            urlParamsStr        = '';

        // Если текущая страница не соответствует странице из приходящих данных
        if(type !== stateMap.pageType) {
            return;
        }

        switch(stateMap.pageType) {
        case 'product':
        
            if(obj.lastPageNum) {
                urlParamsStr = '/page/' + obj.lastPageNum;
            }
        
            html = '<li>'+ html +'</li><li><a href="#/'+ obj.alias + urlParamsStr +'">'+obj.catTitle+'</a></li><li class="active">'+ obj.pTitle +'</li>';

            PRODUCT_PAGE.template.$breadcrumb.html(html);
            PRIVATE.setTitle(stateMap.defaultWindowTitle +' / '+ obj.catTitle +' / '+  obj.pTitle);
            
        break;        
        case 'page':

            html = '<li>'+ html +'</li>' + '<li class="active">'+ obj.catTitle +'</li>';
            
            CATEGORY_PAGE.template.$breadcrumb.html(html);
            PRIVATE.setTitle(stateMap.defaultWindowTitle +' / '+obj.catTitle);
            
        break;        
        case 'cart':
            PRIVATE.setTitle(stateMap.defaultWindowTitle +' / '+obj.title);
        break;
        case '404':
            PRIVATE.setTitle(stateMap.defaultWindowTitle +' / '+obj.title);
        break;        
        case 'accountProfile':
            PRIVATE.setTitle(stateMap.defaultWindowTitle +' / '+obj.title);
        break;
        }
  
    };

    PRIVATE.setTitle = function(arg) {
        window.document.title = arg;
    };    
    
    PRIVATE.getTitle = function() {
        return window.document.title;
    };
    
    // Для хлебных крошек
    PRIVATE.setPageType = function(arg) {
        CATEGORY_PAGE.template.$breadcrumb.html('');
        PRODUCT_PAGE.template.$breadcrumb.html('');
        stateMap.pageType = arg;
    };
    
    // Переключение и операции со статичными шаблонами
    PUBLIC.switchPage = function(page) {
        switch(page) {
        case 'product':
            PRIVATE.setPageType(page);    
            template.$allTemplates.hide();
            RECENTLY_VIEWED.template.$content.html('');
            PRODUCT_PAGE.template.$content.html('');
            PRODUCT_PAGE.template.$tpl.show();
            PRIVATE.scrollUp();
        break;
        case 'page':
            PRIVATE.setPageType(page);  
            template.$allTemplates.hide();
            CATEGORY_PAGE.template.$tpl.show();
            PRIVATE.scrollUp();
        break;
        case 'cart':
            PRIVATE.setPageType(page);  
            template.$allTemplates.hide();
            RECENTLY_VIEWED.template.$content.html('');
            CART.template.$content.html('');
            CART.template.$tpl.show();
            PRIVATE.scrollUp(); 
            // Очищаем номер последней страницы в хлебных крошках у товара, чтобы он не применялся к другим товарам
            DI.modelController.flushLastPage(); 
        break;
        case 'accountProfile':
            PRIVATE.setPageType(page);  
            template.$allTemplates.hide();
            RECENTLY_VIEWED.template.$content.html('');
            ACCOUNT_PROFILE.template.$tpl.show();
            ACCOUNT_PROFILE.showProfilePage(); // Прямой вызов отображения, т.к нет событий для статичной страницы
            PRIVATE.scrollUp();
        break;
        case '404':
            PRIVATE.setPageType(page);  
            template.$allTemplates.hide();
            ERROR_404_PAGE.template.$tpl.show();
            ERROR_404_PAGE.show404();
            PRIVATE.scrollUp();
        break;
        }
    };
    
    // Перемотка страницы наверх
    PRIVATE.scrollUp = function() {
        $(window).scrollTop(0);
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        
        var
            ROUTER          = app.router,
            Model_CART      = app.models.cart;
        // --    
 
        // Для хлебных крошек
        stateMap.defaultWindowTitle = PRIVATE.getTitle();

        // Views modules
        PRODUCT_PAGE                = app.views.productPage;
        CATEGORY_PAGE               = app.views.categoryPage;
        UPDATE_LABEL                = app.views.updateLabel;
        MENU_CATEGORIES             = app.views.menuCategories;
        CART                        = app.views.cart;
        RECENTLY_VIEWED             = app.views.recentlyViewed;
        ERROR_404_PAGE              = app.views.error404Page;
        ACCOUNT_PROFILE             = app.views.accountProfile;
        

        /* --------------------- Dependency injection --------------------- */
        
        PRODUCT_PAGE.addDependencies({
            showBreadcrumbs     : PRIVATE.showBreadcrumbs,
            CART                : Model_CART,
            configMap           : DI.configMap
        });            
        
        CATEGORY_PAGE.addDependencies({
            CART                : Model_CART,
            configMap           : DI.configMap
        });            
        
        UPDATE_LABEL.addDependencies({
            ROUTER              : ROUTER
        });            
        
        MENU_CATEGORIES.addDependencies({
            showBreadcrumbs     : PRIVATE.showBreadcrumbs,
        });            
        
        CART.addDependencies({
            showBreadcrumbs     : PRIVATE.showBreadcrumbs,
            CATEGORY_PAGE       : CATEGORY_PAGE,
            PRODUCT_PAGE        : PRODUCT_PAGE,
            configMap           : DI.configMap
        });        
        
        ERROR_404_PAGE.addDependencies({
            showBreadcrumbs     : PRIVATE.showBreadcrumbs
        });        
        
        ACCOUNT_PROFILE.addDependencies({
            showBreadcrumbs     : PRIVATE.showBreadcrumbs
        });     
        
        RECENTLY_VIEWED.addDependencies({
           configMap           : DI.configMap
        });
        
       
        /* --------------------- Initialization modules --------------------- */
        
        PRODUCT_PAGE.initModule();
        CATEGORY_PAGE.initModule();
        UPDATE_LABEL.initModule();
        MENU_CATEGORIES.initModule();
        CART.initModule();
        RECENTLY_VIEWED.initModule();
        ERROR_404_PAGE.initModule();
        ACCOUNT_PROFILE.initModule();
        
    };

    return PUBLIC;
    
}());  
