/*! =========================================================
 *
 Paper Bootstrap Wizard - V1.0.1
*
* =========================================================
*
* Copyright 2016 Creative Tim (http://www.creative-tim.com/product/paper-bootstrap-wizard)
 *
 *                       _oo0oo_
 *                      o8888888o
 *                      88" . "88
 *                      (| -_- |)
 *                      0\  =  /0
 *                    ___/`---'\___
 *                  .' \|     |// '.
 *                 / \|||  :  |||// \
 *                / _||||| -:- |||||- \
 *               |   | \\  -  /// |   |
 *               | \_|  ''\---/''  |_/ |
 *               \  .-\__  '-'  ___/-. /
 *             ___'. .'  /--.--\  `. .'___
 *          ."" '<  `.___\_<|>_/___.' >' "".
 *         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *         \  \ `_.   \_ __\ /__ _/   .-` /  /
 *     =====`-.____`.___ \_____/___.-`___.-'=====
 *                       `=---='
 *
 *     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *               Buddha Bless:  "No Bugs"
 *
 * ========================================================= */

// Paper Bootstrap Wizard Functions

searchVisible = 0;
transparent = true;

$(document).ready(function () {

    /*  Activate the tooltips      */
    $('[rel="tooltip"]').tooltip();

    // Code for the Validator
    var $validator = $('.wizard-card form').validate({
        rules: {
            firstname: {
                required: true,
                minlength: 3
            },
            lastname: {
                required: true,
                minlength: 3
            },
            email: {
                required: true
            }
        },
    });

    // Wizard Initialization
    $('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',

        onNext: function (tab, navigation, index) {
            var $valid = $('.wizard-card form').valid();
            if (!$valid) {
                $validator.focusInvalid();
                return false;
            }
        },

        onInit: function (tab, navigation, index) {

            //check number of tabs and fill the entire row
            var $total = navigation.find('li').length;
            $width = 100 / $total;

            navigation.find('li').css('width', $width + '%');

        },

        onTabClick: function (tab, navigation, index) {

            var $valid = $('.wizard-card form').valid();

            if (!$valid) {
                return false;
            } else {
                return true;
            }

        },

        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;

            var $wizard = navigation.closest('.wizard-card');

            // If it's the last tab then hide the last button and show the finish instead
            if ($current >= $total) {
                $($wizard).find('.btn-next').hide();
                $($wizard).find('.btn-finish').show();
                lastStep();
            } else {
                $($wizard).find('.btn-next').show();
                $($wizard).find('.btn-finish').hide();
            }

            //update progress
            var move_distance = 100 / $total;
            move_distance = move_distance * (index) + move_distance / 2;

            $wizard.find($('.progress-bar')).css({width: move_distance + '%'});
            //e.relatedTarget // previous tab

            $wizard.find($('.wizard-card .nav-pills li.active a .icon-circle')).addClass('checked');

        }
    });


    // Prepare the preview for profile picture
    $("#wizard-picture").change(function () {
        readURL(this);
    });

    $('[data-toggle="wizard-radio"]').click(function () {
        wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked', 'true');
    });

    $('[data-toggle="wizard-checkbox"]').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked', 'true');
        }
    });

    $('.set-full-height').css('height', 'auto');

});


