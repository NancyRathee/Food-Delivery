// Enhanced Product data with more variety
const homeKitchenItems = [
  {id: 1, name: "Margherita Pizza", price: "₹190", img:"image2.jpg", rating:4.7, time:"30-45 min", discount:"50%", category: "pizza", description: "Classic pizza with fresh tomatoes and mozzarella"},
  {id: 2, name: "Paneer Butter Masala", price: "₹123", img:"image3.jpg", rating:4.5, time:"25-40 min", category: "main course", description: "Cottage cheese in rich buttery tomato gravy"},
  {id: 3, name: "Chicken Biryani", price: "₹220", img:"image4.jpg", rating:4.8, time:"40-55 min", discount:"20%", category: "biryani", description: "Aromatic basmati rice with tender chicken"},
  {id: 4, name: "Vegetable Noodles", price: "₹150", img:"image5.jpg", rating:4.2, time:"20-35 min", category: "chinese", description: "Stir-fried noodles with fresh vegetables"},
  {id: 5, name: "Chocolate Brownie", price: "₹99", img:"image6.jpg", rating:4.6, time:"15-25 min", discount:"50%", category: "dessert", description: "Rich chocolate brownie with walnuts"},
  {id: 6, name: "Masala Dosa", price: "₹80", img:"image7.jpg", rating:4.4, time:"20-30 min", category: "south indian", description: "Crispy crepe with spiced potato filling"},
  {id: 7, name: "Butter Chicken", price: "₹280", img:"image8.jpg", rating:4.9, time:"35-50 min", discount:"20%", category: "main course", description: "Tender chicken in creamy tomato sauce"},
  {id: 8, name: "Gulab Jamun", price: "₹120", img:"image9.jpg", rating:4.7, time:"10-20 min", discount:"50%", category: "dessert", description: "Soft milk balls in sugar syrup"},
  {id: 9, name: "Chicken Tikka", price: "₹180", img:"image10.jpg", rating:4.5, time:"25-40 min", discount:"50%", category: "starter", description: "Grilled chicken chunks with spices"},
  {id: 10, name: "Dal Makhani", price: "₹140", img:"image11.jpg", rating:4.3, time:"30-45 min", category: "main course", description: "Creamy black lentils with butter"},
  {id: 11, name: "Samosa", price: "₹40", img:"image12.jpg", rating:4.6, time:"15-25 min", discount:"20%", category: "snack", description: "Crispy pastry with spiced potatoes"},
  {id: 12, name: "Mango Lassi", price: "₹60", img:"image13.jpg", rating:4.4, time:"5-15 min", category: "beverage", description: "Refreshing yogurt drink with mango"}
];

const popularItems = [
  {id: 13, name: "Hyderabadi Biryani", price: "₹240", img:"image14.jpg", rating:4.8, time:"45-60 min", category: "biryani", description: "Spicy biryani with authentic hyderabadi flavors"},
  {id: 14, name: "Tandoori Chicken", price: "₹184", img:"image15.jpg", rating:4.3, time:"30-45 min", discount:"20%", category: "starter", description: "Chicken marinated in yogurt and spices"},
  {id: 15, name: "Chilli Chicken", price: "₹116", img:"image16.jpg", rating:4.1, time:"25-40 min", discount:"50%", category: "chinese", description: "Crispy chicken in spicy sauce"}
];

// Enhanced Cart state with order history
let cart = [];
let cartCount = 0;
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  renderHomeKitchenItems();
  renderPopularItems();
  setupCartFunctionality();
  setupSearchFunctionality();
  setupCategoryFilter();
  updateCartCount();
  updateOrderHistory();
  setupFavoriteFunctionality();
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  let starsHtml = '';
  for(let i = 0; i < fullStars; i++){
    starsHtml += "<span class='star'>★</span>";
  }
  if(halfStar) starsHtml += "<span class='star'>☆</span>";
  return starsHtml;
}

