import"./assets/header-CnC7bpm-.js";import{a as L}from"./assets/vendor-C0Zqfgkc.js";const C="https://tasty-treats-backend.p.goit.global/api",f=L.create({baseURL:C,timeout:1e4});function _(e={}){const t={};return Object.entries(e).forEach(([a,n])=>{n==null||n===""||(t[a]=n)}),t}function g(e){if(e?.response){const t=e.response.data?.message||e.response.data?.error||`HTTP ${e.response.status}`;throw new Error(t)}throw e?.request?new Error("Network error. Please try again."):new Error(e?.message||"Unknown error")}async function A(){try{const{data:e}=await f.get("/events");return e}catch(e){return g(e)}}async function S(){try{const{data:e}=await f.get("/categories");return e}catch(e){return g(e)}}async function h(e={}){try{const{data:t}=await f.get("/recipes",{params:_(e)});return t}catch(t){return g(t)}}async function B(){try{const{data:e}=await f.get("/recipes/popular");return e}catch(e){return g(e)}}async function I(e){try{const{data:t}=await f.get(`/recipes/${e}`);return t}catch(t){return g(t)}}async function N(){try{const{data:e}=await f.get("/ingredients");return e}catch(e){return g(e)}}async function O(){try{const{data:e}=await f.get("/areas");return e}catch(e){return g(e)}}async function k(e,t){try{const{data:a}=await f.patch(`/recipes/${e}/rating`,t);return a}catch(a){return g(a)}}async function R(e){try{const{data:t}=await f.post("/orders",e);return t}catch(t){return g(t)}}const T=Object.freeze(Object.defineProperty({__proto__:null,createOrder:R,fetchAreas:O,fetchCategories:S,fetchEvents:A,fetchFilteredRecipes:h,fetchIngredients:N,fetchPopularRecipes:B,fetchRecipeDetails:I,rateRecipe:k},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".home-hero-btn"),t=document.getElementById("modal-root");e&&t&&e.addEventListener("click",()=>{t.insertAdjacentHTML("beforeend",`
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
            `),t.style.display="block",document.body.style.overflow="hidden",a()});function a(){const s=document.getElementById("orderLayer"),o=document.getElementById("orderForm"),l=document.getElementById("closeOrder"),u=()=>{s.remove(),t.style.display="none",document.body.style.overflow="auto"};l.onclick=u,s.onclick=i=>{i.target===s&&u()};const m=i=>{i.key==="Escape"&&(u(),window.removeEventListener("keydown",m))};window.addEventListener("keydown",m),o.addEventListener("submit",async i=>{i.preventDefault();const p=document.getElementById("submitOrderBtn"),y={name:o.name.value.trim(),phone:o.phone.value.trim(),email:o.email.value.trim(),comment:o.comment.value.trim()||""};p.disabled=!0,p.style.opacity="0.7";try{await R(y),n("Order successfully placed!"),setTimeout(()=>{u()},1e3)}catch(v){n("Error: "+v.message,"error"),p.disabled=!1,p.style.opacity="1"}})}function n(s,o="success"){let l=document.querySelector(".toast-container");l||(l=document.createElement("div"),l.className="toast-container",document.body.appendChild(l));const u=document.createElement("div");u.className=`toast ${o==="error"?"error":""}`,u.textContent=s,l.appendChild(u),setTimeout(()=>u.remove(),3e3)}const r=document.querySelectorAll(".home-slides"),c=document.querySelectorAll(".home-dot");function d(s){r.forEach(o=>o.style.display="none"),c.forEach(o=>o.classList.remove("active")),r[s]&&(r[s].style.display="flex",c[s].classList.add("active"))}c.forEach((s,o)=>s.addEventListener("click",()=>d(o))),r.length>0&&d(0)});const E={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},M=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},F={async getPopularRecipes(){try{return(await L.get(`${E.BASE_URL}${E.ENDPOINTS.POPULAR}`)).data}catch(e){return M(e,"getPopularRecipes")}}},H={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{const n=document.createElement("li");n.classList.add("recipe-list-item"),n.dataset.id=a._id,n.dataset.popup="popup-food",n.dataset.recipe_name=a.title,n.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${a.description?.slice(0,90)}...</p>

        </div>
      `,t.appendChild(n)}),t.addEventListener("click",a=>{const n=a.target.closest(".recipe-list-item");if(!n)return;const r=n.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",r)}))}},U={async init(){try{const e=await F.getPopularRecipes();e&&H.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}},j="modulepreload",D=function(e){return"/tasty-treats/"+e},w={},X=function(t,a,n){let r=Promise.resolve();if(a&&a.length>0){let o=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),s=d?.nonce||d?.getAttribute("nonce");r=o(a.map(l=>{if(l=D(l),l in w)return;w[l]=!0;const u=l.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const i=document.createElement("link");if(i.rel=u?"stylesheet":j,u||(i.as="script"),i.crossOrigin="",i.href=l,s&&i.setAttribute("nonce",s),document.head.appendChild(i),u)return new Promise((p,y)=>{i.addEventListener("load",p),i.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function c(d){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=d,window.dispatchEvent(s),!s.defaultPrevented)throw d}return r.then(d=>{for(const s of d||[])s.status==="rejected"&&c(s.reason);return t().catch(c)})};function z(e){const t=document.getElementById("modal-root");if(!t)return;t.insertAdjacentHTML("beforeend",`
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
    `);const n=document.getElementById("ratingLayer"),r=n.querySelector("#ratingForm"),c=n.querySelector("#closeRating"),d=n.querySelector("#ratingValue"),s=r.querySelectorAll('input[name="rate"]');s.forEach(m=>{m.addEventListener("change",i=>{d.textContent=`${parseFloat(i.target.value).toFixed(1)}`})});const o=()=>{n.remove()};c.onclick=o,n.onclick=m=>{m.target===n&&o()};function l(m,i="success"){let p=document.querySelector(".toast-container");p||(p=document.createElement("div"),p.className="toast-container",document.body.appendChild(p));const y=document.createElement("div");y.className=`toast ${i==="error"?"error":""}`,y.textContent=m,p.appendChild(y),setTimeout(()=>{y.remove(),p.childNodes.length===0&&p.remove()},3e3)}r.addEventListener("submit",async m=>{m.preventDefault();const i=r.rate.value,p=r.email.value,y=r.querySelector(".btn-submit");if(!i){l("Please select a star rating!","error");return}y.disabled=!0,y.style.opacity="0.7";try{await k(e,{rate:Number(i),email:p}),l("Rating sent successfully!"),setTimeout(()=>{o()},500)}catch(v){l("Error: "+(v.response?.data?.message||v.message),"error"),y.disabled=!1,y.style.opacity="1"}});let u="0.0";s.forEach(m=>{const i=r.querySelector(`label[for="${m.id}"]`);m.addEventListener("change",p=>{u=parseFloat(p.target.value).toFixed(1),d.textContent=u}),i.addEventListener("mouseenter",()=>{i.classList.add("is-hovering"),d.textContent=parseFloat(m.value).toFixed(1)}),i.addEventListener("mouseleave",()=>{i.classList.remove("is-hovering"),d.textContent=u})})}const $="favoriteRecipes",x=()=>JSON.parse(localStorage.getItem($))||[];function J(e){const t=document.getElementById("modal-root");if(!t)return;const r=x().some(c=>c._id===e._id)?"Remove favorite":"Add to favorite";t.innerHTML=`
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
                    <button class="btn-favorite" id="favBtn">${r}</button>
                    <button class="btn-rating-open" data-id="${e._id}">Give a rating</button>
                </div>
            </div>
        </div>
    `,t.style.display="flex",document.body.style.overflow="hidden",V(t,e)}function V(e,t){const a=e.querySelector("#closeModal"),n=e.querySelector(".modal-overlay"),r=e.querySelector(".btn-rating-open"),c=e.querySelector("#favBtn");c.onclick=()=>{let o=x();const l=o.findIndex(u=>u._id===t._id);l===-1?(o.push(t),c.textContent="Remove favorite"):(o.splice(l,1),c.textContent="Add to favorite"),localStorage.setItem($,JSON.stringify(o))},r&&(r.onclick=()=>{z(t._id)});const d=()=>{e.style.display="none",e.innerHTML="",document.body.style.overflow="auto"};a.onclick=d,n.onclick=o=>{o.target===n&&d()};const s=o=>{o.key==="Escape"&&(d(),window.removeEventListener("keydown",s))};window.addEventListener("keydown",s)}console.log("FILE IS RUNNING");let G={page:1,limit:W()};function W(){const e=window.innerWidth;return e>=1280?9:e>=768?8:6}async function K(){try{const e=await h(G);console.log(e),Q(e.results)}catch(e){console.error("Recipes could not load",e)}}K();function Y(e){const t=Math.round(e);return Array.from({length:5},(a,n)=>`
        <svg class="star ${n<t?"star-filled":"star-empty"}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join("")}const b=document.querySelector(".recipeList");let P=[];async function Q(e){P=e,b.innerHTML=e.map(a=>`
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
                            <div class="stars">${Y(a.rating)}</div>
                        </div>
                        <button class="seeRecipe">See recipe</button>
                    </div>
                </div>
            </li>
            `).join(""),document.querySelectorAll(".recipeCard").forEach(a=>{const n=a.dataset.id,r=e.find(c=>c._id===n);a.style.backgroundImage=`linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${r.preview})`});const t=JSON.parse(localStorage.getItem("likedRecipes"))||{};document.querySelectorAll(".recipeCard").forEach(a=>{t[a.dataset.id]&&a.querySelector("use").setAttribute("href","../img/sprite.svg#icon-heart-filled")})}b&&b.addEventListener("click",async e=>{const t=e.target.closest(".seeRecipe");if(t){const n=t.closest(".recipeCard").dataset.id;try{const{fetchRecipeDetails:r}=await X(async()=>{const{fetchRecipeDetails:d}=await Promise.resolve().then(()=>T);return{fetchRecipeDetails:d}},void 0),c=await r(n);J(c)}catch(r){console.error("Tasty Error:",r)}}const a=e.target.closest(".likeButton");if(a){const n=a.closest(".recipeCard").dataset.id,r=JSON.parse(localStorage.getItem("likedRecipes"))||{};if(r[n])delete r[n],a.querySelector("use").setAttribute("href","./img/sprite.svg#icon-heart-outline");else{const c=P.find(d=>d._id===n);r[n]=c,a.querySelector("use").setAttribute("href","./img/sprite.svg#icon-heart-filled")}localStorage.setItem("likedRecipes",JSON.stringify(r)),console.log(r)}});const q=document.querySelector(".categories-list");async function Z(){const e=await S();q.innerHTML=e.map(t=>`<li class="category-item" data-name="${t.name}">
        ${t.name}
      </li>`).join("")}Z();q.addEventListener("click",async e=>{if(!e.target.classList.contains("category-item"))return;const t=e.target.dataset.name;await h({category:t})});window.addEventListener("load",()=>{U.init()});
//# sourceMappingURL=index.js.map
