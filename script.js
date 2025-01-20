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

const loadExcelData = async (filePath) => {
    try {
        console.log(`Loading Excel file from: ${filePath}`);
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${filePath}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        if (!sheet) {
            throw new Error("No sheet found in the Excel file.");
        }
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log(`Loaded data from ${filePath}:`, data);
        return data;
    } catch (error) {
        console.error(`Error loading Excel file (${filePath}):`, error);
        return [];
    }
};

loadExcelData('./DataUMKM.xlsx')
    .then(data => console.log("Data UMKM Loaded:", data))
    .catch(err => console.error("Failed to load DataUMKM.xlsx:", err));

const loadAndSyncData = async () => {
    try {
        // Load data from Excel files
        const umkmDataRaw = await loadExcelData('./DataUMKM.xlsx');

        // Map UMKM data to respective categories or display dynamically
        umkmDataRaw.forEach((umkm) => {
            const category = umkm["Jenis UMKM"] || "Tidak Diketahui";
            const owner = umkm["Pemilik UMKM"] || "Tidak Diketahui";
            const contact = umkm["Kontak"] || "Tidak Ada Kontak";
            const description = umkm["Deskripsi"] || "Deskripsi tidak tersedia";

            // Create a new UMKM card
            const card = document.createElement('div');
            card.classList.add('news-item');

            card.innerHTML = `
                <img src="assets/img/logo/default-image.jpg" alt="UMKM Image">
                <div class="card-content">
                    <h3>${owner}</h3>
                    <p class="price">Kategori: ${category}</p>
                    <p>${description}</p>
                    <p class="contact">☎️ ${contact}</p>
                </div>
            `;

            // Append card to the appropriate section based on category
            const categorySection = document.querySelector(`.content-container#${category.toLowerCase()}`);
            if (categorySection) {
                categorySection.appendChild(card);
            } else {
                console.warn(`Category ${category} not found on the page.`);
            }
        });
    } catch (error) {
        console.error('Error loading or syncing UMKM data:', error);
    }
};

// Call the function
loadAndSyncData();