// Enhanced Home Kitchen Items Rendering with favorites
function renderHomeKitchenItems(category = 'all') {
  const kitchenGrid = document.getElementById('homeKitchenGrid');
  kitchenGrid.innerHTML = '';
  
  const filteredItems = category === 'all' 
    ? homeKitchenItems 
    : homeKitchenItems.filter(item => item.category === category);
  
  filteredItems.forEach(item => {
    const isFavorite = favorites.includes(item.id);
    kitchenGrid.innerHTML += `
      <div class="product-card" data-id="${item.id}">
        ${item.discount ? `<div class="discount-badge">${item.discount}</div>` : ''}
        <div class="favorite-icon ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${item.id})">
          ♥
        </div>
        <img src="${item.img}" alt="${item.name}" />
        <div class="product-name">${item.name}</div>
        <div class="price">${item.price}</div>
        <div class="food-description">${item.description}</div>
        <div class="rating-time">
          ${generateStars(item.rating)}<span>${item.rating}</span>
          <span>•</span><span>${item.time}</span>
        </div>
        <button class="add-cart-btn" onclick="addToCart(${item.id})" title="Add to cart">+</button>
      </div>
    `;
  });
}

// Enhanced Popular Items Carousel
function renderPopularItems() {
  const carouselList = document.getElementById('carouselList');
  carouselList.innerHTML = '';
  
  popularItems.forEach(item => {
    const isFavorite = favorites.includes(item.id);
    carouselList.innerHTML += `
      <div class="carousel-item" data-id="${item.id}">
        ${item.discount ? `<div class="discount-badge">${item.discount}</div>` : ''}
        <div class="favorite-icon ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${item.id})">
          ♥
        </div>
        <img src="${item.img}" alt="${item.name}" />
        <div class="name">${item.name}</div>
        <div class="price">${item.price}</div>
        <div class="food-description">${item.description}</div>
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
          <button class="add-cart-btn-small" onclick="addToCart(${item.id})" title="Add to cart">+</button>
        </div>
      </div>
    `;
  });
}

// Setup category filter
function setupCategoryFilter() {
  const categories = ['all', 'pizza', 'biryani', 'main course', 'chinese', 'dessert', 'south indian', 'starter', 'snack', 'beverage'];
  const categoryContainer = document.createElement('div');
  categoryContainer.className = 'food-categories';
  
  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = `category-btn ${category === 'all' ? 'active' : ''}`;
    button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    button.setAttribute('data-category', category);
    button.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderHomeKitchenItems(category);
    });
    categoryContainer.appendChild(button);
  });
  
  document.querySelector('.home-kitchen-section').insertBefore(categoryContainer, document.getElementById('homeKitchenGrid'));
}

// Enhanced cart functionality
function setupCartFunctionality() {
  createCartModal();
  
  const cartIcon = document.querySelector('.header-icons svg:last-child');
  cartIcon.addEventListener('click', showCart);
}

