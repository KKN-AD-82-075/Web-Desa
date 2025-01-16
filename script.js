/* Mengatur responsive navbar */
const navbaIcon = document.querySelector('#navbar-icon')
navbaIcon.addEventListener('click', function(){
    const navBarGroup = document.querySelector('#navbar-group')
    navBarGroup.classList.toggle('navbar-group--close');
})

document.getElementById('search').addEventListener('input', function () {
  const query = this.value.toLowerCase(); 
  const newsItems = document.querySelectorAll('.news-item'); 

  newsItems.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      if (title.includes(query)) {
          item.style.display = 'block';
      } else {
          item.style.display = 'none';
      }
  });
});


