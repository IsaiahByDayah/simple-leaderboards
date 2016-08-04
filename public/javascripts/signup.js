window.onload = init;

function init(){
	submitFormOnEnterForElements($('#signup-submit'), [$('#signup-password-2')]);
	
	$('#signup-submit').on('click', function(e){
		e.preventDefault();
		
		var remember = $('#signup-remember')[0].checked;
		var username = $('#signup-username').val();
		
		$.ajax({
			url: "/Signup",
			method: "POST",
			data: {
				firstname: $('#signup-firstname').val(),
				lastname: $('#signup-lastname').val(), 
				username: $('#signup-username').val(),
				pass: $('#signup-password').val(),
				pass2: $('#signup-password-2').val()
			},
			error: function(jqxhr, status, error){
				var response = JSON.parse(jqxhr.responseText);
	//			$('#signup-firstname').val('');
	//			$('#signup-lastname').val(''); 
				$('#signup-username').val('');
				$('#signup-password').val('');
				$('#signup-password-2').val('');
				
				$("#signup-error").text(response.error).show();
			},
			success: function(response, status, jqxhr) {
				if (remember){
					localStorage.setItem('sendr-username', username);
				}
		
				window.location = response.redirect;
			}
		});
	});
}