// Aplayer
const aplayer = document.getElementById("aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSong = JSON.parse(dataSong);
  dataSinger = JSON.parse(dataSinger);
  const ap = new APlayer({
    container: document.getElementById("aplayer"),
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
      },
    ],
    autoplay: true,
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on("play", function () {
    console.log("play");
    avatar.style.animationPlayState = "running";
  });

  ap.on("pause", function () {
    console.log("pause");
    avatar.style.animationPlayState = "paused";
  });
}

// ? End Aplayer

// ? Button Like
const buttonLike = document.querySelector("[button-like");
if (buttonLike) {
  buttonLike.addEventListener("click", function () {
    const songId = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");

    const typeLike = isActive ? "dislike" : "like";
    const url = `/songs/like/${typeLike}/${songId}`;

    const optionMethod = {
      method: "PATCH",
    };
    fetch(url, optionMethod)
      .then((response) => response.json())
      .then((data) => {
        const span = buttonLike.querySelector("span");
        span.innerHTML = `${data.like} thích`;

        buttonLike.classList.toggle("active");
      });
  });
}

// ? Button Favorite
const buttonFavorite = document.querySelector("[button-favorite]");
if (buttonFavorite) {
  buttonFavorite.addEventListener("click", function () {
    const favoriteId = buttonFavorite.getAttribute("button-favorite");
    const isActive = buttonFavorite.classList.contains("active");

    const typeFavorite = isActive ? "unFavorite" : "favorite";
    const url = `/favorite/${typeFavorite}/${favoriteId}`;
    console.log(url);
    const optionMethod = {
      method: "PATCH",
    };
    fetch(url, optionMethod)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        buttonFavorite.classList.toggle("active");
      });
  });
}