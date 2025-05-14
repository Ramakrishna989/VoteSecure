
  function signUp() {
    const name = document.getElementById("name").value.trim();
    const voterId = document.getElementById("voterId").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const address = document.getElementById("address").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    // Validation
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert("Name should only contain letters and spaces.");
      return;
    }
    if (!voterId || voterId.length<10) {
      alert("Voter ID is required Must be 10 Digit.");
      return;
    }
    if (isNaN(age) || age < 20 || age > 100) {
      alert("You must be between 20 and 100 years old to register.");
      return;
    }
    if (!gender) {
      alert("Please select your gender.");
      return;
    }
    if (!address) {
      alert("Address is required.");
      return;
    }
    if (password.length < 7 || password.length > 15) {
      alert("Password must be between 7 and 15 characters.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    // API Request to Server
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, voterId, age, gender, address, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
        window.location.href = 'login.html';
      }
    })
    .catch(error => alert("An error occurred: " + error.message));
  }
  
  