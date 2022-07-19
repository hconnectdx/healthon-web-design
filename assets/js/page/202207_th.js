$(document).ready(function () {
	"use strict";
	$("#th-datatable01").DataTable({
		screenY: true,
		scrollX: true,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Page",
		},
		lengthChange: false,
		searching: false,
		// info: false,
		pageLength: 10,
		iDisplayLength: 1,
		columns: [
			{
				orderable: false,
				targets: 0,
				orderable: !1,
				render: function (e, t, o, l) {
					return (
						"display" === t &&
							(e =
								'<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>'),
						e
					);
				},
				checkboxes: {
					selectRow: !0,
					selectAllRender:
						'<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>',
				},
			},
			{ orderable: !1 },
			{ orderable: !1 },
		],
		ordering: false,
		drawCallback: function () {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded");
		},
	});

	$("#th-datatable02").DataTable({
		screenY: true,
		scrollX: true,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Page",
		},
		lengthChange: false,
		searching: false,
		// info: false,
		pageLength: 10,
		iDisplayLength: 1,
		columns: [
			{
				orderable: false,
				targets: 0,
				orderable: !1,
				render: function (e, t, o, l) {
					return (
						"display" === t &&
							(e =
								'<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>'),
						e
					);
				},
				checkboxes: {
					selectRow: !0,
					selectAllRender:
						'<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>',
				},
			},
			{ orderable: !1 },
			{ orderable: !1 },
			{ orderable: !1 },
		],
		ordering: false,
		drawCallback: function () {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded");
		},
	});

	$("#th-datatable03").DataTable({
		screenY: true,
		scrollX: true,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Page",
		},
		lengthChange: false,
		searching: false,
		info: false,
		paging: false,
		ordering: false,
	});

	$("#th-datatable04").DataTable({
		screenY: true,
		scrollX: true,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Page",
		},
		lengthChange: false,
		searching: false,
		info: false,
		paging: false,
		ordering: false,
	});

	$("#th-datatable05").DataTable({
		screenY: true,
		scrollX: true,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Page",
		},
		lengthChange: false,
		searching: false,
		info: false,
		paging: false,
		ordering: false,
	});
	$("#th-datatable06").DataTable({
		screenY: true,
		scrollX: true,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Page",
		},
		lengthChange: false,
		searching: false,
		info: false,
		paging: false,
		ordering: false,
	});

	$("#th-datatable07").DataTable({
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
		pageLength: 10,
		ordering: false,
		select: { style: "multi" },
		order: [[0, "desc"]],
		drawCallback: function () {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded");
		},
	});

	$("#th-datatable08").DataTable({
		screenY: true,
		scrollX: true,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Page",
		},
		lengthChange: false,
		searching: false,
		info: false,
		paging: false,
		ordering: false,
	});

	$("#th-datatable09").DataTable({
		screenY: true,
		scrollX: true,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Page",
		},
		lengthChange: false,
		searching: false,
		info: false,
		paging: false,
		ordering: false,
	});

	$("#th-datatable10").DataTable({
		screenY: true,
		scrollX: false,
		language: {
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Page",
		},
		lengthChange: false,
		searching: false,
		// info: false,
		pageLength: 10,
		iDisplayLength: 1,
		ordering: false,
		drawCallback: function () {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded");
		},
	});
});
