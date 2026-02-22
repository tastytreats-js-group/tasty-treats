import"./assets/header-oYee1k3G.js";import{a as h}from"./assets/vendor-C0Zqfgkc.js";const y={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},S=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},L={async getPopularRecipes(){try{return(await h.get(`${y.BASE_URL}${y.ENDPOINTS.POPULAR}`)).data}catch(e){return S(e,"getPopularRecipes")}}},k={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{const r=document.createElement("li");r.classList.add("recipe-list-item"),r.dataset.id=a._id,r.dataset.popup="popup-food",r.dataset.recipe_name=a.title,r.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${a.description?.slice(0,90)}...</p>

        </div>
      `,t.appendChild(r)}),t.addEventListener("click",a=>{const r=a.target.closest(".recipe-list-item");if(!r)return;const n=r.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",n)}))}},P={async init(){try{const e=await L.getPopularRecipes();e&&k.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}},_="modulepreload",A=function(e){return"/vanilla-app-template/"+e},v={},I=function(t,a,r){let n=Promise.resolve();if(a&&a.length>0){let g=function(i){return Promise.all(i.map(c=>Promise.resolve(c).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=s?.nonce||s?.getAttribute("nonce");n=g(a.map(i=>{if(i=A(i),i in v)return;v[i]=!0;const c=i.endsWith(".css"),m=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${m}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":_,c||(d.as="script"),d.crossOrigin="",d.href=i,l&&d.setAttribute("nonce",l),document.head.appendChild(d),c)return new Promise((R,$)=>{d.addEventListener("load",R),d.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${i}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return n.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})},q="https://tasty-treats-backend.p.goit.global/api",u=h.create({baseURL:q,timeout:1e4});function T(e={}){const t={};return Object.entries(e).forEach(([a,r])=>{r==null||r===""||(t[a]=r)}),t}function p(e){if(e?.response){const t=e.response.data?.message||e.response.data?.error||`HTTP ${e.response.status}`;throw new Error(t)}throw e?.request?new Error("Network error. Please try again."):new Error(e?.message||"Unknown error")}async function N(){try{const{data:e}=await u.get("/events");return e}catch(e){return p(e)}}async function C(){try{const{data:e}=await u.get("/categories");return e}catch(e){return p(e)}}async function b(e={}){try{const{data:t}=await u.get("/recipes",{params:T(e)});return t}catch(t){return p(t)}}async function M(){try{const{data:e}=await u.get("/recipes/popular");return e}catch(e){return p(e)}}async function B(e){try{const{data:t}=await u.get(`/recipes/${e}`);return t}catch(t){return p(t)}}async function O(){try{const{data:e}=await u.get("/ingredients");return e}catch(e){return p(e)}}async function U(){try{const{data:e}=await u.get("/areas");return e}catch(e){return p(e)}}async function w(e,t){try{const{data:a}=await u.patch(`/recipes/${e}/rating`,t);return a}catch(a){return p(a)}}async function H(e){try{const{data:t}=await u.post("/orders",e);return t}catch(t){return p(t)}}const x=Object.freeze(Object.defineProperty({__proto__:null,createOrder:H,fetchAreas:U,fetchCategories:C,fetchEvents:N,fetchFilteredRecipes:b,fetchIngredients:O,fetchPopularRecipes:M,fetchRecipeDetails:B,rateRecipe:w},Symbol.toStringTag,{value:"Module"}));function j(e){const t=document.getElementById("modal-root");if(!t)return;t.insertAdjacentHTML("beforeend",`
        <div class="modal-overlay rating-layer" id="ratingLayer">
            <div class="modal-content rating-modal">
                <button type="button" class="close-btn" id="closeRating">&times;</button>
                
                <h2 class="form-title">Rating</h2>
                <p class="rating-subtitle">How do you rate the recipe?</p>

                <form id="ratingForm" class="modal-form">
                    <div class="star-rating-container">
                        <span class="rating-value" id="ratingValue">0.0</span>
                        <div class="star-rating">
                            <input type="radio" id="star5" name="rate" value="5"><label for="star5">★</label>
                            <input type="radio" id="star4" name="rate" value="4"><label for="star4">★</label>
                            <input type="radio" id="star3" name="rate" value="3"><label for="star3">★</label>
                            <input type="radio" id="star2" name="rate" value="2"><label for="star2">★</label>
                            <input type="radio" id="star1" name="rate" value="1"><label for="star1">★</label>
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <input type="email" name="email" class="input-field" placeholder="Enter your email" required>
                    </div>
                    
                    <button type="submit" class="btn-submit">Send</button>
                </form>
            </div>
        </div>
    `);const r=document.getElementById("ratingLayer"),n=r.querySelector("#ratingForm"),o=r.querySelector("#closeRating"),s=r.querySelector("#ratingValue");n.querySelectorAll('input[name="rate"]').forEach(i=>{i.addEventListener("change",c=>{s.textContent=`${parseFloat(c.target.value).toFixed(1)}`})});const g=()=>{r.remove()};o.onclick=g,r.onclick=i=>{i.target===r&&g()},n.addEventListener("submit",async i=>{i.preventDefault();const c=n.rate.value,m=n.email.value;if(!c){alert("Please select a star rating!");return}try{await w(e,{rate:Number(c),email:m}),alert("Rating sent successfully!"),g()}catch(d){alert("Error: "+d.message)}})}function D(e){const t=document.getElementById("modal-root");t&&(t.innerHTML=`
        <div class="modal-overlay">
            <div class="modal-content">
                <button type="button" class="close-btn" id="closeModal">&times;</button>
                <div class="modal-info-wrapper">    
                    <h2 class="modal-title">${e.title.toUpperCase()}</h2>
                    
                    <div class="media-container">
                        ${e.youtube?`<iframe class="modal-video" src="${e.youtube.replace("watch?v=","embed/")}" frameborder="0" allowfullscreen></iframe>`:`<img class="modal-img" src="${e.preview}" alt="${e.title}">`}
                    </div>

                    <div class="modal-info">
                        <div class="modal-tags">
                            ${e.tags?e.tags.map(a=>`<span class="tag">#${a}</span>`).join(""):""}
                            <div class="modal-rating">
                                <span>${e.rating}</span> 
                                <span style="color: #f8a33f;">★★★★☆</span> <span class="modal-time">| ${e.time} min</span>
                            </div>    
                        </div>

                        <ul class="modal-ingredients">
                            ${e.ingredients.map(a=>`
                                <li><span>${a.name}</span> <span class="measure">${a.measure}</span></li>
                            `).join("")}
                        </ul>

                        <p class="modal-description">${e.instructions}</p>
                    </div>
                </div>                
                <div class="modal-actions">
                    <button class="btn-favorite" data-id="${e._id}">Add to favorite</button>
                    <button class="btn-rating-open" data-id="${e._id}">Give a rating</button>
                </div>
            </div>
        </div>
    `,t.style.display="flex",document.body.style.overflow="hidden",F(t))}function F(e){const t=e.querySelector("#closeModal"),a=e.querySelector(".modal-overlay"),r=e.querySelector(".btn-rating-open");r&&(r.onclick=()=>{const s=e.querySelector(".btn-rating-open").dataset.id;j(s)});const n=()=>{e.style.display="none",e.innerHTML="",document.body.style.overflow="auto"};t.onclick=n,a.onclick=s=>{s.target===a&&n()};const o=s=>{s.key==="Escape"&&(n(),window.removeEventListener("keydown",o))};window.addEventListener("keydown",o)}console.log("FILE IS RUNNING");let V={page:1,limit:G()};function G(){const e=window.innerWidth;return e>=1280?9:e>=768?8:6}async function J(){try{const e=await b(V);console.log(e),z(e.results)}catch(e){console.error("Recipes could not load",e)}}J();function W(e){const t=Math.round(e);return Array.from({length:5},(a,r)=>`
        <svg class="star ${r<t?"star-filled":"star-empty"}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join("")}const f=document.querySelector(".recipeList");let E=[];async function z(e){E=e,f.innerHTML=e.map(t=>`
            <li class="recipeCard" data-id="${t._id}">
                <div class="likeButton">
                    <svg class="like-icon">
                        <use href="../img/sprite.svg#icon-heart-outline"></use>
                    </svg>
                </div>
                <div class="rest">
                    <p class="recipeTitle">${t.title}</p>
                    <p class="recipeDescription">${t.description}</p>
                    <div class="ratingandbutton">
                        <div class="recipeRating">
                            <p class="rating">${t.rating}</p>
                            <div class="stars">${W(t.rating)}</div>
                        </div>
                        <button class="seeRecipe">See recipe</button>
                    </div>
                </div>
            </li>
            `).join(""),document.querySelectorAll(".recipeCard").forEach(t=>{const a=t.dataset.id,r=e.find(n=>n._id===a);t.style.backgroundImage=`linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${r.preview})`})}f&&f.addEventListener("click",async e=>{const t=e.target.closest(".seeRecipe");if(t){const r=t.closest(".recipeCard").dataset.id;try{const{fetchRecipeDetails:n}=await I(async()=>{const{fetchRecipeDetails:s}=await Promise.resolve().then(()=>x);return{fetchRecipeDetails:s}},void 0),o=await n(r);D(o)}catch(n){console.error("Tasty Error:",n)}}const a=e.target.closest(".likeButton");if(a){const r=a.closest(".recipeCard").dataset.id,n=JSON.parse(localStorage.getItem("likedRecipes"))||{};if(n[r])delete n[r],a.querySelector("use").setAttribute("href","../img/sprite.svg#icon-heart-outline");else{const o=E.find(s=>s._id===r);n[r]=o,a.querySelector("use").setAttribute("href","../img/sprite.svg#icon-heart-filled")}localStorage.setItem("likedRecipes",JSON.stringify(n)),console.log(n)}});window.addEventListener("load",()=>{P.init()});
//# sourceMappingURL=index.js.map