function createCartModal() {
  const cartModal = document.createElement('div');
  cartModal.className = 'cart-modal';
  cartModal.innerHTML = `
    <div class="cart-content">
      <div class="cart-header">
        <h2>🛒 Your Cart</h2>
        <button class="close-cart">&times;</button>
      </div>
      <div class="cart-items">
        <p class="empty-cart">Your cart is empty</p>
      </div>
      <div class="cart-summary">
        <div class="cart-subtotal">
          <span>Subtotal:</span>
          <span id="cart-subtotal-price">₹0</span>
        </div>
        <div class="cart-delivery">
          <span>Delivery Fee:</span>
          <span id="cart-delivery-fee">₹30</span>
        </div>
        <div class="cart-total">
          <span>Total:</span>
          <span id="cart-total-price">₹30</span>
        </div>
      </div>
      <div class="cart-actions">
        <button class="checkout-btn" onclick="checkout()">
          <span>🚀 Proceed to Checkout</span>
          <span id="checkout-total">₹30</span>
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(cartModal);
  
  cartModal.addEventListener('click', function(e) {
    if (e.target === cartModal || e.target.classList.contains('close-cart')) {
      hideCart();
    }
  });
}

function showCart() {
  updateCartDisplay();
  document.querySelector('.cart-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function hideCart() {
  document.querySelector('.cart-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Enhanced add to cart with animations
function addToCart(itemId) {
  const allItems = [...homeKitchenItems, ...popularItems];
  const item = allItems.find(i => i.id === itemId);
  
  if (item) {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...item,
        quantity: 1
      });
    }
    
    updateCartCount();
    showEnhancedNotification(`${item.name} added to cart! 🎉`, 'success');
    
    // Add animation to cart icon
    const cartIcon = document.querySelector('.header-icons svg:last-child');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
      cartIcon.style.transform = 'scale(1)';
    }, 300);
    
    if (document.querySelector('.cart-modal').style.display === 'flex') {
      updateCartDisplay();
    }
  }
}

function removeFromCart(itemId) {
  const item = cart.find(item => item.id === itemId);
  cart = cart.filter(item => item.id !== itemId);
  updateCartCount();
  updateCartDisplay();
  if (item) {
    showEnhancedNotification(`${item.name} removed from cart`, 'warning');
  }
}

function updateCartQuantity(itemId, newQuantity) {
  const item = cart.find(item => item.id === itemId);
  
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      item.quantity = newQuantity;
      updateCartDisplay();
    }
  }
}

function updateCartCount() {
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  let cartCountBadge = document.querySelector('.cart-count');
  const cartIcon = document.querySelector('.header-icons svg:last-child').parentNode;
  
  if (!cartCountBadge) {
    cartCountBadge = document.createElement('div');
    cartCountBadge.className = 'cart-count';
    cartIcon.appendChild(cartCountBadge);
  }
  
  cartCountBadge.textContent = cartCount;
  cartCountBadge.style.display = cartCount > 0 ? 'flex' : 'none';
  
  // Add pulse animation when count changes
  if (cartCount > 0) {
    cartCountBadge.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
      cartCountBadge.style.animation = '';
    }, 500);
  }
}

// Enhanced cart display
function updateCartDisplay() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const subtotalElement = document.getElementById('cart-subtotal-price');
  const totalElement = document.getElementById('cart-total-price');
  const checkoutTotalElement = document.getElementById('checkout-total');
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-cart-icon">🛒</div>
        <p>Your cart is empty</p>
        <small>Add some delicious items to get started!</small>
      </div>
    `;
    subtotalElement.textContent = '₹0';
    totalElement.textContent = '₹30';
    checkoutTotalElement.textContent = '₹30';
    return;
  }
  
  let subtotal = 0;
  cartItemsContainer.innerHTML = '';
  
  cart.forEach(item => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    const itemTotal = price * item.quantity;
    subtotal += itemTotal;
    
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <div class="item-image">
          <img src="${item.img}" alt="${item.name}" />
        </div>
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-price">${item.price}</div>
          <div class="item-description">${item.description}</div>
        </div>
        <div class="item-quantity">
          <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">🗑️</button>
        </div>
        <div class="item-total">₹${itemTotal}</div>
      </div>
    `;
  });
  
  const deliveryFee = 30;
  const total = subtotal + deliveryFee;
  
  subtotalElement.textContent = `₹${subtotal}`;
  totalElement.textContent = `₹${total}`;
  checkoutTotalElement.textContent = `₹${total}`;
}

// Enhanced search functionality
function setupSearchFunctionality() {
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('input', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

function performSearch() {
  const searchInput = document.querySelector('.search-bar input');
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (searchTerm === '') {
    renderHomeKitchenItems();
    return;
  }
  
  const allItems = [...homeKitchenItems, ...popularItems];
  const filteredItems = allItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm)
  );
  
  const kitchenGrid = document.getElementById('homeKitchenGrid');
  kitchenGrid.innerHTML = '';
  
  if (filteredItems.length === 0) {
    kitchenGrid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <p>No items found matching "${searchTerm}"</p>
        <small>Try searching for something else</small>
      </div>
    `;
    return;
  }
  
  filteredItems.forEach(item => {
    const isFavorite = favorites.includes(item.id);
    kitchenGrid.innerHTML += `
      <div class="product-card" data-id="${item.id}">
        ${item.discount ? `<div class="discount-badge">${item.discount}</div>` : ''}
        <div class="favorite-icon ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${item.id})">
          ♥
        </div>
        <img src="${item.img}" alt="${item.name}" />
        <div class="product-name">${item.name}</div>
        <div class="price">${item.price}</div>
        <div class="food-description">${item.description}</div>
        <div class="rating-time">
          ${generateStars(item.rating)}<span>${item.rating}</span>
          <span>•</span><span>${item.time}</span>
        </div>
        <button class="add-cart-btn" onclick="addToCart(${item.id})" title="Add to cart">+</button>
      </div>
    `;
  });
}

