function dragEnd(e){
  atualizaLocalizacaoCard()
  e.removeClass('dragging');
  atualizaOrder()
  atualizaColuna(e.parents('.column'))
}

function dragstart(e) {
  e.addClass('dragging');
}

function atualizaLocalizacaoCard(){
  const columns = document.querySelectorAll(".column");
  columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
      const drag = document.querySelector(".dragging");
      const applyAfter = getNewPosition(item, e.clientY);
      if (applyAfter) {
        applyAfter.insertAdjacentElement("afterend", drag);
      } else {
        item.prepend(drag);
      }
    });
  });
}

function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".item:not(.dragging)");
  let result;

  for (let refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) result = refer_card;
  }

  return result;
}

$.getJSON(`http://127.0.0.1:8080/listarTudo`, function(data){
  data.forEach(function(coluna){
    render(coluna)
  })
  addNovaColunaButton()
})

//Atualiza colunaId de todos os itens quando um quadro é movido
function atualizaColuna(coluna){
  const collumId = parseInt(coluna.attr('id'))
  coluna.find('.item').each(function() {
    const cardId = parseInt($(this).attr('card-id'))
    const order = parseInt($(this).attr('order'))
    let ajaxResponse = $.ajax({
      type: "post",
      url: "http://127.0.0.1:8080/atualizaCard",
      contentType: "application/json",
      data: JSON.stringify( {
        id: cardId,
        colunaId: collumId,
        order: order
      })
    })
    ajaxResponse.then((data) => {
    })
  })
}

function atualizaOrder() {
  let order = 0;
  $(document).find('.column').each(function() {
    order = 0;
    $(this).find('.item').each(function() {
      $(this).attr('order', order)
      order++;
    })
  })
}

$(document).on('click', '#novaColuna', function() {
  $(this).parents('.add-column-container').remove()
  $('.kanban').append(`
  <div class="column-container" id="sendoCriado">
    <div id="nova-coluna-container">
      <input style="max-width: 60%" id="novaColunaNome"></input>
      <button id="salvaNovaColunaBanco">Salvar</button>
    </div>
  </div>`)
})

$(document).on('click', '#salvaNovaColunaBanco', salvaNovaColunaBanco)

function addNovaColunaButton() {
  $('.kanban').append(`
    <div class="add-column-container" style="float: right;">
      <button id="novaColuna">Nova coluna</button>
    </div>
  `)
}

function salvaNovaColunaBanco() {
  const input = $(document).find('#novaColunaNome');
  if(input?.[0] !== undefined && input.val() != "") {
    let ajaxResponse = $.ajax({
      type: "post",
      url: "http://127.0.0.1:8080/createColuna",
      contentType: "application/json",
      data: JSON.stringify( {
        titulo: input.val()
      } )
    })
    ajaxResponse.then((data) => {
      $(document).find('#sendoCriado').remove();
      render(data)
      addNovaColunaButton()
    })
  }
}

//Render das colunas e cards
function render(coluna){
  $('.kanban').append(`
    <div class="column-container" coluna-id="${coluna.id}">
      <div class="coluna-title" style="background: white; border-radius: 5px; text-align: center;"><h3>${coluna.titulo}</h3></div>
      <button class="novoCard">NovoCard</button>
      <div class="column" id="${coluna.id}">
      </div>
    </div>
  `)
  if(coluna.cards[0] !== undefined){
    coluna.cards.forEach(function(card){
      renderCard(card, coluna.id)
    })
  }
}
//render especifico dos cards
function renderCard(card, colunaId) {
  $(document).find(`#${colunaId}`).append(`
    <div ondragend="dragEnd($(this))" ondragstart="dragstart($(this))" class="item" order="${card?.order || null}" card-id="${card.id}" colunaId="${colunaId}" draggable="true">${card.tarefa}</div>
  `)
}

//Adiciona novo card ao apertar no botão
$(document).on('click', '.novoCard', () => {
  const column = $(this).parents('.column-container').find('.column');
  column.append(`<div class="item" id="sendoCriado" colunaId="${column.attr('id')}" draggable="true"><input id="criandoCard"></input></div>`)
})
//Salva card ao apertar enter
$(document).on('keypress','#criandoCard', function(e) {
  const colunaId = parseInt($(this).parents('.column-container').find('.column').attr('id'));
  if(e.which == 13 && $(this).val() != "") {
    if($(this)?.[0] !== undefined && $(this).val() != "") {
      let ajaxResponse = $.ajax({
        type: "post",
        url: "http://127.0.0.1:8080/createCard",
        contentType: "application/json",
        data: JSON.stringify( {
          tarefa: $(this).val(),
          colunaId: colunaId
        })
      })
      ajaxResponse.then((data) => {
        $(document).find('#sendoCriado').remove();
        renderCard(data, colunaId)
      })
    }
  }
})