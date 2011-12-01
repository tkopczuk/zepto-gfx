(function ($) {
  
  !$ && throw 'Zepto required';
  
  var defaults = {
    duration: 400,
    easing: ''
  },
  
  vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' : 
    (/firefox/i).test(navigator.userAgent) ? 'moz',
    
  prefix = '-' + vendor + '-',
  
  vendorNames = n = {
    transition: prefix + 'transition',
    transform: prefix + 'transform',
    transitionEnd: vendor + 'TransitionEnd'
  },
  
  transformTypes = [
    'scale', 'scaleX', 'scaleY', 'scale3d',
    'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d',
    'translate', 'translateX', 'translateY', 'translateZ', 'translate3d',
    'skew', 'skewX', 'skewY',
    'matrix', 'matrix3d', 'perspective'
  ];
  
  // Helper function for easily adding transforms.
  $.fn.transform = function (properties, cb) {
    var transforms = [];
    for (var key in properties) {
      if (transformTypes.indexOf(key)) {
        transforms.push(key + '(' + transformTypes[key] + ')');
        delete properties[key];
      }
    }
    
    transforms.length && 
      (properties[n.transform] = transforms.join(' '));
      
    $(this).css(properties);
    
    cb ? cb();
  };
  
  // Effects
  $.fn.gfxPopIn = function (options, cb) {
    var that = this,
        opts = $.extend({}, defaults, options || {});
    options.scale ||= '.2';
    
    $(this).transform({
      '-webkit-transform-origin': '50% 50%',
      '-moz-transform-origin': '50% 50%',
      scale: options.scale,
      opacity: '0',
      display: 'block'
    }, function () {
      $(that).anim({scale: '1', opacity: '1'}, 
        opts.duration, opts.easing);
    });
    
    cb ? cb();
  };
  
})(Zepto);