// Enhanced checkout with order tracking
function checkout() {
  if (cart.length === 0) {
    showEnhancedNotification('Your cart is empty! Add some items first.', 'error');
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + (price * item.quantity);
  }, 0);
  
  const total = subtotal + 30;
  const orderId = 'ORD' + Date.now().toString().slice(-6);
  
  const order = {
    id: orderId,
    items: [...cart],
    subtotal: subtotal,
    deliveryFee: 30,
    total: total,
    date: new Date().toLocaleString(),
    status: 'confirmed',
    estimatedDelivery: new Date(Date.now() + 45 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  };
  
  orderHistory.unshift(order);
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  
  showOrderConfirmation(order);
  
  // Clear cart
  cart = [];
  updateCartCount();
  updateCartDisplay();
  hideCart();
  
  // Update order history display
  updateOrderHistory();
}

function showOrderConfirmation(order) {
  const confirmationModal = document.createElement('div');
  confirmationModal.className = 'confirmation-modal';
  confirmationModal.innerHTML = `
    <div class="confirmation-content">
      <div class="confirmation-header">
        <div class="confirmation-icon">🎉</div>
        <h2>Order Confirmed!</h2>
        <button class="close-confirmation">&times;</button>
      </div>
      <div class="confirmation-body">
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Estimated Delivery:</strong> ${order.estimatedDelivery}</p>
        <div class="order-summary">
          <h4>Order Summary:</h4>
          ${order.items.map(item => `
            <div class="order-item">
              <span>${item.name} x${item.quantity}</span>
              <span>₹${parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity}</span>
            </div>
          `).join('')}
          <div class="order-total">
            <strong>Total: ₹${order.total}</strong>
          </div>
        </div>
      </div>
      <div class="confirmation-actions">
        <button class="track-order-btn" onclick="trackOrder('${order.id}')">Track Order</button>
        <button class="continue-shopping-btn" onclick="closeConfirmation()">Continue Shopping</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(confirmationModal);
  
  confirmationModal.style.display = 'flex';
  document.querySelector('.close-confirmation').addEventListener('click', closeConfirmation);
  confirmationModal.addEventListener('click', function(e) {
    if (e.target === confirmationModal) {
      closeConfirmation();
    }
  });
}

function closeConfirmation() {
  const modal = document.querySelector('.confirmation-modal');
  if (modal) {
    modal.remove();
  }
}

function trackOrder(orderId) {
  showEnhancedNotification(`Tracking order ${orderId}... 🚗`, 'info');
  closeConfirmation();
}

// Enhanced notification system
function showEnhancedNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `enhanced-notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${getNotificationIcon(type)}</span>
      <span class="notification-message">${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 4000);
}

function getNotificationIcon(type) {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  return icons[type] || 'ℹ️';
}

// Favorite functionality
function setupFavoriteFunctionality() {
  // Add favorite icon to header
  const headerIcons = document.querySelector('.header-icons');
  const favoriteIcon = document.createElement('div');
  favoriteIcon.className = 'favorite-header-icon';
  favoriteIcon.innerHTML = '♥';
  favoriteIcon.title = 'Favorites';
  favoriteIcon.addEventListener('click', showFavorites);
  headerIcons.insertBefore(favoriteIcon, headerIcons.querySelector('svg:last-child'));
}

