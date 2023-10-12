//사용자상세로그 화상상담 탭 테이블 새로고침
function refreshTelehealthDataTable() {
    $("#telehealth-datatable").DataTable().ajax.reload();
}

//화상상담 메뉴 새로고침
function refreshTelehealthTabs() {
    //달력 초기화
    window.jQuery.CalendarApp.init();
    //선택한 날 예약일정 초기화
    var currentSelectedDate = $('#currentSelectedDate').val();
    getDayTelehealthList(currentSelectedDate);
    //화상상담 이력 테이블 새로고침
    telehealthHistoryTable.ajax.reload();
}

//신규예약생성Modal(진료)
function scheduleCreateDiagnosisModal(userServiceUseSno){
    $("#telehealthCreateDiagnosisModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleCreateDiagnosis", {userServiceUseSno: userServiceUseSno}, function() {
        $("#telehealthCreateDiagnosisModal").modal("show");
    });
}



function detailUser(sno){

 let newWindow =   window.open('/user/user/log?userServiceUseSno=' + sno);
    newWindow.onload = function (){
     let $headerTitle = $(newWindow.document).find("#header-page-title");
     $headerTitle.text(i18n('menu.txt.mgt.user.details'));
 }

}

//설문선택수정Modal(대상자)
function scheduleSubjectSurveySelectModal(telehealthSno, viewType) {
    //viewType
    // RCDG : 이전화면 예약생성(진료), 다음화면 보호자설문선택
    // RCDS : 이전화면 예약생성(진료), 다음화면 없음 <-기존 RCC
    // RCAG : 이전화면 예약확정(App요청), 다음화면 보호자설문선택
    // RCAS : 이전화면 예약확정(App요청), 다음화면 없음 <-기존 RAC
    // RCFS : 이전화면 예약생성(피트니스), 다음화면 없음
    // RUG : 설문수정, 다음화면 보호자설문선택
    // RUS : 설문수정, 다음화면 없음

    $("#telehealthSubjectSurveySelectModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleSubjectSurveySelect", {telehealthSno: telehealthSno, viewType: viewType}, function() {
        $(".modal").modal("hide");
        $("#telehealthSubjectSurveySelectModal").modal("show");
    });
}

//설문선택수정Modal(보호자)
function scheduleGuardianSurveySelectModal(telehealthSno, viewType) {
    //viewType
    // RCD : 이전화면 예약생성(진료)
    // RCA : 이전화면 예약확정(App요청)

    $("#telehealthGuardianSurveySelectModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleGuardianSurveySelect", {telehealthSno: telehealthSno, viewType: viewType}, function() {
        $(".modal").modal("hide");
        $("#telehealthGuardianSurveySelectModal").modal("show");
    });
}

//예약확정완료Modal
function scheduleCreateCheckModal(telehealthSno, viewType){
    //viewType
    // RCD : 이전화면 예약생성(진료)
    // RCA : 이전화면 예약확정(App요청)
    // RCF : 이전화면 예약생성(피트니스)

    $("#telehealthCreateCheckModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleCreateCheck", {telehealthSno: telehealthSno, viewType: viewType}, function() {
        $(".modal").modal("hide");
        $("#telehealthCreateCheckModal").modal("show");
    });
}

//예약확정Modal
function scheduleAcceptConfirmModal(telehealthSno, viewType) {
    //대상자 동의서 제출 여부 체크 API
    $.ajax({
        url: "/user/user/log/vcs/api/subjectAgreementCompleteCheck",
        type: "POST",
        data: {telehealthSno: telehealthSno},
        success: function (data) {
            if (data === 0) {
                //대상자 동의서 제출 미완료
                $("#error-alert-modal").modal('show');
                $("#e_title").html(i18n('common.txt.required.file.title'));
                $("#e_content").html(i18n('telehealth.txt.agreement.subject.submit.check'));
            } else {
                //대상자 동의서 제출 완료
                //viewType
                // RAI : 이전화면 예약내용확인Modal
                // RAD : 이전화면 사용자로그 > 화상상담 탭 (진료)

                $("#telehealthAcceptConfirmModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleAcceptConfirm", {telehealthSno: telehealthSno, viewType:viewType}, function() {
                    $(".modal").modal("hide");
                    $("#telehealthAcceptConfirmModal").modal("show");
                });

            }
        }
    });

}

