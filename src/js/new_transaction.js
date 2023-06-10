const modalNewTransaction = document.querySelector('.modal-new-transaction')
const btnSaveTransaction = document.querySelector('#btnSaveTransaction')
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");

let itemTransaction = [];
let idNewTransaction
let indexTransaction

function openModalNewTransaction(edit = false, index = 0) {
    modalNewTransaction.classList.add('active')
    modalNewTransaction.onclick = e => {
      if (e.target.className.indexOf('modal-new-transaction') !== -1) {
        modalNewTransaction.classList.remove('active')
      }
    }
    indexTransaction = index;
  }
  
btnSaveTransaction.onclick = () => {
    if (descItem.value === "" || amount.value === "" || type.value === "") {
        
      return alert("Preencha todos os campos!");
    }
    itemTransaction.push({
      descItem: descItem.value,
      amount: Math.abs(amount.value).toFixed(2),
      type: type.value,
    });
  
    setNewTransaction();
  
    // getTotals();
    
    descItem.value = "";
    amount.value = "";
    
  };

  
//   const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
//   const setNewTransaction = () =>
//     localStorage.setItem("dbfunc", JSON.stringify(items));
  
const setNewTransaction = () => {
    // Recupera o banco de dados do localStorage
    const dbTrasaction = JSON.parse(localStorage.getItem("dbfunc"));
    
    // Acessa a chave "transactions" e faz alguma modificação
    dbTrasaction[indexTransaction].transactions.push({ itemTransaction });
    console.log("Apos inserir");
    console.log(dbTrasaction);
    // Salva o banco de dados atualizado no localStorage
    localStorage.setItem("dbfunc", JSON.stringify(dbTrasaction));

    console.log("vim ate aqui 333");
};