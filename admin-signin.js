document.getElementById('adminSignInForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const eciId = document.getElementById('eciId').value;
    const aadharId = document.getElementById('aadharId').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    if (password !== confirmPassword) {
      return alert('Passwords do not match!');
    }
  
    const eciRegex = /^[A-Za-z]{4}\d{6}$/;
    const aadharRegex = /^\d{10}$/;
  
    if (!eciRegex.test(eciId)) {
      return alert('Invalid ECI ID. It must be 4 letters followed by 6 digits.');
    }
  
    if (!aadharRegex.test(aadharId)) {
      return alert('Invalid Aadhar ID. It must be exactly 10 digits.');
    }
  
    try {
      const response = await fetch('/admin/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, eciId, aadharId, password }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        window.location.href = '/admin-login.html';
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  });
  