import{g as d}from"./assets/local_favorites-BgcPOv3F.js";const a=document.querySelector(".js-favorites-list"),i=document.querySelector(".js-favorites-categories"),u=document.querySelector(".js-favorites-empty");let n=[],s="All";document.addEventListener("DOMContentLoaded",m);function m(){if(n=d(),!n.length){g();return}c(),r(n)}function g(){u.classList.remove("is-hidden"),a.classList.add("is-hidden"),i.classList.add("is-hidden")}function r(t){a.innerHTML=t.map(f).join("")}function f(t){return`
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
  `}function c(){const t=["All",...new Set(n.map(e=>e.category))];i.innerHTML=t.map(e=>`
      <button 
        class="category-btn ${e===s?"active":""}"
        data-category="${e}"
      >
        ${e}
      </button>
    `).join(""),p()}function p(){i.querySelectorAll(".category-btn").forEach(e=>{e.addEventListener("click",()=>{s=e.dataset.category;const o=s==="All"?n:n.filter(l=>l.category===s);c(),r(o)})})}
//# sourceMappingURL=favorites.js.map
