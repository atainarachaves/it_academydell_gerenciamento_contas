const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const nameAccount = document.querySelector('#m-name')
const agency = document.querySelector('#m-agency')
const numberAccount = document.querySelector('#m-numberAccount')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModalAddAccount(edit = false, index = 0) {
  modal.classList.add('active')
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }
  if (edit) {
    nameAccount.value = itens[index].name
    agency.value = itens[index].agency
    numberAccount.value = itens[index].accountNumber
    id = index
    itens[index].balance = 0
  } else {
    nameAccount.value = ''
    agency.value = ''
    numberAccount.value = ''
  }
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}


function insertItem(item, index) {
  let ul = document.createElement('ul');
  ul.innerHTML = `
    <div class="list-tile">
      <div class="content">
        <h4>${item.name}</h4>
        <h4>Saldo: R$ ${item.balance}</h4>
        <p>Agencia: ${item.agency} Conta: ${item.accountNumber} </p>
      </div>
      <div class="dropdown" id="dropdown${index}">
        <img src="icons/three_dots.svg" alt="Icon Dots" onclick="toggleDropdown(${index})">
        <div class="dropdown-content">
          <a href="#" onclick="opcaoClicada(1, ${index})">Opção 1
          <i class = "bx bx-chevron-right"></i>
          </a>
          <a href="#" onclick="opcaoClicada(2, ${index})">Opção 2</a>
          <a href="#" onclick="opcaoClicada(3, ${index})">Opção 3</a>
        </div>
      </div>
    </div>`;

  tbody.appendChild(ul)
}


document.addEventListener("click", function(event) {
  var dropdowns = document.querySelectorAll(".dropdown");

  for (var i = 0; i < dropdowns.length; i++) {
    var dropdown = dropdowns[i];

    if (!event.target.closest(`#dropdown${i}`) && dropdown.classList.contains("active")) {
      dropdown.classList.remove("active");
    }
  }
});

function toggleDropdown(index) {
  var dropdown = document.getElementById(`dropdown${index}`);
  dropdown.classList.toggle("active");
}

function opcaoClicada(opcao, index) {
  if(opcao === 1){
    openModalNewTransaction(false, index)
  }else if(opcao === 2){
    deleteItem(index)
  }
}

/* <div class="icon">
<img src="icons/three_dots.svg" alt="Icon Dots" onclick="mostrarPopup()">
<div class="popup" id="popup">
  <ul class="popUpOptions">
    <i class = "bx bx-chevron-right"></i>
    <li class="popUpOptions" onclick="suaFuncao1()>
      <span class="option-text">Incluir transação</span>
      <i class = "bx bx-chevron-right"></i>
    </li>
    <li class="popUpOptions" onclick="deleteItem(${index})>
    <span class="option-text">Excluir conta</span>
    <img src="icons/trash.svg" alt="Excluir icone" onclick="deleteItem(${index})">
  </li>
  </ul>
  <button onclick="fecharPopup()">Cancelar</button>
</div>
</div> */

btnSalvar.onclick = e => {

  if (nameAccount.value == '' || agency.value == '' || numberAccount.value == '') {
    return
  }
  e.preventDefault();
  if (id !== undefined) {
    itens[id].name = nameAccount.value
    itens[id].agency = agency.value
    itens[id].accountNumber = numberAccount.value
  } else {
    itens.push({ 'name': nameAccount.value, 'agency': agency.value, 'accountNumber': numberAccount.value, 'balance': 0, 'transactions': [] })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

