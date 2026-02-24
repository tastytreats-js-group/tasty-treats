import"./assets/header-CnC7bpm-.js";const d="favorite-recipes";function u(){try{const t=localStorage.getItem(d);return t?JSON.parse(t):[]}catch(t){return console.error("Storage parse error:",t),[]}}const a=document.querySelector(".js-favorites-list"),s=document.querySelector(".js-favorites-categories"),m=document.querySelector(".js-favorites-empty");let r=[],n="All";document.addEventListener("DOMContentLoaded",g);function g(){if(r=u(),!r.length){f();return}o(),i(r)}function f(){m.classList.remove("is-hidden"),a.classList.add("is-hidden"),s.classList.add("is-hidden")}function i(t){a.innerHTML=t.map(p).join("")}function p(t){return`
    <li class="recipe-card">
      <img 
        src="${t.thumb}" 
        alt="${t.title}" 
        class="recipe-card-img"
      />

      <div class="recipe-card-content">
        <h3 class="recipe-card-title">${t.title}</h3>

        <div class="recipe-card-meta">
          <span>⭐ ${t.rating??0}</span>
          <span>${t.time??0} min</span>
        </div>
      </div>
    </li>
  `}function o(){const t=["All",...new Set(r.map(e=>e.category))];s.innerHTML=t.map(e=>`
      <button 
        class="category-btn ${e===n?"active":""}"
        data-category="${e}"
      >
        ${e}
      </button>
    `).join(""),v()}function v(){s.querySelectorAll(".category-btn").forEach(e=>{e.addEventListener("click",()=>{n=e.dataset.category;const c=n==="All"?r:r.filter(l=>l.category===n);o(),i(c)})})}
//# sourceMappingURL=favorites.js.map
