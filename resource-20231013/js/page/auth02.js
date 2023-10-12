$(document).ready(function () {
    "use strict";
    $("#auth-datatable").DataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch: "검색: <select class=\'form-control d-inline-block w-auto ml-1\'><option >그룹명</option><option ></option><option ></option></select><select class=\'form-control d-inline-block w-auto ml-1\'><option >전체</option><option >등록완료</option><option >미등록</option><option>등록취소</option><option>승인취소</option></select>",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기 <a href="javascript:void(0);" class="btn btn-primary btn-sm ml-2"><i class="pr-10 mdi mdi-send"></i>메시지 보내기</a>',
            emptyTable: "조회를 원하는 그룹을 선택해주세요."
        },
        pageLength: 10,
        columns: [{
            orderable: !1,
            render: function (e, t, o, l) {
                return "display" === t && (e = '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>'), e
            },
            checkboxes: {
                selectRow: !0,
                selectAllRender: '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>'
            }
        },
        { orderable: !0, width: "220px", render: $.fn.dataTable.render.ellipsis(18, true, true) }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !1 }, { orderable: !0 }],
        select: { style: "multi" },
        order: [[5, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
        }
    })
});