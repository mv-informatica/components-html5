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

function ajaxSetup(){	
	$.ajaxSetup({
		beforeSend: function( xhr ) {
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			xhr.setRequestHeader(header, token);
	 	},
	 	headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
	});
}

jQuery(document).ajaxComplete(function(){
	initBtnConfirmation();
	$('[data-toggle="tooltip"]').tooltip();
	$("td[rel='tooltip']").tooltip({
	    'placement': 'top',
	    'container':'body'
	});
	formatMask();
	fncUppercase();
	numbersOnly();
});

jQuery(document).ready(function(){
	ajaxSetup();
	initBtnConfirmation();
	initTimeField();
	initDateField();
	initDateFieldPeriodo();
	initNumberField();
	fncBlurCombo();
	fixCheckboxWithThymeleaf();
	initAutoComplete();
	formatMask();
	fncUppercase();
	numbersOnly();
	$('form').bootstrapValidator({});
	$("td[rel='tooltip']").tooltip({
	    'placement': 'top',
	    'container':'body'
	});
});