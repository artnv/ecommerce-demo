app.views.categoryPage = (function() {
    
    var
        PUBLIC      = {},
        
        // Dependency injection container
        DI = {
            //CART
            //configMap
        };
        
    // End var
    
    PUBLIC.template = {
        $tpl            : $('#tpl-page-catpages'),
        $breadcrumb     : $('#tpl-page-catpages-breadcrumb'),
        $content        : $('#tpl-page-catpages-content'),
        $links          : $('#tpl-page-catpages-links')
    };
    
    PUBLIC.showCategoryPage = function(obj) {
 
        var 
            html            = '',
            outHtml         = '',
            json            = obj.json,
            ln              = json.length,
            cartDisabled    = '',
            cartMsg         = '',
            cartBtnType     = '',
            i, e;
        // --
        
        for(i=0, e=1; i<ln; i++, e++) {
            
            // Если товар добавлен в корзину
            if(DI.CART.inStorage(json[i].id)) {
                cartBtnType     = 'btn-warning';
                cartDisabled    = 'disabled="disabled"';
                cartMsg         = 'Товар в корзине!';
            } else {
                cartBtnType     = 'btn-primary';
                cartDisabled    = '';
                cartMsg         = 'В корзину';
            }
            
            // Категория
            cat         = json[i].categories_alias;
            
            html +=  '<div class="col-sm-4 col-md-4">';
            html +=    '<div class="thumbnail">'; 
            html +=      '<a href="#/'+cat+'/'+json[i].id+'" class="bg" style="background-image: url('+ DI.configMap.imagesPath + json[i].img +');"></a>';
            html +=      '<div class="caption">';
            html +=        '<a href="#/'+cat+'/'+json[i].id+'" class="nodecoration"><h4>'+json[i].title+'</h4></a>';
            html +=        '<p class="text-muted">'+json[i].description.substring(0, 150)+'...</p><br/>';

            
            html +=        '<div class="pull-right">';
            //html +=            '<p class="text-muted text-right">Нет в наличии</p>';
            html +=            '<p class="text-success text-right">В наличии</p>';
            html +=            '<button data-type="good" data-id="'+json[i].id+'" class="btn '+cartBtnType+'" '+cartDisabled+'><span class="glyphicon glyphicon-shopping-cart"></span> '+cartMsg+'</button>';
            html +=        '</div><!--/pull-right-->';
            html +=        '<div class="top3">';
            html +=            '<p><s class="h4 text-muted">$'+(parseInt(json[i].price)+10.00)+'</s></p>';
            html +=            '<p><span class="h3">$'+json[i].price+'</span></p>';
            html +=        '</div>';
            html +=        '<div class="clearfix"></div>';

            html +=     '</div><!-- /caption -->';
            html +=    '</div><!-- /thumbnail -->';
            html +=  '</div><!-- /col -->';

            // add row
            if(e > 2) {
                e = 0;
                outHtml += '<div class="row">'+html+'</div><!-- /.row -->';
                html = '';
            } 

        }

        PUBLIC.template.$content.html(outHtml);
        console.timeEnd('categoryPage(getData+Render)');
    };
    
    PUBLIC.showCatLinks = function(obj) {
        
        var
            i               = 1,
            html            = '',
            pageNum         = obj.pageNum,
            totalItems      = obj.totalItems,
            cat             = obj.cat,
            prevDisabled    = '',
            nextDisabled    = '',
            disabledClass   = 'class="disabled"',
            previous,   next,   prev,   nxt;
      

        if(!cat) {
            return false;
        }
        
        if(!totalItems) {
            totalItems = 1;
        }
      
      
        for(;i<=totalItems;i++) {
            
            if(i === pageNum) {
                html += '<li class="active"><a href="#/'+cat+'/page/'+i+'">'+i+'</a></li>';
            } else {
                html += '<li><a href="#/'+cat+'/page/'+i+'">'+i+'</a></li>';
            }

        }
        
        prev    = pageNum-1;
        nxt     = pageNum+1;
        
        if(nxt > totalItems) {
            nxt = pageNum;
            nextDisabled = disabledClass;
        }        
        
        if(prev <= 0) {
            prev = 1;
            prevDisabled = disabledClass;
        }
        
        previous    = '<li '+prevDisabled+'><a href="#/'+cat+'/page/'+prev+'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>'; 
        next        = '<li '+nextDisabled+'><a href="#/'+cat+'/page/'+nxt+'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
        
        PUBLIC.template.$links.html(previous + html + next);
    };
    
    PUBLIC.addDependencies = function(obj) {
        DI = obj;
    };
    
    PUBLIC.initModule = function() {
        /* --------------------- Listeners --------------------- */
        app.eventManager.on('Models/categoryPage/getCategoryPage', PUBLIC.showCategoryPage);
        app.eventManager.on('Models/categoryPage/getCatLinks', PUBLIC.showCatLinks);  
    };

    return PUBLIC;
    
}());  
