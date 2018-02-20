app.models.numberHint = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //stateMap
        };
        
    // End var
    
    // Удаляем подсказки (+1..+3) из меню категорий, при переходе в неё
    PUBLIC.clearNumberHint = function(alias) {
        
        var
            catDiffArr  = DI.stateMap.catDiffArr,
            ln;
        // --
        
        if(!catDiffArr) {
            return;
        }

        ln  = catDiffArr.length;
        while(ln--) {
            if(alias === catDiffArr[ln].alias) {
                catDiffArr.splice(ln, 1);
                break;
            }
        }

    };

    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */

    };

    return PUBLIC;
    
}());  
