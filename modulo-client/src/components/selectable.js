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

function fncPopulaCombo(vUrl, $combo) { 
	$.post(vUrl, function(data) {
		$combo.find('option').remove().end();
		$combo.append($("<option></option>").attr("value", null).text(""));
		$.each(data, function(key, value) {
			if($combo.val() == key) {
				$combo.append($("<option selected></option>").attr("value", key).text(value));
			} else {
				$combo.append($("<option></option>").attr("value", key).text(value));
			}
		});	
	});	
}

function fncPopulaComboWithClosure(vUrl, $combo, closure) {
	$.get(vUrl, function(data) {
		$combo.find('option').remove().end();
		$combo.append($("<option></option>").attr("value", null).text(""));
		$.each(data, function(key, value) {
			var closureFunction = new Function(nameFunction);
			closure($combo, index, object);
		});	
	});	
}

function fncBlurCombo() {
	$("select").blur(function (data) {
		var vElemento = '#'+data.target.name;
		var vIdentificador = '#'+data.target.name+'Id';
	    $(vIdentificador).val($(vElemento).val());
	});
}

function fixCheckboxWithThymeleaf() {
	$('.checkbox input[type=hidden]').insertBefore($('.checkbox input[type=checkbox ]'));
}