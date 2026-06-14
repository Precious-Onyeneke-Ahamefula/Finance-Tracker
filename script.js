// Object containing budget categories and their initial budgets
const categoryWiseBudget = {
    Groceries: 20000,
    Entertainment: 5000,
    Rent: 20000,
    Utilities: 5000,
    Health: 20000,
    Education: 15000,
    Misc: 5000
};

let latestIncome = 0
let balanceAmt = 0
let allExpenses = 0
let allTransactions = []
let categoryWiseExpenses = {}

function initialise(){
    setIncome(latestIncome)
    setBalance(balanceAmt)

    let income = document.getElementById("income")
    income.oninput = updateIncomeAndBalance

    initialiseExpenseCategory()
    initialiseBudgetSummary()

    let addButton = document.getElementById("add-transaction-btn")
    addButton.onclick = manageTransactionAndSummary

    setCategoryWiseExpenses()

}

function setCategoryWiseExpenses() {
    categoryWiseExpenses = {...categoryWiseBudget}
    for (category in categoryWiseExpenses) {
        categoryWiseExpenses[category] = 0
    }
}

function setIncome(latestIncome) {
    let totalIncome = document.getElementById("total-income")
    totalIncome.innerHTML = `<b>Total Income : ${latestIncome}</b>`
}

function setBalance(balanceAmt) {
    let balance = document.getElementById("balance")
    if(balanceAmt > 0) {
        balance.style.color = "black"
    } 
    else{
        balance.style.color = "red"
    }
    balance.innerHTML = `<b>Balance : ${balanceAmt}</b>`
}

function updateIncomeAndBalance(event) {
    latestIncome = event.target.value
    setIncome(latestIncome)
    balanceAmt = latestIncome - allExpenses
    setBalance(balanceAmt)
}

function initialiseExpenseCategory() {
    let category = document.getElementById("category")
    let htmlText = `<option disabled selected> Select Expense Category</option>`
    for (let cat in categoryWiseBudget) {
        htmlText += `<option value=${cat}>${cat}</option>`
    }
    category.innerHTML = htmlText
}

function initialiseBudgetSummary() {
    let budgetSummary = document.getElementById("budget-summary")
    let htmlText = ''
    for (let category in categoryWiseBudget) {
        htmlText += 
        `<ul><b>${category}</b>
        <li>Budget : ${categoryWiseBudget[category]}</li>
        <li>Expenses: 0</li>
        <li>Balance: ${categoryWiseBudget[category]}</li>
        </ul>`
    }
    budgetSummary.innerHTML = htmlText
}

function updateBudgetSummary() {
    let budgetSummary = document.getElementById("budget-summary")
    let htmlText = ''
    for (let category in categoryWiseBudget) {
        let balance = categoryWiseBudget[category] - categoryWiseExpenses[category]
        htmlText += 
        `<ul><b>${category}</b>
        <li>Budget : ${categoryWiseBudget[category]}</li>
        <li>Expenses: ${categoryWiseExpenses[category]}</li>
        <li>Balance: ${balance}</li>
        </ul>`
    }
    budgetSummary.innerHTML = htmlText

}

function manageTransactionAndSummary() {
    let category = document.getElementById("category")
    let categoryValue = category.value
    if (categoryValue == "Select Expenses Category") {
        return
    }

    let description = document.getElementById("description").value
    let amount = parseFloat(document.getElementById("amount").value)

    allExpenses += amount
    balanceAmt = latestIncome - allExpenses
    setBalance(balanceAmt)

    addTransactionSummary({categoryValue, amount, description})
    showTransaction()
    updateExpenseCategory(amount, categoryValue)
    updateBudgetSummary()
}

function updateExpenseCategory(amount, category) {
    categoryWiseExpenses[category] += amount
}  

function addTransactionSummary(newTransaction) {
    allTransactions.push(newTransaction)
}

function showTransaction() {
    if (allTransactions.length == 0 ) {
        return
    }
    let transactions = document.getElementById("transactions")
    let newListItem = document.createElement("li")
    let lastTransaction = allTransactions[allTransactions.length - 1]
    newListItem.innerText = `${lastTransaction.description}: ${lastTransaction.amount}: ${lastTransaction.categoryValue} `
    transactions.appendChild(newListItem)
}

