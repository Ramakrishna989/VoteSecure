document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('/get-candidates');
      const candidates = await res.json();
  
      const table = document.getElementById('candidate-table');
      document.getElementById('total-candidates').textContent = candidates.length;
  
      candidates.forEach(candidate => {
        const row = document.createElement('tr');
  
        row.innerHTML = `
          <td>${candidate.candidateName}</td>
          <td>${candidate.age}</td>
          <td>${candidate.partyName}</td>
          <td>${candidate.candidateId}</td>
          <td><img src="${candidate.partySymbol}" alt="Symbol" width="40"/></td>
          <td>
            <button onclick="deleteCandidate('${candidate._id}')">Delete</button>
          </td>
        `;
        table.appendChild(row);
      });
  
    } catch (err) {
      console.error('Error loading candidates:', err);
    }
  });
  
  async function deleteCandidate(id) {
    if (!confirm('Are you sure you want to delete this candidate?')) return;
  
    try {
      const res = await fetch(`/delete-candidate/${id}`, { method: 'DELETE' });
      const result = await res.json();
  
      alert(result.message);
      if (res.ok) location.reload();
    } catch (err) {
      console.error('Error deleting candidate:', err);
    }
  }
  