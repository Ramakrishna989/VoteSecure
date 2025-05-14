// Display Time
function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    timeElement.textContent = formattedTime;
  }
  setInterval(updateTime, 1000);
  updateTime();
  
  // Scroll to Content
  function scrollToContent() {
    const contentSection = document.getElementById('content');
    contentSection.scrollIntoView({ behavior: 'smooth' });
  }
// Time Display
function updateTime() {
    const timeElement = document.getElementById("time");
    const currentTime = new Date().toLocaleTimeString();
    timeElement.textContent = currentTime;
  }
  setInterval(updateTime, 1000);
  
  // Smooth Scroll
  function scrollToContent() {
    document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
  }
  
  // Animation on Scroll
  window.addEventListener("scroll", function () {
    const features = document.querySelectorAll(".feature[data-aos='fade-up']");
    const triggerHeight = window.innerHeight * 0.8;
  
    features.forEach((feature) => {
      const featureTop = feature.getBoundingClientRect().top;
  
      if (featureTop < triggerHeight) {
        feature.style.opacity = "1";
        feature.style.transform = "translateY(0)";
      }
    });
  });
    