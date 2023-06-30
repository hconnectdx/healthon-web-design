$(function () {
	var url = window.location.href;
	var url_a = url.split("#");

	if (url_a == url) {
		url_a = "user_log";
	} else {
		url_a = url_a[1];
	}

	selectTag(url_a);

	function leadingZeros(n, digits) {
		var zero = "";
		n = n.toString();

		if (n.length < digits) {
			for (var i = 0; i < digits - n.length; i++) zero += "0";
		}
		return zero + n;
	}

	//일
	var options = {
		cancelClass: "btn-light",
		applyButtonClasses: "btn-success",
		locale: {
			direction: "ltr",
			format: "YYYY/MM/DD",
			separator: " - ",
			applyLabel: "확인",
			cancelLabel: "취소",
			weekLabel: "W",
			customRangeLabel: "Custom Range",
			daysOfWeek: moment.weekdaysMin(),
			monthNames: moment.monthsShort(),
			firstDay: moment.localeData().firstDayOfWeek(),
		},
	};
	$("#singledaterangeDay").daterangepicker(options);

	//주
	var startDate, endDate;

	$("#singledaterangeWeek")
		.datepicker({
			autoclose: true,
			format: "yyyy/mm/dd",
			forceParse: false,
		})
		.on("changeDate", function (e) {
			//console.log(e.date);
			var date = e.date;
			startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
			endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
			//$('#singledaterangeWeek').datepicker("setDate", startDate);
			$("#singledaterangeWeek").datepicker("update", startDate);
			$("#singledaterangeWeek").val(
				startDate.getFullYear() +
					"/" +
					leadingZeros(startDate.getMonth() + 1, 2) +
					"/" +
					startDate.getDate() +
					" - " +
					endDate.getFullYear() +
					"/" +
					leadingZeros(endDate.getMonth() + 1, 2) +
					"/" +
					endDate.getDate()
			);
		});

	var date = new Date();
	startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
	endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
	$("#singledaterangeWeek").datepicker("update", startDate);
	$("#singledaterangeWeek").val(
		startDate.getFullYear() +
			"/" +
			leadingZeros(startDate.getMonth() + 1, 2) +
			"/" +
			startDate.getDate() +
			" - " +
			endDate.getFullYear() +
			"/" +
			leadingZeros(endDate.getMonth() + 1, 2) +
			"/" +
			endDate.getDate()
	);

	//월
	$("#singledaterangeMonth").datepicker({
		autoclose: true,
		format: "yyyy/mm",
		startView: "months",
		minViewMode: "months",
	});

	$("#singledaterangeMonth").datepicker("update", startDate);
	$("#singledaterangeMonth").val(startDate.getFullYear() + "/" + leadingZeros(startDate.getMonth() + 1, 2));

	$("#check-wrapper .list-group-item-action").click(function () {
		$("#check-wrapper .list-group-item-action").removeClass("active");
		$(this).addClass("active");
	});

	$("#singledaterangeSelect").change(function (e) {
		if ($(this).val() === "day") {
			$("#singledaterangeSelect01").show();
			$("#singledaterangeSelect02").hide();
			$("#singledaterangeSelect03").hide();
		}
		if ($(this).val() === "week") {
			$("#singledaterangeSelect01").hide();
			$("#singledaterangeSelect02").show();
			$("#singledaterangeSelect03").hide();
		}
		if ($(this).val() === "month") {
			$("#singledaterangeSelect01").hide();
			$("#singledaterangeSelect02").hide();
			$("#singledaterangeSelect03").show();
		}
	});
});

function selectTag(tag) {
	var arr = ["user_log", "total_log", "check_result", "question", "consult", "telehealth"];
	var index = -1;
	for (var i = 0; i < arr.length; i++) {
		if (tag == arr[i]) {
			index = i;
		}
	}

	if (index != -1) {
		$("#user_detail_tag .nav-link").removeClass("active");
		$("#user_detail_tag_content .tab-pane").removeClass("active");

		$("#user_detail_tag .nav-link").each(function () {
			if ($(this).attr("href") == "#" + tag) {
				$(this).addClass("active");
				$("#user_detail_tag_content #" + tag).addClass("active");
			}
		});
	}
}

colors = ["#7453ff", "#0acf97", "#fa5c7c", "#ffbc00"];
(dataColors = $("#line-chart-datalabel").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 170, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [
		{
			name: "고혈압 ",
			data: [150, 90, 100, 123, 81, 110, 96],
		},
		{
			name: "저혈압",
			data: [22, 48, 40, 72, 44, 41, 54],
		},
	],

	grid: {
		show: true,
		borderColor: "#e5e5e5",
		yaxis: {
			lines: {
				show: true,
			},
		},
		xaxis: {
			lines: {
				show: true,
			},
		},
	},
	markers: { style: "inverted", size: 6 },
	xaxis: { categories: ["9/1", "9/2", "9/2", "9/10", "9/10", "9/11", "9/12"], title: { text: "" } },
	yaxis: {
		title: { text: "" },
		labels: {
			align: "left",
			offsetX: -30,
			minWidth: 60,
		},
		max: 150,
		tickAmount: 5,
	},
	tooltip: {
		followCursor: !1,
		marker: { show: !0 },
		x: {
			formatter: function (e) {
				return "2020-9-" + e;
			},
		},
		y: {
			formatter: function (e) {
				return "<div>01일 ~ 02일</div><div> " + e + "회 발생</div>";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector("#line-chart-datalabel"), options)).render();

(dataColors = $("#line-chart-datalabel1").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 170, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "혈당 ", data: [170, 260, 120, 320, 150, 180, 90] }],

	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: { categories: ["9/1", "9/2", "9/2", "9/10", "9/10", "9/11", "9/12"], title: { text: "" } },
	yaxis: {
		title: { text: "" },
		labels: {
			align: "left",
			offsetX: -30,
			minWidth: 60,
		},
		max: 320,
		tickAmount: 4,
	},
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		followCursor: !1,
		marker: { show: !1 },
		x: {
			formatter: function (e) {
				return "2020-9-" + e;
			},
		},
		y: {
			formatter: function (e) {
				return "<div>아침식전</div><div>매뉴얼 입력</div><div>어제 과음함</div>";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
};
(chart = new ApexCharts(document.querySelector("#line-chart-datalabel1"), options)).render();

(dataColors = $("#line-chart-datalabel2").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 170, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "혈당 ", data: [170, 260, 120, 320, 150, 180, 90, 190, 90, 190] }],

	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: { categories: ["16:01", "16:02", "16:03", "16:04", "16:05", "16:06", "16:07", "16:08", "16:09", "16:10"], title: { text: "" } },
	yaxis: {
		title: { text: "" },
		labels: {
			align: "left",
			offsetX: 0,
			minWidth: 0,
			show: false,
		},
		max: 320,
		tickAmount: 4,
	},
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	// tooltip: {
	// 	followCursor: !1,
	// 	marker: { show: !1 },
	// 	x: {
	// 		formatter: function (e) {
	// 			return "2020-9-" + e;
	// 		},
	// 	},
	// 	y: {
	// 		formatter: function (e) {
	// 			return "<div>아침식전</div><div>매뉴얼 입력</div><div>어제 과음함</div>";
	// 		},
	// 	},
	// 	style: {
	// 		fontSize: "11px",
	// 		fontFamily: '"Spoqa Han Sans Regular" sans-serif',
	// 		fontWeight: "normal",
	// 	},
	// },
};
(chart = new ApexCharts(document.querySelector("#line-chart-datalabel2"), options)).render();

