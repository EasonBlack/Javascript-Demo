document.getElementById('target').innerHTML = "Hello Wordl";

setTimeout(function(){
    document.getElementById('target2').innerHTML = "cccccc";
}, 3000)


if ('caches' in window) {
    caches.match('data.json').then(function(response) {
        if (response) {
            response.json().then(function (json) {
                $('#dv').html('');
                json.forEach((d)=>{
                    $('#dv').append(`<div>${d.name}</div>`)
                })
            });
        }
    });
}
$.getJSON('data.json',function(data){
    $('#dv').html('');
    data.forEach((d)=>{
        $('#dv').append(`<div>${d.name}</div>`)
    })
})

