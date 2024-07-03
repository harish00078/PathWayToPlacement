document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const clickToBrowse = document.getElementById("clickToBrowse");
  const MAX_IMAGES = 5;
  let imagesData = [];

  clickToBrowse.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("click", () => fileInput.click());

  dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));

  dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

  function handleFiles(files) {
      const filesArray = Array.from(files);
      let invalidFileFound = false;

      filesArray.forEach((file) => {
          if (file.type.startsWith("image/")) {
              if (imagesData.length < MAX_IMAGES) {
                  displayFile(file);
              } else {
                  alert("Maximum number of images reached.");
              }
          } else {
              invalidFileFound = true;
          }
      });

      if (invalidFileFound) {
          alert("Only image files are allowed.");
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
          textarea.placeholder = "Add a description...";
          div.appendChild(textarea);

          const saveButton = document.createElement("button");
          saveButton.textContent = "Save";
          div.appendChild(saveButton);

          saveButton.addEventListener("click", () => {
              const description = textarea.value;
              imagesData.push({ src: img.src, description: description });
              localStorage.setItem("storedImagesData", JSON.stringify(imagesData));
              alert("Description added.");
          });

          fileList.appendChild(div);
      };

      reader.readAsDataURL(file);
  }

  function loadFromLocalStorage() {
      const storedImagesData = JSON.parse(localStorage.getItem("storedImagesData") || "[]");
      console.log("Loaded from localStorage:", storedImagesData);
      storedImagesData.forEach((data) => {
          const div = document.createElement("div");
          div.className = "file-name";

          const img = document.createElement("img");
          img.src = data.src;
          img.className = "thumbnail";
          div.appendChild(img);

          const textarea = document.createElement("textarea");
          textarea.value = data.description;
          div.appendChild(textarea);

          const saveButton = document.createElement("button");
          saveButton.textContent = "Save";
          div.appendChild(saveButton);

          saveButton.addEventListener("click", () => {
              const description = textarea.value;
              const index = imagesData.findIndex((imgData) => imgData.src === img.src);
              if (index > -1) {
                  imagesData[index].description = description;
              } else {
                  imagesData.push({ src: img.src, description: description });
              }
              localStorage.setItem("storedImagesData", JSON.stringify(imagesData));
              alert("Description updated.");
          });

          fileList.appendChild(div);
      });
  }

  loadFromLocalStorage();
});
