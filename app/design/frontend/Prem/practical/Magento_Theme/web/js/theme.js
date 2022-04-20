/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'mage/smart-keyboard-handler',
    'mage/mage',
    'mage/ie-class-fixer',
    'domReady!'
], function ($, keyboardHandler) {
    'use strict';

    $('.cart-summary').mage('sticky', {
        container: '#maincontent'
    });

    $('.panel.header > .header.links').clone().appendTo('#store\\.links');
    $('#store\\.links li a').each(function () {
        var id = $(this).attr('id');

        if (id !== undefined) {
            $(this).attr('id', id + '_mobile');
        }
    });

    function SliderDynamicheight(){
        function bgSize($el, cb){
            $('<img />')
            .load(function(){ cb(this.width, this.height); console.log(this.height); })
            .attr('src', $el.css('background-image').match(/^url\("?(.+?)"?\)$/)[1]);            
        }
  
        $('.banner-slider .pagebuilder-slide-wrapper').each(function(){
            var $This = $(this);                
            bgSize($This, function(width, height){
                var Ratio = width/height;
                var ActualHeight = $This.width() / Ratio;                    
                $This.css('height',ActualHeight);
            });
        });
    }
    SliderDynamicheight();

    var resize_timeout;
    $(window).on('resize orientationchange', function(){
        clearTimeout(resize_timeout);
        resize_timeout = setTimeout(function(){ 
            $(window).trigger('resized');
        }, 250);
    });
    $(window).bind('resized', function() {
        SliderDynamicheight();
        console.log('resize');
    });

    $('.left-categories .navigation li.parent').each(function(){
        var $This = $(this);
        $('<span id="plus-minus"></span>').appendTo($This).insertAfter($This.find('.level-top'));
    });
    $('.left-categories li.level0.parent').each(function(){
        var $Thisc = $(this);
        $(this).find('#plus-minus').click(function(){
            $Thisc.find('ul.level0.submenu').toggleClass('active');
            $(this).toggleClass('active');   
        });
    });
    $('.left-categories li.level1.parent').each(function(){
        var $Thisc = $(this);
        $(this).find('#plus-minus').click(function(){
            $Thisc.find('ul.level1.submenu').toggleClass('active');
            $(this).toggleClass('active');   
        });
    });

    keyboardHandler.apply();
});
