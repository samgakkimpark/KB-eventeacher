document.addEventListener('DOMContentLoaded', () => {
  const recommendationBtn = document.getElementById('recommendation-btn');
  const resultLabel = document.getElementById('result-container');


    function displayEvents(events) {
        const resultDiv = document.getElementById('result-container');
        resultDiv.innerHTML = '';

        events.forEach(event => {
          console.log(event)
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('result');

            eventDiv.innerHTML = `
                <h4><a href="interpreter.html?event_id=${event.event_id}">${event.event_title}</a></h4>
            `;

            resultDiv.appendChild(eventDiv);
        });
    }

  recommendationBtn.addEventListener('click', () => {
        const dataToSend = { message: 'send data' };

        fetch('http://127.0.0.1:5000/api/data/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(events => {
            console.log('Success:', events);

            displayEvents(events);
        })
        .catch(error => console.error('Error sending data:', error));
  });
});
