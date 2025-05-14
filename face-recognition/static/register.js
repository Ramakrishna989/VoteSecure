const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const userIdInput = document.getElementById('userId');

// ✅ Autofill userId from URL param
const urlParams = new URLSearchParams(window.location.search);
const userIdFromURL = urlParams.get('userId');
if (userIdFromURL) {
  userIdInput.value = userIdFromURL;
}

async function startVideo() {
  // ✅ Load models from correct static directory
  await faceapi.nets.tinyFaceDetector.loadFromUri('/static/face-api');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/static/face-api');
  await faceapi.nets.faceRecognitionNet.loadFromUri('/static/face-api');

  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      console.error("Camera access error:", err);
      alert("Camera access failed. Please allow permissions.");
    });
}

captureBtn.addEventListener('click', async () => {
  const userId = document.getElementById('userId').value.trim();
  if (!userId) return alert('Please enter your user ID.');

  const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

  if (!detection) {
    alert("No face detected. Try again.");
    return;
  }

  const descriptor = Array.from(detection.descriptor);

  fetch('/register-face', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, encoding: descriptor })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => alert("Error saving face."));
});

// Start everything
startVideo();
