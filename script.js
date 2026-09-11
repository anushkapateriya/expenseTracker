let amount = document.getElementById("amount");
let description = document.getElementById("description");
let category = document.getElementById("category");
let expenseList = document.getElementById("expenseList");
let form = document.getElementById("expenseForm");

let editId = null;

const API_URL = "http://localhost:3000/expenses";


// Load expenses when page opens
window.addEventListener("DOMContentLoaded", getExpenses);


// Add or update expense
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    let expense = {
        amount: amount.value,
        description: description.value,
        category: category.value
    };

    try {
        if (editId === null) {

            // CREATE
            await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(expense)
            });

        } else {

            // UPDATE
            await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(expense)
            });

            editId = null;
        }

        form.reset();
        getExpenses();

    } catch (error) {
        console.log("Error:", error);
    }
});


// Get all expenses
async function getExpenses() {

    try {
        let response = await fetch(API_URL);

        let expenses = await response.json();

        displayExpenses(expenses);

    } catch (error) {
        console.log("Error:", error);
    }
}


// Display expenses
function displayExpenses(expenses) {

    expenseList.innerHTML = "";

    for (let expense of expenses) {

        expenseList.innerHTML += `
            <div class="expense mb-3 p-3 border rounded">

                <p><strong>Amount:</strong> ${expense.amount}</p>

                <p><strong>Description:</strong> ${expense.description}</p>

                <p><strong>Category:</strong> ${expense.category}</p>

                <button 
                    type="button"
                    class="btn btn-warning"
                    onclick="editExpense(${expense.id})">
                    Edit
                </button>

                <button 
                    type="button"
                    class="btn btn-danger"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>

            </div>
        `;
    }
}


// Edit expense
async function editExpense(id) {

    try {

        let response = await fetch(`${API_URL}/${id}`);

        let expense = await response.json();

        amount.value = expense.amount;
        description.value = expense.description;
        category.value = expense.category;

        editId = id;

    } catch (error) {
        console.log("Error:", error);
    }
}


// Delete expense
async function deleteExpense(id) {

    try {

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        getExpenses();

    } catch (error) {
        console.log("Error:", error);
    }
}