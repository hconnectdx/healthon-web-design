//검사항목 등록Modal
function system_register(flag, data){
    // 팝업 호출
    //let url = "/sys/checkup/modal/sys_checkitem_det";
    let url = "/sys/measurementStd/modal/sys_measurementStd_det";
    if(flag == "update") {
        url = url + "?measureSno=" + data;
    }
    $("#measurementStd-modal > .modal-dialog").load(url, function() {
        $("#measurementStd-modal").modal("show");
    });

}
function system_baseRegister(flag, data){
    // 팝업 호출
    let url = "/sys/measurementStd/modal/sys_measure_base_det";
    if(flag == "update") {
        url = url + "?measureSno=" + data;
    }
    $("#measurementStd-base-modal> .modal-dialog").load(url, function() {
        $("#measurementStd-base-modal").modal("show");
    });

}
//검사항목 조회 새로고침
function refreshCheckItemTable() {
    $('#checkitem-datatable').DataTable().ajax.reload();
}

//+버튼
function plusIconClick(){
    $(".dripicons-plus").hide();
    $(".inputResult").show();
}

//-버튼
function minusIconClick(){
    $(".dripicons-plus").show();
    $("#checkupItemValue2").val(null);
    $(".inputResult").hide();
}