function toggleFavorite(itemId) {
  const index = favorites.indexOf(itemId);
  if (index > -1) {
    favorites.splice(index, 1);
    showEnhancedNotification('Removed from favorites', 'info');
  } else {
    favorites.push(itemId);
    showEnhancedNotification('Added to favorites! ❤️', 'success');
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  
  // Update UI
  const favoriteIcons = document.querySelectorAll(`.favorite-icon[onclick="toggleFavorite(${itemId})"]`);
  favoriteIcons.forEach(icon => {
    icon.classList.toggle('active');
  });
}

function showFavorites() {
  const favoriteItems = [...homeKitchenItems, ...popularItems].filter(item => 
    favorites.includes(item.id)
  );
  
  if (favoriteItems.length === 0) {
    showEnhancedNotification('No favorites yet! ❤️', 'info');
    return;
  }
  
  // Render favorites in home kitchen grid
  const kitchenGrid = document.getElementById('homeKitchenGrid');
  kitchenGrid.innerHTML = '';
  
  favoriteItems.forEach(item => {
    kitchenGrid.innerHTML += `
      <div class="product-card" data-id="${item.id}">
        ${item.discount ? `<div class="discount-badge">${item.discount}</div>` : ''}
        <div class="favorite-icon active" onclick="toggleFavorite(${item.id})">
          ♥
        </div>
        <img src="${item.img}" alt="${item.name}" />
        <div class="product-name">${item.name}</div>
        <div class="price">${item.price}</div>
        <div class="food-description">${item.description}</div>
        <div class="rating-time">
          ${generateStars(item.rating)}<span>${item.rating}</span>
          <span>•</span><span>${item.time}</span>
        </div>
        <button class="add-cart-btn" onclick="addToCart(${item.id})" title="Add to cart">+</button>
      </div>
    `;
  });
  
  showEnhancedNotification(`Showing ${favoriteItems.length} favorite items! ❤️`, 'success');
}

// Order history functionality
function updateOrderHistory() {
  if (orderHistory.length === 0) return;
  
  // Create order history section if it doesn't exist
  let orderHistorySection = document.querySelector('.order-history-section');
  if (!orderHistorySection) {
    orderHistorySection = document.createElement('section');
    orderHistorySection.className = 'order-history-section';
    orderHistorySection.innerHTML = `
      <h2 class="section-title">Recent Orders</h2>
      <div class="order-history" id="orderHistory"></div>
    `;
    document.querySelector('.popular-section').insertAdjacentElement('afterend', orderHistorySection);
  }
  
  const orderHistoryContainer = document.getElementById('orderHistory');
  orderHistoryContainer.innerHTML = '';
  
  // Show only last 3 orders
  const recentOrders = orderHistory.slice(0, 3);
  
  recentOrders.forEach(order => {
    orderHistoryContainer.innerHTML += `
      <div class="order-history-item">
        <div class="order-header">
          <span class="order-id">${order.id}</span>
          <span class="order-date">${order.date}</span>
        </div>
        <div class="order-status">
          <span class="status-badge ${order.status}">${order.status}</span>
          <span class="order-total">₹${order.total}</span>
        </div>
        <div class="order-items-preview">
          ${order.items.slice(0, 2).map(item => `
            <span class="order-item-preview">${item.name} x${item.quantity}</span>
          `).join('')}
          ${order.items.length > 2 ? `<span class="more-items">+${order.items.length - 2} more</span>` : ''}
        </div>
      </div>
    `;
  });
}

// Enhanced quantity functions
window.incrementQuantity = function(el) {
  const display = el.previousElementSibling;
  display.textContent = parseInt(display.textContent) + 1;
  display.style.transform = 'scale(1.2)';
  setTimeout(() => {
    display.style.transform = 'scale(1)';
  }, 200);
};

window.decrementQuantity = function(el) {
  const display = el.nextElementSibling;
  if (parseInt(display.textContent) > 1) {
    display.textContent = parseInt(display.textContent) - 1;
    display.style.transform = 'scale(0.8)';
    setTimeout(() => {
      display.style.transform = 'scale(1)';
    }, 200);
  }
};

// Carousel functionality
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

if (carouselPrev && carouselNext) {
  carouselPrev.addEventListener('click', () => {
    const carouselList = document.getElementById('carouselList');
    carouselList.scrollBy({ left: -240, behavior: 'smooth' });
  });
  
  carouselNext.addEventListener('click', () => {
    const carouselList = document.getElementById('carouselList');
    carouselList.scrollBy({ left: 240, behavior: 'smooth' });
  });
}

// Contact form handling with enhanced feedback
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const name = formData.get('name');
  
  showEnhancedNotification(`Thanks ${name}! We'll get back to you soon. 📧`, 'success');
  e.target.reset();
});

