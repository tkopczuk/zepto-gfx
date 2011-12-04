# Zepto-GFX

Zepto-GFX is the [GFX](https://github.com/maccman/gfx) CSS3 animation library ported over to work with [Zepto](https://github.com/madrobby/zepto).  Since GFX is dependant on jQuery, I wanted to make a version that uses Zepto and it's CSS3 animation functions.  There are however, some differences between to two libraries.

The main difference between GFX and Zepto-GFX is that GFX uses jQuery's queueing functions.  Zepto-GFX doesn't since it's not available in Zepto (as of v0.8).

All the basic Zepto-GFX effects can take in a callback function to be executed once the animation is complete.  For `$.fn.gfxFlip()` and `$.fn.gfxCube()` effects however, instead of accepting a callback, an event is triggered when an animation related to these effects has occurred.  For example, when `$.fn.gfxFlip()` does a flip, a `flip:changed` event is triggered.  More details in the specific sections below.

## Browser support

Zepto-GFX currently only supports WebKit browsers (Safari/Chrome).

## Usage

[Zepto](https://github.com/madrobby/zepto) must be included first before including any of the Zepto-GFX files followed by `zepto-gfx.js`.

      <script src="zepto.js" type="text/javascript" charset="utf-8"></script>
      <script src="zepto-gfx.js" type="text/javascript" charset="utf-8"></script>
      
For the basic effects, this is enough.

## Basic effects

The basic effects include the following:

      $.fn.gfxExplodeOut(options, cb)
      $.fn.gfxExplodeIn(options, cb)
      $.fn.gfxPopIn(options, cb)
      $.fn.gfxPopOut(options, cb)
      $.fn.gfxShake(options, cb)
      $.fn.gfxBlip(options, cb)
      $.fn.gfxFadeIn(options, cb)
      $.fn.gfxFadeOut(options, cb)
      $.fn.gfxFlipIn(options, cb)
      $.fn.gfxFlipOut(options, cb)
      $.fn.gfxRotateIn(options, cb)
      $.fn.gfxRotateOut(options, cb)
      $.fn.gfxSlideIn(options, cb)
      $.fn.gfxSlideOut(options, cb)
      
The first argument `options` contain the valid options for the basic effects:

* `duration` - Animation duration in milliseconds.
* `easing` -  Animation flow control, either `linear`, `ease-in`, `ease-out`, `ease-in-out`, or a custom cubic bezier.
* `scale` - Amount to scale.  Only for `$.fn.gfxPopIn()`, `$.fn.gfxPopOut()`, `$.fn.gfxBlip`, `$.fn.gfxExplodeIn` and `$.fn.gfxExplodeOut`.
* `distance` - Animation distance.  Only for `$.fn.gfxShake`, `$.fn.gfxSlideIn` and `$.fn.gfxSlideOut`.
* `direction` - Animation direction.  Could be either `left` or `right`.  Only for `$.fn.gfxSlideIn` and `$.fn.gfxSlideOut`.
* `reset` - If `true`, resets the animated element to it's original state.  Only for `$.fn.gfxExplodeOut`, `$.fn.gfxFlipOut` and `$.fn.gfxRotateOut`.
* `fade` - If `true`, adds fading to the animation.  Only for `$.fn.gfxSlideIn` and `$.fn.gfxSlideOut`.

The second argument `cb` is the callback function to be executed when the animation is complete.

## Flip effect

The flip effect is for showing two elements that be can flipped between each other. To use it, first include the `zepto-gfx.flip.js` script along with `zepto-gfx.js` and `zepto.js`.

      <script src="zepto.js" type="text/javascript" charset="utf-8"></script>
      <script src="zepto-gfx.js" type="text/javascript" charset="utf-8"></script>
      <script src="zepto-gfx.flip.js" type="text/javascript" charset="utf-8"></script>
      
Create an element with the correct markup, including two children with `.front` and `.back` classes.

      <div id="flip">
        <div class="front">Front</div>
        <div class="back">Back</div>
      </div>
      
Call `$.fn.gfxFlip()` to setup the flipping. To activate a flip, trigger the `flip` event on the element.

      $("#flip").gfxFlip().click(function() {
        return $(this).trigger("flip");
      });
      
An event, `flip:changed` is triggered when the element is flipped.  If the element's back is in view, the class `flipped` is added to the element.

      $("#flip").bind('flip:changed', function () {
        if ($("#flip").hasClass('flipped')) {
          console.log('back side');
        } else {
          console.log('front side');
        }
      });
      
## Cube effect

To use the cube effect, first include the `zepto-gfx.cube.js` script along with `zepto-gfx.js` and `zepto.js`.

      <script src="zepto.js" type="text/javascript" charset="utf-8"></script>
      <script src="zepto-gfx.js" type="text/javascript" charset="utf-8"></script>
      <script src="zepto-gfx.cube.js" type="text/javascript" charset="utf-8"></script>
      
Setup the correct element structure:

      <div id="cube">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
      </div>
      
Call `$.fn.gfxCube()`, passing in the `height` and `width` of the cube.  You don't have to include all the faces, just the `front` face is required.

      $("#cube").gfxCube({
        width: 300,
        height: 300
      });

To change the face, just trigger the `cube` event, passing in the face name as event data.

      $(".download").click(function() {
        return $("#cube").trigger("cube", "right");
      });

      $(".back").click(function() {
        return $("#cube").trigger("cube", "front");
      });
      
An event, `cube:changed` is triggered when the cube's face is changed.  The second argument passed into the function bound to the `cube:changed` event is the cube's face name.

      $('#cube').bind('cube:changed', function (e, face) {
        console.log(face);
      });
      
## To do

- Tests
- Demos

## License

Zepto-GFX is is licensed under the terms of the MIT License, see the included LICENSE file.