
$(document).ready(function(){
    $(".summernote-basic").each(function() {
        $(this).summernote({
            placeholder: i18n('common.editor_empty'),
            height: 230,
            callbacks: {
                onChange: function(contents, $editable) {
                    $("input[name='" + this.id + "']").val(contents);
                },
                onImageUpload: function (files) {
                    uploadSummernoteImageFile(files[0], this);
                }
            }
        });
    });

    Dropzone.autoDiscover = false;
    $("#new_content_thumb_Dropzone").dropzone({
        url: "about:blank",
        previewsContainer:"#new_content_thumb_file-previews",
        previewTemplate: $("#new_content_thumb_uploadPreviewTemplate").html(),
        maxFiles: 1,
        acceptedFiles : "image/*" ,
        autoProcessQueue: false,
        autoQueue: false,
        init : function(){

            this.on("addedfile", function(file) {

                let sno = $('form#contentsForm #thumbFileSno').val();
                let currentFileSize = $('#new_content_thumb_file_' + sno).length;

                if (currentFileSize > 0) {
                    this.removeFile(file);

                    $("#error-alert-modal").modal('show');
                    $("#error-alert-modal #e_title").html(i18n('common.txt.required.file.title'));
                    $("#error-alert-modal #e_content").html(i18n('management.video.txt.limit'));
                }
            });
            this.on("maxfilesexceeded", function() {
                this.removeFile(this.files[1]);

                $("#error-alert-modal").modal('show');
                $("#error-alert-modal #e_title").html(i18n('common.txt.required.file.title'));
                $("#error-alert-modal #e_content").html(i18n('management.video.txt.limit'));
            });
            this.on("removedfile", function() {
                // console.log("thumb_removedfile ~~~");
            });

            let sno = $('form#contentsForm #thumbFileSno').val();
            let currentFileSize = $('#new_content_thumb_file_' + sno).length;

            if (currentFileSize > 0) {
                $("#new_content_thumb_Dropzone").addClass('dz-max-files-reached');
            }
        }
    });

    var contentsSno = $('form#contentsForm #contentsSno').val();
    // console.log('contentsSno:' + contentsSno);

    if(contentsSno > 0) {
        $.ajax({
            url : "/content/content/api/sys_contents_det/show",
            dataType:'json',
            method: "POST",
            data : {
                "contentsSno":contentsSno
            },
            success : function(data){
                if(data.detail.useYn === "Y"){
                    $("#new_content_useYn")[0].checked = true;
                }else{
                    $("#new_content_useYn")[0].checked = false;
                }

                data.resultList.forEach(function(item) {
                    // console.log(item);
                    $("#titleContents" + item["languageClcd"] ).val(item["contentsTitleNm"]);
                    $("#contentsWriterNm" + item["languageClcd"] ).val(item["contentsWriterNm"]);
                    $("#contentContents" + item["languageClcd"] ).summernote('code', item["contentsCtnt"]);
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    if(contentsSno > 0) {
        let message = '<spring:message code="common.txt.mod.info" />';
        $("#new_contents .modal-title").text(message);

        $("#contents-modal-reg").hide();
    } else {
        $("#contents-modal-mod").hide();
    }
});

function uploadSummernoteImageFile(file, editor) {
    var data = new FormData();
    data.append("image", file);

    $.ajax({
        data: data,
        enctype: 'multipart/form-data',
        type: "POST",
        url: "/comm/imgupload",
        contentType: false,
        processData: false,
        success: function (data) {
            $(editor).summernote('insertImage', data, function ($image) {
                $image.css('width', '100%');
            });
        },
        error: function (request, status, error) {

        }
    });
}

function applyContents(contentsSno) {

    $(".summernote-basic").each(function() {
        if ($(this).summernote('codeview.isActivated')) {
            $(this).summernote('codeview.deactivate');
        }
    });

    var contentsAreaClcd = $("#contentsForm #contentsAreaClcd").val();

    var enTitle = $("#contentsForm #titleContents10801100").val();
    var cnTitle = $("#contentsForm #titleContents10801200").val();
    var koTitle = $("#contentsForm #titleContents10801300").val();
    var arTitle = $("#contentsForm #titleContents10801400").val();


    var enContent = $("#contentsForm input[name=contentContents10801100]").val();
    var cnContent = $("#contentsForm input[name=contentContents10801200]").val();
    var koContent = $("#contentsForm input[name=contentContents10801300]").val();
    var arContent = $("#contentsForm input[name=contentContents10801400]").val();


    if(isEmpty(enTitle)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.contents.null.pop.txt.title.eng'));
        return false;
    } else if(isEmpty(enContent)) {
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.contents.null.pop.txt.txt.eng'));
        return false;
    }

    var form = $('#contentsForm')[0];
    var formData = new FormData(form);


    if(!isEmpty($('#new_content_thumb_Dropzone')[0].dropzone.files[0])) {
        formData.append("image", $('#new_content_thumb_Dropzone')[0].dropzone.files[0]);
    }

    if(!isEmpty(contentsSno)) {
        formData.append('contentsSno', contentsSno);

        $.ajax({
            url : "/content/content/api/sys_contents_det/mod",
            type : "POST",
            enctype: 'multipart/form-data',
            data : formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success : function(data){
                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(i18n('management.contents.modify.pop.txt.title'));
                $("#success-alert-modal #content").html(i18n('management.contents.modify.pop.txt.txt'));
                // $("#new_contents").modal('hide');
                //처음 생성할때 ajax만 새로고침
                $('#contents-datatable').DataTable().ajax.reload();
                updateContents();
                $("#sys_content_tab_1").tab("show");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    } else if(isEmpty(contentsSno)) {
        $.ajax({
            url: "/content/content/api/sys_contents_det/reg",
            type: "POST",
            enctype: 'multipart/form-data',
            data : formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success: function (data) {
                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(i18n('management.contents.new.pop.txt.title'));
                $("#success-alert-modal #content").html(i18n('management.contents.new.pop.txt.txt'));
                // $("#new_contents").modal('hide');
                //처음 생성할때 ajax만 새로고침
                $('#contents-datatable').DataTable().ajax.reload();
                updateContents();
                $("#sys_content_tab_1").tab("show");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
}

function applyContentsReset(){
    $("#cancel-confirm-modal").modal('show');
    $("#cancel-confirm-modal_confirm_btn").off('click').on('click', function() {
        $("#cancel-confirm-modal").modal('hide');
        updateContents();
        $("#sys_content_tab_1").tab("show");
    });
}

function contentsThumbFileDel(sno){
    // console.log("contentsThumbFileDel ~~~~~~~~~~~~~"+ sno);
    $("#contentsForm #new_note_thumbFileDelYn").val("Y");
    $('#new_content_thumb_Dropzone')[0].dropzone.removeAllFiles();
    $("#new_content_thumb_file_"+sno).remove();
    $("#new_content_thumb_Dropzone").removeClass('dz-max-files-reached');
}