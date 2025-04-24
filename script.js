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

  // Create pages for the flipbook
  function createPages() {
  console.log('Creating pages...');
  const flipbook = document.getElementById('flipbook');

  let currentPage = 1; // Track the current page number in the book

  for (let i = 1; i <= config.totalPages; i++) {
    // Format the page number with leading zeros
    const pageNum = String(i).padStart(4, '0');

    // Check if the current page is 20 or 21 and swap their content
    let swappedPageNum = pageNum;
    if (currentPage === 20) {
      swappedPageNum = String(21).padStart(4, '0'); // Use page 21's content for page 20
    } else if (currentPage === 21) {
      swappedPageNum = String(20).padStart(4, '0'); // Use page 20's content for page 21
    }

    // Check if the current page should be an advertisement
    if ([16, 18].includes(currentPage)) {
      const adPage = document.createElement('div');
      adPage.className = 'page advertisement-page';
      adPage.innerHTML = `
          <div class="ad-content">
              <h3>Advertisement</h3>
              <p>Your advertisement content here</p>
          </div>
          <div class="page-number">Advertisement</div>
      `;
      flipbook.appendChild(adPage);

      // Increment the page number for the ad
      currentPage++;
      continue; // Skip adding a regular page for this iteration
    }

    // Create a single page with one image
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
        <img src="flipbook/pages/ilovepdf_pages-to-jpg (1)/directory inner_page-${swappedPageNum}.jpg" alt="Page ${currentPage}" class="page-image">
        <div class="page-number">Page ${currentPage}</div>
    `;

    // Add page to flipbook
    flipbook.appendChild(page);

    // Increment the page number for the content page
    currentPage++;
  }

  

}

  // Initialize the flipbook
  function initFlipbook() {
    console.log('Initializing flipbook...');
    
    // Create pages
    createPages();
    
    // Initialize turn.js
    $('#flipbook').turn({
      width: 1000,
      height: 600,
      autoCenter: true,
      acceleration: true,
      gradients: true,
      elevation: 50,
      duration: 1200,
      when: {
        turning: function(event, page, view) {
          console.log('Turning to page:', page);
          // Add or remove flipbook-flipped class based on page number
          if (page > 1) {
            $('body').addClass('flipbook-flipped');
          } else {
            $('body').removeClass('flipbook-flipped');
          }
        }
      }
    });

    // Add search functionality
    $('#searchBtn').on('click', function() {
      const pageNum = parseInt($('#pageSearch').val());
      if (pageNum && pageNum >= 1 && pageNum <= config.totalPages) {
        // Calculate the actual page number including ad pages
        const actualPage = pageNum + Math.floor((pageNum - 1) / 4); // Add one ad page for every 4 content pages
        $('#flipbook').turn('page', actualPage);
      } else {
        alert('Please enter a valid page number between 1 and ' + config.totalPages);
      }
    });

    // Add Enter key support for search
    $('#pageSearch').on('keypress', function(e) {
      if (e.which === 13) { // Enter key
        $('#searchBtn').click();
      }
    });

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

  // Initialize everything
  console.log('Starting initialization...');
  initFlipbook();
});