/**
 * Created by eason on 2016/1/8.
 */


(function ($, window, undefined) {

    var Plugin = function (element) {
        this.element = element;
        this.dragObject = {};
        this.startY = 0;
        this.prevY = 0;
        this.build(element);
    }

    Plugin.prototype = {

        build: function (element) {
            var self = this;
            $(self.element.rows).each(function () {
                $(this).bind('mousedown', function (e) {
                    if (e.target.tagName == "TD") {
                        self.dragObject = $(this);
                        self.startY = e.pageY - this.offsetTop;

                        $(document)
                            .on('mousemove', $.proxy(self.fn_mousemove, self))
                            .on('mouseup', $.proxy(self.fn_mouseup, self));
                        return false;
                    }
                }).css("cursor", "move");
            });
        },

        fn_mousemove: function (e) {
            var self = this;
            e.preventDefault();
            self.dragObject.addClass('drag-style');
            var y = e.pageY - self.startY;
            var currentRow;
            var rowHeight = 0, row = null,
                rows = self.element.rows;
            for (var i = 0; i < rows.length; i++) {
                row = rows[i];
                rowHeight = row.offsetHeight / 2;
                if (y > (row.offsetTop - rowHeight ) && y < (row.offsetTop + rowHeight)) {
                    if (self.dragObject.is(row)) {
                        return
                    } else {
                        currentRow = row;
                    }
                    break;
                }
            }

            //方向
            var _direction = y > self.prevY ? 1 : -1;
            if (_direction) {
                self.prevY = y;
            }
            if (currentRow) {
                if (_direction > 0) {     //down
                    self.dragObject[0].parentNode.insertBefore(self.dragObject[0], currentRow.nextSibling)
                } else {   //up
                    self.dragObject[0].parentNode.insertBefore(self.dragObject[0], currentRow)
                }
            }
        },

        fn_mouseup: function (e) {
            var self = this;
            e.preventDefault();
            $(document)
                .unbind('mousemove')
                .unbind('mouseup');
            self.dragObject.removeClass('drag-style');
        }
    }

    $.fn.rowDragable = function () {

        return this.each(function () {

            if (!$.data(this, 'plugin_drag')) {
                $.data(this, 'plugin_drag',
                    new Plugin(this));
            }
        });
    }

})(jQuery, window)