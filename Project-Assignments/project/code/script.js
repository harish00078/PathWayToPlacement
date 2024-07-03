document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const MAX_IMAGES = 5;

  // Load images from localStorage on page load
  loadFromLocalStorage();

  // Dropzone functionality
  dropzone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragleave", function () {
    dropzone.classList.remove("dragover");
  });

  dropzone.addEventListener("drop", function (e) {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
  });

  dropzone.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    const currentImages = fileList.querySelectorAll(".file-name").length;
    if (currentImages + files.length > MAX_IMAGES) {
      alert(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/") || file.size > 1048576) {
        alert("Only images below 1MB are allowed.");
        continue;
      }
      displayFile(file);
    }
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
      div.appendChild(textarea);

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "actions";

      const checkIcon = document.createElement("span");
      checkIcon.innerHTML = "&#10003;";
      checkIcon.addEventListener("click", function () {
        alert("Description added.");
        textarea.setAttribute("readonly", "readonly");
        saveToLocalStorage();
      });
      actionsDiv.appendChild(checkIcon);

      const deleteIcon = document.createElement("span");
      deleteIcon.innerHTML = "&#10005;";
      deleteIcon.addEventListener("click", function () {
        fileList.removeChild(div);
        saveToLocalStorage();
      });
      actionsDiv.appendChild(deleteIcon);

      div.appendChild(actionsDiv);
      fileList.appendChild(div);
      saveToLocalStorage();
    };

    reader.readAsDataURL(file);
  }

  function saveToLocalStorage() {
    const items = [];
    fileList.querySelectorAll(".file-name").forEach(div => {
      const img = div.querySelector("img");
      const textarea = div.querySelector("textarea");
      items.push({ src: img.src, description: textarea.value });
    });
    localStorage.setItem("storedImagesData", JSON.stringify(items));
  }

  function loadFromLocalStorage() {
    const storedImagesData = JSON.parse(localStorage.getItem("storedImagesData") || "[]");
    console.log("Loaded from localStorage:", storedImagesData);
    storedImagesData.forEach(data => {
      const div = document.createElement("div");
      div.className = "file-name";

      const img = document.createElement("img");
      img.src = data.src;
      img.className = "thumbnail";
      div.appendChild(img);

      const textarea = document.createElement("textarea");
      textarea.value = data.description;
      textarea.setAttribute("readonly", "readonly");
      div.appendChild(textarea);

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "actions";

      const deleteIcon = document.createElement("span");
      deleteIcon.innerHTML = "&#10005;";
      deleteIcon.addEventListener("click", function () {
        fileList.removeChild(div);
        saveToLocalStorage();
      });
      actionsDiv.appendChild(deleteIcon);

      div.appendChild(actionsDiv);
      fileList.appendChild(div);
    });
  }
});
