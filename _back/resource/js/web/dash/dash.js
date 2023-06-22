$(function() {
   $('#cardBody').append($('<div>').load('/dash/body'));
});

// 누적가입자
function chartRegMonth(data) {

    let target = document.querySelector("#new-leads-chart");

    if (target) {

        let dataArray = [];
        let labelArray = [];

        $.map(data, function (item) {
            dataArray.push(item.regMonthCount);
            labelArray.push(item.regMonthDate);
        });

        colors = ["#7453ff", "#0acf97", "#fa5c7c", "#ffbc00"];
        (dataColors = $("#new-leads-chart").data("colors")) && (colors = dataColors.split(","));
        var options2 = {
            chart: {type: "line", height: 60, sparkline: {enabled: !0}},
            series: [{data: dataArray}],
            stroke: {width: 2, curve: "smooth"},
            markers: {size: 0},
            colors: colors,
            tooltip: {
                fixed: {enabled: !1}, x: {show: !1}, y: {
                    title: {
                        formatter: function (o) {
                            return ""
                        }
                    }
                }, marker: {show: !1}
            },
            yaxis: {
                labels: {
                    formatter: function (val, index) {
                        return Number(val.toFixed(0)).toLocaleString("en-US");
                    }
                }
            }
        };
        new ApexCharts(target, options2).render();
    }
}

// 신규가입자
function chartRegDay(data){

    let target = document.querySelector("#campaign-sent-chart");

    if (target) {

        let dataArray = [];
        let labelArray = [];

        $.map(data, function (item) {
            dataArray.push(item.regDayCount);
            labelArray.push(item.regDayDate)
        });

        var colors = ["#7453ff", "#0acf97", "#fa5c7c", "#ffbc00"];
        (dataColors = $("#campaign-sent-chart").data("colors")) && (colors = dataColors.split(","));
        var options1 = {
            chart: {type: "bar", height: 60, sparkline: {enabled: !0}},
            plotOptions: {bar: {columnWidth: "40%"}},
            colors: colors,
            series: [{data: dataArray}],
            labels: labelArray,
            xaxis: {crosshairs: {width: 1}},
            tooltip: {
                fixed: {enabled: !1}, x: {show: !1}, y: {
                    title: {
                        formatter: function (o) {
                            return ""
                        }
                    }
                }, marker: {show: !1}
            },
            yaxis: {
                labels: {
                    formatter: function (val, index) {
                        return Number(val.toFixed(0)).toLocaleString("en-US");
                    }
                }
            }
        };
        new ApexCharts(target, options1).render();
    }
}

// MAU
function chartMau(data) {

    let target = document.querySelector("#deals-chart");

    if (target) {

        let dataArray = [];
        let labelArray = [];

        $.map(data, function (item) {
            dataArray.push(item.mauCount);
            labelArray.push(item.mauDate)
        });

        colors = ["#7453ff", "#0acf97", "#fa5c7c", "#ffbc00"];
        (dataColors = $("#deals-chart").data("colors")) && (colors = dataColors.split(","));
        var options3 = {
            chart: {type: "line", height: 60, sparkline: {enabled: !0}},
            plotOptions: {bar: {columnWidth: "40%"}},
            colors: colors,
            series: [{data: dataArray}],
            labels: labelArray,
            stroke: {width: 2, curve: "smooth"},
            /*xaxis: {crosshairs: {width: 1}},*/
            tooltip: {
                fixed: {enabled: !1}, x: {show: !1}, y: {
                    title: {
                        formatter: function (o) {
                            return ""
                        }
                    }
                }, marker: {show: !1}
            },
            yaxis: {
                labels: {
                    formatter: function (val, index) {
                        return Number(val.toFixed(0)).toLocaleString("en-US");
                    }
                }
            }
        };
        new ApexCharts(target, options3).render();
    }
}

// DAU
function chartDau(data) {

    let target = document.querySelector("#booked-revenue-chart");

    if (target) {

        let dataArray = [];
        let labelArray = [];

        $.map(data, function (item) {
            dataArray.push(item.dauCount);
            labelArray.push(item.dauDate)
        });

        colors = ["#7453ff", "#0acf97", "#fa5c7c", "#ffbc00"];
        (dataColors = $("#booked-revenue-chart").data("colors")) && (colors = dataColors.split(","));
        var options4 = {
            chart: {type: "line", height: 60, sparkline: {enabled: !0}},
            plotOptions: {bar: {columnWidth: "60%"}},
            colors: colors,
            series: [{data: dataArray}],
            labels: labelArray,
            stroke: {width: 2, curve: "smooth"},
            /*xaxis: {crosshairs: {width: 1}},*/
            tooltip: {
                fixed: {enabled: !1}, x: {show: !1}, y: {
                    title: {
                        formatter: function (o) {
                            return ""
                        }
                    }
                }, marker: {show: !1}
            },
            yaxis: {
                labels: {
                    formatter: function (val, index) {
                        return Number(val.toFixed(0)).toLocaleString("en-US");
                    }
                }
            }
        };
        new ApexCharts(target, options4).render();
    }
}


// colors = ["#7453ff", "#0acf97", "#fa5c7c", "#ffbc00"];
// (dataColors = $("#dash-campaigns-chart").data("colors")) && (colors = dataColors.split(","));
// var options = {
//     chart: {height: 304, type: "radialBar"},
//     colors: colors,
//     series: [86, 36, 50],
//     labels: ["Total Sent", "Reached", "Opened"],
//     plotOptions: {radialBar: {track: {margin: 8}}}
// }, chart = new ApexCharts(document.querySelector("#dash-campaigns-chart"), options);
// chart.render();

