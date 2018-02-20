app.views.cart = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //showBreadcrumbs
            //CATEGORY_PAGE
            //PRODUCT_PAGE
            //configMap
        };
        
    // End var
    
    PUBLIC.template = {
        $tpl                    : $('#tpl-page-cart'),
        $content                : $('#tpl-page-cart-content'),
        $counter                : $('.tpl-page-cart-counter'),
        $emptyMsg               : $('#tpl-page-cart-empty-msg'),
        $box                    : $('#tpl-page-cart-box'),
        $totalPrice             : $('#cart-total-price')
        //bindListeners
        //cartBtnListener
        //cartDeleteBtnListener
    };
    
    PUBLIC.template.cartBtnListener = function(e) {

        var
            target  = e.target,
            type    = target.getAttribute('data-type'),
            id      = target.getAttribute('data-id');
        // --
        
        if(type === 'good' && id) {
            
            target.innerText = "Товар в корзине!";
            target.classList.remove("btn-primary");
            target.classList.add("btn-warning");
            target.disabled = true;
            
            app.eventManager.trigger('Views/cart/addToCart', {
                id : id
            });
            
        }
        
    };
    
    PUBLIC.template.cartDeleteBtnListener = function(e) {

        var
            target  = e.target,
            type    = target.getAttribute('data-type'),
            id      = target.getAttribute('data-id');
        // --

        if(type == 'cart-del-btn' && id) {

            app.eventManager.trigger('Views/cart/cartDropItem', {
                id : id
            });
            
        }

    };    
    
    PUBLIC.template.cartUpdateProductQty = function(e) {

        var
            target          = e.target,
            value           = target.value,
            type            = target.getAttribute('data-type'),
            id              = target.getAttribute('data-id');
        // --

        if(type === 'cart-product-quantity' && value && id) {

            if(value < 1) {return;}
        
            app.eventManager.trigger('Views/cart/cartUpdateItemQuantity', {
                id          : id,
                quantity    : value
            });

        }
        
    };
 
    PUBLIC.template.bindListeners = function() {
        
        // Кнопка на страницах с товарами, "добавить в корзину"
        DI.CATEGORY_PAGE.template.$content.click(PUBLIC.template.cartBtnListener);
        DI.PRODUCT_PAGE.template.$content.click(PUBLIC.template.cartBtnListener);
        
        // Кнопка удаления из корзины
        PUBLIC.template.$box.click(function(e) {
            PUBLIC.template.cartDeleteBtnListener(e);
        });        
        
        // Изменение количества товара
        PUBLIC.template.$box.change(function(e) {
            PUBLIC.template.cartUpdateProductQty(e);
        });
        
    };

    PUBLIC.cartShowItems = function(obj) {

        var
            ln,     itemsQuantity,
            items,  totalPrice,
            html         = '',
            priceStr     = '',
            e            = 0;
            
        // --

        // Если корзина пуста
        if(!obj || !obj.items || !obj.totalPrice) {
            
            PUBLIC.template.$emptyMsg.show();
            PUBLIC.template.$content.html();
            PUBLIC.template.$box.hide();

            DI.showBreadcrumbs({
                type        : 'cart',
                title       : 'Корзина (0)'
            });

            return;
        }
        
        items           = obj.items;
        totalPrice      = obj.totalPrice;
        ln              = items.length;
        itemsQuantity   = items.length;

        // Если корзина не пуста
        if(itemsQuantity > 0) {
            PUBLIC.template.$emptyMsg.hide();
            PUBLIC.template.$box.show();

            DI.showBreadcrumbs({
                type        : 'cart',
                title       : 'Корзина ('+itemsQuantity+')'
            });
        }

        while(ln--) {
            
            e++;
            if(items[ln].priceWithQty && items[ln].quantity > 1) {
                priceStr = '<s class="text-muted">$'+ items[ln].price +'</s><p class="text-warning h4">$'+items[ln].priceWithQty+'</p>';
            } else {
                priceStr = '$'+items[ln].price;
            }
            
            // ============
            
            html +=    '<tr>';
            html +=     '<th scope="row">'+e+'</th>';
            html +=     '<td>';
            html +=         '<img style="max-width: 150px; max-height: 150px;" src="'+ DI.configMap.imagesPath + items[ln].img +'"/>';
            html +=     '</td>';
            html +=     '<td><a href="#/'+items[ln].alias+'/'+items[ln].id+'" class="h5">'+items[ln].title+'</a><p class="text-muted">Код товара: '+items[ln].id+'</p></td>';
            html +=     '<td>';
            html +=         '<input type="number" class="form-control" value="'+items[ln].quantity+'" min="1" data-type="cart-product-quantity" data-id="'+items[ln].id+'">';
            html +=     '</td>';
            html +=     '<td></td>';
            html +=     '<td>'+ priceStr +'</td>';
            html +=     '<td class="text-center">';
            html +=         '<button type="button" class="close glyphicon glyphicon-remove btn-lg" data-type="cart-del-btn" data-id="'+items[ln].id+'"></button>';
            html +=     '</td>';
            html +=    '</tr>';
            
        }

        PUBLIC.template.$content.html(html);
        PUBLIC.template.$totalPrice.html('$' + totalPrice);
        
    };
    
    // Обновляет цифру количества элементов в корзине
    PUBLIC.cartShowTotalItems = function(obj) {
        PUBLIC.template.$counter.html(obj.totalItems); 
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {   
        PUBLIC.template.bindListeners();
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/net/getCartItems', PUBLIC.cartShowItems);
        app.eventManager.on('Models/cart/getTotalItems', PUBLIC.cartShowTotalItems);     
    };

    return PUBLIC;
    
}());  
