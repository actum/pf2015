/* global MagicEye */

var app = {};

app.init = function() {

    var canvas = document.getElementById('paint');
    var context = canvas.getContext('2d');
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        MagicEye.render({
            el: 'greeting',
            // depthMapper: new MagicEye.ImgDepthMapper(img)
            // depthMapper: new MagicEye.TextDepthMapper('ZU')
            // depthMapper: new MagicEye.TemplateDepthMapper([[0.0, 0.0, 0.3],[0.0, 0.3, 0.6],[0.3, 0.6, 0.9]])
            depthMapper: new MagicEye.CanvasDepthMapper(canvas)
        });
    };
    img.src = 'img/pf2015.png';

};

window.app = app;
