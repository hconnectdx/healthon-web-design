$(function () {
	var url = window.location.href;
	var url_a = url.split('#');

	if (url_a == url) {
		url_a = 'user_log';
	} else {
		url_a = url_a[1];
	}

	selectTag(url_a);

	var options = {
		cancelClass: 'btn-light',
		applyButtonClasses: 'btn-success',
		locale: {
			direction: 'ltr',
			format: 'YYYY/MM/DD',
			separator: ' - ',
			applyLabel: '확인',
			cancelLabel: '취소',
			weekLabel: 'W',
			customRangeLabel: 'Custom Range',
			daysOfWeek: moment.weekdaysMin(),
			monthNames: moment.monthsShort(),
			firstDay: moment.localeData().firstDayOfWeek(),
		},
	};
	$('#singledaterange').daterangepicker(options);

	$('#check-wrapper .list-group-item-action').click(function () {
		$('#check-wrapper .list-group-item-action').removeClass('active');
		$(this).addClass('active');
	});
});

function selectTag(tag) {
	var arr = ['user_log', 'total_log', 'check_result', 'question', 'consult', 'telehealth'];
	var index = -1;
	for (var i = 0; i < arr.length; i++) {
		if (tag == arr[i]) {
			index = i;
		}
	}

	if (index != -1) {
		$('#user_detail_tag .nav-link').removeClass('active');
		$('#user_detail_tag_content .tab-pane').removeClass('active');

		$('#user_detail_tag .nav-link').each(function () {
			if ($(this).attr('href') == '#' + tag) {
				$(this).addClass('active');
				$('#user_detail_tag_content #' + tag).addClass('active');
			}
		});
	}
}

colors = ['#7453ff', '#0acf97', '#fa5c7c', '#ffbc00'];
(dataColors = $('#line-chart-datalabel').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: { height: 170, type: 'line', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: '10px',
		},
	},
	stroke: { width: [3, 3], curve: 'smooth' },
	series: [
		{
			name: '고혈압 ',
			data: [150, 90, 100, 123, 81, 110, 96],
		},
		{
			name: '저혈압',
			data: [22, 48, 40, 72, 44, 41, 54],
		},
	],

	grid: {
		show: true,
		borderColor: '#e5e5e5',
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
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['9/1', '9/2', '9/2', '9/10', '9/10', '9/11', '9/12'], title: { text: '' } },
	yaxis: {
		title: { text: '' },
		labels: {
			align: 'left',
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
				return '2020-9-' + e;
			},
		},
		y: {
			formatter: function (e) {
				return '<div>01일 ~ 02일</div><div> ' + e + '회 발생</div>';
			},
		},
		style: {
			fontSize: '11px',
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: 'normal',
		},
	},
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector('#line-chart-datalabel'), options)).render();

(dataColors = $('#line-chart-datalabel1').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: { height: 170, type: 'line', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: '10px',
		},
	},
	stroke: { width: [3, 3], curve: 'smooth' },
	series: [{ name: '혈당 ', data: [170, 260, 120, 320, 150, 180, 90] }],

	grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['9/1', '9/2', '9/2', '9/10', '9/10', '9/11', '9/12'], title: { text: '' } },
	yaxis: {
		title: { text: '' },
		labels: {
			align: 'left',
			offsetX: -30,
			minWidth: 60,
		},
		max: 320,
		tickAmount: 4,
	},
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		followCursor: !1,
		marker: { show: !1 },
		x: {
			formatter: function (e) {
				return '2020-9-' + e;
			},
		},
		y: {
			formatter: function (e) {
				return '<div>아침식전</div><div>매뉴얼 입력</div><div>어제 과음함</div>';
			},
		},
		style: {
			fontSize: '11px',
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: 'normal',
		},
	},
};
(chart = new ApexCharts(document.querySelector('#line-chart-datalabel1'), options)).render();

(dataColors = $('#line-chart-datalabel2').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: { height: 524, type: 'line', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: '10px',
		},
	},
	// stroke: { width: [3, 3] },
	series: [
		{
			name: '혈당 ',
			data: [
				23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31,
				22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22,
				17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22,
			],
		},
	],

	grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
	markers: { style: 'inverted', size: 6 },
	dataLabels: {
		enabled: false,
	},
	xaxis: {
		categories: [
			'9/1',
			'9/2',
			'9/3',
			'9/4',
			'9/5',
			'9/6',
			'9/7',
			'9/8',
			'9/9',
			'9/10',
			'9/11',
			'9/12',
			'9/13',
			'9/14',
			'9/15',
			'9/16',
			'9/17',
			'9/18',
			'9/19',
			'9/20',
			'9/21',
			'9/22',
			'9/23',
			'9/24',
			'9/25',
			'9/26',
			'9/27',
			'9/28',
			'9/29',
			'9/30',
			'10/1',
			'10/2',
			'10/3',
			'10/4',
			'10/5',
			'10/6',
			'10/7',
			'10/8',
			'10/9',
			'10/10',
			'10/11',
			'10/12',
			'10/13',
			'10/14',
			'10/15',
			'10/16',
			'10/17',
			'10/18',
			'10/19',
			'10/20',
			'10/21',
			'10/22',
			'10/23',
			'10/24',
			'10/25',
			'10/26',
			'10/27',
			'10/28',
			'10/29',
			'10/30',
			'11/1',
			'11/2',
			'11/3',
			'11/4',
			'11/5',
			'11/6',
			'11/7',
			'11/8',
			'11/9',
			'11/10',
			'11/11',
			'11/12',
			'11/13',
			'11/14',
			'11/15',
			'11/16',
			'11/17',
			'11/18',
			'11/19',
			'11/20',
			'11/21',
			'11/22',
			'11/23',
			'11/24',
			'11/25',
			'11/26',
			'11/27',
			'11/28',
			'11/29',
			'11/30',
		],
		title: { text: '' },
	},
	yaxis: {
		title: { text: '' },
		max: 50,
		tickAmount: 4,
		labels: { show: false },
	},
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		followCursor: !1,
		marker: { show: !1 },
		x: {
			formatter: function (e) {
				return '9/' + e;
			},
		},
		y: {
			formatter: function (e) {
				return +e + '<span class="ml-1">높음</span>';
			},
		},
	},
};
(chart = new ApexCharts(document.querySelector('#line-chart-datalabel2'), options)).render();

