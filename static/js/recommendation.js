document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-btn');

    function loadPage() {
        const params = new URLSearchParams(window.location.search);
        const customerId = params.get('customer_id');

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

    }

    function displayEvents(events) {
        const recommendationTable = document.getElementById('recommendation-table');
        recommendationTable.innerHTML = `<tr><th>이벤트</th><th>기간</th><th>유형</th></tr>`;

        events.forEach(event => {
            const eventTr = document.createElement('tr');
            eventTr.innerHTML = `
                <td><a href="interpreter.html?event_id=${event.event_id}">${event.event_title}</a></td><td>${event.event_period}</td><td>적금</td>
            `;

            recommendationTable.appendChild(eventTr);
        });
    }

    homeButton.addEventListener('click', function() {
      window.location.href = 'index.html';
    });

    loadPage();

});