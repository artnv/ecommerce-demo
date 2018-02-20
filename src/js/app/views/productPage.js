app.views.productPage = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //showBreadcrumbs
            //CART
            //configMap
        };
        
    // End var
    
    PUBLIC.template = {
        $tpl            : $('#tpl-page-product'),
        $content        : $('#tpl-page-product-content'),
        $breadcrumb     : $('#tpl-page-product-breadcrumb')
    };

    PUBLIC.showProductPage = function(obj) {

        var 
            json            = obj.json,
            html            = '',
            cartDisabled    = '',
            cartMsg         = '',
            cartBtnType     = '';
        // --
        
        // Если товар добавлен в корзину
        if(DI.CART.inStorage(json.id)) {
            cartBtnType     = 'btn-warning';
            cartDisabled    = 'disabled="disabled"';
            cartMsg         = 'Товар в корзине!';
        } else {
            cartBtnType     = 'btn-primary';
            cartDisabled    = '';
            cartMsg         = 'В корзину';
        }

        html += '<h1>'+json.title+'</h1><hr>';
        html += '<div class="row">';
        html +=     '<div class="col-md-6">';
        html +=         '<div class="bg bg_fullpage" style="background-image: url('+ DI.configMap.imagesPath + json.img +');"></div>';
        html +=     '</div><!--/.md-->';
        html +=     '<div class="col-md-6">';
        html +=     '<h3>Описание товара</h3>';
        html +=     '<p class="fulldesc">'+json.description+'</p>';
        html +=         '<h2>$'+json.price+'</h2>';
        html +=         '<p class="text-warning">Код товара: '+json.id+'</p>';
        html +=         '<p><button data-type="good" data-id="'+json.id+'" class="btn btn-primary '+cartBtnType+'" '+cartDisabled+'>'+cartMsg+'</button></p>';
        html +=     '</div><!--/.md-->';
        html += '</div><!--/.row-->';
        html += '<br/><br/>';


        DI.showBreadcrumbs({
            type                : 'product',
            pTitle              : json.title,
            alias               : json.alias,
            catTitle            : json.categories_title,
            lastPageNum         : obj.lastPageNum
        });

        PUBLIC.template.$content.html(html);
        console.timeEnd('productPage(getData+Render)');
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/productPage/getProductPage', PUBLIC.showProductPage);
    };

    return PUBLIC;
    
}());  
