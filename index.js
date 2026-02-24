import{i as b,r as $,a as k}from"./assets/local_favorites-BgcPOv3F.js";import{a as R}from"./assets/vendor-C0Zqfgkc.js";const q="https://tasty-treats-backend.p.goit.global/api",f=R.create({baseURL:q,timeout:1e4});function B(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{a==null||a===""||(t[n]=a)}),t}function v(e){if(e?.response){const t=e.response.data?.message||e.response.data?.error||`HTTP ${e.response.status}`;throw new Error(t)}throw e?.request?new Error("Network error. Please try again."):new Error(e?.message||"Unknown error")}async function A(){try{const{data:e}=await f.get("/events");return e}catch(e){return v(e)}}async function S(){try{const{data:e}=await f.get("/categories");return e}catch(e){return v(e)}}async function E(e={}){try{const{data:t}=await f.get("/recipes",{params:B(e)});return t}catch(t){return v(t)}}async function T(){try{const{data:e}=await f.get("/recipes/popular");return e}catch(e){return v(e)}}async function N(e){try{const{data:t}=await f.get(`/recipes/${e}`);return t}catch(t){return v(t)}}async function I(){try{const{data:e}=await f.get("/ingredients");return e}catch(e){return v(e)}}async function M(){try{const{data:e}=await f.get("/areas");return e}catch(e){return v(e)}}async function x(e,t){try{const{data:n}=await f.patch(`/recipes/${e}/rating`,t);return n}catch(n){return v(n)}}async function P(e){try{const{data:t}=await f.post("/orders/add",e);return t}catch(t){return v(t)}}const O=Object.freeze(Object.defineProperty({__proto__:null,createOrder:P,fetchAreas:M,fetchCategories:S,fetchEvents:A,fetchFilteredRecipes:E,fetchIngredients:I,fetchPopularRecipes:T,fetchRecipeDetails:N,rateRecipe:x},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".home-hero-btn"),t=document.getElementById("modal-root");e&&t&&e.addEventListener("click",()=>{t.insertAdjacentHTML("beforeend",`
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
            `),t.style.display="block",document.body.style.overflow="hidden",n()});function n(){const o=document.getElementById("orderLayer"),c=document.getElementById("orderForm"),l=document.getElementById("closeOrder"),d=()=>{o.remove(),t.style.display="none",document.body.style.overflow="auto"};l.onclick=d,o.onclick=s=>{s.target===o&&d()};const u=s=>{s.key==="Escape"&&(d(),window.removeEventListener("keydown",u))};window.addEventListener("keydown",u),c.addEventListener("submit",async s=>{s.preventDefault();const m=document.getElementById("submitOrderBtn"),y={name:c.name.value.trim(),phone:c.phone.value.trim(),email:c.email.value.trim(),comment:c.comment.value.trim()||""};m.disabled=!0,m.style.opacity="0.7";try{await P(y),a("Order successfully placed!"),setTimeout(()=>{d()},1e3)}catch(g){a("Error: "+g.message,"error"),m.disabled=!1,m.style.opacity="1"}})}function a(o,c="success"){let l=document.querySelector(".toast-container");l||(l=document.createElement("div"),l.className="toast-container",document.body.appendChild(l));const d=document.createElement("div");d.className=`toast ${c==="error"?"error":""}`,d.textContent=o,l.appendChild(d),setTimeout(()=>d.remove(),3e3)}const r=document.querySelectorAll(".home-slides"),p=document.querySelectorAll(".home-dot");function i(o){r.forEach(c=>c.style.display="none"),p.forEach(c=>c.classList.remove("active")),r[o]&&(r[o].style.display="flex",p[o].classList.add("active"))}p.forEach((o,c)=>o.addEventListener("click",()=>i(c))),r.length>0&&i(0)});const w={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},F=(e,t="")=>{console.error(`[${t}] Hata:`,e);const n=document.querySelector(".error-message");return n&&(n.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,n.style.display="block"),null},H={async getPopularRecipes(){try{return(await R.get(`${w.BASE_URL}${w.ENDPOINTS.POPULAR}`)).data}catch(e){return F(e,"getPopularRecipes")}}},U={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(n=>{const a=document.createElement("li");a.classList.add("recipe-list-item"),a.dataset.id=n._id,a.dataset.popup="popup-food",a.dataset.recipe_name=n.title,a.innerHTML=`
        <img class="recipe-box-img" src="${n.preview}" alt="${n.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${n.title}</h3>
          <p class="recipe-box-text">${n.description?.slice(0,90)}...</p>

        </div>
      `,t.appendChild(a)}),t.addEventListener("click",n=>{const a=n.target.closest(".recipe-list-item");if(!a)return;const r=a.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",r)}))}},j={async init(){try{const e=await H.getPopularRecipes();e&&U.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}},D="modulepreload",X=function(e){return"/tasty-treats/"+e},L={},z=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),o=i?.nonce||i?.getAttribute("nonce");r=c(n.map(l=>{if(l=X(l),l in L)return;L[l]=!0;const d=l.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const s=document.createElement("link");if(s.rel=d?"stylesheet":D,d||(s.as="script"),s.crossOrigin="",s.href=l,o&&s.setAttribute("nonce",o),document.head.appendChild(s),d)return new Promise((m,y)=>{s.addEventListener("load",m),s.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function p(i){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i}return r.then(i=>{for(const o of i||[])o.status==="rejected"&&p(o.reason);return t().catch(p)})};function V(e){const t=document.getElementById("modal-root");if(!t)return;t.insertAdjacentHTML("beforeend",`
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
    `);const a=document.getElementById("ratingLayer"),r=a.querySelector("#ratingForm"),p=a.querySelector("#closeRating"),i=a.querySelector("#ratingValue"),o=r.querySelectorAll('input[name="rate"]');o.forEach(u=>{u.addEventListener("change",s=>{i.textContent=`${parseFloat(s.target.value).toFixed(1)}`})});const c=()=>{a.remove()};p.onclick=c,a.onclick=u=>{u.target===a&&c()};function l(u,s="success"){let m=document.querySelector(".toast-container");m||(m=document.createElement("div"),m.className="toast-container",document.body.appendChild(m));const y=document.createElement("div");y.className=`toast ${s==="error"?"error":""}`,y.textContent=u,m.appendChild(y),setTimeout(()=>{y.remove(),m.childNodes.length===0&&m.remove()},3e3)}r.addEventListener("submit",async u=>{u.preventDefault();const s=r.rate.value,m=r.email.value,y=r.querySelector(".btn-submit");if(!s){l("Please select a star rating!","error");return}y.disabled=!0,y.style.opacity="0.7";try{await x(e,{rate:Number(s),email:m}),l("Rating sent successfully!"),setTimeout(()=>{c()},500)}catch(g){l("Error: "+(g.response?.data?.message||g.message),"error"),y.disabled=!1,y.style.opacity="1"}});let d="0.0";o.forEach(u=>{const s=r.querySelector(`label[for="${u.id}"]`);u.addEventListener("change",m=>{d=parseFloat(m.target.value).toFixed(1),i.textContent=d}),s.addEventListener("mouseenter",()=>{s.classList.add("is-hovering"),i.textContent=parseFloat(u.value).toFixed(1)}),s.addEventListener("mouseleave",()=>{s.classList.remove("is-hovering"),i.textContent=d})})}function G(e){const t=document.getElementById("modal-root");if(!t)return;const a=b(e._id)?"Remove favorite":"Add to favorite";t.innerHTML=`
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
                            ${e.tags?e.tags.map(r=>`<span class="tag">#${r}</span>`).join(""):""}
                            <div class="modal-rating">
                                <span>${e.rating}</span> 
                                <span style="color: #f8a33f;">★★★★☆</span> <span class="modal-time">| ${e.time} min</span>
                            </div>    
                        </div>
                        <ul class="modal-ingredients">
                            ${e.ingredients.map(r=>`
                                <li><span>${r.name}</span> <span class="measure">${r.measure}</span></li>
                            `).join("")}
                        </ul>
                        <p class="modal-description">${e.instructions}</p>
                    </div>
                </div>                
                <div class="modal-actions">
                    <button class="btn-favorite" id="favBtn">${a}</button>
                    <button class="btn-rating-open" data-id="${e._id}">Give a rating</button>
                </div>
            </div>
        </div>
    `,t.style.display="flex",document.body.style.overflow="hidden",W(t,e)}function W(e,t){const n=e.querySelector("#closeModal"),a=e.querySelector(".modal-overlay"),r=e.querySelector(".btn-rating-open"),p=e.querySelector("#favBtn");p.onclick=()=>{b(t._id)?($(t._id),p.textContent="Add to favorite"):(k(t),p.textContent="Remove favorite")},r&&(r.onclick=()=>{V(t._id)});const i=()=>{e.style.display="none",e.innerHTML="",document.body.style.overflow="auto"};n.onclick=i,a.onclick=c=>{c.target===a&&i()};const o=c=>{c.key==="Escape"&&(i(),window.removeEventListener("keydown",o))};window.addEventListener("keydown",o)}console.log("FILE IS RUNNING");let J={page:1,limit:K()};function K(){const e=window.innerWidth;return e>=1280?9:e>=768?8:6}async function Q(){try{const e=await E(J);Z(e.results)}catch(e){console.error("Recipes could not load",e)}}Q();function Y(e){const t=Math.round(e);return Array.from({length:5},(n,a)=>`
        <svg class="star ${a<t?"star-filled":"star-empty"}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join("")}const h=document.querySelector(".recipeList");let C=[];async function Z(e){C=e,h.innerHTML=e.map(t=>`
            <li class="recipeCard" data-id="${t._id}">
                <div class="likeButton">
                    <svg class="like-icon">
                        <use href="../img/sprite.svg#icon-${b(t._id)?"heart-filled":"heart-outline"}"></use>
                    </svg>
                </div>
                <div class="rest">
                    <p class="recipeTitle">${t.title}</p>
                    <p class="recipeDescription">${t.description}</p>
                    <div class="ratingandbutton">
                        <div class="recipeRating">
                            <p class="rating">${t.rating}</p>
                            <div class="stars">${Y(t.rating)}</div>
                        </div>
                        <button class="seeRecipe">See recipe</button>
                    </div>
                </div>
            </li>
        `).join(""),document.querySelectorAll(".recipeCard").forEach(t=>{const n=t.dataset.id,a=e.find(r=>r._id===n);t.style.backgroundImage=`linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${a.preview})`})}h&&h.addEventListener("click",async e=>{const t=e.target.closest(".seeRecipe");if(t){const a=t.closest(".recipeCard").dataset.id;try{const{fetchRecipeDetails:r}=await z(async()=>{const{fetchRecipeDetails:i}=await Promise.resolve().then(()=>O);return{fetchRecipeDetails:i}},void 0),p=await r(a);G(p)}catch(r){console.error("Tasty Error:",r)}}const n=e.target.closest(".likeButton");if(n){const r=n.closest(".recipeCard").dataset.id,p=n.querySelector("use");if(b(r))$(r),p.setAttribute("href","../img/sprite.svg#icon-heart-outline");else{const i=C.find(o=>o._id===r);k(i),p.setAttribute("href","../img/sprite.svg#icon-heart-filled")}}});const _=document.querySelector(".categories-list");async function ee(){const e=await S();_.innerHTML=e.map(t=>`<li class="category-item" data-name="${t.name}">
        ${t.name}
      </li>`).join("")}ee();_.addEventListener("click",async e=>{if(!e.target.classList.contains("category-item"))return;const t=e.target.dataset.name;await E({category:t})});window.addEventListener("load",()=>{j.init()});
//# sourceMappingURL=index.js.map
