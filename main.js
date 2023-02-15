function updateAPI(subject) {
  var url =
    "https://script.google.com/macros/s/AKfycbwVy1I7EB_0qg_3rMjpeOv00520LZIhmJnxtMdqb6T0EKwjL7mDP3Wwv1O271_J827C/exec?subject=" +
    subject;

  const cardContainer = document.getElementById("card-container");
  const searchInput = document.getElementById("search-input");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var containersData = data.data;
      containersData.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <h1 class="subject">${item.subject}</h1>
        <h2 class="type">${item.type}</h2>
        <h3 class="title">${item.title}</h3>
        <a href="${item.link}" class="download-button">Download</a>
      `;
        cardContainer.appendChild(card);
      });
    });

  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const title = card.querySelector(".title").textContent.toLowerCase();
      const subject = card.querySelector(".subject").textContent.toLowerCase();
      if (title.indexOf(searchTerm) && subject.indexOf(searchTerm) === -1) {
        card.style.display = "none";
      } else {
        card.style.display = "";
      }
    });
  });
}
