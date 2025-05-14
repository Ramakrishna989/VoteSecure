// Fetch candidates from the server
document.addEventListener('DOMContentLoaded', () => {
  fetchCandidates();
});

let dropdownOpen = false;

function toggleDropdown() {
  dropdownOpen = !dropdownOpen;
  document.getElementById("candidateList").style.display = dropdownOpen ? "block" : "none";
}

function fetchCandidates() {
  fetch('/candidates')
    .then(response => response.json())
    .then(candidates => {
      const list = document.getElementById("candidateList");
      list.innerHTML = '';

      candidates.forEach(candidate => {
        if (!candidate.candidateName || !candidate.partyName || !candidate.candidateId) return;

        const label = document.createElement("label");
        label.innerHTML = `
          <input type="checkbox" value="${candidate._id}"> 
          ${candidate.candidateName} - ${candidate.partyName} (ID: ${candidate.candidateId})
        `;
        list.appendChild(label);
      });
    })
    .catch(error => console.error("Error fetching candidates:", error));
}



function handleConductElection() {
  let isValid = true;
  document.querySelectorAll('.error').forEach(span => (span.textContent = ''));

  const electionName = document.getElementById('electionName').value.trim();
  const electionType = document.getElementById('electionType').value.trim().toUpperCase();
  const startDate = new Date(document.getElementById('startDate').value);
  const endDate = new Date(document.getElementById('endDate').value);
  const startTime = document.getElementById('startTime').value;



  // Validate Election Name
  if (!electionName) {
    document.getElementById('electionNameError').textContent = 'Election name is required.';
    isValid = false;
  }

  // Validate Election Type
  if (!['PM', 'CM', 'MLA'].includes(electionType)) {
    document.getElementById('electionTypeError').textContent = 'Invalid type. Choose PM, CM, or MLA.';
    isValid = false;
  }

  // Validate Start Date
  const today = new Date();
  if (isNaN(startDate.getTime()) || startDate <= today) {
    document.getElementById('startDateError').textContent = 'Start date must be in the future.';
    isValid = false;
  }

  // Validate End Date
  if (isNaN(endDate.getTime()) || endDate <= startDate) {
    document.getElementById('endDateError').textContent = 'End date must be after the start date.';
    isValid = false;
  }

  // Validate Start Time
  if (!startTime) {
    document.getElementById('startTimeError').textContent = 'Start time is required.';
    isValid = false;
  } else {
    const [hours] = startTime.split(':').map(Number);
    if (hours < 8 || hours > 18) {
      document.getElementById('startTimeError').textContent = 'Time must be between 8 AM and 6 PM.';
      isValid = false;
    }
  }

  // Validate Candidates
  const checkboxes = document.querySelectorAll('#candidateList input[type="checkbox"]:checked');
  if (checkboxes.length < 2) {
    document.getElementById("candidateListError").textContent = "Select at least 2 candidates.";
    isValid = false;
  } else {
    document.getElementById("candidateListError").textContent = "";
  }
  const selectedCandidates = Array.from(checkboxes).map(cb => cb.value);


  // Submit Data if Valid
  if (isValid) {
    fetch('/conduct-election', {
      method: 'POST',
      body: JSON.stringify({
        electionName,
        electionType,
        startDate,
        endDate,
        startTime,
        selectedCandidates

      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(err.error); });
      }
      return response.json();
    })
    .then(data => {
      alert(data.message);
      window.location.href = '/admin-dashboard.html'; // 👈 Redirect here after successful election
    })
    .catch(error => alert("Error: " + error.message));
  } else {
    alert('Error in conducting the election. Please check the fields.');
  }
}

document.getElementById('conductElection').addEventListener('click', handleConductElection);
