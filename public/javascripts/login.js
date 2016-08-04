window.onload = init;

function init(){
	var savedUsername = localStorage.getItem('sendr-username');
	
	if (savedUsername) {
		$("#login-username").val(savedUsername);
		$('#login-remember')[0].checked = true;
	}
	
	submitFormOnEnterForElements($('#login-submit'), [$('#login-password')]);
	
	$('#login-submit').on('click', function(e){
		e.preventDefault();
		
		var remember = $('#login-remember')[0].checked;
		var username = $('#login-username').val();
		
		$.ajax({
			url: "/Login",
			method: "POST",
			data: {
				username: $('#login-username').val(),
				pass: $('#login-password').val()
			},
			error: function(jqxhr, status, error){
				var response = JSON.parse(jqxhr.responseText);
				if (!remember) $('#login-username').val('');
				$('#login-password').val('');
				
				$("#login-error").text(response.error).show();
			},
			success: function(response, status, jqxhr) {
				if (remember){
					localStorage.setItem('sendr-username', username);
				}
				else {
					localStorage.removeItem('sendr-username');
				}
		
				window.location = response.redirect;
			}
		});
	});
}