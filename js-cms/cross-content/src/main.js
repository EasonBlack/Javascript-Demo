import $ from 'jquery';
import _ from 'lodash';
import Box from './box.js';
import boxTemplate from '../template/box.dust';

let self = {};
let width = 200;
let height = 300;
let step = 10;

$.get('data/boxes.json')
    .done(function (data) {
        self.source = data;
        var _d = data[0];
        setFirstBox(_d);
    });

$('#container').on('click', '.plus-minus', function (e) {
    $(e.target).toggleClass('active');
});

$('#container').on('click', '.card-lead .plus-minus', function (e) {
    var _ids = $(this).data('ids');
    if ($(this).hasClass('active')) {
        var _boxes = getArrayData(_ids);
        setPositions($(this).parents(".card-wrapper"), _boxes, 'y');
    } else {
        deletePositions($(this).parents(".card-wrapper"), 'y');
    }
});

$('#container').on('click', '.card-relate .plus-minus', function (e) {
    var _ids = $(this).data('ids');
    if ($(this).hasClass('active')) {
        var _boxes = getArrayData(_ids);
        setPositions($(this).parents(".card-wrapper"), _boxes, 'x');
    } else {
        deletePositions($(this).parents(".card-wrapper"), 'x');
    }
});

$('#container').on('click', '.card-content', function (e) {
    $(e.target).toggleClass('card-omission');
    $(e.target).toggleClass('card-scroll');
    $(e.target).animate({scrollTop: 0}, "fast");
});

function getArrayData(arr) {
    var _arr = ('' + arr).split(',');
    return _.filter(self.source, function (d) {
        return _arr.indexOf(d.id) > -1;
    })
}

function setFirstBox(d) {
    d.position = '1-1';
    d.left = 10;
    d.top = 10;
    boxTemplate(d, function (err, out) {
        $('#container').append(out)
    });
}

function deletePositions(father, direction) {
    var _position = $(father).data('position');
    var _top = parseInt($(father).css('top'));
    var _left = parseInt($(father).css('left'));
    var _p_y = _position.split('-')[0];
    var _p_x = _position.split('-')[1];
    if (direction == 'x') {
        for (var i = 1; i <= 10; i++) {
            if ($('.' + _p_y + '-' + (parseInt(_p_x) + i)).length) {
                var _target = $('.' + _p_y + '-' + (parseInt(_p_x) + i));
                _target.animate({top: _top, left: _left}, 1000, function () {
                    $(this).remove();
                })
            } else {
                break;
            }
        }
    } else if (direction == 'y') {
        for (var i = 1; i <= 10; i++) {
            if ($('.' + (parseInt(_p_y) + i) + '-' + _p_x).length) {
                var _target = $('.' + (parseInt(_p_y) + i) + '-' + _p_x);
                _target.animate({top: _top, left: _left}, 1000, function () {
                    $(this).remove();
                })
            } else {
                break;
            }
        }
    }
}

function setPositions(father, boxes, direction) {
    var _position = $(father).data('position');
    var _top = parseInt($(father).css('top'));
    var _left = parseInt($(father).css('left'));
    var _p_y = _position.split('-')[0];
    var _p_x = _position.split('-')[1];
    if (direction == 'x') {
        for (var i = 1; i <= 10; i++) {
            $('.' + _p_y + '-' + (parseInt(_p_x) + i)).remove();
        }
        for (var i = 0; i < boxes.length; i++) {
            var _d = boxes[i];
            _d.position = _p_y + '-' + (parseInt(_p_x) + i + 1);
            _d.left = _left;// + (i + 1) * (width + step);
            _d.top = _top;
            boxTemplate(_d, function (err, out) {
                $('#container').append(out);
                $('.' + _d.position).animate({top: _top, left: _left + (i + 1) * (width + step)}, 1000)
            });
        }
    } else if (direction == 'y') {
        for (var i = 1; i <= 10; i++) {
            $('.' + (parseInt(_p_y) + i) + '-' + _p_x).remove();
        }
        for (var i = 0; i < boxes.length; i++) {
            var _d = boxes[i];
            _d.position = (parseInt(_p_y) + i + 1) + '-' + _p_x;
            _d.left = _left;
            _d.top = _top;// + (i + 1) * (height + step);
            boxTemplate(_d, function (err, out) {
                $('#container').append(out);
                $('.' + _d.position).animate({top: _top + (i + 1) * (height + step), left: _left}, 1000)
            });
        }
    }
}
