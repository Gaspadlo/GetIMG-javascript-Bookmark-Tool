/************************************************
 * WARNING! This code is not yet working! [WIP]
 *
 * I am rewriting code into vanilla JS without the need of jQuery library
 *
 * Progress: ~30%;
 */

javascript:(function () {
    window.$ = document.querySelectorAll.bind(document);
    function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    setTimeout(function () {
        $(document).ready(function () {
            /*Remove previous list output*/
            $('#IMGlist').parentNode.removeChild($('#IMGlist'));
            /*Prepend List output and hide it before finding Images*/
            $('body').innerHTML = '<div id="IMGlist" style="display:none;position:fixed;top:0;left:0;z-index:99999;background:#fff;padding:5px;">' +
                '<div style="position:absolute;top: 0;right:0;color:red;" onclick="$(this).parent().remove();">X</div></div>' + $('body').innerHTML;
            /*Set Crosshair Cursor for all elements to indicate active Image selection*/
            $('body *').forEach(function (item, i) {
                item.setAttribute('style', i.getAttribute('style') + 'cursor:crosshair!important;');
            });
            var hoverElem = null;
            /*Get Hovered Element (better than clicking on specific element since they can be hidden or "pointer-events:none" obfuscated*/
            $('*').addEventListener("mouseenter", function () {
                hoverElem = this;
            });
            /*Function Preventing from leaving page via link*/
            var preventer = function (e) {
                e.preventDefault();
            };
            /*Function searching for images and outputting a list of them*/
            var searchIMGer = function () {
                $("body *").removeEventListener("click", preventer);//Restore normal funciton of links
                $("body").removeEventListener("click", searchIMGer);//Remove Body listener for Search Image function trigger
                $('body *').forEach(function (item, i) {
                    item.setAttribute('style', i.getAttribute('style') + 'cursor:auto!important;');
                });//Restore normal cursor
                $('#IMGlist div').forEach(function (item, i) {
                    item.setAttribute('style', i.getAttribute('style') + 'cursor:pointer!important;');
                });//Make list close element resemble a button for cursor
                var found = false;//Expect no image was found yet
                if ($(hoverElem).tagName === 'IMG') {//Hovered element is image
                    $('#IMGlist').setAttribute('style', $('#IMGlist').getAttribute('style') + 'display:block!important;');
                    $('#IMGlist').innerHTML('Found:<br />' +
                        '<div style="overflow:hidden;width:100px;height:100px;float:left;clear:both;"><img style="max-width:200%;" src="' + $(hoverElem).attr('SRC') + '"/></div>' +
                        '<div style="height:100px;float:left;">URL:<input style="max-height:25px" value="' + $(hoverElem).attr('SRC') + '" /></div><br />');
                    found = true;//Output IMGs url
                } else {
                    if ($(hoverElem).parentNode().querySelector('IMG').length) {//Elements parent contains at least one image
                        $('#IMGlist').show().append('Found:<br />');
                        $(hoverElem).parent().find('IMG').each(function () {
                            $('#IMGlist').append('<div style="overflow:hidden;width:25px;height:25px;float:left;clear:both;"><img style="max-width:200%;" src="' + $(this).attr('SRC') + '"/></div>' +
                                '<div style="height:15x;float:left;">URL:<input style="max-height:25px" value="' + $(this).attr('SRC') + '" /></div><br />');
                        });
                        found = true;//Output list of IMG URLs
                    } else {//Elements parent does not contain any images, try looking for image backgrounds
                        $(hoverElem).parent().parent().find('*').each(function () {//Looking at all elements backgrounds two levels up
                            if ($(this).css('background-image') != 'none') {//has Image background
                                bgIMG = $(this).css('background-image');
                                $('#IMGlist').show()
                                    .append('<div style="overflow:hidden;width:25px;height:25px;float:left;clear:both;"><img style="max-width:200%;" src="' + bgIMG.substring(5, bgIMG.length - 2) + '"/></div>' +
                                        '<div style="height:25px;float:left;">URL:<input style="max-height:25px" value="' + bgIMG.substring(5, bgIMG.length - 2) + '" /></div><br />');
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
    }, 250);//Wait a bit to let everything settle and load
})();