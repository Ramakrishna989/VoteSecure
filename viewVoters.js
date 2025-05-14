// Fetch Voter List
async function fetchVoters() {
    const tableBody = document.getElementById('voter-table');
    const totalVotersElement = document.getElementById('total-voters');
    tableBody.innerHTML = '';
  
    try {
      const response = await fetch('/voters');
      const voters = await response.json();
  
      voters.forEach((voter) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${voter.name}</td>
          <td>${voter.age}</td>
          <td>${voter.address}</td>
          <td>${voter.gender}</td>
          <td>${voter.voterId}</td>
          <td>${voter.hasVoted ? '✅' : '❌'}</td>
          <td><button onclick="confirmDelete('${voter._id}')">Delete</button></td>
        `;
        tableBody.appendChild(row);
      });
  
      // Update Total Voters
      totalVotersElement.textContent = voters.length;
    } catch (error) {
      console.error('Error fetching voters:', error);
    }
  }
  
  // Confirm Deletion
  async function confirmDelete(id) {
    const isConfirmed = confirm("Are you sure you want to remove this voter?");
    
    if (isConfirmed) {
      try {
        const response = await fetch(`/voters/${id}`, { method: 'DELETE' });
        const result = await response.json();
  
        if (response.ok) {
          alert(result.message);
          fetchVoters(); // Refresh the table
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error('Error deleting voter:', error);
      }
    }
  }
  
  // Initial Fetch
  fetchVoters();
  