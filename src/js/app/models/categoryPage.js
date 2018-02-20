app.models.categoryPage = (function() {
    
    var
        PUBLIC      = {},
        PRIVATE     = {},
        
        // Dependency injection container
        DI = {
            //configMap
            //stateMap
        };
        
    // End var
    
    // Страница категорий с товарами
    PRIVATE.getCategoryPage = function(obj) {
        
        var
            json        = obj.json,
            cat         = obj.cat,
            pageNum     = obj.pageNum,
            result      = {
                json        : json.items,
                cat         : cat,
                pageNum     : pageNum
            };
        // --

        if(!cat) {
            result.cat = DI.configMap.defaultCategory;
        }

        // На главной начинать с первой страницы
        if(!pageNum) {
            pageNum = 1;
        }
        
        DI.stateMap.lastPageNum    = pageNum;
        DI.stateMap.lastCat        = cat;
       
        app.eventManager.trigger('Models/categoryPage/getCategoryPage', result);
    };

    PRIVATE.getCatLinks = function(obj) {

        var
            cat                 = obj.cat,
            pageNum             = obj.pageNum,
            showTotalItems      = obj.json.showTotalItems,
            items               = obj.json.categories,
            ln                  = items.length,
            totalItems;
        // --
        
        if(!pageNum) {
            pageNum = 1;
        }
        
        while(ln--) {
            if(items[ln].alias === cat) {
                totalItems = Math.ceil(items[ln].totalItems / showTotalItems);
                break;
            }
        }
        

        app.eventManager.trigger('Models/categoryPage/getCatLinks', {
            totalItems  : totalItems,
            pageNum     : pageNum,
            cat         : cat
        });
        
    };

    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/net/getCategoryPage', PRIVATE.getCategoryPage);
        app.eventManager.on('Models/net/getMenuCategories', PRIVATE.getCatLinks);
    };

    return PUBLIC;
    
}());  
