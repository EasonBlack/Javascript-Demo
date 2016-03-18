import Box from './box.js';
import $ from 'jquery';
import page1Template from '../template/temp1.dust';

$('#container1').html('sssss');
$('#container2').html( 'Good point: ' + new Box(1, 23).toString());

page1Template({test: 'good3'},function(err,out){
    $('#container3').html(out);
});
