/**
 * Required 
 * Auxílio para bootstrap validators em campos obrigatórios.
 */
(function($) {
    $.fn.required = function(isRequired) {
    	if ( !arguments.length ) {
    		var label = $('#'+ this.prop('id') + "Label");
    		return label.hasClass('required');
    	}
    	
    	this.each(function(index, element) {
    		var label = $('#'+ this.id + "Label");
    		var $element = $(element);
    		var $form = $(element.form);
    		
    		if(isRequired && !label.hasClass('required')) {
    			label.addClass('required');
    		} else if(!isRequired) {
    			label.removeClass('required');
    		}
    		
    		if($element.hasClass('typeahead')) {
    			var $hidden = $element.parent().prev();
    			$form.bootstrapValidator('enableFieldValidators', $hidden.prop('name'), isRequired);
    		} else {
    			$form.bootstrapValidator('enableFieldValidators', element.name, isRequired);
    		}
    	});
    };
}(jQuery));