var colors = ['#39afd1'],
	dataColors = $('#bar-chart1').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		annotations: {
			yaxis: [
				{
					y: 4550,
					borderColor: '#cfcd13',
					label: { borderColor: '#0acf97', style: { color: '#fff', background: '#0acf97' }, text: '' },
				},
			],
		},
		yaxis: { labels: { show: !1 } },
		chart: { height: 170, type: 'bar', toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1 } },
		dataLabels: { enabled: !1 },
		series: [{ name: '식사', data: [4012, 1900, 3248, 4370, 2440, 3280, 4690] }],
		colors: colors,
		xaxis: { categories: ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7'] },
		states: { hover: { filter: 'none' } },
		grid: { borderColor: '#f1f3fa' },
		tooltip: {
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return '2020-' + e;
				},
			},
			y: {
				formatter: function (e) {
					return '<div> ' + e + 'kcal</div><div> - 탄수화물 : 153g (59%)</div><div> - 지방 : 26g (26%)</div><div> - 나트륨 : 13g (13%)</div>';
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#bar-chart1'), options);
chart.render();

(dataColors = $('#bar-chart-exercise').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: { height: 380, type: 'bar', stacked: !0, toolbar: { show: !1 } },
	plotOptions: { bar: { horizontal: !1 } },
	stroke: { width: 1, colors: ['#fff'] },
	series: [
		{ name: '걷기', data: [44, 55, 41, 37, 22, 43, 21] },
		{
			name: '경운동',
			data: [53, 32, 33, 52, 13, 43, 32],
		},
	],
	xaxis: {
		categories: ['9/6', '9/7', '9/8', '9/9', '9/10', '9/11', '9/12'],
		labels: {
			formatter: function (e) {
				return e + 'K';
			},
		},
	},
	colors: colors,
	dataLabels: { enabled: !0 },
	tooltip: {
		y: {
			formatter: function (e) {
				return e + 'K';
			},
		},
	},
	title: { text: '', align: 'left' },
	fill: { opacity: 1 },
	states: { hover: { filter: 'none' } },
	legend: { position: 'top', horizontalAlign: 'center', offsetY: 10, show: false },
	grid: { borderColor: '#f1f3fa', padding: { top: 0 } },
};
(chart = new ApexCharts(document.querySelector('#bar-chart-exercise'), options)).render();
var colors = ['#39afd1'],
	dataColors = $('#bar-chart3').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		annotations: {
			yaxis: [
				{
					y: 9500,
					borderColor: '#cfcd13',
					label: { borderColor: '#0acf97', style: { color: '#fff', background: '#0acf97' }, text: '' },
				},
			],
		},
		chart: {
			height: 170,
			type: 'bar',
			toolbar: { show: !0, offsetX: 10 },
		},
		plotOptions: { bar: { horizontal: !1 } },
		dataLabels: { enabled: !1 },
		series: [{ name: '걸음', data: [9512, 4600, 8648, 5470, 4240, 2880, 5490, 7240, 9280, 6490] }],
		colors: colors,
		xaxis: { categories: ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7', '9/8', '9/9', '9/10'] },
		yaxis: { labels: { show: !1 } },
		states: { hover: { filter: 'none' } },
		grid: { borderColor: '#f1f3fa' },
		tooltip: {
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return '2020-' + e;
				},
			},
			y: {
				formatter: function (e) {
					return '<div> ' + e + ' 걸음</div>';
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#bar-chart3'), options);
chart.render();

var colors = ['#39afd1'],
	dataColors = $('#line-chart-a').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: {
			height: 80,
			type: 'line',
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
		labels: [''],

		stroke: {
			width: 2,
			curve: 'smooth',
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
						return '';
					},
				},
			},
			marker: {
				show: !1,
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#line-chart-a'), options);
chart.render();

var colors = ['#39afd1'],
	dataColors = $('#pie-chart2').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 150, type: 'radialBar' },
		colors: colors,
		series: [94.3],
		labels: [''],

		plotOptions: {
			radialBar: {
				dataLabels: {
					name: { name: { show: !0 }, fontSize: '14px', color: '#ff0', offsetY: 100 },
					value: {
						offsetY: -5,
						fontSize: '24px',
						color: '#880',
						formatter: function (o) {
							return o + '%';
						},
					},
				},
				hollow: { size: '76%' },
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#pie-chart2'), options);
chart.render();

var colors = ['#39afd1'],
	dataColors = $('#chart-bloodsugar').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 150, type: 'radialBar' },
		plotOptions: {
			radialBar: {
				dataLabels: {
					name: {
						fontSize: '24px',
						fontWeight: 600,
						offsetY: 0,
					},
					value: {
						fontSize: '16px',
						fontWeight: 400,
						offsetY: 16,
						formatter: function (val) {
							return val;
						},
					},
				},
				hollow: { size: '76%' },
			},
		},
		colors: colors,
		series: [94.3],
		labels: ['높음'],
	},
	chart = new ApexCharts(document.querySelector('#chart-bloodsugar'), options);
chart.render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#insullin-chart').data('colors');
dataColors && (colors = dataColors.split(','));

var options = {
		chart: { height: 170, type: 'bar', toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, endingShape: 'rounded', columnWidth: '55%' } },
		dataLabels: { enabled: !1 },
		stroke: {
			show: !0,
			width: 2,
			colors: ['transparent'],
		},
		colors: colors,

		series: [
			{
				name: '권고용량',
				data: [6, 8, 6.5, 7, 10, 8, 6, 9, 10],
			},
			{
				name: '투여용량',
				data: [5, 9, 10, 11, 5, 4, 6, 7, 8],
			},
		],
		xaxis: { categories: ['9/6', '9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13', '9/14'] },
		legend: { offsetY: 7, show: false },
		yaxis: { labels: { show: !1 } },
		fill: { opacity: 1 },
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
		tooltip: {
			y: {
				formatter: function (o) {
					return o + ' Unit';
				},
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#insullin-chart'), options);
chart.render();

if ($('#insullin-chart-empty').length > 0) {
	var colors = ['#0acf97', '#7453ff', '#fa5c7c'],
		dataColors = $('#insullin-chart-empty').data('colors');
	dataColors && (colors = dataColors.split(','));

	var emptyOptions = {
			chart: { height: 170, type: 'bar', toolbar: { show: !0, offsetX: 10 } },
			plotOptions: { bar: { horizontal: !1, endingShape: 'rounded', columnWidth: '33%' } },
			dataLabels: { enabled: !1 },
			stroke: { show: !0, width: 2, colors: ['transparent'] },
			colors: colors,
			series: [
				{
					name: '투여용량',
					data: [5, 9, 10, 11, 5, 4, 6, 7, 8],
				},
			],
			xaxis: { categories: ['9/6', '9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13', '9/14'] },
			legend: { offsetY: 7, show: false },
			yaxis: { labels: { show: !1 } },
			fill: { opacity: 1 },
			grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
			tooltip: {
				y: {
					formatter: function (o) {
						return o + ' Unit';
					},
				},
			},
		},
		chart = new ApexCharts(document.querySelector('#insullin-chart-empty'), emptyOptions);
	chart.render();
}

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#basic-column1').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		colors: colors,
		series: [
			{
				name: 'Website Blog',
				type: 'column',
				data: [6, 8, 6.5, 7, 10, 8, 6, 9, 10],
			},
			{
				name: 'Social Media',
				type: 'line',
				data: [5, 9, 10, 11, 5, 4, 6, 7, 8],
			},
		],
		legend: { offsetY: 7, show: false },
		chart: {
			height: 170,
			type: 'line',
		},
		stroke: {
			width: [0, 4],
		},
		dataLabels: {
			enabled: true,
			enabledOnSeries: [1],
		},
		labels: ['9/6', '9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13', '9/14'],
		xaxis: {
			//type: 'datetime',
		},
		yaxis: [
			{
				labels: { show: false },
				title: {
					text: '',
				},
			},
			{
				labels: { show: false },
				opposite: true,
			},
		],
		tooltip: {
			//enabled: [true,false],
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return '9/' + e;
				},
			},
			y: {
				formatter: function (e, a) {
					if (a.seriesIndex === 0) {
						return '<div>7시간 50분<br />핏비트<br />수면점수 70점</div>';
					}
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#basic-column1'), options);
chart.render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#basic-column2').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 191, type: 'rangeBar', toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, columnWidth: '25%' } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 2, colors: ['transparent'] },
		colors: colors,
		series: [
			{
				data: [
					{
						x: '7/1',
						y: [10, 50],
					},
					{
						x: '7/2',
						y: [20, 70],
					},
					{
						x: '7/3',
						y: [30, 90],
					},
					{
						x: '7/4',
						y: [20, 100],
					},
					{
						x: '7/5',
						y: [50, 90],
					},
					{
						x: '7/6',
						y: [20, 70],
					},
					{
						x: '7/7',
						y: [30, 50],
					},
				],
			},
		],
		xaxis: { categories: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7'] },
		legend: { offsetY: 7, show: false },
		yaxis: { labels: { show: !1 } },
		fill: { opacity: 1 },
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
		tooltip: {
			custom: undefined,
			x: {
				show: true,
			},
			y: {
				formatter: function (o) {
					return o + ' %';
				},
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#basic-column2'), options);
chart.render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#basic-column3').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 191, type: 'bar', stacked: true, toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, columnWidth: '25%' } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 2, colors: ['transparent'] },
		colors: colors,

		series: [
			{
				name: '고강도',
				data: [44, 55, 41, 67, 22, 43, 50],
			},
			{
				name: '중강도',
				data: [13, 23, 20, 8, 13, 27, 60],
			},
			{
				name: '저강도',
				data: [11, 17, 15, 15, 21, 14, 40],
			},
		],
		xaxis: { categories: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7'] },
		legend: { offsetY: 7, show: false },
		yaxis: { labels: { show: !1 } },
		fill: { opacity: 1 },
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
		tooltip: {
			//enabled: [true,false],
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return e;
				},
			},
			y: {
				formatter: function (e, a) {
					return (
						'<div>- 총 ' +
						e +
						'kcal</div><div> <span style="position:relative;top:-2px;display:inline-block;width:5px;height:5px;margin-right:2px;border-radius:3px;background:#FF6B8E;"></span> 고강도 180kcal</div><div> <span style="position:relative;top:-2px;display:inline-block;width:5px;height:5px;margin-right:2px;border-radius:3px;background:#4DB87E;"></span> 중강도 60kcal</div> <div> <span style="position:relative;top:-2px;display:inline-block;width:5px;height:5px;margin-right:2px;border-radius:3px;background:#3D85C6;"></span> 저강도 70kcal</div>'
					);
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#basic-column3'), options);
chart.render();

// var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
// 	dataColors = $('#basic-column4').data('colors');
// dataColors && (colors = dataColors.split(','));
// var options = {
// 		colors: colors,
// 		series: [
// 			{
// 				name: 'Website Blog',
// 				type: 'column',
// 				data: [
// 					440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 440, 505, 414, 671, 227, 413, 201, 352, 752, 320,
// 					440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 440, 505, 414, 671, 227, 413, 201, 352, 752, 320,
// 					440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 440, 505, 414, 671, 227, 413, 201, 352, 752, 320,
// 				],
// 			},
// 			{
// 				name: 'Social Media',
// 				type: 'line',
// 				data: [
// 					23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17,
// 					31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 23, 42, 35, 27,
// 					43, 22, 17, 31, 22, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22,
// 				],
// 			},
// 		],
// 		legend: { offsetY: 7, show: false },
// 		chart: {
// 			height: 350,
// 			type: 'line',
// 		},
// 		stroke: {
// 			width: [0, 4],
// 		},
// 		markers: { style: 'inverted', size: 6 },
// 		dataLabels: {
// 			enabled: false,
// 		},
// 		labels: [
// 			'9/1',
// 			'9/2',
// 			'9/3',
// 			'9/4',
// 			'9/5',
// 			'9/6',
// 			'9/7',
// 			'9/8',
// 			'9/9',
// 			'9/10',
// 			'9/11',
// 			'9/12',
// 			'9/13',
// 			'9/14',
// 			'9/15',
// 			'9/16',
// 			'9/17',
// 			'9/18',
// 			'9/19',
// 			'9/20',
// 			'9/21',
// 			'9/22',
// 			'9/23',
// 			'9/24',
// 			'9/25',
// 			'9/26',
// 			'9/27',
// 			'9/28',
// 			'9/29',
// 			'9/30',
// 			'10/1',
// 			'10/2',
// 			'10/3',
// 			'10/4',
// 			'10/5',
// 			'10/6',
// 			'10/7',
// 			'10/8',
// 			'10/9',
// 			'10/10',
// 			'10/11',
// 			'10/12',
// 			'10/13',
// 			'10/14',
// 			'10/15',
// 			'10/16',
// 			'10/17',
// 			'10/18',
// 			'10/19',
// 			'10/20',
// 			'10/21',
// 			'10/22',
// 			'10/23',
// 			'10/24',
// 			'10/25',
// 			'10/26',
// 			'10/27',
// 			'10/28',
// 			'10/29',
// 			'10/30',
// 			'11/1',
// 			'11/2',
// 			'11/3',
// 			'11/4',
// 			'11/5',
// 			'11/6',
// 			'11/7',
// 			'11/8',
// 			'11/9',
// 			'11/10',
// 			'11/11',
// 			'11/12',
// 			'11/13',
// 			'11/14',
// 			'11/15',
// 			'11/16',
// 			'11/17',
// 			'11/18',
// 			'11/19',
// 			'11/20',
// 			'11/21',
// 			'11/22',
// 			'11/23',
// 			'11/24',
// 			'11/25',
// 			'11/26',
// 			'11/27',
// 			'11/28',
// 			'11/29',
// 			'11/30',
// 		],
// 		xaxis: {
// 			//type: 'datetime',
// 		},
// 		yaxis: [
// 			{
// 				labels: { show: false },
// 				title: {
// 					text: '',
// 				},
// 			},
// 			{
// 				labels: { show: false },
// 				opposite: true,
// 			},
// 		],
// 		tooltip: {
// 			//enabled: [true,false],
// 			followCursor: !1,
// 			marker: { show: !1 },
// 			x: {
// 				formatter: function (e) {
// 					return '9/' + e;
// 				},
// 			},
// 			y: {
// 				formatter: function (e, a) {
// 					if (a.seriesIndex === 0) {
// 						return '<div> - 일평균 : 낮음 (30%)</div><div> - 최저 : 낮음 (15%)</div> <div> - 최고 : 높음 (60%)</div>';
// 					}
// 				},
// 			},
// 			style: {
// 				fontSize: '11px',
// 				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
// 				fontWeight: 'normal',
// 			},
// 		},
// 	},
// 	chart = new ApexCharts(document.querySelector('#basic-column4'), options);
// chart.render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#basic-column4').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 320, type: 'rangeBar', toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, columnWidth: '25%' } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 8, colors: ['transparent'] },
		colors: colors,
		series: [
			{
				data: [
					{
						x: '1',
						y: [10, 50],
					},
					{
						x: '2',
						y: [20, 70],
					},
					{
						x: '3',
						y: [30, 90],
					},
					{
						x: '4',
						y: [20, 100],
					},
					{
						x: '5',
						y: [50, 90],
					},
					{
						x: '6',
						y: [20, 70],
					},
					{
						x: '7',
						y: [30, 50],
					},
					{
						x: '8',
						y: [30, 90],
					},
					{
						x: '9',
						y: [20, 100],
					},
					{
						x: '10',
						y: [40, 30],
					},
					{
						x: '11',
						y: [10, 50],
					},
					{
						x: '12',
						y: [20, 70],
					},
					{
						x: '13',
						y: [30, 90],
					},
					{
						x: '14',
						y: [20, 100],
					},
					{
						x: '15',
						y: [50, 90],
					},
					{
						x: '16',
						y: [20, 70],
					},
					{
						x: '17',
						y: [30, 50],
					},
					{
						x: '18',
						y: [30, 90],
					},
					{
						x: '19',
						y: [20, 100],
					},
					{
						x: '20',
						y: [40, 30],
					},
					{
						x: '21',
						y: [10, 50],
					},
					{
						x: '22',
						y: [20, 70],
					},
					{
						x: '23',
						y: [30, 90],
					},
					{
						x: '24',
						y: [20, 100],
					},
					{
						x: '25',
						y: [20, 100],
					},
					{
						x: '26',
						y: [40, 30],
					},
					{
						x: '27',
						y: [10, 50],
					},
					{
						x: '28',
						y: [20, 70],
					},
					{
						x: '29',
						y: [30, 90],
					},
					{
						x: '30',
						y: [20, 100],
					},
					{
						x: '1',
						y: [10, 50],
					},
					{
						x: '2',
						y: [20, 70],
					},
					{
						x: '3',
						y: [30, 90],
					},
					{
						x: '4',
						y: [20, 100],
					},
					{
						x: '5',
						y: [50, 90],
					},
					{
						x: '6',
						y: [20, 70],
					},
					{
						x: '7',
						y: [30, 50],
					},
					{
						x: '8',
						y: [30, 90],
					},
					{
						x: '9',
						y: [20, 100],
					},
					{
						x: '10',
						y: [40, 30],
					},
					{
						x: '11',
						y: [10, 50],
					},
					{
						x: '12',
						y: [20, 70],
					},
					{
						x: '13',
						y: [30, 90],
					},
					{
						x: '14',
						y: [20, 100],
					},
					{
						x: '15',
						y: [50, 90],
					},
					{
						x: '16',
						y: [20, 70],
					},
					{
						x: '17',
						y: [30, 50],
					},
					{
						x: '18',
						y: [30, 90],
					},
					{
						x: '19',
						y: [20, 100],
					},
					{
						x: '20',
						y: [40, 30],
					},
					{
						x: '21',
						y: [10, 50],
					},
					{
						x: '22',
						y: [20, 70],
					},
					{
						x: '23',
						y: [30, 90],
					},
					{
						x: '24',
						y: [20, 100],
					},
					{
						x: '25',
						y: [20, 100],
					},
					{
						x: '26',
						y: [40, 30],
					},
					{
						x: '27',
						y: [10, 50],
					},
					{
						x: '28',
						y: [20, 70],
					},
					{
						x: '29',
						y: [30, 90],
					},
					{
						x: '30',
						y: [20, 100],
					},
					{
						x: '1',
						y: [10, 50],
					},
					{
						x: '2',
						y: [20, 70],
					},
					{
						x: '3',
						y: [30, 90],
					},
					{
						x: '4',
						y: [20, 100],
					},
					{
						x: '5',
						y: [50, 90],
					},
					{
						x: '6',
						y: [20, 70],
					},
					{
						x: '7',
						y: [30, 50],
					},
					{
						x: '8',
						y: [30, 90],
					},
					{
						x: '9',
						y: [20, 100],
					},
					{
						x: '10',
						y: [40, 30],
					},
					{
						x: '11',
						y: [10, 50],
					},
					{
						x: '12',
						y: [20, 70],
					},
					{
						x: '13',
						y: [30, 90],
					},
					{
						x: '14',
						y: [20, 100],
					},
					{
						x: '15',
						y: [50, 90],
					},
					{
						x: '16',
						y: [20, 70],
					},
					{
						x: '17',
						y: [30, 50],
					},
					{
						x: '18',
						y: [30, 90],
					},
					{
						x: '19',
						y: [20, 100],
					},
					{
						x: '20',
						y: [40, 30],
					},
					{
						x: '21',
						y: [10, 50],
					},
					{
						x: '22',
						y: [20, 70],
					},
					{
						x: '23',
						y: [30, 90],
					},
					{
						x: '24',
						y: [20, 100],
					},
					{
						x: '25',
						y: [20, 100],
					},
					{
						x: '26',
						y: [40, 30],
					},
					{
						x: '27',
						y: [10, 50],
					},
					{
						x: '28',
						y: [20, 70],
					},
					{
						x: '29',
						y: [30, 90],
					},
					{
						x: '30',
						y: [20, 100],
					},
				],
			},
		],
		xaxis: {
			categories: [
				'9/1',
				'9/2',
				'9/3',
				'9/4',
				'9/5',
				'9/6',
				'9/7',
				'9/8',
				'9/9',
				'9/10',
				'9/11',
				'9/12',
				'9/13',
				'9/14',
				'9/15',
				'9/16',
				'9/17',
				'9/18',
				'9/19',
				'9/20',
				'9/21',
				'9/22',
				'9/23',
				'9/24',
				'9/25',
				'9/26',
				'9/27',
				'9/28',
				'9/29',
				'9/30',
				'10/1',
				'10/2',
				'10/3',
				'10/4',
				'10/5',
				'10/6',
				'10/7',
				'10/8',
				'10/9',
				'10/10',
				'10/11',
				'10/12',
				'10/13',
				'10/14',
				'10/15',
				'10/16',
				'10/17',
				'10/18',
				'10/19',
				'10/20',
				'10/21',
				'10/22',
				'10/23',
				'10/24',
				'10/25',
				'10/26',
				'10/27',
				'10/28',
				'10/29',
				'10/30',
				'11/1',
				'11/2',
				'11/3',
				'11/4',
				'11/5',
				'11/6',
				'11/7',
				'11/8',
				'11/9',
				'11/10',
				'11/11',
				'11/12',
				'11/13',
				'11/14',
				'11/15',
				'11/16',
				'11/17',
				'11/18',
				'11/19',
				'11/20',
				'11/21',
				'11/22',
				'11/23',
				'11/24',
				'11/25',
				'11/26',
				'11/27',
				'11/28',
				'11/29',
				'11/30',
			],
		},
		legend: { offsetY: 7, show: false },
		yaxis: { labels: { show: !1 } },
		fill: { opacity: 1 },
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
		tooltip: {
			custom: undefined,
			x: {
				show: true,
			},
			y: {
				formatter: function (o) {
					return o + ' %';
				},
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#basic-column4'), options);
chart.render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#basic-column5').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 320, type: 'rangeBar', toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, columnWidth: '25%' } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 2, colors: ['transparent'] },
		colors: colors,
		series: [
			{
				data: [
					{
						x: '1',
						y: [10, 50],
					},
					{
						x: '2',
						y: [20, 70],
					},
					{
						x: '3',
						y: [30, 90],
					},
					{
						x: '4',
						y: [20, 100],
					},
					{
						x: '5',
						y: [50, 90],
					},
					{
						x: '6',
						y: [20, 70],
					},
					{
						x: '7',
						y: [30, 50],
					},
					{
						x: '8',
						y: [30, 90],
					},
					{
						x: '9',
						y: [20, 100],
					},
					{
						x: '10',
						y: [40, 30],
					},
					{
						x: '11',
						y: [10, 50],
					},
					{
						x: '12',
						y: [20, 70],
					},
					{
						x: '13',
						y: [30, 90],
					},
					{
						x: '14',
						y: [20, 100],
					},
					{
						x: '15',
						y: [50, 90],
					},
					{
						x: '16',
						y: [20, 70],
					},
					{
						x: '17',
						y: [30, 50],
					},
					{
						x: '18',
						y: [30, 90],
					},
					{
						x: '19',
						y: [20, 100],
					},
					{
						x: '20',
						y: [40, 30],
					},
					{
						x: '21',
						y: [10, 50],
					},
					{
						x: '22',
						y: [20, 70],
					},
					{
						x: '23',
						y: [30, 90],
					},
					{
						x: '24',
						y: [20, 100],
					},
				],
			},
		],
		xaxis: {
			categories: [
				'00:00',
				'01:00',
				'02:00',
				'03:00',
				'04:00',
				'05:00',
				'06:00',
				'07:00',
				'08:00',
				'09:00',
				'10:00',
				'11:00',
				'12:00',
				'13:00',
				'14:00',
				'15:00',
				'16:00',
				'17:00',
				'18:00',
				'19:00',
				'20:00',
				'21:00',
				'22:00',
				'23:00',
			],
		},
		legend: { offsetY: 7, show: false },
		yaxis: { labels: { show: !1 } },
		fill: { opacity: 1 },
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
		tooltip: {
			custom: undefined,
			x: {
				show: true,
			},
			y: {
				formatter: function (o) {
					return o + ' %';
				},
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#basic-column5'), options);
chart.render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#basic-column6').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 300, type: 'bar', stacked: true, toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, columnWidth: '25%' } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 10, colors: ['transparent'] },
		colors: colors,

		series: [
			{
				name: '고강도',
				data: [
					44, 55, 41, 67, 22, 43, 50, 55, 41, 67, 44, 55, 41, 67, 22, 43, 50, 55, 41, 67, 44, 55, 41, 67, 22, 43, 50, 55, 41, 67, 44, 55, 41, 67, 22, 43, 50,
					55, 41, 67, 44, 55, 41, 67, 22, 43, 50, 55, 41, 67, 44, 55, 41, 67, 22, 43, 50, 55, 41, 67, 44, 55, 41, 67, 22, 43, 50, 55, 41, 67, 44, 55, 41, 67,
					22, 43, 50, 55, 41, 67, 44, 55, 41, 67, 22, 43, 50, 55, 41, 67,
				],
			},
			{
				name: '중강도',
				data: [
					13, 23, 20, 8, 13, 27, 60, 23, 20, 8, 13, 23, 20, 8, 13, 27, 60, 23, 20, 8, 13, 23, 20, 8, 13, 27, 60, 23, 20, 8, 13, 23, 20, 8, 13, 27, 60, 23, 20,
					8, 13, 23, 20, 8, 13, 27, 60, 23, 20, 8, 13, 23, 20, 8, 13, 27, 60, 23, 20, 8, 13, 23, 20, 8, 13, 27, 60, 23, 20, 8, 13, 23, 20, 8, 13, 27, 60, 23,
					20, 8, 13, 23, 20, 8, 13, 27, 60, 23, 20, 8,
				],
			},
			{
				name: '저강도',
				data: [
					11, 17, 15, 15, 21, 14, 40, 17, 15, 15, 11, 17, 15, 15, 21, 14, 40, 17, 15, 15, 11, 17, 15, 15, 21, 14, 40, 17, 15, 15, 11, 17, 15, 15, 21, 14, 40,
					17, 15, 15, 11, 17, 15, 15, 21, 14, 40, 17, 15, 15, 11, 17, 15, 15, 21, 14, 40, 17, 15, 15, 11, 17, 15, 15, 21, 14, 40, 17, 15, 15, 11, 17, 15, 15,
					21, 14, 40, 17, 15, 15, 11, 17, 15, 15, 21, 14, 40, 17, 15, 15,
				],
			},
		],
		xaxis: {
			categories: [
				'9/1',
				'9/2',
				'9/3',
				'9/4',
				'9/5',
				'9/6',
				'9/7',
				'9/8',
				'9/9',
				'9/10',
				'9/11',
				'9/12',
				'9/13',
				'9/14',
				'9/15',
				'9/16',
				'9/17',
				'9/18',
				'9/19',
				'9/20',
				'9/21',
				'9/22',
				'9/23',
				'9/24',
				'9/25',
				'9/26',
				'9/27',
				'9/28',
				'9/29',
				'9/30',
				'10/1',
				'10/2',
				'10/3',
				'10/4',
				'10/5',
				'10/6',
				'10/7',
				'10/8',
				'10/9',
				'10/10',
				'10/11',
				'10/12',
				'10/13',
				'10/14',
				'10/15',
				'10/16',
				'10/17',
				'10/18',
				'10/19',
				'10/20',
				'10/21',
				'10/22',
				'10/23',
				'10/24',
				'10/25',
				'10/26',
				'10/27',
				'10/28',
				'10/29',
				'10/30',
				'11/1',
				'11/2',
				'11/3',
				'11/4',
				'11/5',
				'11/6',
				'11/7',
				'11/8',
				'11/9',
				'11/10',
				'11/11',
				'11/12',
				'11/13',
				'11/14',
				'11/15',
				'11/16',
				'11/17',
				'11/18',
				'11/19',
				'11/20',
				'11/21',
				'11/22',
				'11/23',
				'11/24',
				'11/25',
				'11/26',
				'11/27',
				'11/28',
				'11/29',
				'11/30',
			],
		},
		legend: { offsetY: 7, show: false },
		yaxis: { labels: { show: !1 } },
		fill: { opacity: 1 },
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
		tooltip: {
			//enabled: [true,false],
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return e;
				},
			},
			y: {
				formatter: function (e, a) {
					return (
						'<div>- 총 ' +
						e +
						'kcal</div><div> <span style="position:relative;top:-2px;display:inline-block;width:5px;height:5px;margin-right:2px;border-radius:3px;background:#FF6B8E;"></span> 고강도 180kcal</div><div> <span style="position:relative;top:-2px;display:inline-block;width:5px;height:5px;margin-right:2px;border-radius:3px;background:#4DB87E;"></span> 중강도 60kcal</div> <div> <span style="position:relative;top:-2px;display:inline-block;width:5px;height:5px;margin-right:2px;border-radius:3px;background:#3D85C6;"></span> 저강도 70kcal</div>'
					);
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#basic-column6'), options);
chart.render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#basic-column7').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 300, type: 'bar', stacked: true, toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, columnWidth: '25%' } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 2, colors: ['transparent'] },
		colors: colors,

		series: [
			{
				name: '고강도',
				data: [44, 55, 41, 67, 22, 43, 50, 44, 55, 41, 67, 22],
			},
			{
				name: '중강도',
				data: [13, 23, 20, 8, 13, 27, 60, 44, 55, 41, 67, 22],
			},
			{
				name: '저강도',
				data: [11, 17, 15, 15, 21, 14, 40, 44, 55, 41, 67, 22],
			},
		],
		xaxis: {
			categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
		},
		legend: { offsetY: 7, show: false },
		yaxis: { labels: { show: !1 } },
		fill: { opacity: 1 },
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
		tooltip: {
			//enabled: [true,false],
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return e;
				},
			},
			y: {
				formatter: function (e, a) {
					return (
						'<div>- 총 ' +
						e +
						'kcal</div><div> <span style="position:relative;top:-2px;display:inline-block;width:5px;height:5px;margin-right:2px;border-radius:3px;background:#FF6B8E;"></span> 고강도 180kcal</div><div> <span style="position:relative;top:-2px;display:inline-block;width:5px;height:5px;margin-right:2px;border-radius:3px;background:#4DB87E;"></span> 중강도 60kcal</div> <div> <span style="position:relative;top:-2px;display:inline-block;width:5px;height:5px;margin-right:2px;border-radius:3px;background:#3D85C6;"></span> 저강도 70kcal</div>'
					);
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#basic-column7'), options);
chart.render();

if ($('#basic-column1-empty').length > 0) {
	var colors = ['#0acf97', '#7453ff', '#fa5c7c'],
		dataColors = $('#basic-column1-empty').data('colors');
	dataColors && (colors = dataColors.split(','));
	var options = {
			chart: { height: 170, type: 'bar', toolbar: { show: !0, offsetX: 10 } },
			plotOptions: { bar: { horizontal: !1, endingShape: 'rounded', columnWidth: '33%' } },
			dataLabels: { enabled: !1 },
			stroke: { show: !0, width: 2, colors: ['transparent'] },
			colors: colors,
			series: [
				{
					name: '기록수면',
					data: [6, 8, 6.5, 7, 10, 8, 6, 9, 10],
				},
			],
			xaxis: { categories: ['9/6', '9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13', '9/14'] },
			legend: { offsetY: 7, show: false },
			yaxis: { labels: { show: !1 } },
			fill: { opacity: 1 },
			grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
			tooltip: {
				y: {
					formatter: function (o) {
						return o + ' 시간';
					},
				},
			},
		},
		chart = new ApexCharts(document.querySelector('#basic-column1-empty'), options);
	chart.render();
}

(dataColors = $('#line-chart-01').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: {
		height: 148,
		type: 'line',
		id: 'yt',
		group: 'group-1',
	},
	colors: colors,
	dataLabels: { enabled: !1 },
	toolbar: { tools: { selection: !1 } },
	tooltip: {
		followCursor: !1,
		theme: 'dark',
		x: { show: !1 },
		marker: { show: !1 },
		y: {
			title: {
				formatter: function () {
					return '';
				},
			},
		},
	},
	title: {
		text: '혈압',
		align: 'left',
		style: {
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			color: '#808b96',
		},
	},
	stroke: { width: [3], curve: 'smooth' },
	series: [{ data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, { min: 10, max: 60 }) }],
	fill: { gradient: { enabled: !0, opacityFrom: 0.6, opacityTo: 0.8 } },
	legend: { position: 'top', horizontalAlign: 'left' },
	xaxis: { type: 'datetime' },
	yaxis: {
		labels: {
			minWidth: 30,
		},
	},
	grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
};
function generateDayWiseTimeSeries(e, t, a) {
	for (var o = 0, r = []; o < t; ) {
		var s = e,
			n = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
		r.push([s, n]), (e += 864e5), o++;
	}
	return r;
}
(chart = new ApexCharts(document.querySelector('#line-chart-01'), options)).render();

(dataColors = $('#line-chart-02').data('colors')) && (colors = dataColors.split(','));
var optionsline2 = {
		chart: {
			type: 'line',
			height: 148,
			id: 'fb',
			group: 'group-1',
		},
		colors: colors,
		stroke: { width: [3], curve: 'straight' },
		toolbar: { tools: { selection: !1 } },
		fill: { opacity: 1 },
		tooltip: {
			followCursor: !1,
			theme: 'dark',
			x: { show: !1 },
			marker: { show: !1 },
			y: {
				title: {
					formatter: function () {
						return '';
					},
				},
			},
		},
		title: {
			text: '혈당',
			align: 'left',
			style: {
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				color: '#808b96',
			},
		},
		series: [{ data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, { min: 10, max: 30 }) }],
		xaxis: { type: 'datetime' },
		yaxis: {
			labels: {
				minWidth: 30,
			},
		},
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
	},
	chartline2 = new ApexCharts(document.querySelector('#line-chart-02'), optionsline2);
chartline2.render();

(dataColors = $('#line-chart-03').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: {
		height: 148,
		type: 'line',
		id: 'yt',
		group: 'group-1',
	},
	colors: colors,
	dataLabels: { enabled: !1 },
	toolbar: { tools: { selection: !1 } },
	tooltip: {
		followCursor: !1,
		theme: 'dark',
		x: { show: !1 },
		marker: { show: !1 },
		y: {
			title: {
				formatter: function () {
					return '';
				},
			},
		},
	},
	title: {
		text: '식사',
		align: 'left',
		style: {
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			color: '#808b96',
		},
	},
	stroke: { width: [3], curve: 'smooth' },
	series: [{ data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, { min: 10, max: 60 }) }],
	fill: { gradient: { enabled: !0, opacityFrom: 0.6, opacityTo: 0.8 } },
	legend: { position: 'top', horizontalAlign: 'left' },
	xaxis: { type: 'datetime' },
	yaxis: {
		labels: {
			minWidth: 30,
		},
	},
	grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
};
function generateDayWiseTimeSeries(e, t, a) {
	for (var o = 0, r = []; o < t; ) {
		var s = e,
			n = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
		r.push([s, n]), (e += 864e5), o++;
	}
	return r;
}
(chart = new ApexCharts(document.querySelector('#line-chart-03'), options)).render();

(dataColors = $('#line-chart-04').data('colors')) && (colors = dataColors.split(','));
var optionsline2 = {
		chart: {
			type: 'line',
			height: 148,
			id: 'fb',
			group: 'group-1',
		},
		colors: colors,
		stroke: { width: [3], curve: 'straight' },
		toolbar: { tools: { selection: !1 } },
		fill: { opacity: 1 },
		tooltip: {
			followCursor: !1,
			theme: 'dark',
			x: { show: !1 },
			marker: { show: !1 },
			y: {
				title: {
					formatter: function () {
						return '';
					},
				},
			},
		},
		title: {
			text: '운동',
			align: 'left',
			style: {
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				color: '#808b96',
			},
		},
		series: [{ data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, { min: 10, max: 30 }) }],
		xaxis: { type: 'datetime' },
		yaxis: {
			labels: {
				minWidth: 30,
			},
		},
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
	},
	chartline2 = new ApexCharts(document.querySelector('#line-chart-04'), optionsline2);
chartline2.render();

(dataColors = $('#line-chart-11').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: { height: 270, type: 'line', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 45 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: '10px',
		},
	},
	stroke: { width: [3, 3], curve: 'smooth' },
	series: [{ name: '', data: [12, 11, 14, 18, 17, 13, 13] }],
	title: { text: '측정일자별 결과', align: 'left' },
	grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7'], title: { text: '' } },
	yaxis: { title: { text: '' }, min: 5, max: 23 },
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		followCursor: !1,
		marker: { show: !1 },
		x: {
			formatter: function (e) {
				return '2020-9-' + e;
			},
		},
		y: {
			formatter: function (e) {
				return '<div>10:12</div><div>' + e + 'mg/dL</div> <div>직접입력</div><div>어제 과음함</div>';
			},
		},
		style: {
			fontSize: '11px',
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: 'normal',
		},
	},
};
(chart = new ApexCharts(document.querySelector('#line-chart-11'), options)).render();

(dataColors = $('#line-chart-12').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: { height: 270, type: 'line', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 45 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: '10px',
		},
	},
	stroke: { width: [3, 3], curve: 'smooth' },
	series: [{ name: '', data: [12, 11, 14, 18, 17, 13, 13] }],
	title: { text: '측정시간별 결과', align: 'left' },
	grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7'], title: { text: '' } },
	yaxis: { title: { text: '' }, min: 5, max: 23 },
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		followCursor: !1,
		marker: { show: !1 },
		x: {
			formatter: function (e) {
				return '2020-5-' + e;
			},
		},
		y: {
			formatter: function (e) {
				return '<div>10:12</div><div> ' + e + 'mg/dL</div> <div>직접입력</div><div>식사를 거름</div><div>어제 과음함</div>';
			},
		},
		style: {
			fontSize: '11px',
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: 'normal',
		},
	},
};
(chart = new ApexCharts(document.querySelector('#line-chart-12'), options)).render();

(dataColors = $('#line-chart-p1').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: { height: 270, type: 'line', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 45 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: '10px',
		},
	},
	stroke: { width: [3, 3], curve: 'smooth' },
	series: [
		{ name: '고혈압', data: [28, 29, 33, 36, 32, 32, 33, 36, 32, 32, 33] },
		{
			name: '저혈압',
			data: [12, 11, 14, 18, 17, 13, 13, 18, 17, 13, 13],
		},
	],
	title: { text: '일자별 데이터 (최종 측정값)', align: 'left' },
	grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13'], title: { text: '' } },
	yaxis: { title: { text: '' }, min: 5, max: 40 },
	tooltip: {
		followCursor: !1,
		marker: { show: !0 },
		x: {
			formatter: function (e) {
				return '2020-9-' + e;
			},
		},
		y: {
			formatter: function (e) {
				return '<div>01일 ~ 02일</div><div> ' + e + '회 발생</div>';
			},
		},
		style: {
			fontSize: '11px',
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: 'normal',
		},
	},
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector('#line-chart-p1'), options)).render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#line-chart-p2').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 270, type: 'bar', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, endingShape: 'rounded', columnWidth: '55%' } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 2, colors: ['transparent'] },
		colors: colors,
		title: { text: '시간대별 데이터 (전체 측정값)', align: 'left' },
		series: [
			{ name: '저혈압', data: [66, 44, 55, 57, 56, 61, 58, 63, 60, 44, 55, 57, 56, 57, 56, 57, 56, 61, 58, 63, 60, 46] },
			{
				name: '고혈압',
				data: [94, 76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101, 98, 87, 114, 94, 76, 85, 101, 98, 87],
			},
		],
		xaxis: {
			categories: [
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'10',
				'11',
				'12',
				'13',
				'14',
				'15',
				'16',
				'17',
				'18',
				'19',
				'20',
				'21',
				'22',
				'23',
				'24',
				'25',
				'26',
				'27',
				'28',
				'29',
				'30',
			],
		},
		legend: { offsetY: 7, show: false },
		yaxis: { title: { text: '' }, show: !1 },
		fill: { opacity: 1 },
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#fff3fa', padding: { bottom: 5 } },
		tooltip: {
			followCursor: !1,
			marker: { show: !0 },
			x: {
				formatter: function (e) {
					return '2020-9-' + e;
				},
			},
			y: {
				formatter: function (e) {
					return '<div>AM 0H ~ 1H</div><div> ' + e + '회 발생</div>';
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#line-chart-p2'), options);
chart.render();

(dataColors = $('#line-chart-weight').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: { height: 380, type: 'line', zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	toolbar: { tools: { selection: !1 } },
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: '10px',
		},
	},
	stroke: { width: [3, 3], curve: 'smooth' },
	series: [
		{ name: '직접입력 ', data: [60, 90, 70, 123, 81, 83, 79] },
		{
			name: 'Low ',
			data: [20, 30, 40, 23, 31, 23, 39],
		},
	],
	title: { text: '', align: 'left' },
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
				return '2020-05-22';
			},
		},
		y: {
			formatter: function (o) {
				return o + 'kg';
			},
		},
	},
	grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], title: { text: '' } },
	yaxis: { title: { text: 'Weight' }, min: 5, max: 150 },
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector('#line-chart-weight'), options)).render();

(dataColors = $('#line-chart-temperature').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: { height: 380, type: 'line', zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: '10px',
		},
	},
	stroke: { width: [3, 3], curve: 'smooth' },
	series: [{ name: '체온 ', data: [36.3, 37.4, 36.5, 36.9, 37.1, 38, 36.2] }],
	title: { text: '일 3회측정', align: 'left' },
	grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['15', '16', '17', '18', '19', '21', '22'], title: { text: '' } },
	yaxis: { title: { text: 'Temperature' }, min: 35, max: 42 },
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		y: {
			formatter: function (o) {
				return o + ' ℃';
			},
		},
	},
};
(chart = new ApexCharts(document.querySelector('#line-chart-temperature'), options)).render();

