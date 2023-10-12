updateFaqContent();

var searchPlaceholderMsg = i18n('management.faq.txt.search.placeholder');
var pageSizeMsg = i18n('common.txt.search.pagesize');
var emptyStr = i18n('product.search.empty');
var searchNoneData = i18n('product.search.none.data');
var pageChangeSelectHtml = '<select class=\'form-control mr-1\'><option value="5">5</option><option value="10">10</option><option value="20">20</option></select>';
var lengthMenu = pageSizeMsg.replace("{0}", pageChangeSelectHtml);

var sysFaqContentsTable;
$(document).ready(function () {
    "use strict";


    $('#sys_faq_tab').find('a').on('shown.bs.tab', function (a, b) {

        if(a.target.id == "sys_faq_tab_1"){
            sysFaqContentsTable.api().columns.adjust();
        }else if(a.target.id == "sys_faq_tab_2"){

        }else if(a.target.id == "sys_faq_tab_3"){

        }
    });

    //컨텐츠 데이터테이블 설정
    sysFaqContentsTable = $("#faq-datatable").dataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: i18n('common.datatable_info'),
            emptyTable: "<div class='board-none'><i class='mdi mdi-account-search-outline font-48'></i> <p>"+emptyStr+"</p></div>",
            zeroRecords : "<div class='board-none'><i class='mdi mdi-account-search-outline font-48'></i> <p>"+searchNoneData+"</p></div>",
            sSearch:i18n('common.txt.search'),
            searchPlaceholder: searchPlaceholderMsg,
            lengthMenu: lengthMenu
        },
        pageLength: 10,
        columns: [
            {data:"faqAreaClcdNm", orderable: !0}
            , {data:"faqTitleNm", orderable: !0,width:"600px"}
            , {data:"updDt", orderable: !0,width:"150px"}
            , {data:"faqWriterNm", orderable: !0,width:"200px"}
            , {data:"insUserNm", orderable: !0,width:"200px"}
            , {data:"useYn", orderable: !0,width:"100px"}
            , {data:"mngBtn", orderable: !1,width:"150px" }
        ],
        "columnDefs": [
            { "defaultfaq": "", "targets": "_all" },  /* null 처리 */
            { "targets": 1,
                "className" : "table-thumbnail",
                "render": function(data, type, row){
                    if(isEmpty(row.faqFileSaveNm)) {
                        return '<img src="/resources/images/content.png" class="mr-2 rounded" >' + (row.faqTitleNm == null ? '' : row.faqTitleNm);
                    } else {
                        return '<img src="' +   baseContentsUrl + row.faqFileSaveNm + '" class="mr-2 rounded">' + (row.faqTitleNm == null ? '' : row.faqTitleNm);
                    }
                },
            },
            { "targets": 5,
                "render": function(data, type, row){
                    if(row.useYn == 'Y') {
                        return '<span class="badge badge-outline-info font-12">' + i18n('management.faq.txt.active') + '</span>';
                    } else if(row.useYn == 'N'){
                        return '<span class="badge badge-outline-secondary font-12">' + i18n('management.content.txt.inactive') + '</span>';
                    }
                },
            },
            { "targets": -1,
                "render": function(data, type, row){
                    var curSessionUserGrpId = $('form#faqForm #userGroupId').val();
                    var curManagementSno = $('form#faqForm #userSeq').val();

                    var strButton = '';

                    //컨텐츠 상세보기
                    strButton += '<a class="text-body" data-toggle="modal" data-target="#faq-view-modal" href="javascript:void(0)" onclick="showFaqContent(\'' + row.faqSno + '\')">';
                    strButton += '    <i class="dripicons-preview font-20 cursor mr-3"></i>';
                    strButton += ' </a>';

                    if(curSessionUserGrpId === "00201990" || curSessionUserGrpId === "00201900" || row.insUserSno === curManagementSno) {
                        //슈퍼관리자, 관리자 표시 / 전문가(00201100), 의사(00201200), 간호사(00201300), 운영자(00201400), 그룹관리자, 대표그룹관리자(00201800) 미표시
                        strButton += ' <i onclick="updateFaqContent(\'update\', \'' + row.faqSno + '\')" class="mdi mdi-square-edit-outline font-20 cursor mr-3"></i>';
                        strButton += ' <i onclick="deleteFaqContent(\'' + row.faqSno + '\', \'' + row.faqTitleNm + '\')" class="mdi mdi-delete font-20 cursor"></i>';
                    }
                    return strButton;
                }
            }
        ],
        select: {style: "multi"},
        order: [[2, "desc"]],
        processing: true,
        serverSide: true,
        sServerMethod: "POST",
        ajax: {
            "url":"/content/faq/api/getComFaqList",
            "type":"POST",
            "data": function (d) {
                /* parameters */
                d.page = ( d.start / d.length ) + 1;
                d.pageSize = (d.length < 1 ? 0 : d.length);
                d.searchWd = d.search.value;
                d.searchWdEnc = d.search.value;
                if(d.order != null && d.order.length > 0) {
                    d.dtOrderCol = d.columns[d.order[0].column].data;
                    d.dtOrderDir = d.order[0].dir;
                }
            },
            //"dataSrc": "data" /* 1. 수신된 Map의 데이터 객체 명을 지정하면 알아서 가져감. */
            "dataSrc": function(d){
                return d.data; /* 2. 수신된 Map의 데이터 객체를 리턴. */
            }
        },
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        }
    });

    $("#faq-datatable_wrapper div.dataTables_filter input").unbind();
    $("#faq-datatable_wrapper div.dataTables_filter input").keyup( function (e) {
        e.preventDefault();
        if (e.keyCode == 13) {
            sysFaqContentsTable.fnFilter( this.value );
        }
    } );

    //동영상일 경우 src 초기화
    $("#faq-modal").on('hide.bs.modal', function(e) {
        if($(".note-video-clip")){
            $(".note-video-clip").attr("src", "");
        }
    });

});

