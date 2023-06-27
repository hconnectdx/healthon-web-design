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

    $("#note-datatable").DataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch:"검색:",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기'
        },
        pageLength: 10,
        columns: [{orderable: !0}, {orderable: !0,width:"200px"}, {orderable: !0,width:"600px"}, {orderable: !0,width:"150px"},{orderable: !0,width:"150px"}, {orderable: !0,width:"220px"}, {orderable: !1,width:"150px"}],
        select: {style: "multi"},
        order: [[0, "desc"]],
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


    $("#getlist-datatable").DataTable({
        scrollX: false,
        lengthChange: false,
        searching: false,
        language: false,
        pageLength: 10,
        bPaginate: false,
        info: false,
        paging: false,
        columns: [{ 
            orderable: !1,
            render: function (e, t, o, l) 
            {
                return "display" === t && (e = '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>'), e
            },
            checkboxes: {
                selectRow: !0,
                selectAllRender: '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>'
            }
        }, 
        {orderable: !1, width:"10px"}],
        
        select: {style: "multi"},
        order: [],
        // drawCallback: function () {
        //     $(".dataTables_paginate > .pagination").removeClass("pagination-rounded float-right");
        // }
    })

    $("#agreement-getlist-datatable").DataTable({
        scrollX: false,
        lengthChange: false,
        searching: false,
        language: false,
        pageLength: 10,
        bPaginate: false,
        info: false,
        paging: false,
        columns: [{ 
            
            orderable: !1,
            render: function (e, t, o, l) 
            {
                return "display" === t && (e = '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>'), e
            },
            checkboxes: {
                selectRow: !0,
                selectAllRender: '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>'
            }
        }, 
        {orderable: !1}],
        
        select: {style: "multi"},
        order: [],
        // drawCallback: function () {
        //     $(".dataTables_paginate > .pagination").removeClass("pagination-rounded float-right");
        // }
    })




    
    
    $("#uploadFile").on('click',function(){
        $(this).parents(".card").remove();
    })
    
    $(".qstDelete").on('click',function(){
        $(this).parents(".card").remove();
    })
    
    $(".addQstBox").on('click', function() {
        $(this).parents(".card").clone().append();
    });

    $(".getQstBtn").on('click',function(){
        $("#get-qst-survey").css("display","block")
    });


    $(".getAgmBtn").on('click',function(){
        $("#get-agm-survey").css("display","block")
    });
 
 
    


    // 옵션박스 추가_단일선택_radiobox

    $("#addOptionBox").on('click', function() {
        $("#optionBox").clone().appendTo($("#optionBox").parent());
    });

    $("#addOptionEssentialBox").on('click', function() {
        $("#optionEssentialBox").clone().appendTo($("#optionEssentialBox").parent());
    });


    $("#addEtcBox").on('click', function() {
        $("#etcBox").clone().appendTo($("#etcBox").parent());
    });

    // 옵션박스 추가_복수선택_checkbox

    $("#addOptionBoxCheck").on('click', function() {
        $("#optionBoxCheckbox").clone().appendTo($("#optionBoxCheckbox").parent());
    });

    $("#addEtcBoxCheck").on('click', function() {
        $("#etcBoxCheckbox").clone().appendTo($("#etcBoxCheckbox").parent());
    });





    // 옵션박스 추가_List

    let test ='list';
    let i = 1;

    $("#addOptionList").click(function() {
        
        $('#'+ test);
        $("#optionList").clone().appendTo($("#optionList").parent());
        i++; 

    
    $("#addEtcBoxList").on('click', function() {
        $("#etcBoxList").clone().appendTo($("#etcBoxList").parent());
    });
        
    
    });

});
function note_register(){
    $("#note-register-modal").modal("show");
}

$(document).ready(function () {
    "use strict";
    $("#qstsurvey-datatable").DataTable({
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
        pageLength: 5,
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
        }
    })
});






$("#customCheckAgm1").click(function(){
    if($("#customCheckAgm1").prop("checked")) {
        $("input[type=checkbox]").prop("checked",true);
    } else { 
        $("input[type=checkbox]").prop("checked",false); 
    } 
})

$("#customCheckQst1").click(function(){
    if($("#customCheckQst1").prop("checked")) {
        $("input[type=checkbox]").prop("checked",true);
    } else { 
        $("input[type=checkbox]").prop("checked",false); 
    } 
})

