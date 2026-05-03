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
            if (icon) {
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

    // Helper format price
    const formatPrice = (price, currency, priceText) => {
        if (priceText) return priceText;
        if (typeof price !== 'number' || isNaN(price)) return "Fiyat Sorunuz";
        return price.toLocaleString("tr-TR") + " " + currency;
    };

    // Format Location
    const formatLoc = (locObj) => {
        if (!locObj) return "";
        return `${locObj.district}, ${locObj.city}`;
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

            const mainImg = (listing.images && listing.images.length > 0) ? listing.images[0] : "https://via.placeholder.com/400x300?text=Görsel+Yok";
            const priceStr = formatPrice(listing.price, listing.currency, listing.priceText);
            const locStr = formatLoc(listing.location);

            // Generate WhatsApp message for card button
            const waMsg = `Merhaba, "${listing.title}" ilanı hakkında bilgi almak istiyorum.`;
            const waLink = getWaLink(waMsg);

            card.innerHTML = `
                <div class="listing-img-container">
                    <div class="listing-badge">${listing.category}</div>
                    <div class="listing-type">${listing.type}</div>
                    <img src="${mainImg}" alt="${listing.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Görsel+Bekleniyor'">
                </div>
                <div class="listing-details">
                    <h3 class="listing-title" title="${listing.title}">${listing.title}</h3>
                    <div class="listing-price">${priceStr}</div>
                    <div class="listing-location">
                        <i class="fas fa-map-marker-alt"></i> ${locStr}
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
        const minPriceInput = document.getElementById('min-price');
        const maxPriceInput = document.getElementById('max-price');
        const sortSelect = document.getElementById('sort-price');

        const minPrice = minPriceInput && minPriceInput.value ? parseInt(minPriceInput.value, 10) : 0;
        const maxPrice = maxPriceInput && maxPriceInput.value ? parseInt(maxPriceInput.value, 10) : Infinity;

        let filtered = listings.filter(item => {
            // Category / Type filter
            let matchFilter = false;
            if (currentFilter === 'Tümü') matchFilter = true;
            else if (currentFilter === 'Satılık' && item.category === 'Emlak' && item.type === 'Satılık') matchFilter = true;
            else if (currentFilter === 'Kiralık' && item.category === 'Emlak' && item.type === 'Kiralık') matchFilter = true;
            else if (currentFilter === 'Oto' && item.category === 'Oto') matchFilter = true;

            // Search filter
            const locString = formatLoc(item.location).toLowerCase();
            let matchSearch = item.title.toLowerCase().includes(searchTerm) ||
                locString.includes(searchTerm);

            // Price filter
            const itemPrice = Number(item.price);

            let matchPrice = true;

            if (minPrice > 0 && itemPrice < minPrice) {
                matchPrice = false;
            }

            if (maxPrice !== Infinity && itemPrice > maxPrice) {
                matchPrice = false;
            }
            return matchFilter && matchSearch && matchPrice;
        });

        // Sorting Logic
        if (sortSelect && sortSelect.value !== 'default') {
            filtered.sort((a, b) => {
                const priceA = a.price || 0;
                const priceB = b.price || 0;
                if (sortSelect.value === 'asc') return priceA - priceB;
                if (sortSelect.value === 'desc') return priceB - priceA;
                return 0;
            });
        }

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

    // Search Input & Price Inputs
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const sortSelect = document.getElementById('sort-price');
    if (minPriceInput) minPriceInput.addEventListener('input', applyFilters);
    if (maxPriceInput) maxPriceInput.addEventListener('input', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);

    // Initial Render
    if (typeof listings !== 'undefined') {
        renderListings(listings);
    }

    // Modal Logic
    const openModal = (id) => {
        const item = listings.find(l => l.id === id);
        if (!item || !modal) return;

        // Setup Slider
        const slider = document.getElementById('modal-slider');
        const dotsContainer = document.getElementById('slider-dots');
        slider.innerHTML = '';
        dotsContainer.innerHTML = '';

        let imagesToUse = item.images && item.images.length > 0 ? item.images : ["https://via.placeholder.com/800x600?text=Görsel+Yok"];

        imagesToUse.forEach((imgSrc, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.style.minWidth = '100%';
            imgContainer.style.height = '100%';
            imgContainer.style.scrollSnapAlign = 'start';

            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.onerror = function () {
                this.src = 'https://via.placeholder.com/800x600?text=Görsel+Bekleniyor';
            };

            imgContainer.appendChild(img);
            slider.appendChild(imgContainer);

            const dot = document.createElement('div');
            dot.className = index === 0 ? 'slider-dot active' : 'slider-dot';
            dot.addEventListener('click', () => {
                slider.scrollTo({ left: index * slider.clientWidth, behavior: 'smooth' });
            });
            dotsContainer.appendChild(dot);
        });

        // Update dots on scroll
        slider.onscroll = () => {
            const scrollPos = slider.scrollLeft;
            const index = Math.round(scrollPos / slider.clientWidth);
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((d, i) => {
                if (i === index) d.classList.add('active');
                else d.classList.remove('active');
            });
        };

        // Prev/Next Buttons
        const prevBtn = document.getElementById('slider-prev');
        const nextBtn = document.getElementById('slider-next');

        if (prevBtn) {
            prevBtn.onclick = () => {
                slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
            };
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
            };
        }

        document.getElementById('modal-category').textContent = `${item.category} > ${item.type}`;
        document.getElementById('modal-title').textContent = item.title;
        document.getElementById('modal-price').textContent = formatPrice(item.price, item.currency, item.priceText);
        document.getElementById('modal-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${formatLoc(item.location)}`;
        document.getElementById('modal-desc').textContent = item.details;

        // Features list
        const featuresList = document.getElementById('modal-features-list');
        featuresList.innerHTML = '';

        const addFeature = (label, value) => {
            if (value !== null && value !== undefined && value !== "") {
                const li = document.createElement('li');
                const displayVal = typeof value === 'boolean' ? (value ? 'Var' : 'Yok') : value;
                li.innerHTML = `<strong>${label}:</strong> ${displayVal}`;
                featuresList.appendChild(li);
            }
        };

        if (item.category === "Emlak" && item.property) {
            addFeature('Oda Sayısı', item.property.rooms);
            addFeature('Brüt/Net Alan', item.property.size ? item.property.size + " m²" : null);
            addFeature('Bulunduğu Kat', item.property.floor);
            addFeature('Bina Yaşı', item.property.buildingAge);
            addFeature('Isıtma', item.property.heating);
            addFeature('Otopark', item.property.parking);
            addFeature('Asansör', item.property.elevator);
        } else if (item.category === "Oto" && item.vehicle) {
            addFeature('Yıl', item.vehicle.year);
            addFeature('Kilometre', item.vehicle.km ? item.vehicle.km.toLocaleString('tr-TR') + " km" : null);
            addFeature('Yakıt', item.vehicle.fuel);
            addFeature('Vites', item.vehicle.transmission);
        }

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
            if (this.getAttribute('href') !== '#') {
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
