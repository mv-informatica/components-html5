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

/*
 * Begin - TODO Remover essas funcionalidades pois o bootstrapTable já faz isso de forma nativa.
 */
$.fn.selectedItem = function() {
	var elementValue = null;
	if(this.is('table') && this.hasClass('selectable')) {
		var tr = this.find('.selected');
		elementValue = this.find('.rowValue');
		
		if(elementValue) {
			return elementValue;
		}
			
		return tr;
	} else if(this.is('tr') && this.closest('table').hasClass('selectable')) {
		elementValue = this.find('.rowValue');
		
		if(elementValue && elementValue.is('input')){
			return elementValue.val();
		}
		
		return elementValue;
	}
};

$(function() {
	$(document).on('click', 'table > tbody > tr',function() {
		var $tr = $(this);
		var table = $tr.closest('table');
		if(table.hasClass('selectable') && !$tr.hasClass("selected")) {
			$tr.addClass("selected").siblings().removeClass("selected");
			$tr.trigger('mv-table:selected-row');
		}
	});
});
/*
 * End - TODO Remover essas funcionalidades pois o bootstrapTable já faz isso de forma nativa.
 */