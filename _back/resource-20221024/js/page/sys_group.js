$(document).ready(function () {
    "use strict";
    $("#group-datatable").DataTable({
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: " _PAGE_ / _PAGES_ Pages",
            sSearch:"검색:",
            lengthMenu: '<select class=\'form-control mr-1\'><option value="10">10</option><option value="20">20</option><option value="-1">All</option></select> 개 씩 보기 <a href="javascript:group_register();" class="btn btn-primary ml-2">신규 그룹 등록</a>'
        },
        pageLength: 10,
        columns: [ {orderable: !1}, {orderable: !0}, {orderable: !0,width:"220px"}, {orderable: !0,width:"140px"}, {orderable: !0,width:"200px"},{orderable: !0}, {orderable: !0}, {orderable: !0}, {orderable: !1}],
        select: {style: "multi"},
        order: [[4, "desc"]],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        }
    })

    $("#inputGroupFile04").on("change", function(e) {
        var filename = $(this)[0].files.length ? $(this)[0].files[0].name : "";
        $("#label-inputGroupFile04").html(filename)
        readURL(this)
    })

    $('a.image-gallery').on("click", function() {
        $("#custom-sbl").show()
    })

    $("#close-sbl").on("click", function() {
        $("#custom-sbl").hide()
    })
});
function group_register(){
    $("#group-register-modal").modal("show");
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#sbl-image').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}