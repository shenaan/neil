$(document).ready(function () {

    function isMobile() {
        if ($('.is-mobile').css('display') === 'block') {
            return true;
        } else {
            return false;
        }
    }

    /* Init object fit polyfill */
    /* To make it work, add 'font-family: 'object-fit: cover;';' to image */
    if (window.objectFitImages) {
        window.objectFitImages();
    }

    //Scroll library init
    // https://github.com/michalsnik/aos
    AOS.init({
        offset: 40, // offset (in px) from the original trigger point
        delay: 50, // values from 0 to 3000, with step 50ms
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-sine', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
    });

    //reseting header
    function headerReset() {
        $('.page-menu').removeClass('is-active');
        $('.hamburger').removeClass('is-active');
        $('.header').removeClass('is-opened');
        $('body, html').removeClass('no-scroll-initial');
    }

    $('.scroll-link').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);

        if ($this.hasClass('header-nav__list-link')) {
            $('.hamburger').toggleClass('is-active');
            headerReset();
        }

        $('html,body').animate({
                scrollTop: $($this.attr('href')).offset().top
            },
            1000
        );
    });

    $('.hamburger').on('click', function (e) {
        $(this).toggleClass('is-active');
        $('.header').toggleClass('is-opened');
        $('body, html').toggleClass('no-scroll-initial');
    });

    //Carousels

    $('.section-band__slider').slick({
        dots: false,
        fade: true
    });

    $('.shop-slider').slick({
        dots: true,
        arrows: false
    });

    //End Carousels

    //Songs Section

    function songActiveInit() {
        if (isMobile()) {
            $('.section-songs__list-item').eq(0).removeClass('is-selected');
        } else {
            $('.section-songs__list-item').eq(0).addClass('is-selected');
        }
    }

    $('.section-songs__list-item a').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            parent = $this.parent(),
            parentSiblings = $('.section-songs__list-item'),
            target = $this.attr('href'),
            songs = $('.section-songs__content-item'),
            songActive = $('.section-songs__content-item' + target);

        songs.hide();
        if (isMobile()) {
            if (parent.hasClass('is-selected')) {
                parent.removeClass('is-selected');
                parentSiblings.show();
                songActive.fadeOut(700);
            } else {
                parentSiblings.removeClass('is-selected').hide();
                parent.toggleClass('is-selected').show();
                songActive.fadeIn(700);
            }
        } else {
            if (parent.hasClass('is-selected')) {
                songActive.show();
            } else {
                parentSiblings.removeClass('is-selected');
                parent.addClass('is-selected');
                songActive.fadeIn(700);
            }
        }
    });

    function handleSongs() {
        var title = $('.section-songs__list-item'),
            titleActive = $('.section-songs__list-item.is-selected'),
            linkActive = $('.section-songs__list-item.is-selected a'),
            songActive = $('.section-songs__content-item' + linkActive.attr('href')),
            song = $('.section-songs__content-item'),
            songDefault = $('.section-songs__content-item--default');

        if (isMobile()) {
            if (titleActive.length !== 0) {
                songActive.show();
                title.hide();
                titleActive.show();
            } else {
                song.hide();
            }
        } else {
            if (titleActive.length !== 0) {
                songActive.show();
            } else {
                song.hide();
                songDefault.show();
            }
        }
    }

    //End Songs Section

    //modal
    $('.modal__link').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            href = $this.attr('href');

        $('body').find('.modal__wrap' + href).addClass('is-active');
    });

    $('.modal__close-btn').on('click', function (e) {
        $('.modal__wrap').removeClass('is-active');
    });

    songActiveInit();

    $(window).resize(function () {
        headerReset();
        handleSongs();
    });

    $(window).on('orientationchange', function () {
        headerReset();
    });

});

$(window).on('load', function () {

});
