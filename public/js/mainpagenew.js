const photos = {
  boat: "/album/sundarban-river.jpg",
  river: "/album/sundarban-river.jpg",
  forest: "/album/sundarban-river.jpg",
  food: "/album/sundarban-river.jpg",
  village: "/album/sundarban-river.jpg",
  sunset: "/album/sundarban-river.jpg",
  bird: "/album/sundarban-river.jpg",
  lodge: "/album/sundarban-river.jpg",
  group: "/album/sundarban-river.jpg",
  deck: "/album/sundarban-river.jpg",
};

const packages = [
  { title: "1 Day - Day Cruise", dur: "12 hrs", price: "1,499", tag: "Quick Escape", img: photos.boat, includes: ["Boat safari", "Lunch", "Guide"] },
  { title: "2D / 1N - Classic Mangrove", dur: "2 days", price: "3,999", tag: "Popular", img: photos.river, includes: ["Eco stay", "All meals", "2 safaris"] },
  { title: "3D / 2N - Tiger Trail", dur: "3 days", price: "6,499", tag: "Best Seller", img: photos.forest, includes: ["Tiger zone", "Canopy walk", "Bonbibi"] },
  { title: "4D / 3N - Grand Expedition", dur: "4 days", price: "8,999", tag: "Immersive", img: photos.sunset, includes: ["Netidhopani", "Village walk", "Sunrise cruise"] },
  { title: "Family Special", dur: "Flexible", price: "4,499", tag: "Family Safe", img: photos.lodge, includes: ["Kids meals", "First aid", "Veg options"] },
  { title: "Couple Honeymoon", dur: "Private boat", price: "9,999", tag: "Private", img: photos.deck, includes: ["Private cabin", "Dinner", "Photos"] },
  { title: "Group 10+ Pax", dur: "Custom", price: "3,499", tag: "Group Deal", img: photos.group, includes: ["Coordinator", "Discounts", "Transfers"] },
  { title: "Student Educational", dur: "Study tour", price: "2,999", tag: "Learning", img: photos.bird, includes: ["Naturalist talk", "Birding", "Certificate"] },
  { title: "Corporate Offsite", dur: "2D/1N or 3D/2N", price: "5,999", tag: "MICE", img: photos.village, includes: ["Team games", "Bonfire", "Setup"] },
  { title: "Luxury Houseboat", dur: "1N or 2N", price: "12,999", tag: "Luxury", img: photos.lodge, includes: ["AC suite", "Chef", "Sunrise deck"] },
];

const menus = {
  "1 Day": {
    note: "Fresh RO water all day",
    items: [["Morning Tea", "Tea, biscuits and light snacks"], ["Breakfast", "Luchi, alur dom and seasonal fruit"], ["Lunch", "Rice, dal, fish curry, chicken, salad and sweets"], ["Evening", "Tea with jhalmuri or pakora"]],
  },
  "2D / 1N": {
    note: "Evening snacks included",
    items: [["Day 1 Lunch", "Fish, prawn, chicken and veg sides"], ["Day 1 Dinner", "Chicken kosha with roti or rice"], ["Day 2 Breakfast", "Puri-sabzi, egg and tea"], ["Day 2 Lunch", "Seasonal Bengali thali"]],
  },
  "3D / 2N": {
    note: "Live crab on request",
    items: [["Day 1", "Welcome drink, lunch, snacks and dinner"], ["Day 2", "Breakfast, river cruise lunch and bonfire dinner"], ["Day 3", "Breakfast, grand thali and drop tea"]],
  },
  "4D / 3N": {
    note: "No-repeat chef menu",
    items: [["Daily Chef Menu", "Rotating Bengali thali"], ["Signature", "Daab chingri, sorshe ilish and mutton curry"], ["Dessert Bar", "Rosogolla, mishti doi and patishapta"], ["Kids", "Mild meals with curd and extra rice"]],
  },
};

const dests = [
  ["Sajnekhali Tiger Reserve", "Core tiger area and interpretation centre", photos.forest],
  ["Sudhanyakhali Watch Tower", "Classic watchtower for wildlife spotting", photos.boat],
  ["Dobanki Canopy Walk", "Elevated walk above mangrove channels", photos.forest],
  ["Netidhopani Ruins", "Ancient temple stories deep in the forest", photos.village],
  ["Bonbibi Temple", "Local blessing before safari", photos.lodge],
  ["Bird Watching Island", "Kingfishers, herons and winter visitors", photos.bird],
  ["Mangrove Interpretation", "Breathing roots and ecology walks", photos.forest],
  ["Village Walk", "Honey collectors and fisherfolk stories", photos.village],
];

