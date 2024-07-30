document.addEventListener('DOMContentLoaded', () => {
  const description = '안녕하세요! 저희는 김하진, 김하영, 박정은입니다.';
  const words = {
    김하진: '98년생 쿼카',
    김하영: '00년생 아기부',
    박정은: '00년생 보라돌이',
  };

  const descriptionDiv = document.getElementById('description');

  function highlightWords(text, words) {
    let highlightedText = text;

    Object.entries(words).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
      const regex = new RegExp(`(${key})`, 'g');
      highlightedText = highlightedText.replace(
        regex,
        `<span class="tooltip" data-meaning="${value}">${key}</span>`
      );
    });
    return highlightedText;
  }

  descriptionDiv.innerHTML = highlightWords(description, words);

});
