document.addEventListener("DOMContentLoaded", function () {
  const darkModeIcon = document.querySelector('img[src*="dark-mode"]');
  const lightModeIcon = document.querySelector('img[src*="light-mode"]');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Dark mode toggle
  darkModeIcon.addEventListener("click", function () {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  });

  // Light mode toggle
  lightModeIcon.addEventListener("click", function () {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Share location logic
  const shareButton = document.getElementById("share-location");
  const output = document.getElementById("location-output");

  if (shareButton) {
    shareButton.addEventListener("click", function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const lat = position.coords.latitude.toFixed(6);
            const lon = position.coords.longitude.toFixed(6);
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                const address = data.address || {};
                const fullAddress = `${address.house_number || ""} ${
                  address.road || ""
                }, ${
                  address.subdivision ||
                  address.neighbourhood ||
                  address.suburb ||
                  ""
                }<br> ${address.village || address.suburb || ""} ${
                  address.city || address.town || address.village || ""
                } ${address.postcode || ""}, ${address.state || ""} <br> ${
                  address.region || address.state || ""
                }, ${address.country || ""} <br>`;
                const coords = `Latitude: ${lat} Longitude: ${lon}`;
                output.innerHTML = `📍 ${fullAddress}<br>📌 ${coords}`;
              })
              .catch((error) => {
                output.innerHTML = "Failed to retrieve address.";
                console.error(error);
              });
          },
          function (error) {
            output.innerHTML = "Unable to retrieve your location.";
            console.error(error);
          }
        );
      } else {
        output.innerHTML = "Geolocation is not supported by your browser.";
      }
    });
  }

  // Toggle icon buttons
  const icons = document.querySelectorAll(".icon-buttons");
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("active");
    });
  });

  // Settings sidebar
  const settingsSidebar = document.getElementById("settings-sidebar");
  const settingsToggle = document.getElementById("settings-toggle");
  const closeSettings = document.getElementById("close-settings");

  if (settingsToggle && closeSettings) {
    settingsToggle.addEventListener("click", (e) => {
      e.preventDefault();
      settingsSidebar.classList.add("active");
    });

    closeSettings.addEventListener("click", () => {
      settingsSidebar.classList.remove("active");
    });

    window.addEventListener("click", (e) => {
      if (
        !settingsSidebar.contains(e.target) &&
        e.target.id !== "settings-toggle"
      ) {
        settingsSidebar.classList.remove("active");
      }
    });
  }
});
