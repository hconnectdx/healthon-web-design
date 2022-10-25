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

function getTempPwAuth () {
    let msg = i18n("login.forget.code.confirm.txt.title");
    let timeoutMsg = i18n("login.forget.code.confirm.txt.time.out");

    if (!$('input[name="managementEmail"]').val()) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('login.forget.code.confirm.txt.title.not.equal'));
        $("#e_content").html(i18n('login.valid_error.error.email.required'));
        return false;
    }

    $('#setTempPwBtn').attr("disabled", true);

    $.ajax({
        url: "/login/api/getTempPwAuth",
        type: "POST",
        data: $("form#findPwFOrm").serializeArray(),
        success: function (data) {

            // console.log(data);

            if (data.code !== 1) {
                $("#error-alert-modal").modal('show');
                $("#e_title").html(data.valid_form_result_title);
                $("#e_content").html(data.valid_form_result);
            } else {

                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(msg);
                $("#success-alert-modal #content").html(data.valid_form_result);

                let display = $("#timer-text");
                let leftSec = 300;

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

                $('#setTempPwBtn').attr("disabled", false);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function setTempPw () {
    let msg = i18n("login.forget.code.confirm.txt.title");

    $.ajax({
        url: "/login/api/setTempPw",
        type: "POST",
        data: $("form#findPwForm").serializeArray(),
        success: function (data) {
            // console.log(data);
            if (data.code !== 1) {
                $("#error-alert-modal").modal('show');
                $("#e_title").html(data.valid_form_result_title);
                $("#e_content").html(data.valid_form_result);
            } else {
                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(msg);
                $("#success-alert-modal #content").html(data.valid_form_result);

                $("#success-alert-modal").on("hidden.bs.modal", function(e){
                    location.href="/login";
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

$("form#findPwForm input[name='managementEmail']").on('keyup', function () {
    clearInterval(timer);
    $("#timer-text").html(null).hide();
    isRunning = false;
    $('#setTempPwBtn').attr("disabled", true);
    $('#get-code').attr("disabled", false);
});

$(function () {

    var getEmail = sessionStorage.getItem("getEmail");
    $("#managementEmail").val(getEmail);

});

