app.views.recentlyViewed = (function() {
    
    var
        PUBLIC      = {},
        PRIVATE     = {},
        
        // Dependency injection container
        DI = {
            //configMap
        };
        
    // End var
    
    PUBLIC.template = {
        $content        : $('.recently-viewed-content')
    };
    
    PRIVATE.recentlyViewedShowItems = function(obj) {
        
        var
            items   = obj.items,
            ln      = obj.items.length - 1,
            html    = '';
        // --
        
        if(ln <= 0) {return;}
        
        html += '<div class="col-md-12">';
        html += '<h4>Вы недавно смотрели</h4>';
        html += '</div>';
            
        while(ln--) {
            html += '<div class="col-xs-6 col-md-2">';
            html +=    '<a href="#/'+items[ln].alias+'/'+items[ln].id+'" class="thumbnail nodecoration">';
            html +=        '<img src="'+ DI.configMap.imagesPath + items[ln].img +'">';
            html +=        '<div class="caption">';
            html +=             '<h5>'+items[ln].title+'</h5>';
            html +=             '<strong>$'+items[ln].price+'</strong>';
            html +=        '</div>';
            html +=    '</a>';
            html += '</div>';
        }
        
        PUBLIC.template.$content.html(html);
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/RecentlyViewed/getItems', PRIVATE.recentlyViewedShowItems);
    };

    return PUBLIC;
    
}());  
