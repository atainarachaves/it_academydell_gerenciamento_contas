const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");


function loadItens() {
    items = getItensBD();
    tbody.innerHTML = "";
    items.forEach((item, index) => {
      insertItem(item, index);
    });
  
    getTotals();
  }
  

function getTotals() {
    const amountIncomes = items
      .filter((item) => item.type === "Entrada")
      .map((transaction) => Number(transaction.amount));
  
    const amountExpenses = items
      .filter((item) => item.type === "Saída")
      .map((transaction) => Number(transaction.amount));
  
    const totalIncomes = amountIncomes
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);
  
    const totalExpenses = Math.abs(
      amountExpenses.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);
  
    const totalItems = (totalIncomes - totalExpenses).toFixed(2);
  
    incomes.innerHTML = totalIncomes;
    expenses.innerHTML = totalExpenses;
    total.innerHTML = totalItems;
  }

  const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];