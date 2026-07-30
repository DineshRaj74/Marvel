const movies = [
  {
    img: "./images/spiderman1.jpg",
    title: "Spider-Man",
    year: "2002",
    duration: "2h 1m",
    rating: "7.4",
  },
  {
    img: "./images/ironman1.jpg",
    title: "Iron Man",
    year: "2008",
    duration: "2h 6m",
    rating: "7.9",
  },
  {
    img: "./images/thor1.jpg",
    title: "Thor",
    year: "2011",
    duration: "1h 55m",
    rating: "7.0",
  },
  {
    img: "./images/cap1.jpg",
    title: "Captain America",
    year: "2011",
    duration: "2h 4m",
    rating: "6.9",
  },
  {
    img: "./images/cap3.jpg",
    title: "Captain America: Civil War",
    year: "2016",
    duration: "2h 27m",
    rating: "7.8",
  },
];

const stage = document.getElementById("movieStage");
const dotsWrap = document.getElementById("dots");
let current = Math.floor(movies.length / 2);
// Create Cards
movies.forEach((movie) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
        <img src="${movie.img}" alt="${movie.title}">
        <div class="card-overlay">
            <div class="card-info">
                <h3>${movie.title}</h3>
                <div class="meta">
                    <span>${movie.year}</span>
                    <span class="sep">•</span>
                    <span>${movie.duration}</span>
                    <span class="sep">•</span>
                    <span class="rating">★ ${movie.rating}</span>
                </div>
            </div>
            <div class="play-btn">▶</div>
        </div>
    `;

  stage.appendChild(card);
});

const cards = document.querySelectorAll(".card");

// Click a card to make it the active/center one
cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    current = index;
    updateSlider();
  });
});

// Update Slider — centers the active card, scales/dims the rest
function updateSlider() {
  cards.forEach((card, index) => {
    card.classList.remove("active", "near");
    const isEdgeWrapNear =
      (current === 0 && index === cards.length - 1) ||
      (current === cards.length - 1 && index === 0);
    if (index === current) {
      card.classList.add("active");
    } else if (Math.abs(index - current) === 1 || isEdgeWrapNear) {
      card.classList.add("near");
    }
  });

  // Force reflow so offsetLeft/offsetWidth reflect the new sizes above
  void stage.offsetWidth;
  const containerWidth = stage.parentElement.offsetWidth;
  const activeCard = cards[current];
  const offset =
    containerWidth / 2 - (activeCard.offsetLeft + activeCard.offsetWidth / 2);
  stage.style.transform = `translateX(${offset}px)`;

  updateDots();
}

// Create Dots
function updateDots() {
  dotsWrap.innerHTML = "";

  movies.forEach((_, index) => {
    const dot = document.createElement("div");

    dot.className = index === current ? "dot active" : "dot";

    dot.onclick = () => {
      current = index;
      updateSlider();
    };

    dotsWrap.appendChild(dot);
  });
}

// Next Button
function goNext() {
  current++;
  if (current >= movies.length) {
    current = 0;
  }
  updateSlider();
}

// Previous Button
function goPrev() {
  current--;
  if (current < 0) {
    current = movies.length - 1;
  }
  updateSlider();
}
// Buttons
document.getElementById("nextBtn").addEventListener("click", goNext);
document.getElementById("prevBtn").addEventListener("click", goPrev);

// Responsive
window.addEventListener("resize", updateSlider);

// Initial Load
updateSlider();
