const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}


// instagram swiper js

document.addEventListener("DOMContentLoaded", function() {
  const swiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      slidesPerView: 3,
      spaceBetween: 20,
      breakpoints: {
          1024: {
              slidesPerView: 3,
              spaceBetween: 20
          },
          768: {
              slidesPerView: 2,
              spaceBetween: 15
          },
          480: {
              slidesPerView: 1,
              spaceBetween: 10
          }
      }
  });
});
    
// toggle btn

document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navLinks = document.querySelector('.nav_links');
  const body = document.body;

  hamburgerBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    

    navLinks.classList.toggle('mobile-active');
    
    body.style.overflow = navLinks.classList.contains('mobile-active') ? 'hidden' : 'auto';
  });

  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navLinks.classList.remove('mobile-active');
      body.style.overflow = 'auto';
    });
  });
});



// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });
  
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});



// search function

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search_input');
  const searchForm = document.querySelector('form[name="search_box"]');
  
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    performSearch();
  });
  
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 300);
  });
  
  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm.length === 0) {
    
      resetSearch();
      return;
    }
    
    const searchableElements = document.querySelectorAll('article, .searchable');
    
    let hasResults = false;
    
    searchableElements.forEach(element => {
      const textContent = element.textContent.toLowerCase();
      
      if (textContent.includes(searchTerm)) {
        element.style.display = ''; 
        hasResults = true;
        
        highlightText(element, searchTerm);
      } else {
        element.style.display = 'none'; 
      }
    });
    
    
    showNoResultsMessage(!hasResults);
  }
  
  function resetSearch() {
    document.querySelectorAll('article, .searchable').forEach(el => {
      el.style.display = '';
      removeHighlights(el);
    });
    
    showNoResultsMessage(false);
  }
  
  function highlightText(element, term) {
    removeHighlights(element);
    
    const regex = new RegExp(term, 'gi');
    const html = element.innerHTML;
    
    element.innerHTML = html.replace(regex, match => 
      `<span class="search-highlight">${match}</span>`
    );
  }
  
  function removeHighlights(element) {
    const highlights = element.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
      parent.normalize();
    });
  }
  
  function showNoResultsMessage(show) {
    let message = document.getElementById('no-results-message');
    
    if (show && !message) {
      message = document.createElement('div');
      message.id = 'no-results-message';
      message.textContent = 'No results found';
      message.style.textAlign = 'center';
      message.style.padding = '20px';
      message.style.color = '#e96989';
      searchForm.parentNode.insertBefore(message, searchForm.nextSibling);
    } else if (!show && message) {
      message.remove();
    }
  }
});
  