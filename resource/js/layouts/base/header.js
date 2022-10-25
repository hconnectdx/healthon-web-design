
function myAccountPop(){
    var url = "/com/modal/account";
    $("#my-info-modal > .modal-dialog").load(url, function() {
        $("#my-info-modal").modal("show");
    });
}



function mySettingPop(){
    $("#setting-modal").load("/com/modal/setting", function() {
        $(this).modal("show");
        $(this).off("hidden.bs.modal");
        $(this).on("hidden.bs.modal", function(e){
            let uiColorClcd = $(this).find("form#settingForm #uiColorClcd").data("default");
            if( uiColorClcd === '10808200')
                $.App.activateDarkMode();
            else
            {
                $.App.deactivateDarkMode();
            }
        });
    });
}

function totalPatientSearch(form){
    var totalPatientSearchKeywd = $(form).find("input[name=totalPatientSearchKeywd]").val();
    callMenu('/user/user', i18n('common.menu.all_user'), {'totalPatientSearchKeywd': totalPatientSearchKeywd});

    return false;
}
