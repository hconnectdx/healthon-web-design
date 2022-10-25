function showJumpRopeTip(sno) {
    $("#modal-show").modal("show");

    // 팝업 호출
    var params = {"jumpRopeTipSno": sno};
    $("#modal-show > .modal-dialog").empty();
    $("#modal-show > .modal-dialog").load("/content/jump/modal/sys_jump_rope_tip_show", params, function() {
        $("#modal-show").modal("show");
    });

}



function updateJumpRopeTip(flag, jumpRopeTipSno){

    var newTitleMsg = $('#newTitleMsg').val();
    var modTitleMsg = $('#modTitleMsg').val();

    var params = {};
    if(flag == "update") {
        params =  {
        		"jumpRopeTipSno":jumpRopeTipSno
        };
        $("#sys_jump_rope_tip_update_flag").val(flag);
        $("#sys_jump_rope_tip_jumpRopeTipSno").val(jumpRopeTipSno);
    }else{
        $("#sys_jump_rope_tip_update_flag").val("");
        $("#sys_jump_rope_tip_jumpRopeTipSno").val("");
    }
    $("#sys_jump_rope_tip_tab_2_area div").empty();
    $("#sys_jump_rope_tip_tab_2_area div").load("/content/jump/ins", params, function() {
        if(flag == "update") {
            $("#sys_jump_rope_tip_tab_2").tab("show");
            $("#sys_jump_rope_tip_tab_2 span").text(modTitleMsg);
        }else{
            $("#sys_jump_rope_tip_tab_2 span").text(newTitleMsg);
        }
    });
}
