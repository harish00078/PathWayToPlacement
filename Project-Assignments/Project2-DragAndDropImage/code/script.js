document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const MAX_IMAGES = 5;

  loadFromLocalStorage();

  dropzone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropzone.classList.remove('dragover');
      handleFiles(event.dataTransfer.files);
  });

  dropzone.addEventListener('click', () => {
      fileInput.click();
  });

  fileInput.addEventListener('change', () => {
      handleFiles(fileInput.files);
  });

  function handleFiles(files) {
      if (fileList.children.length + files.length > MAX_IMAGES) {
          alert('You can only upload a maximum of 5 images.');
          return;
      }

      Array.from(files).forEach(file => {
          if (file.type.startsWith('image/') && file.size <= 1024 * 1024) {
              displayFile(file);
          } else {
              alert('Only images under 1MB are allowed.');
          }
      });
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
          textarea.placeholder = "Add a description";
          div.appendChild(textarea);

          const actions = document.createElement("div");
          actions.className = "actions";

          const checkIcon = document.createElement("span");
          checkIcon.textContent = '✔';
          checkIcon.addEventListener('click', () => {
              alert('Description has been added.');
              textarea.setAttribute('readonly', 'readonly');
          });
          actions.appendChild(checkIcon);

          const deleteIcon = document.createElement("span");
          deleteIcon.textContent = '❌';
          deleteIcon.addEventListener('click', () => {
              fileList.removeChild(div);
              saveToLocalStorage();
          });
          actions.appendChild(deleteIcon);

          div.appendChild(actions);
          fileList.appendChild(div);

          saveToLocalStorage();
      };

      reader.readAsDataURL(file);
  }

  function saveToLocalStorage() {
      const imagesData = [];
      fileList.querySelectorAll('.file-item').forEach(item => {
          const img = item.querySelector('img').src;
          const description = item.querySelector('textarea').value;
          imagesData.push({ src: img, description });
      });
      localStorage.setItem('storedImagesData', JSON.stringify(imagesData));
  }

  function loadFromLocalStorage() {
      const storedImagesData = JSON.parse(localStorage.getItem('storedImagesData') || '[]');
      storedImagesData.forEach((data) => {
          const div = document.createElement("div");
          div.className = "file-item";

          const img = document.createElement("img");
          img.src = data.src;
          img.className = "thumbnail";
          div.appendChild(img);

          const textarea = document.createElement("textarea");
          textarea.placeholder = "Add a description";
          textarea.value = data.description;
          div.appendChild(textarea);

          const actions = document.createElement("div");
          actions.className = "actions";

          const checkIcon = document.createElement("span");
          checkIcon.textContent = '✔';
          checkIcon.addEventListener('click', () => {
              alert('Description has been added.');
              textarea.setAttribute('readonly', 'readonly');
          });
          actions.appendChild(checkIcon);

          const deleteIcon = document.createElement("span");
          deleteIcon.textContent = '❌';
          deleteIcon.addEventListener('click', () => {
              fileList.removeChild(div);
              saveToLocalStorage();
          });
          actions.appendChild(deleteIcon);

          div.appendChild(actions);
          fileList.appendChild(div);
      });
  }
});
