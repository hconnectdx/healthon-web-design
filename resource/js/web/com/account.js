//내 정보 수정API
function updateMyAccount(){
    let managementFnm = $("form#accountForm input[name='managementFnm']").val();
    let managementLnm = $("form#accountForm input[name='managementLnm']").val();
    let managementHpNo = $("#accountForm_managementHpNo").val();
    let managementPasswd = $("#accountForm_managementPasswd").val();

    var form = $('#accountForm')[0];
    var formData = new FormData(form);

    //팝업 타이틀 고정
    $("#e_title").html(i18n('common.txt.register.fail.missing.input'));

    //입력치체크
    if(isEmpty(managementFnm)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.web.user.new.pop.firstname.null.txt.txt'));
        return false;
    } else if(isEmpty(managementLnm)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.web.user.new.pop.lastname.null.txt.txt'));
        return false;
    } else if(isEmpty(managementHpNo)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.web.user.new.pop.mobile.null.txt.txt'));
        return false;
    } else if(isEmpty(managementPasswd)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.web.user.new.pop.login.password.null.txt.txt'));
        return false;
    } else {

        $.ajax({
            url : "/com/modal/set_my_account",
            type : "POST",
            enctype: 'multipart/form-data',
            data : formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success : function(data){

                if(data.result == "no_passwd"){
                    $("#error-alert-modal").modal('show');
                    $("#e_content").html(i18n('management.web.user.new.pop.login.password.null.txt.txt'));
                }else if(data.result == "passwords_do_not_match"){
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(i18n('management.web.user.new.pop.error_pw_title'));
                    $("#e_content").html(i18n('management.web.user.new.pop.error_pw_eq'));
                }else {
                    $("#success-alert-modal").modal('show');
                    $("#success-alert-modal #title").html(i18n('common.txt.register.success'));
                    $("#success-alert-modal #content").html(i18n('management.web.user.new.pop.myaccount.success.txt.txt'));
                    $("#success-alert-modal .my-2").click(function () {
                        top.location.replace("/main");
                        $("#my-info-modal").modal('hide');
                    });
                }

            },
            complete : function(){

            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log("error ~~~~~");
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

    }

}

//비밀번호 변경Modal
function changePwPop(){
    var url = "/com/modal/change_my_pw";
    $("#login-password-modal > .modal-dialog").load(url, function() {
        $("#login-password-modal").modal("show");
    });
}

//프로필파일 삭제
function fileDelete () {
    $("#accountForm input[name=fileUpdate]").val("Y");
    $("#accountForm #account_img").attr("src", "/resources/images/users/avatar-1.jpg");
}
