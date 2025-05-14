document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const voterId = document.getElementById('voterId').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validation
  if (newPassword !== confirmPassword) {
    return alert('Passwords do not match!');
  }
  if (newPassword.length < 7 || newPassword.length > 15) {
    return alert('Password must be between 7 to 15 characters.');
  }

  try {
    const response = await fetch('/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voterId, newPassword }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      window.location.href = '/login.html';
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});
