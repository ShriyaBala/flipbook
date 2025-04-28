document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Content Loaded');
  
  // Check if jQuery and turn.js are loaded
  if (typeof $ === 'undefined') {
    console.error('jQuery is not loaded!');
    return;
  }
  console.log('jQuery is loaded successfully');

  if (typeof $.fn.turn === 'undefined') {
    console.error('turn.js is not loaded!');
    return;
  }
  console.log('turn.js is loaded successfully');

  // Configuration
  const config = {
    totalBookPages: 116, // Total number of book content pages
    bookInfo: {
      title: "Interactive Book",
      author: "Your Name"
    },
    ads: {
      videos: [
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4', // Replace with different video
        'https://www.w3schools.com/html/mov_bbb.mp4',  // Replace with different video
        'https://www.w3schools.com/html/mov_bbb.mp4'   // Additional video for new ad
      ],
      images: [
        'https://via.placeholder.com/800x600?text=Ad+1',
        'https://via.placeholder.com/800x600?text=Ad+2',
        'https://via.placeholder.com/800x600?text=Ad+3',
        'https://via.placeholder.com/800x600?text=Ad+4' // Additional image for new ad
      ],
      titles: [
        'Featured Product 1',
        'Featured Product 2',
        'Featured Product 3',
        'Featured Product 4' // Additional title for new ad
      ],
      descriptions: [
        'Discover our premium offerings',
        'Check out our latest collection',
        'Special deals just for you',
        'Exclusive content available now' // Additional description for new ad
      ]
    },
    initialAds: 3, // Number of initial advertisement pages
    adFrequency: 4, // Add advertisement every 4 pages after initial ads
    adTypes: ['video', 'image', 'video', 'image'] // Alternating ad types
  };

  function initFlipbook() {
    const flipbook = $('#flipbook');
    const isMobile = window.innerWidth <= 768;
    const popupVideo = $('.popup-video');
    const mainVideo = $('.ad-page video').first();
    const loadingIndicator = $('.loading-indicator');

    // Show loading
    loadingIndicator.show();

    // Create pages dynamically
    function createPages() {
      flipbook.empty(); // Clear existing pages
      
      let currentPage = 1;  // Track current page
      let bookPageNumber = 1; // Track actual book page number
      let adIndex = 0; // Track current advertisement index
      let totalPages = 0; // Track total number of pages including ads
      
      // Add initial advertisement pages
      for (let i = 0; i < config.initialAds; i++) {
        const adType = config.adTypes[adIndex % config.adTypes.length];
        const adContent = adType === 'video' ? 
          `<video controls autoplay muted loop>
            <source src="${config.ads.videos[adIndex % config.ads.videos.length]}" type="video/mp4">
            Your browser does not support the video tag.
          </video>` :
          `<img src="${config.ads.images[adIndex % config.ads.images.length]}" alt="Advertisement">`;
        
        const adPage = $('<div>', {
          class: 'page ad-page',
          'data-page-type': 'ad',
          'data-page-number': '0',
          'data-total-page': ++totalPages,
          html: `
            <div class="ad-container">
              <div class="ad-header">
                <span class="ad-badge">Sponsored</span>
                <button class="ad-close"><i class="fas fa-times"></i></button>
            </div>
              <div class="ad-content">
                ${adContent}
                <div class="ad-overlay">
                  <h3>${config.ads.titles[adIndex % config.ads.titles.length]}</h3>
                  <p>${config.ads.descriptions[adIndex % config.ads.descriptions.length]}</p>
                  <button class="ad-cta">Learn More</button>
            </div>
              </div>
            </div>
          `
        });
        flipbook.append(adPage);
        adIndex++;
      }
      
      // Add book pages with regular advertisement frequency
      for (let i = 1; i <= config.totalBookPages; i++) {
        const isAdPage = (i - 1) % config.adFrequency === 0;
        
        if (isAdPage) {
          // Add advertisement page
          const adType = config.adTypes[adIndex % config.adTypes.length];
          const adContent = adType === 'video' ? 
            `<video controls autoplay muted loop>
              <source src="${config.ads.videos[adIndex % config.ads.videos.length]}" type="video/mp4">
              Your browser does not support the video tag.
            </video>` :
            `<img src="${config.ads.images[adIndex % config.ads.images.length]}" alt="Advertisement">`;
          
          const adPage = $('<div>', {
            class: 'page ad-page',
            'data-page-type': 'ad',
            'data-page-number': '0',
            'data-total-page': ++totalPages,
            html: `
              <div class="ad-container">
                <div class="ad-header">
                  <span class="ad-badge">Sponsored</span>
                  <button class="ad-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="ad-content">
                  ${adContent}
                  <div class="ad-overlay">
                    <h3>${config.ads.titles[adIndex % config.ads.titles.length]}</h3>
                    <p>${config.ads.descriptions[adIndex % config.ads.descriptions.length]}</p>
                    <button class="ad-cta">Learn More</button>
                  </div>
          </div>
            </div>
            `
          });
          flipbook.append(adPage);
          adIndex++;
        } else {
          // Add book page
          const pageNum = String(bookPageNumber).padStart(4, '0');
          const page = $('<div>', {
            class: 'page',
            'data-page-type': 'content',
            'data-page-number': bookPageNumber,
            'data-total-page': ++totalPages,
            html: `<img src="flipbook/pages/ilovepdf_pages-to-jpg (1)/directory inner_page-${pageNum}.jpg" alt="Page ${bookPageNumber}">`
          });
          flipbook.append(page);
          bookPageNumber++;
        }
      }
      
      // Update total pages display
      $('#totalPages').text(totalPages);
    }
    

    createPages();
    
    // Initialize turn.js
    flipbook.turn({
      width: isMobile ? window.innerWidth : 1000,
      height: isMobile ? window.innerHeight : 600,
        autoCenter: true,
      display: isMobile ? 'single' : 'double',
        acceleration: true,
      gradients: true,
      elevation: 50,
      duration: 1200,
        when: {
          turning: function(event, page, view) {
            const currentPage = $(`#flipbook .page:nth-child(${page})`);
            const pageType = currentPage.data('page-type');
            const pageNumber = currentPage.data('page-number');
            const totalPage = currentPage.data('total-page');
            
            // Update the page indicator
            if (pageType === 'content') {
                $('#currentPage').text(pageNumber);
            } else {
                $('#currentPage').text('0');
            }
            
            // Handle video behavior
            const isLeftPage = page % 2 === 1;
            const isAdPage = pageType === 'ad';
            
            if (isLeftPage && isAdPage) {
                const currentVideo = currentPage.find('video')[0];
                const popupVideoElement = popupVideo.find('video')[0];
                
                if (currentVideo && popupVideoElement) {
                    // Copy video source to popup
                    popupVideoElement.src = currentVideo.src;
                    popupVideoElement.load();
                    
                    // Show popup and hide main video
                    popupVideo.show();
                    $(currentVideo).hide();
                }
            } else if (page === 1) {
                // Return to first page
                popupVideo.hide();
                const firstVideo = $('#flipbook .page:nth-child(1) video')[0];
                if (firstVideo) {
                    $(firstVideo).show();
                }
            }
        }
      }
    });

    // Window resize handler
    $(window).on('resize', function () {
      const isMobileNow = window.innerWidth <= 768;
      flipbook.turn('size', isMobileNow ? window.innerWidth : 1000, isMobileNow ? window.innerHeight : 600);
      flipbook.turn('display', isMobileNow ? 'single' : 'double');
    });

    // Button navigation
    $('#prevPage').on('click', function () {
      flipbook.turn('previous');
    });

    $('#nextPage').on('click', function () {
      flipbook.turn('next');
    });

    // Search functionality
    $('#searchBtn').on('click', function() {
      const pageNum = parseInt($('#pageSearch').val(), 10);
      if (pageNum && pageNum >= 1 && pageNum <= config.totalBookPages) {
        // Find the target page element
        const targetPage = $(`#flipbook .page[data-page-type="content"][data-page-number="${pageNum}"]`);
        if (targetPage.length) {
            const pageIndex = targetPage.data('total-page');
            flipbook.turn('page', pageIndex);
        }
      }
    });

    $('#pageSearch').on('keypress', function (e) {
      if (e.which === 13) {
        $('#searchBtn').click();
      }
    });

    // Hide loading after everything loaded
    $(window).on('load', function () {
      loadingIndicator.hide();
    });

    // Enable realistic mouse click flipping
    $('#flipbook').on('mousedown', function (e) {
      const book = $(this);
      const bookOffset = book.offset();
      const bookWidth = book.width();
      const bookHeight = book.height();
      
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      
      const relativeX = mouseX - bookOffset.left;
      const relativeY = mouseY - bookOffset.top;
      
      const isInCornerArea = relativeY < bookHeight * 0.2 || relativeY > bookHeight * 0.8;
      
      if (isInCornerArea || relativeX < bookWidth / 2) {
          book.turn('previous');
      } else {
          book.turn('next');
      }
    });

    // Keyboard navigation
    $(document).keydown(function (e) {
      if (e.keyCode === 37) { // left arrow
        flipbook.turn('previous');
      } else if (e.keyCode === 39) { // right arrow
        flipbook.turn('next');
      }
    });
  }

  // Mobile swipe navigation (without using turn.js built-in swipe)
  function initSwipeNavigation() {
    const pages = document.querySelectorAll("#flipbook .page");
    let currentPage = 0;

    function showPage(index) {
      pages.forEach((page, i) => {
        page.classList.toggle("active", i === index);
      });
    }

    showPage(currentPage);

    document.getElementById("searchBtn").addEventListener("click", () => {
      const pageNumber = parseInt(document.getElementById("pageSearch").value, 10) - 1;
      if (pageNumber >= 0 && pageNumber < pages.length) {
        currentPage = pageNumber;
        showPage(currentPage);
      }
    });

    let startX = 0;
    document.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    document.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      if (endX < startX - 50 && currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
      } else if (endX > startX + 50 && currentPage > 0) {
        currentPage--;
        showPage(currentPage);
      }
    });
  }

  // Initialize everything
  $(document).ready(function () {
  initFlipbook();
    initSwipeNavigation();
  });
});
