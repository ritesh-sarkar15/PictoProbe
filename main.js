window.onload = function() {
  main();
}

function main() {
  const searchBox = document.getElementById("searchBox");
  const searchBtn = document.querySelector(".searchBtn");
  const more = document.querySelector(".more");
  const imageList = document.querySelector('.images');
  let accessToken = '7Pg0nI9blkKZvR_ZM6JI6urFK1E4HtJBk8dXsRZ41Dk';
  let page = 1;

  async function getImage(url) {
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response error!');
      }
      let data = await response.json();
      console.log(data)
      if (page === 1) {
        imageList.innerHTML = '';
      }

      let result = data.results;
      result.forEach(finalResult => {
        let imageDiv = document.createElement('div');
        imageDiv.classList.add('imageWrapper');
        
        let image = document.createElement('img');
        image.src = finalResult.urls.full;
        image.classList.add('genImage');
        
        imageDiv.appendChild(image);
        
        imageList.appendChild(imageDiv);
      });

      more.style.display = "flex";
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to handle search button click
  searchBtn.onclick = function(e) {
    e.preventDefault();
    page = 1;
    let keyword = searchBox.value;
    let API = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessToken}&per_page=12`;
    getImage(API);
    
  }

  // Function to handle "Load More" button click
  more.addEventListener('click', () => {
    page++;
    let keyword = searchBox.value;
    let API = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessToken}&per_page=12`;
    getImage(API);
  });
}

// Select elements for theme toggle
const square = document.querySelector(".square");
const body = document.querySelector('body');
const circle = document.querySelector('.circle');

// Function to toggle theme
const toggleTheme = () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    circle.style.transform = 'translateX(0)';
    circle.style.backgroundImage = 'url(moon-stars-svgrepo-com.svg)';
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark');
    circle.style.transform = 'translateX(1.2rem)';
    circle.style.backgroundImage = 'url(sun-svgrepo-com.svg)';
    localStorage.setItem('theme', 'dark');
  }
};

// Event listener for theme toggle
square.addEventListener('click', toggleTheme);

// Function to load saved theme from localStorage
const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    circle.style.transform = 'translateX(1.2rem)';
    circle.style.backgroundImage = 'url(sun-svgrepo-com.svg)';
  } else {
    body.classList.remove('dark');
    circle.style.transform = 'translateX(0)';
    circle.style.backgroundImage = 'url(moon-stars-svgrepo-com.svg)';
  }
};

// Load saved theme when the page loads
document.addEventListener('DOMContentLoaded', loadTheme);
