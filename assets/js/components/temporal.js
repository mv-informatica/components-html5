/*
 * time-field
 */
function initTimeField(){
	var targets = $('.time-field');

	jQuery.each(targets, function(i, target){ 
		if( target !== undefined){
			var jQueryTarget = $(target);
			
			var attrOnchangeValue;
			var idTarget = '#previous-value-' + jQueryTarget.attr('id');
			
			jQueryTarget.timepicker({
						        showMeridian : false,
							    showInputs: false,
							    disableFocus: true
							});
			
			if(jQueryTarget.attr('onchange') !== undefined){
				attrOnchangeValue = jQueryTarget.attr('onchange');
				jQueryTarget.off("onchange");
				jQueryTarget.removeAttr("onchange");
				
				jQueryTarget.on('change', function(){
					var currentValue = $(this).val();
				    var previousValue = $(idTarget).val(); 
				    
				    if(currentValue != previousValue){
				    	var f = new Function(attrOnchangeValue);
						f.call();
				    }
				});
			}
		}
	});
}

/*
* Date-Field
*/

function initDateField(){
	var targets = $('.date.date-field');

	jQuery.each(targets, function(i, target){ 
		if( target !== undefined){
			var jQueryTarget = $(target);
			/* TODO remover [0] procurar outra forma de pegar o elemento...*/
			var jQueryInputDateField = jQuery(jQueryTarget.find('.data-field-input')[0]);
			var startDate = jQueryInputDateField.attr('data-startdate');
			var endDate = jQueryInputDateField.attr('data-endDate');
			
			var confDatePicker = {
									 todayHighlight: true,
								     autoclose: true,
								     format: "dd/mm/yyyy",
								     language:"pt-BR"
								 };
			
			if(startDate != null)
				confDatePicker.startDate = startDate;
				
			if(endDate != null)
				confDatePicker.endDate = endDate;
			
			jQueryTarget.datepicker(confDatePicker);
			
			jQueryInputDateField.mask('99/99/9999');
			
			jQueryInputDateField.change(function (){
				var targetName = jQueryInputDateField.attr('name');
		    	$(this.form).bootstrapValidator('revalidateField', targetName );
		    });
		}
	});
}

/*
* Date-Field-Periodo
*/
/**
* Inicia datas com padrão MV e faz as seguintes Validações:
* - formato da data - 99/99/9999;
	 * - Data do período final iniciando apartir da data do período inicial;
	 * Parametros obrigatórios:
* @param {String} idField //id da data inicial
* @param {String} idFieldEndDate //id da data final
* @param {String} idForm //id do formulário
* Opcional:
* @param {Booelan} disabledStartDate // desabilita a primeira data;
* @param {Booelan} disabledEndDate // desabilita a segunda data;
* @result Um componente com duas datas validadas para período.
*/
function initDateFieldPeriodo(){
	var targets = $('.date-field-periodo');

	jQuery.each(targets, function(i, target){ 
		if( target !== undefined){
			var jQueryTarget = $(target);
			var jQueryStartDate = jQuery(jQueryTarget.find('.create-date-picker-start-date')[0]);
			var jQueryEndDate = jQuery(jQueryTarget.find('.create-date-picker-end-date')[0]);
			var jQueryBtnAddonCalendarStartDate = jQuery(jQueryTarget.find('.input-group-addon.calendar.btn.startDate')[0]);
			var jQueryBtnAddonCalendarEndDate = jQuery(jQueryTarget.find('.input-group-addon.calendar.btn.endDate')[0]);
			var jQueryFormTarget = $(jQueryStartDate.attr('data-idForm'));
			var isStartDateDisabled = jQueryStartDate.is(':disabled');
			var isEndDateDisabled = jQueryEndDate.is(':disabled');
			var nameStartDate = jQueryStartDate.attr('name');
			var nameEndDate = jQueryEndDate.attr('name');
			var isRequiredStartDate = new Boolean(jQueryStartDate.attr('data-requiredPeriodo'));
			var isRequiredEndDate = new Boolean(jQueryEndDate.attr('data-requiredPeriodoEndDate'));
			
			jQueryBtnAddonCalendarStartDate.attr("disabled", isStartDateDisabled);
			jQueryBtnAddonCalendarEndDate.attr("disabled", isEndDateDisabled);
			
			if(!isStartDateDisabled || isStartDateDisabled == undefined){
				var valueStartDate = jQueryStartDate.attr('data-startDate');
				var valueEndDate = jQueryStartDate.attr('data-endDate');
				
				jQueryStartDate.datepicker({
				 todayHighlight: true,
			     autoclose: true,
			     format: "dd/mm/yyyy",
			     defaultDate: +7,
			     startDate: valueStartDate,
			     endDate: valueEndDate,
			     language:"pt-BR"
			    });
			   
				jQueryStartDate.mask('99/99/9999');
			    
			    if(isRequiredStartDate && nameStartDate != null && nameStartDate != ""){
			    	jQueryStartDate.change(function (){
				    	$(this.form).bootstrapValidator('revalidateField', nameStartDate);
				    });
			    }
			    
			    jQueryBtnAddonCalendarStartDate.on('click', '', function(){
					var selectorCalendar = '#'+$(this).attr('data-target');
					$(selectorCalendar).datepicker('show');
				});
			    
			    jQueryStartDate.datepicker({
					autoclose : true,
					format : "dd/mm/yyyy",
					language : "pt-BR"
				}).on(
						'changeDate',
						function(e) {
							jQueryStartDate.datepicker('hide');
							jQueryEndDate.datepicker("setStartDate",e.date);
							jQueryEndDate.datepicker("setDate");
							if(isRequiredStartDate && nameStartDate != null && nameStartDate != ""){
								jQueryFormTarget.bootstrapValidator('revalidateField', nameStartDate);
								jQueryFormTarget.bootstrapValidator('revalidateField', nameEndDate);
							}
						});
			}
			
			if(!isEndDateDisabled || isEndDateDisabled == undefined){
				
				jQueryEndDate.datepicker({
				 todayHighlight: true,
			     autoclose: true,
			     format: "dd/mm/yyyy",
			     startDate: valueStartDate,
			     endDate: valueEndDate,
			     language:"pt-BR"
			    });
				
			    jQueryEndDate.mask('99/99/9999');
			    
			    jQueryBtnAddonCalendarEndDate.on('click', '', function(){
			    	var selectorCalendar = '#'+$(this).attr('data-target');
					$(selectorCalendar).datepicker('show');
				});
			    
			    if(isRequiredEndDate && nameEndDate != null && nameEndDate != ""){
			    	jQueryEndDate.change(function (){
				    	$(this.form).bootstrapValidator('revalidateField', nameEndDate);
				    });
			    }
			    
			    jQueryEndDate.datepicker({
					autoclose : true,
					format : "dd/mm/yyyy",
					language : "pt-BR"
				}).on(
						'changeDate',
						function(e) {
							jQueryEndDate.datepicker('hide');
							if(isRequiredEndDate && nameEndDate != null && nameEndDate != ""){
								jQueryFormTarget.bootstrapValidator('revalidateField', nameEndDate);
							}
						});
			    
			}
		}
	});
};

