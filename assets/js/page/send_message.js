$(document).ready(function () {
    "use strict";
    $("#sendmsg-datatable").DataTable({
        scrollX: true,
        lengthChange: false,
        searching: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
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
        {orderable: !0},{orderable: !1}, {orderable: !1}, {orderable: !1}, {orderable: !1}],
        select: {style: "multi"},
        order: [[1, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
        }
    })
});

$(document).ready(function () {
    "use strict";
    $("#sendmsg-list-datatable").DataTable({
        scrollX: true,
        lengthChange: false,
        searching: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
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
        {orderable: !1,width:"260px"},{orderable: !1,width:"180px"}, {orderable: !1}, {orderable: !1,width:"180px"}, {orderable: !1,width:"180px"}],
        select: {style: "multi"},
        order: [[1, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
        }
    })
});