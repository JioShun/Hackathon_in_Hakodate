window.onload = async function() {
  // fetch data from the server
  const response = await fetch('http://localhost:5500/');
  const books = await response.json();

  // HTML要素を取得
  const booksContainer = document.getElementById("books-container");

  // 書籍を表示
  books.forEach(book => {
    const bookElement = document.createElement("div");
    bookElement.innerHTML = `<h3>${book.title}</h3>
                             <p>Author: ${book.author}</p>
                             <p>Category: ${book.category}</p>`;
    booksContainer.appendChild(bookElement);
  });
}

async function addBook() {
  const titleInput = document.getElementById("title-input");
  const kindInput = document.getElementById("kind-input");
  const dateInput = document.getElementById("date-input");
  const textInput = document.getElementById("text-input");

  const response = await fetch('http://localhost:5500/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: titleInput.value,
      kind: kindInput.value,
      date: dateInput.value,
      text: textInput.value
    })
  });

  if (response.ok) {
    titleInput.value = '';
    kindInput.value = '';
    dateInput.value = '';
    textInput.value = '';
    alert("Book added successfully!");
  } else {
    alert("Failed to add book!");
  }
}

function toggleForm() {
  var formContainer = document.getElementById("form-container");
  if (formContainer.style.display === "none") {
      formContainer.style.display = "block";
  } else {
      formContainer.style.display = "none";
  }
}

