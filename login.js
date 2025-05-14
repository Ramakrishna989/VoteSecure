document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  loginUser();
});
async function loginUser() {
  const voterId = document.getElementById('voterId').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!voterId || !password) {
    alert("Please enter both Voter ID and Password.");
    return false;
  }

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voterId, password })
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('voterId', voterId);
      const userId = data.user._id; // assuming backend sends user object with _id
      localStorage.setItem('userId', userId);

      // Check if face is already registered
      const faceCheck = await fetch(`/check-face/${userId}`);
      const faceData = await faceCheck.json();

      if (faceData.faceRegistered) {
        window.location.href = '/ongoing-elections.html';
      } else {
        window.location.href = 'http://localhost:5000/?userId=' + userId; // Flask face register
      }
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Try again.');
  }

  return false;
}
