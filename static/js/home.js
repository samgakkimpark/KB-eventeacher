document.addEventListener('DOMContentLoaded', () => {
  const recommendationBtn = document.getElementById('recommendation-btn');

  recommendationBtn.addEventListener('click', () => {
      const customer_id = 123;
      window.location.href = `recommendation.html?customer_id=${customer_id}`;
  });
});
