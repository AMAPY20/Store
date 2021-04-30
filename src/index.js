import "@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css";
import "./css/style.css";
import 'bootstrap';
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/js/all";

$(document).ready(function(){
    $("[data-toggle='tooltip']").tooltip();

    $(".add-to-cart-btn").click(function () {
        alert('أضيف المنتج الى عربة الشراء');
    });

    $("#copyright").text(" جميع الحقوق محفوظة للمتجر لسنة " + new Date().getFullYear());

});