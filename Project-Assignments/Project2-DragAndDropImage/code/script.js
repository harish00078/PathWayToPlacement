document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const MAX_IMAGES = 5;

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
      const currentImages = fileList.querySelectorAll(".file-item").length;
      if (currentImages + files.length > MAX_IMAGES) {
          alert(`You can upload a maximum of ${MAX_IMAGES} images.`);
          return;
      }

      for (const file of files) {
          if (!file.type.startsWith("image/") || file.size > Infinity) {
              alert("Only images below 5MB are allowed.");
              continue;
          }
          displayFile(file);
      }
  }

  function displayFile(file) {
      const reader = new FileReader();

      reader.onload = function (e) {
          const div = document.createElement("div");
          div.className = "file-item";

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
      const data = [];
      fileList.querySelectorAll(".file-item").forEach(item => {
          const img = item.querySelector("img").src;
          const description = item.querySelector("textarea").value;
          data.push({ src: img, description });
      });
      localStorage.setItem("storedImagesData", JSON.stringify(data));
  }

  function loadFromLocalStorage() {
      const storedImagesData = JSON.parse(localStorage.getItem("storedImagesData") || "[]");
      storedImagesData.forEach(data => {
          const div = document.createElement("div");
          div.className = "file-item";

          const img = document.createElement("img");
          img.src = data.src;
          img.className = "thumbnail";
          div.appendChild(img);

          const textarea = document.createElement("textarea");
          textarea.value = data.description;
          div.appendChild(textarea);

          const actionsDiv = document.createElement("div");
          actionsDiv.className = "actions";

          const checkIcon = document.createElement("span");
          checkIcon.innerHTML = "&#10003;";
          checkIcon.addEventListener("click", function () {
              alert("Description added.");
              textarea.setAttribute("readonly", "readonly");
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
      });
  }

  loadFromLocalStorage();
});
