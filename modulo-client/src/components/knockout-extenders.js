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