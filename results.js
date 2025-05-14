async function fetchResults() {
    try {
      const response = await fetch('/results');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const container = document.getElementById('results-container');
  
      if (data.length === 0) {
        container.innerHTML = "<p class='no-results'>No completed elections found.</p>";
        return;
      }
  
      data.forEach(result => {
        const resultCard = document.createElement('div');
        resultCard.className = "result-card";
        resultCard.innerHTML = `
          <h2>${result.electionName} (${result.electionType})</h2>
          <h3>🏆 Winner: ${result.winner?.candidateName} (${result.winner?.partyName}) with ${result.winner?.voteCount} votes</h3>
          <ul>
            ${result.candidates.map(c =>
              `<li>${c.candidateName} (${c.partyName}) — ${c.voteCount} votes</li>`
            ).join('')}
          </ul>
        `;
        container.appendChild(resultCard);
      });
  
    } catch (error) {
      console.error("Error fetching results:", error);
      document.getElementById('results-container').innerHTML = "<p>Error fetching results.</p>";
    }
  }
  
  fetchResults();
  