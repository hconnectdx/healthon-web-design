function showAnswerView(qnaSno){
    // 팝업 호출
    let url = "/sys/qna/modal/sys_service_edit?qnaSno="+qnaSno;

    $("#answer-view-modal > .modal-dialog").load(url, function() {
        $("#answer-view-modal").modal("show");
    });

}

