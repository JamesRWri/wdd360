const cart = [
  { id: 1, name: "Astro Sticker", price: "5" },
  { id: 2, name: "Astro T-Shirt", price: "25" },
  { id: 3, name: "Astro Mug", price: "12" }
];

const cartContainer = document.getElementById("cart");

if (cartContainer) {
  let html = "<ul>";
  cart.forEach(item => {
    html += `<li>${item.name} - $${item.price}</li>`;
  });
  html += "</ul>";
  cartContainer.innerHTML = html;
}