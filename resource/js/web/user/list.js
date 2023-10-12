$(function() {
    initDataTable();
});

function initDataTable(callback) {

    $.post('/user/user/api/init', function(data) {
        let lastGroupDeptList = data.lastGroupDeptList;
        let currentGroup = data.currentGroup;

        let groupDeptList = '';

        let groupDeptYn = currentGroup.groupDeptYn;
        // 그룹 인증 절차코드가 데이터 매칭이 아닌경우만 추가필드명 활용 처리
        let groupEtcTitle = currentGroup.groupUserProcCd === '00206303' ? '' : currentGroup.groupEtcTitle;

        let emptyTableStr = "" +
            "<div class='board-none'>" +
            "   <i class='mdi mdi-account-search-outline font-48'></i>" +
            "   <p id='emptyString'>" + i18n('common.txt.nodata') + "</p>" +
            "</div>";

        let groupPersonClcd = data.groupPersonClcd;

        let pageChangeSelectHtml = "<select class='form-control mr-1'><option value='10'>10</option><option value='20'>20</option><option value='50'>50</option></select>";
        let etcHtml = "<button type='button' id='sendMsgBtn' onclick='sendMessage()' class='btn btn-primary btn-sm ml-2' disabled>" + i18n('users.alluser.btn.send.msg') + "</button>";
        let userRegHtml = "<button type='button' id='userRegBtn' onclick='showUseRegModal()' class='btn btn-primary btn-sm ml-2' >" + i18n('users.alluser.btn.user.req.msg') + "</button>";
        let lengthMenu="";
        if (groupPersonClcd === '00725200'){
            lengthMenu = i18n('common.txt.search.pagesize').replace("{0}", pageChangeSelectHtml) + ' ' + etcHtml +' ' + userRegHtml;
        } else {
            lengthMenu = i18n('common.txt.search.pagesize').replace("{0}", pageChangeSelectHtml) + ' ' + etcHtml ;
        }
        if (lastGroupDeptList && lastGroupDeptList.length > 0) {
            groupDeptList += "<select class='form-control d-inline-block w-auto ml-1 select-group' id='deptCode' onchange='refreshTable()'>";
            groupDeptList += "   <option value=''>" + i18n('users.auth.txt.proc.all') + "</option>";

            $.each(lastGroupDeptList, function (i, dept) {
                if (dept.deptNm.length > 13) {
                    groupDeptList += "   <option value='" + dept.deptCode + "' title='" + dept.deptNm + "'>" + dept.deptNm + "</option>";
                } else {
                    groupDeptList += "   <option value='" + dept.deptCode + "'>" + dept.deptNm + "</option>";
                }
            });

            groupDeptList += "</select>";
        }

        let sSearchStr = i18n('common.txt.search') +
            groupDeptList +
            "<select class='form-control d-inline-block w-auto ml-1' id='searchTp'>" +
            "   <option value='userNick'>"+i18n('users.alluser.dropdown.search.name')+"</option>" +
            "   <option value='userMobileNo'>"+i18n('users.alluser.dropdown.search.mobile')+"</option>" +
            "   <option value='userNm'>"+i18n('common.real_name')+"</option>";

        if (groupEtcTitle) {
            sSearchStr += "   <option value='userEtcValue'>"+groupEtcTitle+"</option>";
        }

        sSearchStr += "</select>";


        let oTable = $("#doctor-users-datatable").dataTable({
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
                { data : "userServiceUseSno" , orderable: 0}
                , { data : "userNick", orderable: 1, width:"220px"}
                , { data : "userNm", orderable: 0}
                , { data : "userAge", orderable: 1}
                , { data : "userMobileNo", orderable: 0,width:"180px"}
                , { data : "deptNm", orderable: 1, visible: (!isEmpty(groupDeptYn) && groupDeptYn === 'Y')}
                , { data : "userEtcValue", orderable: 1, visible: (!isEmpty(groupEtcTitle))}
                , { data : "serviceUseStcd", orderable: 1}
                , { data : "userGroupMngNo", orderable: 1}
                , { data : "insDdDash" , orderable: 1}
                , { data : null , orderable: !1}
            ],
            columnDefs: [
                { defaultContent: "", targets: "_all" },  /* null 처리 */
                {
                    targets: 0,
                    render: function (e, t, o, l) {
                        return "display" === t && (e = '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dt-checkboxes" value="'+l.row+'" key="'+e+'"><label class="custom-control-label">&nbsp;</label></div>'), e
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
                        selectCallback: function(nodes, selected) {
                            var selArr = $("#doctor-users-datatable").dataTable().api().column(0).checkboxes.selected();
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
                    class : "table-user",
                    render: function(data, type, row){
                        if(isEmpty(row.fileSaveNm)) {
                            return '<img src="/resources/images/users/avatar-1.jpg" class="mr-2 rounded-circle" onerror="this.src=\'/resources/images/users/avatar-1.jpg\';" alt="">' + (data == null ? '' : data);
                        } else {
                            return '<img src="' + baseContentsUrl + row.fileSaveNm + '" class="mr-2 rounded-circle" onerror="this.src=\'/resources/images/users/avatar-1.jpg\';" alt="">' + (data == null ? '' : data);
                        }
                    }
                },
                {
                    targets: 2,
                    render: function(data, type, row){
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
                    render: function(data, type, row) {
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
                    render: function(data, type, row) {
                        if (!isEmpty(row.deptNm)) {
                            var depth = '';
                            var depth1 = row.depth1;
                            var depth2 = row.depth2;
                            var depth3 = row.depth3;
                            var depth4 = row.depth4;
                            var depth5 = row.depth5;

                            if (!isEmpty(depth1)) {
                                depth += depth1;
                                if (!isEmpty(depth2)) {
                                    depth += '<br />' + depth2;
                                    if (!isEmpty(depth3)) {
                                        depth += '<br />' + depth3;
                                        if (!isEmpty(depth4)) {
                                            depth += '<br />' + depth4;
                                            if (!isEmpty(depth5)) {
                                                depth += '<br />' + depth5;
                                            }
                                        }
                                    }
                                }
                            }

                            data = '' +
                                '<span  data-toggle="popover"' +
                                '       data-trigger="hover"' +
                                '       data-html="true"' +
                                '       title="" data-content="' + depth + '"' +
                                '       data-original-title="">' + data + '</span>';
                        } else {
                            data = '-';
                        }
                        return data;
                    }
                },
                {
                    targets: 6,
                    render: function(data, type, row) {
                        if (isEmpty(data)) {
                            data = "-";
                        }else {
                            data = '<span  data-toggle="popover"' +
                                '       data-trigger="hover"' +
                                '       data-html="true"' +
                                '       title="" data-content="' + row.noMaskUserEtcValue + '"' +
                                '       data-original-title="">' + data + '</span>';
                        }
                        return data;
                    }
                },
                {
                    targets: 7,
                    render: function(data, type, row){
                        let serviceUseStcd = (typeof row.serviceUseStcd === 'string') ? row.serviceUseStcd : '';
                        if (serviceUseStcd === '00102100') {
                            if(row.curGroupYn === 'N') {
                                return '<a href="#" class="badge badge-outline-danger font-12" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="' + row.withdrawalDt + '">' + i18n('users.alluser.txt.user.inactive') + '</a>';
                            } else {
                                return i18n('users.alluser.txt.use');
                            }
                        } else if (serviceUseStcd === '00102200') {
                            data = '<a href="javascript: void(0);" class="badge badge-outline-dormant font-12" data-toggle="popover" title="" data-content="' + row.serviceUseStrDd + '">' + i18n('users.alluser.txt.dormant') + '</a>'
                        } else if (serviceUseStcd === '00102300') {
                            data = '<a href="javascript: void(0);" class="badge badge-outline-danger font-12" data-toggle="popover" title="" data-content="' + row.serviceUseEndDd + '">' + i18n('users.alluser.txt.withdrawal') + '</a>';
                        }

                        return data;

                    },
                    defaultContent: ""
                },
                {
                    targets: 8,
                    render: function(data, type, row){
                        if (row.serviceUseStcd === '00102100') {
                            if(isEmpty(row.userGroupMngNo) || Number(row.userGrpCnt) < 1) {
                                return '<a href="javascript:void(0);" class="badge badge-outline-primary font-12" onclick="showMngNoModal(' + row.userServiceUseSno + ')">' + i18n('users.alluser.txt.user.unregister') + '</a>';
                            } else {
                                return '<a href="javascript:void(0);" data-toggle="popover" data-trigger="hover" data-html="true" title="" data-content="' + row.noMaskUserGroupMngNo + '" + onclick="showMngNoModal('+row.userServiceUseSno+')">'+row.userGroupMngNo+'</a>';
                            }
                        } else {
                            return '-';
                        }

                    },
                    defaultContent: ""
                },
                {
                    targets: -1,
                    class: "text-center",
                    render: function(data, type, row){
                        var ret = "";
                        if (row.curGroupYn === 'Y') {
                            if (groupPersonClcd === '00725200') {
                                return '<a id="updateBtn" onclick="updateUser(' + row.userServiceUseSno + ');"> <i class="mdi mdi-square-edit-outline font-20 cursor mr-3"></i></a>' +
                                    '<i class="dripicons-preview font-20 cursor" onclick="detailUser(' + row.userServiceUseSno + ');"></i>';
                            } else {
                                return '<i class="dripicons-preview font-20 cursor" onclick="detailUser(' + row.userServiceUseSno + ');"></i>';
                            }
                        }
                        return ret;
                    }
                }
            ],
            select: {style: "multi"},
            order: [[9, "desc"]],
            processing: true,
            serverSide: true,
            sServerMethod: "POST",
            ajax: {
                "url":"/user/user/api/getPatientDoctorList",
                "type":"POST",
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
                    d.page = ( d.start / d.length ) + 1;
                    d.pageSize = (d.length < 1 ? 0 : d.length);
                    d.deptCode = $("#deptCode").val();
                    d.searchTp = $("#searchTp").val();
                    d.searchWd = d.search.value;
                    d.searchWdEnc = d.search.value;
                    if(d.order != null && d.order.length > 0) {
                        d.dtOrderCol = d.columns[d.order[0].column].data;
                        d.dtOrderDir = d.order[0].dir;
                    }
                },
                "dataSrc": function(d){
                    return d.data; /* 2. 수신된 Map의 데이터 객체를 리턴. */
                },
                error: function (xhr, error, code) {
                    location.href = '/main';
                }
            },
            drawCallback: function () {
                $("#initYn").val('N');
                $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
                $('[data-toggle="popover"]').popover({
                    container: 'body',
                    trigger: 'hover',
                    placement:function(context, source) {
                        var containerHeight = $('#doctor-users-datatable tbody').innerHeight();

                        if (containerHeight > 50) {
                            return 'top'
                        } else {
                            return 'right'
                        }

                    }
                });
            }
        });

        $("div.dataTables_filter input").unbind().keyup( function (e) {
            e.preventDefault();
            if (e.keyCode === 13) {
                oTable.fnFilter( this.value );
            }
        } );

        if (callback) {
            callback(oTable);
        }


    });
}

function sendMessage(userServiceUseSno) {
    if (userServiceUseSno) {
        callMenu('/user/sendMsg', i18n('menu.txt.mgt.user.msg'), {"userServiceUseSno": userServiceUseSno.toString()})
    } else {
        var selArr = $("#doctor-users-datatable").dataTable().api().column(0).checkboxes.selected();
        const userServiceUseSnos = [];
        if (selArr != null && selArr.length > 0) {
            $.each(selArr, function (i, v) {
                userServiceUseSnos.push(v);
            });

            callMenu('/user/sendMsg', i18n('menu.txt.mgt.user.msg'), {"userServiceUseSno": userServiceUseSnos.toString()});
        }
    }
}

function showMngNoModal(sno){
    $("#manage-number-modal > .modal-dialog").load("/user/user/modal/mng_no", {userServiceUseSno : sno}, function() {
        $("#manage-number-modal").modal("show");
    });
}

function showUseRegModal() {
    $("#hospital-userReg-modal > .modal-dialog").load("/user/user/modal/user_det", {}, function () {
        $("#hospital-userReg-modal").modal("show");
    });
}

function updateUser(sno) {
    $("#hospital-userMod-modal > .modal-dialog").load("/user/user/modal/user_det_mod", {userServiceUseSno: sno}, function () {
        $("#hospital-userMod-modal").modal("show");
    });
}

function detailUser(sno){
    let newWindow =   window.open('/user/user/log?userServiceUseSno=' + sno);
    newWindow.onload = function (){
        let $headerTitle = $(newWindow.document).find("#header-page-title");
        $headerTitle.text(i18n('menu.txt.mgt.user.details'));
    }
}

function refreshTable() {
    $('#doctor-users-datatable').dataTable().fnFilter($("div.dataTables_filter input[type=search]").val());
}