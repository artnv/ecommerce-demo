app.views.menuCategories = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //showBreadcrumbs
        };
        
    // End var
    
    PUBLIC.template = {
        $tpl     : $("#categories")
    };
    
    PUBLIC.showCategories = function(data) {

        var 
            resultArr               = data.resultArr,
            ln                      = data.resultArr.length,
            selectedCat             = data.cat,
            hideDefaultCategory     = data.hideDefaultCategory,
            defaultCategory         = data.defaultCategory,
            i                       = 0,
            html                    = '',
            tmpHtml                 = '',
            mainCat                 = '',
            selectedCatTitle        = '',
            itemsCnt;
           

        for(;i<ln;i++) {
            
            if(resultArr[i].plus) {
                itemsCnt = '<span class="badge">+'+resultArr[i].plus+'</span>';
            } else {
                itemsCnt = '(' + resultArr[i].totalItems + ')';
            }
            
            // Вывод и выделение текущего каталоге в меню
            if(resultArr[i].alias === selectedCat) {
                
                tmpHtml = '<li class="active"><a href="#/'+resultArr[i].alias+'">'+resultArr[i].title+' '+itemsCnt+'</a></li>';

                selectedCatTitle = resultArr[i].title;
                
            } else {
                tmpHtml = '<li><a href="#/'+resultArr[i].alias+'">'+resultArr[i].title+' '+itemsCnt+'</a></li>';
            }

            
            // Если каталог по умолчанию
            if(resultArr[i].alias === defaultCategory) {
                
                // Если нужно скрыть из меню, каталог по умолчанию - скрываем
                if(!hideDefaultCategory) {
                    mainCat = '<li class="divider"></li>';
                    mainCat += tmpHtml;
                }
                
            } else {
                // Если остальные каталоги
                html += tmpHtml;
            }

        }
        
        html += mainCat;
        
        DI.showBreadcrumbs({
            type        : 'page',
            catTitle    : selectedCatTitle
        });

        PUBLIC.template.$tpl.html(html);
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/menuCategories/getMenuCategories', PUBLIC.showCategories);  
    };

    return PUBLIC;
    
}());  
