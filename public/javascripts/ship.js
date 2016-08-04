

$(document).ready(function() {
    console.log('Loaded...');

    function handleError(message) {
        $("#errorMessage").text(message);
    }

    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                // $("#domoMessage").animate({width:'hide'},350);

                console.log("Hello World!");
                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);

                handleError(messageObj.error);
            }
        });
    }

    $("#requestShipmentSubmit").on("click", function(e) {
        e.preventDefault();

        // $("#domoMessage").animate({width:'hide'},350);

        // if($("#domoName").val() == '' || $("#domoAge").val() == '') {
        //     handleError("RAWR! All fields are required");
        //     return false;
        // }
        var currentStart = $('#startLocation').val();
        $('#startLocation').val(currentStart.replace(/ /g, '+'));

        var currentEnd = $('#endLocation').val();
        $('#endLocation').val(currentEnd.replace(/ /g, '+'));

        sendAjax($("#shipForm").attr("action"), $("#shipForm").serialize());

        return false;
    });

    $('#searchUsersInput').on('keyup', function(){
        if ($('#searchUsersInput').val() != ""){
            $.ajax({
                cache: false,
                type: "GET",
                url: "/account/search", //?q=" + $(this).val(),
                data: {q: $('#searchUsersInput').val()},
                dataType: "json",
                success: function(result, status, xhr) {
                    console.log(result);
                    $('#userResults').html('');
                    for (var i = 0, len = result.users.length; i < len; i++) {
                        var user = result.users[i];
                        // console.log(user);
                        var newUser = document.createElement('p');
                        newUser.innerHTML = user.username + " - " + user.firstName + " " + user.lastName + " : <b>" + user.id + "</b>";
                        $('#userResults').append(newUser);
                    }
                },
                error: function(xhr, status, error) {
                    var messageObj = JSON.parse(xhr.responseText);

                    handleError(messageObj.error);
                }
            });
        }
        else {
            $('#userResults').html('');
        }
    });

});