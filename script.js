document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
  });
  
  async function loadTransactions() {
    const response = await fetch('/transactions');
    const transactions = await response.json();
  
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';
  
    transactions.forEach(transaction => {
      const transactionItem = document.createElement('div');
      transactionItem.innerHTML = `
        <p>${transaction.description} - ${transaction.amount} (${transaction.type})</p>
      `;
      transactionList.appendChild(transactionItem);
    });
  }
  
  async function addTransaction() {
    const form = document.getElementById('transactionForm');
    const description = form.querySelector('#description').value;
    const amount = form.querySelector('#amount').value;
    const type = form.querySelector('#type').value;
  
    const response = await fetch('/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, amount, type }),
    });
  
    const newTransaction = await response.json();
    console.log('New transaction added:', newTransaction);
  
    loadTransactions();
  }
  