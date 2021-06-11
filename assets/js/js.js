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

        if( ancho_pantalla < 768 )
            $('.menu').removeClass('on');
    });

    // Scroll to content
    $('.scroll_to_content').click(function(){
        smoothScrollTo('sobre');
    });

    // Submit contacto
    $('#submit').click(function(){
        validarContacto();
    });

    // PARA MÓVIL
    if( ancho_pantalla < 768 )
    {
        /** CARRUSEL/SLIDER - SERVICIOS */
        $('.contenedor_servicios').addClass('owl-carousel');
        $('.contenedor_servicios').owlCarousel({
            autoplay       : true,
            autoplayTimeout: 5000,
            loop           : true,
            margin         : 0,
            nav            : false,
            dots           : true,
            items          : 1,
        });

        /*** CARRUSEL/SLIDER - GALERIA */
        $('.contenedor_galeria').addClass('owl-carousel');
        $('.contenedor_galeria').owlCarousel({
            autoplay       : true,
            autoplayTimeout: 5000,
            loop           : true,
            margin         : 0,
            nav            : true,
            dots           : false,
            navText        : ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            items          : 1,
        });

        $('.toggle_menu').click(function(){
            $('.menu').addClass('on');
        });

        $('.cerrar_menu').click(function(){
            $('.menu').removeClass('on');
        });
    }
    else
    {
        if( $('.contenedor_servicios').hasClass('owl-carousel') )
        {
            $('.contenedor_servicios').owlCarousel('destroy'); 
            $('.contenedor_servicios').owlCarousel({touchDrag: false, mouseDrag: false});
        }
        if( $('.contenedor_galeria').hasClass('owl-carousel') )
        {
            $('.contenedor_galeria').owlCarousel('destroy'); 
            $('.contenedor_galeria').owlCarousel({touchDrag: false, mouseDrag: false});
        }
        $('.menu').removeClass('on');
    }

});

$(window).on('load', function(){   
    // Igualamos los anchos de carrusel y contenido
    altos_about();
});

$(window).scroll(function (event) {
    // GESTIÓN DE OPCIONES DEL MENÚ
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

    // HSCROLL
    let max_scroll     = $(document).height() - $(window).height();
    let current_scroll = $(window).scrollTop();
    let perc_fill      = (current_scroll * 100) / max_scroll;
    $('.hscroll').css('width', perc_fill + '%');
});

$(window).on('orientationchange', function(){
    altos_about();
});

$(window).on('resize', function(){
   altos_about();
});

/** Función que iguala los altos de SOBRE MI */
const altos_about = () => {

    if( ancho_pantalla > 1600 )
    {
        let alto_carrusel  = $('.sobre_nosotros .contenedor_carrusel').outerHeight(true);
        let alto_contenido = $('.sobre_nosotros .contenido').outerHeight(true);

        if( alto_carrusel > alto_contenido )
            $('.sobre_nosotros .contenido').css('height', alto_carrusel + 'px');
        else
            $('.sobre_nosotros .contenedor_carrusel').css('height', alto_contenido + 'px');
    }
    else
    {
        $('.sobre_nosotros .contenido').css('height', 'auto');
        $('.sobre_nosotros .contenedor_carrusel').css('height', 'auto');
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

const validarContacto = () => {

    let nombre   = $('#contacto input[name="nombre"]');
    let telefono = $('#contacto input[name="telefono"]');
    let email    = $('#contacto input[name="email"]');
    let mensaje  = $('#contacto textarea[name="mensaje"]');

    // Nombre
    if( nombre.val() == '' || nombre.val().length < 2 )
    {
        nombre.addClass('errored');
        nombre.parent().append('<span class="error_form">Introduce tu nombre</span>');
    }
    else
        nombre.removeClass('errored');

    // Teléfono
    if( telefono.val().length > 0 && telefono.val().length < 9 )
    {
        telefono.addClass('errored');
        telefono.parent().append('<span class="error_form">El teléfono no es válido</span>');
    }
    else
        telefono.removeClass('errored');

    // Email
    if( email.val() == '' )
    {
        email.addClass('errored');
        email.parent().append('<span class="error_form">Introduce tu email</span>');
    }
    else
    {
        emailValido = validEmail(email.val());
        if( !emailValido.valid )
        {
            email.parent().append('<span class="error_form">'+ emailValido.msg +'</span>');
            email.addClass('errored');
        }
        else
            email.removeClass('errored'); 
    }

    // Mensaje
    if( mensaje.val() == '' && mensaje.val().length < 5 )
    {
        mensaje.addClass('errored');
        mensaje.parent().append('<span class="error_form">El mensaje es obligatorio (Min. 5 caracteres)</span>');
    }
    else
        mensaje.removeClass('errored');

    // Limpiamos los errores flotantes al cabo de 4 segundos
    if( $('.error_form').length > 0 )
    {
        setTimeout(function(){
            $('.error_form').remove();
            $('#contacto input').removeClass('errored');
            $('#contacto textarea').removeClass('errored');
        }, 4000);
    }
    else
        $('#form_contacto').submit();
}

const validEmail = (email) => {

    let resp = {
        valid: true,
        msg  : ''
    };

    if( email.length < 7 )
        resp.valid = false;
    else
    {
        let index_arroba = email.indexOf('@');
        let index_punto  = email.indexOf('.');

        if( index_arroba === -1 || index_punto === -1 )
            resp.valid = false;
        else
        {
            let division = email.split('@');
            if( division[1].indexOf('.') === -1 )
                resp.valid = false;
        }
    }

    if( !resp.valid )
        resp.msg = 'Email no válido';

    return resp;
}