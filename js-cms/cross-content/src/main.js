import $ from 'jquery';
import _ from 'lodash';
import Box from './box.js';
import boxTemplate from '../template/box.dust';

let self = {};

$.get('data/boxes.json')
    .done(function (data) {
        self.source = data;
        var _d = data[0];
        console.log(data);
        boxTemplate(_d, function (err, out) {
            $('#container').append(out)
        });
    });


$('#container').on('click', '.plus-minus', function (e) {
    $(e.target).toggleClass('active');
});

$('#container').on('click', '.card-lead .plus-minus', function (e) {
    alert(1);
});


$('#container').on('click', '.card-content', function (e) {
    $(e.target).toggleClass('card-omission');
    $(e.target).toggleClass('card-scroll');
    $(e.target).animate({scrollTop: 0}, "fast");
});

function getArrayData(arr) {
    return _.filter(self.source, function (d) {
        return arr.indexOf(d.id) > -1;
    })
}
