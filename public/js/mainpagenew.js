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

const faqs = [
  { q: "What is the best time to visit Sundarban?", a: "October to March has pleasant weather and calm river conditions. Monsoon is lush and quieter, while summer can be hot but good for birding." },
  { q: "Is Sundarban safe for family and kids?", a: "Yes. Licensed boats include life jackets, first aid, fire safety equipment and experienced local crew. Family-friendly meal options are available." },
  { q: "Do you provide pickup from Kolkata?", a: "Yes. You can choose Kolkata to Kolkata, Canning to Canning, Godkhali to Godkhali, or a custom pickup for groups." },
  { q: "What food is included?", a: "Packages include Bengali meals with fish, chicken, prawns or vegetarian options. Jain and kids meals can be arranged with advance notice." },
  { q: "Is tiger sighting guaranteed?", a: "No responsible operator can guarantee wild sightings. The itinerary is planned around tides, timing and experienced local tracking." },
];

let activePackages = packages;

function renderPackages(packageList = activePackages) {
  const grid = document.getElementById("packageGrid");
  grid.innerHTML = packageList.map((p) => `
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
          <button class="btn btn-primary" data-pkg="${p.title}" data-modal="bookModal">Book this tour</button>
        </div>
      </div>
    </article>
  `).join("");
}

function syncBookingOptions() {
  document.getElementById("b_pkg").innerHTML = activePackages.map((tour) => `<option value="${tour.title}">${tour.title} — Rs. ${tour.price}</option>`).join("");
}

