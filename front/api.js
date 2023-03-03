const apiRoute = 'http://127.0.0.1:8080';
function deleteBanco(route, id) {
    return new Promise((res, rej) => {
        $.ajax({
            url: `${apiRoute}/${route}/${id}`,
            type: 'DELETE',
            success: function() {
                res(true);
            },
            error: function() {
                rej(false);
            }
        });
    })
}

function apiPost(route, dataJson) {
    return new Promise((res, rej) => {
        $.ajax({
            type: "post",
            url: `${apiRoute + route}`,
            contentType: "application/json",
            data: JSON.stringify( dataJson ),
            success: function(data){
                res(data)
            },
            error: function(){
                rej(false)
            }
        })
    })
}

function listarTudo() {
    return new Promise((res, rej) => {
        $.getJSON(`${apiRoute}/listarTudo`, function(data){
            res(data)
        }).fail(function() { rej(false); })
    })
}