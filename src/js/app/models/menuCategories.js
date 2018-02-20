app.models.menuCategories = (function() {
    
    var
        PUBLIC      = {},
        PRIVATE     = {},
        
        // Dependency injection container
        DI = {
            //configMap
            //stateMap
        };
        
    // End var
    
    // Список категорий для меню
    PRIVATE.getMenuCategories = function(obj) {

        var
            pageNum                 = obj.pageNum,
            cat                     = obj.cat,
            showTotalItems          = obj.json.showTotalItems,
            reqData                 = obj.json.categories,
            
            defaultCategory         = DI.configMap.defaultCategory,
            hideDefaultCategory     = DI.configMap.hideDefaultCategory,
            catDiffArr              = DI.stateMap.catDiffArr,
            catDiffArrLn,
            
            resultArr           = [],
            
            i                   = 0,
            ln                  = reqData.length,
            
            resultObj,     foundDefaultCat;
        // --
        
        // Формирование массива категорий
        for(;i<ln;i++) {

            resultObj = {
                id              : reqData[i].id,
                alias           : reqData[i].alias,
                title           : reqData[i].title,
                totalItems      : reqData[i].totalItems,
                totalPages      : Math.ceil(reqData[i].totalItems / showTotalItems)
            }
            
            // Формируем подсказки, что страницы в категориях изменились +1..+3
            if(catDiffArr) {
                catDiffArrLn = catDiffArr.length;
                
                while(catDiffArrLn--) {
                    if(reqData[i].alias === catDiffArr[catDiffArrLn].alias) {
                        
                        if(catDiffArr[catDiffArrLn].minus) {
                            resultObj.minus = catDiffArr[catDiffArrLn].minus;
                        }   
                        
                        if(catDiffArr[catDiffArrLn].plus) {
                            resultObj.plus = catDiffArr[catDiffArrLn].plus;
                        }
                        
                    }
                }
            }


            resultArr.push(resultObj);
        }
        
        if(!cat) {
            cat                = defaultCategory;
        }

        app.eventManager.trigger('Models/menuCategories/getMenuCategories', {
            hideDefaultCategory     : hideDefaultCategory,
            defaultCategory         : defaultCategory,
            pageNum                 : pageNum,
            cat                     : cat,
            resultArr               : resultArr
        });

    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/net/getMenuCategories', function(data) {
            PRIVATE.getMenuCategories(data);
        });        
        app.eventManager.on('Models/autoUpdate/getMenuCategories', function(data) {
            PRIVATE.getMenuCategories(data);
        });
    };

    return PUBLIC;
    
}());  
