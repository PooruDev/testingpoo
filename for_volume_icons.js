document.addEventListener("DOMContentLoaded", function () {
  const alarmTrigger = document.getElementById("alarm-trigger");
  const alarmSound = document.getElementById("alarm-sound");
  const vibrateIcon = document.querySelector(".bi-phone-vibrate-fill");
  const muteIcon = document.querySelector(".bi-volume-mute-fill");
  const volumeUpIcon = document.querySelector(".bi-volume-up-fill");

  let isPlaying = false;
  const defaultVolume = 0.1;
  let isMuted = false;
  let isMaxVolume = false;

  if (alarmTrigger && alarmSound) {
    alarmSound.volume = defaultVolume;
    alarmSound.loop = true;

    // Toggle play/stop with alarm trigger
    alarmTrigger.addEventListener("click", () => {
      if (!isPlaying) {
        alarmSound.currentTime = 0;
        alarmSound
          .play()
          .then(() => {
            isPlaying = true;
            console.log("Alarm playing.");
          })
          .catch((err) => {
            console.error("Audio play failed:", err);
          });
      } else {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        isPlaying = false;
        console.log("Alarm stopped.");
      }
    });

    // Trigger alarm via vibrate icon
    vibrateIcon.addEventListener("click", () => {
      if (!isPlaying) {
        alarmSound.currentTime = 0;
        alarmSound
          .play()
          .then(() => {
            isPlaying = true;
            console.log("Alarm triggered by shake.");
          })
          .catch((err) => {
            console.error("Audio play failed:", err);
          });
      }
    });

    // 🔇 Mute icon toggle
    muteIcon.addEventListener("click", () => {
      if (!isMuted) {
        alarmSound.volume = 0;
        isMuted = true;
        console.log("Muted (volume = 0).");
      } else {
        alarmSound.volume = defaultVolume;
        isMuted = false;
        console.log("Unmuted (volume = 0.1).");
      }
    });

    // 🔊 Volume up icon toggle
    volumeUpIcon.addEventListener("click", () => {
      if (!isMaxVolume) {
        alarmSound.volume = 1;
        isMuted = false;
        isMaxVolume = true;
        console.log("Volume set to MAX (1).");
      } else {
        alarmSound.volume = defaultVolume;
        isMuted = false;
        isMaxVolume = false;
        console.log("Volume reset to default (0.1).");
      }
    });
  } else {
    console.warn("Alarm trigger or sound not found.");
  }
});
