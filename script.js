const coin = document.getElementById("coin");
const flipButton = document.getElementById("flip-button");
const resetButton = document.getElementById("reset-button");
// const headsCountSpan = document.getElementById("heads-count");
// const tailsCountSpan = document.getElementById("tails-count");
const resultText = document.getElementById("result-text");

let headsCount = 0;
let tailsCount = 0;
let currentRotation = 0; // Keep track of rotation to ensure it always spins forward

flipButton.addEventListener("click", () => {
  flipButton.disabled = true;
  resultText.classList.remove("show");

  const isHeads = Math.random() < 0.5;

  // Add a large number of spins (9000deg = 25 full spins) to the current rotation
  currentRotation += 9000;

  // Adjust the final rotation to land on the correct face
  if (isHeads) {
    // For heads, the final rotation must be a multiple of 360
    currentRotation = Math.ceil(currentRotation / 360) * 360;
  } else {
    // For tails, the final rotation must be a multiple of 360 + 180
    currentRotation = Math.ceil(currentRotation / 360) * 360 + 180;
  }

  // Apply the animation by setting the transform. This is more reliable than using a CSS class here.
  coin.style.transition = "transform 5s ease-out"; // Ensure this matches the setTimeout duration
  coin.style.transform = `rotateY(${currentRotation}deg)`;

  setTimeout(() => {
    let result;
    if (isHeads) {
      headsCount++;
      //   headsCountSpan.textContent = headsCount;
      result = "HEADS!";
    } else {
      tailsCount++;
      //   tailsCountSpan.textContent = tailsCount;
      result = "TAILS!";
    }

    resultText.textContent = result;
    resultText.classList.add("show");

    flipButton.disabled = false;

    setTimeout(() => {
      resultText.classList.remove("show");
    }, 2000); // Animation duration
  }, 5000); // Match CSS transition
});

// resetButton.addEventListener("click", () => {
//   headsCount = 0;
//   tailsCount = 0;
//   currentRotation = 0;
//   headsCountSpan.textContent = headsCount;
//   tailsCountSpan.textContent = tailsCount;
//   coin.style.transition = "none";
//   coin.style.transform = "rotateY(0deg)";
//   resultText.classList.remove("show");
// });
