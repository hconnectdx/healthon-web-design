//문의내용조회Modal
function showAnswerViewDlg(flag, data){
    // 팝업 호출
    let url = "/sys/qna/modal/sys_service_answer";
    if(flag == "answer") {
        url = url + "?qnaSno=" + data;
    }
    $("#answer-view-modal > .modal-dialog").load(url, function() {
        $("#answer-view-modal").modal("show");
    });

}
//문의내용작성Modal
function showAnswerEditDlg(flag, data) {
    // 팝업 호출
    let url = "/sys/qna/modal/sys_service_edit";
    if (flag == "edit") {
        url = url + "?qnaSno=" + data;
    }
    $("#answer-edit-modal > .modal-dialog").load(url, function () {
        $("#answer-edit-modal").modal("show");
    });
}

