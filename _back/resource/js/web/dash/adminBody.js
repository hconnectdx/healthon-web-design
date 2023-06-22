$(function() {
    $('#counselDate').datepicker({
        // endDate: '0m'
    }).datepicker("setDate", "now");
    $('#monitorDate').datepicker({
        // endDate: '0m'
    }).datepicker("setDate", "now");


    setInsDtTotAct();

    getRegMonthList();
    getRegDayList();
    getMauList();
    getDauList();
    getActiveYearList();
    getUserAgeList();
    getCounsel();
    getMonitor();
    getQnaList('TD');
});

function ageSexChange(){
    let type = $("#selectAgeSex").val();

    $("#chartAgeSex").empty();

    if(type === "1"){
        getUserSexList();
    }else{
        getUserAgeList();
    }
}

function setInsDtTotAct(){
    var dt = new Date();
    var com_year = dt.getFullYear();

    var sYear = i18n('common.txt.date4');

    for(var y = 2020; y <= com_year; y++){

        var rYear = sYear.replace('{0}', y);

        if(y === com_year){
            $("#insDtTotAct").append("<option value='"+ y +"' selected>"+ rYear +"</option>");
        }else{
            $("#insDtTotAct").append("<option value='"+ y +"'>"+ rYear + "</option>");
        }
    }
}

