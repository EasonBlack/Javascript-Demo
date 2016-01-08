/**
 * Created by eason on 2016/1/8.
 */


(function ($, window, undefined) {

    $.fn.rowDragable = function() {
        var table = this[0];
        var dragObject, startY, prevY =0;

        function fn_mousemove(e) {
            e.preventDefault();
            dragObject.addClass('drag-style');
            var y = e.pageY - startY;
            var currentRow ;
            var rowHeight = 0, row = null,
                rows = table.rows;
            for (var i = 0; i < rows.length; i++) {
                row = rows[i];
                rowHeight = row.offsetHeight / 2;
                if (y > (row.offsetTop - rowHeight ) && y < (row.offsetTop + rowHeight)) {
                    if (dragObject.is(row)) {
                        return
                    } else {
                        currentRow =  row;
                    }
                    break;
                }
            }

            //方向
            var _direction =   y > prevY ? 1 : -1;
            if(_direction) {
                prevY = y;
            }
            if(currentRow ) {
                if(_direction > 0) {     //down
                    dragObject[0].parentNode.insertBefore(dragObject[0], currentRow.nextSibling)
                } else {   //up
                    dragObject[0].parentNode.insertBefore(dragObject[0], currentRow)
                }
            }
        }

        function fn_mouseup(e) {
            e.preventDefault();
            $(document)
                .unbind('mousemove')
                .unbind('mouseup');
            dragObject.removeClass('drag-style');
        }

        $(table.rows).each(function () {
            $(this).bind('mousedown', function (e) {
                if (e.target.tagName == "TD") {
                    dragObject = $(this);
                    startY = e.pageY - this.offsetTop;

                    $(document)
                        .bind('mousemove', fn_mousemove)
                        .bind('mouseup', fn_mouseup);
                    return false;
                }
            }).css("cursor", "move");
        });


    }




})(jQuery, window)