function getSecondToStr(time){
    var minute = parseInt(parseInt(time)/60);
    var second = parseInt(time) % 60;
    if(minute < 10){
        minute = "0" + minute;
    }

    if(second < 10){
        second = "0" + second;
    }
    return minute+":" + second;
}

var successCallback = undefined;
function successMsg(title, msg, callback){
    if(title == undefined){
        title = "등록 성공";
    }
    if(msg == undefined){
        msg = "수정이 성공하었습니다."
    }
    $("#success-alert-modal #title").text(title);
    $("#success-alert-modal #content").html(msg);
    $("#success-alert-modal").modal("show");
    if(callback != undefined){
        successCallback = callback;
    }
}

function errorMsg(title, msg, callback){
    if(title == undefined){
        title = "등록 성공";
    }
    if(msg == undefined){
        msg = "수정이 성공하었습니다."
    }
    $("#error-alert-modal #e_title").text(title);
    $("#error-alert-modal #e_content").html(msg);
    $("#error-alert-modal").modal("show");
    if(callback != undefined){
        successCallback = callback;
    }
}


function returnSuccessCallbck(){
    if(successCallback != undefined){
        successCallback();
    }
}

function detailUser(){
    window.location.href ="alluser_consult.html";
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("data-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                /* Remove the attribute, and call this function once more: */
                elmnt.removeAttribute("data-include-html");
                includeHTML();
            }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}


jQuery(function($) {
    // $(window).load("url", "data", function (response, status, request) {
    //     $(".dataTables_length").parents(".row").addClass("dataTables_head");
    // });

    $("body").on("show.bs.modal", "#login-password-modal", function() {
        $("#my-info-modal").modal("hide");
    })

    $("body").on("hide.bs.modal", "#login-password-modal", function() {
        $("#my-info-modal").modal("show");
    })
    

    includeHTML()

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    });
    $('.modal').on('shown.bs.modal', function (e) {
        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    });

    $("body").on("change", "#mode-select", function(e) {
        if( $(this).val() == 1)
            $.App.activateDarkMode();
        else
        {
            $.App.deactivateDarkMode();
        }
    })

    if( $.fn.dataTable )
    {
        $.fn.dataTable.render.ellipsis = function ( cutoff, wordbreak, escapeHtml, callback ) {

            var esc = function ( t ) {
                return t
                    .replace( /&/g, '&amp;' )
                    .replace( /</g, '&lt;' )
                    .replace( />/g, '&gt;' )
                    .replace( /"/g, '&quot;' );
            };

            return function ( d, type, row ) {

                var result = function (result, callback) {
                    if (callback) {
                        return callback (result, type, row);
                    } else {
                        return result
                    }
                }

                // Order, search and type get the original data
                if ( type !== 'display' ) {
                    return result(d, callback);
                }

                if ( typeof d !== 'number' && typeof d !== 'string' ) {
                    return result(d, callback);
                }

                d = d.toString(); // cast numbers

                if ( d.length < cutoff ) {
                    return result(d, callback);
                }

                var shortened = d.substr(0, cutoff-1);

                // Find the last white space character in the string
                if ( wordbreak ) {
                    shortened = shortened.replace(/\s([^\s]*)$/, '');
                }

                // Protect against uncontrolled HTML input
                if ( escapeHtml ) {
                    shortened = esc( shortened );
                }

                var ellipsis = '<span class="ellipsis" title="'+esc(d)+'">'+shortened+'&#8230;</span>';

                return result(ellipsis, callback);
            };
        };
    }
});

// 넘어온 값이 빈값인지 체크합니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해
// 명시적으로 value == 사용
// [], {} 도 빈값으로 처리

var isEmpty = function(value){
    if( value === "" || value == null || value === undefined || value === 'undefined' || ( value != null && typeof value === "object" && !Object.keys(value).length ) ){
        return true;
    }else{
        return false;
    }
};

/**
 * 파일(이미지)선택 src 미리보기 처리)
 * */
function readURL(input, srcTarget) {
    if (input.files && input.files[0] && srcTarget != null && srcTarget != "") {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(srcTarget).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}