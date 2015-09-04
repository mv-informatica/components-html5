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
 * Number-Field
 */
function initNumberField(){
	var targets = $('.number-field input');
	jQuery.each(targets, function(i, target) { 
		if(target !== undefined) {
			var jQueryTarget = $(target);
			$(jQueryTarget).on('change', function() {
				var jQuerySelf = $(this);
				var functionName = jQuerySelf.attr('data-onchange');
				
		  	    if(jQuerySelf.val() !==  jQuerySelf.attr('data-previousValue')) {
		  	    	var f = new Function(functionName);
					f.call();
					jQuerySelf.attr('data-previousValue', jQuerySelf.val());
		  	    }
			});	
			
		}
	});
}

function fncUppercase() {
	$("input").keyup(function() {
		var textUpperCase = $(this).val().toUpperCase();
		if(window.getSelection().toString() === $(this).val()) {
			$(this).val(textUpperCase);
			$(this).select();
		} else {
			$(this).val(textUpperCase);
		}
	});
	$("textarea").keyup(function() {
		var textUpperCase = $(this).val().toUpperCase();
		if(window.getSelection().toString() === $(this).val()) {
			$(this).val(textUpperCase);
			$(this).select();
		} else {
			$(this).val(textUpperCase);
		}
	});
}

function numbersOnly() {
	jQuery('.numbersOnly').keyup(function () { 
	    this.value = this.value.replace(/[^0-9\.]/g,'');
	});
}

function formatMask() {
	$('.cns').mask('999.9999.9999.9999');
	$(".cpf").mask("999.999.999-99");
}