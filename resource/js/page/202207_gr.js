$(document).ready(function () {
	"use strict";
	$("#gr-datatable01").DataTable({
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
		pageLength: 10,
		iDisplayLength: 1,
		ordering: false,
		paging: false,
		drawCallback: function () {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded");
		},
	});
});