$("#customCheckAgm1").click(function(){
    if($("#customCheckAgm1").prop("checked")) {
        $("input[type=checkbox]").prop("checked",true);
    } else { 
        $("input[type=checkbox]").prop("checked",false); 
    } 
})

$("#customCheck13").click(function(){
    if($("#customCheck13").prop("checked")) {
        $("input[type=checkbox]").prop("checked",true);
    } else { 
        $("input[type=checkbox]").prop("checked",false); 
    } 
})


$("#register-Btn").click(function() {
    $("#register-button").addClass("active")
    $("#surveyList-button").removeClass("active")
});

$("#register-Btn").click(function() {
    $("#register-agm").addClass("active")
    $("#list-agm").removeClass("active")
});


/////////// 글자수 제한

$(document).ready(function() {
    $('#titleInput').on('keyup', function() {
        $('#textLength').html(""+$(this).val().length+" / 50");
 
        if($(this).val().length > 50) {
            $(this).val($(this).val().substring(0, 50));
            $('#test_cnt').html("(50 / 50)");
        }
    });
});

$(document).ready(function() {
    $('#expInput').on('keyup', function() {
        $('#exptextLength').html(""+$(this).val().length+" / 50");
 
        if($(this).val().length > 50) {
            $(this).val($(this).val().substring(0, 50));
            $('#test_cnt').html("(50 / 50)");
        }
    });
  

    $("#essoptInput").on('keyup', function() {
        $("#esoptLength").html(""+$(this).val().length+" / 6");
 
        if($(this).val().length > 6) {
            $(this).val($(this).val().substring(0, 5));
            $("#test_cnt").html("(6 / 6)");
        }
    });

    $("#esoptInput_S").on('keyup', function() {
        $("#esoptLength_S").html(""+$(this).val().length+" / 6");
 
        if($(this).val().length > 6) {
            $(this).val($(this).val().substring(0, 5));
            $("#test_cnt").html("(6 / 6)");
        }
    });

    $('#optInput').on('keyup', function() {
        $('#optLength').html(""+$(this).val().length+" / 6");
 
        if($(this).val().length > 6) {
            $(this).val($(this).val().substring(0, 5));
            $('#test_cnt').html("(6 / 6)");
        }
    });

    $('#optInput_S').on('keyup', function() {
        $('#optLength_S').html(""+$(this).val().length+" / 6");
 
        if($(this).val().length > 6) {
            $(this).val($(this).val().substring(0, 5));
            $('#test_cnt').html("(6 / 6)");
        }
    });

    
    $('#min-label').on('keyup', function() {
        $('#minLabelLength').html(""+$(this).val().length+" / 10");
 
        if($(this).val().length > 10) {
            $(this).val($(this).val().substring(0, 10));
            $('#test_cnt').html("(10 / 10)");
        }
    });

    
    $('#max-label').on('keyup', function() {
        $('#maxLabelLength').html(""+$(this).val().length+" / 10");
 
        if($(this).val().length > 10) {
            $(this).val($(this).val().substring(0, 10));
            $('#test_cnt').html("(10 / 10)");
        }
    });
});


////////////달력 컨포넌트

