// Страница с товаром
app.views.productPage = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //configMap
            //switchTemplate
            //widgets
        };
        
    // End var
    
    PUBLIC.template = {
        $tpl                : $('#tpl-page-product'),
        $content            : $('#tpl-page-product-content'),
        $breadcrumb         : $('#tpl-page-product-breadcrumb'),
        $recentlyViewed     : $('#tpl-page-product .recently-viewed')
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
        if(obj.inCart) {
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
        html += '<br/><br/><hr>';


        DI.widgets.title.set(
            DI.widgets.title.getDefault() +' / '+ json.categories_title +' / '+ json.title
        );        
        
        PUBLIC.template.$breadcrumb.html(
            DI.widgets.breadcrumbs.set([
                {
                    text    : 'Категории'
                },
                {
                    text    : json.categories_title,
                    link    : '#/'+ json.alias + (obj.lastPageNum ? '/page/' + obj.lastPageNum : '')
                },
                {
                    active  : true,
                    text    : json.title
                }
            ])
        );
        
        PUBLIC.template.$recentlyViewed.html(
            DI.widgets.recentlyViewed.getItemsHtml(json.id)
        );
        
        PUBLIC.template.$content.html(html);
 
        DI.switchTemplate('product');
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
