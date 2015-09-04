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

ko.bindingHandlers.stopBinding = {
    init: function() {
        return { controlsDescendantBindings: true };
    }
};
 
function formattedNumericComputed(field, precision) {
	var defaultPrecision = 1;
	precision = precision() || defaultPrecision;
    var	result = ko.pureComputed({
	    	 read: function () {
	    		 if(field()){
	    			 return Number(field()).toLocaleString('pt-BR', { minimumFractionDigits: precision, maximumFractionDigits: precision });
	    		 }
	    		 return '0';
	         },
	         write: function (value) {
	             value = parseFloat(value.replace(',', "."));
	             field(isNaN(value) ? 0 : value);
	         }
     	});
        
    return result;   
}