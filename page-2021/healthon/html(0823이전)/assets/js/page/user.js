$(document).ready(function () {
    "use strict";
    $("#products-datatable").DataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch: "검색: <select class=\'form-control d-inline-block w-auto ml-1\'><option >전체</option><option >상담</option><option >Video call</option></select>",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기 <a href="javascript:void(0);" class="btn btn-primary btn-sm ml-2">메시지 보내기</a>'
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
        { orderable: !0, width: "220px", render: $.fn.dataTable.render.ellipsis(18, true, true) }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !1 }, { orderable: !1 }],
        select: { style: "multi" },
        order: [[5, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
        }
    })
});