// Add enhanced CSS styles
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0,-8px,0); }
    70% { transform: translate3d(0,-4px,0); }
    90% { transform: translate3d(0,-2px,0); }
  }
  
  .food-categories {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .category-btn {
    background: white;
    border: 2px solid #1ac073;
    color: #1ac073;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }
  
  .category-btn.active,
  .category-btn:hover {
    background: #1ac073;
    color: white;
  }
  
  .favorite-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255,255,255,0.9);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 2;
  }
  
  .favorite-icon.active {
    background: #ff6b6b;
    color: white;
    animation: bounce 0.5s;
  }
  
  .favorite-header-icon {
    cursor: pointer;
    font-size: 20px;
    color: white;
    transition: color 0.3s ease;
  }
  
  .favorite-header-icon:hover {
    color: #ff6b6b;
  }
  
  .food-description {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 10px;
    line-height: 1.3;
  }
  
  .cart-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
  }
  
  .cart-content {
    background: white;
    width: 90%;
    max-width: 500px;
    border-radius: 15px;
    padding: 20px;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 15px;
  }
  
  .close-cart {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
  }
  
  .cart-item {
    display: grid;
    grid-template-columns: 60px 1fr auto auto;
    gap: 15px;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .item-image img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .item-details {
    flex: 1;
  }
  
  .item-name {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .item-price {
    color: #1ac073;
    font-weight: 600;
  }
  
  .item-description {
    font-size: 0.8rem;
    color: #666;
    margin-top: 5px;
  }
  
  .item-quantity {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .quantity-btn {
    background: #f3ba00;
    border: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
  
  .remove-btn {
    background: #ff6b6b;
    color: white;
    border: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .item-total {
    font-weight: bold;
    color: #1ac073;
  }
  
  .cart-summary {
    margin: 20px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
  }
  
  .cart-subtotal,
  .cart-delivery,
  .cart-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  
  .cart-total {
    font-weight: bold;
    font-size: 1.1rem;
    border-top: 1px solid #ddd;
    padding-top: 8px;
    margin-top: 8px;
  }
  
  .cart-actions {
    margin-top: 20px;
  }
  
  .checkout-btn {
    width: 100%;
    background: linear-gradient(135deg, #1ac073, #2ebf91);
    color: white;
    border: none;
    padding: 15px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.3s ease;
  }
  
  .checkout-btn:hover {
    transform: translateY(-2px);
  }
  
  .empty-cart-state {
    text-align: center;
    padding: 40px 20px;
    color: #666;
  }
  
  .empty-cart-icon {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  .no-results {
    text-align: center;
    padding: 40px 20px;
    color: #666;
    grid-column: 1 / -1;
  }
  
  .no-results-icon {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  .enhanced-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 1100;
    animation: slideIn 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    border-left: 4px solid;
  }
  
  .enhanced-notification.success {
    border-left-color: #1ac073;
  }
  
  .enhanced-notification.error {
    border-left-color: #ff6b6b;
  }
  
  .enhanced-notification.warning {
    border-left-color: #f3ba00;
  }
  
  .enhanced-notification.info {
    border-left-color: #2ebf91;
  }
  
  .notification-close {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #666;
  }
  
  .confirmation-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1200;
    justify-content: center;
    align-items: center;
  }
  
  .confirmation-content {
    background: white;
    width: 90%;
    max-width: 400px;
    border-radius: 15px;
    padding: 20px;
  }
  
  .confirmation-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .confirmation-icon {
    font-size: 48px;
    margin-bottom: 10px;
  }
  
  .order-history-section {
    margin: 3rem 0;
    padding: 0 1rem;
  }
  
  .order-history {
    display: grid;
    gap: 15px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .order-history-item {
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .order-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .status-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  .status-badge.confirmed {
    background: #e3f2fd;
    color: #1976d2;
  }
  
  .order-items-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .order-item-preview {
    background: #f8f9fa;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
  }
  
  .more-items {
    color: #666;
    font-size: 0.8rem;
  }
  
  @media (max-width: 768px) {
    .cart-item {
      grid-template-columns: 50px 1fr;
      gap: 10px;
    }
    
    .item-quantity,
    .item-total {
      grid-column: 2;
      justify-self: start;
    }
    
    .food-categories {
      justify-content: flex-start;
      overflow-x: auto;
      padding-bottom: 10px;
    }
  }
`;
document.head.appendChild(enhancedStyles);