async function loadTours() {
  try {
    const response = await fetch("/api/tours");
    const tours = await response.json();
    if (!response.ok || !tours.length) throw new Error("Tours unavailable");
    activePackages = tours.map((tour) => ({ title: tour.title, dur: tour.duration, price: new Intl.NumberFormat("en-IN").format(tour.price), tag: "Available", img: tour.image || photos.boat, includes: tour.highlights?.length ? tour.highlights : ["Local guide", "Boat safari", "Meals"] }));
    renderPackages();
  } catch { /* Use the local display fallback until tours are configured. */ }
  syncBookingOptions();
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

function renderGallery(images = gallery) {
  const masonry = document.getElementById("masonry");
  masonry.innerHTML = images.map((image, index) => { const src = typeof image === "string" ? image : image.path; const alt = typeof image === "string" ? `Sundarban travel moment ${index + 1}` : image.alt; return `<div class="masonry-item"><img src="${src}" alt="${alt}" loading="lazy"></div>`; }).join("");
  masonry.querySelectorAll(".masonry-item").forEach((item) => {
    item.addEventListener("click", () => openLightbox(item.querySelector("img").src));
  });
}

async function loadGallery() {
  try { const response = await fetch("/api/media"); if (!response.ok) throw new Error(); const images = await response.json(); if (images.length) renderGallery(images); else renderGallery(); }
  catch { renderGallery(); }
}

async function loadSiteSettings() {
  try { const response = await fetch("/api/settings"); if (!response.ok) return; const settings = await response.json(); ["heroEyebrow", "heroTitle", "heroText"].forEach((id) => { if (settings[id]) document.getElementById(id).textContent = settings[id]; }); }
  catch { /* Static page copy remains visible. */ }
}

function renderReviews(reviews = []) {
  const grid = document.getElementById("reviewGrid");
  if (!reviews.length) {
    grid.innerHTML = '<div class="review-empty">No verified reviews have been published yet. Be the first guest to share your experience.</div>';
    return;
  }
  grid.innerHTML = reviews.map((review) => `
    <article class="review-card">
      <div class="stars">${"★".repeat(review.rating)}</div>
      <div class="quote">“${review.comment}”</div>
      <div class="author">
        <div class="avatar">${review.name[0]}</div>
        <div><strong>${review.name}</strong><div class="desc">${review.tour || "Sundarban traveller"}</div></div>
      </div>
    </article>
  `).join("");
}

async function loadReviews() {
  try {
    const response = await fetch("/api/reviews");
    if (!response.ok) throw new Error("Reviews unavailable");
    renderReviews(await response.json());
  } catch { renderReviews(); }
}

function renderFAQs() {
  document.getElementById("faqAcc").innerHTML = faqs.map((faq, index) => `
    <div class="faq-item ${index === 0 ? "open" : ""}" style="--faq-delay:${index * 90}ms">
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

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3800);
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

document.getElementById("bookingForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById("bookingStatus");
  const submit = form.querySelector('button[type="submit"]');
  status.textContent = "Saving your booking request…";
  status.classList.remove("error");
  submit.disabled = true;
  try {
    const response = await fetch("/api/bookings/public", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customerName: document.getElementById("b_name").value.trim(), contactPhone: document.getElementById("b_phone").value.trim(), contactEmail: document.getElementById("b_email").value.trim(), package: document.getElementById("b_pkg").value, travelDate: document.getElementById("b_date").dataset.iso || document.getElementById("b_date").value, numberOfPeople: Number(document.getElementById("b_guests").value), pickup: document.getElementById("b_pickup").value, specialRequests: `${document.getElementById("b_food").value}. ${document.getElementById("b_msg").value}`.trim(), marketingConsent: document.getElementById("b_marketing").checked }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "We could not save your booking.");
    status.textContent = `Request received. Estimated total: Rs. ${new Intl.NumberFormat("en-IN").format(data.totalPrice)}.`;
    form.reset();
    document.getElementById("b_date").dataset.iso = "";
    closeModal("bookModal");
    document.getElementById("successOverlay").classList.add("open");
  } catch (error) { status.textContent = error.message; status.classList.add("error"); }
  finally { submit.disabled = false; }
});

document.getElementById("reviewForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget, status = document.getElementById("reviewStatus"), submit = form.querySelector('button[type="submit"]');
  submit.disabled = true; status.textContent = "Submitting your review…"; status.classList.remove("error");
  try {
    const data = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Unable to submit review.");
    form.reset(); status.textContent = result.message; showToast("Thank you for sharing your experience.");
  } catch (error) { status.textContent = error.message; status.classList.add("error"); }
  finally { submit.disabled = false; }
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

function initCalendar() {
  const picker = document.getElementById("datePicker");
  const input = document.getElementById("b_date");
  const popover = document.getElementById("calendarPopover");
  const trigger = picker.querySelector(".date-trigger");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let shown = new Date(today.getFullYear(), today.getMonth(), 1);
  const iso = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const render = () => {
    const year = shown.getFullYear(), month = shown.getMonth();
    const leading = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const cells = Array.from({ length: leading }, () => "<span></span>");
    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day), value = iso(date), disabled = date < today;
      cells.push(`<button class="calendar-day ${input.dataset.iso === value ? "selected" : ""}" type="button" data-date="${value}" ${disabled ? "disabled" : ""}>${day}</button>`);
    }
    const monthName = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(shown);
    popover.innerHTML = `<div class="calendar-head"><button class="calendar-nav" type="button" data-month="-1" aria-label="Previous month">‹</button><span>${monthName}</span><button class="calendar-nav" type="button" data-month="1" aria-label="Next month">›</button></div><div class="calendar-weekdays"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div><div class="calendar-grid">${cells.join("")}</div>`;
  };
  const toggle = () => { popover.classList.toggle("open"); input.setAttribute("aria-expanded", popover.classList.contains("open").toString()); if (popover.classList.contains("open")) render(); };
  trigger.addEventListener("click", toggle);
  input.addEventListener("click", toggle);
  popover.addEventListener("click", (event) => {
    if (event.target.dataset.month) { shown.setMonth(shown.getMonth() + Number(event.target.dataset.month)); return render(); }
    if (event.target.dataset.date) { const selected = event.target.dataset.date; input.dataset.iso = selected; input.value = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${selected}T00:00:00`)); popover.classList.remove("open"); input.setAttribute("aria-expanded", "false"); }
  });
  document.addEventListener("click", (event) => { if (!event.composedPath().includes(picker)) { popover.classList.remove("open"); input.setAttribute("aria-expanded", "false"); } });
}

document.getElementById("successClose").addEventListener("click", () => document.getElementById("successOverlay").classList.remove("open"));
document.getElementById("successOverlay").addEventListener("click", (event) => { if (event.target.id === "successOverlay") event.currentTarget.classList.remove("open"); });

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".modal-overlay.open").forEach((modal) => closeModal(modal.id));
  document.getElementById("successOverlay").classList.remove("open");
  closeLightbox();
});

renderPackages();
loadTours();
renderMenu("2D / 1N");
renderDestinations();
loadGallery();
loadSiteSettings();
loadReviews();
renderFAQs();
initCalendar();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.12 });
document.querySelectorAll("main section").forEach((section) => { section.classList.add("reveal"); revealObserver.observe(section); });

if (!sessionStorage.getItem("novaBookingPromptShown")) {
  window.setTimeout(() => { openModal("bookModal"); sessionStorage.setItem("novaBookingPromptShown", "true"); }, 10000);
}
