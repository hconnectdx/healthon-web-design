
function setMyPassword(){

    /** spring validator result : print form clear */
    $("#changePwForm").find("span[id^='vout_']").remove();

    let formData = $("#changePwForm").serializeFormToJson();

    $.ajax({
        url: "/com/modal/set_my_pw",
        type: "POST",
        data: formData,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        success: function (data) {

            console.log(data);
            if (data.result === "ok") {
                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(i18n('login.setting_success_title'));
                $("#success-alert-modal #content").html(i18n('login.setting_success_desc'));
                $("#login-password-modal").modal('hide');
            }else if(data.result === "incorrect_password"){
                $("#error-alert-modal").modal('show');
                $("#error-alert-modal #e_title").html(i18n('survey.error_pw_title'));
                $("#error-alert-modal #e_content").html(i18n('survey.error_pw_content'));
            }else{
                validFormResultPrint(data.valid_form_result, "changeMyPwFormMsg");
                // /** spring validator result : string */
                // $("#info-alert-modal").modal('show');
                // $("#i_title").text("변경 실패");
                // $("#i_content").html(validFormResultString(data.valid_form_result));
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