(dataColors = $('#line-chart-wc').data('colors')) && (colors = dataColors.split(','));
options = {
	chart: { height: 380, type: 'line', zoom: { enabled: !0 }, toolbar: { show: !0 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: '10px',
		},
	},
	stroke: { width: [3, 3], curve: 'smooth' },
	series: [{ name: '허리둘레 ', data: [78, 69, 73, 89, 74, 70, 77] }],
	title: { text: '일 3회측정', align: 'left' },
	grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa' },
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['15', '16', '17', '18', '19', '21', '22'], title: { text: '' } },
	yaxis: { title: { text: 'Temperature' }, min: 40, max: 120 },
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5 },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	tooltip: {
		y: {
			formatter: function (o) {
				return o + ' cm';
			},
		},
	},
};
(chart = new ApexCharts(document.querySelector('#line-chart-wc'), options)).render();

var colors = ['#39afd1'],
	dataColors = $('#basic-radialbar').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 253, type: 'radialBar' },
		plotOptions: {
			radialBar: {
				dataLabels: {
					name: { name: { show: !0 }, fontSize: '24px', color: '#65757d', offsetY: 5 },
					value: {
						offsetY: -5,
						fontSize: '14px',
						color: '#65757d',
						offsetY: 15,
						formatter: function (o) {
							return 'mmHg';
						},
					},
				},
				hollow: { size: '70%' },
			},
		},
		colors: colors,
		series: [70],
		labels: ['120/95'],
	},
	chart = new ApexCharts(document.querySelector('#basic-radialbar'), options);