$(function(){
    var  url = window.location.href;
    var url_a = url.split("#");
 
    if(url_a == url){
         url_a = "user_log";
    }else{
        url_a = url_a[1];
    }
 
    selectTag(url_a);
 
     var options = {
         "cancelClass": "btn-light",
         "applyButtonClasses": "btn-success",
         "startDate" : moment.localeData(),
         "endDate" : moment().add(5,'y'),
         "locale":{
             'direction': 'ltr',
             'format': 'YYYY/MM/DD',
             'separator': ' - ',
             'applyLabel': '확인',
             'cancelLabel': '취소',
             'weekLabel': 'W',
             'customRangeLabel': 'Custom Range',
             'daysOfWeek': moment.weekdaysMin(),
             'monthNames': moment.monthsShort(),
             'firstDay': moment.localeData().firstDayOfWeek()
         }
     };
     $("#singledaterange").daterangepicker(options);
 
     $("#check-wrapper .list-group-item-action").click(function(){
         $("#check-wrapper .list-group-item-action").removeClass("active");
         $(this).addClass("active");
     });
 });
 
 function selectTag(tag){
     var arr = ['user_log','total_log','check_result','question','consult','telehealth'];
     var index = -1;
     for(var i=0; i< arr.length; i++){
         if(tag == arr[i]){
             index = i;
         }
     }
 
     if(index != -1){
         $("#user_detail_tag .nav-link").removeClass("active");
         $("#user_detail_tag_content .tab-pane").removeClass("active");
 
         $("#user_detail_tag .nav-link").each(function(){
            if($(this).attr("href") == "#"+tag){
                $(this).addClass("active");
                $("#user_detail_tag_content #"+tag).addClass("active");
            }
         });
     }
 }
 
 
 colors = ["#7453ff", "#0acf97", "#fa5c7c", "#ffbc00"];
 (dataColors = $("#line-chart-datalabel").data("colors")) && (colors = dataColors.split(","));
 options = {
     chart: {height: 170, type: "line", zoom: {enabled: !0}, toolbar: {show: !0,offsetX:10}},
     colors: colors,
     dataLabels: {
         enabled: !0,
         style: {
             fontSize: "10px"
         }
     },
     stroke: {width: [3, 3], curve: "smooth"},
     series: [
         {
             name: "고혈압 ", data: [150, 90, 100, 123, 81, 110, 96]
         }, 
         {
             name: "저혈압",
             data: [22, 48, 40, 72, 44, 41, 54]
         }
     ],
 
     grid: {
         show: true,
         borderColor: "#e5e5e5",
         yaxis: {
             lines: {
                 show: true
             }
         },
         xaxis: {
             lines: {
                 show: true
             }
         }
     },
     markers: {style: "inverted", size: 6},
     xaxis: {categories: ["9/1", "9/2", "9/2", "9/10", "9/10", "9/11", "9/12"], title: {text: ""}},
     yaxis: {
         title: {text: ""},
         labels: {
             align: "left",
             offsetX: -30,
             minWidth: 60
         },
         max: 150,
         tickAmount: 5
     },
     tooltip: {
         followCursor: !1,
         marker: {show: !0},
         x: {
             formatter: function (e) {
                 return "2020-9-"+e;
             }
         },
         y: {
             formatter: function (e) {
                 return "<div>01일 ~ 02일</div><div> "+e+"회 발생</div>";
             }
         },
         style: {
                     fontSize: "11px",
                     fontFamily: "\"Spoqa Han Sans Regular\" sans-serif",
                     fontWeight: "normal"
                 }
     },
     legend: {position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5, show:false},
     responsive: [{breakpoint: 600, options: {chart: {toolbar: {show: !1}}, legend: {show: !1}}}]
 };
 (chart = new ApexCharts(document.querySelector("#line-chart-datalabel"), options)).render();
 
 (dataColors = $("#line-chart-datalabel1").data("colors")) && (colors = dataColors.split(","));
 options = {
     chart: {height: 170, type: "line", zoom: {enabled: !0}, toolbar: {show: !0,offsetX:10}},
     colors: colors,
     dataLabels: {
         enabled: !0,
         style: {
             fontSize: "10px"
         }    
     },
     stroke: {width: [3, 3], curve: "smooth"},
     series: [{name: "혈당 ", data: [170,260, 120, 320, 150, 180, 90]}, ],
 
     grid: {row: {colors: ["transparent", "transparent"], opacity: .2}, borderColor: "#f1f3fa"},
     markers: {style: "inverted", size: 6},
     xaxis: {categories: ["9/1", "9/2", "9/2", "9/10", "9/10", "9/11", "9/12"], title: {text: ""}},
     yaxis: {
         title: {text: ""},
         labels: {
             align: "left",
             offsetX: -30,
             minWidth: 60
         },
         max: 320,
         tickAmount: 4
     },
     legend: {position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5,show:false},
     responsive: [{breakpoint: 600, options: {chart: {toolbar: {show: !1}}, legend: {show: !1}}}],
     tooltip: {
         followCursor: !1,
         marker: {show: !1},
         x: {
             formatter: function (e) {
                 return "2020-9-"+e;
             }
         },
         y: {
                 formatter: function(e) {
                     return"<div>아침식전</div><div>매뉴얼 입력</div><div>어제 과음함</div>";
                 }
         },
          style: {
                     fontSize: "11px",
                     fontFamily: "\"Spoqa Han Sans Regular\" sans-serif",
                     fontWeight: "normal"
                 }
        
     },
 };
 (chart = new ApexCharts(document.querySelector("#line-chart-datalabel1"), options)).render();
 