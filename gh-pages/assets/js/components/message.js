function initBtnConfirmation(){
	$('.confirmation-callback').confirmation({
		onConfirm: function() { 
			var jQuerySelf= jQuery(this);
			var method = jQuerySelf.attr('data-method');
			var defaultFunction = new Boolean(jQuerySelf.attr('data-defaultFunction'));
			var ajaxFunction = new Boolean(jQuerySelf.attr('data-ajaxFunction'));
			var msgSave = jQuerySelf.attr('data-msgSave');
			var idButtonSearch = jQuerySelf.attr('data-idButtonSearch');
			var funcao = jQuerySelf.attr('data-funcao');
			var idToExclude = jQuerySelf.attr('data-id');
			var url = method + '?id='+idToExclude;	
		}
	});
}