chart.render();

var colors = ['#39afd1'],
	dataColors = $('#line-chart-meal01').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 340, type: 'line', toolbar: { show: false } },
		plotOptions: { bar: { horizontal: !1 } },
		dataLabels: { enabled: !1 },
		series: [
			{
				name: '',
				type: 'column',
				data: [2412, 3600, 4748, 3870, 2240, 3280, 4690],
			},
			{
				name: '',
				type: 'line',
				data: [2000, 3000, 4000, 3800, 2200, 3200, 4600],
			},
		],
		stroke: {
			width: [0, 2],
		},
		colors: colors,
		xaxis: { categories: ['6/1', '6/2', '6/3', '6/4', '6/5', '6/6', '6/7'], title: { text: '' } },
		states: { hover: { filter: 'none' } },
		grid: { borderColor: '#f1f3fa' },
		//title: { text: "일자별 섭취량", align: "left" },
		tooltip: {
			//enabled: [true,false],
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return '2020-' + e;
				},
			},
			y: {
				formatter: function (e, a) {
					if (a.seriesIndex === 0) {
						return '<div> ' + e + 'kcal</div><div> - 탄수화물 : 153g (59%)</div><div> - 단백질 : 25g (26%)</div> <div> - 지방 : 13g (25%)</div>';
					}
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
		legend: { show: false },
	},
	chart = new ApexCharts(document.querySelector('#line-chart-meal01'), options);
chart.render();

var colors = ['#39afd1'],
	dataColors = $('#line-chart-meal02').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 340, type: 'line', toolbar: { show: !1 } },
		plotOptions: { bar: { horizontal: !1 } },
		dataLabels: { enabled: !1 },
		series: [
			{
				name: '',
				type: 'column',
				data: [300, 600, 900, 1200, 1500, 1800, 2100],
			},
			{
				name: '',
				type: 'line',
				data: [300, 600, 900, 1200, 1500, 1800, 2100],
			},
		],
		stroke: {
			width: [0, 2],
		},
		colors: colors,
		xaxis: {
			categories: ['6/1', '6/2', '6/3', '6/4', '6/5', '6/6'],
			title: { text: '' },
		},
		states: { hover: { filter: 'none' } },
		grid: { borderColor: '#f1f3fa' },
		title: { text: '일자별 나트륨 섭취량', align: 'left' },
		tooltip: {
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return '2020-' + e;
				},
			},
			y: {
				formatter: function (e, a) {
					if (a.seriesIndex === 0) {
						return '<div> ' + e + ' mg</div>';
					}
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
		legend: { show: false },
	},
	chart = new ApexCharts(document.querySelector('#line-chart-meal02'), options);
chart.render();

var colors = ['#39afd1'],
	dataColors = $('#line-chart-meal03').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 340, type: 'line', toolbar: { show: !1 } },
		plotOptions: { bar: { horizontal: !1 } },
		dataLabels: { enabled: !1 },
		series: [
			{
				name: '',
				type: 'column',
				data: [50, 100, 150, 200, 250, 300, 350],
			},
			{
				name: '',
				type: 'line',
				data: [50, 100, 150, 200, 250, 300, 350],
			},
		],
		stroke: {
			width: [0, 2],
		},
		colors: colors,
		xaxis: {
			categories: ['6/1', '6/2', '6/3', '6/4', '6/5', '6/6'],
			title: { text: '' },
		},
		states: { hover: { filter: 'none' } },
		grid: { borderColor: '#f1f3fa' },
		title: { text: '일자별 당 섭취량', align: 'left' },
		tooltip: {
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return '2020-' + e;
				},
			},
			y: {
				formatter: function (e, a) {
					if (a.seriesIndex === 0) {
						return '<div> ' + e + ' g</div>';
					}
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
		legend: { show: false },
	},
	chart = new ApexCharts(document.querySelector('#line-chart-meal03'), options);
chart.render();

var options = {
	chart: { height: 300, type: 'pie' },
	series: [400, 500, 600, 700],

	legend: {
		show: !0,
		position: 'bottom',
		horizontalAlign: 'center',
		verticalAlign: 'middle',
		floating: !1,
		fontSize: '13px',
		offsetX: 0,
		offsetY: 7,
	},
	title: { text: '1일 끼니별 섭취 비율', align: 'left' },
	labels: ['아침', '점심', '저녁', '간식'],
	responsive: [{ breakpoint: 600, options: { chart: { height: 280 }, legend: { show: !1 } } }],
	tooltip: {
		enabled: false,
	},
	dataLabels: {
		enabled: true,
		formatter: function (val, opt) {
			return [opt.w.globals.labels[opt.seriesIndex] + ':', opt.w.globals.initialSeries[opt.seriesIndex] + 'Kcal', '(' + val.toFixed(0) + '%)'];
		},
	},
};
(chart = new ApexCharts(document.querySelector('#donut-chart-meal01'), options)).render();

var colors = ['#f60', '#0acf97'],
	dataColors = $('#donut-chart-stress01').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
	chart: { height: 300, type: 'pie' },
	series: [20, 30, 50],
	colors: colors,
	legend: {
		show: !0,
		position: 'bottom',
		horizontalAlign: 'center',
		verticalAlign: 'middle',
		floating: !1,
		fontSize: '13px',
		offsetX: 0,
		offsetY: 0,
	},
	labels: ['높음', '보통', '낮음'],
	tooltip: {
		y: {
			formatter: function (o) {
				return '높음: ' + o + '일 (' + o + '%)';
			},
		},
	},
	dataLabels: {
		enabled: true,
		formatter: function (val, opt) {
			return [opt.w.globals.labels[opt.seriesIndex] + ':', opt.w.globals.initialSeries[opt.seriesIndex] + '일', '(' + val.toFixed(0) + '%)'];
		},
	},
};
(chart = new ApexCharts(document.querySelector('#donut-chart-stress01'), options)).render();

