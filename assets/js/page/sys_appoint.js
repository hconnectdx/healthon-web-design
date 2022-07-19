$(document).ready(function () {
    $("#appoint-datatable").DataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages ",
            sSearch:"검색:",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기'
        },
        pageLength: 10,
        columns: [{orderable: !0,width:"220px"}, {orderable: !0,width:"560px"}, {orderable: !0}, {orderable: !0}, {orderable: !0}, {orderable: !1}],
        select: {style: "multi"},
        order: [[0, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        }
    });
    $("#appoint-modal-table").DataTable({
        scrollX: true,
        searching: false,
        lengthChange: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages "
        },
        columns: [{orderable: !0}, {orderable: !0}, {orderable: !1}],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        }
    });

    $(".summernote-basic").each(function() {
        $(this).summernote({
            placeholder: "Write something...",
            height: 230
        })
    })
});

function showAppointModal() {
    $("#appoint-modal").modal("show")
}