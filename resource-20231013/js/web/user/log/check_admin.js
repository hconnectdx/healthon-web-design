$(document).ready(function () {
    $("#unCompleteCount").remove();
    $("#checkresultReg1").remove();
    $("#checkresultReg2").remove();
});

function checkWrapper(checkupInputDd, checkupInputDdMsg, groupCheckupHistSno, unCompleteCount, aboveStr, normalStr, belowStr) {
    aboveStr = isEmpty(aboveStr) ? i18n('common.txt.high') : aboveStr;
    normalStr = isEmpty(normalStr) ? i18n('users.detail.checkup.result.txt.status.normal') : normalStr;
    belowStr = isEmpty(belowStr) ? i18n('common.txt.low') : belowStr;
    // alert(insDt);
    var userServiceUseSno = $("#checkUserServiceUseSno").val();
    // alert(userServiceUseSno);
    //alert(groupCheckupHistSno);

    // alert("unCompleteCount: " + unCompleteCount);
    $("#unCompleteCount").val(unCompleteCount);
    if (unCompleteCount > 0) {
        $("#unCompleteCount").attr("style", "visibility:visible");
    } else {
        $("#unCompleteCount").attr("style", "visibility:hidden");
    }

    $("#completeUserServiceUseSno").val(userServiceUseSno);
    $("#completeGroupCheckupHistSno").val(groupCheckupHistSno);
    $("#checkitem-datatable_length").children().eq(3).text(checkupInputDdMsg);

    $("#check-result-table").DataTable({
        scrollX: true,
        searching: false,
        lengthChange: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: i18n('common.datatable_info'),
            emptyTable : i18n('common.datatable_empty')
        },
        pageLength: 10,
        columns: [
            {data: "checkupItemNm", orderable: 1, width: "150px"}
            , {data: "groupCheckupValue", orderable: 1}
            , {data: "groupCheckupStsClcd", orderable: 1}
            , {data: "managementNm", orderable: 0}
            , {}
        ],
        "columnDefs": [
            {"defaultContent": "", "targets": "_all"},
            { "targets": 0,
                "render": function(data, type, row){
                    return '<a href="javascript:void(0);" onclick="testResultDet(' + row.groupCheckupHistSno + ', ' + row.checkupItemSno + ', ' + row.groupSno+ ')">' + row.checkupItemNm + '</a>'
                }
            },
            { "targets": 2,
                "render": function(data, type, row){
                    if(data === '90114100'){
                        data = aboveStr;
                    }else if(data === '90114200'){
                        data = normalStr;
                    }else if(data === '90114300'){
                        data = belowStr;
                    }
                    return data;
                }
            }
        ],
        destroy: true,
        select: {style: "multi"},
        order: [],
        processing: true,
        serverSide: true,
        sServerMethod: "POST",
        ajax: {
            "url": "/user/user/log/checkup/api/getPatientCheckResultList",
            "type": "POST",
            "data": function (data) {
                /* parameters */
                data.checkupInputDd = checkupInputDd;
                data.userServiceUseSno = userServiceUseSno;
                data.groupCheckupHistSno = groupCheckupHistSno;
                data.page = (data.start / data.length) + 1;
                data.pageSize = (data.length < 1 ? 0 : data.length);
                if (data.order != null && data.order.length > 0) {
                    data.dtOrderCol = data.columns[data.order[0].column].data;
                    data.dtOrderDir = data.order[0].dir;
                }
            }
        },
        drawCallback: function () {
            $("#check-result-table_paginate > .pagination").addClass("pagination-rounded");
        }
    });
}