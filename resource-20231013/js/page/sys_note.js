//공지사항 조회Modal
function showNote(sno) {
    $("#note-modal").modal("show")

	console.log(sno);
    // 팝업 호출
    var params = {"noticeSno": sno};
    $("#note-modal > .modal-dialog").empty().load("/sys/notice/modal/sys_note_show", params, function() {
        $("#note-modal").modal("show");
    });

}
//공지사항 삭제API
function deleteNote(noticeSno, groupNm, noticeTitleNm) {
    if(!isEmpty(noticeSno)) {
        $("#confirm-modal").modal('show');
        $("#delModalBtn").off('click');
        $("#delModalBtn").on('click', function() {
            $("#confirm-modal").modal('hide');

            $.ajax({
                url: "/sys/notice/api/sys_note_det/del",
                dataType: 'json',
                method: "POST",
                data: {
                    "noticeSno": noticeSno,
                    "groupNm": groupNm,
                    "noticeTitleNm": noticeTitleNm
                },
                success: function (data) {
                    $("#success-alert-modal").modal('show');
                    $("#success-alert-modal #title").html($('#deleteTitleMsg').val());
                    $("#success-alert-modal #content").html($('#deleteContentMsg').val());
                    //처음 생성할때 ajax만 새로고침
                    $('#note-datatable').DataTable().ajax.reload();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });

        });

    }

}
//공지사항 수정화면 이동
function updateNote(flag, noticeSno){
    var newMsg = $('#newMsg').val();
    var modifyMsg = $('#modifyMsg').val();

    // 팝업 호출
    var params = {};
    if(flag == "update") {
        params =  {
        		"noticeSno":noticeSno
        };
        $("#sys_note_update_flag").val(flag);
        $("#sys_note_noticeSno").val(noticeSno);
    }else{
        $("#sys_note_update_flag").val("");
        $("#sys_note_noticeSno").val("");
    }
    $("#sys_note_tab_2_area div").empty();
    $("#sys_note_tab_2_area div").load("/sys/notice/sys_note_det", params, function() {
        if(flag == "update") {
            $("#sys_note_tab_2").tab("show");
            $("#sys_note_tab_2 span").text(modifyMsg);
        }else{
            $("#sys_note_tab_2 span").text(newMsg);
        }
    });
}
//공지사항 조회 새로고침
function refreshNoticeTable() {
    $('#note-datatable').DataTable().ajax.reload();
}