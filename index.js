import{i as L,r as q,a as B}from"./assets/local_favorites-mdPmc23F.js";import{a as S}from"./assets/vendor-C0Zqfgkc.js";const A="https://tasty-treats-backend.p.goit.global/api",f=S.create({baseURL:A,timeout:1e4});function T(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{a==null||a===""||(t[n]=a)}),t}function v(e){if(e?.response){const t=e.response.data?.message||e.response.data?.error||`HTTP ${e.response.status}`;throw new Error(t)}throw e?.request?new Error("Network error. Please try again."):new Error(e?.message||"Unknown error")}async function I(){try{const{data:e}=await f.get("/events");return e}catch(e){return v(e)}}async function $(){try{const{data:e}=await f.get("/categories");return e}catch(e){return v(e)}}async function h(e={}){try{const{data:t}=await f.get("/recipes",{params:T(e)});return t}catch(t){return v(t)}}async function N(){try{const{data:e}=await f.get("/recipes/popular");return e}catch(e){return v(e)}}async function O(e){try{const{data:t}=await f.get(`/recipes/${e}`);return t}catch(t){return v(t)}}async function M(){try{const{data:e}=await f.get("/ingredients");return e}catch(e){return v(e)}}async function F(){try{const{data:e}=await f.get("/areas");return e}catch(e){return v(e)}}async function k(e,t){try{const{data:n}=await f.patch(`/recipes/${e}/rating`,t);return n}catch(n){return v(n)}}async function R(e){try{const{data:t}=await f.post("/orders",e);return t}catch(t){return v(t)}}const H=Object.freeze(Object.defineProperty({__proto__:null,createOrder:R,fetchAreas:F,fetchCategories:$,fetchEvents:I,fetchFilteredRecipes:h,fetchIngredients:M,fetchPopularRecipes:N,fetchRecipeDetails:O,rateRecipe:k},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".home-hero-btn"),t=document.getElementById("modal-root");e&&t&&e.addEventListener("click",()=>{t.insertAdjacentHTML("beforeend",`
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
            `),t.style.display="block",document.body.style.overflow="hidden",n()});function n(){const s=document.getElementById("orderLayer"),o=document.getElementById("orderForm"),c=document.getElementById("closeOrder"),u=()=>{s.remove(),t.style.display="none",document.body.style.overflow="auto"};c.onclick=u,s.onclick=i=>{i.target===s&&u()};const m=i=>{i.key==="Escape"&&(u(),window.removeEventListener("keydown",m))};window.addEventListener("keydown",m),o.addEventListener("submit",async i=>{i.preventDefault();const p=document.getElementById("submitOrderBtn"),y={name:o.name.value.trim(),phone:o.phone.value.trim(),email:o.email.value.trim(),comment:o.comment.value.trim()||""};p.disabled=!0,p.style.opacity="0.7";try{await R(y),a("Order successfully placed!"),setTimeout(()=>{u()},1e3)}catch(g){a("Error: "+g.message,"error"),p.disabled=!1,p.style.opacity="1"}})}function a(s,o="success"){let c=document.querySelector(".toast-container");c||(c=document.createElement("div"),c.className="toast-container",document.body.appendChild(c));const u=document.createElement("div");u.className=`toast ${o==="error"?"error":""}`,u.textContent=s,c.appendChild(u),setTimeout(()=>u.remove(),3e3)}const r=document.querySelectorAll(".home-slides"),l=document.querySelectorAll(".home-dot");function d(s){r.forEach(o=>o.style.display="none"),l.forEach(o=>o.classList.remove("active")),r[s]&&(r[s].style.display="flex",l[s].classList.add("active"))}l.forEach((s,o)=>s.addEventListener("click",()=>d(o))),r.length>0&&d(0)});const E={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},U=(e,t="")=>{console.error(`[${t}] Hata:`,e);const n=document.querySelector(".error-message");return n&&(n.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,n.style.display="block"),null},j={async getPopularRecipes(){try{return(await S.get(`${E.BASE_URL}${E.ENDPOINTS.POPULAR}`)).data}catch(e){return U(e,"getPopularRecipes")}}},D={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(n=>{const a=document.createElement("li");a.classList.add("recipe-list-item"),a.dataset.id=n._id,a.dataset.popup="popup-food",a.dataset.recipe_name=n.title,a.innerHTML=`
        <img class="recipe-box-img" src="${n.preview}" alt="${n.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${n.title}</h3>
          <p class="recipe-box-text">${n.description?.slice(0,90)}...</p>

        </div>
      `,t.appendChild(a)}),t.addEventListener("click",n=>{const a=n.target.closest(".recipe-list-item");if(!a)return;const r=a.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",r)}))}},X={async init(){try{const e=await j.getPopularRecipes();e&&D.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}},z="modulepreload",V=function(e){return"/tasty-treats/"+e},w={},G=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let o=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),s=d?.nonce||d?.getAttribute("nonce");r=o(n.map(c=>{if(c=V(c),c in w)return;w[c]=!0;const u=c.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const i=document.createElement("link");if(i.rel=u?"stylesheet":z,u||(i.as="script"),i.crossOrigin="",i.href=c,s&&i.setAttribute("nonce",s),document.head.appendChild(i),u)return new Promise((p,y)=>{i.addEventListener("load",p),i.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function l(d){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=d,window.dispatchEvent(s),!s.defaultPrevented)throw d}return r.then(d=>{for(const s of d||[])s.status==="rejected"&&l(s.reason);return t().catch(l)})};function J(e){const t=document.getElementById("modal-root");if(!t)return;t.insertAdjacentHTML("beforeend",`
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
    `);const a=document.getElementById("ratingLayer"),r=a.querySelector("#ratingForm"),l=a.querySelector("#closeRating"),d=a.querySelector("#ratingValue"),s=r.querySelectorAll('input[name="rate"]');s.forEach(m=>{m.addEventListener("change",i=>{d.textContent=`${parseFloat(i.target.value).toFixed(1)}`})});const o=()=>{a.remove()};l.onclick=o,a.onclick=m=>{m.target===a&&o()};function c(m,i="success"){let p=document.querySelector(".toast-container");p||(p=document.createElement("div"),p.className="toast-container",document.body.appendChild(p));const y=document.createElement("div");y.className=`toast ${i==="error"?"error":""}`,y.textContent=m,p.appendChild(y),setTimeout(()=>{y.remove(),p.childNodes.length===0&&p.remove()},3e3)}r.addEventListener("submit",async m=>{m.preventDefault();const i=r.rate.value,p=r.email.value,y=r.querySelector(".btn-submit");if(!i){c("Please select a star rating!","error");return}y.disabled=!0,y.style.opacity="0.7";try{await k(e,{rate:Number(i),email:p}),c("Rating sent successfully!"),setTimeout(()=>{o()},500)}catch(g){c("Error: "+(g.response?.data?.message||g.message),"error"),y.disabled=!1,y.style.opacity="1"}});let u="0.0";s.forEach(m=>{const i=r.querySelector(`label[for="${m.id}"]`);m.addEventListener("change",p=>{u=parseFloat(p.target.value).toFixed(1),d.textContent=u}),i.addEventListener("mouseenter",()=>{i.classList.add("is-hovering"),d.textContent=parseFloat(m.value).toFixed(1)}),i.addEventListener("mouseleave",()=>{i.classList.remove("is-hovering"),d.textContent=u})})}const x="favoriteRecipes",P=()=>JSON.parse(localStorage.getItem(x))||[];function W(e){const t=document.getElementById("modal-root");if(!t)return;const r=P().some(l=>l._id===e._id)?"Remove favorite":"Add to favorite";t.innerHTML=`
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
                            ${e.tags?e.tags.map(l=>`<span class="tag">#${l}</span>`).join(""):""}
                            <div class="modal-rating">
                                <span>${e.rating}</span> 
                                <span style="color: #f8a33f;">★★★★☆</span> <span class="modal-time">| ${e.time} min</span>
                            </div>    
                        </div>
                        <ul class="modal-ingredients">
                            ${e.ingredients.map(l=>`
                                <li><span>${l.name}</span> <span class="measure">${l.measure}</span></li>
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
    `,t.style.display="flex",document.body.style.overflow="hidden",K(t,e)}function K(e,t){const n=e.querySelector("#closeModal"),a=e.querySelector(".modal-overlay"),r=e.querySelector(".btn-rating-open"),l=e.querySelector("#favBtn");l.onclick=()=>{let o=P();const c=o.findIndex(u=>u._id===t._id);c===-1?(o.push(t),l.textContent="Remove favorite"):(o.splice(c,1),l.textContent="Add to favorite"),localStorage.setItem(x,JSON.stringify(o))},r&&(r.onclick=()=>{J(t._id)});const d=()=>{e.style.display="none",e.innerHTML="",document.body.style.overflow="auto"};n.onclick=d,a.onclick=o=>{o.target===a&&d()};const s=o=>{o.key==="Escape"&&(d(),window.removeEventListener("keydown",s))};window.addEventListener("keydown",s)}console.log("FILE IS RUNNING");let Y={page:1,limit:Q()};function Q(){const e=window.innerWidth;return e>=1280?9:e>=768?8:6}async function Z(){try{const e=await h(Y);te(e.results)}catch(e){console.error("Recipes could not load",e)}}Z();function ee(e){const t=Math.round(e);return Array.from({length:5},(n,a)=>`
        <svg class="star ${a<t?"star-filled":"star-empty"}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join("")}const b=document.querySelector(".recipeList");let _=[];async function te(e){_=e,b.innerHTML=e.map(t=>`
            <li class="recipeCard" data-id="${t._id}">
                <div class="likeButton">
                    <svg class="like-icon">
                        <use href="../img/sprite.svg#icon-${L(t._id)?"heart-filled":"heart-outline"}"></use>
                    </svg>
                </div>
                <div class="rest">
                    <p class="recipeTitle">${t.title}</p>
                    <p class="recipeDescription">${t.description}</p>
                    <div class="ratingandbutton">
                        <div class="recipeRating">
                            <p class="rating">${t.rating}</p>
                            <div class="stars">${ee(t.rating)}</div>
                        </div>
                        <button class="seeRecipe">See recipe</button>
                    </div>
                </div>
            </li>
        `).join(""),document.querySelectorAll(".recipeCard").forEach(t=>{const n=t.dataset.id,a=e.find(r=>r._id===n);t.style.backgroundImage=`linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${a.preview})`})}b&&b.addEventListener("click",async e=>{const t=e.target.closest(".seeRecipe");if(t){const a=t.closest(".recipeCard").dataset.id;try{const{fetchRecipeDetails:r}=await G(async()=>{const{fetchRecipeDetails:d}=await Promise.resolve().then(()=>H);return{fetchRecipeDetails:d}},void 0),l=await r(a);W(l)}catch(r){console.error("Tasty Error:",r)}}const n=e.target.closest(".likeButton");if(n){const r=n.closest(".recipeCard").dataset.id,l=n.querySelector("use");if(L(r))q(r),l.setAttribute("href","../img/sprite.svg#icon-heart-outline");else{const d=_.find(s=>s._id===r);B(d),l.setAttribute("href","../img/sprite.svg#icon-heart-filled")}}});const C=document.querySelector(".categories-list");async function ae(){const e=await $();C.innerHTML=e.map(t=>`<li class="category-item" data-name="${t.name}">
        ${t.name}
      </li>`).join("")}ae();C.addEventListener("click",async e=>{if(!e.target.classList.contains("category-item"))return;const t=e.target.dataset.name;await h({category:t})});window.addEventListener("load",()=>{X.init()});
//# sourceMappingURL=index.js.map
