app.views.error404Page = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //showBreadcrumbs
        };
        
    // End var
    
    PUBLIC.template = {
        $tpl            : $('#tpl-page-error404'),
        $content        : $('#tpl-page-error404-content')
    };
    
    PUBLIC.show404 = function() {

        DI.showBreadcrumbs({
            type           : '404',
            title          : 'Ошибка 404. Страница не найдена!'
        });
        
        var youtube = ' <p><iframe width="854" height="480" src="https://www.youtube.com/embed/UkSiywrWG3A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></p>';
        
        PUBLIC.template.$content.html('<h1>Ошибка 404</h1><p>Страница не найдена!</p><p><a class="btn btn-primary btn-lg" href="#/">Перейти на главную страницу</a></p>' + youtube);
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */

    };

    return PUBLIC;
    
}());  
