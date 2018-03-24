// Виджет для работы с хлебными крошками
app.widgets.breadcrumbs = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //
        };
        
    // End var
    
    PUBLIC.set = function(arr) {

        var
            ln          = arr.length,
            i           = 0,
            html        = '',
            active      = '';
        // --
        
        for(i=0; i<ln; i++) {
            
            if(arr[i].active) { active = ' class="active"'; } else { active = ''; }
            
            if(arr[i].link && arr[i].text) {
 
                html += '<li'+ active +'><a href="'+ arr[i].link +'">'+ arr[i].text +'</a></li>';
                
            } else if (arr[i].text) {
                html += '<li'+ active +'>'+ arr[i].text +'</li>';
            }

        }
    
        html = '<ol class="breadcrumb">'+ html +'</ol>';
        return html;

    };

    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {

    };

    return PUBLIC;
    
}());  
