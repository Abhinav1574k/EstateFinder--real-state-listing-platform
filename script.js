const grid = document.getElementById("propertyGrid"),
  count = document.getElementById("resultCount"),
  empty = document.getElementById("emptyState"),
  form = document.getElementById("filterForm");
let map = L.map("map").setView([20.5937, 78.9629], 5),
  markers = L.layerGroup().addTo(map);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);
const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
function render(list) {
  grid.innerHTML = "";
  count.textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;
  empty.classList.toggle("hidden", list.length > 0);
  list.forEach((p) => {
    const c = document.createElement("article");
    c.className = "card";
    c.innerHTML = `<img src="${p.images[0]}" alt="${p.title}" loading="lazy"><div class="body"><b class="price">${money(p.price)}</b><h3>${p.title}</h3><p class="muted">${p.area}, ${p.city}</p><div class="meta">🛏 ${p.bedrooms} Beds · 🛁 ${p.bathrooms} Baths · 📐 ${p.areaSqft} sq ft</div><div class="cardfoot"><span class="badge">${p.type}</span><a href="property.html?id=${p.id}">View Details →</a></div></div>`;
    grid.appendChild(c);
  });
}
function updateMap(list) {
  markers.clearLayers();
  if (!list.length) return;
  const bounds = [];
  list.forEach((p) => {
    const m = L.marker([p.lat, p.lng]).addTo(markers);
    m.bindPopup(
      `<b>${p.title}</b><br>${p.area}, ${p.city}<br>${money(p.price)}<br><a href="property.html?id=${p.id}">View details</a>`,
    );
    bounds.push([p.lat, p.lng]);
  });
  map.fitBounds(bounds, { padding: [30, 30] });
}
function apply() {
  const q = document.getElementById("search").value.trim().toLowerCase(),
    min = +document.getElementById("minPrice").value || 0,
    max = +document.getElementById("maxPrice").value || Infinity,
    beds = +document.getElementById("bedrooms").value || 0,
    type = document.getElementById("type").value;
  const list = properties.filter(
    (p) =>
      `${p.title} ${p.city} ${p.area} ${p.type}`.toLowerCase().includes(q) &&
      p.price >= min &&
      p.price <= max &&
      p.bedrooms >= beds &&
      (!type || p.type === type),
  );
  render(list);
  updateMap(list);
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  apply();
});
document.getElementById("clearBtn").onclick = () => {
  form.reset();
  apply();
};
render(properties);
updateMap(properties);