var colors = ['#f60', '#0acf97'],
	dataColors = $('#donut-chart-activity01').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
	chart: { height: 300, type: 'pie' },
	series: [20, 30, 50],
	colors: colors,
	legend: {
		show: !0,
		position: 'bottom',
		horizontalAlign: 'center',
		verticalAlign: 'middle',
		floating: !1,
		fontSize: '13px',
		offsetX: 0,
		offsetY: 0,
	},
	labels: ['고강도', '중강도', '저강도'],
	tooltip: {
		y: {
			formatter: function (o) {
				return '고강도: ' + o + '일 (' + o + '%)';
			},
		},
	},
	dataLabels: {
		enabled: true,
		formatter: function (val, opt) {
			return [opt.w.globals.labels[opt.seriesIndex] + ':', opt.w.globals.initialSeries[opt.seriesIndex] + '일', '(' + val.toFixed(0) + '%)'];
		},
		style: {
			colors: ['#000'],
		},
		background: {
			enabled: true,
			foreColor: '#fff',
			borderRadius: 3,
			padding: 5,
		},
	},
};
(chart = new ApexCharts(document.querySelector('#donut-chart-activity01'), options)).render();

var options = {
	chart: { height: 300, type: 'pie' },
	theme: {
		palette: 'palette3', // upto palette10
	},
	series: [400, 500, 600],
	legend: {
		show: !0,
		position: 'bottom',
		horizontalAlign: 'center',
		verticalAlign: 'middle',
		floating: !1,
		fontSize: '13px',
		offsetX: 0,
		offsetY: 7,
	},
	title: { text: '1일 영양소별 섭취 비율', align: 'left' },
	labels: ['탄수화물', '단백질', '지방'],
	responsive: [{ breakpoint: 600, options: { chart: { height: 280 }, legend: { show: !1 } } }],
	tooltip: {
		enabled: false,
	},
	dataLabels: {
		enabled: true,
		formatter: function (val, opt) {
			return [opt.w.globals.labels[opt.seriesIndex] + ':', opt.w.globals.initialSeries[opt.seriesIndex] + 'Kcal', '(' + val.toFixed(0) + '%)'];
		},
	},
};
(chart = new ApexCharts(document.querySelector('#donut-chart-meal02'), options)).render();

