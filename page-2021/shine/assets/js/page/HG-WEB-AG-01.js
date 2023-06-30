$(document).ready(function () {
	"use strict";
	$("#HG-WEB-AG-01-table01").DataTable({
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
		select: { style: "multi" },
		order: [[5, "desc"]],
		drawCallback: function () {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
		},
	});
});