// 누적가입자(월간)
function getRegMonthList() {
    $.ajax({
        url : "/dash/api/get_regMonthList",
        type : "POST",
        success : function(data){
            chartRegMonth(data.regMonthList);
            $("#totalUserCount").text(data.totalUserCount);
            $("#perTotalUser").text(data.percentage);
            if(data.percentage < 0){
                $("#arrowTotalUser").attr('class','mdi mdi-arrow-down-bold');
                $("#colorTotalUser").attr('class','text-danger mr-1');
            }
            if(data.percentage == 0){
                $("#arrowTotalUser").attr('class','');
                $("#colorTotalUser").attr('class','text-nowrap');
            }
            if(data.percentage > 0){
                $("#arrowTotalUser").attr('class','mdi mdi-arrow-up-bold');
                $("#colorTotalUser").attr('class','text-success mr-1');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// 신규가입자(일간)
function getRegDayList() {
    $.ajax({
        url : "/dash/api/get_regDayList",
        type : "POST",
        success : function(data){
            chartRegDay(data.regDayList);
            $("#todayRegCount").text(data.todayCount);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// MAU
function getMauList() {
    $.ajax({
        url : "/dash/api/get_mauList",
        type : "POST",
        success : function(data){
            chartMau(data.mauList);

            $("#mauLastCount").text(data.lastCount);
            $("#perMau").text(data.percentage);

            if(data.percentage < 0){
                $("#arrowMou").attr('class','mdi mdi-arrow-down-bold');
                $("#colorMau").attr('class','text-danger mr-1');
            }
            if(data.percentage == 0){
                $("#arrowMou").attr('class','');
                $("#colorMau").attr('class','text-nowrap');
            }
            if(data.percentage > 0){
                $("#arrowMou").attr('class','mdi mdi-arrow-up-bold');
                $("#colorMau").attr('class','text-success mr-1');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// DAU
function getDauList() {
    $.ajax({
        url : "/dash/api/get_dauList",
        type : "POST",
        success : function(data){
            chartDau(data.dauList);

            $("#dauLastCount").text(data.lastCount);
            $("#perDau").text(data.percentage);

            if(data.percentage < 0){
                $("#arrowDau").attr('class','mdi mdi-arrow-down-bold');
                $("#colorDau").attr('class','text-danger mr-1');
            }
            if(data.percentage == 0){
                $("#arrowDau").attr('class','');
                $("#colorDau").attr('class','text-nowrap');
            }
            if(data.percentage > 0){
                $("#arrowDau").attr('class','mdi mdi-arrow-up-bold');
                $("#colorDau").attr('class','text-success mr-1');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// 누적/활성사용자
function getActiveYearList() {
    let totActType = $('#totActType').val();
    let url = "/dash/api/get_totYearList";

    if(totActType == "1"){
        url = "/dash/api/get_activeYearList";
    }

    $.ajax({
        url : url,
        type : "POST",
        data :
            {
                "groupSno" : $('#groupTotAct').val(),
                "insDtTotAct": $('#insDtTotAct').val()
            },
        success : function(data){
            chartActiveYear(data.activeYearList);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// 사용자분포(연령별)
function getUserAgeList() {

    $.ajax({
        url : "/dash/api/get_userAgeList",
        type : "POST",
        data :
            {
                "groupSno" : $('#groupUser').val()
            },
        success : function(data){
            chartUserAgeSex(data.userAgeList,"age");
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// 사용자분포(성별)
function getUserSexList() {
    $.ajax({
        url : "/dash/api/get_userSexList",
        type : "POST",
        data :
            {
                "groupSno" :$('#groupUser').val()
            },
        success : function(data){
            chartUserAgeSex(data.userSexList,"sex");
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// 상담
function getCounsel() {
    var reqDt = $("#counselDate").datepicker('getDate');
    var insDtCounsel =  reqDt != null ? reqDt.format('yyyy-MM') : null;

    $.ajax({
        url : "/dash/api/get_counsel",
        type : "POST",
        data :
            {
                "groupSno" :$('#groupCounsel').val(),
                "insDtCounsel": insDtCounsel
            },
        success : function(data){
            // 상담 표현 여부 확인
            if (data.counsel.counselDisplayYn === 'Y') {
                $('#divCounselNodata').addClass('hidden');
                $('#divCounselTable').removeClass('hidden');

                // 건강상담
                if (data.counsel.counselMenuUseYn === 'Y') {
                    let chatCount = data.counsel.counselCount;
                    let chatPer = 0;

                    if (chatCount != null) {
                        chatPer = chatCount / 100 * 100;
                    }

                    $('#trChat').removeClass('hidden');
                    $('#chatCount').text(chatCount);
                    $('#chatProgress').attr('aria-valuenow', chatPer).css('width', chatPer + '%');
                } else {
                    $('#trChat').addClass('hidden');
                }
                // 의료상담
                if (data.counsel.counselQnaMenuUseYn === 'Y') {
                    let medicalCount = data.counsel.medicalCount;
                    let medicalPer = 0;

                    if (medicalCount) {
                        medicalPer = medicalCount / 100 * 100;
                    }

                    $('#trMedical').removeClass('hidden');
                    $('#medicalCount').text(medicalCount);
                    $('#medicalProgress').attr('aria-valuenow', medicalPer).css('width', medicalPer + '%');
                } else {
                    $('#trMedical').addClass('hidden');
                }
                // 화상상담
                if (data.counsel.telehealthMenuUseYn === 'Y') {

                    let videoCount = data.counsel.telehealthCount;
                    let videoPer = 0;

                    if (videoCount) {
                        videoPer = videoCount / 100 * 100;
                    }

                    $('#trVideo').removeClass('hidden');
                    $('#videoCount').text(videoCount);
                    $('#videoProgress').attr('aria-valuenow', videoPer).css('width', videoPer + '%');
                } else {
                    $('#trVideo').addClass('hidden');
                }
            } else {
                // 상담 미사용 시 조회데이터 없음 표현
                $('#divCounselNodata').removeClass('hidden');
                $('#divCounselTable').addClass('hidden');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// 모니터링
function getMonitor() {
    var reqDt = $("#monitorDate").datepicker('getDate');
    var insDtMonitor =  reqDt != null ? reqDt.format('yyyy-MM') : null;
    $.ajax({
        url : "/dash/api/get_monitor",
        type : "POST",
        data :
            {
                "groupSno" :$('#groupMonitor').val(),
                "insDtMonitor": insDtMonitor
            },
        success : function(data){
            let sugarCount = data.monitor.sugarCount;
            let pressureCount = data.monitor.pressureCount;
            let sugarPer = 0;
            let pressurePer = 0;

            if(sugarCount != null){
                sugarPer = sugarCount / 100 * 100;
            }
            if(videoCount){
                pressurePer = pressureCount / 100 * 100;
            }

            $('#sugarCount').text(sugarCount);
            $('#sugarProgress').attr('aria-valuenow', sugarPer).css('width', sugarPer+'%');

            $('#pressureCount').text(pressureCount);
            $('#pressureProgress').attr('aria-valuenow', pressurePer).css('width', pressurePer+'%');
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// 서비스문의
function getQnaList(searchDay) {
    // EN_#36 어제, 오늘 조회 기능 제외처리
    //   UI 기능 제거, DashMapper.xml 관련 조회조건 주석처리
    $.ajax({
        url : "/dash/api/get_qnaList",
        type : "POST",
        data :
            {
                "searchDay" :searchDay
            },
        success : function(data){
            $("#qnaBody").empty();

            if(data == null || data.qnaList.length === 0){
                var emptyMsb = i18n('dashboard.no.qna');
                var tBody = '<tr class="odd"><td valign="top" colspan="3" class=""><div class="dash-empty-data"><p>' + emptyMsb + '</p></div></td></tr>';
                $("#qnaBody").append(tBody);
                return;
            }

            $.each(data.qnaList, function(i, m){
                let userProfileImgUrl;
                if(m.userProfileImgUrl != null && m.userProfileImgUrl !== ''){
                    userProfileImgUrl = m.userProfileImgUrl;
                }else{
                    userProfileImgUrl = '/resources/images/users/avatar-1.jpg';
                }

                var tBody = '<tr onclick="showAnswerEditDlg(\'edit\',\''+ m.qnaSno +'\')" style="cursor: pointer;">' + '<td><div class="media">'+
                    '<img class="mr-2 rounded-circle" src="'+ userProfileImgUrl +'" width="40" alt="">'+
                    '<div class="media-body">'+
                    '<h5 class="mt-0 mb-1">'+ m.userNick +'<small class="font-weight-normal ml-3">'+ m.qnaInsDt +'</small></h5>'+
                    '<span class="font-14 ellipse-line-1">'+ m.qnaQstCtnt +'</span>'+
                    '</div></div></td></tr>';

                $("#qnaBody").append(tBody);
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// 답변 편집 모달
function showAnswerEditDlg(flag, data) {
    // 팝업 호출
    let url = "/sys/qna/modal/sys_service_edit";
    if (flag === "edit") {
        url = url + "?qnaSno=" + data;
    }
    $("#answer-edit-modal > .modal-dialog").load(url, function () {
        $("#answer-edit-modal")
            .modal("show")
            .off("hidden.bs.modal")
            .on("hidden.bs.modal", function (e) {
                getQnaList();
            });
    });
}

// 상담 바로가기
function moveQna() {
    callMenu('/sys/qna', i18n('menu.txt.mgt.system.qna'), null);
}