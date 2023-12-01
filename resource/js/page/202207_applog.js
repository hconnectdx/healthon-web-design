$(document).ready(function () {
	"use strict";
	$("#applog-datatable01").DataTable({
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

	$("#applog-datatable02").DataTable({
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
			{ orderable: false },
			{ orderable: false },
			{ orderable: false },
		],
		ordering: false,
		drawCallback: function () {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded");
		},
	});

	$("#applog-datatable03").DataTable({
		screenY: true,
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
		ordering: false,
		order: [[1, "desc"]],
		drawCallback: function () {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded");
		},
	});
});
