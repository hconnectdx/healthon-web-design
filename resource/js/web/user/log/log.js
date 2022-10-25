Dropzone.autoDiscover = false;

$(document).ready(function () {
    // log
    initBgTypeCard();
    initHeightCard();
    initWeightCard();
    initBtCard();
    initWcCard();
    initBpCard();
    initBgCard();
    initMealCard();
    initStepCard();
    initInsulinCard();
    initMedCard();
    initExerciseCard();
    initSleepCard();
    initDiaryCard();
    initJumpCard();
});

// 혈당 타입 카드
function initBgTypeCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#bgTypeCard').load('/user/user/log/bgType/body', {'userServiceUseSno': userServiceUseSno});
}

// 키 카드
function initHeightCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#heightCard').load('/user/user/log/height/body', {'userServiceUseSno': userServiceUseSno});
}

// 몸무게 카드
function initWeightCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#weightCard').load('/user/user/log/weight/body', {'userServiceUseSno': userServiceUseSno});
}

//체온 카드
function initBtCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#btCard').load('/user/user/log/bt/body', {'userServiceUseSno': userServiceUseSno});
}

// 허리둘레 카드
function initWcCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#wcCard').load('/user/user/log/wc/body', {'userServiceUseSno': userServiceUseSno});
}

// 혈압 카드
function initBpCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#bpCard').load('/user/user/log/bp/body', {'userServiceUseSno': userServiceUseSno});
}

// 혈당 카드
function initBgCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#bgCard').load('/user/user/log/bg/body', {'userServiceUseSno': userServiceUseSno});
}

// 식사 카드
function initMealCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#mealCard').load('/user/user/log/meal/body', {'userServiceUseSno': userServiceUseSno});
}

// 걷기 카드
function initStepCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#stepCard').load('/user/user/log/step/body', {'userServiceUseSno': userServiceUseSno});
}

// 인슐린 카드
function initInsulinCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#insulinCard').load('/user/user/log/insulin/body', {'userServiceUseSno': userServiceUseSno});
}

// 복약 카드
function initMedCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#medCard').load('/user/user/log/med/body', {'userServiceUseSno': userServiceUseSno});
}

// 운동 동영상 카드
function initExerciseCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#exerciseCard').load('/user/user/log/exercise/body', {'userServiceUseSno': userServiceUseSno});
}

// 수면 카드
function initSleepCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#sleepCard').load('/user/user/log/sleep/body', {'userServiceUseSno': userServiceUseSno});
}

// 식사 다이어리 카드
function initDiaryCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#diaryCard').load('/user/user/log/diary/body', {'userServiceUseSno': userServiceUseSno});
}

// 줄넘기 카드
function initJumpCard() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#jumpCard').load('/user/user/log/jump/body', {'userServiceUseSno': userServiceUseSno});
}

// 검사결과 탭
function initCheckupTab() {
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $(window).off('scroll');
    $('#check_result').empty().load('/user/user/log/checkup/body', {'userServiceUseSno': userServiceUseSno}, function() {
        pCheckResultSearch();
    });
}

// 통합로그조회 탭
function initTotalTab(){
    let userServiceUseSno = $('#userLogForm #userServiceUseSno').val();
    $('#total_log').empty().load('/user/user/log/total/body', {'userServiceUseSno': userServiceUseSno});
    scrollPaging();
}

function selectTag(tag){
    var arr = ['user_log','total_log','check_result','question','consult','telehealth'];
    var index = -1;
    for(var i=0; i< arr.length; i++){
        if(tag == arr[i]){
            index = i;
        }
    }

    if(index != -1){
        $("#user_detail_tag .nav-link").removeClass("active");
        $("#user_detail_tag_content .tab-pane").removeClass("active");

        $("#user_detail_tag .nav-link").each(function(){
            if($(this).attr("href") == "#"+tag){
                $(this).addClass("active");
                $("#user_detail_tag_content #"+tag).addClass("active");
            }
        });
    }

    scrollPaging();
}


function generateDayWiseTimeSeries(e, t, a) {
    for (var o = 0, r = []; o < t;) {
        var s = moment(e).format('YYYY-MM-DD');
        var n = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
        r.push([s, n]), e += 864e5, o++
    }
    // console.log(r);
    return r
}



function checkWrapperInit() {
    let aboveStr = i18n('common.txt.high');
    let normalStr = i18n('users.detail.checkup.result.txt.status.normal');
    let belowStr = i18n('common.txt.low');

    var userServiceUseSno = $("#userServiceUseSno").val();

    $("#unCompleteCount").val("");
    $("#unCompleteCount").attr("style", "visibility:hidden");

    $("#completeUserServiceUseSno").val(userServiceUseSno);
    $("#completeGroupCheckupHistSno").val("");
    $("#checkupInputDd").val("");
    $("#checkitem-datatable_length").children().eq(3).text("등록 일자: ");

    $("#check-result-table").DataTable({
        scrollX: true,
        searching: false,
        lengthChange: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: i18n('common.datatable_info'),
            emptyTable : i18n('common.datatable_empty')
        },
        pageLength: 10,
        columns: [
            {data: "checkupItemNm", orderable: 1}
            , {data: "groupCheckupValue", orderable: 1}
            , {data: "groupCheckupStsClcd", orderable: 1}
            , {data: "managementNm", orderable: 1}
            , {
            }
        ],
        "columnDefs": [
            { "defaultContent": "", "targets": "_all" },
            { "targets": 0,
                "render": function(data, type, row){
                    return '<a href="javascript:void(0);" id="testResultBtn" onclick="javascript:testResultDet(' + row.groupCheckupHistSno + ', ' + row.checkupItemSno + ')">' + row.checkupItemNm + '</a>'
                }
            },
            { "targets": 2,
                "render": function(data, type, row){
                    if(data === '90114100'){
                        data = aboveStr;
                    }else if(data === '90114200'){
                        data = normalStr;
                    }else if(data === '90114300'){
                        data = belowStr;
                    }
                    return data;
                }
            },
            { "targets": -1,
                "render": function(data, type, row){
                    return '<a id="updateBtn" onclick="javascript:checkResultDet('+ "'update', '" + row.checkupItemSno + "', '" + row.groupCheckupHistSno + "'" + ')"> <i class="mdi mdi-square-edit-outline font-20 cursor mr-3"></i></a>' +
                        '<a id="deleteBtn" onclick="javascript:deleteCheckResult(' + row.groupCheckupHistSno + ', ' + row.checkupItemSno + ')"><i class="mdi mdi-delete font-20 cursor"></i></a>';
                },
                "orderable": false}
        ],
        destroy: true,
        select: {style: "multi"},
        order: [],
        processing: true,
        serverSide: true,
        sServerMethod: "POST",
        ajax: {
            "url": "/user/user/log/checkup/api/getPatientCheckResultList",
            "type": "POST",
            "data": function (data) {
                /* parameters */
                data.checkupInputDd = $('#checkupInputDd').val();
                data.userServiceUseSno = userServiceUseSno;
                data.groupCheckupHistSno = $('#completeGroupCheckupHistSno').val();
                data.page = ( data.start / data.length ) + 1;
                data.pageSize = (data.length < 1 ? 0 : data.length);
                if(data.order != null && data.order.length > 0) {
                    data.dtOrderCol = data.columns[data.order[0].column].data;
                    data.dtOrderDir = data.order[0].dir;
                }
            }
        },
        drawCallback: function () {
            $("#check-result-table_paginate > .pagination").addClass("pagination-rounded");
        }
    });
}
function checkWrapper(checkupInputDd, checkupInputDdMsg, groupCheckupHistSno, unCompleteCount) {
    $("#thisIndex").val(groupCheckupHistSno);

    // alert(insDt);
    var userServiceUseSno = $("#checkUserServiceUseSno").val();
    // alert(userServiceUseSno);
    //alert(groupCheckupHistSno);

    // alert("unCompleteCount: " + unCompleteCount);
    $("#unCompleteCount").val(unCompleteCount);
    if(unCompleteCount > 0){
        $("#unCompleteCount").attr("style", "visibility:visible");
    } else{
        $("#unCompleteCount").attr("style", "visibility:hidden");
    }

    $("#checkupInputDd").val(checkupInputDd);
    $("#completeUserServiceUseSno").val(userServiceUseSno);
    $("#completeGroupCheckupHistSno").val(groupCheckupHistSno);
    $("#checkitem-datatable_length").children().eq(3).text(checkupInputDdMsg);

    $('#check-result-table').DataTable().ajax.reload();
}
//검사결과 등록 + 수정
function checkResultDet(flag, checkupItemSno, groupCheckupHistSno){
    // 팝업 호출
    var userServiceUseSno = $("form#userLogForm #userServiceUseSno").val();

    var params = {};
    if(flag == "update"){
        params = {"checkupItemSno": checkupItemSno, "groupCheckupHistSno": groupCheckupHistSno};
        $("#hospital-test-modal > .modal-dialog").empty().load("/user/user/log/checkup/modal/user_detail_check_result_det", params, function() {
            $("#txt_checkupInputDd").attr("disabled", true);
            $("#checkupItemNm").attr("disabled", true);
            $("#hospital-test-modal").modal("show");
            rangeText();
        });
    } else{
        params = {"userServiceUseSno": userServiceUseSno};
        $("#hospital-test-modal > .modal-dialog").empty().load("/user/user/log/checkup/modal/user_detail_check_result_det", params, function() {
            $("#txt_checkupInputDd").attr("disabled", false);
            $("#checkupItemNm").attr("disabled", false);
            $("#hospital-test-modal").modal("show");
            rangeText();
        });
    }
}

