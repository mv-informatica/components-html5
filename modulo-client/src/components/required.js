/*
 * Copyright 2015 MV Informática.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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