function applyJumpRopeTipReset(){
    $("#cancel-confirm-modal").modal('show');
    $("#cancel-confirm-modal_confirm_btn").off('click');
    $("#cancel-confirm-modal_confirm_btn").on('click', function() {
        $("#cancel-confirm-modal").modal('hide');
        updateJumpRopeTip();
        $("#sys_jump_rope_tip_tab_1").tab("show");
    });
}

function applyJumpRopeTipRollBack(){
    $("#rollback-confirm-modal").modal('show');
    $("#rollback-confirm-modal_confirm_btn").off('click');
    $("#rollback-confirm-modal_confirm_btn").on('click', function() {
        $("#rollback-confirm-modal").modal('hide');
        if($("#sys_jump_rope_tip_update_flag").val() == "update"){
            updateJumpRopeTip($("#sys_jump_rope_tip_update_flag").val(), $("#sys_jump_rope_tip_jumpRopeTipSno").val());
        }else{
            updateJumpRopeTip();
        }
    });
}