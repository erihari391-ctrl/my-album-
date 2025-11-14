const galleryContainer = document.getElementById("galleryContainer");
const albums = {
  "Nature": ["img1.jpg","img2.jpg"],
  "Anime": ["img1.jpg"],
  "Animals": ["img1.jpg"]
};

// Generate gallery
function generateGallery(){
  galleryContainer.innerHTML = "";
  for(const category in albums){
    const images = albums[category];
    const catHeader = document.createElement("h3");
    catHeader.textContent = "📂 " + category;
    galleryContainer.appendChild(catHeader);

    images.forEach(img=>{
      const col = document.createElement("div");
      col.className = "col";
      col.innerHTML = `
        <div class="card shadow-sm bg-secondary">
          <img src="assets/${category}/${img}" class="card-img-top img-preview" alt="${img}" data-bs-toggle="modal" data-bs-target="#previewModal">
          <div class="card-body">
            <p class="card-text">${img}</p>
            <button class="copy-btn" data-link="assets/${category}/${img}">Copy Link</button>
          </div>
        </div>
      `;
      galleryContainer.appendChild(col);
    });
  }

  document.querySelectorAll(".copy-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      navigator.clipboard.writeText(btn.dataset.link).then(()=>{
        btn.innerText = "✔ Copied!";
        setTimeout(()=>{ btn.innerText = "Copy Link"; },1500);
      });
    });
  });

  document.querySelectorAll(".img-preview").forEach(img=>{
    img.addEventListener("click", e=>{
      document.getElementById("modalImg").src = e.target.src;
    });
  });
}

// Drag & drop upload (demo, tidak benar-benar upload ke Vercel tanpa API)
const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
dropArea.addEventListener("click", ()=>fileInput.click());
dropArea.addEventListener("dragover", e=>{ e.preventDefault(); dropArea.style.background="#42264a"; });
dropArea.addEventListener("dragleave", e=>{ e.preventDefault(); dropArea.style.background="#241a36"; });
dropArea.addEventListener("drop", e=>{
  e.preventDefault();
  dropArea.style.background="#241a36";
  const files = e.dataTransfer.files;
  alert("File siap diupload: " + [...files].map(f=>f.name).join(", ") + "\nGunakan GitHub API untuk simpan ke folder assets.");
});

fileInput.addEventListener("change", e=>{
  const files = e.target.files;
  alert("File siap diupload: " + [...files].map(f=>f.name).join(", ") + "\nGunakan GitHub API untuk simpan ke folder assets.");
});

generateGallery();
