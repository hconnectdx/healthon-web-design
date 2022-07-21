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
    $("#contents-datatable").DataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch:"검색:",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기 '
        },
        pageLength: 10,
        columns: [{orderable: !0}, {orderable: !0,width:"600px"}, {orderable: !0,width:"150px"}, {orderable: !0,width:"200px"}, {orderable: !0,width:"200px"}, {orderable: !0,width:"100px"}, {orderable: !1,width:"150px"}],
        select: {style: "multi"},
        order: [[4, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
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
