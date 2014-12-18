/* global MagicEye */

var app = {};

app.init = function() {

    var canvas = document.getElementById('paint');
    var context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    var colors = [
        [255, 61, 40, 255],
        [255, 255, 255, 255],
        [0, 150, 0, 255]
    ];

    var writeText = function(text) {
        MagicEye.render({
            el: 'greeting',
            depthMapper: new MagicEye.TextDepthMapper(text),
            colors: colors
        });
    };

    if (location.hash) {
        var text = window.atob(location.hash.substr(1));
        writeText(text);
    } else {
        var img = new Image();
        img.onload = function() {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            MagicEye.render({
                el: 'greeting',
                depthMapper: new MagicEye.CanvasDepthMapper(canvas),
                colors: colors
            });
        };
        img.src = 'img/pf2015.png';
    }

    document.getElementById('create').addEventListener('click', function(e) {
        e.target.style.display = 'none';
        document.getElementById('create-box').style.display = 'block';
    });

    document.getElementById('share').addEventListener('click', function() {
        document.getElementById('share-box').style.display = 'block';

        var text = document.getElementById('text').value;
        writeText(text);

        var link = location.href + '#' + btoa(text);
        document.getElementById('share-link').value = link;
    });

};

/* jshint ignore:start */
// IE11 CanvasPixelArray polyfill
if (window.CanvasPixelArray) {
    CanvasPixelArray.prototype.set = function(arr) {
        var l = this.length;
        var i = 0;

        for (; i < l; i++) {
            this[i] = arr[i];
        }
    };
}

// IE11 Uint8ClampedArray polyfill
if (!window.Uint8ClampedArray && window.Uint8Array && window.ImageData) {
    window.Uint8ClampedArray = function(input, arg1, arg2) {
        var len = 0;
        if (typeof input == "undefined") {
            len = 0;
        } else if (!isNaN(parseInt(input.length))) { //an array, yay
            len = input.length;
        } else if (input instanceof ArrayBuffer) {
            return new Uint8ClampedArray(new Uint8Array(input, arg1, arg2));
        } else {
            len = parseInt(input);
            if (isNaN(len) || len < 0) {
                throw new RangeError();
            }
            input = undefined;
        }
        len = Math.ceil(len / 4);

        if (len == 0) len = 1;

        var array = document.createElement("canvas")
            .getContext("2d")
            .createImageData(len, 1)
            .data;

        if (typeof input != "undefined") {
            for (var i = 0; i < input.length; i++) {
                array[i] = input[i];
            }
        }
        try {
            Object.defineProperty(array, "buffer", {
                get: function() {
                    return new Uint8Array(this).buffer;
                }
            });
        } catch (e) {
            try {
                array.__defineGetter__("buffer", function() {
                    return new Uint8Array(this).buffer;
                });
            } catch (e) {}
        }
        return array;
    }
}
/* jshint ignore:end */

window.app = app;