var colors = ["#39afd1"],
	dataColors = $("#bar-chart1").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		annotations: {
			yaxis: [
				{
					y: 4550,
					borderColor: "#cfcd13",
					label: { borderColor: "#0acf97", style: { color: "#fff", background: "#0acf97" }, text: "" },
				},
			],
		},
		yaxis: { labels: { show: !1 } },
		chart: { height: 170, type: "bar", toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1 } },
		dataLabels: { enabled: !1 },
		series: [{ name: "식사", data: [4012, 1900, 3248, 4370, 2440, 3280, 4690] }],
		colors: colors,
		xaxis: { categories: ["9/1", "9/2", "9/3", "9/4", "9/5", "9/6", "9/7"] },
		states: { hover: { filter: "none" } },
		grid: { borderColor: "#f1f3fa" },
		tooltip: {
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return "2020-" + e;
				},
			},
			y: {
				formatter: function (e) {
					return "<div> " + e + " kcal</div><div> - 탄수화물 : 153g (59%)</div><div> - 지방 : 26g (26%)</div><div> - 나트륨 : 13g (13%)</div>";
				},
			},
			style: {
				fontSize: "11px",
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: "normal",
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#bar-chart1"), options);
chart.render();

(dataColors = $("#bar-chart-exercise").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 380, type: "bar", stacked: !0, toolbar: { show: !1 } },
	plotOptions: { bar: { horizontal: !1 } },
	stroke: { width: 1, colors: ["#fff"] },
	series: [
		{ name: "걷기", data: [44, 55, 41, 37, 22, 43, 21] },
		{
			name: "경운동",
			data: [53, 32, 33, 52, 13, 43, 32],
		},
	],
	xaxis: {
		categories: ["9/6", "9/7", "9/8", "9/9", "9/10", "9/11", "9/12"],
		labels: {
			formatter: function (e) {
				return e + "K";
			},
		},
	},
	colors: colors,
	dataLabels: { enabled: !0 },
	tooltip: {
		y: {
			formatter: function (e) {
				return e + "K";
			},
		},
	},
	title: { text: "", align: "left" },
	fill: { opacity: 1 },
	states: { hover: { filter: "none" } },
	legend: { position: "top", horizontalAlign: "center", offsetY: 10, show: false },
	grid: { borderColor: "#f1f3fa", padding: { top: 0 } },
};
(chart = new ApexCharts(document.querySelector("#bar-chart-exercise"), options)).render();
var colors = ["#39afd1"],
	dataColors = $("#bar-chart3").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		annotations: {
			yaxis: [
				{
					y: 9500,
					borderColor: "#cfcd13",
					label: { borderColor: "#0acf97", style: { color: "#fff", background: "#0acf97" }, text: "" },
				},
			],
		},
		chart: {
			height: 170,
			type: "bar",
			toolbar: { show: !0, offsetX: 10 },
		},
		plotOptions: { bar: { horizontal: !1 } },
		dataLabels: { enabled: !1 },
		series: [{ name: "걸음", data: [9512, 4600, 8648, 5470, 4240, 2880, 5490, 7240, 9280, 6490] }],
		colors: colors,
		xaxis: { categories: ["9/1", "9/2", "9/3", "9/4", "9/5", "9/6", "9/7", "9/8", "9/9", "9/10"] },
		yaxis: { labels: { show: !1 } },
		states: { hover: { filter: "none" } },
		grid: { borderColor: "#f1f3fa" },
		tooltip: {
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return "2020-" + e;
				},
			},
			y: {
				formatter: function (e) {
					return "<div> " + e + " 걸음</div>";
				},
			},
			style: {
				fontSize: "11px",
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: "normal",
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#bar-chart3"), options);
chart.render();

var colors = ["#39afd1"],
	dataColors = $("#line-chart-a").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		chart: {
			height: 80,
			type: "line",
			sparkline: {
				enabled: 1,
			},
		},
		colors: colors,
		series: [
			{
				data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
			},
		],
		labels: [""],

		stroke: {
			width: 2,
			curve: "smooth",
		},
		tooltip: {
			fixed: {
				enabled: !1,
			},
			x: {
				show: !1,
			},
			y: {
				title: {
					formatter: function (o) {
						return "";
					},
				},
			},
			marker: {
				show: !1,
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#line-chart-a"), options);
chart.render();

var colors = ["#39afd1"],
	dataColors = $("#pie-chart2").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		chart: { height: 150, type: "radialBar" },
		colors: colors,
		series: [94.3],
		labels: [""],

		plotOptions: {
			radialBar: {
				dataLabels: {
					name: { name: { show: !0 }, fontSize: "14px", color: "#ff0", offsetY: 100 },
					value: {
						offsetY: -5,
						fontSize: "24px",
						color: "#880",
						formatter: function (o) {
							return o + "%";
						},
					},
				},
				hollow: { size: "76%" },
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#pie-chart2"), options);
chart.render();

var colors = ["#7453ff", "#0acf97", "#fa5c7c"],
	dataColors = $("#insullin-chart").data("colors");
dataColors && (colors = dataColors.split(","));

var options = {
		chart: { height: 170, type: "bar", toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, endingShape: "rounded", columnWidth: "55%" } },
		dataLabels: { enabled: !1 },
		stroke: {
			show: !0,
			width: 2,
			colors: ["transparent"],
		},
		colors: colors,

		series: [
			{
				name: "권고용량",
				data: [6, 8, 6.5, 7, 10, 8, 6, 9, 10],
			},
			{
				name: "투여용량",
				data: [5, 9, 10, 11, 5, 4, 6, 7, 8],
			},
		],
		xaxis: { categories: ["9/6", "9/7", "9/8", "9/9", "9/10", "9/11", "9/12", "9/13", "9/14"] },
		legend: { offsetY: 7, show: false },
		yaxis: { labels: { show: !1 } },
		fill: { opacity: 1 },
		grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa", padding: { bottom: 5 } },
		tooltip: {
			y: {
				formatter: function (o) {
					return o + " Unit";
				},
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#insullin-chart"), options);
chart.render();

if ($("#insullin-chart-empty").length > 0) {
	var colors = ["#0acf97", "#7453ff", "#fa5c7c"],
		dataColors = $("#insullin-chart-empty").data("colors");
	dataColors && (colors = dataColors.split(","));

	var emptyOptions = {
			chart: { height: 170, type: "bar", toolbar: { show: !0, offsetX: 10 } },
			plotOptions: { bar: { horizontal: !1, endingShape: "rounded", columnWidth: "33%" } },
			dataLabels: { enabled: !1 },
			stroke: { show: !0, width: 2, colors: ["transparent"] },
			colors: colors,
			series: [
				{
					name: "투여용량",
					data: [5, 9, 10, 11, 5, 4, 6, 7, 8],
				},
			],
			xaxis: { categories: ["9/6", "9/7", "9/8", "9/9", "9/10", "9/11", "9/12", "9/13", "9/14"] },
			legend: { offsetY: 7, show: false },
			yaxis: { labels: { show: !1 } },
			fill: { opacity: 1 },
			grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa", padding: { bottom: 5 } },
			tooltip: {
				y: {
					formatter: function (o) {
						return o + " Unit";
					},
				},
			},
		},
		chart = new ApexCharts(document.querySelector("#insullin-chart-empty"), emptyOptions);
	chart.render();
}

var colors = ["#7453ff", "#0acf97", "#fa5c7c"],
	dataColors = $("#basic-column1").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		chart: { height: 170, type: "bar", toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, endingShape: "rounded", columnWidth: "55%" } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 2, colors: ["transparent"] },
		colors: colors,

		series: [
			{ name: "목표수면", data: [6, 8, 6.5, 7, 10, 8, 6, 9, 10] },
			{
				name: "기록수면",
				data: [5, 9, 10, 11, 5, 4, 6, 7, 8],
			},
		],
		xaxis: { categories: ["9/6", "9/7", "9/8", "9/9", "9/10", "9/11", "9/12", "9/13", "9/14"] },
		legend: { offsetY: 7, show: false },
		yaxis: { labels: { show: !1 } },
		fill: { opacity: 1 },
		grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa", padding: { bottom: 5 } },
		tooltip: {
			y: {
				formatter: function (o) {
					return o + " 시간";
				},
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#basic-column1"), options);
chart.render();

if ($("#basic-column1-empty").length > 0) {
	var colors = ["#0acf97", "#7453ff", "#fa5c7c"],
		dataColors = $("#basic-column1-empty").data("colors");
	dataColors && (colors = dataColors.split(","));
	var options = {
			chart: { height: 170, type: "bar", toolbar: { show: !0, offsetX: 10 } },
			plotOptions: { bar: { horizontal: !1, endingShape: "rounded", columnWidth: "33%" } },
			dataLabels: { enabled: !1 },
			stroke: { show: !0, width: 2, colors: ["transparent"] },
			colors: colors,
			series: [
				{
					name: "기록수면",
					data: [6, 8, 6.5, 7, 10, 8, 6, 9, 10],
				},
			],
			xaxis: { categories: ["9/6", "9/7", "9/8", "9/9", "9/10", "9/11", "9/12", "9/13", "9/14"] },
			legend: { offsetY: 7, show: false },
			yaxis: { labels: { show: !1 } },
			fill: { opacity: 1 },
			grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa", padding: { bottom: 5 } },
			tooltip: {
				y: {
					formatter: function (o) {
						return o + " 시간";
					},
				},
			},
		},
		chart = new ApexCharts(document.querySelector("#basic-column1-empty"), options);
	chart.render();
}

(dataColors = $("#line-chart-01").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: {
		height: 148,
		type: "line",
		id: "yt",
		group: "group-1",
	},
	colors: colors,
	dataLabels: { enabled: !1 },
	toolbar: { tools: { selection: !1 } },
	tooltip: {
		followCursor: !1,
		theme: "dark",
		x: { show: !1 },
		marker: { show: !1 },
		y: {
			title: {
				formatter: function () {
					return "";
				},
			},
		},
	},
	title: {
		text: "심박수",
		align: "left",
		style: {
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			color: "#808b96",
		},
	},
	stroke: { width: [3], curve: "smooth" },
	series: [{ data: generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, { min: 10, max: 60 }) }],
	fill: { gradient: { enabled: !0, opacityFrom: 0.6, opacityTo: 0.8 } },
	legend: { position: "top", horizontalAlign: "left" },
	xaxis: { type: "datetime" },
	yaxis: {
		labels: {
			minWidth: 30,
		},
	},
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
};
function generateDayWiseTimeSeries(e, t, a) {
	for (var o = 0, r = []; o < t; ) {
		var s = e,
			n = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
		r.push([s, n]), (e += 864e5), o++;
	}
	return r;
}
(chart = new ApexCharts(document.querySelector("#line-chart-01"), options)).render();

(dataColors = $("#line-chart-02").data("colors")) && (colors = dataColors.split(","));
var optionsline2 = {
		chart: {
			type: "line",
			height: 148,
			id: "fb",
			group: "group-1",
		},
		colors: colors,
		stroke: { width: [3], curve: "straight" },
		toolbar: { tools: { selection: !1 } },
		fill: { opacity: 1 },
		tooltip: {
			followCursor: !1,
			theme: "dark",
			x: { show: !1 },
			marker: { show: !1 },
			y: {
				title: {
					formatter: function () {
						return "";
					},
				},
			},
		},
		title: {
			text: "산소포화도",
			align: "left",
			style: {
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				color: "#808b96",
			},
		},
		series: [{ data: generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, { min: 10, max: 30 }) }],
		xaxis: { type: "datetime" },
		yaxis: {
			labels: {
				minWidth: 30,
			},
		},
		grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	},
	chartline2 = new ApexCharts(document.querySelector("#line-chart-02"), optionsline2);
chartline2.render();

(dataColors = $("#line-chart-03").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: {
		height: 148,
		type: "line",
		id: "yt",
		group: "group-1",
	},
	colors: colors,
	dataLabels: { enabled: !1 },
	toolbar: { tools: { selection: !1 } },
	tooltip: {
		followCursor: !1,
		theme: "dark",
		x: { show: !1 },
		marker: { show: !1 },
		y: {
			title: {
				formatter: function () {
					return "";
				},
			},
		},
	},
	title: {
		text: "체온",
		align: "left",
		style: {
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			color: "#808b96",
		},
	},
	stroke: { width: [3], curve: "smooth" },
	series: [{ data: generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, { min: 10, max: 60 }) }],
	fill: { gradient: { enabled: !0, opacityFrom: 0.6, opacityTo: 0.8 } },
	legend: { position: "top", horizontalAlign: "left" },
	xaxis: { type: "datetime" },
	yaxis: {
		labels: {
			minWidth: 30,
		},
	},
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
};
function generateDayWiseTimeSeries(e, t, a) {
	for (var o = 0, r = []; o < t; ) {
		var s = e,
			n = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
		r.push([s, n]), (e += 864e5), o++;
	}
	return r;
}
(chart = new ApexCharts(document.querySelector("#line-chart-03"), options)).render();

(dataColors = $("#line-chart-04").data("colors")) && (colors = dataColors.split(","));
var optionsline2 = {
		chart: {
			type: "line",
			height: 148,
			id: "fb",
			group: "group-1",
		},
		colors: colors,
		stroke: { width: [3], curve: "straight" },
		toolbar: { tools: { selection: !1 } },
		fill: { opacity: 1 },
		tooltip: {
			followCursor: !1,
			theme: "dark",
			x: { show: !1 },
			marker: { show: !1 },
			y: {
				title: {
					formatter: function () {
						return "";
					},
				},
			},
		},
		title: {
			text: "걷기",
			align: "left",
			style: {
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				color: "#808b96",
			},
		},
		series: [{ data: generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, { min: 10, max: 30 }) }],
		xaxis: { type: "datetime" },
		yaxis: {
			labels: {
				minWidth: 30,
			},
		},
		grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	},
	chartline2 = new ApexCharts(document.querySelector("#line-chart-04"), optionsline2);
chartline2.render();

(dataColors = $("#line-chart-11").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 270, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 45 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "", data: [12, 11, 14, 18, 17, 13, 13] }],
	title: { text: "측정일자별 결과", align: "left" },
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: { categories: ["9/1", "9/2", "9/3", "9/4", "9/5", "9/6", "9/7"], title: { text: "" } },
	yaxis: { title: { text: "" }, min: 5, max: 23 },
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		followCursor: !1,
		marker: { show: !1 },
		x: {
			formatter: function (e) {
				return "2020-9-" + e;
			},
		},
		y: {
			formatter: function (e) {
				return "<div>10:12</div><div>" + e + "mg/dL</div> <div>직접입력</div><div>어제 과음함</div>";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
};
(chart = new ApexCharts(document.querySelector("#line-chart-11"), options)).render();

(dataColors = $("#line-chart-12").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 270, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 45 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "", data: [12, 11, 14, 18, 17, 13, 13] }],
	title: { text: "측정시간별 결과", align: "left" },
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: { categories: ["9/1", "9/2", "9/3", "9/4", "9/5", "9/6", "9/7"], title: { text: "" } },
	yaxis: { title: { text: "" }, min: 5, max: 23 },
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		followCursor: !1,
		marker: { show: !1 },
		x: {
			formatter: function (e) {
				return "2020-5-" + e;
			},
		},
		y: {
			formatter: function (e) {
				return "<div>10:12</div><div> " + e + "mg/dL</div> <div>직접입력</div><div>식사를 거름</div><div>어제 과음함</div>";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
};
(chart = new ApexCharts(document.querySelector("#line-chart-12"), options)).render();

(dataColors = $("#line-chart-p1").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 270, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 45 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [
		{ name: "고혈압", data: [28, 29, 33, 36, 32, 32, 33, 36, 32, 32, 33] },
		{
			name: "저혈압",
			data: [12, 11, 14, 18, 17, 13, 13, 18, 17, 13, 13],
		},
	],
	title: { text: "측정일자별 결과", align: "left" },
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: { categories: ["9/1", "9/2", "9/3", "9/4", "9/5", "9/6", "9/7", "9/8", "9/9", "9/10", "9/11", "9/12", "9/13"], title: { text: "" } },
	yaxis: { title: { text: "" }, min: 5, max: 40 },
	tooltip: {
		followCursor: !1,
		marker: { show: !0 },
		x: {
			formatter: function (e) {
				return "2020-9-" + e;
			},
		},
		y: {
			formatter: function (e) {
				return "<div>01일 ~ 02일</div><div> " + e + "회 발생</div>";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector("#line-chart-p1"), options)).render();

var colors = ["#7453ff", "#0acf97", "#fa5c7c"],
	dataColors = $("#line-chart-p2").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		chart: { height: 270, type: "bar", zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, endingShape: "rounded", columnWidth: "55%" } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 2, colors: ["transparent"] },
		colors: colors,
		title: { text: "측정시간별 결과", align: "left" },
		series: [
			{ name: "저혈압", data: [66, 44, 55, 57, 56, 61, 58, 63, 60, 44, 55, 57, 56, 57, 56, 57, 56, 61, 58, 63, 60, 46] },
			{
				name: "고혈압",
				data: [94, 76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101, 98, 87, 114, 94, 76, 85, 101, 98, 87],
			},
		],
		xaxis: {
			categories: [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"13",
				"14",
				"15",
				"16",
				"17",
				"18",
				"19",
				"20",
				"21",
				"22",
				"23",
				"24",
				"25",
				"26",
				"27",
				"28",
				"29",
				"30",
			],
		},
		legend: { offsetY: 7, show: false },
		yaxis: { title: { text: "" }, show: !1 },
		fill: { opacity: 1 },
		grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#fff3fa", padding: { bottom: 5 } },
		tooltip: {
			followCursor: !1,
			marker: { show: !0 },
			x: {
				formatter: function (e) {
					return "2020-9-" + e;
				},
			},
			y: {
				formatter: function (e) {
					return "<div>AM 0H ~ 1H</div><div> " + e + "회 발생</div>";
				},
			},
			style: {
				fontSize: "11px",
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: "normal",
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#line-chart-p2"), options);
chart.render();

(dataColors = $("#line-chart-weight").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 380, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	toolbar: { tools: { selection: !1 } },
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [
		{ name: "직접입력 ", data: [60, 90, 70, 123, 81, 83, 79] },
		{
			name: "Low ",
			data: [20, 30, 40, 23, 31, 23, 39],
		},
	],
	title: { text: "", align: "left" },
	// tooltip: {
	//     followCursor: !1, theme: "dark", x: {show: !1}, marker: {show: !1}, y: {
	//         title: {
	//             formatter: function (o) {
	//                 return "2020-5-12";
	//             }
	//         }
	//     }
	// },
	tooltip: {
		x: {
			formatter: function (e) {
				return "2020-05-22";
			},
		},
		y: {
			formatter: function (o) {
				return o + "kg";
			},
		},
	},
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], title: { text: "" } },
	yaxis: { title: { text: "Weight" }, min: 5, max: 150 },
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector("#line-chart-weight"), options)).render();

(dataColors = $("#line-chart-temperature").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 380, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "체온 ", data: [36.3, 37.4, 36.5, 36.9, 37.1, 38, 36.2] }],
	title: { text: "일 3회측정", align: "left" },
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: { categories: ["15", "16", "17", "18", "19", "21", "22"], title: { text: "" } },
	yaxis: { title: { text: "Temperature" }, min: 35, max: 42 },
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		y: {
			formatter: function (o) {
				return o + " ℃";
			},
		},
	},
};
(chart = new ApexCharts(document.querySelector("#line-chart-temperature"), options)).render();

(dataColors = $("#line-chart-wc").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 200, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "허리둘레 ", data: [60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 51, 64, 79] }],
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: {
		categories: [
			"22:00",
			"22:01",
			"22:02",
			"22:03",
			"22:04",
			"22:05",
			"22:06",
			"22:07",
			"22:08",
			"22:09",
			"22:10",
			"22:11",
			"22:12",
			"22:13",
			"22:14",
			"22:15",
			"22:16",
			"22:17",
			"22:18",
			"22:19",
			"22:20",
			"22:21",
			"22:22",
		],
		title: { text: "" },
	},
	yaxis: {
		min: 0,
		max: 100,
		labels: {
			align: "left",
			offsetX: 0,
			minWidth: 0,
			show: false,
		},
	},
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		y: {
			formatter: function (e) {
				return "<div>산소포화도: " + e + "%<br />기기명: SHINE1234</div>";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
};
(chart = new ApexCharts(document.querySelector("#line-chart-wc"), options)).render();

(dataColors = $("#line-chart-wc02").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 200, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "허리둘레 ", data: [60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 51, 64, 79] }],
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: {
		categories: [
			"22:00",
			"22:01",
			"22:02",
			"22:03",
			"22:04",
			"22:05",
			"22:06",
			"22:07",
			"22:08",
			"22:09",
			"22:10",
			"22:11",
			"22:12",
			"22:13",
			"22:14",
			"22:15",
			"22:16",
			"22:17",
			"22:18",
			"22:19",
			"22:20",
			"22:21",
			"22:22",
		],
		title: { text: "" },
	},
	yaxis: {
		min: 0,
		max: 100,
		labels: {
			align: "left",
			offsetX: 0,
			minWidth: 0,
			show: false,
		},
	},
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		y: {
			formatter: function (e) {
				return "<div>산소포화도: " + e + "%";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
};
(chart = new ApexCharts(document.querySelector("#line-chart-wc02"), options)).render();

var colors = ["#39afd1"],
	dataColors = $("#basic-radialbar").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		chart: { height: 253, type: "radialBar" },
		plotOptions: {
			radialBar: {
				dataLabels: {
					name: { name: { show: !0 }, fontSize: "24px", color: "#65757d", offsetY: 5 },
					value: {
						offsetY: -5,
						fontSize: "14px",
						color: "#65757d",
						offsetY: 15,
						formatter: function (o) {
							return "mmHg";
						},
					},
				},
				hollow: { size: "70%" },
			},
		},
		colors: colors,
		series: [70],
		labels: ["120/95"],
	},
	chart = new ApexCharts(document.querySelector("#basic-radialbar"), options);
