import"./assets/header-Ddvfl8jP.js";import{a as L}from"./assets/vendor-C0Zqfgkc.js";const E=document.querySelector(".mobil-menu"),B=document.querySelector(".exit-icon-wrapper"),_=document.querySelector(".menu-icon-wrapper");_.addEventListener("click",()=>{E.classList.toggle("menu-active")});B.addEventListener("click",()=>{E.classList.remove("menu-active")});window.addEventListener("resize",()=>{window.innerWidth>=768&&E.classList.remove("menu-active")});const v=document.querySelector("body"),C=document.querySelector(".mobile-toggle-switch"),T=document.querySelector(".desktop-toggle-switch"),w=localStorage.getItem("theme");w?w==="dark"?v.setAttribute("data-theme","dark"):v.removeAttribute("data-theme"):window.matchMedia("(prefers-color-scheme: dark)").matches&&v.setAttribute("data-theme","dark");function R(){v.getAttribute("data-theme")==="dark"?(v.removeAttribute("data-theme"),localStorage.setItem("theme","light")):(v.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"))}C?.addEventListener("click",R);T?.addEventListener("click",R);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{localStorage.getItem("theme")||(e.matches?v.setAttribute("data-theme","dark"):v.removeAttribute("data-theme"))});const N="https://tasty-treats-backend.p.goit.global/api",y=L.create({baseURL:N,timeout:1e4});function O(e={}){const t={};return Object.entries(e).forEach(([a,r])=>{r==null||r===""||(t[a]=r)}),t}function g(e){if(e?.response){const t=e.response.data?.message||e.response.data?.error||`HTTP ${e.response.status}`;throw new Error(t)}throw e?.request?new Error("Network error. Please try again."):new Error(e?.message||"Unknown error")}async function M(){try{const{data:e}=await y.get("/events");return e}catch(e){return g(e)}}async function F(){try{const{data:e}=await y.get("/categories");return e}catch(e){return g(e)}}async function $(e={}){try{const{data:t}=await y.get("/recipes",{params:O(e)});return t}catch(t){return g(t)}}async function D(){try{const{data:e}=await y.get("/recipes/popular");return e}catch(e){return g(e)}}async function H(e){try{const{data:t}=await y.get(`/recipes/${e}`);return t}catch(t){return g(t)}}async function U(){try{const{data:e}=await y.get("/ingredients");return e}catch(e){return g(e)}}async function j(){try{const{data:e}=await y.get("/areas");return e}catch(e){return g(e)}}async function x(e,t){try{const{data:a}=await y.patch(`/recipes/${e}/rating`,t);return a}catch(a){return g(a)}}async function q(e){try{const{data:t}=await y.post("/orders",e);return t}catch(t){return g(t)}}const X=Object.freeze(Object.defineProperty({__proto__:null,createOrder:q,fetchAreas:j,fetchCategories:F,fetchEvents:M,fetchFilteredRecipes:$,fetchIngredients:U,fetchPopularRecipes:D,fetchRecipeDetails:H,rateRecipe:x},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".home-hero-btn"),t=document.getElementById("modal-root");e&&t&&e.addEventListener("click",()=>{t.insertAdjacentHTML("beforeend",`
                <div class="modal-overlay" id="orderLayer">
                    <div class="modal-content rating-modal">
                        <button type="button" class="close-btn" id="closeOrder">&times;</button>
                        
                        <h2 class="form-title">Order Now</h2>

                        <form id="orderForm" class="modal-form">
                            <div class="input-wrapper">
                                <label class="input-label" style="display:block; margin-bottom:8px; font-size:14px; opacity:0.7;">Name</label>
                                <input type="text" name="name" class="input-field" placeholder="Enter your name" required minlength="2">
                            </div>

                            <div class="input-wrapper">
                                <label class="input-label" style="display:block; margin-bottom:8px; font-size:14px; opacity:0.7;">Phone number</label>
                                <input type="tel" name="phone" class="input-field" placeholder="+90 5XX XXX XX XX" 
                                       pattern="^\\+?\\d{10,13}$" title="Lütfen geçerli bir telefon numarası giriniz" required>
                            </div>

                            <div class="input-wrapper">
                                <label class="input-label" style="display:block; margin-bottom:8px; font-size:14px; opacity:0.7;">Email address</label>
                                <input type="email" name="email" class="input-field" placeholder="example@mail.com" required>
                            </div>

                            <div class="input-wrapper">
                                <label class="input-label" style="display:block; margin-bottom:8px; font-size:14px; opacity:0.7;">Comment</label>
                                <textarea name="comment" class="input-field" style="min-height:100px; resize:none;" placeholder="Anything else you'd like to add?"></textarea>
                            </div>

                            <button type="submit" class="btn-submit" id="submitOrderBtn">Send</button>
                        </form>
                    </div>
                </div>
            `),t.style.display="block",document.body.style.overflow="hidden",a()});function a(){const o=document.getElementById("orderLayer"),s=document.getElementById("orderForm"),l=document.getElementById("closeOrder"),u=()=>{o.remove(),t.style.display="none",document.body.style.overflow="auto"};l.onclick=u,o.onclick=i=>{i.target===o&&u()};const m=i=>{i.key==="Escape"&&(u(),window.removeEventListener("keydown",m))};window.addEventListener("keydown",m),s.addEventListener("submit",async i=>{i.preventDefault();const p=document.getElementById("submitOrderBtn"),f={name:s.name.value.trim(),phone:s.phone.value.trim(),email:s.email.value.trim(),comment:s.comment.value.trim()||""};p.disabled=!0,p.style.opacity="0.7";try{await q(f),r("Order successfully placed!"),setTimeout(()=>{u()},1e3)}catch(h){r("Error: "+h.message,"error"),p.disabled=!1,p.style.opacity="1"}})}function r(o,s="success"){let l=document.querySelector(".toast-container");l||(l=document.createElement("div"),l.className="toast-container",document.body.appendChild(l));const u=document.createElement("div");u.className=`toast ${s==="error"?"error":""}`,u.textContent=o,l.appendChild(u),setTimeout(()=>u.remove(),3e3)}const n=document.querySelectorAll(".home-slides"),c=document.querySelectorAll(".home-dot");function d(o){n.forEach(s=>s.style.display="none"),c.forEach(s=>s.classList.remove("active")),n[o]&&(n[o].style.display="flex",c[o].classList.add("active"))}c.forEach((o,s)=>o.addEventListener("click",()=>d(s))),n.length>0&&d(0)});const k={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},z=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},J={async getPopularRecipes(){try{return(await L.get(`${k.BASE_URL}${k.ENDPOINTS.POPULAR}`)).data}catch(e){return z(e,"getPopularRecipes")}}},V={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{const r=document.createElement("li");r.classList.add("recipe-list-item"),r.dataset.id=a._id,r.dataset.popup="popup-food",r.dataset.recipe_name=a.title,r.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${a.description?.slice(0,90)}...</p>

        </div>
      `,t.appendChild(r)}),t.addEventListener("click",a=>{const r=a.target.closest(".recipe-list-item");if(!r)return;const n=r.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",n)}))}},G={async init(){try{const e=await J.getPopularRecipes();e&&V.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}},W="modulepreload",K=function(e){return"/tasty-treats/"+e},S={},Y=function(t,a,r){let n=Promise.resolve();if(a&&a.length>0){let s=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),o=d?.nonce||d?.getAttribute("nonce");n=s(a.map(l=>{if(l=K(l),l in S)return;S[l]=!0;const u=l.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const i=document.createElement("link");if(i.rel=u?"stylesheet":W,u||(i.as="script"),i.crossOrigin="",i.href=l,o&&i.setAttribute("nonce",o),document.head.appendChild(i),u)return new Promise((p,f)=>{i.addEventListener("load",p),i.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function c(d){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=d,window.dispatchEvent(o),!o.defaultPrevented)throw d}return n.then(d=>{for(const o of d||[])o.status==="rejected"&&c(o.reason);return t().catch(c)})};function Q(e){const t=document.getElementById("modal-root");if(!t)return;t.insertAdjacentHTML("beforeend",`
        <div class="modal-overlay rating-layer" id="ratingLayer">
            <div class="modal-content rating-modal">
                <button type="button" class="close-btn" id="closeRating">&times;</button>
                
                <h2 class="form-title">Rating</h2>

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
    `);const r=document.getElementById("ratingLayer"),n=r.querySelector("#ratingForm"),c=r.querySelector("#closeRating"),d=r.querySelector("#ratingValue"),o=n.querySelectorAll('input[name="rate"]');o.forEach(m=>{m.addEventListener("change",i=>{d.textContent=`${parseFloat(i.target.value).toFixed(1)}`})});const s=()=>{r.remove()};c.onclick=s,r.onclick=m=>{m.target===r&&s()};function l(m,i="success"){let p=document.querySelector(".toast-container");p||(p=document.createElement("div"),p.className="toast-container",document.body.appendChild(p));const f=document.createElement("div");f.className=`toast ${i==="error"?"error":""}`,f.textContent=m,p.appendChild(f),setTimeout(()=>{f.remove(),p.childNodes.length===0&&p.remove()},3e3)}n.addEventListener("submit",async m=>{m.preventDefault();const i=n.rate.value,p=n.email.value,f=n.querySelector(".btn-submit");if(!i){l("Please select a star rating!","error");return}f.disabled=!0,f.style.opacity="0.7";try{await x(e,{rate:Number(i),email:p}),l("Rating sent successfully!"),setTimeout(()=>{s()},500)}catch(h){l("Error: "+(h.response?.data?.message||h.message),"error"),f.disabled=!1,f.style.opacity="1"}});let u="0.0";o.forEach(m=>{const i=n.querySelector(`label[for="${m.id}"]`);m.addEventListener("change",p=>{u=parseFloat(p.target.value).toFixed(1),d.textContent=u}),i.addEventListener("mouseenter",()=>{i.classList.add("is-hovering"),d.textContent=parseFloat(m.value).toFixed(1)}),i.addEventListener("mouseleave",()=>{i.classList.remove("is-hovering"),d.textContent=u})})}const A="favoriteRecipes",P=()=>JSON.parse(localStorage.getItem(A))||[];function Z(e){const t=document.getElementById("modal-root");if(!t)return;const n=P().some(c=>c._id===e._id)?"Remove favorite":"Add to favorite";t.innerHTML=`
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
                            ${e.tags?e.tags.map(c=>`<span class="tag">#${c}</span>`).join(""):""}
                            <div class="modal-rating">
                                <span>${e.rating}</span> 
                                <span style="color: #f8a33f;">★★★★☆</span> <span class="modal-time">| ${e.time} min</span>
                            </div>    
                        </div>
                        <ul class="modal-ingredients">
                            ${e.ingredients.map(c=>`
                                <li><span>${c.name}</span> <span class="measure">${c.measure}</span></li>
                            `).join("")}
                        </ul>
                        <p class="modal-description">${e.instructions}</p>
                    </div>
                </div>                
                <div class="modal-actions">
                    <button class="btn-favorite" id="favBtn">${n}</button>
                    <button class="btn-rating-open" data-id="${e._id}">Give a rating</button>
                </div>
            </div>
        </div>
    `,t.style.display="flex",document.body.style.overflow="hidden",ee(t,e)}function ee(e,t){const a=e.querySelector("#closeModal"),r=e.querySelector(".modal-overlay"),n=e.querySelector(".btn-rating-open"),c=e.querySelector("#favBtn");c.onclick=()=>{let s=P();const l=s.findIndex(u=>u._id===t._id);l===-1?(s.push(t),c.textContent="Remove favorite"):(s.splice(l,1),c.textContent="Add to favorite"),localStorage.setItem(A,JSON.stringify(s))},n&&(n.onclick=()=>{Q(t._id)});const d=()=>{e.style.display="none",e.innerHTML="",document.body.style.overflow="auto"};a.onclick=d,r.onclick=s=>{s.target===r&&d()};const o=s=>{s.key==="Escape"&&(d(),window.removeEventListener("keydown",o))};window.addEventListener("keydown",o)}console.log("FILE IS RUNNING");let te={page:1,limit:ae()};function ae(){const e=window.innerWidth;return e>=1280?9:e>=768?8:6}async function re(){try{const e=await $(te);console.log(e),oe(e.results)}catch(e){console.error("Recipes could not load",e)}}re();function ne(e){const t=Math.round(e);return Array.from({length:5},(a,r)=>`
        <svg class="star ${r<t?"star-filled":"star-empty"}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join("")}const b=document.querySelector(".recipeList");let I=[];async function oe(e){I=e,b.innerHTML=e.map(a=>`
            <li class="recipeCard" data-id="${a._id}">
                <div class="likeButton">
                    <svg class="like-icon">
                        <use href="../img/sprite.svg#icon-heart-outline"></use>
                    </svg>
                </div>
                <div class="rest">
                    <p class="recipeTitle">${a.title}</p>
                    <p class="recipeDescription">${a.description}</p>
                    <div class="ratingandbutton">
                        <div class="recipeRating">
                            <p class="rating">${a.rating}</p>
                            <div class="stars">${ne(a.rating)}</div>
                        </div>
                        <button class="seeRecipe">See recipe</button>
                    </div>
                </div>
            </li>
            `).join(""),document.querySelectorAll(".recipeCard").forEach(a=>{const r=a.dataset.id,n=e.find(c=>c._id===r);a.style.backgroundImage=`linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${n.preview})`});const t=JSON.parse(localStorage.getItem("likedRecipes"))||{};document.querySelectorAll(".recipeCard").forEach(a=>{t[a.dataset.id]&&a.querySelector("use").setAttribute("href","../img/sprite.svg#icon-heart-filled")})}b&&b.addEventListener("click",async e=>{const t=e.target.closest(".seeRecipe");if(t){const r=t.closest(".recipeCard").dataset.id;try{const{fetchRecipeDetails:n}=await Y(async()=>{const{fetchRecipeDetails:d}=await Promise.resolve().then(()=>X);return{fetchRecipeDetails:d}},void 0),c=await n(r);Z(c)}catch(n){console.error("Tasty Error:",n)}}const a=e.target.closest(".likeButton");if(a){const r=a.closest(".recipeCard").dataset.id,n=JSON.parse(localStorage.getItem("likedRecipes"))||{};if(n[r])delete n[r],a.querySelector("use").setAttribute("href","./img/sprite.svg#icon-heart-outline");else{const c=I.find(d=>d._id===r);n[r]=c,a.querySelector("use").setAttribute("href","./img/sprite.svg#icon-heart-filled")}localStorage.setItem("likedRecipes",JSON.stringify(n)),console.log(n)}});window.addEventListener("load",()=>{G.init()});
//# sourceMappingURL=index.js.map
