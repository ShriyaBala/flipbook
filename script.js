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

  // Configuration
  const config = {
    totalPages: 116,
    bookInfo: {
      title: "Your Book Title",
      author: "Author Name"
    },
    ads: [
      'ads/ad1.jpg',
      'ads/ad2.jpg',
      'ads/ad3.jpg'
    ],
    specialAdBeforePage: 17,
    adBoxPage: 17,
    extraAdPages: [15, 16],
    humanDetailPages: [1, 3, 5, 7, 9, 11, 13, 15,16, 17,18, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115]
  };

  // Generate page image paths
  const pageImages = [];
  for (let i = 1; i <= config.totalPages; i++) {
    const pageNumber = i.toString().padStart(4, '0');
    pageImages.push(`flipbook/pages/ilovepdf_pages-to-jpg (1)/directory inner_page-${pageNumber}.jpg`);
  }

  // Create pages for the flipbook
  function createPages() {
    console.log('Creating pages...');
const flipbook = document.getElementById('flipbook');

    // Add hard cover
    const firstPage = document.createElement('div');
    firstPage.className = 'hard';
    firstPage.innerHTML = `
      <div class="page-content">
        <h1>${config.bookInfo.title}</h1>
        <p>By ${config.bookInfo.author}</p>
      </div>
    `;
    flipbook.appendChild(firstPage);
    
    // Add content pages with proper ordering
    let adIndex = 0;
    let currentPageIndex = 0;
    let pageCount = 1; // Track actual page numbers for special ad placement

    // Process all pages
    while (currentPageIndex < config.totalPages) {
      // Check if we need to add extra advertisement pages
      if (config.extraAdPages.includes(currentPageIndex + 1)) {
        // Add advertisement page
    const adPage = document.createElement('div');
    adPage.className = 'page';
        adPage.innerHTML = `
          <div class="page-content">
            <img src="${config.ads[adIndex]}" alt="Advertisement ${pageCount}" class="ad-image">
          </div>
        `;
        flipbook.appendChild(adPage);
        adIndex = (adIndex + 1) % config.ads.length;
        pageCount++;
      }
      
      // Check if we need to add special advertisement page
      if (currentPageIndex + 1 === config.specialAdBeforePage) {
        // Add special advertisement page on the left side
        const specialAdPage = document.createElement('div');
        specialAdPage.className = 'page';
        specialAdPage.innerHTML = `
            <div class="page-content left-page">
                <img src="${config.ads[0]}" alt="Special Advertisement" class="ad-image">
            </div>
        `;
        flipbook.appendChild(specialAdPage);
        currentPageIndex--
        pageCount++;
      }
      
      // Check if current page contains human details
      const isHumanDetailPage = config.humanDetailPages.includes(currentPageIndex + 1);
      
      if (isHumanDetailPage) {
        // This page goes on the right side (human details)
        
        // First, add a left page (other image or ad)
        const leftPage = document.createElement('div');
        leftPage.className = 'page';
        
        // Check if we need to add an ad on the left side
        if (currentPageIndex > 0 && currentPageIndex % 4 === 0) {
          // Add advertisement
          leftPage.innerHTML = `
            <div class="page-content ad-page">
              <img src="${config.ads[adIndex]}" alt="Advertisement">
            </div>
          `;
          adIndex = (adIndex + 1) % config.ads.length;
        } else {
          // Add other image content
          leftPage.innerHTML = `
            <div class="page-content left-page">
              <img src="${pageImages[currentPageIndex + 1]}" alt="Page ${currentPageIndex + 2}" onerror="this.src='placeholder.jpg'">
            </div>
          `;
        }
        flipbook.appendChild(leftPage);
        pageCount++;
        
        // Then, add the right page (human details)
        const rightPage = document.createElement('div');
        rightPage.className = 'page';
        
        // Check if this is page 17 (which should have an ad box)
        if (currentPageIndex + 1 === config.adBoxPage) {
          rightPage.innerHTML = `
            <div class="page-content right-page">
              <img src="${pageImages[currentPageIndex]}" alt="Page ${currentPageIndex + 1}" onerror="this.src='placeholder.jpg'">
              <div class="ad-box">
                <img src="${config.ads[1]}" alt="Advertisement Box">
              </div>
            </div>
          `;
        } else {
          rightPage.innerHTML = `
            <div class="page-content right-page">
              <img src="${pageImages[currentPageIndex]}" alt="Page ${currentPageIndex + 1}" onerror="this.src='placeholder.jpg'">
            </div>
          `;
        }
        flipbook.appendChild(rightPage);
        pageCount++;
        
        // Move to the next page
        currentPageIndex++;
      } else {
        // This page goes on the left side (other image)
        
        // First, add the left page (other image)
        const leftPage = document.createElement('div');
        leftPage.className = 'page';
        leftPage.innerHTML = `
          <div class="page-content left-page">
            <img src="${pageImages[currentPageIndex]}" alt="Page ${currentPageIndex + 1}" onerror="this.src='placeholder.jpg'">
          </div>
        `;
        flipbook.appendChild(leftPage);
        
        // Then, add a right page (human details or other image)
        const rightPage = document.createElement('div');
        rightPage.className = 'page';
        
        // Check if the next page contains human details
        const nextPageIsHumanDetail = config.humanDetailPages.includes(currentPageIndex + 2);
        
        if (nextPageIsHumanDetail) {
          // Next page is human details, use it for the right side
          rightPage.innerHTML = `
            <div class="page-content right-page">
              <img src="${pageImages[currentPageIndex + 1]}" alt="Page ${currentPageIndex + 2}" onerror="this.src='placeholder.jpg'">
            </div>
          `;
          currentPageIndex += 2; // Skip the next page since we've used it
          pageCount++;
        } else {
          // Next page is also other image, use it for the right side
          rightPage.innerHTML = `
            <div class="page-content left-page">
              <img src="${pageImages[currentPageIndex + 1]}" alt="Page ${currentPageIndex + 2}" onerror="this.src='placeholder.jpg'">
            </div>
          `;
          currentPageIndex += 2; // Skip the next page since we've used it
          pageCount++;
        }
        
        flipbook.appendChild(rightPage);
      }
    }
    
    // Add back cover
    const lastPage = document.createElement('div');
    lastPage.className = 'hard';
    lastPage.innerHTML = `
      <div class="page-content">
        <h1>End</h1>
      </div>
    `;
    flipbook.appendChild(lastPage);

    console.log('Pages created successfully');
}

