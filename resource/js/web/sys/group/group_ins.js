
//그룹이름 중복체크 완료여부 표시
function groupNmOnchange(){
    $("#groupForm #groupNmCheckYn").val("N");
    $("#groupForm #groupNm").parent().removeClass("state-check");
}

//그룹이름 중복체크
function groupNmCheck(){

    let groupSno = $("#groupForm #groupSno").val();
    let groupNm = $("#groupForm #groupNm").val();

    if(isEmpty(groupNm)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.btn.duplicate.pop.group.null.txt.txt'));
        return false;
    } else {
        $.ajax({
            url:'/sys/group/api/groupNmCheck',
            type:'POST',
            data: {
                groupSno : groupSno,
                groupNm : groupNm
            },
            success:function(checkResult){
                if(checkResult) {
                    //그룹이름 중복
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(i18n('management.group.new.btn.duplicate.pop.group.txt.title'));
                    $("#e_content").html(i18n('management.group.new.btn.duplicate.pop.group.exist.txt.txt'));
                    $("#groupNmCheckYn").val("N");
                    $('#groupNm').parent().removeClass('state-check');
                } else {
                    //그룹이름 중복안함
                    $("#info-alert-modal").modal('show');
                    $("#i_title").html(i18n('management.group.new.btn.duplicate.pop.group.txt.title'));
                    $("#i_content").html(i18n('management.group.new.btn.duplicate.pop.group.not.exist.txt.txt'));
                    $("#groupNmCheckYn").val("Y");
                    $('#groupNm').parent().addClass('state-check');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

}

//인증절차 변경 가능여부 조회
function groupUserProcCdOnChange() {

    let groupSno = $("#groupForm #groupSno").val();
    let groupUserProcCd = $("#groupForm #groupUserProcCd").val();

    //인증절차 변경체크 API
    $.ajax({
        url : "/sys/group/api/groupProc/check",
        type : "POST",
        data: {groupSno: groupSno, groupUserProcCd: groupUserProcCd},
        cache: false,
        timeout: 300000,
        success : function(checkResult){
            if (checkResult) {
                //그 외 변경의 경우
                var groupUserProcCd = $("#groupUserProcCd").val();
                if (groupUserProcCd === "00206301" || groupUserProcCd === "00206302") {
                    //인증불필요, 관리자 직접승인 선택시 엑셀파일업로드필드 미표시
                    $("#groupEtcWrap").removeClass("hidden");
                    $("#groupUserFileWrap").addClass("hidden");
                } else if (groupUserProcCd === "00206303") {
                    //데이터매칭 선택시 추가입력정보필드 미표시
                    $("#groupEtcWrap").addClass("hidden");
                    $("#groupUserFileWrap").removeClass("hidden");
                }
            } else {
                //관리자 직접승인 인증절차에서 인증불필요, 데이터매칭으로 변경시 관리자 직접승인에 승인대기중인 상태가 있을 경우
                //기존 선택치인 관리자 직접승인 선택상태로 변경
                $("#groupForm #groupUserProcCd option[value='00206302']").prop("selected", true);
                //에러팝업표시
                $("#error-alert-modal").modal('show');
                $("#e_title").html(i18n('management.group.txt.group.proc.edit.title'));
                $("#e_content").html(i18n('management.group.txt.group.proc.edit.content'));
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

//데이터매칭 템플릿파일 다운로드
function downloadPatientFile() {
    //파일다운로드API
    $.fileDownload('/sys/group/api/getExcel/patient', {
        httpMethod: "POST",
        successCallback: function(){
            window.parent.postMessage({'from': 'standby','type': 'hide'}, '*');
        },
        failCallback: function(){
            window.parent.postMessage({'from': 'standby','type': 'hide'}, '*');
            console.log('엑셀 파일 생성에 실패 했습니다.');
        }
    });
}

//엑셀다운로드 비밀번호 설정Modal
$("#groupForm #groupUsersFake").on("click", function() {
    let groupSno = $("#groupForm #groupSno").val();
    $("#password-set-modal > .modal-dialog").empty().load("/sys/group/modal/pwSetPop", {groupSno : groupSno}, function () {
        $("#password-set-modal").modal("show");
    });
    return false;
});

//데이터매칭 파일 삭제
function groupUserFileRemove(){
    $("#groupUsers").val("");
    $("#groupUsers").change();
    $("#usersTemplete").removeClass('hidden');
    $("#usersUploaded").addClass('hidden');
}

//데이터매칭 파일 업로드시 표시
$(document).on('change', '#groupUsers', function() {
    var files = this.files;
    if (files.length > 0) {
        var filename = files[0].name;
        if (filename) {
            $("#groupUsers").parent().addClass("state-file");
            $('#groupUsersTxt').text(filename);
        } else {
            $("#groupUsers").parent().removeClass("state-file");
            $('#groupUsersTxt').text("");
        }
    } else {
        $("#groupUsers").parent().removeClass("state-file");
        $('#groupUsersTxt').text("");
    }
});

//실명수집 토글버튼
function collectUserNmYnSwitch(){
    var checkedFlag = $("#collectUserNmYnSwitcher").prop('checked');
    if (checkedFlag) {
        $("#collectUserNmYn").val("Y");
    } else {
        $("#collectUserNmYn").val("N");
    }
}

//부서선택시 입력필드 표시전환
function groupDeptYnOnChange() {
    var groupDeptYn = $("#groupDeptYn").val();
    if (groupDeptYn === "Y") {
        $("#groupDeptTextWrap").addClass("hidden");
        $("#groupDeptFileWrap").removeClass("hidden");
    } else {
        $("#groupDeptTextWrap").removeClass("hidden");
        $("#groupDeptFileWrap").addClass("hidden");
    }
}

//부서정보 템플릿파일 다운로드
function downloadDeptFile(groupSno) {
    //파일 다운로드API
    $.fileDownload('/sys/group/api/getExcel/dept', {
        httpMethod: "POST",
        data: {groupSno:groupSno},
        successCallback: function(){
            window.parent.postMessage({'from': 'standby','type': 'hide'}, '*');
        },
        failCallback: function(){
            window.parent.postMessage({'from': 'standby','type': 'hide'}, '*');
            console.log('엑셀 파일 생성에 실패 했습니다.');
        }
    });
}

//데이터매칭 파일 삭제
function groupDeptFileRemove(){
    $("#groupDept").val("");
    $("#groupDept").change();
    $("#deptTemplete").removeClass('hidden');
    $("#deptUploaded").addClass('hidden');
}


//데이터매칭 파일 업로드시 표시
$(document).on('change', '#groupUsers', function() {
    var files = this.files;
    if (files.length > 0) {
        checkUploadDatamatchingFile(function(isSuccess) {
            if (isSuccess) {
                var filename = files[0].name;
                if (filename) {
                    $("#groupUsers").parent().addClass("state-file");
                    $('#groupUsersTxt').text(filename);
                } else {
                    $("#groupUsers").parent().removeClass("state-file");
                    $('#groupUsersTxt').text("");
                }
            } else {
                $("#error-alert-modal").modal('show');
                $("#error-alert-modal #e_title").html(i18n('common.txt.required.file.title'));
                $("#error-alert-modal #e_content").html(i18n('management.group.txt.users.file.error.content'));
                $("#groupUsers").val("").change();

            }
        });
    } else {
        $("#groupUsers").parent().removeClass("state-file");
        $('#groupUsersTxt').text("");
    }
});



//소속부서 파일 업로드시 표시
$(document).on('change', '#groupDept', function() {
    var files = this.files;
    if (files.length > 0) {
        checkUploadFile(function(isSuccess) {
            if (isSuccess) {
                var filename = files[0].name;
                if (filename) {
                    $("#groupDept").parent().addClass("state-file");
                    $('#groupDeptTxt').text(filename);
                } else {
                    $("#groupDept").parent().removeClass("state-file");
                    $('#groupDeptTxt').text("");
                }
            } else {
                $("#error-alert-modal").modal('show');
                $("#error-alert-modal #e_title").html(i18n('common.txt.required.file.title'));
                $("#error-alert-modal #e_content").html(i18n('management.group.txt.dept.file.error.content'));
                $("#groupDept").val("").change();

            }
        });
    } else {
        $("#groupDept").parent().removeClass("state-file");
        $('#groupDeptTxt').text("");
    }
});

//데이터매칭 업로드 체크
function checkUploadDatamatchingFile(callback) {

    var formData = new FormData();
    formData.append("groupUsers", $('#groupUsers')[0].files[0]);

    //소속부서파일체크API
    $.ajax({
        url: "/sys/group/api/dataMatchingFile/check",
        type: "POST",
        enctype: 'multipart/form-data',
        data : formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            callback(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}



//소속부서파일 업로드 체크
function checkUploadFile(callback) {

    var formData = new FormData();
    formData.append("groupDept", $('#groupDept')[0].files[0]);

    //소속부서파일체크API
    $.ajax({
        url: "/sys/group/api/groupDept/check",
        type: "POST",
        enctype: 'multipart/form-data',
        data : formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            callback(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

//그룹연락처 중복체크 완료여부 표시
function groupTelNoOnchange(){
    $("#groupForm #groupTelNoCheckYn").val("N");
    $("#groupForm #groupTelNo").parent().removeClass("state-check");
}

//그룹연락처 중복확인
function groupTelNoCheck(){
    let groupCountryNo = $('#groupForm #groupCountryNo').val();
    let groupTelNo = $('#groupForm #groupTelNo').val();
    let groupSno = $('#groupForm #groupSno').val();

    if(isEmpty(groupTelNo)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.btn.duplicate.pop.group.tel.null.txt.txt'));
        return false;
    } else {
        //그룹연락처 중복확인 API
        $.ajax({
            url:'/sys/group/api/groupTelNoCheck',
            type:'POST',
            data: {
                'groupCountryNo' : groupCountryNo,
                'groupTelNo' : groupTelNo,
                'groupSno' : groupSno
            },
            success:function(data){
                if(data) {
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(i18n('management.group.new.btn.duplicate.pop.group.tel.txt.title'));
                    $("#e_content").html(i18n('management.group.new.btn.duplicate.pop.group.tel.exist.txt.txt'));
                    $("#groupTelNoCheckYn").val("N");
                    $('#groupTelNo').parent().removeClass('state-check')
                } else if(data == 0) {
                    $("#info-alert-modal").modal('show');
                    $("#i_title").html(i18n('management.group.new.btn.duplicate.pop.group.tel.txt.title'));
                    $("#i_content").html(i18n('management.group.new.btn.duplicate.pop.group.tel.not.exist.txt.txt'));
                    $("#groupTelNoCheckYn").val("Y");
                    $('#groupTelNo').parent().addClass('state-check')
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
}

//그룹대표이미지 미리보기 열기
function showSbl(){
    $("#custom-sbl").show();
}

//그룹대표이미지 미리보기 닫기
function closeSbl(){
    $("#custom-sbl").hide();
}

//그룹대표이미지 파일 삭제
function groupImageRemove(){
    $("#groupImage").val("");
    $("#groupImage").change();
}

//그룹대표이미지 파일업로드 표시
$(document).on('change', '#groupImage', function() {
    var placeholder = i18n('management.group.new.txt.image.placeholder');
    var files = this.files;
    if (files.length > 0) {
        var filename = files[0].name;
        if (filename) {
            $("#groupImage").parent().addClass("state-file");
            $('#groupImageTxt').text(filename);
            $("#groupImgFileUpdate").val("");
        } else {
            $("#groupImage").parent().removeClass("state-file");
            $('#groupImageTxt').text(placeholder);
            $("#groupImgFileUpdate").val("Y");
        }
    } else {
        $("#groupImage").parent().removeClass("state-file");
        $('#groupImageTxt').text(placeholder);
        $("#groupImgFileUpdate").val("Y");
    }
});

//화상상담 활성/비활성시 API Key/Secret Key 표시
$(document).on('change', '#telehealthMenuUseYn', function() {
    let useYn = this.value;
    if (useYn === 'Y'){
        $("#leftVonageApiKey").prop("readonly", false);
        $("#leftVonageSecretKey").prop("readonly", false);
        $("#leftTelehealthRecordingUseYn").prop("disabled", false);
        $("#rightVonageApiKey").prop("readonly", false);
        $("#rightVonageSecretKey").prop("readonly", false);
    } else {
        $("#leftVonageApiKey").prop("readonly", true);
        $("#leftVonageSecretKey").prop("readonly", true);
        $("#leftTelehealthRecordingUseYn").prop("disabled", true);
        $("#leftTelehealthRecordingUseYn").prop("checked", false);
        $("#rightVonageApiKey").prop("readonly", true);
        $("#rightVonageSecretKey").prop("readonly", true);
    }
});

//그룹 활성, 비활성 토글
function changeUseYnSwitch(){
    var checkedFlag = $("#groupForm #groupUseYnSwitch").prop('checked');
    if (checkedFlag) {
        $('#groupForm #useYnTxt').text(i18n('management.group.new.txt.status.active'));
        $("#groupForm #groupUseYn").val("Y");
        $("#groupForm #groupUseYnSwitch").prop('checked',true);
    } else {
        $('#groupForm #useYnTxt').text(i18n('management.group.new.txt.status.inactive'));
        $("#groupForm #groupUseYn").val("N");
        $("#groupForm #groupUseYnSwitch").prop('checked',false);
    }
}

//대표그룹관리자 이메일 중복체크 완료여부 표시
function mngEmailOnchange(){
    $("#groupForm #mngEmailCheckYn").val("N");
    $("#groupForm #managementId").parent().removeClass("state-check");
}

//대표그룹관리자 이메일 중복체크
function managementIdCheck(){
    let managementID = $("#groupForm #managementId").val();

    if(isEmpty(managementID)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.btn.duplicate.pop.email.null.txt.txt'));
        return false;
    } else {
        $.ajax({
            url:'/sys/webUser/api/webUserEmailCheck',
            type:'POST',
            data: {'managementEmail' : managementID,
                'managementSno' : $('#managementSno').val()
            },
            success:function(data){
                if(data > 0) {
                    //이메일 중복
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(i18n('management.group.new.btn.duplicate.pop.email.txt.title'));
                    $("#e_content").html(i18n('management.group.new.btn.duplicate.pop.email.exist.txt.txt'));

                    $("#groupForm #mngEmailCheckYn").val("N");
                    $('#managementId').parent().removeClass('state-check');
                } else if(data === 0) {
                    //이메일 중복안함
                    $("#info-alert-modal").modal('show');
                    $("#i_title").html(i18n('management.group.new.btn.duplicate.pop.email.txt.title'));
                    $("#i_content").html(i18n('management.group.new.btn.duplicate.pop.email.not.exist.txt.txt'));

                    $("#groupForm #mngEmailCheckYn").val("Y");
                    $('#managementId').parent().addClass('state-check');
                } else {
                    //이메일 입력 형식 오류
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(i18n('common.txt.check_incorrect_data_title'));
                    $("#e_content").html(i18n('webuser.error_valid_email'));
                    $("#groupForm #mngEmailCheckYn").val("N");
                    $('#managementId').parent().removeClass('state-check');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
}

//대표그룹관리자 존재 유무에 따른 대표그룹관리자 입력 가능유무를 결정
function disableManagementInput(flag) {
    $("#groupForm #managementLnm").attr('readonly', flag);
    $("#groupForm #managementFnm").attr('readonly', flag);
    $("#groupForm #managementId").attr('readonly', flag);
    $("#groupForm #groupManagementMale").attr('disabled', flag);
    $("#groupForm #groupManagementFemale").attr('disabled', flag);
    $("#groupForm #managementCountryNo").attr('disabled', flag);
    $("#groupForm #managementHpNo").attr('readonly', flag);
    $("#groupForm #mngEmailCheckBtn").attr('disabled', flag);
}

//취소버튼
function groupInsReset(){
    $("#cancel-confirm-modal").modal('show');
    $("#cancel-confirm-modal_confirm_btn").off('click');
    $("#cancel-confirm-modal_confirm_btn").on('click', function() {
        $("#cancel-confirm-modal").modal('hide');
        showGroupList();
    });
}

function saveGroupAjax(formData){
    if(document.querySelector('#telehealthStrTime').value !==''){
        let telehealthStrTime = parseInt(document.querySelector('#telehealthStrTime').value.split(':')[0])<10
            ? '0'+document.querySelector('#telehealthStrTime').value+':00'
            :document.querySelector('#telehealthStrTime').value+':00'
        formData.set('telehealthStrTime',telehealthStrTime)
    }
    if(document.querySelector('#telehealthEndTime').value !==''){
        let telehealthEndTime = parseInt(document.querySelector('#telehealthEndTime').value.split(':')[0])<10
            ? '0'+document.querySelector('#telehealthEndTime').value+':00'
            :document.querySelector('#telehealthEndTime').value+':00'
        formData.set('telehealthEndTime',telehealthEndTime)
    }
    formData.set('mddpExcelFileNm',mddpSaveExcelFileName)
    mddpSaveList.map((value,idx)=>{
        formData.append("groupMddpList["+idx+"].mddpCd",value.mddpCd)
        formData.append("groupMddpList["+idx+"].groupMddpNm",value.groupMddpNm)
    })
    // 화상상담 녹음/녹화 기능 사용 여부 값 입력
    formData.set("telehealthRecordingUseYn", $("input[name='telehealthRecordingUseYn']").val());

    $.ajax({
        url : "/sys/group/api/sys_group_det/mod",
        type : "POST",
        enctype: 'multipart/form-data',
        data : formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success : function(data){
            if(data.result == 'ok'){
                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(i18n('management.group.modify.pop.success.txt.title'));
                $("#success-alert-modal #content").html(i18n('management.group.modify.pop.success.txt.txt'));
                showGroupList();
            } else {
                if(data.result == 'Dept Insert Fail'){
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(i18n('management.group.new.txt.mod.fail.title'));
                    $("#e_content").html(i18n('management.group.new.txt.dept.fail.txt'));
                } else if(data.result == 'Users Insert Fail'){
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(i18n('management.group.new.txt.mod.fail.title'));
                    $("#e_content").html(i18n('management.group.new.txt.users.fail.txt'));
                } else {
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(i18n('management.group.new.txt.mod.fail.title'));
                    $("#e_content").html(i18n('management.group.new.txt.mod.fail.txt'));
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log('--------------fail------------------');
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

//그룹 등록수정
function groupIns(groupSno) {

    let groupNm = $("#groupForm #groupNm").val();
    let groupTelNo = $("#groupForm #groupTelNo").val();

    let groupNmCheckYn = $("#groupForm #groupNmCheckYn").val();
    let groupTelNoCheckYn = $("#groupForm #groupTelNoCheckYn").val();
    let mddpCheck = $('#mddpCheck').val();

    let groupUserProcCd = $("#groupForm #groupUserProcCd").val();
    let groupUsersTxt = $("#groupForm #groupUsersTxt").text();
    let mddpYn = $('#mddpSelect option:selected').val();
    let groupDeptYn = $("#groupForm #groupDeptYn").val();
    let groupDeptTxt = $("#groupForm #groupDeptTxt").text();
    console.log('groupDeptTxt');
    console.log(groupDeptTxt);

    let groupLatitude = $("#groupForm #groupLatitude").val();
    let groupLongitude = $("#groupForm #groupLongitude").val();

    let telehealthMenuUseYn = $("#groupForm #telehealthMenuUseYn").val();
    let initTelehealthMenuUseYn = $("#groupForm #initTelehealthMenuUseYn").val();
    let leftVonageApiKey = $("#groupForm #leftVonageApiKey").val();
    let leftVonageSecretKey = $("#groupForm #leftVonageSecretKey").val();
    let rightVonageApiKey = $("#groupForm #rightVonageApiKey").val();
    let rightVonageSecretKey = $("#groupForm #rightVonageSecretKey").val();
    let telehealthStrTime = $("#groupForm #telehealthStrTime").val();
    let telehealthEndTime = $("#groupForm #telehealthEndTime").val();
    let leftTelehealthRecordingUseYn = $("#groupForm #leftTelehealthRecordingUseYn").is(':checked');
    let telehealthRecordingUseYn = $("#groupForm #leftTelehealthRecordingUseYn");

    // 화상상담 녹음/녹화 기능 사용 여부
    if(leftTelehealthRecordingUseYn == true) telehealthRecordingUseYn.val("Y")
        else telehealthRecordingUseYn.val("N");


    let managementHpNo = $("#groupForm #managementHpNo").val();
    let managementId = $("#groupForm #managementId").val();
    let managementFnm = $("#groupForm #managementFnm").val();
    let managementLnm = $("#groupForm #managementLnm").val();
    let managementSexClcd = $("#groupForm :input:radio[name=sexClcdRadio]:checked").val();
    $("#groupManagementSexClcd").val(managementSexClcd);

    let mngEmailCheckYn = $("#groupForm #mngEmailCheckYn").val();

    var form = $('#groupForm')[0];
    var formData = new FormData(form);

    //입력치 체크
    $("#e_title").html(i18n('common.txt.register.fail.missing.input'));

    if(isEmpty(groupNm)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.null.group.name'));
        return false;
    } else if(groupNmCheckYn === "N") {
        $("#error-alert-modal").modal('show');
        $("#e_title").html(i18n('management.group.new.btn.duplicate.pop.group.txt.title'));
        $("#e_content").html(i18n('management.group.new.txt.check.pop.dup.group.name'));
        return false;
    } else if(groupUserProcCd === "00206303" && isEmpty(groupUsersTxt)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.null.users'));
        return false;
    } else if(mddpYn=='Y' && mddpCheck=='N') { // 진료과 등록하는데 설정한 진료과가 없다면
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.null.mddpNm.select'));
        return false;
    } else if(groupDeptYn === "Y" && isEmpty(groupDeptTxt)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.null.dept'));
        return false;
    } else if(isEmpty(groupTelNo)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.null.group.tel'));
        return false;
    } else if(groupTelNoCheckYn === "N"){
        $("#error-alert-modal").modal('show');
        $("#e_title").html(i18n('management.group.new.btn.duplicate.pop.group.tel.txt.title'));
        $("#e_content").html(i18n('management.group.new.txt.check.pop.dup.group.tel'));
        return false;
    } else if (groupLatitude != "" && (groupLatitude.charAt(0) == '.' || groupLatitude.charAt(groupLatitude.length-1) == '.')) {
        $("#error-alert-modal").modal('show');
        $("#e_title").html(i18n('management.group.new.txt.check.pop.title'));
        $("#e_content").html(i18n('management.group.new.txt.check.pop.latitude'));
        return false;
    } else if (groupLongitude != "" && (groupLongitude.charAt(0) == '.' || groupLongitude.charAt(groupLongitude.length-1) == '.')) {
        $("#error-alert-modal").modal('show');
        $("#e_title").html(i18n('management.group.new.txt.check.pop.title'));
        $("#e_content").html(i18n('management.group.new.txt.check.pop.longitude'));
        return false;
    } else if ((telehealthMenuUseYn == "Y" && initTelehealthMenuUseYn == "Y" && isEmpty(leftVonageApiKey))
        || (telehealthMenuUseYn == "Y" && initTelehealthMenuUseYn == "N" && isEmpty(rightVonageApiKey))) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.apikey'));
        return false;
    } else if (telehealthMenuUseYn == "Y" && initTelehealthMenuUseYn == "Y" && isEmpty(leftVonageSecretKey)
        || (telehealthMenuUseYn == "Y" && initTelehealthMenuUseYn == "N" && isEmpty(rightVonageSecretKey))) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.secretkey'));
        return false;
    }else if (telehealthMenuUseYn == "Y" && initTelehealthMenuUseYn == "Y" && isEmpty(telehealthStrTime)
        || (telehealthMenuUseYn == "Y" && initTelehealthMenuUseYn == "N" && isEmpty(telehealthStrTime))) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.warning_pop.telehealth.startTime'));
        return false;
    }else if (telehealthMenuUseYn == "Y" && initTelehealthMenuUseYn == "Y" && isEmpty(telehealthEndTime)
        || (telehealthMenuUseYn == "Y" && initTelehealthMenuUseYn == "N" && isEmpty(telehealthEndTime))) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.warning_pop.telehealth.endTime'));
        return false;
    } else if(isEmpty(managementFnm)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.null.rep.lnm'));
        return false;
    } else if(isEmpty(managementLnm)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.null.rep.fnm'));
        return false;
    } else if(isEmpty(managementId)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.null.rep.email'));
        return false;
    } else if(mngEmailCheckYn == "N") {
        $("#error-alert-modal").modal('show');
        $("#e_title").html(i18n('management.group.new.btn.duplicate.pop.email.txt.title'));
        $("#e_content").html(i18n('management.group.new.txt.check.pop.dup.rep.email'));
        return false;
    } else if(isEmpty(managementHpNo)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.group.new.txt.check.pop.null.rep.tel'));
        return false;
    } else if(!isEmpty(groupSno)) {
        //그룹수정 API

        let telehealthStrTime =null
        if(document.querySelector('#telehealthStrTime').value !==''){
            telehealthStrTime = parseInt(document.querySelector('#telehealthStrTime').value.split(':')[0])<10
                ? '0'+document.querySelector('#telehealthStrTime').value+':00'
                :document.querySelector('#telehealthStrTime').value+':00'
        }
        let telehealthEndTime=null
        if(document.querySelector('#telehealthEndTime').value !==''){
            telehealthEndTime = parseInt(document.querySelector('#telehealthEndTime').value.split(':')[0])<10
                ? '0'+document.querySelector('#telehealthEndTime').value+':00'
                :document.querySelector('#telehealthEndTime').value+':00'
        }
        if(document.querySelector('input[name="sysGroupTelehealthAuth.vonageApiKey"]:read-write')){
            $.ajax({
                url:'/sys/group/api/changeBookingList',
                type:'POST',
                contentType:'application/json',
                data:JSON.stringify({
                    groupSno:groupSno,
                    telehealthStrTime:telehealthStrTime,
                    telehealthEndTime:telehealthEndTime,
                }),
                success:(data)=>{
                    if(data.length === 0){
                        saveGroupAjax(formData)
                    }
                    else{
                        //예약변경필요건 리스트 초기화
                        $("#consultationManagementReservationListTableBody").empty();

                        const unit = i18n('management.group.warning_pop.telehealth.chagebooking.unit');
                        document.querySelector('#reservationChangesCount').innerText='';
                        document.querySelector('#reservationChangesCount').innerText=data.length+unit
                        data.map(value=>{
                            var mobileNum = value.requesterMobileNo;
                            var mobileNum1 = mobileNum.substr(0,3);
                            var mobileNum2 = mobileNum.substr(3,4);
                            var mobileNum3 = mobileNum.substr(7,4);
                            document.querySelector('#consultationManagementReservationListTableBody').insertAdjacentHTML('beforeend',`
                              <tr>
                                  <td>`+ value.bookingDateTime +`</td>
                                  <td>`+ value.requesterNm +`</td>
                                  <td>`+ mobileNum1 + '-' + mobileNum2 + '-' + mobileNum3 +`</td>
                              </tr>
                        `   )
                        })
                        document.querySelector('#reservationChangesModalOtherBtn').addEventListener('click',function () {
                            saveGroupAjax(formData);
                            $('#reservationChanges').modal('hide');
                            /**
                             * 이벤트가 중첩되는 현상이 있어서 이벤트를 Unbinding 해줘야함
                             * argument.callee : 현재 실행중인 함수를 참조할수 있는 Attribute
                             */
                            document.getElementById('reservationChangesModalOtherBtn').removeEventListener('click',arguments.callee);
                        })
                        $('#reservationChanges').modal('show');
                    }
                }
            })
        }
        else{
            saveGroupAjax(formData)
        }


    } else {
        //그룹등록 API
        if(document.querySelector('#telehealthStrTime').value !==''){
            let telehealthStrTime = parseInt(document.querySelector('#telehealthStrTime').value.split(':')[0])<10
                ? '0'+document.querySelector('#telehealthStrTime').value+':00'
                :document.querySelector('#telehealthStrTime').value+':00'
            formData.set('telehealthStrTime',telehealthStrTime)
        }
        if(document.querySelector('#telehealthEndTime').value !==''){
            let telehealthEndTime = parseInt(document.querySelector('#telehealthEndTime').value.split(':')[0])<10
                ? '0'+document.querySelector('#telehealthEndTime').value+':00'
                :document.querySelector('#telehealthEndTime').value+':00'
            formData.set('telehealthEndTime',telehealthEndTime)
        }
        formData.set('mddpExcelFileNm',mddpSaveExcelFileName)
        mddpSaveList.map((value,idx)=>{
            formData.append("groupMddpList["+idx+"].mddpCd",value.mddpCd)
            formData.append("groupMddpList["+idx+"].groupMddpNm",value.groupMddpNm)
        })
        $.ajax({
            url: "/sys/group/api/sys_group_det/reg",
            type: "POST",
            enctype: 'multipart/form-data',
            data : formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success: function (data) {
                if(data.result == 'ok'){
                    $("#success-alert-modal").modal('show');
                    $("#success-alert-modal #title").html(i18n('management.group.new.pop.success.txt.title'));
                    $("#success-alert-modal #content").html(i18n('management.group.new.pop.success.txt.txt'));
                    showGroupList();
                } else {
                    if(data.result == 'Dept Insert Fail'){
                        $("#error-alert-modal").modal('show');
                        $("#e_title").html(i18n('management.group.new.txt.reg.fail.title'));
                        $("#e_content").html(i18n('management.group.new.txt.dept.fail.txt'));
                    } else if(data.result == 'Users Insert Fail'){
                        $("#error-alert-modal").modal('show');
                        $("#e_title").html(i18n('management.group.new.txt.reg.fail.title'));
                        $("#e_content").html(i18n('management.group.new.txt.users.fail.txt'));
                    } else {
                        $("#error-alert-modal").modal('show');
                        $("#e_title").html(i18n('management.group.new.txt.reg.fail.title'));
                        $("#e_content").html(i18n('management.group.new.txt.reg.fail.txt'));
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

}




