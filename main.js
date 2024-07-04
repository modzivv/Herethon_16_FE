document.addEventListener("DOMContentLoaded", () => {
  const sections = [
    { title: "오늘의 추천 작품", className: "today-movies" },
    { title: "인기 순위", className: "movie-ranking" },
    { title: "신작", className: "new-movies" },
  ];

  sections.forEach((section) => {
    fetch(`/api/get_movies?section=${encodeURIComponent(section.title)}`)
      .then((response) => response.json())
      .then((data) => {
        const sectionElement = document.querySelector(
          `h2.${section.className}`
        ).parentElement;
        const rowPostersElement = sectionElement.querySelector(".row_posters");
        rowPostersElement.innerHTML = ""; // Clear existing content

        data.movies.forEach((movie) => {
          const movieLink = document.createElement("a");
          movieLink.className = "posterAndName";
          movieLink.href = movie.detailPageUrl;

          const posterDiv = document.createElement("div");
          posterDiv.className = "poster";

          const posterImg = document.createElement("img");
          posterImg.src = movie.posterUrl;

          const caption = document.createElement("figcaption");
          caption.textContent = movie.name;

          posterDiv.appendChild(posterImg);
          movieLink.appendChild(posterDiv);
          movieLink.appendChild(caption);

          rowPostersElement.appendChild(movieLink);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
});
