document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const eciId = document.getElementById('eciId').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eciId, password }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        window.location.href = '/admin-dashboard.html';
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  });
  