var colors = ['#7453ff', '#0acf97'],
	dataColors = $('#line-chart-walking').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		chart: { height: 280, type: 'line', toolbar: { show: !1 } },
		series: [
			{ name: '거리', type: 'column', data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160] },
			{ name: '소비칼로리', type: 'line', data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16] },
		],
		stroke: { width: [0, 4] },
		labels: [
			'01 Jan 2001',
			'02 Jan 2001',
			'03 Jan 2001',
			'04 Jan 2001',
			'05 Jan 2001',
			'06 Jan 2001',
			'07 Jan 2001',
			'08 Jan 2001',
			'09 Jan 2001',
			'10 Jan 2001',
			'11 Jan 2001',
			'12 Jan 2001',
		],
		xaxis: { type: 'datetime' },
		colors: colors,
		yaxis: [{ title: { text: '걸음수' } }, { opposite: !0, title: { text: '소비 칼로리' } }],
		legend: { offsetY: 7 },
		grid: { borderColor: '#f1f3fa', padding: { bottom: 5 } },
	},
	chart = new ApexCharts(document.querySelector('#line-chart-walking'), options);
chart.render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#line-chart-sleep').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		colors: colors,
		series: [
			{
				name: 'Website Blog',
				type: 'column',
				data: [6, 8, 6.5, 7, 10, 8, 6, 9, 10],
			},
			{
				name: 'Social Media',
				type: 'line',
				data: [5, 9, 10, 11, 5, 4, 6, 7, 8],
			},
		],
		legend: { offsetY: 7, show: false },
		chart: {
			height: 380,
			type: 'line',
		},
		stroke: {
			width: [0, 4],
		},
		dataLabels: {
			enabled: true,
			enabledOnSeries: [1],
		},
		labels: ['9/6', '9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13', '9/14'],
		xaxis: {
			//type: 'datetime',
		},
		yaxis: [
			{
				labels: { show: false },
				title: {
					text: '',
				},
			},
			{
				labels: { show: false },
				opposite: true,
			},
		],
		tooltip: {
			//enabled: [true,false],
			followCursor: !1,
			marker: { show: !1 },
			x: {
				formatter: function (e) {
					return '9/' + e;
				},
			},
			y: {
				formatter: function (e, a) {
					if (a.seriesIndex === 0) {
						return '<div>7시간 50분<br />핏비트<br />수면점수 70점</div>';
					}
				},
			},
			style: {
				fontSize: '11px',
				fontFamily: '"Spoqa Han Sans Regular" sans-serif',
				fontWeight: 'normal',
			},
		},
	},
	chart = new ApexCharts(document.querySelector('#line-chart-sleep'), options);