//Function to show image before upload

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function lastStep() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    const queryString = window.location.href;
    const queryParams = window.location.search;
    const sub = queryString.substring(queryString.lastIndexOf('/') + 1).toString();
    const emb = parseInt(sub);
    const params = new URLSearchParams(queryParams);
    const qcat = parseInt(params.get('cat'));
    const qfrom = parseInt(params.get('qfrom')) || 0;
    const span = document.createElement('span');
    span.className = 'spinner-grow spinner-grow-sm';
    span.id = 'span-sp';
    // console.log();
    // console.log(emb);
    if (!isNaN(emb) && !isNaN(qcat)) {
        fetch('/listing/single/' + emb, {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({idprd: emb})
        }).then(function (res) {
            let $prd = [];
            const $infoContainer = document.getElementById('detail-cars');
            const $imgContent = document.getElementById('detail-img-car');
            switch (res.status) {
                case 200:
                    $prd = JSON.parse(res.statusText);
                    function $getPrice_(){
                        if(qcat === 13 && qfrom === 33){
                            return $prd.priceLease;
                        }
                        if(qcat === 3 && qfrom === 33){
                            return $prd.priceSale;
                        }
                        else{
                            return $prd.price;
                        }
                    }
                    // console.log($prd);
                    // ----------------- div info ----------------
                    const $divInfo = document.createElement('div');
                    $divInfo.className = 'col-lg-12';
                    $divInfo.id = 'div-for-info';
                    $divInfo.innerHTML = '' +
                        '<div class="list-group">\n' +
                        '<span class="list-group-item">\n' +
                        '    <i>N<sup>0</sup> </i>\n' +
                        '    <b class="pull-right pr-2">'+(new Date().getTime())+'</b>\n' +
                        '</span>\n' +
                        '<span class="list-group-item">\n' +
                        '    <i>Modèle </i>\n' +
                        '    <b class="pull-right pr-2">'+$prd.fullname+'</b>\n' +
                        '</span>\n' +
                        '<span class="list-group-item">\n' +
                        '    <i>Marque </i>\n' +
                        '    <b class="pull-right pr-2">'+$prd.marque+'</b>\n' +
                        '</span>\n' +
                        '<span class="list-group-item">\n' +
                        '    <i>Prix </i>\n' +
                        '    <b class="pull-right pr-2">$'+$getPrice_()+'</b>\n' +
                        '</span>\n' +
                        ' <span class="list-group-item">' +
                        '     <small>Date </small>' +
                        '      <b class="pull-right pr-2">'+(new Date().toDateString())+'</b>'+
                        '  </span>'+
                        '</div>'
                    // --------------- end div info -------------
                    $infoContainer.innerHTML = null;
                    const $divImg = document.createElement('div');
                    $divImg.className = 'col-lg-12 border p-1 overflow-auto';
                    $divImg.id = 'imgContainer';
                    const $img = document.createElement('img');
                    $img.className = 'w-100 p-1 border';
                    $img.src = '/dynamicsImgs/' + $prd.imgprl;
                    // --------------------------------------------
                    $imgContent.innerHTML = null;
                    const Customer = JSON.parse(localStorage.getItem('lesServicesIdCustomer'));
                    $imgContent.appendChild($img);
                    $infoContainer.appendChild($divInfo);
                    const carCommand = {idClient:Customer.id,idCar:emb,categorie:qcat,catsecond:qfrom};

                    document.getElementById('finish').onclick = function(evt){
                        evt.target.appendChild(span)
                        fetch('/action/commande',{
                            method: 'post',
                            headers: {'content-type':'application/json'},
                            body: JSON.stringify(carCommand)
                        }).then(function(res){
                            switch(res.status){
                                case 200:
                                    Toast.fire({
                                        type: 'success',
                                        title: 'Requete executée avec succes un mail contenant ces informations vous a été envoyé;'+
                                        'Merci pour votre confiance'
                                      })
                                    break;
                                case 500:
                                    Toast.fire({
                                        type: 'error',
                                        title: 'Désolé ce véhicule est déjà pris; Nous sugerons de choisir un autre véhicule'
                                      })
                                    break;
                                default:
                                    break;
                            }
                        }).catch(function(error){
                            console.log(error)
                        })
                    }
                    break;
                case 404:
                    alert('Erreur du serveur le fichier ciblé n\'existe plus');
                    window.location.href = '/';
                default:
                    break;
            }
            // ----------------------
            // $img.src =
            // ----------------------
            // console.log('je sais que david jesus t aime' + infoContainer.innerHTML);
        }).catch(function (error) {
            console.log(error);
        })
    } else {
        console.log(params)
        window.location.href = '/';
    }
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};


(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '', 'ga');

ga('create', 'UA-46172202-1', 'auto');
ga('send', 'pageview');
