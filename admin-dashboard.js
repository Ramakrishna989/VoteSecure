// Show Add Candidate Form on Button Click
document.getElementById('addCandidateBtn').addEventListener('click', () => {
    const section = document.getElementById('addCandidateSection');
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  
  // Form Submission with Candidate ID Validation
  document.getElementById('addCandidateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
  
    try {
      const response = await fetch('/add-candidate', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Candidate added successfully!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred');
    }
    scrollToTop();
  });
  
  // Dummy function for results
  function announceResults() {
    alert('Results announced successfully!');
  }
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear(); // Clear stored voterId etc
    window.location.href = '/home.html'; // Or your home page
  });
  
  