const root = document.getElementById("detail"),
  id = Number(new URLSearchParams(location.search).get("id")),
  p = properties.find((x) => x.id === id),
  money = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);
if (!p) {
  root.innerHTML = `<div class="notfound"><h1>Property not found</h1><a class="btn primary" href="index.html">Back to listings</a></div>`;
} else {
  root.innerHTML = `<a class="back" href="index.html">← Back to listings</a><section class="detail"><div class="gallery">${p.images.map((x, i) => `<img class="${i === 0 ? "featured" : ""}" src="${x}" alt="${p.title} image ${i + 1}">`).join("")}</div><div class="detailbody"><span class="badge">${p.type}</span><h1>${p.title}</h1><p class="muted">📍 ${p.area}, ${p.city}</p><div class="detailprice">${money(p.price)}</div><div class="detailmeta"><div><b>${p.bedrooms}</b><small>Bedrooms</small></div><div><b>${p.bathrooms}</b><small>Bathrooms</small></div><div><b>${p.areaSqft}</b><small>Sq. Ft.</small></div></div><h2>About this property</h2><p class="description">${p.description}</p><a class="btn primary" target="_blank" rel="noopener" href="https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=15/${p.lat}/${p.lng}">Open Location</a></div></section>`;
}
