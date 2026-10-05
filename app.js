const masters = [
  {
    name: "Валя",
    nickname: "alrik_dm",
    avatar: "https://masterpiecer-images.s3.yandex.net/5ff45916b5d1c62:upscaled",
    genre: "Эпическое фэнтези",
    price: "от 2 500 ₽",
    social: "@alrik_dm",
    genres: ["Высокое фэнтези ", " Dark Fantasy", " Приключения"],
    systems: ["D&D 5e", "Pathfinder 2e"],
    homebrew: true,
    bio: "Любит большие кампании, политические интриги и миры, в которых поступки героев действительно меняют историю. Помогает игрокам раскрывать персонажей и всегда оставляет место для неожиданных решений."
  },
  {
    name: "Димон",
    nickname: "lyra.mystery",
    avatar: "https://i.pinimg.com/originals/05/fb/13/05fb137298514a8a7e4e97f4cae16c29.jpg",
    genre: "Детектив / dark fantasy",
    price: "от 2 200 ₽",
    social: "@lyra.mystery",
    genres: ["Mystery", "Dark Fantasy", "Horror"],
    systems: ["D&D 5e", "Call of Cthulhu"],
    homebrew: true,
    bio: "Предпочитает атмосферные расследования, моральные дилеммы и неожиданные развязки. В её играх детали почти никогда не бывают случайными."
  },
  {
    name: "Бухач",
    nickname: "borin_dungeon",
    avatar: "https://i.pinimg.com/originals/b7/5c/8b/b75c8b9121e443ea5248bd779e3d1a3a.jpg",
    genre: "Dungeon crawl",
    price: "от 2 000 ₽",
    social: "@borin_dungeon",
    genres: ["Dungeon Crawl", "Combat", "Fun"],
    systems: ["D&D 5e", "OSR"],
    homebrew: false,
    bio: "Если вы хотите открыть подозрительную дверь, за которой наверняка что-то ужасное — Борин будет рад. Много тактики, опасных подземелий и поводов смеяться за одним столом."
  },
  {
    name: "СаладинПаладинович",
    nickname: "eliana_rp",
    avatar: "https://static.wikia.nocookie.net/rpg/images/6/68/Everyone_s_friend_by_Rhineville.jpg/revision/latest?cb=20160515112857&path-prefix=ru",
    genre: "Roleplay / sandbox",
    price: "от 2 300 ₽",
    social: "@eliana_rp",
    genres: ["Roleplay", "Sandbox", "Storytelling"],
    systems: ["D&D 5e", "Savage Worlds"],
    homebrew: true,
    bio: "Создаёт миры, где у каждого NPC есть история, а у каждой маленькой детали может оказаться значение. Любит импровизацию и решения игроков, которые меняют ход кампании."
  }
];

function renderMasters() {
  const grid = document.querySelector("#mastersGrid");
  if (!grid) return;

  grid.innerHTML = masters.map((m, i) => `
    <button class="master-card master-card-compact" type="button" data-master="${i}" aria-label="Подробнее о мастере ${m.name}">
      <img class="master-avatar" src="${m.avatar}" alt="Аватар мастера ${m.name}">
      <div class="master-card-info">
        <h3>${m.name}</h3>
        <p class="master-genre">${m.genre}</p>
        <strong class="master-price">${m.price}</strong>
      </div>
      <span class="master-card-arrow">↗</span>
    </button>
  `).join("");

  grid.querySelectorAll(".master-card").forEach(card => {
    card.addEventListener("click", () => openMaster(Number(card.dataset.master)));
  });
}

function openMaster(index) {
  const m = masters[index];
  const modal = document.querySelector("#masterModal");
  if (!modal || !m) return;

  modal.querySelector(".modal-avatar").src = m.avatar;
  modal.querySelector(".modal-avatar").alt = `Аватар мастера ${m.name}`;
  modal.querySelector(".modal-name").textContent = m.name;
  modal.querySelector(".modal-nickname").textContent = `@${m.nickname.replace(/^@/, "")}`;
  modal.querySelector(".modal-social").textContent = m.social;
  modal.querySelector(".modal-social").href = m.social.startsWith("http") ? m.social : "#";
  modal.querySelector(".modal-genre").textContent = m.genre;
  modal.querySelector(".modal-price").textContent = m.price;
  modal.querySelector(".modal-genres").innerHTML = m.genres.map(x => `<span>${x}</span>`).join("");
  modal.querySelector(".modal-systems").innerHTML = m.systems.map(x => `<span>${x}</span>`).join("");
  modal.querySelector(".modal-homebrew").textContent = m.homebrew ? "Да" : "Нет";
  modal.querySelector(".modal-bio").textContent = m.bio;

  modal.classList.add("is-open");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeMaster() {
  const modal = document.querySelector("#masterModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderMasters();

  const modal = document.querySelector("#masterModal");
  modal?.querySelector(".modal-close")?.addEventListener("click", closeMaster);
  modal?.querySelector(".modal-backdrop")?.addEventListener("click", closeMaster);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMaster();
  });
});
