var onSelected;
var required;

function AutoComplete(){}

function initAutoComplete() {
	var arrayInputs = $('.typeahead.input-autocomplete');
	jQuery.each(arrayInputs, function(i, input) { 
		if(input !== undefined) {
			var jQueryTarget = $(input);
			var isInputHidden = !(jQueryTarget.attr('hidden') === undefined)
			if(!isTypeaheadActive(jQueryTarget) && !isInputHidden && !jQueryTarget.hasClass('tt-hint')){
				var targetArray = [];	 
				var url = jQueryTarget.attr('data-url');
				var parameters = jQueryTarget.attr('data-parameters');
				var hasParameters = false;
			
				if(parameters != null || parameters !== undefined) {
				   	url = url.concat(parameters);
				 	hasParameters = true; 
				}
				
				targetArray['object']     =   jQueryTarget.attr('data-object');
				targetArray['list']       =   jQueryTarget.attr('data-list');
				targetArray['onSelected'] =   jQueryTarget.attr('data-onSelected');
				targetArray['idHidden']   =   jQueryTarget.attr('data-idHidden');
				hasParameters =   parameters != null; 
				var fncName   =   jQueryTarget.attr('data-fncName');
				
				AutoComplete.prototype.autocomplete(url, targetArray, fncName, hasParameters);
			}
		}
	});
}

AutoComplete.prototype.autocomplete = function(vurl, target, fncName, hasParameters){
	 var idHidden = target['idHidden'];
	 AutoComplete.prototype.bloodHound = new Bloodhound({
		datumTokenizer: function(d) {
			return Bloodhound.tokenizers.whitespace(d.val);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		limit: 100,
		remote: {
			url: vurl,
            replace: function (url, query) {
            	idHidden = target['idHidden'];
            	onSelected = target['onSelected'];
            	required = target['required'];
            	url = hasParameters ? url.replace('%QUERY',query+"&") : url.replace('%QUERY',query); 
            	
                if(hasParameters) {
	                var parameters = url.indexOf('&');
	                var param = url.substr(parameters+1);
	                var listParameters = param.split(",");
	                url = url.substr(0,parameters);
               
		            for(var parameter in listParameters) {
		                url += '&';
		                var nameAndValue = listParameters[parameter].split("=");
		                url += nameAndValue[0]+"=";
		                url += eval(nameAndValue[1]);
		            }
                }
                
                return url;
            },
            filter: function ( response ) {
        	    return $.map(response, window[fncName]);
            }
		}		
	});
	
	var promise = AutoComplete.prototype.bloodHound.initialize();

	promise.fail(function() { 
		throw new Error('Error on promise fail!');
	});

	$('#'+target['object']).blur(function(){
		if(this.value === '') {
			$('#'+idHidden).val('');
			validateAutocompleteField(this, idHidden);
		}
	});
	
	$('#'+target['object']).typeahead(
		{
			minLength: 3,
			highlight: true
		},
		{ 
			name: target['list'],
			source: AutoComplete.prototype.bloodHound.ttAdapter()
		}
	)
	.on('typeahead:opened', onOpened2)
	.on('typeahead:autocompleted', onAutocompleted2)
	.on('typeahead:selected', function ($e, datum){
		$('#'+idHidden).data(datum);
		$('#'+idHidden).val(eval(onSelected));
		validateAutocompleteField(this, idHidden);
	});
}; 

function validateAutocompleteField(element, idHiddenField){
	var jQueryTarget = $(element);
	var jQueryForm = $(element.form);
	var jQueryHiddenField = $('#'+idHiddenField);
	var isjQueryTargetRequired = Boolean(jQueryTarget.attr('data-bv-notempty'));
	if(jQueryTarget.required() && jQueryTarget.attr('data-bv-notempty') === undefined) {
		jQueryForm.bootstrapValidator('revalidateField', jQueryHiddenField.prop('name'));
	}else if(isjQueryTargetRequired){
		jQueryForm.bootstrapValidator('revalidateField', jQueryTarget.prop('name'));
	}
}

function onOpened2($e) {}

function onAutocompleted2($e, datum) {}

function limparCampo(campo){
	$("#"+campo).typeahead('val', '');
}

function setarValor(campo,valor){
	$("#"+campo).typeahead('val', valor);
}

function isTypeaheadActive($element){
	return $element.data('ttTypeahead') ? true:false;
}