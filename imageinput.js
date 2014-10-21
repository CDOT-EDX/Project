/**
 * Simple image input
 *
 *
 * Click on image. Update the coordinates of a dot on the image.
 * The new coordinates are the location of the click.
 */

/**
 * 'The wise adapt themselves to circumstances, as water molds itself to the
 * pitcher.'
 *
 * ~ Chinese Proverb
 */

window.ImageInput = (function ($, undefined) {
    // TODO: store counter with data attribute of the this.el element?
    var ImageInput = ImageInputConstructor, counter = 0, results = [];

    ImageInput.prototype = {
        constructor: ImageInputConstructor,
        clickHandler: clickHandler
    };

    return ImageInput;

    function ImageInputConstructor(elementId) {
        this.el = $('#imageinput_' + elementId);
        ///if ( this.el.data('counter') && this.el.data('counter') >= 0 ){
        if ( this.el.data('counter') || this.el.data('counter') === 0 ){
            counter = this.el.data('counter');
        } else {
            this.el.data('counter', counter);
        }
        this.crossEls = [{id : counter, cross: $('#cross_' + elementId)}];
        this.inputEl = $('#input_' + elementId);

        this.el.on('click', this.clickHandler.bind(this));
        console.debug(this);
    }

    function clickHandler(event) {
        var offset = this.el.offset(),
            posX = event.offsetX ?
                event.offsetX : event.pageX - offset.left,
            posY = event.offsetY ?
                event.offsetY : event.pageY - offset.top,

            // To reduce differences between values returned by different kinds
            // of browsers, we round `posX` and `posY`.
            //
            // IE10: `posX` and `posY` - float.
            // Chrome, FF: `posX` and `posY` - integers.
            result = '[' + Math.round(posX) + ',' + Math.round(posY) + ',' + Date.now() + ',' +
                     ']', newCross;

        if ( this.el.data('counter') || this.el.data('counter') === 0 ){
            counter = this.el.data('counter');
        } else {
            this.el.data('counter', counter);
        }


        this.crossEls[counter].cross.css({
            left: posX - 15,
            top: posY - 15,
            visibility: 'visible'
        });

        newCross = this.crossEls[counter].cross.clone();
        this.crossEls[counter].cross.parent().append( newCross );
        this.crossEls.push({ id : counter, cross: newCross });
        counter ++;

        this.crossEls[counter].cross.css({
            left: 15,
            top: 15,
            visibility: 'visible'
        });

        console.log(result);
        console.debug(this);

        this.el.data('counter', counter);
        this.inputEl.val(results.push(result));
    }
}).call(this, window.jQuery);
