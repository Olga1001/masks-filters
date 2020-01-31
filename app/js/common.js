$(document).ready(function () {

    //sum price and quantity of goods in basket
    function summprice() {
        let subsumm = 0,
            subprice = $('.basket-price-num');
        $('.card-price-num').each(function(){
            let firstValue = parseInt($(this).data("default-price"));
            subsumm += firstValue;
        });

        subprice.text(abc2(subsumm));

        let cardLength = $(".card").length;
        $(".basket-count").text(cardLength);
    };
    summprice();

    //spaces between
    function abc2(n) {
        n += "";
        n = new Array(4 - n.length % 3).join("U") + n;
        return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
    }

    //swipe
    let content = $(this).find(".offer-content, .category-item, .card-content");
    content.mousedown(function () {
        let startX = this.scrollLeft + event.pageX;
        content.mousemove(function () {
            this.scrollLeft = startX - event.pageX;
            return false;
        });
    });
    $(window).mouseup(function () {
        content.off("mousemove");
    });
    content.mouseout(function () {
        content.off("mousemove");
    });

    //click on swipe in card
    $(".card-swipe").click(function (e) {
        e.preventDefault();
        let thisItem =  $(this).closest(".card-content");
        let maxscroll = thisItem[0].scrollWidth;
        if(thisItem.scrollLeft() != 0){
            thisItem.animate({
                scrollLeft: -1 * maxscroll
            }, 500);
        }else {
            thisItem.animate({
                scrollLeft: maxscroll
            }, 500);
        }
    });

    //popup
    if ($(".bg-popup").hasClass('active')){
        $(".header").addClass('active');
    }else {
        $(".header").removeClass('active');
    }
    $(".bg-popup-close").click(function (e) {
        e.preventDefault();
        $(".bg-popup, .header").removeClass('active');
        $(".hide").hide();
    });

    //delete product
    $(".delete").click(function (e) {
        $(this).closest(".card").remove();
        summprice();
    });
    //tabs masks and filters
    $(".tab").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let index = $(this).index();
        $(".category-item").eq(index).addClass('active').siblings().removeClass('active');
    });

    //select category
    $(".category-btn").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //category swipe
    $(".category-swipe").click(function () {
        $(this).toggleClass('active');
        let maxscroll = $('.category-item')[0].scrollWidth;
        if ($(".category-swipe").hasClass('active')){
            $('.category-item').animate({
                scrollLeft: maxscroll
            }, 500);
        } else {
            $('.category-item').animate({
                scrollLeft: -1 * maxscroll
            }, 500);
        }
    });

    //swipe click (card)
    $(".offer-swipe").click(function () {
        $(this).toggleClass('active');
        let maxscroll = $('.offer-content')[0].scrollWidth;
        if ($(".offer-swipe").hasClass('active')){
            $('.offer-content').animate({
                scrollLeft: maxscroll
            }, 500);
        } else {
            $('.offer-content').animate({
                scrollLeft: -1 * maxscroll
            }, 500);
        }
    });

    //popup
    if ($(".popup")) {
        let popup = $(this).find(".popup-container").closest(".popup");
        let container = $(this).find(".popup-container");
        if (container.height() >= $(window).height()) {
            popup.addClass('top');
        }
    }
    $(".link-instruction").click(function () {
        $(".popup-instruction").addClass('active');
        if (window.matchMedia("(max-width: 768px)").matches) {
            $(".bg-popup, .header").removeClass('active');
            $(".header-user").addClass('hide');
            $(".btn-back").addClass('active');
            $(".wrap").addClass('hide');
            $(".btn-basket").hide();
        } else {
            $.scrollLock(true);
        }
    });
    $(".popup-container, .popup-drop").click(function (e) {
        e.stopPropagation();
    });

    //click on button - basket
    $(".btn-basket").click(function (e) {
        if (window.matchMedia("(max-width: 767px)").matches) {
            $(".wrap").addClass('hide');
            $(".btn-back").addClass('active');
            $(".header-user").addClass('hide');
            $(".bg-popup, .header").removeClass('active');
            $(".btn-basket").hide();
        } else {
            $(".wrap").removeClass('hide');
        }
        if(!$(".btn-basket").hasClass('active')){
            e.preventDefault();
            $(".popup").removeClass('active');
            $(".popup-basket").addClass('active');
        } else {
            $(".popup").removeClass('active');
        }
    });

    //close
    $(".close, .popup, .menu-close").click(function () {
        $(".popup").removeClass('active');
        $(".menu").removeClass('active');
        $.scrollLock(false);
        if (window.matchMedia("(min-width: 768px)").matches) {
            $(".wrap").removeClass('hide');
        } else {
            $(".wrap").removeClass('hide');
            $(".btn-back").removeClass('active');
            $(".header-user").removeClass('hide');
        }
    });

    //burger header
    $(".header-burger").click(function () {
        $(".menu").addClass('active');
        $.scrollLock(true);
    });

    //button back (mobile)
    $(".btn-back").click(function () {
        $(".popup").removeClass('active');
        $(this).removeClass('active');
        $(".wrap").removeClass('hide');
        $(".header-user").removeClass('hide');
        $(".btn-basket").show();
        $.scrollLock(false);
    });

    //button payment
    $(".payment").click(function (e) {
        e.preventDefault();
        $(".popup-email").addClass('active');
        $(".popup-error").removeClass('active');

        if (window.matchMedia("(min-width: 768px)").matches) {
            $(".wrap").removeClass('hide');
            $.scrollLock(true);
        } else {
            $(".wrap").addClass('hide');
            $(".btn-back").addClass('active');
            $(".header-user").addClass('hide');
        }
    });

    //add to cart more than one product
    $(".add-to-cart").click(function (e) {
        if(!$(this).hasClass('active')){
            $(this).addClass('active').text("Перейти в корзину");
            $(".btn-basket").addClass('active');
            e.preventDefault();
        }
    });

    //add to cart one product
    $(".add-to-cart__one").click(function (e) {
        if(!$(this).hasClass('active')){
            $(this).addClass('active').text("Оплатить");
            $(".btn-basket").addClass('active');
            e.preventDefault();
        }
    });

    //validate email
    function validateEmail(email) {
        var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    }
    //validate
    function validate() {
        var $result = $(".popup-error");
        var email = $(".input-email").val();
        var required = $("input, textarea, .check-required");
        $result.text("");
        if (!validateEmail(email) || required.val()==' ') {
            $result.addClass('active').text('Заполните поле, чтобы продолжить');
            required.addClass('required');
        } else {
            $result.removeClass('active').text(' ');
            required.removeClass('required');
        }
        return false;
    }
    $("form .btn-yellow").bind("click", validate);

    //loader files
    $('#order-files').on('change', function(){
        let length = this.files.length;
        $(".your-files_nm").html(length);
        $(".form-loader-text").addClass('active');
        $(".form-loader-icon").addClass('active');
        $(".btn-white-span").text('Загружено');
    });

    //drop down list (admin)
    $(".popup-drop-item").click(function () {
        if (window.matchMedia("(min-width: 768px)").matches) {
            $(this).find(".popup-drop-input").toggleClass('active').closest(".admin-form-field").siblings().find(".popup-drop-input").removeClass('active');
            $(this).closest(".popup-drop").find(".popup-drop-list").slideToggle(300).closest(".admin-form-field").siblings().find(".popup-drop-list").slideUp(300);
            $(this).find(".popup-drop-arrow").toggleClass('active').closest(".admin-form-field").siblings().find(".popup-drop-arrow").removeClass('active');
        } else{
            $(this).closest(".admin-form-field").find(".admin-creator-page").addClass('active');
            $(".admin-header").addClass('active');
            $.scrollLock(true);
        }
    });
    $(".admin-creator-page .link-blue").click(function (e) {
        e.preventDefault();
        $(".admin-creator-page").removeClass('active');
        $(".admin-header").removeClass('active');
        $.scrollLock(false);
        $(".admin-creator-page .admin-load").show();
        $(".admin-creator-page .admin-flex").removeClass('active');
    });
    if (window.matchMedia("(min-width: 768px)").matches) {
        //close dropdown on body
        $("body").click(function () {
            $(".popup-drop-input").removeClass('active');
            $(".popup-drop-list").slideUp(300);
            $(".popup-drop-arrow").removeClass('active');
        });
    }

    //category and creator (admin)
    let inputCreator = $(".admin-creator .popup-drop-input"),
        inputCategory = $(".admin-category .popup-drop-input");
    function checkChecked () {
        let checkbox = $('.admin-creator .checkbox'),
            arr = [];
        let checkbox1 = $('.admin-category .checkbox'),
            arr1 = [];
        if ($('.admin-creator .checkbox:checked').length > 0) {
            checkbox.each(function(index, item) {
                if (item.checked) {
                    arr.push($.trim(item.value));
                    inputCreator.val(arr.join(', '))
                }
            })
        }
        else {
            inputCreator.val('---------')
        }
        if ($('.admin-category .checkbox:checked').length > 0) {
            checkbox1.each(function(index, item) {
                if (item.checked) {
                    arr1.push($.trim(item.value));
                    inputCategory.val(arr1.join(', '))
                }
            })
        }
    }

    $(document).on('change','.popup-drop-list .checkbox', function() {
        checkChecked();
    });

    if (window.matchMedia("(min-width: 768px)").matches) {
        $(".admin-block .admin-load").click(function (e) {
            e.preventDefault();
            $(".admin-flex-add").addClass('active');
            $(".admin-creator .popup-drop-item").hide();
            $(this).hide();

        });

    }else{
        $(".admin-creator-page .admin-load").click(function (e) {
            $(this).hide();
            $(".admin-flex-add").addClass('active')
            e.preventDefault();
        });
    }

    //add creator
    $(".admin-form-add, .admin-add-nick").click("change", function (e) {
        e.preventDefault();

        $(".admin-creator .popup-drop-item").show();
        let val = $(".admin-block .admin-form-input").val();
        if (window.matchMedia("(min-width: 768px)").matches) {
            $(".admin-flex-add").removeClass('active');
            $(".admin-creator-add").show();
        }
        if (val.length > 0){
            $(".admin-creator .popup-drop-list ").append("<label class=\"label\"><input type=\"checkbox\" class=\"checkbox\" checked value=\" " + val + "\"><span class=\"check-circle\"></span><span class=\"check-text\">" + val + "</span></label>");
        }
        checkChecked();
        $(".admin-creator-page .admin-form-input").val('');

    });

    $("#your-files").on("change", function (evt) {
        let files = evt.target.files; // FileList object
        document.getElementsByClassName('form-loader-row').innerHTML = "";
        for (let i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                alert("Только изображения....");
            }
            let reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    let label = document.createElement('label');
                    label.innerHTML = ['<input type="radio" class="checkbox" name="preview"><img class="your-files_img" src="', e.target.result,
                        '" title="', escape(theFile.name), '"/>'].join('');
                    document.getElementById('form-loader-row').insertBefore(label, null);
                    if (window.matchMedia("(min-width: 768px)").matches) {
                        $(".admin-form-text").slideDown(300);
                    } else {
                        $(".admin-form-text.show-767").slideDown(300);
                    }

                    $(".form-loader-slide").slideDown(300);
                };
            })(f);
            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
        return false;
    });

     //preview selected
     $('#form-loader-row').click("change", function () {
        $(".admin-form-text").addClass('active').text("Превью выбрано");
    });

    //change displayed (admin)
    $('.link-change').click("change", function (e) {
        e.preventDefault();
        $(".admin-removed").slideDown(300);
        if( $('.link-change').text() == "Включить"){
            $(this).text("Выключить");
            $(".admin-removed").slideUp(300);
            $(".admin-displayed-text").text("Отображается");
            $(".admin-displayed-icon").attr("src", "img/payment-check.svg");
        } else {
            $(this).text("Включить");
            $(".admin-displayed-text").text("Не отображается");
            $(".admin-displayed-icon").attr("src", "img/uncheck.svg");
        }
    });


});
$(document).ready(function () {
    //swipe card
    // if (window.matchMedia("(max-width: 767px)").matches) {
    //     $(".card-content").swipe({
    //         swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
    //             $(this).toggleClass('active');
    //         }
    //     });
    // }

});
$(document).ready(function () {
    $(".admin-date").datepicker({
        dateFormat: 'dd/mm',
        changeDay: true,
    });
});
