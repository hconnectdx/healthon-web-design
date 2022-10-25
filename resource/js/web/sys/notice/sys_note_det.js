//취소버튼
function applyNoteReset(){
    $("#cancel-confirm-modal").modal('show');
    $("#cancel-confirm-modal_confirm_btn").off('click');
    $("#cancel-confirm-modal_confirm_btn").on('click', function() {
        $("#cancel-confirm-modal").modal('hide');
        updateNote();
        $("#sys_note_tab_1").tab("show");
    });
}
//원래대로버튼
function applyNoteRollBack(){
    $("#rollback-confirm-modal").modal('show');
    $("#rollback-confirm-modal_confirm_btn").off('click');
    $("#rollback-confirm-modal_confirm_btn").on('click', function() {
        $("#rollback-confirm-modal").modal('hide');
        if($("#sys_note_update_flag").val() == "update"){
            updateNote($("#sys_note_update_flag").val(), $("#sys_note_noticeSno").val());
        }else{
            updateNote();
        }
    });
}