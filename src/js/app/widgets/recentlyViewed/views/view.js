app.widgets.recentlyViewed.view = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //configMap
            //maxItems
        };
        
    // End var
    
    PUBLIC.getItemsHtml = function(obj) {
        
        var
            items               = obj.items,
            ln                  = items.length,
            html                = '',
            itemCounter         = 0,
            exceptItemById      = obj.exceptItemById;
        // --
        
        if(ln <= 0) {return;}

        html += '<div class="col-md-12">';
        html += '<h4>Вы недавно смотрели</h4>';
        html += '</div>';

        // Выводит все записи которые есть
        while(ln--) {
            
            if(exceptItemById != items[ln].id) {
                itemCounter++;
            } else {
                // Если нашли элемент который не нужно выводить, то его пропускаем
                continue;
            }
            
            // Ограничитель вывода
            if(itemCounter > DI.maxItems) {
                break;
            }
            
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

        if(itemCounter <= 0) {return;}
        return html;
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {

    };

    return PUBLIC;
    
}());  
