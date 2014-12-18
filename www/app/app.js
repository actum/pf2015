/* global MagicEye */

var app = {};

app.init = function() {

    var canvas = document.getElementById('paint');
    var context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    var writeText = function(text) {
        MagicEye.render({
            el: 'greeting',
            depthMapper: new MagicEye.TextDepthMapper(text)
        });
    };

    if (location.hash) {
        var text = window.atob(location.hash.substr(1));
        writeText(text);
    } else {
        var img = new Image();
        img.onload = function () {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            MagicEye.render({
                el: 'greeting',
                depthMapper: new MagicEye.CanvasDepthMapper(canvas)
            });
        };
        img.src = 'img/pf2015.png';
    }

    $('#create').click(function() {
        $(this).hide();
        $('#create-box').show();
    });

    $('#share').click(function() {
        $('#share-box').show();

        var text = $('#text').val().trim();

        writeText(text);

        var link = window.btoa(text);

        $('#share-link').val(location.href + '#' + link);
    });

};

window.app = app;