const gallery = [photos.boat, photos.river, photos.forest, photos.food, photos.village, photos.bird, photos.lodge, photos.deck, photos.group];

const reviews = [
  { n: "Riya S.", l: "Mumbai - Family 2D/1N", t: "Food was excellent and the team arranged a separate Jain meal for my mother. The boat was clean and the guide was patient with the kids." },
  { n: "Ankit D.", l: "Delhi - Couple Trip", t: "The private boat felt premium, the pickup was smooth and the evening on deck was the highlight of our trip." },
  { n: "Dr. S. Mitra", l: "Kolkata - Student Group", t: "Professional handling for an educational tour. Safety, permits, water and ecology briefing were all properly managed." },
  { n: "Priya M.", l: "Bangalore - Honeymoon", t: "More comfortable than expected for the Sundarbans. The staff was polite, the food was fresh and the photos came out beautifully." },
  { n: "John C.", l: "UK - 4D/3N", t: "Clear itinerary, respectful wildlife distance and authentic local meals. A very well run operation." },
  { n: "Sneha G.", l: "Pune - 1 Day", t: "Perfect day trip. On-time Kolkata pickup, good breakfast and a peaceful cruise through the creeks." },
];

const faqs = [
  { q: "What is the best time to visit Sundarban?", a: "October to March has pleasant weather and calm river conditions. Monsoon is lush and quieter, while summer can be hot but good for birding." },
  { q: "Is Sundarban safe for family and kids?", a: "Yes. Licensed boats include life jackets, first aid, fire safety equipment and experienced local crew. Family-friendly meal options are available." },
  { q: "Do you provide pickup from Kolkata?", a: "Yes. You can choose Kolkata to Kolkata, Canning to Canning, Godkhali to Godkhali, or a custom pickup for groups." },
  { q: "What food is included?", a: "Packages include Bengali meals with fish, chicken, prawns or vegetarian options. Jain and kids meals can be arranged with advance notice." },
  { q: "Is tiger sighting guaranteed?", a: "No responsible operator can guarantee wild sightings. The itinerary is planned around tides, timing and experienced local tracking." },
];

