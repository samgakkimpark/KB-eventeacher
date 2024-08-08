document.addEventListener('DOMContentLoaded', () => {
    const descriptionDiv = document.getElementById('description');
    const fetchButton = document.getElementById('fetch-btn');
    const homeButton = document.getElementById('home-btn');

    function highlightWords(eventTitle, text, words) {
        let highlightedText = text;

        Object.entries(words).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
            const regex = new RegExp(`(${key})`, 'g');
            highlightedText = highlightedText.replace(
            regex,
            `<span class="tooltip" data-meaning="${value}"><b>${key}</b></span>`);
        });

        highlightedText = `<h1>${eventTitle}</h1><br/>` + highlightedText.replace(/\n/g, '<br>');
        return highlightedText;
    }

    function addTooltipClickEvent() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('click', () => {
                const searchQuery = tooltip.textContent.trim();
                const searchUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent(searchQuery)}`
                    // `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
                window.open(searchUrl, '_blank');
            });
        });
    }

    fetchButton.addEventListener('click', function() {
        const dataToSend = { message: 'send data' };

        fetch('http://127.0.0.1:5000/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data, data["event_id"], data["text"], data["words"]);
            const eventTitle = data["event_title"];
            const description = data["text"];
            const words = data["words"];

            descriptionDiv.innerHTML = highlightWords(eventTitle, description, words);
            addTooltipClickEvent();
        })
        .catch(error => console.error('Error sending data:', error));
    });

    homeButton.addEventListener('click', function() {
      window.location.href = 'index.html';
    });

});
