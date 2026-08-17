let amount = document.getElementById("amount");
let description = document.getElementById("description");
let category = document.getElementById("category");
let expenseList = document.getElementById("expenseList");
let form = document.getElementById("expenseForm");

let expenses = [];
let editIndex = -1;

let storedExpenses = localStorage.getItem("expenses");
if (storedExpenses !== null) {
    expenses = JSON.parse(storedExpenses);
}
displayExpenses();

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    let expense = {
        amount: amount.value,
        description: description.value,
        category: category.value
    };

     if (editIndex == -1){
        expenses.push(expense);
    } else {
        expenses[editIndex] = expense;
        editIndex = -1;
    }
    localStorage.setItem("expenses", JSON.stringify(expenses));
    form.reset();
    displayExpenses();

});


function displayExpenses() {
    expenseList.innerHTML = "";
    for (let i = 0; i < expenses.length; i++) {
        let expense = expenses[i];
        expenseList.innerHTML += `
            <div class="expense">
                <p>${expense.amount}</p>
                <p>${expense.description}</p>
                <p>${expense.category}</p>

                <button type="button" class="btn btn-warning" onclick="editExpense(${i})">
                    Edit
                </button>

                <button class="btn btn-danger" onclick="deleteExpense(${i})">
                    Delete
                </button>

            </div> `;
    }
}

function editExpense(index) {
    let expense = expenses[index];
    amount.value = expense.amount;
    description.value = expense.description;
    category.value = expense.category;
    editIndex = index;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}
