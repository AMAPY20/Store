import "@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css";
import "./css/style.css";
import 'bootstrap';
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/js/all";

$(function () {
    $("[data-toggle='tooltip']").tooltip();

    $(".add-to-cart-btn").on("click", function () {
        alert("أضيف المنتج الى عربة الشراء");
    });

    $("#copyright").text(
        " جميع الحقوق محفوظة للمتجر لسنة " + new Date().getFullYear()
    );

    $('.product-option input[type="radio"]').on("change", function () {
        $(this).parents(".product-option").siblings().removeClass("active");
        $(this).parents(".product-option").addClass("active");
    });

    // عندما تتغير كمية المنتج
    $("[data-product-quantity]").on("change", function () {
        // اجلب الكمية الجديدة
        let newQuantity = $(this).val();

        // ابحث عن السّطر الّذي يحتوي معلومات هذا المُنتج
        let $parent = $(this).parents("[data-product-info]");

        // اجلب سعر القطعة الواحدة من معلومات المنتج
        let pricePerUnit = $parent.attr("data-product-price");

        // السعر الإجمالي للمنتج هو سعر القطعة مضروبًا بعددها
        let totalPriceForProduct = newQuantity * pricePerUnit;

        // عين السعر الجديد ضمن خليّة السّعر الإجمالي للمنتج في هذا السطر
        $parent.find(".total-price-for-product").text(totalPriceForProduct + "$");

        // حدث السعر الإجمالي لكل المُنتجات
        calculateTotalPrice();
    });


    $("[data-remove-from-cart]").on("click", function () {
        $(this).parents('[data-product-info]').remove();
        // اعد حساب السعر الاجمالي بعد حذف احد المنتجات
        calculateTotalPrice();
    });

    function calculateTotalPrice() {
        // أنشئ متغيّرًا جديدًا لحفظ السعر الإجمالي
        let totalPriceForAllProducts = 0;

        // لكل سطر يمثل معلومات المُنتج في الصّفحة
        $("[data-product-info]").each(function () {
        // اجلب سعر القطعة الواحدة من الخاصّية الموافقة
        let pricePerUnit = $(this).attr("data-product-price");

        // اجلب كمية المنتج من حقل اختيار الكمية
        let quantity = $(this).find("[data-product-quantity]").val();

        let totalPriceForProduct = pricePerUnit * quantity;

        // أضف السعر الإجمالي لهذا المنتج إلى السعر الإجمالي لكل المُنتجات، واحفظ القيمة في المتغير نفسه
        totalPriceForAllProducts =
            totalPriceForAllProducts + totalPriceForProduct;
        });

        // حدث السعر الإجمالي لكل المُنتجات في الصفحة
        $("#total-price-for-all-products").text(totalPriceForAllProducts + "$");
    }

    let citiesByCountry = {
        sa: ['جدة', 'الرياض'],
        sy: ['حماه', 'حلب', 'دمشق'],
        eg: ['الإسكندرية', 'القاهرة'],
        jo: ['الزرقاء', 'عمان'],
        lb: ['طرابلس', 'بيروت']
    };

        // عندما يتغير البلد
    $('#form-checkout select[name="country"]').on("change", function () {
        let country = $(this).val();

        // اجلب مدن هذا البلد من المصفوفة
        let cities = citiesByCountry[country];

        // فرغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();
        
        // إضافة خيار اختار مدينة
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );
        // اضف المدن الى قائمة المدن
        cities.forEach(function (city) {
            let newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        })
    });

        // عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment_method"]').on( "change",function() {

        // اجلب القيمة المُختارة حاليًا
        let paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivery') {

        // إذا كانت عند الاستلام، فعطّل حقول بطاقة الائتمان
        $('#credit-card-info input').prop('disabled', true);

        } else {

        // وإلا ففعلّها
        $('#credit-card-info input').prop('disabled', false);
        }
    
        // بدل معلومات بطاقة الائتمان بين الظهور والإخفاء
        $('#credit-card-info').toggle();
    });
});
