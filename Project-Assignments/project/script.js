document.addEventListener("DOMContentLoaded", function () {
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");
    const carousel = document.querySelector(".carousel-items");
    const MAX_IMAGES = 5;
  
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
  
    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("dragover");
    });
  
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      const files = e.dataTransfer.files;
      handleFiles(files);
    });
  
    dropzone.addEventListener("click", () => fileInput.click());
  
    fileInput.addEventListener("change", (e) => {
      const files = e.target.files;
      handleFiles(files);
    });
  
    function handleFiles(files) {
      if (fileList.children.length + files.length > MAX_IMAGES) {
        alert(`You can only upload a maximum of ${MAX_IMAGES} images.`);
        return;
      }
  
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) {
          alert("Please upload only image files.");
          return;
        }
  
        if (file.size > 1024 * 1024) {
          alert("File size should be less than 1 MB.");
          return;
        }
  
        displayFile(file);
      });
  
      updateLocalStorage();
    }
  
    function displayFile(file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const div = document.createElement("div");
        div.className = "file-name";
  
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = file.name;
        img.className = "thumbnail";
        div.appendChild(img);
  
        const textarea = document.createElement("textarea");
        textarea.placeholder = "Add description...";
        div.appendChild(textarea);
  
        const checkIcon = document.createElement("span");
        checkIcon.innerHTML = "✓";
        checkIcon.className = "check-icon";
        checkIcon.onclick = function() {
          alert("Description has been added.");
          textarea.disabled = true;
          checkIcon.style.display = "none";
          updateLocalStorage();
        };
        div.appendChild(checkIcon);
  
        const deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = "✗";
        deleteIcon.className = "delete-icon";
        deleteIcon.onclick = function() {
          div.remove();
          updateLocalStorage();
        };
        div.appendChild(deleteIcon);
  
        fileList.appendChild(div);
  
        // Add image to carousel
        const carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item";
        carouselItem.style.backgroundImage = `url(${e.target.result})`;
        carousel.appendChild(carouselItem);
      };
  
      reader.readAsDataURL(file);
    }
  
    function updateLocalStorage() {
      const storedImagesData = Array.from(fileList.children).map(div => ({
        src: div.querySelector('img').src,
        description: div.querySelector('textarea').value,
        disabled: div.querySelector('textarea').disabled
      }));
      localStorage.setItem("storedImagesData", JSON.stringify(storedImagesData));
    }
  
    function loadFromLocalStorage() {
      const storedImagesData = JSON.parse(
        localStorage.getItem("storedImagesData") || "[]"
      );
      storedImagesData.forEach((data) => {
        const div = document.createElement("div");
        div.className = "file-name";
  
        const img = document.createElement("img");
        img.src = data.src;
        img.className = "thumbnail";
        div.appendChild(img);
  
        const textarea = document.createElement("textarea");
        textarea.value = data.description;
        textarea.disabled = data.disabled;
        div.appendChild(textarea);
  
        const checkIcon = document.createElement("span");
        checkIcon.innerHTML = "✓";
        checkIcon.className = "check-icon";
        checkIcon.style.display = data.disabled ? "none" : "inline";
        checkIcon.onclick = function() {
          alert("Description has been added.");
          textarea.disabled = true;
          checkIcon.style.display = "none";
          updateLocalStorage();
        };
        div.appendChild(checkIcon);
  
        const deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = "✗";
        deleteIcon.className = "delete-icon";
        deleteIcon.onclick = function() {
          div.remove();
          updateLocalStorage();
        };
        div.appendChild(deleteIcon);
  
        fileList.appendChild(div);
  
        // Add image to carousel
        const carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item";
        carouselItem.style.backgroundImage = `url(${data.src})`;
        carousel.appendChild(carouselItem);
      });
    }
  
    loadFromLocalStorage();
  });