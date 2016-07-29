javascript:(function () {
    if (typeof ZHJ10W1lcg === 'undefined') {/*Append jQuery into Documents Head*/
        var jQuery = document.createElement('script');
        jQuery.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js');
        var head = document.getElementsByTagName('head');
        head[0].appendChild(jQuery);
        ZHJ10W1lcg = true;
    }
    setTimeout(function () {
        $(document).ready(function () {
            /*Remove previous list output*/
            $('#IMGlist').remove();
            /*Prepend List output and hide it before finding Images*/
            $('body').prepend('<div id="IMGlist" style="display:none;position:fixed;top:0;left:0;z-index:99999;background:#fff;">' +
                '<div style="position:absolute;top: 0;right:0;color:red;" onclick="$(this).parent().remove();">X</div></div>');
            /*Set Crosshair Cursor for all elements to indicate active Image selection*/
            $('body *').css('cursor', 'crosshair', 'important');
            var hoverElem = null;
            /*Get Hovered Element (better than clicking on specific element since they can be hidden or "pointer-events:none" obfuscated*/
            $('*').on('mouseenter', function () {
                hoverElem = this;
            });
            /*Function Preventing from leaving page via link*/
            var preventer = function (e) {
                e.preventDefault();
            };
            /*Function searching for images and outputting a list of them*/
            var searchIMGer = function (e) {
                $("body *").unbind("click", preventer);//Restore normal funciton of links
                $("body").unbind("click", searchIMGer);//Remove Body listener for Search Image function trigger
                $('body *').css('cursor', 'auto');//Restore normal cursor
                $('#IMGlist div').css('cursor', 'pointer');//Make list close element resemble a button for cursor
                var found = false;//Expect no image was found yet
                if ($(hoverElem).is('IMG')) {//Hovered element is image
                    $('#IMGlist').show()
                        .append('Found:<br />' +
                            '<div style="overflow:hidden;width:100px;height:100px;float:left;clear:both;"><img style="max-width:200%;" src="' + $(hoverElem).attr('SRC') + '"/></div>' +
                            '<div style="height:100px;float:left;">URL: ' + $(hoverElem).attr('SRC') + '</div><br />');
                    found = true;//Output IMGs url
                } else {
                    if ($(hoverElem).parent().find('IMG').length) {//Elements parent contains at least one image
                        $('#IMGlist').show().append('Found:<br />');
                        $(hoverElem).parent().find('IMG').each(function () {
                            $('#IMGlist').append('<div style="overflow:hidden;width:25px;height:25px;float:left;clear:both;"><img style="max-width:200%;" src="' + $(this).attr('SRC') + '"/></div>' +
                                '<div style="height:15x;float:left;">URL: ' + $(this).attr('SRC') + '</div><br />');
                        });
                        found = true;//Output list of IMG URLs
                    } else {//Elements parent does not contain any images, try looking for image backgrounds
                        $(hoverElem).parent().parent().find('*').each(function () {//Looking at all elements backgrounds two levels up
                            if ($(this).css('background-image') != 'none') {//has Image background
                                bgIMG = $(this).css('background-image');
                                $('#IMGlist').show()
                                    .append('<div style="overflow:hidden;width:25px;height:25px;float:left;clear:both;"><img style="max-width:200%;" src="' + bgIMG.substring(5, bgIMG.length - 2) + '"/></div>' +
                                        '<div style="height:15px;float:left;">URL: ' + bgIMG.substring(5, bgIMG.length - 2) + '</div><br />');
                                found = true;//Output list of IMG URLs
                            }
                        });
                        if (found)$('#IMGlist').prepend('Found:<br />');//Insert an Informative string
                    }
                    if (found == false)alert('Image was not found. sorry :(');//popUp information, that no image was found.
                }
            };
            $("body *").bind("click", preventer);//Prevent all elements from their natural actions from mouse click (following links)
            $("body").bind("click", searchIMGer);//Add listener to body element that will trigger Search for images on click function
        });
    }, 700);//Wait a bit to let everything settle and load
})();