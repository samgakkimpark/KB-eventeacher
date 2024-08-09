document.addEventListener('DOMContentLoaded', () => {
  const homeButton = document.getElementById('home-btn');

  function loadPage() {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customer_id');

    fetch('http://127.0.0.1:5000/api/data/recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: customerId,
    })
      .then((response) => response.json())
      .then((events) => {
        console.log('Success:', events);
        displayEvents(events);
      })
      .catch((error) => console.error('Error sending data:', error));
  }

  function displayEvents(events) {
    const resultDiv = document.getElementById('result-container');

    events.forEach((event) => {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'event';

      eventDiv.innerHTML = `
        
        <a href="interpreter.html?event_id=${event.event_id}">
          <img id="event_img" src=${event.event_img} alt=${event.event_title}>${event.event_title}
        </a><br/>
        <p>${event.event_period}</p>
        `;

      resultDiv.appendChild(eventDiv);
    });
  }

  homeButton.addEventListener('click', function () {
    window.location.href = 'index.html';
  });

  loadPage();
});
