var timerCarrinho = '';
var $j = jQuery.noConflict()
$j(function(){

	$j(window).scroll(function(){
        var wtop	 	= $j(this).scrollTop();
		var carrinho 	= $j('#carrinho-top');
		var container	= $j('#container');
		var cheight 	= $j(carrinho).height();
        if( wtop > ( cheight / 2 ) )
        {
			$j(container).css('margin-top', cheight+'px');
            $j(carrinho)
				.css({
                    position: 'absolute'
                })
				.animate({
					marginTop: ( wtop - cheight ) + 'px'
				}, 0);
        }
        else
        {
			$j(container).css('margin-top', 0);
            $j(carrinho)
				.stop(true, true)
				.css({
                    position: 'fixed',
					marginTop: 0
                });
        }
    });
    

	$j('#produtos li').draggable({
		
		cursor:"move",
		revert: 'invalid',
		helper: function(){
			return $j("<div class='produto-drag'></div>")
		},
		start:	function()
		{
			clearTimeout( timerCarrinho );
			$j('#carrinho-container').show();
		    $j('#result-adicao').css('display', 'none'); 

		}

				
		
	});


	$j('#carrinho-produtos').droppable({
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		accept: '.produto',
		drop: function( event, ui )
		{
			$j(this).find('.adicione').remove();
			var IDProduto = ui.draggable.find('.produto-id').val();
			var IDLoja = ui.draggable.find('.produto-id-loja').val();
			ImgProd = ui.draggable.find('.produto-img-det').val();
			
			if( $j(this).find('#clone-'+IDProduto).length == 0 )
			{
				$j(this).find('li:first').slideDown();
			}			
			 AddProdCartOnPage(IDLoja,IDProduto,0);
			    $j('#result-adicao').css('display', 'block'); 

		}
	});		

	$j('#carrinho-info').mouseover(function(){
		$j('#carrinho-container').show();	
	});
	
	$j('#carrinho-container').mouseenter(function(){
		clearTimeout( timerCarrinho );
	});
	


	$j('#carrinho-container').mouseleave(function(){
		var carrinho = $j(this);
		timerCarrinho = setTimeout( function(){
			$j(carrinho).slideUp();
		}, 4000 );
	    $j('#result-adicao').css('display', 'none'); 
	});
	
});

