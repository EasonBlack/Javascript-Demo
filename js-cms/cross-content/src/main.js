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

    for(var i=1;i<=10;i++) {
       var _id;
       direction == 'x' ? _id = '.' + _p_y + '-' + (parseInt(_p_x) + i) :  _id = '.' + (parseInt(_p_y) + i) + '-' + _p_x;
        if($(_id).length) {
            deleteBox(_id, _top, _left);
        } else {
            break;
        }
    }
}

function deleteBox(id, top, left) {
    var _target = $(id);
    _target.css('z-index', 1);
    _target.animate({top: top, left: left}, 1000, function () {
        $(this).remove();
    })
}

function setPositions(father, boxes, direction) {
    var _position = $(father).data('position');
    var _top = parseInt($(father).css('top'));
    var _left = parseInt($(father).css('left'));
    var _p_y = _position.split('-')[0];
    var _p_x = _position.split('-')[1];

    for (var i = 1; i <= 10; i++) {
        var _id;
        direction == 'x'? _id ='.' + _p_y + '-' + (parseInt(_p_x) + i) :  '.' + (parseInt(_p_y) + i) + '-' + _p_x;
        $(_id).remove();
    }
    for(var i = 0;i<boxes.length;i++){
        var _position, __top, __left;
        var _d = boxes[i];
        _d.left =  _left;
        _d.top = _top;
        if(direction =='x') {
            _d.position = _p_y + '-' + (parseInt(_p_x) + i + 1);
            __left = _left + (i + 1) * (width + step);
            __top = _top;
        } else {    //y
            _d.position = (parseInt(_p_y) + i + 1) + '-' + _p_x;
            __left = _left;
            __top = _top + (i + 1) * (height + step);
        }
        addBox(_d, __top, __left);
    }
}

const addBox = (_d, top, left) => {
    boxTemplate(_d, function (err, out) {
        var $out = $(out);
        $out.css('z-index', 1);
        $('#container').append(out);
        $('.' + _d.position).animate({top: top, left: left}, 1000)
    });
}

