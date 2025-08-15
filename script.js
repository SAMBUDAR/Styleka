// Firebase initialization (commented out for now)
// import { app } from "./firebase-Config";
// console.log("Firebase Initialized:", app);

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click' , () => {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click' , () => {
        nav.classList.remove('active');
    })
}

// Product Search Functionality
function searchProducts() {
    console.log("Search Products called");
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) {
        console.error("Search input not found");
        return;
    }
    const searchTerm = searchInput.value.toLowerCase().trim();
    console.log("Searching for:", searchTerm);
    filterProducts();
}

function filterProducts() {
    console.log("Filter Products called");
    const searchInput = document.getElementById('productSearch');
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchResults = document.getElementById('searchResults');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!searchInput) {
        console.error('Search input not found');
        return;
    }
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedBrand = brandFilter ? brandFilter.value : '';
    const selectedPriceRange = priceFilter ? priceFilter.value : '';
    
    console.log('Filtering with:', {searchTerm, selectedBrand, selectedPriceRange});
    
    // Get all product containers - use a more specific selector
    const products = document.querySelectorAll('.pro-container .pro');
    let visibleCount = 0;
    let hasFilters = searchTerm || selectedBrand || selectedPriceRange;
    
    console.log('Found products:', products.length);
    
    products.forEach((product, index) => {
        console.log(`Processing product ${index}`);
        
        // Get product details
        const brandElement = product.querySelector('.des span');
        const nameElement = product.querySelector('.des h5');
        const priceElement = product.querySelector('.des h4');
        
        if (!brandElement || !nameElement || !priceElement) {
            console.log(`Missing elements in product ${index}`);
            return;
        }
        
        const brand = brandElement.textContent.toLowerCase().trim();
        const productName = nameElement.textContent.toLowerCase().trim();
        const priceText = priceElement.textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        
        console.log(`Product ${index}:`, {brand, productName, price});
        
        let showProduct = true;
        
        // Search term filter - more comprehensive matching
        if (searchTerm) {
            const searchWords = searchTerm.split(' ');
            const matchFound = searchWords.some(word => 
                productName.includes(word) || 
                brand.includes(word) ||
                (word === 'shirt' && (productName.includes('shirt') || productName.includes('tee'))) ||
                (word === 'tee' && productName.includes('tee')) ||
                (word === 'shoes' && productName.includes('shoes'))
            );
            
            if (!matchFound) {
                showProduct = false;
                console.log(`Product ${index} hidden - no search match`);
            }
        }
        
        // Brand filter
        if (selectedBrand && brandElement.textContent.trim() !== selectedBrand) {
            showProduct = false;
            console.log(`Product ${index} hidden - brand filter`);
        }
        
        // Price filter
        if (selectedPriceRange) {
            if (selectedPriceRange === '0-2000' && (price < 0 || price > 2000)) {
                showProduct = false;
            } else if (selectedPriceRange === '2000-5000' && (price < 2000 || price > 5000)) {
                showProduct = false;
            } else if (selectedPriceRange === '5000-10000' && (price < 5000 || price > 10000)) {
                showProduct = false;
            } else if (selectedPriceRange === '10000+' && price < 10000) {
                showProduct = false;
            }
        }
        
        // Show/hide product with multiple methods to ensure it works
        if (showProduct) {
            product.style.display = 'block';
            product.style.visibility = 'visible';
            product.classList.remove('product-hidden');
            visibleCount++;
            console.log(`Product ${index} shown`);
        } else {
            product.style.display = 'none';
            product.style.visibility = 'hidden';
            product.classList.add('product-hidden');
            console.log(`Product ${index} hidden`);
        }
    });
    
    console.log('Total visible products:', visibleCount);
    
    // Show/hide search results info
    if (searchResults) {
        if (hasFilters) {
            searchResults.style.display = 'flex';
            if (visibleCount === 0) {
                if (resultsCount) {
                    resultsCount.innerHTML = '<i class="fas fa-search"></i> No products found. Try different search terms.';
                }
                showNoResults();
            } else {
                if (resultsCount) {
                    resultsCount.textContent = `Found ${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
                }
                hideNoResults();
            }
        } else {
            searchResults.style.display = 'none';
            hideNoResults();
        }
    }
}

function clearSearch() {
    console.log("Clear search called");
    const searchInput = document.getElementById('productSearch');
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchResults = document.getElementById('searchResults');
    const products = document.querySelectorAll('.pro-container .pro');
    
    console.log("Clearing search for", products.length, "products");
    
    // Clear all inputs
    if (searchInput) searchInput.value = '';
    if (brandFilter) brandFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    
    // Show all products
    products.forEach((product, index) => {
        product.style.display = 'block';
        product.style.visibility = 'visible';
        product.classList.remove('product-hidden');
        console.log(`Product ${index} restored`);
    });
    
    // Hide search results
    if (searchResults) {
        searchResults.style.display = 'none';
    }
    hideNoResults();
    
    console.log("Search cleared successfully");
}

function showNoResults() {
    const proContainer = document.querySelector('#product1 .pro-container');
    let noResultsDiv = document.querySelector('.no-results');
    
    if (!noResultsDiv) {
        noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No products found</h3>
            <p>Try adjusting your search criteria or browse our categories</p>
        `;
        proContainer.appendChild(noResultsDiv);
    } else {
        noResultsDiv.style.display = 'block';
    }
}

function hideNoResults() {
    const noResultsDiv = document.querySelector('.no-results');
    if (noResultsDiv) {
        noResultsDiv.style.display = 'none';
    }
}

// Add enter key support for search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

// Make functions globally available
window.searchProducts = searchProducts;
window.filterProducts = filterProducts;
window.clearSearch = clearSearch;

wl_load();
  try {
    return JSON.parse(localStorage.getItem(WL_STORAGE_KEY)) || [];
  } catch {
    return [];
  }


function wl_save(arr) {
  localStorage.setItem(WL_STORAGE_KEY, JSON.stringify(arr));
}

function wl_isIn(id) {
  const wl = wl_load();
  return wl.some(p => p.id === id);
}

function wl_add(item) {
  const wl = wl_load();
  if (!wl.some(p => p.id === item.id)) {
    wl.push(item);
    wl_save(wl);
  }
  wl_updateCounter();
}

function wl_remove(id) {
  const wl = wl_load().filter(p => p.id !== id);
  wl_save(wl);
  wl_updateCounter();
}

function wl_toggleFromButton(btn) {
  const id = btn.dataset.productId;
  const inList = wl_isIn(id);

  if (inList) {
    wl_remove(id);
    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");
    btn.querySelector("i").classList.remove("fa-solid");
    btn.querySelector("i").classList.add("fa-regular");
  } else {
    // Build item from data-attrs (fallback parse from DOM if needed)
    const item = {
      id,
      name: btn.dataset.productName || btn.closest(".product")?.querySelector(".product-title")?.textContent?.trim() || "Product",
      price: parseInt(btn.dataset.productPrice || btn.closest(".product")?.querySelector(".product-price")?.dataset?.price || "0", 10),
      img: btn.dataset.productImg || btn.closest(".product")?.querySelector("img")?.getAttribute("src") || "",
      url: btn.dataset.productUrl || "#"
    };
    wl_add(item);
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    btn.querySelector("i").classList.remove("fa-regular");
    btn.querySelector("i").classList.add("fa-solid");
  }
}

function wl_updateCounter() {
  const el = document.getElementById("wl-count");
  if (el) el.textContent = String(wl_load().length);
}

function wl_syncButtonsState() {
  document.querySelectorAll(".wishlist-btn").forEach(btn => {
    const id = btn.dataset.productId;
    const active = wl_isIn(id);
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
    const icon = btn.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-solid", active);
      icon.classList.toggle("fa-regular", !active);
    }
  });
}

// Event delegation: toggle on click
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".wishlist-btn");
  if (!btn) return;
  wl_toggleFromButton(btn);
});

