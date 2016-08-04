function submitFormOnEnterForElements(submit, elements) {
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		element.keypress(function(e){
		    if (e.which == 13) {
		        e.preventDefault();
		        submit.click();
		    }
		});	
	}
}