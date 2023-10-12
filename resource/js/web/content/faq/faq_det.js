$(document).ready(function(){

//입력필드 썸머노트적용
    $(".summernote-basic").each(function() {
        $(this).summernote({
            placeholder: i18n('common.editor_empty'),
            height: 230,
            callbacks: {
                onChange: function(faq, $editable) {
                    $("input[name='" + this.id + "']").val(faq);
                },
                onImageUpload: function (files) {
                    uploadSummernoteImageFile(files[0], this);
                }
            }
        });
    });

    Dropzone.autoDiscover = false;
    $("#new_faq_thumb_Dropzone").dropzone({
        url: "about:blank",
        previewsContainer:"#new_faq_thumb_file-previews",
        previewTemplate: $("#new_faq_thumb_uploadPreviewTemplate").html(),
        maxFiles: 1,
        acceptedFiles : "image/*" ,
        autoProcessQueue: false,
        autoQueue: false,
        init : function(){

            this.on("addedfile", function(file) {

                let sno = $('form#contentsForm #thumbFileSno').val();
                let currentFileSize = $('#new_faq_thumb_file_' + sno).length;

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

            });

            let sno = $('form#faqContentsForm #thumbFileSno').val();
            let currentFileSize = $('#new_faq_thumb_file_' + sno).length;

            if (currentFileSize > 0) {
                $("#new_faq_thumb_Dropzone").addClass('dz-max-files-reached');
            }
        }
    });

    var faqSno = $('form#faqContentsForm #faqSno').val();

    if(faqSno > 0) {
        //컨텐츠 조회 API
        $.ajax({
            url : "/content/faq/api/sys_faq_det/show",
            dataType:'json',
            method: "POST",
            data : {
                "faqSno":faqSno
            },
            success : function(data){
                if(data.detail.useYn === "Y"){
                    $("#new_faq_useYn")[0].checked = true;
                }else{
                    $("#new_faq_useYn")[0].checked = false;
                }

                data.resultList.forEach(function(item) {
                     $("#titleFaq" + item["languageClcd"] ).val(item["faqTitleNm"]);
                     $("#faqWriterNm" + item["languageClcd"] ).val(item["faqWriterNm"]);
                     $("#faqContents" + item["languageClcd"] ).summernote('code', item["faqCtnt"]);
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    if(faqSno > 0) {
        let message = '<spring:message code="common.txt.mod.info" />';
        $("#new_faq .modal-title").text(message);

        $("#faq-modal-reg").hide();
    } else {
        $("#faq-modal-mod").hide();
    }
});

// 썸머노트 이미지 업로드 API
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

// 컨텐츠 등록/수정 API
function applyContents(faqSno) {
    $(".summernote-basic").each(function() {
        if ($(this).summernote('codeview.isActivated')) {
            $(this).summernote('codeview.deactivate');
        }
    });

    var enTitle = $("#faqContentsForm #titleFaq10801100").val();
    var enFaq = $("#faqContentsForm input[name=faqContents10801100]").val();
    var enResgiter = $("#faqContentsForm input[name=faqWriterNm10801100]").val();

    var thumbFileSno = $('form#faqContentsFormm #thumbFileSno').val();

    var form = $('#faqContentsForm')[0];

    var formData = new FormData(form);

    if(isEmpty(thumbFileSno)) {
        if(!isEmpty($('#new_faq_thumb_Dropzone')[0].dropzone.files[0])) {
            thumbFileSno = 0;
        }
    }

    if(isEmpty(enTitle)) {
        //영어제목 필수등록 체크
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.faq.null.pop.txt.title.eng'));
        return false;
    } else if(isEmpty(enResgiter)) {
        //영어작성자 필수등록 체크
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.faq.null.pop.txt.register.eng'));
        return false;
    } else if(isEmpty(enFaq)) {
        //영어내용 필수등록 체크
        $("#error-alert-modal").modal('show');
        $("#e_content").html(i18n('management.faq.null.pop.txt.txt.eng'));
        return false;
    } else if(!isEmpty(faqSno)) {
        if(!isEmpty(thumbFileSno)) {
            if(!isEmpty($('#new_faq_thumb_Dropzone')[0].dropzone.files[0])) {
                //썸네일 이미지 formData에 추가
                formData.append("image", $('#new_faq_thumb_Dropzone')[0].dropzone.files[0]);
            }
        }
        //컨텐츠 일련번호 formData에 추가
        formData.append('faqSno', faqSno);

        // 컨텐츠 수정 API
        $.ajax({
            url : "/content/faq/api/sys_faq_det/mod",
            type : "POST",
            enctype: 'multipart/form-data',
            data : formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success : function(data){
                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(i18n('management.faq.modify.pop.txt.title'));
                $("#success-alert-modal #content").html(i18n('management.faq.modify.pop.txt.txt'));
                // $("#new_contents").modal('hide');
                //처음 생성할때 ajax만 새로고침
                $('#faq-datatable').DataTable().ajax.reload();
                updateFaqContent();
                $("#sys_faq_tab_1").tab("show");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    } else if(isEmpty(faqSno)) {

        if(!isEmpty($('#new_faq_thumb_Dropzone')[0].dropzone.files[0])) {
            //썸네일 이미지 formData에 추가
            formData.append("image", $('#new_faq_thumb_Dropzone')[0].dropzone.files[0]);
        }

        //썸네일 이미지 formData에 추가
        //undefined


        // 컨텐츠 등록 API
        $.ajax({
            url: "/content/faq/api/sys_faq_det/reg",
            type: "POST",
            enctype: 'multipart/form-data',
            data : formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success: function (data) {
                $("#success-alert-modal").modal('show');
                $("#success-alert-modal #title").html(i18n('management.faq.new.pop.txt.title'));
                $("#success-alert-modal #content").html(i18n('management.faq.new.pop.txt.txt'));
                // $("#new_contents").modal('hide');
                //처음 생성할때 ajax만 새로고침
                $('#faq-datatable').DataTable().ajax.reload();
                updateFaqContent();
                $("#sys_faq_tab_1").tab("show");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
}

//FAQ 등록/수정 취소
function applyContentsReset(){
    $("#cancel-confirm-modal").modal('show');
    $("#cancel-confirm-modal_confirm_btn").off('click').on('click', function() {
        $("#cancel-confirm-modal").modal('hide');
        updateFaqContent();
        $("#sys_faq_tab_1").tab("show");
    });
}

//FAQ 썸네일 이미지 삭제
function faqThumbFileDel(sno){
    $("#faqForm #new_note_thumbFileDelYn").val("Y");
    $('#new_faq_thumb_Dropzone')[0].dropzone.removeAllFiles();
    $("#new_faq_thumb_file_"+sno).remove();
    $("#new_faq_thumb_Dropzone").removeClass('dz-max-files-reached');
    $("#thumbFileSno").val('');
}