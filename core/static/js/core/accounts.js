// JS for signup page
$(document).ready(function(){

    $('.signin-submit').prop('disabled', true);

    isUserValid();
    isEmailValid();
    isPassValid();
    doPasswordsMatch();

    $('.form-control').on('change focusout', isFormValid);

    $('.form-signin').submit(function(e){
        e.preventDefault();
        var form = this;
        $(':focus').blur();
        if (isFormValid()){
            this.submit();
        }
    });
});

function isFormValid(){

    var user_valid, email_valid, pass_valid, pass_match;

    user_valid = toBool($('#inputUsername').attr('data-valid'));
    email_valid = toBool($('#inputEmail').attr('data-valid'));
    pass_valid = toBool($('#inputPassword').attr('data-valid'));
    pass_match = toBool($('#inputPasswordMatch').attr('data-valid'));
    if (user_valid && email_valid && pass_valid && pass_match){
        // enable form button when all inputs are valid
        $('.signin-submit').prop('disabled', false);
        return true;
    }
    else {
        $('.signin-submit').prop('disabled', true);
        return false;
    }
};

function isUserValid(){

    $("#inputUsername").bind('input', function(){
        $.ajax({
            url: '/account/signup/',
            method: 'POST',
            headers: {
                'CheckUser': $("#inputUsername").val(),
                'X-CSRFToken': getCSRFTokenValue()},
            success: function(username){
                usernameTaken(username['is_taken'], $("#inputUsername").val());
            }
        });

    });
};

function isEmailValid(){

    $("#inputEmail").focusout(function(){
        var email = $("#inputEmail").val();
        if (email == ""){
            //If field is empty, remove invalid css
            $('.email-invalid-tooltip').prop('hidden', true);
            $('#email-check').prop('hidden', true);
            validInput(true, "#inputEmail");
        }
        else{
            if (emailIsValid(email)){
                $('.email-invalid-tooltip').prop('hidden', true);
                $('#email-check').prop('hidden', false);
                validInput(true, "#inputEmail");
            }
            else{
                $('.email-invalid-tooltip').prop('hidden', false);
                $('#email-check').prop('hidden', true);
                validInput(false, '#inputEmail');
            }
        }
    });
};

function isPassValid(){

    $('#inputPassword').bind('input', function(){
       var pass = $('#inputPassword').val();
       var tooltip = createPasswordTooltip(pass);
       $('.password-invalid-tooltip-text').html(tooltip);
       if (pass == ""){
            //If field is empty, remove invalid css
            $('.password-invalid-tooltip').prop('hidden', true);
            $('#password-check').prop('hidden', true);
            validInput(true, "#inputPassword");
        }
        else{
            if (passIsValid(pass)){
                $('.password-invalid-tooltip').prop('hidden', true);
                $('#password-check').prop('hidden', false);
                validInput(true, '#inputPassword')

            }
            else {
                $('.password-invalid-tooltip').prop('hidden', false);
                $('#password-check').prop('hidden', true);
                validInput(false, '#inputPassword')
            };
        };
    });
};

function doPasswordsMatch(){

    $('#inputPasswordMatch').focusout(function(){
        var password = $('#inputPassword').val();
        var match = $('#inputPasswordMatch').val();
        if (match == ""){
            //If field is empty, remove tooltip
            $('.password-match-invalid-tooltip').prop('hidden', true);
            $('#password-match-check').prop('hidden', true);
            validInput(true, "#inputPasswordMatch");
        }
        else {
            if (password == match){
                $('.password-match-invalid-tooltip').prop('hidden', true);
                $('#password-match-check').prop('hidden', false);
                validInput(true, '#inputPasswordMatch')
            }
            else {
                $('.password-match-invalid-tooltip').prop('hidden', false);
                $('#password-match-check').prop('hidden', true);
                validInput(false, '#inputPasswordMatch')
            };
        };
    });
};

//Django will throw a 403 if the csrf token is not supplied
function getCSRFTokenValue(){
    var value = "; " + document.cookie;
    var parts = value.split("; csrftoken=");
    if (parts.length == 2) return parts.pop().split(";").shift();
};

function usernameTaken(is_taken, username){

    if (username == ""){
        //If field is empty, remove invalid css
        $('.user-taken-tooltip').prop('hidden', true);
        $('#username-check').prop('hidden', true);
        validInput(true, "#inputUsername");
    }
    else{

        if (is_taken){
            $('.user-taken-tooltip').prop('hidden', false);
            $('#username-check').prop('hidden', true);
            //Add red border to input
            validInput(false, '#inputUsername');
        }
        else {
            $('.user-taken-tooltip').prop('hidden', true);
            $('#username-check').prop('hidden', false);
            //Remove red border from input
            validInput(true, '#inputUsername');
        };
    };
}

function validInput(is_valid, selector){

    if ($(selector).val() == ""){
        $(selector).attr("data-valid", "false");
        $(selector).removeClass("form-control-invalid");
        $(selector).removeClass("form-control-valid");
    }

    else {
        if (is_valid){
            $(selector).attr("data-valid", "true");
            $(selector).removeClass("form-control-invalid");
            $(selector).addClass("form-control-valid");
        }
        else {
            $(selector).attr("data-valid", "false");
            $(selector).removeClass("form-control-valid");
            $(selector).addClass("form-control-invalid");
        }
    }
};

function emailIsValid(email){

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }
    else{
        return false;
    }
};

function passIsValid(password){

    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
        return true;
    }
    else {
        return false;
    }
};

function createPasswordTooltip(password){

    var tooltip = "Your password must have at least: <br>";

    // 8 Chars
    if (!(/^[A-Za-z\d@$!%*?&]{8,}$/.test(password))){
        tooltip += "<p class='password-tooltip-invalid'>8 characters, <br>";
    }
    else {
        tooltip += "<p class='password-tooltip-valid'>8 characters, <br>";
    };
    // One uppercase
    if (!(/^(?=.*[A-Z])/.test(password))){
        tooltip += "<p class='password-tooltip-invalid'>one uppercase letter, <br>";
    }
    else {
        tooltip += "<p class='password-tooltip-valid'>one uppercase letter, <br>";
    };
    // One lowercase
    if (!(/^(?=.*[a-z])/.test(password))){
        tooltip += "<p class='password-tooltip-invalid'>one lowercase letter, <br>";
    }
    else {
        tooltip += "<p class='password-tooltip-valid'>one lowercase letter, <br>";
    };
    // One number
    if (!(/^(?=.*\d)/.test(password))){
        tooltip += "<p class='password-tooltip-invalid'>one number, <br>";
    }
    else {
        tooltip += "<p class='password-tooltip-valid'>one number, <br>";
    };
    // One special char
    if (!(/^(?=.*[@$!%*?&])/.test(password))){
        tooltip += "<p class='password-tooltip-invalid'>and one special character (@$!%*?&).";
    }
    else {
        tooltip += "<p class='password-tooltip-valid'>and one special character (@$!%*?&).";
    };

    return tooltip;
}

function toBool(string){

    if (string == 'true'){
        return true;
    }
    else {
        return false;
    }
}