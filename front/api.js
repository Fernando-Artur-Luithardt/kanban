const apiRoute = 'http://127.0.0.1:8080';
function deleteColuna(id) {
    return new Promise((res, rej) => {
        $.ajax({
            url: `${apiRoute}/deletarColuna/${id}`,
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
        let ajaxResponse = $.ajax({
            type: "post",
            url: `${apiRoute + route}`,
            contentType: "application/json",
            data: JSON.stringify( dataJson )
        })
        ajaxResponse.success((data) => {
            res(data)
        })
        ajaxResponse.error((data) => {
            rej(false)
        })
    })
}

function listarTudoBanco() {
    return new Promise((res, rej) => {
        $.getJSON(`${apiRoute}/listarTudo`, function(data){
            res(data)
        }).fail(function() { rej(false); })
    })
}