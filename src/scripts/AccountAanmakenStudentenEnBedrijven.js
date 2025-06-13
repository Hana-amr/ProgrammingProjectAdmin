// Studenten registreren
  

  function previewFoto(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("foto-preview");
    const label = document.getElementById("foto-label");
    const deleteBtn = document.getElementById("delete-foto-btn");

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
        label.style.display = "none";
        deleteBtn.style.display = "inline-block";
      };
      reader.readAsDataURL(file);
    } else {
        alert('Selecteer een geldige afbeelding!')
    }
  }

  function deleteFoto() {
    const preview = document.getElementById("foto-preview");
    const label = document.getElementById("foto-label");
    const inputFile = document.getElementById("foto");
    const deleteBtn = document.getElementById("delete-foto-btn");

    preview.src = "";
    preview.style.display = "none";
    label.style.display = "block";
    inputFile.value = "";
    deleteBtn.style.display = "none";

  }

  document.getElementById('backHome-btn').addEventListener('click', () => {
    window.location.href = 'keuzeMenu.html'; 
  });


  //oplossen later als er tijd is (low priority)
   document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'keuzeMenu.html'; 
   });

   