chart.render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#insullin-detail-chart').data('colors');
dataColors && (colors = dataColors.split(','));
options = {
	chart: {
		height: 380,
		type: 'line',
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
			name: '권고용량',
			type: 'column',
			data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
		},
		{
			name: '투여용량',
			type: 'column',
			data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
		},
		{
			name: '혈당(아침식전)',
			type: 'line',
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
				text: '환자 투여 용량',
				style: {
					fontSize: '14px',
					fontFamily: '"Spoqa Han Sans Regular" sans-serif',
					fontWeight: 'normal',
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
				text: '의료진 권고 용량',
				style: {
					fontSize: '14px',
					fontFamily: '"Spoqa Han Sans Regular" sans-serif',
					fontWeight: 'normal',
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
				text: '아침 식전 셜당',
				style: {
					fontSize: '14px',
					fontFamily: '"Spoqa Han Sans Regular" sans-serif',
					fontWeight: 'normal',
				},
			},
		},
	],
	tooltip: {
		y: {
			formatter: function (o) {
				return o + ' Unit';
			},
		},
	},
	grid: {
		borderColor: '#f1f3fa',
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
(chart = new ApexCharts(document.querySelector('#insullin-detail-chart'), options)).render();

var colors = ['#7453ff', '#0acf97'],
	dataColors = $('#exercise-video-detail-chart').data('colors');
dataColors && (colors = dataColors.split(','));
options = {
	chart: {
		height: 380,
		type: 'line',
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
			name: '동영상 시청시간',
			type: 'column',
			data: [420, 450, 400, 700, 200, 410, 180, 370, 450, 350, 300, 180],
		},
		{
			name: '소비 칼로리',
			type: 'line',
			data: [20, 29, 37, 36, 44, 45, 50, 58, 30, 42, 22, 19],
		},
	],
	colors: colors,
	xaxis: {
		categories: ['Jan 01', 'Jan 02', 'Jan 03', 'Jan 04', 'Jan 05', 'Jan 06', 'Jan 07', 'Jan 08', 'Jan 09', 'Jan 10', 'Jan 11', 'Jan 12'],
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
				text: '동영상 시청시간(분)',
				style: {
					fontSize: '14px',
					fontFamily: '"Spoqa Han Sans Regular" sans-serif',
					fontWeight: 'normal',
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
				text: '소비 칼로리(kcal)',
				style: {
					fontSize: '14px',
					fontFamily: '"Spoqa Han Sans Regular" sans-serif',
					fontWeight: 'normal',
				},
			},
		},
	],
	grid: {
		borderColor: '#f1f3fa',
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
(chart = new ApexCharts(document.querySelector('#exercise-video-detail-chart'), options)).render();

colors = ['#7453ff', '#0acf97', '#fa5c7c', '#ffbc00'];
(dataColors = $('#report-chart01').data('colors')) && (colors = dataColors.split(','));
options = {
	annotations: {
		yaxis: [
			{
				y: 100,
				y2: 150,
				borderColor: '#4db87e',
				fillColor: '#4db87e',
				opacity: 0.3,
			},
		],
	},
	chart: { height: 170, type: 'line', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: !0,
		style: {
			fontSize: '10px',
		},
	},
	stroke: { width: [3, 3], curve: 'smooth' },
	series: [
		{
			name: '',
			data: [160, 120, 80, 40, 0, 80, 10],
		},
		{
			name: '',
			data: [10, 40, 20, 90, 80, 100, 20],
		},
	],

	grid: {
		show: true,
		borderColor: '#e5e5e5',
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
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['월', '화', '수', '목', '금', '토', '일'], title: { text: '' } },
	yaxis: {
		title: { text: '' },
		labels: {
			align: 'left',
			offsetX: -30,
			minWidth: 60,
		},
		max: 150,
		tickAmount: 4,
	},
	tooltip: {
		followCursor: !1,
		marker: { show: !0 },
		x: {
			formatter: function (e) {
				return '토요일';
			},
		},
		y: {
			formatter: function (e) {
				return '<div>10/23  ' + e + 'mg/dL</div>';
			},
		},
		style: {
			fontSize: '11px',
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: 'normal',
		},
	},
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector('#report-chart01'), options)).render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#report-chart02').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		annotations: {
			yaxis: [
				{
					y: 100,
					y2: 150,
					borderColor: '#4db87e',
					fillColor: '#4db87e',
					opacity: 0.3,
				},
			],
		},
		chart: { height: 170, type: 'rangeBar', toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, columnWidth: '25%' } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 2, colors: ['transparent'] },
		colors: colors,
		series: [
			{
				name: '',
				data: [
					{
						x: '',
						y: [10, 50],
					},
					{
						x: '',
						y: [20, 40],
					},
					{
						x: '',
						y: [40, 30],
					},
					{
						x: '',
						y: [20, 50],
					},
					{
						x: '',
						y: [10, 100],
					},
					{
						x: '',
						y: [30, 10],
					},
					{
						x: '',
						y: [20, 80],
					},
				],
			},
			{
				name: '월요일',
				data: [
					{
						x: '',
						y: [10, 30],
					},
					{
						x: '',
						y: [20, 70],
					},
					{
						x: '',
						y: [30, 60],
					},
					{
						x: '',
						y: [40, 50],
					},
					{
						x: '',
						y: [50, 30],
					},
					{
						x: '',
						y: [20, 100],
					},
					{
						x: '',
						y: [10, 90],
					},
				],
			},
		],
		fill: { opacity: 1 },
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
		xaxis: { categories: ['월', '화', '수', '목', '금', '토', '일'], title: { text: '' } },
		yaxis: {
			title: { text: '' },
			labels: {
				align: 'left',
				offsetX: -30,
				minWidth: 60,
			},
			max: 150,
			tickAmount: 4,
		},
		tooltip: {
			custom: undefined,
			x: {
				show: true,
			},
			y: {
				formatter: function (o) {
					return o + ' mg/dL';
				},
			},
		},
		legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
		responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	},
	chart = new ApexCharts(document.querySelector('#report-chart02'), options);
chart.render();

var colors = ['#7453ff', '#0acf97', '#fa5c7c'],
	dataColors = $('#report-chart03').data('colors');
dataColors && (colors = dataColors.split(','));
var options = {
		annotations: {
			yaxis: [
				{
					y: 35,
					y2: 70,
					borderColor: '#ffd700',
					fillColor: '#ffd700',
					opacity: 0.3,
				},
			],
		},
		chart: { height: 170, type: 'rangeBar', toolbar: { show: !0, offsetX: 10 } },
		plotOptions: { bar: { horizontal: !1, columnWidth: '25%' } },
		dataLabels: { enabled: !1 },
		stroke: { show: !0, width: 2, colors: ['transparent'] },
		colors: colors,
		series: [
			{
				name: '',
				data: [
					{
						x: '',
						y: [10, 50],
					},
					{
						x: '',
						y: [20, 40],
					},
					{
						x: '',
						y: [40, 30],
					},
					{
						x: '',
						y: [20, 50],
					},
					{
						x: '',
						y: [10, 100],
					},
					{
						x: '',
						y: [30, 10],
					},
					{
						x: '',
						y: [20, 80],
					},
				],
			},
			{
				name: '',
				data: [
					{
						x: '',
						y: [10, 30],
					},
					{
						x: '',
						y: [20, 70],
					},
					{
						x: '',
						y: [30, 60],
					},
					{
						x: '',
						y: [40, 50],
					},
					{
						x: '',
						y: [50, 30],
					},
					{
						x: '',
						y: [20, 100],
					},
					{
						x: '',
						y: [10, 90],
					},
				],
			},
		],
		fill: { opacity: 1 },
		grid: { row: { colors: ['transparent', 'transparent'], opacity: 0.2 }, borderColor: '#f1f3fa', padding: { bottom: 5 } },
		xaxis: { categories: ['월', '화', '수', '목', '금', '토', '일'], title: { text: '' } },
		yaxis: {
			show: false,
		},
		tooltip: {
			custom: undefined,
			x: {
				show: true,
			},
			y: {
				formatter: function (o) {
					return o + ' mg/dL';
				},
			},
		},
		legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
		responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
	},
	chart = new ApexCharts(document.querySelector('#report-chart03'), options);
chart.render();

colors = ['#7453ff', '#0acf97', '#fa5c7c', '#ffbc00'];
(dataColors = $('#report-chart04').data('colors')) && (colors = dataColors.split(','));
options = {
	annotations: {
		yaxis: [
			{
				y: 3000,
				y2: 4000,
				borderColor: '#4db87e',
				fillColor: '#4db87e',
				opacity: 0.3,
			},
		],
	},
	chart: { height: 170, type: 'bar', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: false,
		style: {
			fontSize: '10px',
		},
	},
	plotOptions: { bar: { columnWidth: '30%' } },
	series: [
		{
			name: '고혈압 ',
			data: [1150, 2090, 3100, 1123, 4081, 1110, 2096],
		},
		{
			name: '저혈압',
			data: [2022, 1048, 3040, 2072, 3044, 1041, 2054],
		},
	],

	grid: {
		show: true,
		borderColor: '#e5e5e5',
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
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['월', '화', '수', '목', '금', '토', '일'], title: { text: '' } },
	yaxis: {
		title: { text: '' },
		labels: {
			align: 'left',
			offsetX: -30,
			minWidth: 60,
		},
		max: 4000,
		tickAmount: 4,
	},
	tooltip: {
		followCursor: !1,
		marker: { show: !0 },
		x: {
			formatter: function (e) {
				return e + '요일';
			},
		},
		y: {
			formatter: function (e) {
				return '<div>10/23  ' + e + 'kcal</div>';
			},
		},
		style: {
			fontSize: '11px',
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: 'normal',
		},
	},
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector('#report-chart04'), options)).render();

colors = ['#7453ff', '#0acf97', '#fa5c7c', '#ffbc00'];
(dataColors = $('#report-chart05').data('colors')) && (colors = dataColors.split(','));
options = {
	annotations: {
		yaxis: [
			{
				y: 0,
				y2: 35,
				borderColor: '#ff6b8e',
				fillColor: '#ff6b8e',
				opacity: 0.3,
			},
		],
	},
	chart: { height: 170, type: 'bar', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: false,
		style: {
			fontSize: '10px',
		},
	},
	plotOptions: { bar: { columnWidth: '30%' } },
	series: [
		{
			name: '고혈압 ',
			data: [50, 90, 30, 23, 81, 10, 96],
		},
		{
			name: '저혈압',
			data: [22, 48, 40, 72, 44, 41, 54],
		},
	],

	grid: {
		show: true,
		borderColor: '#e5e5e5',
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
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['월', '화', '수', '목', '금', '토', '일'], title: { text: '' } },
	yaxis: {
		title: { text: '' },
		labels: {
			align: 'left',
			offsetX: -30,
			minWidth: 60,
		},
		max: 100,
		tickAmount: 2,
	},
	tooltip: {
		followCursor: !1,
		marker: { show: !0 },
		x: {
			formatter: function (e) {
				return e + '요일';
			},
		},
		y: {
			formatter: function (e) {
				return '<div>10/23  ' + e + 'kcal</div>';
			},
		},
		style: {
			fontSize: '11px',
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: 'normal',
		},
	},
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector('#report-chart05'), options)).render();

colors = ['#7453ff', '#0acf97', '#fa5c7c', '#ffbc00'];
(dataColors = $('#report-chart06').data('colors')) && (colors = dataColors.split(','));
options = {
	annotations: {
		yaxis: [
			{
				y: 0,
				y2: 3500,
				borderColor: '#ff6b8e',
				fillColor: '#ff6b8e',
				opacity: 0.3,
			},
		],
	},
	chart: { height: 170, type: 'bar', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: false,
		style: {
			fontSize: '10px',
		},
	},
	plotOptions: { bar: { columnWidth: '30%' } },
	series: [
		{
			name: '고혈압 ',
			data: [1050, 3090, 6030, 2083, 8081, 2010, 5096],
		},
		{
			name: '저혈압',
			data: [5022, 4048, 5040, 1072, 6044, 7041, 4054],
		},
	],

	grid: {
		show: true,
		borderColor: '#e5e5e5',
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
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['월', '화', '수', '목', '금', '토', '일'], title: { text: '' } },
	yaxis: {
		title: { text: '' },
		labels: {
			align: 'left',
			offsetX: -30,
			minWidth: 60,
		},
		max: 10000,
		tickAmount: 2,
	},
	tooltip: {
		followCursor: !1,
		marker: { show: !0 },
		x: {
			formatter: function (e) {
				return e + '요일';
			},
		},
		y: {
			formatter: function (e) {
				return '<div>10/23  ' + e + 'kcal</div>';
			},
		},
		style: {
			fontSize: '11px',
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: 'normal',
		},
	},
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector('#report-chart06'), options)).render();

