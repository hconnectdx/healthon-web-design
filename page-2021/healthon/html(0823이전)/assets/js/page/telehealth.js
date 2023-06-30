$(document).ready(function () {
    $("#telehsitory-datatable").DataTable({
        scrollX: true,
        searching: false,
        lengthChange: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
        },
        pageLength: 10,
        columns: [{
            orderable: !0,
        }, { orderable: !0, width: "240px" }, { orderable: !0 }, { orderable: !0 }, { orderable: !0 }, { orderable: !0, width: "240px" }, { orderable: !0 }, { orderable: !0 }],
        select: { style: "multi" },
        order: [[0, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        }
    })
});

jQuery(function ($) {
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
})