const ancho_pantalla = $(window).width();
const year           = new Date().getFullYear();
const alto_cabecera  = $('header').outerHeight(true);

$(document).ready(function(){

    /** CARRUSEL/SLIDER - SOBRE MI */
    $('.carrusel').owlCarousel({
        autoplay       : true,
        autoplayTimeout: 5000,
        loop           : true,
        margin         : 0,
        animateIn      : 'fadeIn',
        animateOut     : 'fadeOut',
        nav            : false,
        dots           : true,
        dotsContainer  : '.dots_carrusel',
        items          : 1,
    });

    // Igualamos los anchos de carrusel y contenido
    altos_about();

    // Fijamos el año
    $('#year').html(year);

    // Opciones del menú cabecera
    $('.menu li').click(function(){
        id      = $(this).attr('id');
        destino = id.substr(3);

        smoothScrollTo(destino);

        $('.menu li').removeClass('active');
        $(this).addClass('active');
    });

    // Scroll to content
    $('.scroll_to_content').click(function(){
        smoothScrollTo('inicio');
    });

    // Animación de la galería
    $('.galeria .item_galeria').mouseenter(function(){

        // Si hay alguna en hover, lo deshago
        if( $('.galeria .item_galeria.hover_on').length > 1 )
        {
            $('.galeria .item_galeria.hover_on').each(function(index){
                let current_item = $('.galeria .item_galeria.hover_on').eq(index);

                current_item.addClass('hover_off');

                setTimeout(function(){
                    current_item.removeClass('hover_on');
                    current_item.removeClass('hover_off');
                }, 350);
            });
        }

        if( !$(this).hasClass('hover_on') && !$(this).hasClass('hover_off') )
            $(this).addClass('hover_on');
    });

    $('.galeria .item_galeria').mouseleave(function(){

        item = $(this);

        if( item.hasClass('hover_on') )
        {
            item.addClass('hover_off');

            setTimeout(function(){
                item.removeClass('hover_on');
                item.removeClass('hover_off');
            }, 350);
        }
    });
});

$(window).on('load', function(){   
    
});

$(window).scroll(function (event) {
    let scroll = $(window).scrollTop() + alto_cabecera;
    let opcion = '';
    
    // Posiciones de los contenidos
    inicio   = 0;
    about    = $('#sobre').offset().top;
    services = $('#servicios').offset().top;
    gallery  = $('#galeria').offset().top;
    contact  = $('#contacto').offset().top;

    // Esta referencia es para activar la opción de los proyectos
    alto_ventana   = $(window).outerHeight(true);
    alto_documento = $(document).outerHeight(true);
    offset_bottom  = alto_documento - alto_ventana;

    if( scroll < about )
        opcion = 'go_inicio';
    else if( scroll >= about && scroll < services )
        opcion = 'go_sobre';
    else if( scroll >= services && scroll < gallery )
        opcion = 'go_servicios';
    else if( scroll >= gallery && scroll < contact && scroll < offset_bottom )
        opcion = 'go_galeria';
    else
        opcion = 'go_contacto';

    $('.menu li').removeClass('active');
    $('#'+opcion).addClass('active');
});

$(window).on('orientationchange', function(){
    altos_about();
});

$(window).on('resize', function(){
   altos_about();
});

/** Función que iguala los altos de SOBRE MI */
const altos_about = () => {

    if( ancho_pantalla > 767 )
    {
        let alto_carrusel  = $('.sobre_nosotros .contenedor_carrusel').outerHeight(true);
        let alto_contenido = $('.sobre_nosotros .contenido').outerHeight(true);

        if( alto_carrusel > alto_contenido )
            $('.sobre_nosotros .contenido').css('height', alto_carrusel + 'px');
        else
            $('.sobre_nosotros .contenedor_carrusel').css('height', alto_contenido + 'px');
    }

}

const smoothScrollTo = (destino) => {

    if( destino == 'inicio' )
        scroll = 0;
    else
        scroll  = $('#'+destino).position().top - alto_cabecera + 1;

    $('html, body').animate({
        scrollTop: scroll
    }, 800);
}