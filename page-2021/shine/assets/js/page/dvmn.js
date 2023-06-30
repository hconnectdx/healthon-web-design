$(document).ready(function () {
	"use strict";
	$("#dvmn-datatable").DataTable({
		scrollX: true,
		language: {
			searchPlaceholder: "디바이스 ID 또는 사용자를 검색하세요.",
			paginate: {
				previous: "<i class='mdi mdi-chevron-left'>",
				next: "<i class='mdi mdi-chevron-right'>",
			},
			info: " _PAGE_ / _PAGES_ Pages",
			sSearch:
				"<select class='form-control d-inline-block ml-1' style='width:160px'><option >그룹 선택</option></select> <select class='form-control d-inline-block w-auto ml-1'><option >타입 선택</option><option >BAND</option><option >PATCH</option><option >ETC</option></select><select class='form-control d-inline-block w-auto ml-1'><option>상태 전체</option><option>등록</option><option>미등록</option></select>",
			lengthMenu:
				'<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기 ',
		},
		pageLength: 10,
		select: { style: "multi" },
		drawCallback: function () {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
		},
	});
});
