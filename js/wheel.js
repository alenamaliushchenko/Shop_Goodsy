export function initWheel(root) {
  // Якщо root передано — шукаємо елементи всередині нього, інакше по всьому документу
  const scope = root || document;
  const wheel = scope.querySelector("#wheel");
  const spinBtn = scope.querySelector("#spin");
  const result = scope.querySelector("#result");

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

// Створення conic-gradient
let gradient = "conic-gradient(";
for (let i = 0; i < numSegments; i++) {
  const start = i * segmentAngle;
  const end = start + segmentAngle;
  gradient += `${colors[i]} ${start}deg ${end}deg${i < numSegments - 1 ? ", " : ""}`;
}
gradient += ")";
if (wheel) wheel.style.background = gradient;

// Сегменти з текстом
if (wheel) {
  wheel.innerHTML = "";
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
}

let currentRotation = 0;
let attempts = 0;
const maxAttempts = 1;

if (spinBtn && wheel && result) {
  spinBtn.addEventListener("click", () => {
    if (attempts >= maxAttempts) {
      result.textContent = "Ви використали всі спроби!";
      spinBtn.style.pointerEvents = "none";
      spinBtn.style.opacity = "0.5";
      return;
    }
    spinBtn.style.pointerEvents = "none";
    result.textContent = "";

    const fullRotations = 5;
    const winningIndex = Math.floor(Math.random() * numSegments);

    // Кут, щоб стрілка вказувала на центр виграшного сектора
    const stopAngle = 360 - (winningIndex * segmentAngle + segmentAngle / 2);

    // Загальне обертання
    const totalRotation = fullRotations * 360 + stopAngle;

    wheel.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    currentRotation = totalRotation;
    attempts++;

    setTimeout(() => {
      result.textContent = `Виграш: ${prizes[winningIndex]}`;
      if (attempts < maxAttempts) {
        spinBtn.style.pointerEvents = "auto";
      } else {
        spinBtn.style.pointerEvents = "none";
        spinBtn.style.opacity = "0.5";
        result.textContent += " | Ви використали всі спроби!";
      }
    }, 5200);
  });
}
}