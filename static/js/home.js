document.addEventListener('DOMContentLoaded', () => {
  const recommendationBtn = document.getElementById('recommendation-btn');
  const resultLabel = document.getElementById('result-container');

  recommendationBtn.addEventListener('click', () => {
    resultLabel.innerHTML = `
        <div id="result">
          <h2>event</h2><br/>
          <a href="interpreter.html">Interpreter</a>
        </div>`
  });
});
