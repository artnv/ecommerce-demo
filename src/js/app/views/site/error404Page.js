// Страница с ошибкой 404
app.views.error404Page = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //widgets
            //switchTemplate
        };
        
    // End var
    
    PUBLIC.template = {
        $tpl            : $('#tpl-page-error404'),
        $content        : $('#tpl-page-error404-content')
    };
    
    PUBLIC.show404 = function() {

        var youtube = '<div class="embed-responsive embed-responsive-16by9"><iframe width="854" height="480" src="https://www.youtube.com/embed/UkSiywrWG3A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';
        
        PUBLIC.template.$content.html('<h1>Ошибка 404</h1><p>Страница не найдена!</p><p><a class="btn btn-primary btn-lg" href="#/">Перейти на главную страницу</a></p>' + youtube);
        
        DI.widgets.title.set(
            DI.widgets.title.getDefault() + ' / Ошибка 404. Страница не найдена!'
        );
        
        DI.switchTemplate('404');
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */

    };

    return PUBLIC;
    
}());  
