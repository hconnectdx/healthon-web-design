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
    //viewType
    // RAI : 이전화면 예약내용확인Modal
    // RAD : 이전화면 사용자로그 > 화상상담 탭 (진료)

    $("#telehealthAcceptConfirmModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleAcceptConfirm", {telehealthSno: telehealthSno, viewType:viewType}, function() {
        $(".modal").modal("hide");
        $("#telehealthAcceptConfirmModal").modal("show");
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
function scheduleReservationInfoModal(telehealthSno){
    $("#telehealthReservationInfoModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleReservationInfo", {telehealthSno: telehealthSno}, function() {
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
function scheduleAttendessListModal(telehealthSno){
    $("#telehealthAttendeesListModal > .modal-dialog").load("/user/user/log/vcs/modal/scheduleAttendessList", {telehealthSno: telehealthSno}, function() {
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

//화상상담 접속
function connectTelehealth(telehealthSno, sessionTargetSno) {
    $.ajax({
        url: "/cs/vcs/api/connectCheck",
        type: "POST",
        data: {telehealthSno: telehealthSno},
        success: function (data) {

            if (data) {
                if (data === 1) {
                    window.open('/cs/vcs/connectAdmin?telehealthSno=' + telehealthSno);
                } else if (data === -1){
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(connectCheckTitleTxt);
                    $("#e_content").html("종료된 화상상담입니다.");
                    return false;
                } else if (data === -2) {
                    window.open('/cs/vcs/connectAdmin?telehealthSno=' + telehealthSno);
                    // $("#error-alert-modal").modal('show');
                    // $("#e_title").html(connectCheckTitleTxt);
                    // $("#e_content").html(connectCheckSurvey1Txt+"<br/>"+connectCheckSurvey2Txt);
                    // return false;
                } else if (data === -3) {
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(connectCheckTitleTxt);
                    $("#e_content").html(connectCheckTimeTxt);
                    return false;
                } else if (data === -4){
                    $("#error-alert-modal").modal('show');
                    $("#e_title").html(connectCheckTitleTxt);
                    $("#e_content").html("지정된 상담자만 입장 가능합니다.\n" +
                        "담당자에게 문의하세요.");
                    return false;
                }
            }

        }

    });
}