// 컨텐츠 삭제 API
function deleteFaqContent(faqSno, faqTitleNm) {
    if(!isEmpty(faqSno)) {

        $("#confirm-modal").modal('show');
        $("#delModalBtn").off('click');
        $("#delModalBtn").on('click', function() {
            $("#confirm-modal").modal('hide');

            $.ajax({
                url: "/content/faq/api/sys_faq_det/del",
                dataType: 'json',
                method: "POST",
                data: {
                    "faqSno": faqSno,
                    "faqTitleNm": faqTitleNm
                },
                success: function (data) {
                    $("#success-alert-modal").modal('show');
                    $("#success-alert-modal #title").html(i18n('management.faq.delete.pop.txt.title'));
                    $("#success-alert-modal #content").html(i18n('management.faq.delete.pop.txt.txt'));
                    //처음 생성할때 ajax만 새로고침
                    $('#faq-datatable').DataTable().ajax.reload();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });

        });
    }
}

//컨텐츠 상세 보기
function showFaqContent(sno) {
    $("#faq-modal").modal("show")

    console.log(sno);
    // 팝업 호출
    var params = {"faqSno": sno};
    $("#faq-modal > .modal-dialog").empty();
    $("#faq-modal > .modal-dialog").load("/content/faq/modal/sys_faq_show", params, function() {
        $("#faq-modal").modal("show");
    });

}

//컨텐츠 수정 버튼 클릭 시 tap 상태 변경
function updateFaqContent(flag, faqSno){

    var newTitleMsg = $('#newTitleMsg').val();
    var modTitleMsg = $('#modTitleMsg').val();

    // 팝업 호출
    var params = {};
    if(flag == "update") {
        params =  {
            "faqSno":faqSno
        };
        $("#sys_faq_update_flag").val(flag);
        $("#sys_faq_faqSno").val(faqSno);
    }else{
        // $("#sys_appoint_update_flag").val("");
        $("#sys_faq_update_flag").val("");
        $("#sys_faq_faqSno").val("");
    }

    // $('#new_content_thumb_Dropzone')[0].dropzone.removeAllFiles();
    $("#sys_faq_tab_2_area div").empty();
    $("#sys_faq_tab_2_area div").load("/content/faq/ins", params, function() {
        console.log("flag ==> " + flag);
        if(flag == "update") {
            $("#sys_faq_tab_2").tab("show");
            $("#sys_faq_tab_2 span").text(modTitleMsg);
        }else{
            console.log("sys_content_tab_2");
            $("#sys_faq_tab_2 span").text(newTitleMsg);
        }
    });
}
