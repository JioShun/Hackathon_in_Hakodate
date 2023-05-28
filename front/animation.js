
function toggleForm() {
    var formContainer = document.getElementById("form-container");
    if (formContainer.classList.contains("show")) {
        formContainer.classList.remove("show");
    } else {
        formContainer.classList.add("show");
    }
  }
  
  document.getElementById("add-button").addEventListener("click", toggleForm);
  