//요청반려Modal
function scheduleRejectConfirmModal (telehealthSno, viewType){
    //viewType
    // RRI : 이전화면 예약내용확인Modal
    // RRD : 이전화면 사용자로그 > 화상상담 탭 (진료)

    $("#telehealthRejectConfirmModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleRejectConfirm", {telehealthSno: telehealthSno, viewType:viewType}, function() {
        $(".modal").modal("hide");
        $("#telehealthRejectConfirmModal").modal("show");
    });
}

//반려확정Modal
function scheduleRejectCheck(telehealthSno) {
    $("#telehealthRejectCheckModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleRejectCheck", {telehealthSno: telehealthSno}, function() {
        $("#telehealthRejectConfirmModal").modal("hide");
        $("#telehealthRejectCheckModal").modal("show");
    });
}

//예약취소Modal
function scheduleCancelConfirmModal (telehealthSno, viewType){
    //viewType
    // RCCI : 이전화면 예약내용확인Modal
    // RCCD : 이전화면 사용자로그 > 화상상담 탭 (진료)
    // RCCF : 이전화면 화상상담 > 일정 탭 (피트니스)

    $("#telehealthCancelConfirmModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleCancelConfirm", {telehealthSno:telehealthSno, viewType:viewType}, function() {
        $(".modal").modal('hide');
        $("#telehealthCancelConfirmModal").modal("show");
    });
}

//예약내용확인Modal
function scheduleReservationInfoModal(telehealthSno, groupSno){
    $("#telehealthReservationInfoModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleReservationInfo", {telehealthSno: telehealthSno, groupSno:groupSno}, function() {
        $("#telehealthReservationInfoModal").modal("show");
    });
}

//예약변경Modal
function scheduleModifyConfirmModal(telehealthSno, viewType){
    //viewType
    // RMID : 예약생성(진료) 이전화면 예약내용확인Modal
    // RMIA : 예약확정(App요청) 이전화면 예약내용확인Modal
    // RMIF : 예약생성(피트니스) 이전화면 예약내용확인Modal
    // RMND : 예약생성(진료) 이전화면 예약변경필요Modal
    // RMNA : 예약확정(App요청) 이전화면 예약변경필요Modal
    // RMNF : 예약생성(피트니스) 이전화면 예약변경필요Modal

    $("#telehealthModifyConfirmModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleModifyConfirm", {telehealthSno:telehealthSno, viewType:viewType}, function() {
        $(".modal").modal('hide');
        $("#telehealthModifyConfirmModal").modal("show");
    });
}

//참석자조회Modal
function scheduleAttendessListModal(telehealthSno, groupSno, viewType){
    //viewType
    // RALH : 이전화면 화상상담 > 이력 탭
    // RALF : 이전화면 화상상담 > 일정 탭 (피트니스)
    // RALD : 이전화면 사용자로그 > 화상상담 탭 (진료)
    // RALR : 이전화면 예약내용확인Modal

    $("#telehealthAttendeesListModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleAttendessList", {telehealthSno: telehealthSno, groupSno:groupSno, viewType:viewType}, function() {
        $("#telehealthReservationInfoModal").modal('hide');
        $("#telehealthAttendeesListModal").modal("show");
    });
}

//화상상담결과 메뉴로 이동
function moveFeedback(targetMethod, targetServiceType, targetServiceSno) {
    //targetMethod
    //V : 피드백 조회
    //W : 피드백 작성
    //targetServiceType
    //T : 화상상담
    //targetServiceSno
    //화상상담일련번호

    let data = {
        'targetMethod': targetMethod
        , 'targetServiceType': targetServiceType
        , 'targetServiceSno': targetServiceSno
    };
    callMenu('/cs/vcsRs', i18n('counselling.txt.doc.menu_name'), data);
}

