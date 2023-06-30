$(document).ready(function () {
    $("#danger-datatable").DataTable({
        scrollX: true,
        searching: false,
        lengthChange: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch: "검색: <select class=\'form-control d-inline-block w-auto ml-1\'><option>전체</option></select>",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기 <a href="javascript:void(0);" class="btn btn-primary btn-sm ml-2">메시지 보내기</a>',
            emptyTable: "<div class='board-none'><i class='mdi mdi-account-search-outline font-48'></i> <p>조회를 원하는 그룹을 선택해주세요.</p></div>"
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
            }, width: "1%"
        }, { orderable: !0, width: "10%" }, { orderable: !0, width: "6%" }, { orderable: !0, width: "13%" }, { orderable: !0, width: "14%" }, { orderable: !0, width: "9%" }, { orderable: !0, width: "13%" }, { orderable: !0, width: "11%" }, { orderable: !1, width: "11%" }, { orderable: !1, width: "6%" }, { orderable: !1, width: "6%" }],
        select: { style: "multi" },
        order: [[4, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
        }
    })
});