chart.render();

var colors = ["#39afd1"],
	dataColors = $("#line-chart-meal").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		annotations: {
			yaxis: [
				{
					y: 4550,
					borderColor: "#cfcd13",
					label: { borderColor: "#0acf97", style: { color: "#fff", background: "#0acf97" }, text: "" },
				},
			],
		},

		chart: { height: 280, type: "bar", toolbar: { show: !1 } },
		plotOptions: { bar: { horizontal: !1 } },
		dataLabels: { enabled: !1 },
		series: [{ name: "", data: [2412, 3600, 4748, 3870, 2240, 3280, 4690, 3812, 4200, 4748, 3470, 3040, 2880, 3390, 3912, 4200, 4748, 3770, 3112, 3600] }],
		colors: colors,
		xaxis: {
			categories: [
				"9/1",
				"9/2",
				"9/3",
				"9/4",
				"9/5",
				"9/6",
				"9/7",
				"9/8",
				"9/9",
				"9/10",
				"9/11",
				"9/12",
				"9/13",
				"9/14",
				"9/15",
				"9/16",
				"9/17",
				"9/18",
				"9/19",
				"9/20",
			],
			title: { text: "" },
		},
		states: { hover: { filter: "none" } },
		grid: { borderColor: "#f1f3fa" },
		title: { text: "일 4,550 kcal", align: "left" },
		tooltip: {
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return "2020-" + e;
				},
			},
			y: {
				formatter: function (e) {
					return "<div> " + e + " kcal</div><div> - 탄수화물 : 153g (59%)</div><div> - 지방 : 25g (26%)</div> <div> - 나트륨 : 13g (25%)</div>";
				},
			},
			style: {
				fontSize: "11px",
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: "normal",
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#line-chart-meal"), options);
chart.render();

var colors = ["#7453ff", "#0acf97"],
	dataColors = $("#line-chart-walking").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		chart: { height: 280, type: "line", toolbar: { show: !1 } },
		series: [
			{ name: "거리", type: "column", data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160] },
			{ name: "소비칼로리", type: "line", data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16] },
		],
		stroke: { width: [0, 4] },
		labels: [
			"01 Jan 2001",
			"02 Jan 2001",
			"03 Jan 2001",
			"04 Jan 2001",
			"05 Jan 2001",
			"06 Jan 2001",
			"07 Jan 2001",
			"08 Jan 2001",
			"09 Jan 2001",
			"10 Jan 2001",
			"11 Jan 2001",
			"12 Jan 2001",
		],
		xaxis: { type: "datetime" },
		colors: colors,
		yaxis: [{ title: { text: "걸음수" } }, { opposite: !0, title: { text: "소비 칼로리" } }],
		legend: { offsetY: 7 },
		grid: { borderColor: "#f1f3fa", padding: { bottom: 5 } },
	},
	chart = new ApexCharts(document.querySelector("#line-chart-walking"), options);
