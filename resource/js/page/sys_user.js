//웹사용자 등록,수정Modal
function showWebUserDlg(flag, data, managementGroupSno){
    var params = {};
    if(flag == "update") {
        params =  {"managementSno":data, "managementGroupSno":managementGroupSno};
    }
    $("#webuser-modal > .modal-dialog").empty();
    $("#webuser-modal > .modal-dialog").load("/sys/webUser/modal/sys_webuser_det", params, function() {
        $("#webuser-modal").modal("show");
    });
}

//웹사용자 조회 새로고침
function refreshWebuserTable() {
    $('#webuser-datatable').DataTable().ajax.reload();
}