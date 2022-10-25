updateContents();

var searchPlaceholderMsg = i18n('management.contents.txt.search.placeholder');
var pageSizeMsg = i18n('common.txt.search.pagesize');
var pageChangeSelectHtml = '<select class=\'form-control mr-1\'><option value="5">5</option><option value="10">10</option><option value="20">20</option></select>';
var lengthMenu = pageSizeMsg.replace("{0}", pageChangeSelectHtml);

var sysContentsTable;
$(document).ready(function () {
    "use strict";


    $('#sys_content_tab').find('a').on('shown.bs.tab', function (a, b) {
        // console.log("tab click ~~~");
        // console.log(a);
        // console.log(a.target.id);

        if(a.target.id == "sys_content_tab_1"){
            sysContentsTable.api().columns.adjust();
        }else if(a.target.id == "sys_content_tab_2"){

        }else if(a.target.id == "sys_content_tab_3"){

        }
    });

    sysContentsTable = $("#contents-datatable").dataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: i18n('common.datatable_info'),
            emptyTable : i18n('common.datatable_empty'),
            sSearch:i18n('common.txt.search'),
            searchPlaceholder: searchPlaceholderMsg,
            lengthMenu: lengthMenu
        },
        pageLength: 10,
        columns: [
            {data:"contentsAreaClcdNm", orderable: !0}
            , {data:"contentsTitleNm", orderable: !0,width:"600px"}
            , {data:"updDt", orderable: !0,width:"150px"}
            , {data:"contentsWriterNm", orderable: !0,width:"200px"}
            , {data:"insUserNm", orderable: !0,width:"200px"}
            , {data:"useYn", orderable: !0,width:"100px"}
            , {data:"mngBtn",width:"150px" }
        ],
        "columnDefs": [
            { "defaultContent": "", "targets": "_all" },  /* null 처리 */
            { "targets": 1,
                "className" : "table-thumbnail",
                "render": function(data, type, row){
                    if(isEmpty(row.contentsFileSaveNm)) {
                        return '<img src="/resources/images/content.png" class="mr-2 rounded" >' + (row.contentsTitleNm == null ? '' : row.contentsTitleNm);
                    } else {
                        return '<img src="' + baseContentsUrl + row.contentsFileSaveNm + '" class="mr-2 rounded">' + (row.contentsTitleNm == null ? '' : row.contentsTitleNm);
                    }
                },
            },
            { "targets": 5,
                "render": function(data, type, row){
                    if(row.useYn == 'Y') {
                        return '<span class="badge badge-outline-info font-12">' + i18n('management.contents.txt.active') + '</span>';
                    } else if(row.useYn == 'N'){
                        return '<span class="badge badge-outline-secondary font-12">' + i18n('management.contents.txt.inactive') + '</span>';
                    }
                },
            },
            { "targets": -1,
                "render": function(data, type, row){
                    var curSessionUserGrpId = $('form#contentForm #userGroupId').val();
                    var curManagementSno = $('form#contentForm #userSeq').val();

                    var strButton = '';
                    strButton += '<a class="text-body" data-toggle="modal" data-target="#content-view-modal" href="javascript:void(0)" onclick="showContents(\'' + row.contentsSno + '\')">';
                    strButton += '    <i class="dripicons-preview font-20 cursor mr-3"></i>';
                    strButton += ' </a>';
                    if(curSessionUserGrpId === "00201990" || curSessionUserGrpId === "00201900" || row.insUserSno === curManagementSno) {
                        //슈퍼관리자, 관리자 표시 / 전문가(00201100), 의사(00201200), 간호사(00201300), 운영자(00201400), 그룹관리자, 대표그룹관리자(00201800) 미표시
                        strButton += ' <i onclick="updateContents(\'update\', \'' + row.contentsSno + '\')" class="mdi mdi-square-edit-outline font-20 cursor mr-3"></i>';
                        strButton += ' <i onclick="deleteContents(\'' + row.contentsSno + '\', \'' + row.contentsTitleNm + '\')" class="mdi mdi-delete font-20 cursor"></i>';
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
            "url":"/content/content/api/getComContentsList",
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

    $("#contents-datatable_wrapper div.dataTables_filter input").unbind();
    $("#contents-datatable_wrapper div.dataTables_filter input").keyup( function (e) {
        e.preventDefault();
        if (e.keyCode == 13) {
            sysContentsTable.fnFilter( this.value );
        }
    } );

    $("#contents-modal").on('hide.bs.modal', function(e) {
        if($(".note-video-clip")){
            $(".note-video-clip").attr("src", "");
        }
    });

});
function deleteContents(contentsSno, contentsTitleNm) {
    if(!isEmpty(contentsSno)) {

        $("#confirm-modal").modal('show');
        $("#delModalBtn").off('click');
        $("#delModalBtn").on('click', function() {
            // console.log("deleteContents ~~~" + contentsSno);
            $("#confirm-modal").modal('hide');

            $.ajax({
                url: "/content/content/api/sys_contents_det/del",
                dataType: 'json',
                method: "POST",
                data: {
                    "contentsSno": contentsSno,
                    "contentsTitleNm": contentsTitleNm
                },
                success: function (data) {
                    $("#success-alert-modal").modal('show');
                    $("#success-alert-modal #title").html(i18n('management.contents.delete.pop.txt.title'));
                    $("#success-alert-modal #content").html(i18n('management.contents.delete.pop.txt.txt'));
                    //처음 생성할때 ajax만 새로고침
                    $('#contents-datatable').DataTable().ajax.reload();
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


function showContents(sno) {
    $("#contents-modal").modal("show")

	console.log(sno);
    // 팝업 호출
    var params = {"contentsSno": sno};
    $("#contents-modal > .modal-dialog").empty();
    $("#contents-modal > .modal-dialog").load("/content/content/modal/sys_contents_show", params, function() {
        $("#contents-modal").modal("show");
    });

}


function updateContents(flag, contentsSno){

    var newTitleMsg = $('#newTitleMsg').val();
    var modTitleMsg = $('#modTitleMsg').val();

    // 팝업 호출
	// console.log(contentsSno);
    var params = {};
    if(flag == "update") {
        params =  {
        		"contentsSno":contentsSno
        };
        $("#sys_content_update_flag").val(flag);
        $("#sys_content_contentsSno").val(contentsSno);
    }else{
        $("#sys_appoint_update_flag").val("");
        $("#sys_content_contentsSno").val("");
    }

    // $('#new_content_thumb_Dropzone')[0].dropzone.removeAllFiles();

    $("#sys_content_tab_2_area div").empty();
    $("#sys_content_tab_2_area div").load("/content/content/ins", params, function() {
        if(flag == "update") {
            $("#sys_content_tab_2").tab("show");
            $("#sys_content_tab_2 span").text(modTitleMsg);
        }else{
            $("#sys_content_tab_2 span").text(newTitleMsg);
        }
    });
}
