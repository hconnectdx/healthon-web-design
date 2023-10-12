$(function() {
    initDataTable();
});

function initDataTable(callback) {

    $.post('/user/user/api/init', function(data) {

        let curSessionUserGrpId = $('form#listAdminForm #userGroupId').val();

        let groupList = data.groupList;
        let groupDeptList = '';
        groupDeptList += "<select class='form-control d-inline-block ml-1 select-group' id='groupSno' onchange='refreshTable()'>";
        groupDeptList += "   <option value=''>" + i18n('dashboard.dropdown.all') + "</option>";

        $.each(groupList, function(i, group) {
            if (group.groupNm.length > 13) {
                groupDeptList += "   <option value='" + group.groupSno + "' data-etc='" + group.groupEtcTitle + "' data-proc='" + group.groupUserProcCd + "' title='" + group.groupNm + "'>" + group.groupNm + "</option>";
            } else {
                groupDeptList += "   <option value='" + group.groupSno + "' data-etc='" + group.groupEtcTitle + "' data-proc='" + group.groupUserProcCd + "'>" + group.groupNm + "</option>";
            }
        });

        groupDeptList += "</select>";

        let sSearchStr = i18n('common.txt.search') +
            groupDeptList +
            "<select id='searchTp' class='form-control d-inline-block w-auto ml-1'>" +
            "   <option value='userNick'>" + i18n('users.alluser.dropdown.search.name') + "</option>" +
            "   <option value='userMobileNo'>" + i18n('users.alluser.dropdown.search.mobile') + "</option>" +
            "   <option value='userNm'>" + i18n('common.real_name') + "</option>" +
            "</select>";


        let emptyTableStr = "" +
            "<div class='board-none'>" +
            "   <i class='mdi mdi-account-search-outline font-48'></i>" +
            "   <p id='emptyString'>" + i18n('common.txt.nodata') + "</p>" +
            "</div>";

        let groupPersonClcd = data.groupPersonClcd;
        let pageSizeMsg = i18n('common.txt.search.pagesize');
        let pageChangeSelectHtml = '<select class="form-control mr-1"><option value="10">10</option><option value="20">20</option><option value="50">50</option></select>';
        let etcHtml = '<button href="javascript:void(0);" id="sendMsgBtn" onclick="sendMessage()" disabled="true" class="btn btn-primary btn-sm ml-2">' + i18n('users.alluser.btn.send.msg') + '</button>'
        let userRegHtml = '<button type="button" id="userRegBtn" onclick="showUseRegModal()" class="btn btn-primary btn-sm ml-2" >' + i18n('users.alluser.btn.user.req.msg') + '</button>';
        let exportUserInfoHtml = '<button type="button" id="exportUserInfoBtn" onclick="showExportUserInfoModal()" class="btn btn-primary btn-sm ml-2" >' + i18n('users.alluser.btn.export.user.info.msg') + '</button>';
        let lengthMenu = i18n('common.txt.search.pagesize').replace("{0}", pageChangeSelectHtml) + ' ' + etcHtml;

        // 사용자 정보 추출 버튼 (슈퍼관리자만 표시)
        if(curSessionUserGrpId === "00201990") {
            lengthMenu += ' ' + exportUserInfoHtml;
        }

        if (groupPersonClcd === '00725200'){      //  임시
            lengthMenu += ' ' + userRegHtml;
        }

        let oTable = $("#users-datatable").dataTable({
            scrollX: true,
            language: {
                paginate: {
                    previous: "<i class='mdi mdi-chevron-left'>",
                    next: "<i class='mdi mdi-chevron-right'>"
                },
                info: i18n('common.datatable_info'),
                sSearch: sSearchStr,
                lengthMenu: lengthMenu,
                emptyTable: emptyTableStr
            },
            pageLength: 10,
            columns: [
                {data: "userServiceUseSno", orderable: 0}
                , {data: "userNick", orderable: 1}
                , {data: "userNm", orderable: 0}
                , {data: "userAge", orderable: 1}
                , {data: "userMobileNo", orderable: 0}
                , {data: "serviceUseStnm", orderable: 1}
                , {data: "userGrpCnt", orderable: 1}
                , {data: "insDdDash", orderable: 0}
                , {data: null, orderable: 0}
            ],
            columnDefs: [
                {defaultContent: "", targets: "_all"},  /* null 처리 */
                {
                    targets: 0,
                    render: function (e, t, o, l) {
                        return "display" === t && (e = '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes" value="' + l.row + '" key="' + e + '"><label class="custom-control-label">&nbsp;</label></div>'), e
                    },
                    createdCell: function (td, cellData, rowData, row, col) {
                        if (col === 0) {
                            if (rowData.serviceUseStcd !== '00102100') {
                                oTable.api().cell(row, col).checkboxes.disable();
                            }
                        }
                    },
                    checkboxes: {
                        selectRow: true,
                        selectAllRender: '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes"><label class="custom-control-label">&nbsp;</label></div>',
                        selectCallback: function (nodes, selected) {
                            let selArr = oTable.api().column(0).checkboxes.selected();
                            if (selArr.length > 0) {
                                $('#sendMsgBtn').prop('disabled', false);
                            } else {
                                $('#sendMsgBtn').prop('disabled', true);
                            }
                        }
                    }
                },
                {
                    targets: 1,
                    data: "userNick",
                    class: "table-user",
                    render: function (data, type, row) {
                        if (isEmpty(row.fileSaveNm)) {
                            return '<img src="/resources/images/users/avatar-1.jpg" class="mr-2 rounded-circle" onerror="this.src=\'/resources/images/users/avatar-1.jpg\';">' + (data == null ? '' : data);
                        } else {
                            return '<img src="' + baseContentsUrl + row.fileSaveNm + '" class="mr-2 rounded-circle" onerror="this.src=\'/resources/images/users/avatar-1.jpg\';">' + (data == null ? '' : data);
                        }
                    },
                    width: "220px"
                },
                {
                    targets: 2,
                    render: function (data, type, row) {
                        if (isEmpty(data)) {
                            data = "-";
                        }else {
                            data = '<span  data-toggle="popover"' +
                                '       data-trigger="hover"' +
                                '       data-html="true"' +
                                '       title="" data-content="' + row.noMaskUserNm + '"' +
                                '       data-original-title="">' + data + '</span>';
                        }
                        return data;
                    }
                },
                {
                    targets: 3,
                    render: function (data, type, row) {
                        return i18n('common.age_value').replace('{0}', data);
                    }
                },
                {
                    targets: 4,
                    render: function (data, type, row) {
                        if (isEmpty(data)) {
                            data = "-";
                        }else {
                            data = '<span  data-toggle="popover"' +
                                '       data-trigger="hover"' +
                                '       data-html="true"' +
                                '       title="" data-content="' + row.noMaskUserMobileNo + '"' +
                                '       data-original-title="">' + data + '</span>';
                        }
                        return data;
                    }
                },
                {
                    targets: 5,
                    render: function (data, type, row) {
                        let serviceUseStcd = (typeof row.serviceUseStcd === 'string') ? row.serviceUseStcd : '';
                        if (serviceUseStcd === '00102100') {
                            data = i18n('users.alluser.txt.use');
                        } else if (serviceUseStcd === '00102200') {
                            data = '<a href="javascript: void(0);" class="badge badge-outline-dormant font-12" data-toggle="popover" title="" data-content="' + row.serviceUseStrDd + '">' + i18n('users.alluser.txt.dormant') + '</a>'
                        } else if (serviceUseStcd === '00102300') {
                            data = '<a href="javascript: void(0);" class="badge badge-outline-danger font-12" data-toggle="popover" title="" data-content="' + row.serviceUseEndDd + '">' + i18n('users.alluser.txt.withdrawal') + '</a>';
                        }
                        return data;
                    },
                    width: "220px"
                },
                {
                    targets: 6,
                    render: function (data, type, row) {
                        let groupCntMsg = i18n('users.alluser.txt.user.register.group');

                        if (isEmpty(row.userGrpCnt) || Number(row.userGrpCnt) < 1) {
                            return i18n('users.alluser.txt.user.unregister');
                        } else {
                            return groupCntMsg.replace('{0}', row.userGrpCnt) + ' <i class="mdi mdi-plus-box-multiple-outline font-20 ml-10 cursor" onClick="showHospitalListModal(' + row.userServiceUseSno + ')"></i>';
                        }
                    },
                    defaultContent: "",
                    width: "220px"
                },
                {
                    targets: -1,
                    class: "text-center",
                    render: function (data, type, row) {
                        let serviceUseStcd = (typeof row.serviceUseStcd === 'string') ? row.serviceUseStcd : '';
                        if (serviceUseStcd === '00102100' || serviceUseStcd === '00102200' || serviceUseStcd === '00102300') {
                            if (groupPersonClcd === '00725200') {
                                return '<a id="updateBtn" onclick="updateUser(' + row.userServiceUseSno + ');"> <i class="mdi mdi-square-edit-outline font-20 cursor mr-3"></i></a>' +
                                    '<i class="dripicons-preview font-20 cursor" onclick="detailUser(' + row.userServiceUseSno + ');"></i>';
                            } else {
                                return '<i class="dripicons-preview font-20 cursor" onclick="detailUser(' + row.userServiceUseSno + ');"></i>';
                            }
                        } else {
                            return '';
                        }
                    }
                }
            ],
            select: {style: "multi"},
            order: [[7, "desc"]],
            processing: true,
            serverSide: true,
            sServerMethod: "POST",
            ajax: {
                "url": "/user/user/api/getPatientList",
                "type": "POST",
                "data": function (d) {
                    /* parameters */
                    if ($("form#userInitForm #initYn").val() === 'Y') {
                        let totalPatientSearchKeywd = $('form#userInitForm #totalPatientSearchKeywd').val();
                        d.totalPatientSearchKeywd = totalPatientSearchKeywd;
                        d.totalPatientSearchKeywdEnc = totalPatientSearchKeywd;
                    } else {
                        d.totalPatientSearchKeywd = null;
                        d.totalPatientSearchKeywdEnc = null;
                    }
                    d.page = (d.start / d.length) + 1;
                    d.pageSize = (d.length < 1 ? 0 : d.length);
                    d.groupSno = $("#groupSno").val();
                    d.searchTp = $("#searchTp").val();
                    d.searchWd = d.search.value;
                    d.searchWdEnc = d.search.value;
                    if (d.order != null && d.order.length > 0) {
                        d.dtOrderCol = d.columns[d.order[0].column].data;
                        d.dtOrderDir = d.order[0].dir;
                    }
                },
                //"dataSrc": "data" /* 1. 수신된 Map의 데이터 객체 명을 지정하면 알아서 가져감. */
                "dataSrc": function (d) {
                    return d.data; /* 2. 수신된 Map의 데이터 객체를 리턴. */
                },
                error: function (xhr, error, code) {
                    location.href = '/main';
                }
            },
            drawCallback: function () {
                $("#initYn").val('N');
                $(".dataTables_paginate > .pagination").addClass("pagination-rounded float-right");
                $('[data-toggle="popover"]').popover({
                    container: 'body',
                    trigger: 'hover',
                    placement: function (context, source) {
                        let containerHeight = $('#users-datatable tbody').innerHeight();

                        if (containerHeight > 50) {
                            return 'top'
                        } else {
                            return 'right'
                        }

                    }
                });
            }
        });

        $("div.dataTables_filter input").unbind().keyup(function (e) {
            e.preventDefault();
            if (e.keyCode === 13) {
                oTable.fnFilter(this.value);
            }
        });

        if (callback) {
            return callback(oTable);
        }
    });

}

