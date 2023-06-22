jQuery(function($) {
    $('.image-gallery a').simpleLightbox({
        nextBtnClass: ' dripicons-chevron-right',
        nextBtnCaption: '',
        prevBtnClass: ' dripicons-chevron-left',
        prevBtnCaption: '',
    });
    
    $(".remove-image").on("click", function(e) {
        e.preventDefault()
        $(this).closest(".preview-item").remove()
    })
})