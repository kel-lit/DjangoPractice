$(document).ready(function(){

    const tooltip = $('.user-taken-tooltip');
    const input = $('#inputUsername');

    var popper = new Popper(input, tooltip, {
        placement: 'right',
        modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
          ],
    });
    
    $("#inputUsername").bind('input', function(){

        $.ajax({
            url: '/signup/',
            method: 'POST',
            headers: {
                'CheckUser': $("#inputUsername").val(),
                'X-CSRFToken': getCSRFTokenValue()},
            success: function(username){
                if (username['is_taken']){
                    $('.btn').prop('disabled', true);
                    $('.user-taken-tooltip').prop('hidden', false);
                }
                else{
                    $('.btn').prop('disabled', false);
                    $('.user-taken-tooltip').prop('hidden', false);
                }
            }
        })

    });

});

//Django will throw a 403 if the csrf token is not supplied
function getCSRFTokenValue(){
    var value = "; " + document.cookie;
    var parts = value.split("; csrftoken=");
    if (parts.length == 2) return parts.pop().split(";").shift();
};