document.addEventListener('DOMContentLoaded', function() {
    // Load gallery images
    loadGalleryImages();
    
    // Initialize countdown timer
    initCountdown();
    
    // Initialize modal functionality
    initModal();
    
    // Scroll down functionality
    const scrollDownBtn = document.querySelector('.scroll-down-container');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const weddingDetailsSection = document.querySelector('.wedding-details');
            if (weddingDetailsSection) {
                weddingDetailsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Particle effect removed as requested
});

// Load gallery images
function loadGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    // New photo list with 8 images
    const photos = [
        'JS1_1364.jpg',
        'JS1_1841.jpg', 
        'JS1_1561.jpg',
        'JS1_1972.jpg',
        'JS1_1294.jpg',
        'JS1_1138.jpg',
        'JS1_0824.jpg',
        'JS1_1073.jpg'
    ];
    
    photos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = `images/${photo}`;
        img.alt = `Wedding Photo ${index + 1}`;
        img.loading = 'lazy';
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = '<i class="fas fa-search-plus"></i>';
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        
        // Add click event for modal
        galleryItem.addEventListener('click', () => {
            openModal(`images/${photo}`);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Initialize countdown timer
function initCountdown() {
    // Set the wedding date - August 29, 2025 at 9:30 AM
    const weddingDate = new Date('August 29, 2025 09:30:00').getTime();
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the wedding date
        const distance = weddingDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').innerHTML = "The Wedding Day Has Arrived!";
        }
    }, 1000);
}

// Initialize modal functionality
function initModal() {
    const modal = document.getElementById('photoModal');
    if (!modal) return;
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="" id="modalImage">
            <div class="modal-nav">
                <button class="nav-btn prev-btn" id="prevBtn">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="nav-btn next-btn" id="nextBtn">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
    
    // Close modal when clicking on X
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Navigate through images
    document.getElementById('prevBtn').addEventListener('click', function() {
        navigateGallery(-1);
    });
    
    document.getElementById('nextBtn').addEventListener('click', function() {
        navigateGallery(1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowLeft') {
                navigateGallery(-1);
            } else if (event.key === 'ArrowRight') {
                navigateGallery(1);
            }
        }
    });
}

// Current image index in the modal
let currentImageIndex = 0;
const photos = ['JS1_1364.jpg', 'JS1_1841.jpg', 'JS1_1561.jpg', 'JS1_1972.jpg', 'JS1_1294.jpg', 'JS1_1138.jpg', 'JS1_0824.jpg', 'JS1_1073.jpg'];

// Open the modal with a specific image
function openModal(imagePath) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    
    // Extract filename from path
    const filename = imagePath.split('/').pop();
    currentImageIndex = photos.indexOf(filename);
    
    if (currentImageIndex === -1) {
        console.error('Image not found in photos array:', filename);
        return;
    }
    
    modalImg.src = imagePath;
    modalImg.onload = function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };
    
    modalImg.onerror = function() {
        console.error('Failed to load image:', imagePath);
    };
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Navigate through gallery images
function navigateGallery(step) {
    currentImageIndex = (currentImageIndex + step + photos.length) % photos.length;
    const newPhoto = photos[currentImageIndex];
    const modalImg = document.getElementById('modalImage');
    modalImg.src = `images/${newPhoto}`;
}

// Handle GIF integration if provided
function handleGifIntegration(gifUrl) {
    const gifSection = document.getElementById('gifSection');
    const storyGif = document.getElementById('storyGif');
    
    if (gifUrl && gifSection && storyGif) {
        storyGif.src = gifUrl;
        gifSection.style.display = 'block';
    }
}

