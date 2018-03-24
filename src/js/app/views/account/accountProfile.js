// Страница с профилем пользователя
app.views.accountProfile = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //switchTemplate
            //widgets
        };
        
    // End var
    
    PUBLIC.template = {
        $tpl                    : $('#tpl-page-account-profile'),
        $recentlyViewed         : $('#tpl-page-account-profile .recently-viewed')
    };

    PUBLIC.showProfilePage = function(obj) {
        
        DI.widgets.title.set(
            DI.widgets.title.getDefault() + ' / Профиль пользователя'
        );
        
        PUBLIC.template.$recentlyViewed.html(
            DI.widgets.recentlyViewed.getItemsHtml()
        );
        
        DI.switchTemplate('accountProfile');
        
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };    
       
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
    };

    return PUBLIC;
    
}());  
