//이력 미리보기카드 조회 API
function viewAppointHistory(termsSno, termsHistSno) {

    if(!isEmpty(termsSno) && !isEmpty(termsHistSno)) {
        $.ajax({
            url : "/sys/stplat/api/sys_appoint_det/view",
            dataType:'json',
            method: "POST",
            data : {
        		"termsSno":termsSno,
        		"termsHistSno":termsHistSno
            },
            success : function(data){
                $("#viewAppointcontent10801100").html('');
                $("#viewAppointcontent10801200").html('');
                $("#viewAppointcontent10801300").html('');
                $("#viewAppointcontent10801400").html('');

            	data.resultList.forEach(function(item) {
            		$("#viewAppointcontent" + item["languageClcd"] ).html(item["termsCtnt"]);
            	});
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

}

//이력삭제 API
function applyAppointHistoryDel(termsSno, termsHistSno) {
    $("#confirm-modal").modal('show');
    $("#delModalBtn").off('click');
    $("#delModalBtn").on('click', function() {
        $("#confirm-modal").modal('hide');

        if(!isEmpty(termsSno) && !isEmpty(termsHistSno)) {
            $.ajax({
                url : "/sys/stplat/api/sys_appoint_det/del",
                dataType:'json',
                method: "POST",
                data : {
                    "termsSno":termsSno,
                    "termsHistSno":termsHistSno
                },
                success : function(data){
                    $("#success-alert-modal").modal('show');
                    $("#success-alert-modal #title").html(i18n("management.term.del.txt.title"));
                    $("#success-alert-modal #content").html(i18n("management.term.del.txt.content"));
                    if(data.flag > 0) {
                        appointHistoryTable.fnFilter();
                        $("div[id^=viewAppointcontent]").html("");
                        $('#appoint-datatable').DataTable().ajax.reload();
                        if(data.remainTermsCnt == 0){
                            $("#appoint-modal").modal("hide");
                            //개인정보처리방침 번호 세팅
                            document.getElementById("pvHistBtn").attr('disabled', true);
                            document.getElementById("pvUpdBtn").setAttribute("onClick","showAppointUpdate(\'\', \'\', \'\', \'2\')");
                            document.getElementById("pvUrlBtn").attr('disabled', true);
                        } else {
                            //개인정보처리방침 번호 세팅
                            document.getElementById("pvHistBtn").setAttribute("onClick","showAppointHistory(\'" + data.appointPvTermsSno + "\', \'2\')");
                            document.getElementById("pvUpdBtn").setAttribute("onClick","showAppointUpdate(\'update\', \'" + data.appointPvTermsSno + "\', \'" + data.appointPvTermsHistSno + "\', \'2\')");
                            document.getElementById("pvUrlBtn").setAttribute("onClick","showAppointPvNewTab(\'" + data.appointPvTermsSno + "\', \'" + data.appointPvTermsHistSno + "\')");
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown){
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }

    });

}