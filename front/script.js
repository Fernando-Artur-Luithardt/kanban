//FUNCIONALIDADE DRAG N DROP KANBAN
//AO FINALIZA DRAG CHAMA FUNÇÕES PARA ATUALIZAR ORDER DOS CARDS E SALVAR NO BANCO DE DADOS
function dragEnd(e){
  //REMOVE CLASSE QUE DA EFEITO DE TRANSPARÊNCIA
  e.removeClass('dragging');
  atualizaOrder()
  atualizaColunaIdCard(e.parents('.column'))
}

function dragstart(e) {
  e.addClass('dragging');
  atualizaLocalizacaoCard()
}

//MOSTRA O CARD ONDE VAI ACONTECER O APEND
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

//FUNCIONALIDADES BANCO, CRIAR, DELETAR, ATULIZAR ORDER BANCO DE DADOS
async function listarTudo() {
  const data = await listarTudoBanco()
  if(data.length == 0)
    addNovaColunaButton();
  data.forEach(function(coluna){
    render(coluna)
  })
  atualizaLocalizacaoCard()
  addNovaColunaButton()
}
listarTudo()

//ATUALIZA COLUNAID E ORDER QUANDO UM CARD É MOVIDO
function atualizaColunaIdCard(coluna){
  const collumId = parseInt(coluna.attr('id'))
  coluna.find('.item').each(async function() {
    const cardId = parseInt($(this).attr('card-id'))
    const order = parseInt($(this).attr('order'))
    const data = await apiPost('/atualizaCard', {id: cardId, collumId: collumId, order: order})
  })
}

//ATUALIZA ORDER DOS CARDS NO FRONT PARA QUE SEJA ATUALIZADA NO BACK-END
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

//ADICIONA COLUNA COM INPUT PARA CRIAÇÃO
$(document).on('click', '#novaColuna', function() {
  $(this).parents('.add-column-container').remove()
  $('.kanban').append(`
    <div class="column-container" id="sendoCriado">
      <input type="text" style="" id="novaColunaNome"></input>
    </div>
  `)
  $(document).find('#novaColunaNome').focus()
})

$(document).on('keypress', '#novaColunaNome', (e) => {salvaNovaColunaBanco(e.which)})

//ADICIONA COLUNA COM BOTÃO DE ADICIONAR NOVA
function addNovaColunaButton() {
  $(document).find('.add-column-container').remove()
  $('.kanban').append(`
    <div class="add-column-container" style="float: right;">
      <button type="button" id="novaColuna">Nova coluna</button>
    </div>
  `)
}

//SALVA NOVA COLUNA NO BANCO
async function salvaNovaColunaBanco(key) {
  const input = $(document).find('#novaColunaNome');
  const titulo = input.val();
  if(input?.[0] !== undefined && titulo != "" && key == 13) {
    const data = await apiPost('/createColuna', {titulo: titulo})
    if(data) {
      $(document).find('#sendoCriado').remove();
      render(data)
      addNovaColunaButton()
    }
  }
}

//FUNÇÃO RENDER COLUNA E CARD
function render(coluna){
  $('.kanban').append(`
    <div class="column-container" coluna-id="${coluna.id}">
      <div class="coluna-title" style="background: white; border-radius: 5px; text-align: center;"><h3>${coluna.titulo}</h3></div>
      <button type="button" class="novoCard">NovoCard</button>
      <div class="column" id="${coluna.id}">
      </div>
      <button type="button" class="deleteColuna">Deletar</button>
    </div>
  `)
  if(coluna.cards[0] !== undefined){
    coluna.cards.forEach(function(card){
      renderCard(card, coluna.id)
    })
  }
}
//RENDER ESPECIFICO CARD
function renderCard(card, colunaId) {
  $(document).find(`#${colunaId}`).append(`
    <div ondragend="dragEnd($(this))" ondragstart="dragstart($(this))" class="item" order="${card?.order || null}" card-id="${card.id}" colunaId="${colunaId}" draggable="true">${card.tarefa}</div>
  `)
}

//ADICIONA NOVO CARD COM INPUT PARA SER CRIADO
$(document).on('click', '.novoCard', function() {
  const column = $(this).parents('.column-container').find('.column');
  column.append(`<div class="item" id="sendoCriado" colunaId="${column.attr('id')}" draggable="true"><input type="text" id="criandoCard"></input></div>`)
  $(document).find('#criandoCard').focus()
})

//SALVA O CARD QUE ESTÁ SENDO CRIADO
$(document).on('keypress','#criandoCard', async function(e) {
  const colunaId = parseInt($(this).parents('.column-container').find('.column').attr('id'));
  const text = $(this).val()
  if(e.which == 13 && text != "") {
    if($(this)?.[0] !== undefined && text != "") {
      const data = await apiPost('/createCard', {tarefa: text, colunaId: colunaId})
      if(data) {
        $(document).find('#sendoCriado').remove();
        renderCard(data, colunaId)
      }
    }
  }
})

//DELETE COLUNA
$(document).on('click', '.deleteColuna', async function(){
  let coluna = $(this).parents('.column-container');
  let id = parseFloat(coluna.attr('coluna-id'));
  if(await deleteColuna(id))
    coluna.remove();
})