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

function criandoCard(id, colunaId) {
    return new Promise((res, rej) => {
        let ajaxResponse = $.ajax({
        type: "post",
        url: `${apiRoute}/createCard`,
        contentType: "application/json",
        data: JSON.stringify( {
            tarefa: id,
            colunaId: colunaId
            })
        })
        ajaxResponse.success((data) => {
            res(data)
        })
        ajaxResponse.error((data) => {
            rej(false)
        })
    })
}

function createColuna(titulo) {
    return new Promise((res, rej) => {
        let ajaxResponse = $.ajax({
            type: "post",
            url: `${apiRoute}/createColuna`,
            contentType: "application/json",
            data: JSON.stringify( {
              titulo: titulo
            })
        })
        ajaxResponse.success((data) => {
            res(data)
        })
        ajaxResponse.error((data) => {
            rej(false)
        })
    })
}

function atualizaColunaIdCardBanco(cardId, collumId, order) {
    return new Promise((res, rej) => {
        let ajaxResponse = $.ajax({
            type: "post",
            url: `${apiRoute}/atualizaCard`,
            contentType: "application/json",
            data: JSON.stringify( {
              id: cardId,
              colunaId: collumId,
              order: order
            })
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