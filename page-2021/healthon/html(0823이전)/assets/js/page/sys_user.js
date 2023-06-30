$(document).ready(function () {
    "use strict";
    $("#webuser-datatable").DataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch:"검색: <select class=\'form-control d-inline-block w-auto ml-1\'><option >전체</option></select>",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기 <a href="javascript:webuser_register();" class="btn btn-primary ml-2">웹 사용자 등록</a>'
        },
        pageLength: 10,
        columns: [{orderable: !0}, {orderable: !0,width:"220px"}, {orderable: !0,width:"220px"}, {orderable: !0}, {orderable: !0},{orderable: !0}, {orderable: !0}, {orderable: !1}],
        select: {style: "multi"},
        order: [[4, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        }
    })
});
function webuser_register(){
    $("#webuser-modal").modal("show");
}