chart.render();

var colors = ["#7453ff", "#0acf97", "#fa5c7c"],
	dataColors = $("#line-chart-sleep").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		chart: { height: 380, type: "bar", toolbar: { show: !0 } },
		plotOptions: { bar: { horizontal: !1, endingShape: "rounded", columnWidth: "55%" } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 2, colors: ["transparent"] },
		colors: colors,
		title: { text: "", align: "left" },
		series: [
			{ name: "목표수면", data: [6, 8, 6.5, 7, 10, 8, 6, 9, 10] },
			{
				name: "기록수면",
				data: [5, 9, 10, 11, 5, 4, 6, 7, 8],
			},
		],
		xaxis: { categories: ["9/6", "9/7", "9/8", "9/9", "9/10", "9/11", "9/12", "9/13", "9/14"] },
		legend: { offsetY: 7, show: false },
		yaxis: { title: { text: "" } },
		fill: { opacity: 1 },
		grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa", padding: { bottom: 5 } },
		tooltip: {
			y: {
				formatter: function (o) {
					return o + " 시간";
				},
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#line-chart-sleep"), options);
chart.render();

var colors = ["#7453ff", "#0acf97", "#fa5c7c"],
	dataColors = $("#insullin-detail-chart").data("colors");
dataColors && (colors = dataColors.split(","));
options = {
	chart: {
		height: 380,
		type: "line",
		stacked: !1,
		toolbar: {
			show: !1,
		},
	},
	dataLabels: {
		enabled: !1,
	},
	stroke: {
		width: [0, 0, 3],
	},
	series: [
		{
			name: "권고용량",
			type: "column",
			data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
		},
		{
			name: "투여용량",
			type: "column",
			data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
		},
		{
			name: "혈당(아침식전)",
			type: "line",
			data: [20, 29, 37, 36, 44, 45, 50, 58],
		},
	],
	colors: colors,
	xaxis: {
		categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
	},
	yaxis: [
		{
			axisTicks: {
				show: !0,
			},
			axisBorder: {
				show: !0,
				color: colors[0],
			},
			labels: {
				style: {
					color: colors[0],
				},
			},
			title: {
				text: "환자 투여 용량",
				style: {
					fontSize: "14px",
					fontFamily: '"Spoqa Han Sans Regular" sans-serif',
					fontWeight: "normal",
				},
			},
		},
		{
			axisTicks: {
				show: !0,
			},
			axisBorder: {
				show: !0,
				color: colors[1],
			},
			labels: {
				style: {
					color: colors[1],
				},
				offsetX: 10,
			},
			title: {
				text: "의료진 권고 용량",
				style: {
					fontSize: "14px",
					fontFamily: '"Spoqa Han Sans Regular" sans-serif',
					fontWeight: "normal",
				},
			},
		},
		{
			opposite: !0,
			axisTicks: {
				show: !0,
			},
			axisBorder: {
				show: !0,
				color: colors[2],
			},
			labels: {
				style: {
					color: colors[2],
				},
			},
			title: {
				text: "아침 식전 셜당",
				style: {
					fontSize: "14px",
					fontFamily: '"Spoqa Han Sans Regular" sans-serif',
					fontWeight: "normal",
				},
			},
		},
	],
	tooltip: {
		y: {
			formatter: function (o) {
				return o + " Unit";
			},
		},
	},
	grid: {
		borderColor: "#f1f3fa",
		padding: {
			bottom: 5,
		},
	},
	legend: {
		offsetY: 7,
	},
	responsive: [
		{
			breakpoint: 600,
			options: {
				yaxis: {
					show: !1,
				},
				legend: {
					show: !1,
				},
			},
		},
	],
};
(chart = new ApexCharts(document.querySelector("#insullin-detail-chart"), options)).render();

var colors = ["#7453ff", "#0acf97"],
	dataColors = $("#exercise-video-detail-chart").data("colors");
dataColors && (colors = dataColors.split(","));
options = {
	chart: {
		height: 380,
		type: "line",
		stacked: !1,
		toolbar: {
			show: !1,
		},
	},
	dataLabels: {
		enabled: !1,
	},
	stroke: {
		width: [0, 3],
	},
	series: [
		{
			name: "동영상 시청시간",
			type: "column",
			data: [420, 450, 400, 700, 200, 410, 180, 370, 450, 350, 300, 180],
		},
		{
			name: "소비 칼로리",
			type: "line",
			data: [20, 29, 37, 36, 44, 45, 50, 58, 30, 42, 22, 19],
		},
	],
	colors: colors,
	xaxis: {
		categories: ["Jan 01", "Jan 02", "Jan 03", "Jan 04", "Jan 05", "Jan 06", "Jan 07", "Jan 08", "Jan 09", "Jan 10", "Jan 11", "Jan 12"],
	},
	yaxis: [
		{
			axisTicks: {
				show: !0,
			},
			axisBorder: {
				show: !0,
				color: colors[0],
			},
			labels: {
				style: {
					color: colors[0],
				},
			},
			title: {
				text: "동영상 시청시간(분)",
				style: {
					fontSize: "14px",
					fontFamily: '"Spoqa Han Sans Regular" sans-serif',
					fontWeight: "normal",
				},
			},
		},
		{
			opposite: !0,
			axisTicks: {
				show: !0,
			},
			axisBorder: {
				show: !0,
				color: colors[1],
			},
			labels: {
				style: {
					color: colors[1],
				},
			},
			title: {
				text: "소비 칼로리(kcal)",
				style: {
					fontSize: "14px",
					fontFamily: '"Spoqa Han Sans Regular" sans-serif',
					fontWeight: "normal",
				},
			},
		},
	],
	grid: {
		borderColor: "#f1f3fa",
		padding: {
			bottom: 5,
		},
	},
	legend: {
		offsetY: 7,
	},
	responsive: [
		{
			breakpoint: 600,
			options: {
				yaxis: {
					show: !1,
				},
				legend: {
					show: !1,
				},
			},
		},
	],
};
(chart = new ApexCharts(document.querySelector("#exercise-video-detail-chart"), options)).render();

(dataColors = $("#oxygen-line").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 200, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "허리둘레 ", data: [60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 51, 64, 79] }],
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: {
		categories: [
			"22:00",
			"22:01",
			"22:02",
			"22:03",
			"22:04",
			"22:05",
			"22:06",
			"22:07",
			"22:08",
			"22:09",
			"22:10",
			"22:11",
			"22:12",
			"22:13",
			"22:14",
			"22:15",
			"22:16",
			"22:17",
			"22:18",
			"22:19",
			"22:20",
			"22:21",
			"22:22",
		],
		title: { text: "" },
	},
	yaxis: { labels: { show: !1 } },
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		y: {
			formatter: function (e) {
				return "<div>산소포화도: " + e + "%<br />기기명: SHINE1234</div>";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
};
(chart = new ApexCharts(document.querySelector("#oxygen-line"), options)).render();

(dataColors = $("#oxygen-line02").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 200, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "허리둘레 ", data: [60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 51, 64, 79] }],
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: {
		categories: [
			"22:00",
			"22:01",
			"22:02",
			"22:03",
			"22:04",
			"22:05",
			"22:06",
			"22:07",
			"22:08",
			"22:09",
			"22:10",
			"22:11",
			"22:12",
			"22:13",
			"22:14",
			"22:15",
			"22:16",
			"22:17",
			"22:18",
			"22:19",
			"22:20",
			"22:21",
			"22:22",
		],
		title: { text: "" },
	},
	yaxis: {
		min: 0,
		max: 100,
		labels: {
			align: "left",
			offsetX: 0,
			minWidth: 0,
			show: false,
		},
	},
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		y: {
			formatter: function (e) {
				return "<div>산소포화도: " + e + "%";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
};
(chart = new ApexCharts(document.querySelector("#oxygen-line02"), options)).render();

var colors = ["#39afd1"],
	dataColors = $("#oxygen-rangebar").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		chart: { height: 200, type: "rangeBar", zoom: { enabled: !0 }, toolbar: { show: !0 } },
		colors: colors,
		dataLabels: {
			enabled: !1,
		},
		series: [
			{
				data: [
					{
						x: "산소포화도",
						y: [10, 20],
					},
					{
						x: "산소포화도",
						y: [20, 30],
					},
					{
						x: "산소포화도",
						y: [30, 40],
					},
					{
						x: "산소포화도",
						y: [40, 50],
					},
					{
						x: "산소포화도",
						y: [10, 70],
					},
					{
						x: "산소포화도",
						y: [20, 90],
					},
					{
						x: "산소포화도",
						y: [10, 20],
					},
					{
						x: "산소포화도",
						y: [20, 30],
					},
					{
						x: "산소포화도",
						y: [30, 40],
					},
					{
						x: "산소포화도",
						y: [40, 50],
					},
				],
			},
		],
		grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
		markers: { style: "inverted", size: 6 },
		xaxis: { categories: ["9/1", "9/2", "9/3", "9/4", "9/5", "9/6", "9/7", "9/8", "9/9", "9/10"] },
		yaxis: { labels: { show: !1 } },
		legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
		responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
		tooltip: {
			x: {
				formatter: function (e) {
					return e;
				},
			},
			y: {
				title: false,
				formatter: function (e) {
					return e;
				},
			},
			style: {
				fontSize: "11px",
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: "normal",
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#oxygen-rangebar"), options);
chart.render();

(dataColors = $("#heartrate-line").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 200, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "허리둘레 ", data: [60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 51, 64, 79] }],
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: {
		categories: [
			"22:00",
			"22:01",
			"22:02",
			"22:03",
			"22:04",
			"22:05",
			"22:06",
			"22:07",
			"22:08",
			"22:09",
			"22:10",
			"22:11",
			"22:12",
			"22:13",
			"22:14",
			"22:15",
			"22:16",
			"22:17",
			"22:18",
			"22:19",
			"22:20",
			"22:21",
			"22:22",
		],
		title: { text: "" },
	},
	yaxis: { labels: { show: !1 } },
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		y: {
			formatter: function (e) {
				return "<div>심박수: " + e + "%<br />기기명: SHINE1234</div>";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
};
(chart = new ApexCharts(document.querySelector("#heartrate-line"), options)).render();

(dataColors = $("#heartrate-line02").data("colors")) && (colors = dataColors.split(","));
options = {
	chart: { height: 200, type: "line", zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: "10px",
		},
	},
	stroke: { width: [3, 3], curve: "smooth" },
	series: [{ name: "허리둘레 ", data: [60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 60, 70, 62, 57, 51, 64, 79, 62, 55, 50, 51, 64, 79] }],
	grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
	markers: { style: "inverted", size: 6 },
	xaxis: {
		categories: [
			"22:00",
			"22:01",
			"22:02",
			"22:03",
			"22:04",
			"22:05",
			"22:06",
			"22:07",
			"22:08",
			"22:09",
			"22:10",
			"22:11",
			"22:12",
			"22:13",
			"22:14",
			"22:15",
			"22:16",
			"22:17",
			"22:18",
			"22:19",
			"22:20",
			"22:21",
			"22:22",
		],
		title: { text: "" },
	},
	yaxis: {
		min: 0,
		max: 100,
		labels: {
			align: "left",
			offsetX: 0,
			minWidth: 0,
			show: false,
		},
	},
	legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		y: {
			formatter: function (e) {
				return "<div>심박수: " + e + "%";
			},
		},
		style: {
			fontSize: "11px",
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: "normal",
		},
	},
};
(chart = new ApexCharts(document.querySelector("#heartrate-line02"), options)).render();

var colors = ["#39afd1"],
	dataColors = $("#heartrate-rangebar").data("colors");
dataColors && (colors = dataColors.split(","));
var options = {
		chart: { height: 200, type: "rangeBar", zoom: { enabled: !0 }, toolbar: { show: !0 } },
		colors: colors,
		dataLabels: {
			enabled: !1,
		},
		series: [
			{
				data: [
					{
						x: "심박수",
						y: [10, 20],
					},
					{
						x: "심박수",
						y: [20, 30],
					},
					{
						x: "심박수",
						y: [30, 40],
					},
					{
						x: "심박수",
						y: [40, 50],
					},
					{
						x: "심박수",
						y: [10, 70],
					},
					{
						x: "심박수",
						y: [20, 90],
					},
					{
						x: "심박수",
						y: [10, 20],
					},
					{
						x: "심박수",
						y: [20, 30],
					},
					{
						x: "심박수",
						y: [30, 40],
					},
					{
						x: "심박수",
						y: [40, 50],
					},
				],
			},
		],
		grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f3fa" },
		markers: { style: "inverted", size: 6 },
		xaxis: { categories: ["9/1", "9/2", "9/3", "9/4", "9/5", "9/6", "9/7", "9/8", "9/9", "9/10"] },
		yaxis: { labels: { show: !1 } },
		legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
		responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
		tooltip: {
			x: {
				formatter: function (e) {
					return e;
				},
			},
			y: {
				title: false,
				formatter: function (e) {
					return e;
				},
			},
			style: {
				fontSize: "11px",
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: "normal",
			},
		},
	},
	chart = new ApexCharts(document.querySelector("#heartrate-rangebar"), options);
chart.render();

$(document).ready(function () {
	$("#check-result-table").DataTable({
		scrollX: true,
		searching: false,
		lengthChange: false,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Pages",
		},
		columns: [{ orderable: 1, width: "150px" }, { orderable: 1 }, { orderable: 0 }, { orderable: 0 }, { orderable: 0 }],
		order: [[3, "desc"]],
		drawCallback: function () {
			$("#check-result-table_paginate > .pagination").addClass("pagination-rounded");
		},
	});

	$("#emergency-datatable").DataTable({
		scrollX: true,
		searching: false,
		lengthChange: false,
		pageLength: 10,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Pages",
		},
		order: false,
		drawCallback: function () {
			$("#emergency-datatable_paginate > .pagination").addClass("pagination-rounded");
		},
	});

	$("#contents-preview-datatable").DataTable({
		scrollX: true,
		searching: true,
		lengthChange: false,
		pageLength: 6,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Pages",
			search: "검색: ",
		},
		columns: [
			{
				orderable: 1,
				width: "300px",
			},
			{ orderable: 1 },
			{ orderable: 1 },
			{ orderable: 1 },
			{ orderable: 0 },
			{ orderable: 0 },
		],
		order: [[1, "desc"]],
		drawCallback: function () {
			$("#contents-preview-datatable_paginate > .pagination").addClass("pagination-rounded");
		},
		createdRow: function (row, data, dataIndex) {
			$("td:eq(0)", row).css("min-width", "300px");
		},
	});

	$("#bg-history-modal").on("shown.bs.modal", function () {
		if (!$("#bg-history-modal-table").hasClass("active")) {
			$("#bg-history-modal-table")
				.addClass("active")
				.DataTable({
					scrollX: true,
					searching: false,
					language: {
						paginate: {
							previous: "<i class='mdi mdi-chevron-left'>",
							next: "<i class='mdi mdi-chevron-right'>",
						},
						info: " _PAGE_ / _PAGES_ Pages",
						lengthMenu:
							'<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기',
					},
					columns: [
						{ orderable: !0 },
						{ orderable: !0 },
						{ orderable: !0, width: "150px" },
						{ orderable: !0 },
						{ orderable: !0 },
						{ orderable: !0 },
						{ orderable: !0, width: "150px" },
						{ orderable: !0, width: "150px" },
						{ orderable: !0 },
					],
					order: [[0, "desc"]],
					drawCallback: function () {
						$("#bg-history-modal-table_paginate > .pagination").addClass("pagination-rounded");
					},
				});
		}
	});

	$("#insullin-manage-modal").on("shown.bs.modal", function () {
		if (!$("#insullin-datatable").hasClass("active")) {
			$("#insullin-datatable")
				.addClass("active")
				.DataTable({
					scrollX: true,
					pageLength: 10,
					lengthChange: false,
					autoWidth: false,
					searching: false,
					language: {
						paginate: {
							previous: "<i class='mdi mdi-chevron-left'>",
							next: "<i class='mdi mdi-chevron-right'>",
						},
						info: " _PAGE_ / _PAGES_ Pages",
					},
					columns: [
						{ orderable: 1 },
						{ orderable: 1, render: $.fn.dataTable.render.ellipsis(20, true, true) },
						{ orderable: 1, render: $.fn.dataTable.render.ellipsis(20, true, true) },
						{ orderable: 1 },
						{
							orderable: 1,
							render: $.fn.dataTable.render.ellipsis(20, true, true),
						},
						{ orderable: 1 },
						{ orderable: !1 },
					],
					order: [[0, "desc"]],
					drawCallback: function () {
						$("#insullin-datatable_paginate > .pagination").addClass("pagination-rounded");
					},
				});
		}
	});

	$("#insullin-list-modal").on("shown.bs.modal", function () {
		if (!$("#insullin-list-datatable").hasClass("active")) {
			$("#insullin-list-datatable")
				.addClass("active")
				.DataTable({
					scrollX: true,
					pageLength: 6,
					lengthChange: false,
					searching: false,
					language: {
						paginate: {
							previous: "<i class='mdi mdi-chevron-left'>",
							next: "<i class='mdi mdi-chevron-right'>",
						},
						info: " _PAGE_ / _PAGES_ Pages",
					},
					columns: [
						{ orderable: 1 },
						{ orderable: 1, width: "120px" },
						{ orderable: 1 },
						{ orderable: 1 },
						{ orderable: 1, width: "120px" },
						{ orderable: 1 },
						{ orderable: !1 },
					],
					order: [[0, "desc"]],
					drawCallback: function () {
						$("#insullin-list-datatable_paginate > .pagination").addClass("pagination-rounded");
					},
				});
		}
	});

	$("#exercise-video-list-modal").on("shown.bs.modal", function () {
		if (!$("#exercise-video-list-datatable").hasClass("active")) {
			$("#exercise-video-list-datatable")
				.addClass("active")
				.DataTable({
					scrollX: true,
					lengthChange: false,
					searching: false,
					language: {
						paginate: {
							previous: "<i class='mdi mdi-chevron-left'>",
							next: "<i class='mdi mdi-chevron-right'>",
						},
						info: " _PAGE_ / _PAGES_ Pages",
					},
					columns: [{ orderable: 1 }, { orderable: 1 }, { orderable: 1, width: "160px" }, { orderable: 1, width: "320px" }, { orderable: 1 }, { orderable: 1 }],
					order: [[0, "desc"]],
					drawCallback: function () {
						$("#exercise-video-list-datatable_paginate > .pagination").addClass("pagination-rounded");
					},
				});
		}
	});

	$(".story-box").on("click", function (e) {
		$(this).toggleClass("active");
	});

	$(".direct-select").on("change", function (e) {
		if ($(this).val() == "direct") $(this).parent().addClass("active");
		else $(this).parent().removeClass("active");
	});

	onResize();
});

