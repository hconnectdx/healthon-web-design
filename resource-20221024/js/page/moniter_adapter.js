$(document).ready(function () {
    $("#adapter-datatable").DataTable({
        scrollX: true,
        searching: false,
        lengthChange: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch:"검색: <select class=\'custom-select d-inline-block w-auto ml-1\'><option>전체</option></select>",
            lengthMenu: '<select class=\'custom-select custom-select-sm mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기 <a href="javascript:void(0);" class="btn btn-primary btn-sm ml-2">메시지 보내기</a>'
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
        }, {orderable: !0,width:"180px"}, {orderable: !0}, {orderable: !0}, {orderable: !0,width:"140px"}, {orderable: !0,width:"200px"}, {orderable: !0,width:"200px"}, {orderable: !0}, {orderable: !0}, {orderable: !1}, {orderable: !1}],
        select: {style: "multi"},
        order: [[4, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        }
    })
});