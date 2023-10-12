//버전 등록Modal
function system_manage(flag, data){

    let url = "/sys/version/modal/sys_version_reg";

    if(flag === "reg") {
        url = url + "?appVersionHno=" + data;
    }

    $("#version-manage-modal > .modal-dialog").load(url, function() {
        $("#version-manage-modal").modal("show");
    });
}

//리스트 선택시 DataTable 재검색
function refreshVersionTable() {
    $('#version-datatable').DataTable().ajax.reload();
}