//신규예약생성Modal(피트니스) - Step.1 대상자 선택Modal
function scheduleCreateFitnessModal(){
    //피트니스 예약생성 Step.1 대상자선택Modal 이동
    $("#fitnessSubjectSelectModal > .modal-dialog").load("/cs/vcs/modal/fitnessSubjectSelect", {}, function() {
        $("#fitnessSubjectSelectModal").modal("show");
    });
}

// 화상상담 접속
function connectTelehealth(telehealthSno) {

    // 화상상담 접속 가능여부 체크 API
    $.ajax({
        url: "/cs/vcs/api/connectCheck",
        type: "POST",
        data: {telehealthSno: telehealthSno},
        success: function (data) {

            if (data) {
                if (data === 1) {
                    localStorage.setItem(telehealthSno, 'active');
                    // 화상상담 진행 중에는 세션 유지하기 - 아래 이벤트로 25분마다 백앤드 호출하여 세션유지
                    document.addEventListener("visibilitychange", ()=> visibilityChangeEventHandler(telehealthSno));
                    window.open('/cs/vcs/connectAdmin?telehealthSno=' + telehealthSno);
                } else if (data === -1){
                    // 지정 상담자 아님
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(connectCheckTitleTxt);
                    $("#e_content").html(connectCheckMemberTxt);
                    return false;
                } else if (data === -2) {
                    // 상담시작시간 10분전이 아님
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(connectCheckTitleTxt);
                    $("#e_content").html(connectCheckTimeTxt);
                    return false;
                } else if (data === -3){
                    // 이미 반려된 상담
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(connectCheckTitleTxt);
                    $("#e_content").html(connectCheckWebRejectTxt);
                    return false;
                } else if (data === -4){
                    // 이미 Web에서 취소된 상담
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(connectCheckTitleTxt);
                    $("#e_content").html(connectCheckWebCancelTxt);
                    return false;
                } else if (data === -5){
                    // 이미 App에서 취소된 상담
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(connectCheckTitleTxt);
                    $("#e_content").html(connectCheckAppCancelTxt);
                    return false;
                } else if (data === -6){
                    // 이미 거절된 상담
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(connectCheckTitleTxt);
                    $("#e_content").html(connectCheckAppRejectTxt);
                    return false;
                } else if (data === -7) {
                    // 이미 종료된 상담
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(connectCheckTitleTxt);
                    $("#e_content").html(connectCheckEndTxt);
                    return false;
                }
            }

        }

    });
}

/**
 * 화상상담 진행 중에 세션 timeout 방지
 */
function extendSessionTimeout(telehealthSno) {
    console.log('telehealth sno = ', telehealthSno);
    $.ajax({
        url: '/cs/vcs/extend-session',
        type: 'GET',
        timeout: 300000,
        success : (data) => {
            let hasTelehealthEnded = localStorage.getItem(telehealthSno) === null; // 화상상담 종료 상태
            if(hasTelehealthEnded) {
                clearTimeout(sessionExtensionInterval);
                document.removeEventListener('visibilitychange', ()=> visibilityChangeEventHandler(telehealthSno));
                return;
            }
            visibilityChangeEventHandler(telehealthSno); // setTimeout 재호출
        },
        error : (XMLHttpRequest, textStatus, errorThrown) => {
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }

    });
}

let sessionExtensionInterval; // 세션연장 인터벌 변수 (인터벌 ID)
function visibilityChangeEventHandler(telehealthSno) {
    // localStorage 에 화상상담일련번호로 아이템이 없으면 세션유지 않한다.
    if(!localStorage.getItem(telehealthSno)) return;
    let timeoutValue = 25 * 1000 * 60; // 25분 간격
    if(document.visibilityState === 'hidden'){
        sessionExtensionInterval = setTimeout(extendSessionTimeout, timeoutValue, telehealthSno);
    }
}


// 녹음/녹화 파일 모달 조회
function showRecordingFileModal(telehealthSno, managementSno) {
    $("#recording-file-modal > .modal-dialog").empty();
    $("#recording-file-modal > .modal-dialog").load("/cs/vcsRs/modal/recordingFileModal", {serviceSno: telehealthSno, managementSno: managementSno}, function() {
        $("#recording-file-modal").modal("show");
    });
}