document.addEventListener("DOMContentLoaded", function () {
  const alarmTrigger = document.getElementById("alarm-trigger");
  let isAnimating = false;

  if (alarmTrigger) {
    alarmTrigger.addEventListener("click", function () {
      isAnimating = !isAnimating;
      if (isAnimating) {
        this.classList.add("beating");
      } else {
        this.classList.remove("beating");
      }
    });
  }
});
