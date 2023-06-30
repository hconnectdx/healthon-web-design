$(document).ready(function () {
	"use strict";
	$("#gateway-datatable").DataTable({
		scrollX: true,
		paging: false,
		orderable: false,
		searching: false,
		info: false,
		scrollY: "100%",
		scrollCollapse: true,
		paging: false,
		language: {
			emptyTable: '<i class="mdi mdi-note-search-outline mdi-48px" style="color: #8d9ca3"></i><p style="margin:0;color: #616a71;">데이터가 없습니다.</p>',
		},
	});
});
