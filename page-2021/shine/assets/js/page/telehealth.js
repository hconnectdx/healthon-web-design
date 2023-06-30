//////////////// 테이블 필터 및 페이지네이션 기능 ////////////////

$(document).ready(function () {
    $("#telehsitory-datatable").DataTable({
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
        columns: [{
            orderable: !0,
        }, { orderable: !0, width: "240px" }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0, width: "240px" }, { orderable: !0 }, { orderable: !0 }],
        select: { style: "multi" },
        order: [[0, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        }
    })
    

//////////////// 테이블 필터 및 페이지네이션 기능 ////////////////


$('#onDisplay').click(function(){
    if($(".modal-preview").css("display") == "none") {
        $('.modal-preview').show();
    } 
});


$(".surveyPreview").on('click',function(){
    $(".survey-preview-box").removeclass('invisible')
});


$('.viewResult').click(function(){
    if($(".result-preview").css("display") == "none") {
        $('.result-preview').show();
    } 
});

jQuery(function ($) {
    $('.image-gallery a').simpleLightbox({
        nextBtnClass: ' dripicons-chevron-right',
        nextBtnCaption: '',
        prevBtnClass: ' dripicons-chevron-left',
        prevBtnCaption: '',
    });

    $(".remove-image").on("click", function (e) {
        e.preventDefault()
        $(this).closest(".preview-item").remove()
    })
})


$(document).ready(function () {
    "use strict";
    var l = {
        chart: {type: "line", width: 80, height: 35, sparkline: {enabled: !0}},
        series: [],
        stroke: {width: 2, curve: "smooth"},
        markers: {size: 0},
        colors: ["#0acf97"],
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



    $("#survey-select-datatable").DataTable({
        screenY: true,
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch:"검색:",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="5">5</option><option value="10">10</option><option value="-1">All</option></select> 개 씩 보기 </a>'
        },
        pageLength: 5,
        columns: [{orderable: !0, width:"80px"}, {orderable: !0, width:"33px"}, {orderable: !0, width:"60px"}, {orderable: !0, width:"10px"}, {orderable: !0, width:"25px"},{orderable: !0, width:"40px"}, {orderable: !0, width:"10px"}, {orderable: !0, width:"30px"}],
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

    $("#survey-modify-datatable").DataTable({
        screenY: true,
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch:"검색:",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="5">5</option><option value="10">10</option><option value="-1">All</option></select> 개 씩 보기 </a>'
        },
        pageLength: 5,
        columns: [{orderable: !0, width:"80px"}, {orderable: !0, width:"33px"}, {orderable: !0, width:"60px"}, {orderable: !0, width:"10px"}, {orderable: !0, width:"25px"},{orderable: !0, width:"40px"}, {orderable: !0, width:"10px"}, {orderable: !0, width:"30px"}],
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

    $("#resultsurvey-datatable").DataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch:"검색:",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="5">5</option><option value="10">10</option><option value="-1">All</option></select> 개 씩 보기 </a>'
        },
        pageLength: 5,
        columns: [{orderable: !0}, {orderable: !0}, {orderable: !0}, {orderable: !0}, {orderable: !0}, {orderable: !1}],
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
});