function rangeText() {
    var csClcd = $("#groupCheckupStsClcd").val();
    if (csClcd === '90114200') {
        $("#itemRange").text(i18n('users.detail.checkup.result.txt.status.normal'));
    } else if (csClcd === '90114100') {
        $("#itemRange").text(i18n('common.txt.high'));
    } else if (csClcd === '90114300') {
        $("#itemRange").text(i18n('common.txt.low'));
    }
}

function checkResultReg(){
    var groupCheckupHistSno = $("#regGroupCheckupHistSno").val();
    var userServiceUseSno = $("#regUserServiceUseSno").val();

    // alert(UserServiceUseSno);
    // var checkupInputDd = $("#checkupInputDd").val();
    // alert(checkupInputDd);

    var checkupInputDd = $("#txt_checkupInputDd").val();
    var checkupItemNm = $("#checkupItemNm").val();
    var groupCheckupValue = $("#groupCheckupValue").val();

    var form = $('#checkresultForm')[0];
    var formData = new FormData(form);

    if (isEmpty(checkupInputDd)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('users.detail.checkup.result.pop.null.txt.title'));
        return false;
    } else if (isEmpty(checkupItemNm)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('users.detail.checkup.result.pop.null.txt.txt'));
        return false;
    } else if (isEmpty(groupCheckupValue)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('users.detail.checkup.result.pop.null.txt.title'));
        return false;
     } else if(isEmpty(groupCheckupHistSno)){
        //formData.set('checkupItemSno', $("#regcheckupItemSno").val());
        $.ajax({
            url: "/user/user/log/checkup/api/user_detail_check_result_reg",
            type: "POST",
            enctype: 'multipart/form-data',
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success: function (data) {
                //alert("tempEndPage" + $("#tempEndPage").val());
                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(i18n('users.detail.checkup.result.pop.success.txt.title'));
                $("#success-alert-modal #content").html(i18n('users.detail.checkup.result.pop.success.txt.txt'));
                $("#hospital-test-modal").modal('hide');
                //처음 생성할때 ajax만 새로고침
                $('#check-result-table').DataTable().ajax.reload();
                $.ajax({
                    "url": "/user/user/log/checkup/body",
                    "type": "POST",
                    "data": {"userServiceUseSno": userServiceUseSno, "searchToDd": $("#searchToDd").val()},
                    "success": function(data){
                        $("#unCompleteCount").attr("style", "visibility:visible");
                        var html = jQuery('<div>').html(data);
                        var contents = html.find("div#check-wrapper").html();
                        $("#check-wrapper").remove();
                        $("#check-wrapper-1").html(contents);
                        $("#check-wrapper-1 .list-group-item-action").click(function(){
                            $("#check-wrapper-1 .list-group-item-action").removeClass("active");
                            $(this).addClass("active");
                        });

                        $("#check-wrapper-1 > button:nth-child(1)").trigger("click");

                        var pageContents = html.find("div#page").html();
                        $("#page").remove();
                        $("#page-1").html(pageContents);
                        $("#group-datatable_previous").addClass("disabled");
                        if($("#tempEndPage").val() == 0 || $("#tempEndPage").val() == 1){
                            $("#group-datatable_next").addClass("disabled");
                        }
                        $("#num1").addClass("active");
                    }
                });
                /* 페이지 고정 */
                //$('#webuser-datatable').DataTable().ajax.reload(null, false);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    } else if(!isEmpty(groupCheckupHistSno)){
        //수정
        var userServiceUseSno = $("#userServiceUseSno").val();

        $.ajax({
            url: "/user/user/log/checkup/api/user_detail_check_result_mod",
            type: "POST",
            enctype: 'multipart/form-data',
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success: function (data) {
                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(i18n('users.detail.checkup.result.modify.pop.txt.title'))
                $("#success-alert-modal #content").html(i18n('users.detail.checkup.result.modify.pop.txt.txt'))
                $("#hospital-test-modal").modal('hide');

                $.ajax({
                    "url": "/user/user/log/checkup/body",
                    "type": "POST",
                    "data": {"userServiceUseSno": userServiceUseSno, "searchToDd": $("#searchToDd").val(), "currentIndex": $("#currentIndex").val()},
                    "success": function(data){
                        $("#unCompleteCount").attr("style", "visibility:visible");
                        var html = jQuery('<div>').html(data);
                        var contents = html.find("div#check-wrapper").html();
                        $("#check-wrapper").remove();
                        $("#check-wrapper-1").html(contents);
                        $("#check-wrapper-1 .list-group-item-action").click(function(){
                            $("#check-wrapper-1 .list-group-item-action").removeClass("active");
                            $(this).addClass("active");
                        });

                        $("#checkWrapperBtn"+$("#thisIndex").val()).trigger("click");

                        var pageContents = html.find("div#page").html();
                        $("#page").remove();
                        $("#page-1").html(pageContents);
                        $("#group-datatable_previous").addClass("disabled");
                        if($("#tempEndPage").val() == 0 || $("#tempEndPage").val() == 1){
                            $("#group-datatable_next").addClass("disabled");
                        }
                        if($("#currentIndex").val() == 0 || $("#currentIndex").val() == 1) {
                            $("#group-datatable_previous").addClass("disabled");
                        }else{
                            $("#group-datatable_previous").removeClass("disabled");
                        }
                        if($("#currentIndex").val() == $("#tempEndPage").val()){
                            $("#group-datatable_next").addClass("disabled");
                        }else{
                            $("#group-datatable_next").removeClass("disabled");
                        }
                        $("#num"+$("#currentIndex").val()).addClass("active");
                    }
                });
                //처음 생성할때 ajax만 새로고침
                //$('#check-result-table').DataTable().ajax.reload();
                /* 페이지 고정 */
                //$('#webuser-datatable').DataTable().ajax.reload(null, false);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
}
//검색
function pCheckResultSearch(){

    let userServiceUseSno = $("#userLogForm #userServiceUseSno").val();
    let searchFromDd = $("#searchFromDd").val();
    let searchToDd = $("#searchToDd").val();
    let groupSno = $("#groupSel option:selected").val();
    let data = {"userServiceUseSno": userServiceUseSno, "groupSnoCheck": groupSno, "searchFromDd": searchFromDd, "searchToDd": searchToDd};

    $.ajax({
        "url": "/user/user/log/checkup/body",
        "type": "POST",
        "data": data,
        "success": function (data){
            let html = jQuery('<div>').html(data);
            let contents = html.find("div#check-wrapper").html();
            $("#check-wrapper").remove();
            $("#check-wrapper-1").html(contents);
            $("#check-wrapper-1 .list-group-item-action").click(function(){
                $("#check-wrapper-1 .list-group-item-action").removeClass("active");
                $(this).addClass("active");
            });

            if($("#check-wrapper-1").text().match(i18n('users.detail.checkup.result.txt.checkuplist'))){
                $("#check-wrapper-1 > button:nth-child(1)").trigger("click");
            }else{
                $('#check-result-table').DataTable().ajax.reload();
                $("#unCompleteCount").attr("style", "visibility:hidden");
                $("#checkitem-datatable_length").children().eq(3).text(i18n('users.detail.checkup.result.txt.reg_date'));
            }
            previous();
            // var pageContents = html.find("div#page").html();
            // $("#page").remove();
            // $("#page-1").html(pageContents);
            // $("#group-datatable_previous").addClass("disabled");
            // if($("#tempEndPage").val() == 0 || $("#tempEndPage").val() == 1){
            //     $("#group-datatable_next").addClass("disabled");
            // }
            // $("#num1").addClass("active");
        }
    });
}
//등록완료
function checkResultComplete(){
    $("#confirm-modal-com").modal('show');

    $("#confirm-modal-com #confirmModalComReg").on('click', function(){
        $("#confirm-modal-com").modal('hide');

        var userServiceUseSno = $("#completeUserServiceUseSno").val();
        var groupCheckupHistSno = $("#completeGroupCheckupHistSno").val()

        $.ajax({
            "url": "/user/user/log/checkup/api/checkResultComplete",
            "type": "POST",
            "data": {"userServiceUseSno":userServiceUseSno, "groupCheckupHistSno": groupCheckupHistSno},
            "success": function(data){
                if(data > 0) {
                    $.ajax({
                        "url": "/user/user/log/checkup/body",
                        "type": "POST",
                        "data": {"userServiceUseSno": userServiceUseSno, "searchToDd": $("#searchToDd").val(), "currentIndex": $("#currentIndex").val()},
                        "success": function (data){
                            $("#unCompleteCount").attr("style", "visibility:hidden");
                            var html = jQuery('<div>').html(data);
                            var contents = html.find("div#check-wrapper").html();
                            $("#check-wrapper").remove();
                            $("#check-wrapper-1").html(contents);
                            // console.log("html: " + $("#check-wrapper-1").html());
                            $("#check-wrapper-1 .list-group-item-action").click(function(){
                                $("#check-wrapper-1 .list-group-item-action").removeClass("active");
                                $(this).addClass("active");
                            });

                            $("#checkWrapperBtn"+$("#thisIndex").val()).trigger("click");

                            var pageContents = html.find("div#page").html();
                            $("#page").remove();
                            $("#page-1").html(pageContents);
                            $("#group-datatable_previous").addClass("disabled");
                            if($("#tempEndPage").val() == 0 || $("#tempEndPage").val() == 1){
                                $("#group-datatable_next").addClass("disabled");
                            }
                            if($("#currentIndex").val() == 0 || $("#currentIndex").val() == 1) {
                                $("#group-datatable_previous").addClass("disabled");
                            }else{
                                $("#group-datatable_previous").removeClass("disabled");
                            }
                            if($("#currentIndex").val() == $("#tempEndPage").val()){
                                $("#group-datatable_next").addClass("disabled");
                            }else{
                                $("#group-datatable_next").removeClass("disabled");
                            }
                            $("#num"+$("#currentIndex").val()).addClass("active");
                        }
                    });
                }
            }
        });
    });
}
//검사 항목별 비교
function testResultDet(groupCheckupHistSno, checkupItemSno, groupSno){
    // alert(groupSno);
    var userServiceUseSno = $("form#userLogForm #userServiceUseSno").val();

    params = {"groupCheckupHistSno": groupCheckupHistSno, "checkupItemSno": checkupItemSno, "userServiceUseSno": userServiceUseSno, "groupSno": groupSno}
    $("#test-result-modal > .modal-dialog").load("/user/user/log/checkup/modal/user_detail_test_result", params, function() {
        $("#test-result-modal").modal("show");
    });
}
//삭제
function deleteCheckResult(groupCheckupHistSno, checkupItemSno){
    $("#confirm-modal").modal('show');
    $("#groupCheckupHistSno").val(groupCheckupHistSno);
    $("#checkupItemSno").val(checkupItemSno);
    // alert($("#groupCheckupHistSno").val());

    $("#confirm-modal #delModalBtn").off('click');
    $("#confirm-modal #delModalBtn").on('click', function(){
        $("#confirm-modal").modal("hide");
        $.ajax({
            url : "/user/user/log/checkup/api/deleteSysCheckResult",
            type : "post",
            data : {"groupCheckupHistSno": $("#groupCheckupHistSno").val(), "checkupItemSno": $("#checkupItemSno").val()},
            success:function(data){
                $("#delete-success-modal").modal('show');
                //처음 생성할때 ajax만 새로고침
                $('#check-result-table').DataTable().ajax.reload();
                $.ajax({
                    "url": "/user/user/log/checkup/body",
                    "type": "POST",
                    "data": {"userServiceUseSno": $("#userServiceUseSno").val(), "searchToDd": $("#searchToDd").val(), "currentIndex": $("#currentIndex").val()},
                    "success": function(data){
                        // alert("wrapper reload");
                        var html = jQuery('<div>').html(data);
                        var contents = html.find("div#check-wrapper").html();
                        $("#check-wrapper").remove();
                        $("#check-wrapper-1").html(contents);
                        $("#check-wrapper-1 .list-group-item-action").click(function(){
                            $("#check-wrapper-1 .list-group-item-action").removeClass("active");
                            $(this).addClass("active");
                        });

                        // $("#checkWrapperBtn"+$("#thisIndex").val()).trigger("click");

                        // console.log($("#check-wrapper-1").text());
                        if($("#check-wrapper-1").text().match(i18n('users.detail.checkup.result.txt.checkuplist'))){

                        }else{
                            $("#currentIndex").val($("#currentIndex").val() - 1);
                            $.ajax({
                                "url": "/user/user/log/checkup/body",
                                "type": "POST",
                                "data": {"userServiceUseSno": $("#userServiceUseSno").val(), "searchToDd": $("#searchToDd").val(), "currentIndex": $("#currentIndex").val()},
                                "success": function(data){
                                    var html = jQuery('<div>').html(data);
                                    var contents = html.find("div#check-wrapper").html();
                                    $("#check-wrapper").remove();
                                    $("#check-wrapper-1").html(contents);

                                    $("#check-wrapper-1 > button:nth-child(1)").trigger("click");
                                }
                            });
                        }

                        var checkWrapperBtn = $("#checkWrapperBtn"+groupCheckupHistSno).children().eq(5).text();
                        // console.log("checkWrapperBtn: "+checkWrapperBtn);
                        if(checkWrapperBtn.match(i18n('users.detail.checkup.result.txt.item.temp'))){
                            $("#unCompleteCount").attr("style", "visibility:visible");
                        } else{
                            $("#unCompleteCount").attr("style", "visibility:hidden");
                            $("#checkitem-datatable_length").children().eq(3).text(i18n('users.detail.checkup.result.txt.reg_date'));
                        }

                        var pageContents = html.find("div#page").html();
                        $("#page").remove();
                        $("#page-1").html(pageContents);
                        $("#group-datatable_previous").addClass("disabled");
                        if($("#tempEndPage").val() == 0 || $("#tempEndPage").val() == 1){
                            $("#group-datatable_next").addClass("disabled");
                        }
                        if($("#currentIndex").val() == 0 || $("#currentIndex").val() == 1) {
                            $("#group-datatable_previous").addClass("disabled");
                        }else{
                            $("#group-datatable_previous").removeClass("disabled");
                        }
                        if($("#currentIndex").val() == $("#tempEndPage").val()){
                            $("#group-datatable_next").addClass("disabled");
                        }else{
                            $("#group-datatable_next").removeClass("disabled");
                        }
                        $("#num"+$("#currentIndex").val()).addClass("active");
                    }
                });
                /* 페이지 고정 */
                //$('#webuser-datatable').DataTable().ajax.reload(null, false);
            },
            error:function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                $("#error-alert-modal").modal('show');
                $("#e_title").html('error');
                $("#e_content").html('An error occurre');
            }
        });
    });
}

$(document).ready(function () {

    $("#contents-preview-datatable").DataTable({
        scrollX: true,
        searching: true,
        lengthChange: false,
        pageLength: 6,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: i18n('common.datatable_info'),
            emptyTable : i18n('common.datatable_empty'),
            search: i18n('common.txt.search')
        },
        columns: [
            {
                orderable: 1,
                width: "300px"
            }, {orderable: 1}, {orderable: 1}, {orderable: 1}, {orderable: 0}, {orderable: 0}],
        order: [[1, "desc"]],
        drawCallback: function () {
            $("#contents-preview-datatable_paginate > .pagination").addClass("pagination-rounded");
        },
        createdRow: function( row, data, dataIndex ) {
            $('td:eq(0)', row).css('min-width', '300px');
        }
    });

    $(".story-box").on("click", function(e) {
        $(this).toggleClass('active')
    })

    $(".direct-select").on("change", function(e) {
        if( $(this).val() == "direct" ) $(this).parent().addClass("active")
        else $(this).parent().removeClass("active")
    })

    onResize();

    $("#success-alert-modal").on("hidden.bs.modal", function(e){
        if( $("#successReload").val() === "Y" ) {
            $('.modal-backdrop').remove();
            callMenu('/user/user/log', i18n('menu.txt.mgt.user.details'), {userServiceUseSno : $("#userServiceUseSno").val()});
        }
    });


    $("#memo-tab .simplebar-content-wrapper").scroll(function(e){
        let scrollT = $(this).scrollTop(); //스크롤바의 상단위치
        let scrollH = $(this).height(); //스크롤바를 갖는 div의 높이
        let contentH = $("#memo-tab .simplebar-content").height(); //문서 전체 내용을 갖는 div의 높이
        let offset = 2;
        if((scrollT + scrollH + offset) >= contentH) { // 스크롤바가 아래 쪽에 위치할 때
            // console.log("scroll down ~~~~~~~~~~~~~~~~~~~~"+scrollT+" + "+ scrollH +" = "+ contentH+"~~~~~~~~~~~~~~~~~~~~~~~");
            // console.log(e);
            getMemoList(2);
        }else if(scrollT <= 0){
            // console.log("scroll up  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            // console.log(e);
            getMemoList(0);
        }
    });

    getMemoList(1);


    $("#sms-tab .simplebar-content-wrapper").scroll(function(e){
        let scrollT = $(this).scrollTop(); //스크롤바의 상단위치
        let scrollH = $(this).height(); //스크롤바를 갖는 div의 높이
        let contentH = $("#sms-tab .simplebar-content").height(); //문서 전체 내용을 갖는 div의 높이
        let offset = 2;
        if((scrollT + scrollH + offset) >= contentH) { // 스크롤바가 아래 쪽에 위치할 때
            // console.log("scroll down ~~~~~~~~~~~~~~~~~~~~"+scrollT+" + "+ scrollH +" = "+ contentH+"~~~~~~~~~~~~~~~~~~~~~~~");
            // console.log(e);
            getSmsList(2);
        }else if(scrollT <= 0){
            // console.log("scroll up  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            // console.log(e);
            getSmsList(0);
        }
    });

    getSmsList(1);

});

$(window).resize(function(){
    onResize();
});

$(window).scroll(function(){
    onResize();
});
function onResize(){
    var scroll_top = $(window).scrollTop();
    var w = $("#main-container").width();
    var w2 = $("#chatting-wrapper").width();
    var h = $(window).height();
    if($(window).width() > 768)
    {
        $(".chatting-wrapper").css('width', w2);
        $(".conversation-list").height(h - 430);
    }else {
        $(".chatting-wrapper").css('width', w);
    }
}



jQuery(function($) {
    $('.image-gallery a').simpleLightbox({
        nextBtnClass: ' dripicons-chevron-right',
        nextBtnCaption: '',
        prevBtnClass: ' dripicons-chevron-left',
        prevBtnCaption: ''
    });

    $(".remove-image").on("click", function(e) {
        e.preventDefault();
        $(this).closest(".preview-item").remove();
    });
});
jQuery(function($) {
    $('.image-preview a').simpleLightbox({

    });

    $(".remove-image").on("click", function(e) {
        e.preventDefault();
        $(this).closest(".preview-item").remove();
    });
});




/*** App Logs Modal start ***********************************************************************************/
/** MngNo */
function showDocMngNoModal(){
    $("#user-doctor-number-modal > .modal-dialog").load("/user/user/log/modal/doc_mng_no", {userServiceUseSno: $("#userServiceUseSno").val()}, function() {
        $("#user-doctor-number-modal").modal("show");
    });
}



























/*** App Logs Modal end   ***********************************************************************************/




/** 메모수정 */
var memoModObj ;
function showMemoEditModal(o, sno){
    memoModObj = o;
    $("#memo-edit-modal > .modal-dialog").empty().load("/user/user/log/memo/modal/memo_det", {userServiceUseSno: $("#userServiceUseSno").val(), userMemoSno: sno}, function() {
        $("#memo-edit-modal").modal("show");
    });
}
function getMemoList(reset){

    var userServiceUseSno =  $("#userServiceUseSno").val();
    var opt2 = "";
    
    if(reset == 1){
        $("#memo-tab .simplebar-content").empty();
        $("#memo-form #memo_from_date").val("");
        $("#memo-form #memo_to_date").val("");
        $("#memo-form #memo_last_sno").val("");
    }else if(reset == 2){
        opt2 =  $("#memo-form #memo_last_sno").val();
    }

    $.ajax({
        url : "/user/user/log/memo/api/get_list",
        type : "POST",
        data : {
            "userServiceUseSno" : userServiceUseSno,
            "groupSno" : $("#userDetailMemoGroupSel").val(),
            "searchFromDd" : $("#memo-form #memo_from_date").val(),
            "searchToDd" : $("#memo-form #memo_to_date").val(),
            "opt1" : 20,
            "opt2": opt2
        },
        success : function(data){
            // console.log("getMemoList success ~~~~~" + reset);
            var json = data.memoList;
            if(json != null && json.length > 0) {

                var tmp = '';
                var tmpDay = '';
                var tmpDd = '';
                var imgTmp = '';
                var tmpFromDay = '';
                var tmpToDay = '';
                var tmpMemoSno = '0';
                $.each(json, function (i, obj) {
                    tmp = '';

                    imgTmp = '/resources/images/users/avatar-1.jpg';
                    if(obj.fileSaveNm != null && obj.fileSaveNm != ""){
                        imgTmp = obj.fileSaveNm;
                    }

                    if(reset < 2) {
                        if (i == 0) {
                            tmpDay = obj.insDtDash;
                            tmpDd = obj.insDt;
                            tmpMemoSno = obj.userMemoSno;
                            tmpToDay = obj.insDt;
                        } else {
                            if (tmpDay != obj.insDtDash) {
                                $("#memo-tab .simplebar-content").prepend(
                                    '<div class="hr" style="margin-bottom:20px; margin-top:10px;" dd="' + tmpDd + '">'
                                    + '	<span class="hr-span hr-span-left">' + tmpDay + '</span>'
                                    + '</div>'
                                );
                                tmpDay = obj.insDtDash;
                                tmpDd = obj.insDt;
                            }
                            tmpFromDay = obj.insDt;
                        }
                    }else{
                        tmpMemoSno = obj.userMemoSno;
                    }

                    if(obj.opt1 == "Y"){
                        <!-- 내가 작성. -->
                        tmp += ''
                            + '<li class="clearfix odd">'
                            + '	<div class="chat-avatar">'
                            + '		<img src="'+imgTmp+'" class="rounded" alt="" style="width: 42px; height: 42px;" onerror="this.src=\'/resources/images/users/avatar-1.jpg\'"><i>'+obj.insTime+'</i>'
                            + '	</div>'
                            + '	<div class="conversation-text">'
                            + '		<div class="ctext-wrap">'
                            + '			<i>'+obj.managementNm+'</i>'
                            + '			<p>'+obj.memo+'</p>'
                            + '		</div>'
                            + '	</div>'
                            + '	<div class="dropdown">'
                            + '		<button class="btn btn-sm btn-link" data-toggle="dropdown" aria-expanded="false"><i class="uil uil-ellipsis-v"></i></button>'
                            + '		<div class="dropdown-menu">'
                            + '			<a class="dropdown-item" href="javascript:void(0);" onclick="showMemoEditModal(this, '+obj.userMemoSno+');">수정</a>'
                            + '			<a class="dropdown-item" href="javascript:void(0);" onclick="delMemo(this, '+obj.userMemoSno+')">삭제</a>'
                            + '		</div>'
                            + '	</div>'
                            + '</li>'
                        ;
                    }else{
                        <!-- 그룹 내 타 사용자 작성. -->
                        tmp += ''
                            + '<li class="clearfix position-relative">'
                            + '	<div class="chat-avatar">'
                            + '		<img src="'+imgTmp+'" class="rounded" alt="" style="width: 42px; height: 42px;" onerror="this.src=\'/resources/images/users/avatar-1.jpg\'"><i>'+obj.insTime+'</i>'
                            + '	</div>'
                            + '	<div class="conversation-text">'
                            + '		<div class="ctext-wrap">'
                            + '			<i>'+obj.managementNm+'</i>'
                            + '			<p>'+obj.memo+'</p>'
                            + '		</div>'
                            + '	</div>'
                            + '</li>'
                        ;
                    }

                    if(reset < 2) {
                        $("#memo-tab .simplebar-content").prepend(tmp);
                    }else{
                        $("#memo-tab .simplebar-content").append(tmp);
                    }

                });

                if(reset < 2 && !isEmpty(tmpDay)){
                    $("#memo-tab .simplebar-content").prepend(
                        '<div class="hr" style="margin-bottom:20px; margin-top:10px;" dd="' + tmpDd + '">'
                        + '	<span class="hr-span hr-span-left">' + tmpDay + '</span>'
                        + '</div>'
                    );
                }

                if( Number(tmpMemoSno) > Number($("#memo-form #memo_last_sno").val()) ) {
                    $("#memo-form #memo_last_sno").val(tmpMemoSno);
                }
                if( !isEmpty(tmpFromDay)) {
                    $("#memo-form #memo_from_date").val(tmpFromDay);
                }
                if( !isEmpty(tmpToDay)) {
                    $("#memo-form #memo_to_date").val(tmpToDay);
                }

                $("#memo-tab .simplebar-content-wrapper").scrollTop($("#memo-tab .simplebar-content-wrapper")[0].scrollHeight);

            }
        },
        complete : function(){

        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
function setMemo() {

    var memo =  $("#memo-form textarea[name=memo]").val();

    if(isEmpty(memo)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('common.txt.input.memo'));
        return false;
    } else {

        $.ajax({
            url: "/user/user/log/memo/api/reg",
            type: "POST",
            data: {
                "userServiceUseSno": $("#userServiceUseSno").val(),
                "groupSno" : $("#userDetailMemoGroupSel").val(),
                "memo": memo
            },
            success: function (data) {
                // console.log("setMemo success ~~~~~");
                // console.log(data);
                $("#memo-form textarea[name=memo]").val("");

                var tmp = '';
                var imgTmp = '/resources/images/users/avatar-1.jpg';
                if(data.fileSaveNm != null && data.fileSaveNm != ""){
                    imgTmp = data.fileSaveNm;
                }
                if($("#memo-form #memo_to_date").val() < data.insDt){
                    tmp += '<div class="hr" style="margin-bottom:20px; margin-top:10px;" dd="' + data.insDt + '">'
                        + '	<span class="hr-span hr-span-left">' + data.insDtDash + '</span>'
                        + '</div>'
                    ;
                    $("#memo-form #memo_to_date").val(data.insDt);
                }
                $("#memo-form #memo_last_sno").val(data.userMemoSno);
                tmp += '<li class="clearfix odd">'
                    + '	<div class="chat-avatar">'
                    + '		<img src="'+imgTmp+'" class="rounded" alt="" style="width: 42px; height: 42px;" onerror="this.src=\'/resources/images/users/avatar-1.jpg\'"><i>'+data.insTime+'</i>'
                    + '	</div>'
                    + '	<div class="conversation-text">'
                    + '		<div class="ctext-wrap">'
                    + '			<i>'+data.managementNm+'</i>'
                    + '			<p>'+data.memo+'</p>'
                    + '		</div>'
                    + '	</div>'
                    + '	<div class="dropdown">'
                    + '		<button class="btn btn-sm btn-link" data-toggle="dropdown" aria-expanded="false"><i class="uil uil-ellipsis-v"></i></button>'
                    + '		<div class="dropdown-menu">'
                    + '			<a class="dropdown-item" href="javascript:void(0);" onclick="showMemoEditModal(this, '+data.userMemoSno+');">수정</a>'
                    + '			<a class="dropdown-item" href="javascript:void(0);" onclick="delMemo(this, '+data.userMemoSno+')">삭제</a>'
                    + '		</div>'
                    + '	</div>'
                    + '</li>'
                ;

                $("#memo-tab .simplebar-content").append(tmp);
                $("#memo-tab .simplebar-content-wrapper").scrollTop($("#memo-tab .simplebar-content-wrapper")[0].scrollHeight);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("error ~~~~~");
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

    }
}
function delMemo(o, sno) {
    $("#confirm-modal").modal('show');
    $("#delModalBtn").off('click');
    $("#delModalBtn").on('click', function(){
        // console.log("delMemo ~~~"+ sno );
        $("#confirm-modal").modal('hide');

        $.ajax({
            url: "/user/user/log/memo/api/del",
            type: "POST",
            data: {
                "userServiceUseSno": $("#userServiceUseSno").val(),
                "userMemoSno": sno
            },
            success: function (data) {
                // console.log("delMemo success ~~~~~");
                var sb = $(o).parent().parent().parent("li.clearfix").siblings("div.hr");
                $(o).parent().parent().parent("li.clearfix").remove();
                $.each( $(sb), function(i,v){
                    // console.log("delMemo success  date clear ~~~~~");
                    if($(v).next("li.clearfix").length <= 0){
                        $(v).remove();
                    }
                } );
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("error ~~~~~");
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

    });
}

function getSmsList(reset){

    var userServiceUseSno =  $("#userServiceUseSno").val();
    var opt2 = "";

    if(reset == 1){
        $("#sms-tab .simplebar-content").empty();
        $("#sms-form #sms_from_date").val("");
        $("#sms-form #sms_to_date").val("");
        $("#sms-form #sms_last_sno").val("");
    }else if(reset == 2){
        opt2 =  $("#sms-form #sms_last_sno").val();
    }

    $.ajax({
        url : "/user/user/log/msg/api/get_list",
        type : "POST",
        data : {
            "receiveUserServiceUseSno" : userServiceUseSno,
            "serviceSno" : $("#userDetailSmsGroupSel").val(),
            "searchFromDd" : $("#sms-form #sms_from_date").val(),
            "searchToDd" : $("#sms-form #sms_to_date").val(),
            "opt1" : 20,
            "opt2": opt2
        },
        success : function(data){
            // console.log("getSmsList success ~~~~~" + reset);
            var json = data.smsList;

            // console.log(json)

            if(json != null && json.length > 0) {

                var tmp = '';
                var tmpDay = '';
                var tmpDd = '';
                var imgTmp = '';
                var tmpFromDay = '';
                var tmpToDay = '';
                var tmpSmsSno = '0';
                $.each(json, function (i, obj) {
                    tmp = '';

                    imgTmp = '/resources/images/users/avatar-1.jpg';
                    if(obj.fileSaveNm != null && obj.fileSaveNm != ""){
                        imgTmp = obj.fileSaveNm;
                    }

                    if(reset < 2) {
                        if (i == 0) {
                            tmpDay = obj.insDtDash;
                            tmpDd = obj.insDt;
                            tmpSmsSno = obj.smsMsgSno;
                            tmpToDay = obj.insDt;
                        } else {
                            if (tmpDay != obj.insDtDash) {
                                $("#sms-tab .simplebar-content").prepend(
                                    '<div class="hr" style="margin-bottom:20px; margin-top:10px;" dd="' + tmpDd + '">'
                                    + '	<span class="hr-span hr-span-left">' + tmpDay + '</span>'
                                    + '</div>'
                                );
                                tmpDay = obj.insDtDash;
                                tmpDd = obj.insDt;
                            }
                            tmpFromDay = obj.insDt;
                        }
                    }else{
                        tmpSmsSno = obj.smsMsgSno;
                    }


                    if(obj.opt1 == "Y"){
                        <!-- 내가 작성. -->
                        tmp += ''
                            + '<li class="clearfix odd">'
                            + '	<div class="chat-avatar">'
                            + '		<img src="'+imgTmp+'" class="rounded" alt="" style="width: 42px; height: 42px;" onerror="this.src=\'/resources/images/users/avatar-1.jpg\'"><i>'+obj.insTime+'</i>'
                            + '	</div>'
                            + '	<div class="conversation-text">'
                            + '		<div class="ctext-wrap">'
                            + '			<i>'+obj.managementNm+'</i>'
                            + '			<p>'+obj.smsMsgCtnt+'</p>'
                            + '		</div>'
                            + '	</div>'
                            + '</li>'
                        ;
                    }else{
                        <!-- 그룹 내 타 사용자 작성. -->
                        tmp += ''
                            + '<li class="clearfix position-relative">'
                            + '	<div class="chat-avatar">'
                            + '		<img src="'+imgTmp+'" class="rounded" alt="" style="width: 42px; height: 42px;" onerror="this.src=\'/resources/images/users/avatar-1.jpg\'"><i>'+obj.insTime+'</i>'
                            + '	</div>'
                            + '	<div class="conversation-text">'
                            + '		<div class="ctext-wrap">'
                            + '			<i>'+obj.managementNm+'</i>'
                            + '			<p>'+obj.smsMsgCtnt+'</p>'
                            + '		</div>'
                            + '	</div>'
                            + '</li>'
                        ;
                    }

                    if(reset < 2) {
                        $("#sms-tab .simplebar-content").prepend(tmp);
                    }else{
                        $("#sms-tab .simplebar-content").append(tmp);
                    }

                });

                if(reset < 2 && !isEmpty(tmpDay)){
                    $("#sms-tab .simplebar-content").prepend(
                        '<div class="hr" style="margin-bottom:20px; margin-top:10px;" dd="' + tmpDd + '">'
                        + '	<span class="hr-span hr-span-left">' + tmpDay + '</span>'
                        + '</div>'
                    );
                }

                if( Number(tmpSmsSno) > Number($("#sms-form #sms_last_sno").val()) ) {
                    $("#sms-form #sms_last_sno").val(tmpSmsSno);
                }
                if( !isEmpty(tmpFromDay)) {
                    $("#sms-form #sms_from_date").val(tmpFromDay);
                }
                if( !isEmpty(tmpToDay)) {
                    $("#sms-form #sms_to_date").val(tmpToDay);
                }

                $("#sms-tab .simplebar-content-wrapper").scrollTop($("#sms-tab .simplebar-content-wrapper")[0].scrollHeight);

            }
        },
        complete : function(){

        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// function fnChkByte(obj, maxByte, target) {
//     var str = obj.value;
//     var str_len = str.length;
//
//     var rbyte = 0;
//     var rlen = 0;
//     var one_char = "";
//     var str2 = "";
//
//     for (var i = 0; i < str_len; i++) {
//         one_char = str.charAt(i);
//         if (escape(one_char).length > 4) {
//             rbyte += 2;                                         //한글2Byte
//         }
//         else {
//             rbyte++;                                            //영문 등 나머지 1Byte
//         }
//
//         if (rbyte <= maxByte) {
//             rlen = i + 1;                                          //return할 문자열 갯수
//         }
//     }
//
//     if (rbyte > maxByte) {
//         // alert("메세지는 최대 " + maxByte + "byte를 초과할 수 없습니다.")
//         str2 = str.substr(0, rlen);                                  //문자열 자르기
//         obj.value = str2;
//         fnChkByte(obj, maxByte);
//     }
//     else {
//         if (target) {
//             document.getElementById(target).innerText = rbyte;
//         }
//     }
// }

function setSms() {

    var sms =  $("#sms-form textarea[name=sms]").val();

    if(isEmpty(sms)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('user.detail.telehealth.request.txt.msg.placeholder'));
        return false;
    } else {
        $("#confirm-modal-com").modal('show');
        $("#confirm-modal-com #confirm-modal-com-title").text(i18n('user.detail.telehealth.request.confirm.txt.send.sms.title'));
        $("#confirm-modal-com #confirm-modal-com-content").text(i18n('user.detail.telehealth.request.confirm.txt.send.sms.content'));
        $("#confirm-modal-com #confirmModalComReg")
            .off('click')
            .on('click', function () {
                $("#confirm-modal-com").modal('hide');

                $.ajax({
                    url: "/user/user/log/msg/api/reg",
                    type: "POST",
                    data: {
                        "receiveUserServiceUseSno": $("#userServiceUseSno").val(),
                        "serviceSno" : $("#userDetailSmsGroupSel").val(),
                        "smsMsgCtnt": sms
                    },
                    success: function (data) {
                        // console.log("setSms success ~~~~~");
                        // console.log(data);
                        $("#sms-form textarea[name=sms]").val("");

                        var tmp = '';
                        var imgTmp = '/resources/images/users/avatar-1.jpg';
                        if(data.fileSaveNm != null && data.fileSaveNm != ""){
                            imgTmp = data.fileSaveNm;
                        }
                        if($("#sms-form #sms_to_date").val() < data.insDt){
                            tmp += '<div class="hr" style="margin-bottom:20px; margin-top:10px;" dd="' + data.insDt + '">'
                                + '	<span class="hr-span hr-span-left">' + data.insDtDash + '</span>'
                                + '</div>'
                            ;
                            $("#sms-form #sms_to_date").val(data.insDt);
                        }
                        $("#sms-form #sms_last_sno").val(data.smsMsgSno);
                        tmp += '<li class="clearfix odd">'
                            + '	<div class="chat-avatar">'
                            + '		<img src="'+imgTmp+'" class="rounded" alt="" style="width: 42px; height: 42px;" onerror="this.src=\'/resources/images/users/avatar-1.jpg\'"><i>'+data.insTime+'</i>'
                            + '	</div>'
                            + '	<div class="conversation-text">'
                            + '		<div class="ctext-wrap">'
                            + '			<i>'+data.managementNm+'</i>'
                            + '			<p>'+data.smsMsgCtnt+'</p>'
                            + '		</div>'
                            + '	</div>'
                            + '</li>'
                        ;

                        $("#sms-tab .simplebar-content").append(tmp);
                        $("#sms-tab .simplebar-content-wrapper").scrollTop($("#sms-tab .simplebar-content-wrapper")[0].scrollHeight);

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log("error ~~~~~");
                        console.log(XMLHttpRequest);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            });
    }
}

var totData1_1 = [], totData1_2 = [], totData2 = [], totData3 = [], totData4 = [], totData5 = [];

function drawTotChart1() {
    colors = ["#7453ff", "#0acf97", "#fa5c7c", "#ffbc00"];
    (dataColors = $("#line-chart-01").data("colors")) && (colors = dataColors.split(","));
    options = {
        chart: {
            height: 148,
            type: "line",
            id: "lc1",
            group: "group-1"
        },
        colors: colors,
        dataLabels: {enabled: !1},
        toolbar: {tools: {selection: !1}},
        tooltip: {
            followCursor: !1, theme: "dark", x: {show: !1}, marker: {show: !1}, y: {
                title: {
                    formatter: function () {
                        return ""
                    }
                }
            }
        },
        title: {
            text: i18n('users.detail.total.log.txt.item.bloodpressure'),
            align: "left",
            style: {
                fontFamily: "\"Spoqa Han Sans Regular\" sans-serif",
                color: "#808b96"
            }
        },
        stroke: {width: [3, 3], curve: "smooth"},
        series: [{name:"수축기", data: totData1_1}, {name:"이완기", data: totData1_2}],
        fill: {gradient: {enabled: !0, opacityFrom: .6, opacityTo: .8}},
        legend: {show: !1, position: "top", horizontalAlign: "left"},
        xaxis: {type: "datetime"},
        yaxis: {
            labels: {
                minWidth: 30
            }
        },
        grid: {row: {colors: ["transparent", "transparent"], opacity: .2}, borderColor: "#f1f3fa"}
    }, totChart1 = new ApexCharts(document.querySelector("#line-chart-01"), options);
    totChart1.render();
}

function drawTotChart2() {
    (dataColors = $("#line-chart-02").data("colors")) && (colors = dataColors.split(","));
    var optionsline2 = {
        chart: {
            type: "line",
            height: 148,
            id: "lc2",
            group: "group-1"
        },
        colors: colors,
        stroke: {width: [3], curve: "smooth"},
        toolbar: {tools: {selection: !1}},
        fill: {opacity: 1},
        tooltip: {
            followCursor: !1, theme: "dark", x: {show: !1}, marker: {show: !1}, y: {
                title: {
                    formatter: function () {
                        return ""
                    }
                }
            }
        },
        title: {
            text: i18n('users.detail.total.log.txt.item.bloodsugar'), align: "left",
            style: {
                fontFamily: "\"Spoqa Han Sans Regular\" sans-serif",
                color: "#808b96"
            }
        },
        series: [{data: totData2}],
        labels: [],
        xaxis: {type: "datetime"},
        yaxis: {
            labels: {
                minWidth: 30
                // ,formatter: function(val, index) {
                //     return Number(val.toFixed(2)).toLocaleString("en-US");
                // }
            }
        },
        grid: {row: {colors: ["transparent", "transparent"], opacity: .2}, borderColor: "#f1f3fa"}
    };
    totChart2 = new ApexCharts(document.querySelector("#line-chart-02"), optionsline2);
    totChart2.render();
}
function drawTotChart3() {
    (dataColors = $("#line-chart-03").data("colors")) && (colors = dataColors.split(","));
    options = {
        chart: {
            height: 148,
            type: "line",
            id: "lc3",
            group: "group-1"
        },
        colors: colors,
        dataLabels: {enabled: !1},
        toolbar: {tools: {selection: !1}},
        tooltip: {
            followCursor: !1, theme: "dark", x: {show: !1}, marker: {show: !1}, y: {
                title: {
                    formatter: function () {
                        return ""
                    }
                }
            }
        },
        title: {
            text: i18n('users.detail.total.log.txt.item.meal.select.total'), align: "left",
            style: {
                fontFamily: "\"Spoqa Han Sans Regular\" sans-serif",
                color: "#808b96"
            }
        },
        stroke: {width: [3], curve: "smooth"},
        series: [{data: totData3}],
        fill: {gradient: {enabled: !0, opacityFrom: .6, opacityTo: .8}},
        legend: {position: "top", horizontalAlign: "left"},
        xaxis: {type: "datetime"},
        yaxis: {
            labels: {
                minWidth: 30,
                formatter: function(val, index) {
                    return Number(val.toFixed(0)).toLocaleString("en-US");
                }
            }
        },
        grid: {row: {colors: ["transparent", "transparent"], opacity: .2}, borderColor: "#f1f3fa"}
    };
    totChart3 = new ApexCharts(document.querySelector("#line-chart-03"), options);
    totChart3.render();
}
function drawTotChart4() {
    (dataColors = $("#line-chart-04").data("colors")) && (colors = dataColors.split(","));
    var optionsline2 = {
        chart: {
            type: "line",
            height: 148,
            id: "lc4",
            group: "group-1"
        },
        colors: colors,
        stroke: {width: [3], curve: "smooth"},
        toolbar: {tools: {selection: !1}},
        fill: {opacity: 1},
        tooltip: {
            followCursor: !1, theme: "dark", x: {show: !1}, marker: {show: !1}, y: {
                title: {
                    formatter: function () {
                        return ""
                    }
                }
            }
        },
        title: {
            text: i18n('users.detail.total.log.txt.item.workout'), align: "left",
            style: {
                fontFamily: "\"Spoqa Han Sans Regular\" sans-serif",
                color: "#808b96"
            }
        },
        series: [{data: totData4}],
        xaxis: {type: "datetime"},
        yaxis: {
            labels: {
                minWidth: 30
                // , formatter: function(val, index) {
                //     return parseFloat(val.toFixed(1)).toLocaleString("en-US");
                // }
            }
        },
        grid: {row: {colors: ["transparent", "transparent"], opacity: .2}, borderColor: "#f1f3fa"}
    };
    totChart4 = new ApexCharts(document.querySelector("#line-chart-04"), optionsline2);
    totChart4.render();
}
function drawTotChart5() {
    (dataColors = $("#line-chart-05").data("colors")) && (colors = dataColors.split(","));
    var optionsline2 = {
        chart: {
            type: "line",
            height: 148,
            id: "lc5",
            group: "group-1"
        },
        colors: colors,
        stroke: {width: [3], curve: "smooth"},
        toolbar: {tools: {selection: !1}},
        fill: {opacity: 1},
        tooltip: {
            followCursor: !1, theme: "dark", x: {show: !1}, marker: {show: !1}, y: {
                title: {
                    formatter: function () {
                        return ""
                    }
                }
            }
        },
        title: {
            text: i18n('common.users.detail.log.category.insulin'), align: "left",
            style: {
                fontFamily: "\"Spoqa Han Sans Regular\" sans-serif",
                color: "#808b96"
            }
        },
        series: [{data: totData5}],
        xaxis: {type: "datetime"},
        yaxis: {
            labels: {
                minWidth: 30,
                // formatter: function(val, index) {
                //     return Number(val.toFixed(0)).toLocaleString("en-US");
                // }
            }
        },
        grid: {row: {colors: ["transparent", "transparent"], opacity: .2}, borderColor: "#f1f3fa"}
    };
    totChart5 = new ApexCharts(document.querySelector("#line-chart-05"), optionsline2);
    totChart5.render();
}


/** 통합로그 - 조회항목 toggle */
function toggleTotalLogCond(o){
    var divId = $(o).prop("id").replace("customSwitch", "line-chart-0");
    if($(o).prop("checked")){
        // $("#"+divId).removeClass("hidden");
        $("#"+divId).parent().removeClass('hidden');
        switch (divId) {
            case "line-chart-01":
                drawTotChart1();
                break;
            case "line-chart-02":
                drawTotChart2();
                break;
            case "line-chart-03":
                drawTotChart3();
                break;
            case "line-chart-04":
                drawTotChart4();
                break;
            case "line-chart-05":
                drawTotChart5();
                break;
        }

    }else{
        // $("#"+divId).addClass("hidden");
        $("#"+divId).parent().addClass('hidden');
        switch (divId) {
            case "line-chart-01":
                if (totChart1) {
                    totChart1.destroy();
                    totChart1 = null;
                }
                break;
            case "line-chart-02":
                if (totChart2) {
                    totChart2.destroy();
                    totChart2 = null;
                }
                break;
            case "line-chart-03":
                if (totChart3) {
                    totChart3.destroy();
                    totChart3 = null;
                }
                break;
            case "line-chart-04":
                if (totChart4) {
                    totChart4.destroy();
                    totChart4 = null;
                }
                break;
            case "line-chart-05":
                if (totChart5) {
                    totChart5.destroy();
                    totChart5 = null;
                }
                break;
        }
    }
}
/** 통합로그 - 조회 */
function getTotalLog(){

    var userServiceUseSno =  $("#userServiceUseSno").val();
    var searchFromDd = $("#total_log_form #totalLogDateRange").val().split(" - ")[0];
    var searchToDd = $("#total_log_form #totalLogDateRange").val().split(" - ")[1];

    var measuringPointCode = $("#total_log_form select[name=measuringPointCode]").val();
    var opt1 = $("#total_log_form select[name=opt1]").val();

    $.ajax({
        url : "/user/user/log/total/api/get_total_log",
        type : "POST",
        data : {
            "userServiceUseSno" : userServiceUseSno,
            "searchFromDd" : searchFromDd,
            "searchToDd" : searchToDd,
            "measuringPointCode" : measuringPointCode,
            "opt1" : opt1
        },
        success : function(data){

            totData1_1 = data.totalCharts.totChart1s;
            totData1_2 = data.totalCharts.totChart1d;
            totData2 = data.totalCharts.totChart2;
            totData3 = data.totalCharts.totChart3;
            totData4 = data.totalCharts.totChart4;
            totData5 = data.totalCharts.totChart5;

            if (totChart1) {
                totChart1.destroy();
                totChart1 = null;
                drawTotChart1();
            }
            if (totChart2) {
                totChart2.destroy();
                totChart2 = null;
                drawTotChart2();
            }
            if (totChart3) {
                totChart3.destroy();
                totChart3 = null;
                drawTotChart3();
            }
            if (totChart4) {
                totChart4.destroy();
                totChart4 = null;
                drawTotChart4();
            }
            if (totChart5) {
                totChart5.destroy();
                totChart5 = null;
                drawTotChart5();
            }
        },
        complete : function(){

        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log("error ~~~~~");
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

/** 목표삭제 */
function delTarget(targetDelMdl){
    $("#confirm-modal").modal('show');
    $("#confirm-modal #delModalBtn").off('click').on('click', function(){
        // console.log("delMemo ~~~"+ targetDelMdl );
        $("#confirm-modal").modal('hide');

        $.ajax({
            url: "/user/user/log/api/target_del",
            type: "POST",
            data: {
                "userServiceUseSno": $("#userServiceUseSno").val(),
                "targetDelMdl": targetDelMdl
            },
            success: function (data) {
                // console.log("delTarget success ~~~~~");
                // console.log(data);
                if(!isEmpty(data)) {
                    $("#successReload").val("Y");
                    $("#success-alert-modal").modal('show');
                    $("#success-alert-modal #title").html(i18n('users.detail.log.option.delete'));
                    $("#success-alert-modal #content").html(i18n('common.users.detail.log.delete.target.content').replace("{0}", data));
                }else{
                    $("#error-alert-modal").modal('show');
                    $("#e_content").html("목표삭제실패");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("error ~~~~~");
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

    });
}
function scrollPaging(key) {
    let scroll = true;
    let playAlert = null;

    $(".showContent").slice(0, 10).show(); // 최초 10개 선택
    playAlert = setInterval(function() {
        scroll = true;
    }, 5000);

    if(key){
        var loadMore = '<div id="load" class="col pr-0 pl-0 mt-4 text-center">'
            +'<a href="javascript:void(0);" class="text-primary">'
            +'<i class="mdi mdi-spin mdi-loading mr-1 font-20"></i><spring:message code="common.txt.load.more" /></a>'
            +'</div>'
        ;
        $(".showContent").slice(0, 10).show(); // 최초 10개 선택
        $(window).scroll(function(){ // Load More를 위한 클릭 이벤트e
            // console.log('길이길이길이 : '+$(".showContent:hidden").length);
            if (scroll && Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()){
                scroll = false;
                $("#load").show();
                setTimeout(function(){
                    $("#load").hide();
                    $(".showContent:hidden").slice(0, 10).show(); // 숨김 설정된 다음 10개를 선택하여 표시
                }, 1000);
                if($(".showContent:hidden").length == 0){ // 숨겨진 DIV가 있는지 체크
                    // alert("더 이상 항목이 없습니다"); // 더 이상 로드할 항목이 없는 경우 경고
                    clearInterval(playAlert);
                    $(window).off('scroll');
                }
            }
        });
    } else{
        $(window).off('scroll');
    }
}