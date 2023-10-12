//취소버튼
function applyAppointReset(){
    $("#cancel-confirm-modal").modal('show');
    $("#cancel-confirm-modal_confirm_btn").off('click');
    $("#cancel-confirm-modal_confirm_btn").on('click', function() {
        $("#cancel-confirm-modal").modal('hide');
        showAppointUpdate();
        $("#sys_appoint_tab_1").tab("show");
    });
}
//원래대로버튼
function applyAppointRollBack(){
    $("#rollback-confirm-modal").modal('show');
    $("#rollback-confirm-modal_confirm_btn").off('click');
    $("#rollback-confirm-modal_confirm_btn").on('click', function() {
        $("#rollback-confirm-modal").modal('hide');
        if($("#sys_appoint_update_flag").val() == "update"){
            showAppointUpdate($("#sys_appoint_update_flag").val(), $("#sys_appoint_termsSno").val(), $("#sys_appoint_termsHistSno").val(), $("#sys_appoint_dispType").val());
        }else{
            showAppointUpdate();
        }
    });
}