// Init on page load
document.addEventListener("DOMContentLoaded", () => {
  wl_updateCounter();
  wl_syncButtonsState();
});

/* -------------------------------
   STYLÉKA Wishlist (localStorage)
----------------------------------*/
const WL_STORAGE_KEY = "styl_wishlist"; // localStorage key

function wl_load() {
  try {
    return JSON.parse(localStorage.getItem(WL_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function wl_save(arr) {
  localStorage.setItem(WL_STORAGE_KEY, JSON.stringify(arr));
}

function wl_isIn(id) {
  const wl = wl_load();
  return wl.some(p => p.id === id);
}

function wl_add(item) {
  const wl = wl_load();
  if (!wl.some(p => p.id === item.id)) {
    wl.push(item);
    wl_save(wl);
  }
  wl_updateCounter();
}

function wl_remove(id) {
  const wl = wl_load().filter(p => p.id !== id);
  wl_save(wl);
  wl_updateCounter();
}

function wl_toggleFromButton(btn) {
  const id = btn.dataset.productId;
  const inList = wl_isIn(id);

  if (inList) {
    wl_remove(id);
    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");
    btn.querySelector("i").classList.remove("fa-solid");
    btn.querySelector("i").classList.add("fa-regular");
  } else {
    // Build item from data-attrs (fallback parse from DOM if needed)
    const item = {
      id,
      name: btn.dataset.productName || btn.closest(".product")?.querySelector(".product-title")?.textContent?.trim() || "Product",
      price: parseInt(btn.dataset.productPrice || btn.closest(".product")?.querySelector(".product-price")?.dataset?.price || "0", 10),
      img: btn.dataset.productImg || btn.closest(".product")?.querySelector("img")?.getAttribute("src") || "",
      url: btn.dataset.productUrl || "#"
    };
    wl_add(item);
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    btn.querySelector("i").classList.remove("fa-regular");
    btn.querySelector("i").classList.add("fa-solid");
  }
}

function wl_updateCounter() {
  const el = document.getElementById("wl-count");
  if (el) el.textContent = String(wl_load().length);
}

function wl_syncButtonsState() {
  document.querySelectorAll(".wishlist-btn").forEach(btn => {
    const id = btn.dataset.productId;
    const active = wl_isIn(id);
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
    const icon = btn.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-solid", active);
      icon.classList.toggle("fa-regular", !active);
    }
  });
}

// Event delegation: toggle on click
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".wishlist-btn");
  if (!btn) return;
  wl_toggleFromButton(btn);
});

// Init on page load
document.addEventListener("DOMContentLoaded", () => {
  wl_updateCounter();
  wl_syncButtonsState();
});
