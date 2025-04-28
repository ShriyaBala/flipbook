document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  
  // Check if jQuery is loaded
  if (typeof $ === 'undefined') {
    console.error('jQuery is not loaded!');
    return;
  }
  console.log('jQuery is loaded successfully');

  // Check if turn.js is loaded
  if (typeof $.fn.turn === 'undefined') {
    console.error('turn.js is not loaded!');
    return;
  }
  console.log('turn.js is loaded successfully');

  document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll("#flipbook .page");
    let currentPage = 0;

    // Function to show the current page
    function showPage(index) {
        pages.forEach((page, i) => {
            page.classList.toggle("active", i === index);
        });
    }

    // Show the first page initially
    showPage(currentPage);

    // Add navigation functionality
    document.getElementById("searchBtn").addEventListener("click", () => {
        const pageNumber = parseInt(document.getElementById("pageSearch").value, 10) - 1;
        if (pageNumber >= 0 && pageNumber < pages.length) {
            currentPage = pageNumber;
            showPage(currentPage);
        }
    });

    // Optional: Add swipe navigation for mobile
    let startX = 0;
    document.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });
    document.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (endX < startX - 50) {
            // Swipe left (next page)
            if (currentPage < pages.length - 1) {
                currentPage++;
                showPage(currentPage);
            }
        } else if (endX > startX + 50) {
            // Swipe right (previous page)
            if (currentPage > 0) {
                currentPage--;
                showPage(currentPage);
            }
        }
    });
});

  // Configuration
  const config = {
    totalPages: 116,
    bookInfo: {
      title: "Interactive Book",
      author: "Your Name"
    },
    ads: [
      'ads/ad1.jpg',
      'ads/ad2.jpg',
      'ads/ad3.jpg'
    ],
    specialAdBeforePage: 18,
    adBoxPage: 17,
    extraAdPages: [15, 16],
    humanDetailPages: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115]
  };

  // Initialize everything
  function initFlipbook() {
    const flipbook = $('#flipbook');
    const isMobile = window.innerWidth <= 768;
    const popupVideo = $('.popup-video');
    const mainVideo = $('.ad-page video').first();
    const loadingIndicator = $('.loading-indicator');

    // Show loading indicator
    loadingIndicator.show();

    // Create pages for the flipbook
    function createPages() {
        // Clear existing pages except the first two ad pages
        flipbook.find('.page:not(.ad-page)').remove();

        // Add book pages
        for (let i = 1; i <= 116; i++) {
            const pageNum = String(i).padStart(4, '0');
            const page = $('<div>', {
                class: 'page',
                html: `<img src="flipbook/pages/ilovepdf_pages-to-jpg (1)/directory inner_page-${pageNum}.jpg" alt="Page ${i}">`
            });
            flipbook.append(page);
        }
    }

    // Create pages first
    createPages();
    
    // Initialize turn.js with appropriate settings
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
            start: function(event, pageObject, corner) {
                // Show popup video when user starts flipping
                if (isMobile) {
                    // Copy the video source from the main video
                    const videoSource = mainVideo.find('source').attr('src');
                    popupVideo.find('video source').attr('src', videoSource);
                    popupVideo.find('video')[0].load();
                    
                    // Show the popup video
                    popupVideo.addClass('active');
                    
                    // Hide the main video
                    mainVideo.hide();
                }
            },
            end: function(event, pageObject) {
                // If we're back on the first page, hide popup and show main video
                if (pageObject.page === 1 && isMobile) {
                    popupVideo.removeClass('active');
                    mainVideo.show();
                }
                // Update page indicator
                $('#currentPage').text(pageObject.page);
            }
        }
    });
      
    // Handle window resize
    $(window).on('resize', function() {
        const isMobileNow = window.innerWidth <= 768;
        flipbook.turn('size', isMobileNow ? window.innerWidth : 1000, isMobileNow ? window.innerHeight : 600);
        flipbook.turn('display', isMobileNow ? 'single' : 'double');
    });

    // Navigation buttons
    $('#prevPage').on('click', function() {
        flipbook.turn('previous');
    });

    $('#nextPage').on('click', function() {
        flipbook.turn('next');
    });

    // Search functionality
    $('#searchBtn').on('click', function() {
        const pageNum = parseInt($('#pageSearch').val());
        if (pageNum && pageNum >= 1 && pageNum <= 116) {
            flipbook.turn('page', pageNum);
        }
    });

    // Handle Enter key in search
    $('#pageSearch').on('keypress', function(e) {
        if (e.which === 13) {
            $('#searchBtn').click();
        }
    });

    // Hide loading indicator when everything is ready
    $(window).on('load', function() {
        loadingIndicator.hide();
    });

    // Initial page setup
    $('.page').css('visibility', 'visible');

    // Add realistic page turning with corner dragging
    $('#flipbook').on('mousedown', function(e) {
      const book = $(this);
      const bookOffset = book.offset();
      const bookWidth = book.width();
      const bookHeight = book.height();
      
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      
      const relativeX = mouseX - bookOffset.left;
      const relativeY = mouseY - bookOffset.top;
      
      const isInCornerArea = relativeY < bookHeight * 0.2 || relativeY > bookHeight * 0.8;
      
      if (isInCornerArea) {
        if (relativeX < bookWidth / 2) {
          book.turn('previous');
        } else {
          book.turn('next');
        }
      } else {
        if (relativeX < bookWidth / 2) {
          book.turn('previous');
        } else {
          book.turn('next');
        }
      }
    });

    // Add keyboard navigation
    $(document).keydown(function(e) {
      if (e.keyCode === 37) { // left arrow
        $('#flipbook').turn('previous');
      } else if (e.keyCode === 39) { // right arrow
        $('#flipbook').turn('next');
      }
    });
  }

  // Initialize when DOM is ready
  $(document).ready(function() {
    initFlipbook();
  });
});