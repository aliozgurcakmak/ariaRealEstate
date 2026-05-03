document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Listings Logic
    const listingsGrid = document.getElementById('listings-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    
    // Modal Elements
    const modal = document.getElementById('listing-modal');
    const closeModal = document.querySelector('.close-modal');
    
    let currentFilter = 'Tümü';
    
    // Phone Number
    const phone = "905376544362";

    // Format WhatsApp Link
    const getWaLink = (message) => {
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    // Render Listings
    const renderListings = (data) => {
        if (!listingsGrid) return;
        
        listingsGrid.innerHTML = '';
        
        if (data.length === 0) {
            listingsGrid.innerHTML = '<div class="no-results">Aradığınız kriterlere uygun ilan bulunamadı.</div>';
            return;
        }

        data.forEach(listing => {
            const card = document.createElement('div');
            card.className = 'listing-card';
            
            // Generate WhatsApp message for card button
            const waMsg = `Merhaba, "${listing.title}" ilanı hakkında bilgi almak istiyorum.`;
            const waLink = getWaLink(waMsg);

            card.innerHTML = `
                <div class="listing-img-container">
                    <div class="listing-badge">${listing.category}</div>
                    <div class="listing-type">${listing.type}</div>
                    <img src="${listing.image}" alt="${listing.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Görsel+Bekleniyor'">
                </div>
                <div class="listing-details">
                    <h3 class="listing-title" title="${listing.title}">${listing.title}</h3>
                    <div class="listing-price">${listing.price}</div>
                    <div class="listing-location">
                        <i class="fas fa-map-marker-alt"></i> ${listing.location}
                    </div>
                    <p class="listing-desc">${listing.details}</p>
                    <div class="listing-actions">
                        <button class="btn-detail" data-id="${listing.id}">
                            <i class="fas fa-info-circle"></i> Detay
                        </button>
                        <a href="${waLink}" target="_blank" class="btn-card-wp">
                            <i class="fab fa-whatsapp"></i> Sor
                        </a>
                    </div>
                </div>
            `;
            listingsGrid.appendChild(card);
        });

        // Add event listeners to detail buttons
        document.querySelectorAll('.btn-detail').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                openModal(id);
            });
        });
    };

    // Filter Logic
    const applyFilters = () => {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        let filtered = listings.filter(item => {
            // Category / Type filter
            let matchFilter = false;
            if (currentFilter === 'Tümü') matchFilter = true;
            else if (currentFilter === 'Emlak' && item.category === 'Emlak') matchFilter = true;
            else if (currentFilter === 'Oto' && item.category === 'Oto') matchFilter = true;
            else if (currentFilter === 'Satılık' && item.type === 'Satılık') matchFilter = true;
            else if (currentFilter === 'Kiralık' && item.type === 'Kiralık') matchFilter = true;
            
            // Search filter
            let matchSearch = item.title.toLowerCase().includes(searchTerm) || 
                              item.location.toLowerCase().includes(searchTerm);
                              
            return matchFilter && matchSearch;
        });
        
        renderListings(filtered);
    };

    // Filter Buttons Click
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                currentFilter = e.currentTarget.getAttribute('data-filter');
                applyFilters();
            });
        });
    }

    // Search Input
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    // Initial Render
    if (typeof listings !== 'undefined') {
        renderListings(listings);
    }

    // Modal Logic
    const openModal = (id) => {
        const item = listings.find(l => l.id === id);
        if (!item || !modal) return;

        document.getElementById('modal-img').src = item.image;
        document.getElementById('modal-img').onerror = function() {
            this.src = 'https://via.placeholder.com/800x600?text=Görsel+Bekleniyor';
        };
        
        document.getElementById('modal-category').textContent = `${item.category} > ${item.type}`;
        document.getElementById('modal-title').textContent = item.title;
        document.getElementById('modal-price').textContent = item.price;
        document.getElementById('modal-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${item.location}`;
        document.getElementById('modal-desc').textContent = item.details;
        
        // Features list
        const featuresList = document.getElementById('modal-features-list');
        featuresList.innerHTML = '';
        item.features.forEach(feat => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check"></i> ${feat}`;
            featuresList.appendChild(li);
        });

        // WhatsApp Button
        const waMsg = `Merhaba, "${item.title}" ilanı hakkında bilgi almak istiyorum.`;
        const waBtn = document.getElementById('modal-wa-btn');
        waBtn.href = getWaLink(waMsg);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phoneInput = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            const waMsg = `Merhaba, ben ${name}. Telefon numaram: ${phoneInput}. Mesajım: ${message}`;
            window.open(getWaLink(waMsg), '_blank');
            
            contactForm.reset();
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
                    window.scrollTo({
                         top: offsetPosition,
                         behavior: "smooth"
                    });
                }
            }
        });
    });
});
