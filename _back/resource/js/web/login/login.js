$(function(){
    /**
     * 로그인 validation
     * 입력 값에 대한 유효성 검사는 하지 않고, 입력 여부만 판단
     */
    $("#loginForm").validate({
        rules: {
            managementId: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            managementId: {
                required: i18n("login.valid_error.error.email.required"),
            },
            password: {
                required: i18n("login.valid_error.password_title")
            }
        },
        errorPlacement: function (error, element) {
            $("#loginForm #res_message").text($(error[0]).text());
        },
        success: function(error, element) {
        },
        submitHandler: function(form){
            loginCheck();
        }
    });

    $("#smsSendForm").validate({
        rules: {
        email: {"required":true, "email":true},
        phone: {"required":true},
            },
            messages: {
                email: {"required":i18n("login.valid_error.error.email.required"),"email":i18n("login.valid_error.error.email.format")},
                phone: {"required":i18n("login.valid_error.mobile_num_title")},
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
            password1: {"required":i18n("login.valid_error.password_title"), "minlength":i18n("login.valid_error.password_desc")},
            password_confirm: {"required":i18n("login.valid_error.password_confirm_title"), "minlength":i18n("login.valid_error.password_confirm_desc1"),equalTo:i18n("login.valid_error.password_confirm_desc2")},
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
    if(sendTime === 0){
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
    successMsg(i18n("login.setting_success_title"), i18n("login.setting_success_desc"));
}

function loginCheck() {

    /** spring validator result : print form clear */
    $("form#loginForm #tz").val(Intl.DateTimeFormat().resolvedOptions().timeZone);
    $("form#loginForm").find("span[id^='vout_']").remove();
    let formData = $("form#loginForm").serializeFormToJson();

    $.ajax({
        url: "/login/api/loginCheck",
        type: "POST",
        data: formData,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        success: function (data) {

            $("#res_message").text("");

            var list = data.valid_form_result;
            if (list != null) {
                $.each(list, function (i, d) {
                    if (d.field != null && d.field === "managementPasswd") {
                        d.defaultMessage = i18n("login.password.confirmtxt.id.null");
                    }
                });
            }

            /** spring validator result : print form */
            validFormResultPrint(data.valid_form_result);

            /** login process result */
            if (data.login_result != null) {
                if (data.login_result === "ok") {
                    location.replace("/main");
                } else if (data.login_result === "reset") {
                    showSetPwModal();
                } else if (data.login_result === "change") {
                    showPwChangeModal();
                } else if (data.login_result === "change3m") {
                    show3mPwChangeModal();
                } else if (data.login_result === "dormant") {
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(i18n('login.error_dormant.title'));
                    $("#e_content").html(i18n('login.error_dormant.desc.new'));
                } else {
                    setResMsg(data.login_result);
                }
            }
        },
        error: function (a, b, c) {
            console.log("error ~~~~~~~~~~");
            console.log(a);
            console.log(b);
            console.log(c);
        },
        complete: function (a) {
            // console.log("complete ~~~~~~~~~~");
            // console.log(a);
        }
    });
}

function setResMsg(msg){
    // console.log(msg);
    $("#res_message").text(msg);
}

/**
 * 초기 비밀번호 변경 - 모달
 */
function showSetPwModal(){
    // 팝업 호출
    $("#setPw").load("/login/modal/setPw", function() {
        $(this).off("hidden.bs.modal");
        $(this).on("hidden.bs.modal", function(e){
            location.href = '/no-session';
        });
        $(this).modal("show");
    });
}

/**
 * 최초 비밀번호 초기화 - 모달
 */
function resetPw(){

    /** spring validator result : print form clear */
    $("#setPwForm").find("span[id^='vout_']").remove();
    $('#setPwFormMsg').html("");

    let formData = $("#setPwForm").serializeFormToJson();
    let data = JSON.stringify(formData);

    $.ajax({
        url: "/login/api/setPw",
        type: "POST",
        data: formData,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        success: function (data) {

            // console.log(data);
            if (data.result === "ok") {
                location.replace("/main");
            }else{
                /** spring validator result : print form */
                validFormResultPrint(data.valid_form_result, "setPwFormMsg");
            }
        },
        error: function(a,b,c){
            console.log("error ~~~~~~~~~~");
            console.log(a);
            console.log(b);
            console.log(c);
        },
        complete: function(a){
            console.log("complete ~~~~~~~~~~");
            console.log(a);
        }
    });
}

/**
 * 3개월 비밀번호 변경 - 모달
 */
function show3mPwChangeModal(){
    // 모달 호출
    $("#changePw3m").load("/login/modal/changePw3m", function() {
        $(this).modal("show");
    });
}

/**
 * 기타 사유로 인한 비밀번호 변경 - 모달
 */
function showPwChangeModal(){
    // 팝업 호출
    $("#changePw").load("/login/modal/changePw", function() {
        $(this).modal("show");
    });
}

/**
 * 3개월 이상 비밀번호 변경 - 모달
 */
function changePw3m(){

    /** spring validator result : print form clear */
    $("#changePw3mForm").find("span[id^='vout_']").remove();
    $('#changePwFormMsg').html("");

    let formData = $("#changePw3mForm").serializeFormToJson();
    let data = JSON.stringify(formData);

    $.ajax({
        url: "/login/api/changePw3m",
        type: "POST",
        data: formData,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        success: function (data) {

            console.log(data);
            if (data.result === "ok") {
                location.replace("/main");
            }else{
                /** spring validator result : print form */
                validFormResultPrint(data.valid_form_result, "changePwFormMsg");
            }
        },
        error: function(a,b,c){
            console.log("error ~~~~~~~~~~");
            console.log(a);
            console.log(b);
            console.log(c);
        },
        complete: function(a){
            console.log("complete ~~~~~~~~~~");
            console.log(a);
        }
    });
}

/**
 * 기타 사유로 인한 비밀번호 변경 - 모달
 */
function changePw(){

    /** spring validator result : print form clear */
    $("#changePwForm").find("span[id^='vout_']").remove();
    $('#changePwFormMsg').html("");

    let formData = $("#changePwForm").serializeFormToJson();
    let data = JSON.stringify(formData);

    $.ajax({
        url: "/login/api/changePw",
        type: "POST",
        data: formData,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        success: function (data) {

            if (data.result === "ok") {
                location.replace("/main");
            }else{
                /** spring validator result : print form */
                validFormResultPrint(data.valid_form_result, "changePwFormMsg");
            }
        },
        error: function(a,b,c){
            console.log("error ~~~~~~~~~~");
            console.log(a);
            console.log(b);
            console.log(c);
        },
        complete: function(a){
            console.log("complete ~~~~~~~~~~");
            console.log(a);
        }
    });
}

var timer = null;
var isRunning = false;

function startTimer(count, display, timeoutMsg) {
    count = timerCallback(count, display, timeoutMsg);
    timer = setInterval(function () {
        count = timerCallback(count, display, timeoutMsg);
    }, 1000);
    isRunning = true;
}

function timerCallback(count, display, timeoutMsg){

    if (!timeoutMsg) {
        timeoutMsg = i18n("login.forget.code.confirm.txt.time.out");
    }

    let minutes = parseInt(count / 60, 10);
    let seconds = parseInt(count % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.html(minutes + ":" + seconds);

    // 타이머 끝
    if (--count < 0) {
        clearInterval(timer);
        display.html(timeoutMsg);
        isRunning = false;
    }

    return count;
}

function addAuthCheckCode() {
    let msg = i18n("login.forget.code.confirm.txt.title");
    let timeoutMsg = i18n("login.forget.code.confirm.txt.time.out");

    if (! $('input[name="certifiedOptions"]:checked').val()) {
        $("#loginForm #res_message").text(i18n('login.check_add_auth'));
        return false;
    }

    $("#get-code").attr("disabled", true);

    $.ajax({
        url:"/login/api/addAuthCheckCode",
        type: "POST",
        data: $("form#loginForm").serializeArray(),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "JSON",
        success: function (data) {
            if (data.result !== 1) {
                $("#get-code").attr("disabled", false);
                if (data.result === 2) {
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(i18n('login.error_dormant.title'));
                    $("#e_content").html(i18n('login.error_dormant.desc.new'));
                } else {
                    $("#loginForm #res_message").text(data.valid_form_result);
                }
            } else {
                setTimeout(function() {
                    $("#get-code").attr("disabled", false);
                }, 60000); // 60초 후 활성화

                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(msg);
                $("#success-alert-modal #content").html(data.valid_form_result);

                let display = $("#timer-text");
                let leftSec = 180;
                if ($('input[name="certifiedOptions"]:checked').val() === 'email') {
                    leftSec = 300;
                }

                // 남은 시간
                // 이미 타이머가 작동중이면 중지
                if (isRunning){
                    clearInterval(timer);
                    display.html("");
                    startTimer(leftSec, display, timeoutMsg);
                }else{
                    startTimer(leftSec, display, timeoutMsg);
                }

                display.show();
                $('#loginBtn').attr("disabled", false);
            }
        },
        error: function () {
            $("#get-code").attr("disabled", false);
        }

    });
}

$("form#loginForm input[name='managementId']").on('keyup', function () {
    clearInterval(timer);
    $("#timer-text").html(null).hide();
    isRunning = false;
    $('#loginBtn').attr("disabled", true);
    $('#get-code').attr("disabled", false);
});

$("form#loginForm input[name='managementPasswd']").on('keyup', function () {
    clearInterval(timer);
    $("#timer-text").html(null).hide();
    isRunning = false;
    $('#loginBtn').attr("disabled", true);
    $('#get-code').attr("disabled", false);
});

function loginAlertEmail(){
    $("#info-alert-modal").modal('show');
    $("#i_title").html(i18n('login.forgot_email.title'));
    $("#i_content").html(i18n('login.forgot_email.desc'));
}

$("#getEmail").on('click', function () {

    var getEmail = $("#managementId").val();
    sessionStorage.setItem("getEmail", getEmail);

});