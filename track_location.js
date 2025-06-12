document.addEventListener("DOMContentLoaded", function () {
  const shareButton = document.getElementById("share-location");
  const output = document.getElementById("location-output");
  const refreshIcon = document.querySelector(".refresh-icon");
  let watchId = null;

  function updateLocation(position) {
    const lat = position.coords.latitude.toFixed(6);
    const lon = position.coords.longitude.toFixed(6);

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const address = data.address || {};

        const houseNumber = address.house_number || "";
        const street = address.road || "";
        const subdivision =
          address.subdivision || address.neighbourhood || address.suburb || "";
        const barangay = address.village || address.suburb || "";
        const city = address.city || address.town || address.village || "";
        const postalCode = address.postcode || "";
        const province = address.state || "";
        const region = address.region || province;
        const country = address.country || "";

        const fullAddress = `${houseNumber} ${street}, ${subdivision}<br> ${barangay} ${city} ${postalCode}, ${province} <br> ${region}, ${country} <br>`;
        const coords = `Latitude: ${lat} Longitude: ${lon}`;

        output.innerHTML = `📍 ${fullAddress}<br>📌 ${coords}`;
      })
      .catch((error) => {
        output.innerHTML = "❌ Failed to retrieve address.";
        console.error(error);
      });
  }

  // Function to start watching position
  function startWatchingPosition() {
    if (navigator.geolocation) {
      // Clear any existing watch
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }

      // Start watching position
      watchId = navigator.geolocation.watchPosition(
        updateLocation,
        function (error) {
          output.innerHTML = "❌ Unable to retrieve your location.";
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      output.innerHTML = "❌ Geolocation is not supported by your browser.";
    }
  }

  // Add click event listener to refresh icon
  if (refreshIcon) {
    refreshIcon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Clear current location display
      output.innerHTML = "Updating location...";

      // Restart position watching
      startWatchingPosition();

      // Add visual feedback
      this.style.transform = "rotate(180deg)";
      setTimeout(() => {
        this.style.transform = "rotate(0deg)";
      }, 300);
    });
  }

  // Add click event listener to share button
  shareButton.addEventListener("click", function () {
    output.innerHTML = "Updating location...";
    startWatchingPosition();
  });

  // Toggle active state for icon buttons
  const icons = document.querySelectorAll(".icon-buttons i");
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("active");
    });
  });

  // Initial location update
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const location_url = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
      fetch("trigger_alarm.php", {
        method: "POST",
        body: JSON.stringify({ location_url }),
        headers: { "Content-Type": "application/json" },
      });
    });
  }
});
