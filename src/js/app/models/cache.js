// Кеширования контента
app.models.cache = (function() {
    
    var
        cacheMap = {
            menuCategoriesArr       : undefined,
            categoryPageArr         : [],
            productPageArr          : []
        },

        // Methods
        PUBLIC            = {},
        
        // Dependency injection container
        DI = {
            //configMap
        };

    // End vars


    /*    ==== GET ====    */
    
    PUBLIC.getCategoryPage = function(cat, pageNum) {

        var
            pgCatsArr   = cacheMap.categoryPageArr,
            ln          = pgCatsArr.length;

        if(!DI.configMap.cacheEnabled) {
            return;
        }    

        if(!cat || !pageNum) {
            return false;
        }

        while(ln--) {
            if(pgCatsArr[ln]) {
                if(pgCatsArr[ln].cat === cat && parseInt(pgCatsArr[ln].pageNum) === pageNum) {
                   return pgCatsArr[ln];
                }
            }
        }

        // Если страница не найдена
        if(ln <= 0) {
            return null;
        }
 
    };
    
    PUBLIC.getMenuCategories = function() {
        
        if(!DI.configMap.cacheEnabled) {
            return;
        }  
        
        return cacheMap.menuCategoriesArr;
    };
    
    PUBLIC.getProductPage = function(id) {

        var
            productPageArr      = cacheMap.productPageArr,
            ln                  = productPageArr.length;

        if(!DI.configMap.cacheEnabled) {
            return;
        }  
        
        while(ln--) {
            if(parseInt(productPageArr[ln].id) === id) {
               return productPageArr[ln];
            }
        }

        // Если страница не найдена
        if(ln <= 0) {
            return null;
        }
        
    };
   
   
    /*    ==== ADD ====    */
    
    PUBLIC.addCategoryPage = function(obj) {
        cacheMap.categoryPageArr.push(obj);
    };
    
    PUBLIC.addProductPage = function(obj) {
        cacheMap.productPageArr.push(obj);
    };
    
    PUBLIC.addMenuCategories = function(arr) {
        cacheMap.menuCategoriesArr = arr;
    };
    
    
    /*    ==== DROP ====    */
    
    PUBLIC.dropCategoryPage = function(alias) {
        
        var
            pgCatsArr   = cacheMap.categoryPageArr,
            ln          = pgCatsArr.length;
        
        if(!alias) {
            return;
        }
        
        while(ln--) {
            if(pgCatsArr[ln].cat === alias) {
                pgCatsArr.splice(ln, 1);
            }
        }

    };      
    
    PUBLIC.dropAllCategoryPages = function() {
       cacheMap.categoryPageArr   = [];
    };    
    
    PUBLIC.dropMenuCategories = function() {
        cacheMap.menuCategoriesArr  = undefined;
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
    };
    
    return PUBLIC;
    
}());
