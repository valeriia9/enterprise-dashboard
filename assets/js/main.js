(function($) {
    "use strict";

    $(document).ready(function($) {

        $("#menu-tigger").on('click', function() {
            $('.sidebar').slideToggle();
        });

        $('[data-toggle="popover"]').popover({
            trigger: 'hover'
        });

        $("#password-tigger").click(function() {
            if ($("#password").attr("type") === "password") {
                $("#password").attr("type", "text");
                $(this).addClass('show');
            } else {
                $("#password").attr("type", "password");
                $(this).removeClass('show');
            }
            return false;
        });

        $('#grap-range').daterangepicker({
            "autoApply": true,
            "showDropdowns": true,
            "opens": "right"
        });

        $('.datatable-box').each(function() {
            var scrollPane = $(this).jScrollPane();
            var api = scrollPane.data('jsp');
            scrollPane.bind(
                'mousewheel',
                function(event, delta, deltaX, deltaY) {
                    api.scrollByX(delta * -50);
                    return false;
                }
            );
        });
        $(window).resize(function() {
            $('.datatable-box').jScrollPane({
                autoReinitialise: true
            });
        });

        $('.table-tooltip').tooltip({
            customClass: 'tooltip-custom'
        });

    });

}(jQuery));

;
(function($) {

    if (typeof $.fn.tooltip.Constructor === 'undefined') {
        throw new Error('Bootstrap Tooltip must be included first!');
    }

    var Tooltip = $.fn.tooltip.Constructor;
    $.extend(Tooltip.Default, {
        customClass: ''
    });

    var _show = Tooltip.prototype.show;

    Tooltip.prototype.show = function() {
        _show.apply(this, Array.prototype.slice.apply(arguments));
        if (this.config.customClass) {
            var tip = this.getTipElement();
            $(tip).addClass(this.config.customClass);
        }

    };

})(window.jQuery);