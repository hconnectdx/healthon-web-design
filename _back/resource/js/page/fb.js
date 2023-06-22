$(document).ready(function () {
    "use strict";
    $("#auth-datatable").DataTable({
        scrollX: true,
        lengthChange: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            lengthMenu: '<div class="d-flex align-items-center cursor"><input type="checkbox" class="mr-1"> 내 담당인 상담만 조회</div>',
            sSearch: "검색: <select class=\'form-control d-inline-block w-auto ml-1\'><option >이름</option></select>",
            emptyTable: "데이터가 없습니다"
        },
        pageLength: 10,
        columns: [
            { orderable: !1 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0, width: "160px" }],
        select: { style: "multi" },
        order: [[5, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
        }
    })


    $('.image-gallery a').simpleLightbox({
        nextBtnClass: ' dripicons-chevron-right',
        nextBtnCaption: '',
        prevBtnClass: ' dripicons-chevron-left',
        prevBtnCaption: '',
    });

    $(".remove-image").on("click", function (e) {
        e.preventDefault()
        $(this).closest(".preview-item").remove()
    })
});