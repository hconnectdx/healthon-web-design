$(document).ready(function () {
    $("#connhistory-datatable").DataTable({
        scrollX: true,
        searching: false,
        lengthChange: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
        },
        pageLength: 10,
        columns: [{orderable: !0}, {orderable: !0,width:"220px"}, {orderable: !0}, {orderable: !0}, {orderable: !1,width:"500px"}],
        select: {style: "multi"},
        order: [[0, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        }
    })

    $('#singledaterange').daterangepicker();
});
