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
function initBtnConfirmation() {
	$('.confirmation-callback').confirmation({
		onConfirm: function() { 
			var jQuerySelf= jQuery(this);
			var method = jQuerySelf.attr('data-method');
			var ajaxFunction = Boolean(jQuerySelf.attr('data-ajax'));
			var msgSave = jQuerySelf.attr('data-msgSave');
			var completeFunction = jQuerySelf.attr('data-function');
			var idToExclude = jQuerySelf.attr('data-id');
			var url = method + '?id='+idToExclude;
			
			if (ajaxFunction === false) {
				window.location = url; 
			} else if (ajaxFunction === true) {
				$.get(url).done(function() {
					$.alertSuccess(msgSave);
				}).always(function() {
					if (completeFunction != null) {
						var renamedCompleteFunction = new Function(completeFunction.replace('()', '('+idToExclude+')'));
						renamedCompleteFunction.call();
					}
				});
			}
		}
	});
}

(function($) {
	$.getGenericMessage = function(responseData) {
		return $.parseJSON(responseData.responseText).ex;
	};
	
    $.alertSuccess = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 4000,
			type: 'success',
			z_index:9999
		});
    };
    
    $.alertInfo = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 4000,
			type: 'info',
			z_index:9999
		});
    };
    
    $.alertError = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 4000,
			type: 'danger',
			z_index:9999
		});
    };
    
    $.alertWarning = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 4000,
			type: 'warning',
			z_index:9999
		});
    };
}(jQuery));