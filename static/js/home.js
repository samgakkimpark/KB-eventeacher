document.addEventListener('DOMContentLoaded', () => {
  const recommendationBtn = document.getElementById('recommendation-btn');
  const customerInput = document.getElementById('customer-input');

  function setCustomer(customer, data) {
    const prettyJson = JSON.stringify(data, null, 2);
    customerInput.textContent = `${customer}\n${prettyJson}`;
  }

  function displayCustomers(customers) {
    const customerData = document.getElementById('customer-data');
    for (let key in customers) {
      const customerDiv = document.createElement('button');
      customerDiv.className = `customer ${key}`;
      customerDiv.innerHTML = `${key}`;

      customerDiv.addEventListener('click', function () {
        setCustomer(key, customers[key]);
      });

      customerData.appendChild(customerDiv);
    }
  }

  function loadCustomers() {
    fetch('http://127.0.0.1:5000/api/data/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'hi',
    })
      .then((response) => response.json())
      .then((customers) => {
        console.log('Success:', customers);
        displayCustomers(customers);
      })
      .catch((error) => console.error('Error sending data:', error));
  }

  recommendationBtn.addEventListener('click', () => {
    if (customerInput.textContent == '') {
      alert('조회할 고객을 선택해주세요.');
    } else {
      const lines = customerInput.textContent.trim().split('\n');
      const customer_num = lines[0].trim();
      window.location.href = `recommendation.html?customer_id=${customer_num}`;
    }
  });

  loadCustomers();
});
