$(function() {
    $("body").on("change", "form#settingForm #uiColorClcd", function(e) {
        let uiColorClcd = $(this).val();
        if( uiColorClcd === '10808200')
            $.App.activateDarkMode();
        else
        {
            $.App.deactivateDarkMode();
        }
    })
});

function updateMyConfig(){

    let formData = $("#settingForm").serializeFormToJson();

    $.ajax({
        url: "/com/modal/set_my_conf",
        type: "POST",
        data: formData,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        success: function (data) {
            if (data.result === "ok") {
                location.reload();
            }
        },
        error: function(a,b,c){
            console.log("error ~~~~~~~~~~");
            console.log(a);
            console.log(b);
            console.log(c);
        },
        complete: function(a){
            // console.log("complete ~~~~~~~~~~");
            // console.log(a);
        }
    });
}



