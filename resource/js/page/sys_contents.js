function showContents(sno) {
    $("#contents-modal").modal("show")

    console.log(sno);
    // 팝업 호출
    var params = {"contentsSno": sno};
    $("#contents-modal > .modal-dialog").empty().load("/content/content/modal/sys_contents_show", params, function() {
        $("#contents-modal").modal("show");
    });

}


function updateContents(flag, contentsSno){

    var newTitleMsg = $('#newTitleMsg').val();
    var modTitleMsg = $('#modTitleMsg').val();

    // 팝업 호출
    // console.log(contentsSno);
    var params = {};
    if(flag == "update") {
        params =  {
            "contentsSno":contentsSno
        };
        $("#sys_content_update_flag").val(flag);
        $("#sys_content_contentsSno").val(contentsSno);
    }else{
        $("#sys_appoint_update_flag").val("");
        $("#sys_content_contentsSno").val("");
    }

    // $('#new_content_thumb_Dropzone')[0].dropzone.removeAllFiles();

    $("#sys_content_tab_2_area div").empty().load("/content/content/list", params, function() {
        if(flag == "update") {
            $("#sys_content_tab_2").tab("show");
            $("#sys_content_tab_2 span").text(modTitleMsg);
        }else{
            $("#sys_content_tab_2 span").text(newTitleMsg);
        }
    });
}
