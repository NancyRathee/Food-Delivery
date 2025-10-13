// Product data
const homeKitchenItems = [
  {name: "Home made pizza", price: "₹190", img:"image2.jpg", rating:4.7, time:"50-79 min", discount:"50%"},
  {name: "Home made pizza", price: "₹123", img:"image3.jpg", rating:4.7, time:"50-79 min"},
  {name: "Home made pizza", price: "₹190", img:"image4.jpg", rating:4.7, time:"50-79 min", discount:"20%"},
  {name: "Home made pizza", price: "₹190", img:"image5.jpg", rating:4.7, time:"50-79 min"},
  {name: "Home made pizza", price: "$19", img:"image6.jpg", rating:4.7, time:"50-79 min", discount:"50%"},
  {name: "Home made pizza", price: "₹190", img:"image7.jpg", rating:4.7, time:"50-79 min"},
  {name: "Home made pizza", price: "₹190", img:"image8.jpg", rating:4.7, time:"50-79 min", discount:"20%"},
  {name: "Home made pizza", price: "₹190", img:"image9.jpg", rating:4.7, time:"50-79 min", discount:"50%"},
  {name: "Home made pizza", price: "$19", img:"image10.jpg", rating:4.7, time:"50-79 min", discount:"50%"},
  {name: "Home made pizza", price: "₹190", img:"image11.jpg", rating:4.7, time:"50-79 min"},
  {name: "Home made pizza", price: "₹190", img:"image12.jpg", rating:4.7, time:"50-79 min", discount:"20%"},
  {name: "Home made pizza", price: "₹190", img:"image13.jpg", rating:4.7, time:"50-79"}
];
const popularItems = [
  {name: "Home made pizza", price: "₹190", img:"image14.jpg", rating:4.7, time:"50-79 min"},
  {name: "Tandoori Chicken", price: "₹184", img:"image15.jpg", rating:4.3, time:"15-29 min", discount:"20%"},
  {name: "Chilli Chicken", price: "₹116", img:"image16.jpg", rating:4.1, time:"33-40 min", discount:"50%"}
];
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  let starsHtml = '';
  for(let i=0; i<fullStars; i++){
    starsHtml += "<span class='star'>★</span>";
  }
  if(halfStar) starsHtml += "<span class='star'>☆</span>";
  return starsHtml;
}
// Home Kitchen
const kitchenGrid = document.getElementById('homeKitchenGrid');
homeKitchenItems.forEach(item => {
  kitchenGrid.innerHTML += `
    <div class="product-card">
      ${item.discount ? `<div class="discount-badge">${item.discount}</div>` : ''}
      <img src="${item.img}" alt="${item.name}" />
      <div class="product-name">${item.name}</div>
      <div class="price">${item.price}</div>
      <div class="rating-time">
        ${generateStars(item.rating)}<span>${item.rating}</span>
        <span>•</span><span>${item.time}</span>
      </div>
      <button class="add-cart-btn" title="Add to cart">+</button>
    </div>
  `;
});
// Popular Items Carousel
const carouselList = document.getElementById('carouselList');
popularItems.forEach(item => {
  carouselList.innerHTML += `
    <div class="carousel-item">
      ${item.discount ? `<div class="discount-badge">${item.discount}</div>` : ''}
      <img src="${item.img}" alt="${item.name}" />
      <div class="name">${item.name}</div>
      <div class="price">${item.price}</div>
      <div class="rating-time">
        ${generateStars(item.rating)}
        <span>${item.rating}</span>
        <span>•</span>
        <span>${item.time}</span>
      </div>
      <div class="qty-selector">
        <div class="qty-btn" onclick="decrementQuantity(this)">-</div>
        <div class="qty-display">1</div>
        <div class="qty-btn" onclick="incrementQuantity(this)">+</div>
        <button class="add-cart-btn-small" title="Add to cart">+</button>
      </div>
    </div>
  `;
});
// Qty selector functions
window.incrementQuantity = function(el) {
  const display = el.previousElementSibling;
  display.textContent = parseInt(display.textContent) + 1;
};
window.decrementQuantity = function(el) {
  const display = el.nextElementSibling;
  if (parseInt(display.textContent) > 1) {
    display.textContent = parseInt(display.textContent) - 1;
  }
};
// Carousel arrows
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
carouselPrev.addEventListener('click', () => {
  carouselList.scrollBy({ left: -240, behavior: 'smooth' });
});
carouselNext.addEventListener('click', () => {
  carouselList.scrollBy({ left: 240, behavior: 'smooth' });
});
// Video play
document.getElementById('videoWrapper').addEventListener('click', () => {
  alert('Video play button clicked! Replace with your video modal logic.');
});
// Contact form handling
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  e.target.reset();
});
