$(document).ready(function () {
    "use strict";
    var l = {
        chart: {type: "line", width: 80, height: 35, sparkline: {enabled: !0}},
        series: [],
        stroke: {width: 2, curve: "smooth"},
        markers: {size: 0},
        colors: ["#7453ff"],
        tooltip: {
            fixed: {enabled: !1}, x: {show: !1}, y: {
                title: {
                    formatter: function (e) {
                        return ""
                    }
                }
            }, marker: {show: !1}
        }
    }, s = [];
    $("#messages-datatable").DataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch:"검색: <select class=\'form-control d-inline-block w-auto ml-1\'><option>전체</option></select>",
            lengthMenu: '<select class=\'form-control\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기'
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
        }, {orderable: !0},{orderable: !0}, {orderable: !1}, {orderable: !1}, {orderable: !0,width:"300px"}],
        select: {style: "multi"},
        order: [[5, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
            for (var e = 0; e < s.length; e++) try {
                s[e].destroy()
            } catch (e) {
                console.log(e)
            }
            s = [], $(".spark-chart").each(function (e) {
                var t = $(this).data().dataset;
                l.series = [{data: t}];
                var o = new ApexCharts($(this)[0], l);
                s.push(o), o.render()
            })
        }
    })
});

$(document).ready(function () {
    "use strict";
    $("#messages-list-datatable").DataTable({
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
        columns: [{orderable: !1,width:"260px"},{orderable: !1,width:"180px"}, {orderable: !1}, {orderable: !1,width:"180px"}, {orderable: !1,width:"180px"}],
        select: {style: "multi"},
        order: [[1, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
        }
    })
});