// Initialize the flipbook
  function initFlipbook() {
    console.log('Initializing flipbook...');
    
    // Show loading screen
    const loadingScreen = document.querySelector('.loading');
    loadingScreen.style.display = 'flex';
    
    // Set total pages in the indicator
    document.getElementById('total-pages').textContent = config.totalPages + 1; // +1 for the special ad
    
    // Create pages
    createPages();
    
    // Initialize turn.js with a slight delay to ensure everything is loaded
    setTimeout(() => {
$('#flipbook').turn({
        width: window.innerWidth,
        height: window.innerHeight,
        autoCenter: true,
        acceleration: true,
        gradients: true, // Enable gradients for more realistic book effect
        elevation: 50, // Add elevation for 3D effect
        duration: 1200, // Slower page turning
        when: {
          turning: function(event, page, view) {
            playPageTurnSound();
          },
          turned: function(event, page, view) {
            // Update page number indicator
            updatePageNumber(page);
          }
        }
      });
      
      // Hide loading screen after initialization
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 500);
    }, 500);

    // Add realistic page turning with corner dragging
    $('#flipbook').on('mousedown', function(e) {
      const book = $(this);
      const bookOffset = book.offset();
      const bookWidth = book.width();
      const bookHeight = book.height();
      
      // Get the mouse position
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      
      // Calculate relative position within the book
      const relativeX = mouseX - bookOffset.left;
      const relativeY = mouseY - bookOffset.top;
      
      // Check if click is in the corner area (top or bottom 20% of height)
      const isInCornerArea = relativeY < bookHeight * 0.2 || relativeY > bookHeight * 0.8;
      
      if (isInCornerArea) {
        // If in corner area, enable corner dragging for realistic page turning
        if (relativeX < bookWidth / 2) {
          // Left corner - turn to previous page
          book.turn('previous');
        } else {
          // Right corner - turn to next page
          book.turn('next');
        }
      } else {
        // If not in corner area, use simple left/right page turning
        if (relativeX < bookWidth / 2) {
          // Click on left half - go to previous page
          book.turn('previous');
        } else {
          // Click on right half - go to next page
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
    
    // Add page search functionality
    $('#search-button').click(function() {
      const pageNumber = parseInt($('#page-search').val());
      if (pageNumber >= 1 && pageNumber <= config.totalPages + 1) { // +1 for the special ad
        $('#flipbook').turn('page', pageNumber);
      } else {
        alert('Please enter a valid page number between 1 and ' + (config.totalPages + 1));
      }
    });
    
    // Allow pressing Enter in the search box
    $('#page-search').keypress(function(e) {
      if (e.which === 13) { // Enter key
        $('#search-button').click();
      }
    });
    
    console.log('Flipbook initialized successfully');
  }

  // Update page number indicator
  function updatePageNumber(page) {
    document.getElementById('current-page').textContent = page;
  }

  // Play page turning sound
  function playPageTurnSound() {
    const audio = new Audio('page-turn.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }

  // Handle window resize
  $(window).resize(function() {
    $('#flipbook').turn('size', window.innerWidth, window.innerHeight);
  });

  // Initialize everything
  console.log('Starting initialization...');
  initFlipbook();
});
