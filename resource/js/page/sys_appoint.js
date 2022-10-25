// 이력조회Modal
function showAppointHistory(termsSno, dispType) {
    $("#appoint-modal").modal("show");
    // dispType 1 : 약관이력조회 2 : 개인정보이력조회
    var params = {"termsSno":termsSno,"dispType":dispType};
    $("#appoint-modal > .modal-dialog").empty();
    $("#appoint-modal > .modal-dialog").load("/sys/stplat/modal/sys_appoint_det", params, function() {
        $("#appoint-modal").modal("show");
    });
}
//공지사항 조회 새로고침
function refreshTermsTable() {
    $('#appoint-datatable').DataTable().ajax.reload();
}
