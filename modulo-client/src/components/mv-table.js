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