// 누적/활성 사용자
function chartActiveYear(data) {

    let target = document.querySelector("#dash-revenue-chart");

    if (target) {

        $("#dash-revenue-chart").empty();

        let dataArray = [];

        $.map(data, function (item) {
            dataArray.push(item.userTotActCount);
        });

        colors = ["#7453ff", "#0acf97", "#fa5c7c", "#ffbc00"];
        (dataColors = $("#dash-revenue-chart").data("colors")) && (colors = dataColors.split(","));
        options = {
            chart: {height: 300, type: "line", toolbar: {show: !0}},
            stroke: {curve: "smooth", width: 2},
            series: [{
                name: "Total Revenue",
                type: "area",
                data: dataArray
            }],
            fill: {type: "solid", opacity: [.35, .35]},
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            markers: {size: 0},
            colors: colors,
            yaxis: [{title: {text: ""}, min: 0}],
            tooltip: {
                shared: !0, intersect: !1, y: {
                    formatter: function (o) {
                        return void 0 !== o ? o.toFixed(0) : o
                    }
                }
            },
            grid: {borderColor: "#f1f3fa", padding: {bottom: 5}},
            legend: {show: !1, fontSize: "14px", fontFamily: "14px", offsetY: 5},
            responsive: [{breakpoint: 600, options: {yaxis: {show: !1}, legend: {show: !1}}}]
        };
        (chart = new ApexCharts(target, options)).render();
    }
}
var ageSexChart;

// 사용자분포(연령별/성별)
function chartUserAgeSex(data,type) {

    let arguments1 = $('#msg-argument1').val();
    let arguments2 = $('#msg-argument2').val();
    let arguments3 = $('#msg-argument3').val();

    // $("#chartAgeSex").empty();

    if (ageSexChart) {
        ageSexChart.destroy();
        ageSexChart = null;
    }

    let countArray = [];
    let labelArray = [];
    let newCountArray;

    $.map(data, function (item) {
        countArray.push(Number(item.userCount));
        if(type === "sex"){
            labelArray.push(item.userSexClcd);
        }else{
            labelArray.push(item.userAge);
        }
    });

    let totalRealCount = 0;
    for(let i=0; i < countArray.length; i++){
        totalRealCount += countArray[i];
    }
    $("#totalRealUserCount").text(totalRealCount);

    if(type === "sex"){
        let msgMale = $('#msg-male').val();
        let msgFemale = $('#msg-female').val();

        newCountArray = [0,0];
        for(let i=0; i < labelArray.length; i++){
            let array = labelArray[i];
            if(array === "00101100"){ // 남자
                newCountArray[0] = countArray[i];
            }
            if(array === "00101200"){ // 여자
                newCountArray[1] = countArray[i];
            }
        }
        labelArray = [msgMale, msgFemale];
    }else{
        newCountArray = [0,0,0,0,0,0,0,0];
        for(let i=0; i < labelArray.length; i++){
            let array = labelArray[i];
            if(array < 20){ // 19세 이하
                newCountArray[7] = countArray[i];
            }
            if(array >= 20 && array < 30){ // 20대
                newCountArray[6] = countArray[i];
            }
            if(array >= 30 && array < 40){ // 30대
                newCountArray[5] = countArray[i];
            }
            if(array >= 40 && array < 50){ // 20대
                newCountArray[4] = countArray[i];
            }
            if(array >= 50 && array < 60){ // 20대
                newCountArray[3] = countArray[i];
            }
            if(array >= 60 && array < 70){ // 20대
                newCountArray[2] = countArray[i];
            }
            if(array >= 70 && array < 80){ // 20대
                newCountArray[1] = countArray[i];
            }
            if(array >= 80){ // 80세 이상
                newCountArray[0] = countArray[i];
            }
        }
        labelArray = [arguments1.replace("{0}", "80"), arguments2.replace("{0}", "70").replace("{1}", "79"), arguments2.replace("{0}", "60").replace("{1}", "69"), arguments2.replace("{0}", "50").replace("{1}", "59"), arguments2.replace("{0}", "40").replace("{1}", "49"), arguments2.replace("{0}", "30").replace("{1}", "39"), arguments2.replace("{0}", "20").replace("{1}", "29"), arguments3.replace("{0}", "19")];
    }

    colors = ["#008080"
        , "#800000"
        , "#ff00ff"
        , "#0acf97"
        , "#fa5c7c"
        , "#775DD0"
        , "#ffbc00"
        , "#39afd1"];
    (dataColors = $("#chartAgeSex").data("colors")) && (colors = dataColors.split(","));
    options = {
        chart: {height: 314, type: "donut"},
        series: newCountArray,
        legend: {
            show: !0,
            position: "bottom",
            horizontalAlign: "center",
            verticalAlign: "middle",
            floating: !1,
            fontSize: "13px",
            offsetX: 0,
            offsetY: 7
        },
        labels: labelArray,
        colors: colors,
        responsive: [{breakpoint: 600, options: {chart: {height: 280}, legend: {show: !1}}}]
    };
    (ageSexChart = new ApexCharts(document.querySelector("#chartAgeSex"), options)).render();
}