colors = ['#7453ff', '#0acf97', '#fa5c7c', '#ffbc00'];
(dataColors = $('#report-chart07').data('colors')) && (colors = dataColors.split(','));
options = {
	annotations: {
		yaxis: [
			{
				y: 0,
				y2: 35,
				borderColor: '#ff6b8e',
				fillColor: '#ff6b8e',
				opacity: 0.3,
			},
		],
	},
	chart: { height: 170, type: 'bar', zoom: { enabled: !0 }, toolbar: { show: !0, offsetX: 10 } },
	colors: colors,
	dataLabels: {
		enabled: false,
		style: {
			fontSize: '10px',
		},
	},
	plotOptions: { bar: { columnWidth: '30%' } },
	series: [
		{
			name: '고혈압 ',
			data: [50, 90, 30, 23, 81, 10, 96],
		},
		{
			name: '저혈압',
			data: [22, 48, 40, 72, 44, 41, 54],
		},
	],

	grid: {
		show: true,
		borderColor: '#e5e5e5',
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
	markers: { style: 'inverted', size: 6 },
	xaxis: { categories: ['월', '화', '수', '목', '금', '토', '일'], title: { text: '' } },
	yaxis: {
		title: { text: '' },
		labels: {
			align: 'left',
			offsetX: -30,
			minWidth: 60,
		},
		max: 100,
		tickAmount: 4,
	},
	tooltip: {
		followCursor: !1,
		marker: { show: !0 },
		x: {
			formatter: function (e) {
				return e + '요일';
			},
		},
		y: {
			formatter: function (e) {
				return '<div>10/23  ' + e + '점</div>';
			},
		},
		style: {
			fontSize: '11px',
			fontFamily: '"Spoqa Han Sans Regular" sans-serif',
			fontWeight: 'normal',
		},
	},
	legend: { position: 'top', horizontalAlign: 'right', floating: !0, offsetY: -25, offsetX: -5, show: false },
	responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
};
(chart = new ApexCharts(document.querySelector('#report-chart07'), options)).render();

$(document).ready(function () {
	$('#check-result-table').DataTable({
		scrollX: true,
		searching: false,
		lengthChange: false,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: ' _PAGE_ / _PAGES_ Pages',
		},
		columns: [{ orderable: 1, width: '150px' }, { orderable: 1 }, { orderable: 0 }, { orderable: 0 }, { orderable: 0 }],
		order: [[3, 'desc']],
		drawCallback: function () {
			$('#check-result-table_paginate > .pagination').addClass('pagination-rounded');
		},
	});

	$('#telehealth-datatable').DataTable({
		scrollX: true,
		searching: false,
		lengthChange: false,
		pageLength: 10,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: ' _PAGE_ / _PAGES_ Pages',
		},
		columns: [{ orderable: 1 }, { orderable: 1 }, { orderable: 1 }, { orderable: 0 }, { orderable: 1 }, { orderable: 0 }],
		order: [[1, 'desc']],
		drawCallback: function () {
			$('#telehealth-datatable_paginate > .pagination').addClass('pagination-rounded');
		},
	});

	$('#contents-preview-datatable').DataTable({
		scrollX: true,
		searching: true,
		lengthChange: false,
		pageLength: 6,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: ' _PAGE_ / _PAGES_ Pages',
			search: '검색: ',
		},
		columns: [
			{
				orderable: 1,
				width: '300px',
			},
			{ orderable: 1 },
			{ orderable: 1 },
			{ orderable: 1 },
			{ orderable: 0 },
			{ orderable: 0 },
		],
		order: [[1, 'desc']],
		drawCallback: function () {
			$('#contents-preview-datatable_paginate > .pagination').addClass('pagination-rounded');
		},
		createdRow: function (row, data, dataIndex) {
			$('td:eq(0)', row).css('min-width', '300px');
		},
	});

	$('#bg-history-modal').on('shown.bs.modal', function () {
		if (!$('#bg-history-modal-table').hasClass('active')) {
			$('#bg-history-modal-table')
				.addClass('active')
				.DataTable({
					scrollX: true,
					searching: false,
					language: {
						paginate: {
							previous: "<i class='mdi mdi-chevron-left'>",
							next: "<i class='mdi mdi-chevron-right'>",
						},
						info: ' _PAGE_ / _PAGES_ Pages',
						lengthMenu:
							'<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기',
					},
					columns: [
						{ orderable: !0 },
						{ orderable: !0 },
						{ orderable: !0, width: '150px' },
						{ orderable: !0 },
						{ orderable: !0 },
						{ orderable: !0 },
						{ orderable: !0, width: '150px' },
						{ orderable: !0, width: '150px' },
						{ orderable: !0 },
					],
					order: [[0, 'desc']],
					drawCallback: function () {
						$('#bg-history-modal-table_paginate > .pagination').addClass('pagination-rounded');
					},
				});
		}
	});

	$('#insullin-manage-modal').on('shown.bs.modal', function () {
		if (!$('#insullin-datatable').hasClass('active')) {
			$('#insullin-datatable')
				.addClass('active')
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
						info: ' _PAGE_ / _PAGES_ Pages',
					},
					columns: [
						{
							orderable: 1,
						},
						{
							orderable: 1,
							render: $.fn.dataTable.render.ellipsis(20, true, true),
						},
						{
							orderable: 1,
							render: $.fn.dataTable.render.ellipsis(20, true, true),
						},
						{ orderable: 1 },
						{
							orderable: 1,
							render: $.fn.dataTable.render.ellipsis(20, true, true),
						},
						{ orderable: 1 },
						{ orderable: !1 },
					],
					order: [[0, 'desc']],
					drawCallback: function () {
						$('#insullin-datatable_paginate > .pagination').addClass('pagination-rounded');
					},
				});
		}
	});

	$('#insullin-list-modal').on('shown.bs.modal', function () {
		if (!$('#insullin-list-datatable').hasClass('active')) {
			$('#insullin-list-datatable')
				.addClass('active')
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
						info: ' _PAGE_ / _PAGES_ Pages',
					},
					columns: [
						{ orderable: 1 },
						{ orderable: 1, width: '120px' },
						{ orderable: 1 },
						{ orderable: 1 },
						{ orderable: 1, width: '120px' },
						{ orderable: 1 },
						{ orderable: !1 },
					],
					order: [[0, 'desc']],
					drawCallback: function () {
						$('#insullin-list-datatable_paginate > .pagination').addClass('pagination-rounded');
					},
				});
		}
	});

	$('#exercise-video-list-modal').on('shown.bs.modal', function () {
		if (!$('#exercise-video-list-datatable').hasClass('active')) {
			$('#exercise-video-list-datatable')
				.addClass('active')
				.DataTable({
					scrollX: true,
					lengthChange: false,
					searching: false,
					language: {
						paginate: {
							previous: "<i class='mdi mdi-chevron-left'>",
							next: "<i class='mdi mdi-chevron-right'>",
						},
						info: ' _PAGE_ / _PAGES_ Pages',
					},
					columns: [{ orderable: 1 }, { orderable: 1 }, { orderable: 1, width: '160px' }, { orderable: 1, width: '320px' }, { orderable: 1 }, { orderable: 1 }],
					order: [[0, 'desc']],
					drawCallback: function () {
						$('#exercise-video-list-datatable_paginate > .pagination').addClass('pagination-rounded');
					},
				});
		}
	});

	$('.story-box').on('click', function (e) {
		$(this).toggleClass('active');
	});

	$('.direct-select').on('change', function (e) {
		if ($(this).val() == 'direct') $(this).parent().addClass('active');
		else $(this).parent().removeClass('active');
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
	var w = $('#main-container').width();
	var w2 = $('#chatting-wrapper').width();
	var h = $(window).height();
	if ($(window).width() > 768) {
		$('.chatting-wrapper').css('width', w2);
		$('.conversation-list').height(h - 430);
	} else {
		$('.chatting-wrapper').css('width', w);
	}
	// $(".chatting-wrapper").css("margin-top", scroll_top+"px");

	var width = $('.hr-span').parent().width();
	var width1 = $('.hr-span').width();
	$('.hr-span').css('left', (width - width1) / 2 + 'px');
}

var today = new Date($.now());
var events = [
	{
		title: '당뇨약',
		start: new Date(2020, 11, 4),
		className: 'bg-warning',
	},
	{
		title: '당뇨약',
		start: new Date(2020, 11, 4),
		className: 'bg-warning',
	},
	{
		title: '당뇨약',
		start: new Date(2020, 11, 4),
		className: 'bg-warning',
	},
	{
		title: '고혈압',
		start: new Date(2020, 11, 4),
		className: 'bg-info',
	},
	{
		title: '고혈압',
		start: new Date(2020, 11, 4),
		className: 'bg-info',
	},
	{
		title: '고혈압',
		start: new Date(2020, 11, 4),
		className: 'bg-info',
	},
	{
		title: '고혈압',
		start: new Date(2020, 11, 5),
		className: 'bg-info',
	},
	{
		title: '고혈압',
		start: new Date(2020, 11, 5),
		className: 'bg-info',
	},
	{
		title: '당뇨약',
		start: new Date(2020, 11, 5),
		className: 'bg-warning',
	},
	{
		title: '당뇨약',
		start: new Date(2020, 11, 6),
		className: 'bg-warning',
	},
	{
		title: '고혈압',
		start: new Date(2020, 11, 6),
		className: 'bg-info',
	},
	{
		title: '고혈압',
		start: new Date(2020, 11, 7),
		className: 'bg-info',
	},
];
var calEl = document.getElementById('calendar2');
var cal = new FullCalendar.Calendar(calEl, {
	slotDuration: '00:15:00',
	slotMinTime: '08:00:00',
	slotMaxTime: '19:00:00',
	themeSystem: 'bootstrap',
	bootstrapFontAwesome: !1,
	buttonText: {
		today: 'Today',
		month: 'Month',
		week: 'Week',
		day: 'Day',
		list: 'List',
		prev: 'Prev',
		next: 'Next',
	},
	initialView: 'dayGridMonth',
	handleWindowResize: !0,
	height: $(window).height() - 200,
	headerToolbar: {
		left: 'title',
		right: 'today prev,next',
	},
	initialEvents: events,
	editable: false,
	droppable: !0,
	selectable: !0,
});
jQuery(function ($) {
	$('.image-gallery a').simpleLightbox({
		nextBtnClass: ' dripicons-chevron-right',
		nextBtnCaption: '',
		prevBtnClass: ' dripicons-chevron-left',
		prevBtnCaption: '',
	});

	$('.remove-image').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.preview-item').remove();
	});
});
jQuery(function ($) {
	$('.image-preview a').simpleLightbox({});

	$('.remove-image').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.preview-item').remove();
	});
});
