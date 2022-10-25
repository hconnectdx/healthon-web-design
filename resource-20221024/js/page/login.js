$(function(){
    //initFace();
    $("#loginForm").validate({
        rules: {
            email: {"required":true, "email":true},
            password: {"required":true, "minlength":8},
        },
        messages: {
            email: {"required":"이메일을 입력해주십시오.", "email":"이메일형식이 아닙니다."},
            password: {"required":"패스워드를 입력해주십시오.", "minlength":"8자 이상 입력하여야 합니다."},
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("div.invalid-feedback").text($(error[0]).text());
        },
        submitHandler: function(form){
            var email = $("#loginForm input[name='email']").val();
            var password = $("#loginForm input[name='password']").val();
            var is_account = -1;
            if(email == "admin@admin.com" && password == "11111111"){
                is_account = 0;
            }else if(email == "doctor@email.com" && password == "11111111"){
                is_account = 1;
            }
            if(is_account == -1){
                errorMsg("로그인 실패", "계정과 암호가 올바르지 않습니다.");
                return;
            }

            if(is_account == 0){
                window.location.href = $(form).attr("action");
            }else{
                window.location.href = 'doctor_main.html';
            }


        }
    });

    $("#smsSendForm").validate({
        rules: {
        email: {"required":true, "email":true},
        phone: {"required":true},
            },
            messages: {
                email: {"required":"이메일주소을 입력해주십시오.","email":"이메일형식이 아닙니다."},
                phone: {"required":"핸드폰번호를 입력해주십시오."},
            },
            errorPlacement: function (error, element) {
                $(element).parent().find("div.invalid-feedback").text($(error[0]).text());
            },
            submitHandler: function(form){
                sendTime = 300;
                counterTime();
                $("#smsSendForm #submitBtn").attr("disabled","");
            }
    });

    $("#smsWriteForm").validate({
        rules: {
            sms_code: {"required":true},
        },
        messages: {
            sms_code: {"required":"02:59"},
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("div.invalid-feedback").text($(error[0]).text());
        },
        submitHandler: function(form){
            updatePassword();
        }
    });

    $("#updatePasswordForm").validate({
        rules: {
            password1: {"required":true, "minlength":8},
            password_confirm: {"required":true, "minlength":8,equalTo:"input[name='password1']"},
        },
        messages: {
            password1: {"required":"패스워드를 입력해주십시오.", "minlength":"8자 이상 입력해주십시오."},
            password_confirm: {"required":"패스워드확인을 입력해주십시오.", "minlength":"8자 이상 입력해주십시오.",equalTo:"패스워드와 확인패스워드는 일치하여야 합니다."},
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("div.invalid-feedback").text($(error[0]).text());
            $(element).addClass("is-invalid");
        },
        submitHandler: function(form){
            $(form).find("div.invalid-feedback").css("display", "none");
            setUserPassword();
        }
    });

});

function counterTime(){
    sendTime--;
    var sendTimeStr = getSecondToStr(sendTime);
    $("#smsSendForm #time_str").text(sendTimeStr);
    if(sendTime == 0){
        $("#smsSendForm #time_str").addClass("hidden");
        $("#smsSendForm  #loading").addClass("hidden");
        $("#smsSendForm #submitBtn").removeAttr("disabled");
    }else{
        $("#smsSendForm #time_str").removeClass("hidden");
        $("#smsSendForm  #loading").removeClass("hidden");
        setTimeout(function(){
            counterTime();
        },1000);
    }
}

var sendTime = 0;

function initFace(){
    var width = $(window).width();
    if(width > 578){
        var r_height = $(".login-right").height();
        $(".login-left").css("height", r_height+"px");
    }
}

$(window).resize(function(){
   //initFace();
});

function findPassword(){
    $("#find-password-modal").modal("show");
}

function submitUpdatePassword(){
    $("#smsWriteForm").submit();
}


function updatePassword(){
    $("#find-password-modal").modal("hide");
    $("#update-password-modal").modal("show");
}
function setUserPassword(){
    $("#update-password-modal").modal("hide");
    successMsg("설정 성공", "비밀번호설정이 성공하었습니다.");
}