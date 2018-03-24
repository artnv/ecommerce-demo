// Автоматическое обновление категорий
app.models.autoUpdate = (function() {
    
    var
        PUBLIC      = {},
        PRIVATE     = {},
        
        // Dependency injection container
        DI = {
            //stateMap
            //CACHE
        };
        
    // End var
    
    // Проверяет обновление контента и на лету меняет конфигуркцию приложения, если данные на сервере поменялись
    PRIVATE.checkUpdate  = function(obj) {
        
        var 
            cache_CatsObj,
            cacheCats,
            cacheShowTotalItems,
            cacheCatsLn,
            
            serverCatsJSON                  = obj.json,
            serverCats                      = serverCatsJSON.categories,
            serverShowTotalItems            = serverCatsJSON.showTotalItems,
            serverCatsLn                    = serverCats.length,
            
            catDiffArr                      = [],
            
            flagDiffFound                   = false,
            catDiffNotFound                 = true,
            
            SM_catDiffArr_Ln,
            SM_catDiffArr_Ln_2,
            
            minus,      
            plus,
            
            returnObj,
            
            pushEvent;

        // ===
        
        pushEvent = function() {
            
            DI.CACHE.dropMenuCategories();
            DI.CACHE.addMenuCategories(serverCatsJSON);

            // url параметры с прошлого вызова
            app.eventManager.trigger('Models/autoUpdate/getMenuCategories', {
                cat     : DI.stateMap.lastCat,
                pageNum : DI.stateMap.lastPageNum,
                json    : serverCatsJSON
            });

        };
        
        //
        cache_CatsObj = DI.CACHE.getMenuCategories();
        if(!cache_CatsObj) {
            return;
        }
        
        cacheCats               = cache_CatsObj.categories;
        cacheShowTotalItems     = cache_CatsObj.showTotalItems;
        cacheCatsLn             = cacheCats.length;
        
        // ===

        // Если количество категорий не совпадает (Например на сервере добавили или удалили), дропаем весь кеш и выходим
        if(cacheCatsLn !== serverCatsLn) {
            /** ДРОП КЕША - Категории **/
            pushEvent();
            return;
        }
        
        // Если есть разница в количестве отображаемых элементах на странице
        if(cacheShowTotalItems !== serverShowTotalItems) {
            /** ДРОП КЕША - Категории и Страницы **/
            DI.CACHE.dropAllCategoryPages();
            pushEvent();
            return;
        }

        // Сравнение кеша и данных с сервера
        while(cacheCatsLn--) {
            serverCatsLn     = serverCats.length
            while(serverCatsLn--) {

                // Ищем одинаковые категории в данных кеша и с сервера
                if(cacheCats[cacheCatsLn].id === serverCats[serverCatsLn].id) {

                    if(cacheCats[cacheCatsLn].totalItems !== serverCats[serverCatsLn].totalItems) {
                        
                        // Если на сервере стало меньше(были удалены) элементов чем в кеше
                        if(cacheCats[cacheCatsLn].totalItems > serverCats[serverCatsLn].totalItems) {

                            minus   = cacheCats[cacheCatsLn].totalItems - serverCats[serverCatsLn].totalItems;
                            plus    = 0;

                        } else if(cacheCats[cacheCatsLn].totalItems < serverCats[serverCatsLn].totalItems) {
                        // Если на сервере больше элементов чем в кеше

                            minus   = 0;
                            plus    = serverCats[serverCatsLn].totalItems - cacheCats[cacheCatsLn].totalItems;

                        }
                        
                        /** ДРОП КЕША - Страницы текущей категории **/
                        DI.CACHE.dropCategoryPage(serverCats[serverCatsLn].alias);
                        
                        catDiffArr.push({
                            alias   : serverCats[serverCatsLn].alias,
                            minus   : minus,
                            plus    : plus
                        });

                        flagDiffFound    = true;

                    }
                    
                    break; // дальше можно не искать, раз нашли
                }
            }
        }
        
        
        // Обновляем данные для подсказок. +1 ... +14
        // catDiffArr
        if(catDiffArr.length > 0) {

            if(DI.stateMap.catDiffArr) {
                
                catDiffArr_Ln           = catDiffArr.length;
                SM_catDiffArr_Ln_2      = DI.stateMap.catDiffArr.length;
                
                while(catDiffArr_Ln--) {

                    catDiffNotFound     = true;
                    SM_catDiffArr_Ln    = SM_catDiffArr_Ln_2; // Для того чтобы при динамическом добавлении, не увеличивался индекс
                    
                    // Суммируем
                    while(SM_catDiffArr_Ln--) {

                        if(DI.stateMap.catDiffArr[SM_catDiffArr_Ln].alias === catDiffArr[catDiffArr_Ln].alias) {

                            DI.stateMap.catDiffArr[SM_catDiffArr_Ln].plus     += catDiffArr[catDiffArr_Ln].plus;
                            DI.stateMap.catDiffArr[SM_catDiffArr_Ln].minus    += catDiffArr[catDiffArr_Ln].minus;
                            
                            catDiffNotFound = false;
                            break;
                        }

                    }
                    
                    // Если не найдено то добавляем
                    if(catDiffNotFound) {
                        DI.stateMap.catDiffArr.push(catDiffArr[catDiffArr_Ln]);
                    }

                }
                
            } else {
                DI.stateMap.catDiffArr = catDiffArr;
            }

        } else {
            catDiffArr = undefined; // для всплывающей подсказки, изначально это пустой массив
        }
        
        // Если есть разница в данных, обновляем меню категорий, потом кешируем, а далее вызываем модель и отображаем в showCategories
        if(flagDiffFound) {
            pushEvent();
        }
        
        if(DI.stateMap.catDiffArr) {
            // Инфа для табличка текущего каталога в котором находимся
            SM_catDiffArr_Ln    = DI.stateMap.catDiffArr.length;
            while(SM_catDiffArr_Ln--) {
                if(DI.stateMap.lastCat === DI.stateMap.catDiffArr[SM_catDiffArr_Ln].alias) {
                    returnObj  = DI.stateMap.catDiffArr[SM_catDiffArr_Ln];
                    break;
                }
            }
        }
        
        if(returnObj) {
            // Данные для таблички upd-label
            app.eventManager.trigger('Models/autoUpdate/checkUpdate', returnObj);
        }
    };
  

    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/net/checkUpdate', PRIVATE.checkUpdate);
    };

    return PUBLIC;
    
}());
