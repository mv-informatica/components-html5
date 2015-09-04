var onSelected;
var required;

function AutoComplete(){}

AutoComplete.prototype.autocomplete = function(vurl,target,fncName,possuiParametros){
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
            	url = possuiParametros ? url.replace('%QUERY',query+"&") : url.replace('%QUERY',query); 
            	
                if(possuiParametros){
                var parametros = url.indexOf('&');
                var param = url.substr(parametros+1);
                var arr = param.split(",");
                url = url.substr(0,parametros);
               
                for(var i in arr){
                        url += '&';
                        var v = arr[i].split("=");
                        url += v[0]+"=";
                        url +=eval(v[1]);
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

	promise
	.fail(function() { console.log('err!'); });

	$('#'+target['objeto']).blur(function(){
		if(this.value == ''){
			$('#'+idHidden).val('');
			if($(this).required()){
				$(this.form).bootstrapValidator('revalidateField', $('#'+idHidden).prop('name'));
			}
		}
	});
	
	$('#'+target['objeto']).typeahead(
			{
				minLength: 3,
				highlight: true,
			},
			{ 
				name: target['lista'],
				source: AutoComplete.prototype.bloodHound.ttAdapter()
			}
	)
	.on('typeahead:opened', onOpened2)
	.on('typeahead:autocompleted', onAutocompleted2)
	.on('typeahead:selected', function ($e, datum){
		$('#'+idHidden).data(datum);
		$('#'+idHidden).val(eval(onSelected));
	});
} 

function onOpened2($e) {}

function onAutocompleted2($e, datum) {}

function limparCampo(campo){
	$("#"+campo).typeahead('val', '');
}

function setarValor(campo,valor){
	$("#"+campo).typeahead('val', valor);
}

function log(valor){
	console.log(valor);
}

function initAutoComplete(){
	var arrayInputs = $('.typeahead.input-autocomplete');
	jQuery.each(arrayInputs, function(i, input){ 
		if( input !== undefined){
			var jQueryTarget = $(input);
			
			var targetArray = [];	 
			var url = jQueryTarget.attr('data-url');
			var parametros = jQueryTarget.attr('data-parametros');
			var possuiParametros = jQueryTarget.attr('data-possuiParametros');
		
			if(parametros != null || parametros !== undefined) {
			   	url = url.concat(parametros);
			 	possuiParametros = true; 
			}
			
			targetArray['objeto']     =   jQueryTarget.attr('data-objeto');
			targetArray['lista']      =   jQueryTarget.attr('data-lista');
			targetArray['onSelected'] =   jQueryTarget.attr('data-onSelected');
			targetArray['idHidden']   =   jQueryTarget.attr('data-idHidden');
			var possuiParametros =   parametros!=null; 
			var funcaoNome       =   jQueryTarget.attr('data-funcaoNome');
			
			AutoComplete.prototype.autocomplete(url,targetArray,funcaoNome,possuiParametros);
		}
	});
}

var selectedTipoFrequencia = function(object) {
	return {
		value : object.descricaoFrequencia,
		id : object.id,
		"tipoFrequencia" : object
	}
}