function sendMessage() {
    var selArr = $("#users-datatable").dataTable().api().column(0).checkboxes.selected();
    const userServiceUseSnos = [];
    if (selArr != null && selArr.length > 0) {
        $.each(selArr, function (i, v) {
            userServiceUseSnos.push(v);
        });
        callMenu('/user/sendMsg', i18n('menu.txt.mgt.user.msg'), {"userServiceUseSno": userServiceUseSnos.toString()});
    }
}

function showUseRegModal() {
    $("#hospital-userReg-modal > .modal-dialog").load("/user/user/modal/user_det", {}, function () {
        $("#hospital-userReg-modal").modal("show");
    });
}

function showExportUserInfoModal() {

    // 선택한 추출대상 그룹 일련번호
    let exportGroupSno = $("#groupSno option:selected").val();
    if(isEmpty(exportGroupSno)){
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('users.alluser.export.user.info.pop.null.txt.title'));
        return false;
    }

    $("#hospital-exportUserInfo-modal > .modal-dialog").load("/user/user/modal/export_user_info", {exportGroupSno : exportGroupSno}, function () {
        $("#hospital-exportUserInfo-modal").modal("show");
    });
}

function updateUser(sno) {
    $("#hospital-userMod-modal > .modal-dialog").load("/user/user/modal/user_det_mod", {userServiceUseSno: sno}, function () {
        $("#hospital-userMod-modal").modal("show");
    });
}

function showHospitalListModal(sno) {
    $("#hospital-list-modal > .modal-dialog").load("/user/user/modal/hospital_list", {userServiceUseSno: sno}, function () {
        $("#hospital-list-modal").modal("show");
    });
}

function detailUser(sno) {
    let newWindow =   window.open('/user/user/log?userServiceUseSno=' + sno);
    newWindow.onload = function (){
        let $headerTitle = $(newWindow.document).find("#header-page-title");
        $headerTitle.text(i18n('menu.txt.mgt.user.details'));
    }
}



function refreshTable() {
    $("#users-datatable").dataTable().fnFilter($("div.dataTables_filter input[type=search]").val());
}

function emptyTable() {
    var emptyString = i18n('common.txt.nodata');
    if (isEmpty($('#groupSno').val())) {
        emptyString = i18n('users.auth.txt.select.group');
    }
    return emptyString;
}