function renderPackages() {
  const grid = document.getElementById("packageGrid");
  grid.innerHTML = packages.map((p) => `
    <article class="package-card">
      <div class="img-wrap">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        <div class="tags">
          <span class="badge-soft">${p.dur}</span>
          <span class="badge-soft">${p.tag}</span>
        </div>
      </div>
      <div class="body">
        <h3>${p.title}</h3>
        <div class="includes">${p.includes.map((item) => `<span>${item}</span>`).join("")}</div>
        <div class="price">Rs. ${p.price}<small> / person</small></div>
        <div class="actions">
          <a href="https://wa.me/919907947625?text=${encodeURIComponent(`Hi Nova Team, I want the ${p.title} package`)}" target="_blank" rel="noopener" class="btn btn-outline-dark">WhatsApp</a>
          <button class="btn btn-primary" data-pkg="${p.title}" data-modal="bookModal">Book</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderMenu(active) {
  const tabs = document.getElementById("menuTabs");
  tabs.innerHTML = Object.keys(menus).map((key) => `<button class="menu-tab ${key === active ? "is-active" : ""}" data-key="${key}">${key}</button>`).join("");

  const data = menus[active];
  document.getElementById("menuPanel").innerHTML = `
    <div class="dish">
      <div><strong>${active} Bengali Thali Journey</strong><div class="desc">${data.note}</div></div>
      <span>Included</span>
    </div>
    ${data.items.map(([title, desc]) => `
      <div class="dish">
        <div><strong>${title}</strong><div class="desc">${desc}</div></div>
        <span>Ready</span>
      </div>
    `).join("")}
  `;

  tabs.querySelectorAll(".menu-tab").forEach((button) => {
    button.addEventListener("click", () => renderMenu(button.dataset.key));
  });
}

function renderDestinations() {
  document.getElementById("destGrid").innerHTML = dests.map(([title, desc, img]) => `
    <article class="dest-item">
      <div class="thumb"><img src="${img}" alt="${title}" loading="lazy"></div>
      <div class="body"><h3>${title}</h3><p>${desc}</p></div>
    </article>
  `).join("");
}

function renderGallery() {
  const masonry = document.getElementById("masonry");
  masonry.innerHTML = gallery.map((src, index) => `<div class="masonry-item"><img src="${src}" alt="Sundarban travel moment ${index + 1}" loading="lazy"></div>`).join("");
  masonry.querySelectorAll(".masonry-item").forEach((item) => {
    item.addEventListener("click", () => openLightbox(item.querySelector("img").src));
  });
}

function renderReviews() {
  document.getElementById("reviewGrid").innerHTML = reviews.map((review) => `
    <article class="review-card">
      <div class="stars">*****</div>
      <div class="quote">"${review.t}"</div>
      <div class="author">
        <div class="avatar">${review.n[0]}</div>
        <div><strong>${review.n}</strong><div class="desc">${review.l}</div></div>
      </div>
    </article>
  `).join("");
}

function renderFAQs() {
  document.getElementById("faqAcc").innerHTML = faqs.map((faq, index) => `
    <div class="faq-item ${index === 0 ? "open" : ""}">
      <button class="question" type="button">${faq.q}</button>
      <div class="answer">${faq.a}</div>
    </div>
  `).join("");
}

function toggleFaq(button) {
  const item = button.closest(".faq-item");
  const wasOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach((faq) => faq.classList.remove("open"));
  if (!wasOpen) item.classList.add("open");
}

function openModal(id) {
  document.getElementById(id)?.classList.add("open");
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove("open");
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  lightbox.querySelector("img").src = src;
  lightbox.classList.add("open");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/919907947625?text=${encodeURIComponent(message)}`;
}

window.closeModal = closeModal;
window.closeLightbox = closeLightbox;

document.addEventListener("click", (event) => {
  const modalTrigger = event.target.closest("[data-modal]");
  if (modalTrigger) {
    event.preventDefault();
    const pkg = modalTrigger.dataset.pkg;
    const pickup = modalTrigger.dataset.pickup;
    if (pkg) document.getElementById("b_pkg").value = [...document.getElementById("b_pkg").options].find((option) => option.textContent.includes(pkg.split(" ")[0]))?.value || document.getElementById("b_pkg").value;
    if (pickup) document.getElementById("b_pickup").value = pickup;
    openModal(modalTrigger.dataset.modal);
  }

  const faqButton = event.target.closest(".question");
  if (faqButton) toggleFaq(faqButton);
});

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModal(overlay.id);
  });
});

document.getElementById("lightbox").addEventListener("click", (event) => {
  if (event.target.id === "lightbox") closeLightbox();
});

document.getElementById("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = [
    "Hello Sundarban Nova Travels,",
    "",
    "I want to book:",
    `Package: ${document.getElementById("b_pkg").value}`,
    `Name: ${document.getElementById("b_name").value}`,
    `Phone: ${document.getElementById("b_phone").value}`,
    `Date: ${document.getElementById("b_date").value}`,
    `Guests: ${document.getElementById("b_guests").value}`,
    `Pickup: ${document.getElementById("b_pickup").value}`,
    `Food: ${document.getElementById("b_food").value}`,
    `Message: ${document.getElementById("b_msg").value || "-"}`,
    "",
    "Please share availability and payment details.",
  ].join("\n");
  window.open(buildWhatsAppUrl(message), "_blank");
  closeModal("bookModal");
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = [
    "Hello Nova Team,",
    `Name: ${form.get("name")}`,
    `Phone: ${form.get("phone")}`,
    `Package: ${form.get("pkg")}`,
    `Pickup: ${form.get("pickup")}`,
    `Message: ${form.get("msg") || "-"}`,
  ].join("\n");
  window.open(buildWhatsAppUrl(message), "_blank");
});

document.getElementById("copyUpi").addEventListener("click", async (event) => {
  try {
    await navigator.clipboard.writeText("9907947625@okaxis");
    event.currentTarget.textContent = "Copied";
    setTimeout(() => { event.currentTarget.textContent = "Copy UPI"; }, 1800);
  } catch {
    event.currentTarget.textContent = "9907947625@okaxis";
  }
});

document.getElementById("navToggle").addEventListener("click", (event) => {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", nav.classList.contains("open").toString());
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => document.getElementById("mainNav").classList.remove("open"));
});

document.getElementById("yr").textContent = new Date().getFullYear();
document.getElementById("b_date").min = new Date().toISOString().split("T")[0];

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".modal-overlay.open").forEach((modal) => closeModal(modal.id));
  closeLightbox();
});

renderPackages();
renderMenu("2D / 1N");
renderDestinations();
renderGallery();
renderReviews();
renderFAQs();
