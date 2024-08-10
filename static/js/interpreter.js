document.addEventListener('DOMContentLoaded', () => {
  const titleArea = document.getElementById('title');
  const periodDiv = document.getElementById('period');
  const imgDiv = document.getElementById('img');
  const descriptionDiv = document.getElementById('description');
  const backButton = document.getElementById('back-btn');

  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('event_id');

  fetch('http://127.0.0.1:5000/api/data/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: eventId,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      console.log(data);
      const eventTitle = data['event']['event_title'];
      const eventPeriod = data['event']['event_period'];
      const eventDescription = data['event']['text'];
      const dictionary = data['dictionary'];
      const eventImg = data['event']['event_img'];

      titleArea.innerHTML = eventTitle;
      periodDiv.innerHTML = eventPeriod;
      imgDiv.innerHTML = insertImgs(eventImg);
      descriptionDiv.innerHTML = highlightWords(
        eventTitle,
        eventDescription,
        dictionary
      );
      addTooltipClickEvent();
    })
    .catch((error) => console.error('Error sending data:', error));

  function insertImgs(eventImg) {
    let insertedImgs = '';

    eventImg.forEach((url) => {
      insertedImgs += `<img src="${url}" width="90%">`;
    });
    return insertedImgs;
  }

  function highlightWords(eventTitle, text, words) {
    let highlightedText = text;

    Object.entries(words).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
      const regex = new RegExp(`(${key})`, 'g');

      if (highlightedText.search(regex)) {
        highlightedText = highlightedText.replace(
          regex,
          `<span class="tooltip" data-meaning="${value}"><b>${key}</b></span>`
        );
      }
    });

    highlightedText = highlightedText.replace(/\n/g, '<br>');
    return highlightedText;
  }

  function addTooltipClickEvent() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach((tooltip) => {
      tooltip.addEventListener('click', () => {
        const searchQuery = tooltip.textContent.trim();
        const searchUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent(
          searchQuery
        )}`;
        window.open(searchUrl, '_blank');
      });
    });
  }

  backButton.addEventListener('click', function () {
    window.history.back();
  });
});
