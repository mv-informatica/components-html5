/**
 * PaginationBar
 */

! function ($) {
    'use strict';
    $.fn.mvPagination = function () {
		function changePage($this){
			var page;
			var jQueryPaginationContainer = $this.parents('.paginationbar nav');
        	var isAjax = JSON.parse(jQueryPaginationContainer.attr('data-ajax'));
        	var totalPages = jQueryPaginationContainer.attr('data-totalPages');
        	var idToRender = jQueryPaginationContainer.attr('data-idToRender');
        	var size = jQueryPaginationContainer.attr('data-size');
        	var method = jQueryPaginationContainer.attr('data-method');
			var jQueryNumberInput = jQueryPaginationContainer.find('.input-page > input');
        	var activeNumber = Number(jQueryNumberInput.val());
			var min = 0;
        	var number = Number($this.attr('data-number'));
			if(isNaN(number))
				number = activeNumber
        	
        	if ($this !== null && $this.children().hasClass('glyphicon-forward')) {
        		page = totalPages - 1;
        	} else if ($this !== null && $this.children().hasClass('glyphicon-play inverted-icon')) {
        		page = activeNumber - 2;
        	} else if ($this !== null && $this.children().hasClass('glyphicon-play')) {
        		page = activeNumber;
        	} else {
        		if (number > 0) {
        			number = number - 1;
        		} else {
        			number = 0;
        		}
        		
        		page = number;
        	}
        	var url = method + '?page='+page+'&size='+size+'&idToRender='+idToRender;
			
        	if(page >= min && page <= totalPages){
				if(isAjax) {
            		$('#' + idToRender).load(url);
            	} else {
            		window.location.href = window.location.origin+url;
            	}			
			}	
		}
		
        this.each(function () {
            $(this).on( "click", ".pagination a", function() {
        		changePage($(this));
    	    });
			
			$(this).on( "blur", ".pagination > .input-page > input", function() {
				changePage($(this));	
			});
			
			$(document).on('keyup keypress', 'form .pagination > .input-page > input', function(e) {
			  if(e.which === 13) {
			    e.preventDefault();
			    return false;
			  }
			});
			
			$(this).on( "keyup", ".pagination > .input-page > input", function(event) {
				if ( event.which === 13 ) {
				    changePage($(this));
				}	
			});
        });
    };
    
    $(function () {
        $('body').mvPagination();
    });

}(jQuery);