$(window).resize(function () {
	onResize();
});

$(window).scroll(function () {
	onResize();
});
function onResize() {
	var scroll_top = $(window).scrollTop();
	var w = $("#main-container").width();
	var w2 = $("#chatting-wrapper").width();
	var h = $(window).height();
	if ($(window).width() > 768) {
		$(".chatting-wrapper").css("width", w2);
		//$(".conversation-list").height(h - 430);
	} else {
		$(".chatting-wrapper").css("width", w);
	}
	// $(".chatting-wrapper").css("margin-top", scroll_top+"px");

	var width = $(".hr-span").parent().width();
	var width1 = $(".hr-span").width();
	$(".hr-span").css("left", (width - width1) / 2 + "px");
}

var today = new Date($.now());
var events = [
	{
		title: "당뇨약",
		start: new Date(2020, 11, 4),
		className: "bg-warning",
	},
	{
		title: "당뇨약",
		start: new Date(2020, 11, 4),
		className: "bg-warning",
	},
	{
		title: "당뇨약",
		start: new Date(2020, 11, 4),
		className: "bg-warning",
	},
	{
		title: "고혈압",
		start: new Date(2020, 11, 4),
		className: "bg-info",
	},
	{
		title: "고혈압",
		start: new Date(2020, 11, 4),
		className: "bg-info",
	},
	{
		title: "고혈압",
		start: new Date(2020, 11, 4),
		className: "bg-info",
	},
	{
		title: "고혈압",
		start: new Date(2020, 11, 5),
		className: "bg-info",
	},
	{
		title: "고혈압",
		start: new Date(2020, 11, 5),
		className: "bg-info",
	},
	{
		title: "당뇨약",
		start: new Date(2020, 11, 5),
		className: "bg-warning",
	},
	{
		title: "당뇨약",
		start: new Date(2020, 11, 6),
		className: "bg-warning",
	},
	{
		title: "고혈압",
		start: new Date(2020, 11, 6),
		className: "bg-info",
	},
	{
		title: "고혈압",
		start: new Date(2020, 11, 7),
		className: "bg-info",
	},
];
var calEl = document.getElementById("calendar2");
var cal = new FullCalendar.Calendar(calEl, {
	slotDuration: "00:15:00",
	slotMinTime: "08:00:00",
	slotMaxTime: "19:00:00",
	themeSystem: "bootstrap",
	bootstrapFontAwesome: !1,
	buttonText: {
		today: "Today",
		month: "Month",
		week: "Week",
		day: "Day",
		list: "List",
		prev: "Prev",
		next: "Next",
	},
	initialView: "dayGridMonth",
	handleWindowResize: !0,
	height: $(window).height() - 200,
	headerToolbar: {
		left: "title",
		right: "today prev,next",
	},
	initialEvents: events,
	editable: false,
	droppable: !0,
	selectable: !0,
});
jQuery(function ($) {
	$(".image-gallery a").simpleLightbox({
		nextBtnClass: " dripicons-chevron-right",
		nextBtnCaption: "",
		prevBtnClass: " dripicons-chevron-left",
		prevBtnCaption: "",
	});

	$(".remove-image").on("click", function (e) {
		e.preventDefault();
		$(this).closest(".preview-item").remove();
	});
});
jQuery(function ($) {
	$(".image-preview a").simpleLightbox({});

	$(".remove-image").on("click", function (e) {
		e.preventDefault();
		$(this).closest(".preview-item").remove();
	});
});

//select change
$("#periodType01").change(function (e) {
	e.preventDefault();
	$(".periodType01").hide();
	if ($(this).val() === "type01") {
		$("#periodType01-01").show();
	} else if ($(this).val() === "type02") {
		$("#periodType01-02").show();
	}
});

$("#periodType02").change(function (e) {
	e.preventDefault();
	$(".periodType02").hide();
	if ($(this).val() === "type01") {
		$("#periodType02-01").show();
	} else if ($(this).val() === "type02") {
		$("#periodType02-02").show();
	}
});
