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