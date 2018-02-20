app.views.accountProfile = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //showBreadcrumbs
        };
        
    // End var
    
    PUBLIC.template = {
        $tpl                    : $('#tpl-page-account-profile')
    };

    PUBLIC.showProfilePage = function(obj) {
        DI.showBreadcrumbs({
            type           : 'accountProfile',
            title          : 'Профиль пользователя'
        });
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };    
       
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
    };

    return PUBLIC;
    
}());  
