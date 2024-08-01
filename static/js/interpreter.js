document.addEventListener('DOMContentLoaded', () => {
    const descriptionDiv = document.getElementById('description');

    function highlightWords(text, words) {
    let highlightedText = text;

    Object.entries(words).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        const regex = new RegExp(`(${key})`, 'g');
        highlightedText = highlightedText.replace(
        regex,
        `<span class="tooltip" data-meaning="${value}">${key}</span>`);
        });
        return highlightedText;
    }

    const fetchButton = document.getElementById('fetchButton');

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
            console.log('Success:', data);
            const description = data[0]["txt"];
            const words = data[1];

            descriptionDiv.innerHTML = highlightWords(description, words);
        })
        .catch(error => console.error('Error sending data:', error));
    });


});
