const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");
const openWheelBtn = document.getElementById("openWheelBtn");
const closeWheelBtn = document.getElementById("closeWheelBtn");
const modal = document.querySelector(".fortune-modal");

const prizes = [
  "🎁 Купон на знижку",
  "💸 100₴ бонус",
  "❌ На жаль, нічого 😞",
  "🚚 Безкоштовна доставка",
  "💳 10% знижка",
  "🎉 Сюрприз-подарунок"
];

const colors = [
  "#FFD700", "#FF6347", "#6A5ACD", "#3CB371", "#1E90FF", "#FF1493"
];

const numSegments = prizes.length;
const segmentAngle = 360 / numSegments;

// Конічний градієнт
let gradient = "conic-gradient(";
for (let i = 0; i < numSegments; i++) {
  const start = i * segmentAngle;
  const end = start + segmentAngle;
  gradient += `${colors[i]} ${start}deg ${end}deg${i < numSegments - 1 ? ", " : ""}`;
}
gradient += ")";
wheel.style.background = gradient;

// Сегменти
prizes.forEach((text, i) => {
  const segment = document.createElement("div");
  segment.classList.add("segment");
  segment.style.transform = `rotate(${i * segmentAngle}deg)`;

  const span = document.createElement("span");
  span.innerText = text;
  span.style.setProperty('--text-angle', `${segmentAngle / 2 + 90}deg`);
  segment.appendChild(span);
  wheel.appendChild(segment);
});

let currentRotation = 0;

spinBtn.addEventListener("click", () => {
  spinBtn.style.pointerEvents = "none";
  result.textContent = "";

  const fullRotations = 5;
  const winningIndex = Math.floor(Math.random() * numSegments);
  const stopAngle = 360 - (winningIndex * segmentAngle + segmentAngle / 2);
  const totalRotation = fullRotations * 360 + stopAngle;

  wheel.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
  wheel.style.transform = `rotate(${totalRotation}deg)`;

  currentRotation = totalRotation;

  setTimeout(() => {
    result.textContent = `Виграш: ${prizes[winningIndex]}`;
    spinBtn.style.pointerEvents = "auto";
  }, 5200);
});

// Відкриття / закриття модального вікна
openWheelBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});
closeWheelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
