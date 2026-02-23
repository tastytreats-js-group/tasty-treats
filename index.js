import"./assets/header-BxRF_UhW.js";import{a as S}from"./assets/vendor-C0Zqfgkc.js";const w=document.querySelector(".mobil-menu"),B=document.querySelector(".exit-icon-wrapper"),_=document.querySelector(".menu-icon-wrapper");_.addEventListener("click",()=>{w.classList.toggle("menu-active")});B.addEventListener("click",()=>{w.classList.remove("menu-active")});window.addEventListener("resize",()=>{window.innerWidth>=768&&w.classList.remove("menu-active")});const g=document.querySelector("body"),T=document.querySelector(".mobile-toggle-switch"),C=document.querySelector(".desktop-toggle-switch"),E=localStorage.getItem("theme");E?E==="dark"?g.setAttribute("data-theme","dark"):g.removeAttribute("data-theme"):window.matchMedia("(prefers-color-scheme: dark)").matches&&g.setAttribute("data-theme","dark");function R(){g.getAttribute("data-theme")==="dark"?(g.removeAttribute("data-theme"),localStorage.setItem("theme","light")):(g.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"))}T?.addEventListener("click",R);C?.addEventListener("click",R);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{localStorage.getItem("theme")||(e.matches?g.setAttribute("data-theme","dark"):g.removeAttribute("data-theme"))});const N="https://tasty-treats-backend.p.goit.global/api",f=S.create({baseURL:N,timeout:1e4});function O(e={}){const t={};return Object.entries(e).forEach(([r,a])=>{a==null||a===""||(t[r]=a)}),t}function v(e){if(e?.response){const t=e.response.data?.message||e.response.data?.error||`HTTP ${e.response.status}`;throw new Error(t)}throw e?.request?new Error("Network error. Please try again."):new Error(e?.message||"Unknown error")}async function M(){try{const{data:e}=await f.get("/events");return e}catch(e){return v(e)}}async function F(){try{const{data:e}=await f.get("/categories");return e}catch(e){return v(e)}}async function $(e={}){try{const{data:t}=await f.get("/recipes",{params:O(e)});return t}catch(t){return v(t)}}async function D(){try{const{data:e}=await f.get("/recipes/popular");return e}catch(e){return v(e)}}async function H(e){try{const{data:t}=await f.get(`/recipes/${e}`);return t}catch(t){return v(t)}}async function U(){try{const{data:e}=await f.get("/ingredients");return e}catch(e){return v(e)}}async function j(){try{const{data:e}=await f.get("/areas");return e}catch(e){return v(e)}}async function x(e,t){try{const{data:r}=await f.patch(`/recipes/${e}/rating`,t);return r}catch(r){return v(r)}}async function q(e){try{const{data:t}=await f.post("/orders",e);return t}catch(t){return v(t)}}const X=Object.freeze(Object.defineProperty({__proto__:null,createOrder:q,fetchAreas:j,fetchCategories:F,fetchEvents:M,fetchFilteredRecipes:$,fetchIngredients:U,fetchPopularRecipes:D,fetchRecipeDetails:H,rateRecipe:x},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".home-hero-btn"),t=document.getElementById("modal-root");e&&t&&e.addEventListener("click",()=>{t.insertAdjacentHTML("beforeend",`
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
            `),t.style.display="block",document.body.style.overflow="hidden",r()});function r(){const o=document.getElementById("orderLayer"),s=document.getElementById("orderForm"),c=document.getElementById("closeOrder"),u=()=>{o.remove(),t.style.display="none",document.body.style.overflow="auto"};c.onclick=u,o.onclick=i=>{i.target===o&&u()};const m=i=>{i.key==="Escape"&&(u(),window.removeEventListener("keydown",m))};window.addEventListener("keydown",m),s.addEventListener("submit",async i=>{i.preventDefault();const p=document.getElementById("submitOrderBtn"),y={name:s.name.value.trim(),phone:s.phone.value.trim(),email:s.email.value.trim(),comment:s.comment.value.trim()||""};p.disabled=!0,p.style.opacity="0.7";try{await q(y),a("Order successfully placed!"),setTimeout(()=>{u()},1e3)}catch(h){a("Error: "+h.message,"error"),p.disabled=!1,p.style.opacity="1"}})}function a(o,s="success"){let c=document.querySelector(".toast-container");c||(c=document.createElement("div"),c.className="toast-container",document.body.appendChild(c));const u=document.createElement("div");u.className=`toast ${s==="error"?"error":""}`,u.textContent=o,c.appendChild(u),setTimeout(()=>u.remove(),3e3)}const n=document.querySelectorAll(".home-slides"),l=document.querySelectorAll(".home-dot");function d(o){n.forEach(s=>s.style.display="none"),l.forEach(s=>s.classList.remove("active")),n[o]&&(n[o].style.display="flex",l[o].classList.add("active"))}l.forEach((o,s)=>o.addEventListener("click",()=>d(s))),n.length>0&&d(0)});const k={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},z=(e,t="")=>{console.error(`[${t}] Hata:`,e);const r=document.querySelector(".error-message");return r&&(r.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,r.style.display="block"),null},V={async getPopularRecipes(){try{return(await S.get(`${k.BASE_URL}${k.ENDPOINTS.POPULAR}`)).data}catch(e){return z(e,"getPopularRecipes")}}},G={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(r=>{const a=document.createElement("li");a.classList.add("recipe-list-item"),a.dataset.id=r._id,a.dataset.popup="popup-food",a.dataset.recipe_name=r.title,a.innerHTML=`
        <img class="recipe-box-img" src="${r.preview}" alt="${r.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${r.title}</h3>
          <p class="recipe-box-text">${r.description?.slice(0,90)}...</p>

        </div>
      `,t.appendChild(a)}),t.addEventListener("click",r=>{const a=r.target.closest(".recipe-list-item");if(!a)return;const n=a.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",n)}))}},J={async init(){try{const e=await V.getPopularRecipes();e&&G.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}},W="modulepreload",K=function(e){return"/tasty-treats/"+e},L={},Y=function(t,r,a){let n=Promise.resolve();if(r&&r.length>0){let s=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),o=d?.nonce||d?.getAttribute("nonce");n=s(r.map(c=>{if(c=K(c),c in L)return;L[c]=!0;const u=c.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const i=document.createElement("link");if(i.rel=u?"stylesheet":W,u||(i.as="script"),i.crossOrigin="",i.href=c,o&&i.setAttribute("nonce",o),document.head.appendChild(i),u)return new Promise((p,y)=>{i.addEventListener("load",p),i.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function l(d){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=d,window.dispatchEvent(o),!o.defaultPrevented)throw d}return n.then(d=>{for(const o of d||[])o.status==="rejected"&&l(o.reason);return t().catch(l)})};function Q(e){const t=document.getElementById("modal-root");if(!t)return;t.insertAdjacentHTML("beforeend",`
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
    `);const a=document.getElementById("ratingLayer"),n=a.querySelector("#ratingForm"),l=a.querySelector("#closeRating"),d=a.querySelector("#ratingValue"),o=n.querySelectorAll('input[name="rate"]');o.forEach(m=>{m.addEventListener("change",i=>{d.textContent=`${parseFloat(i.target.value).toFixed(1)}`})});const s=()=>{a.remove()};l.onclick=s,a.onclick=m=>{m.target===a&&s()};function c(m,i="success"){let p=document.querySelector(".toast-container");p||(p=document.createElement("div"),p.className="toast-container",document.body.appendChild(p));const y=document.createElement("div");y.className=`toast ${i==="error"?"error":""}`,y.textContent=m,p.appendChild(y),setTimeout(()=>{y.remove(),p.childNodes.length===0&&p.remove()},3e3)}n.addEventListener("submit",async m=>{m.preventDefault();const i=n.rate.value,p=n.email.value,y=n.querySelector(".btn-submit");if(!i){c("Please select a star rating!","error");return}y.disabled=!0,y.style.opacity="0.7";try{await x(e,{rate:Number(i),email:p}),c("Rating sent successfully!"),setTimeout(()=>{s()},500)}catch(h){c("Error: "+(h.response?.data?.message||h.message),"error"),y.disabled=!1,y.style.opacity="1"}});let u="0.0";o.forEach(m=>{const i=n.querySelector(`label[for="${m.id}"]`);m.addEventListener("change",p=>{u=parseFloat(p.target.value).toFixed(1),d.textContent=u}),i.addEventListener("mouseenter",()=>{i.classList.add("is-hovering"),d.textContent=parseFloat(m.value).toFixed(1)}),i.addEventListener("mouseleave",()=>{i.classList.remove("is-hovering"),d.textContent=u})})}const A="favoriteRecipes",P=()=>JSON.parse(localStorage.getItem(A))||[];function Z(e){const t=document.getElementById("modal-root");if(!t)return;const n=P().some(l=>l._id===e._id)?"Remove favorite":"Add to favorite";t.innerHTML=`
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
                    <button class="btn-favorite" id="favBtn">${n}</button>
                    <button class="btn-rating-open" data-id="${e._id}">Give a rating</button>
                </div>
            </div>
        </div>
    `,t.style.display="flex",document.body.style.overflow="hidden",ee(t,e)}function ee(e,t){const r=e.querySelector("#closeModal"),a=e.querySelector(".modal-overlay"),n=e.querySelector(".btn-rating-open"),l=e.querySelector("#favBtn");l.onclick=()=>{let s=P();const c=s.findIndex(u=>u._id===t._id);c===-1?(s.push(t),l.textContent="Remove favorite"):(s.splice(c,1),l.textContent="Add to favorite"),localStorage.setItem(A,JSON.stringify(s))},n&&(n.onclick=()=>{Q(t._id)});const d=()=>{e.style.display="none",e.innerHTML="",document.body.style.overflow="auto"};r.onclick=d,a.onclick=s=>{s.target===a&&d()};const o=s=>{s.key==="Escape"&&(d(),window.removeEventListener("keydown",o))};window.addEventListener("keydown",o)}console.log("FILE IS RUNNING");let te={page:1,limit:ae()};function ae(){const e=window.innerWidth;return e>=1280?9:e>=768?8:6}async function re(){try{const e=await $(te);console.log(e),oe(e.results)}catch(e){console.error("Recipes could not load",e)}}re();function ne(e){const t=Math.round(e);return Array.from({length:5},(r,a)=>`
        <svg class="star ${a<t?"star-filled":"star-empty"}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join("")}const b=document.querySelector(".recipeList");let I=[];async function oe(e){I=e,b.innerHTML=e.map(t=>`
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
                            <div class="stars">${ne(t.rating)}</div>
                        </div>
                        <button class="seeRecipe">See recipe</button>
                    </div>
                </div>
            </li>
            `).join(""),document.querySelectorAll(".recipeCard").forEach(t=>{const r=t.dataset.id,a=e.find(n=>n._id===r);t.style.backgroundImage=`linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${a.preview})`})}b&&b.addEventListener("click",async e=>{const t=e.target.closest(".seeRecipe");if(t){const a=t.closest(".recipeCard").dataset.id;try{const{fetchRecipeDetails:n}=await Y(async()=>{const{fetchRecipeDetails:d}=await Promise.resolve().then(()=>X);return{fetchRecipeDetails:d}},void 0),l=await n(a);Z(l)}catch(n){console.error("Tasty Error:",n)}}const r=e.target.closest(".likeButton");if(r){const a=r.closest(".recipeCard").dataset.id,n=JSON.parse(localStorage.getItem("likedRecipes"))||{};if(n[a])delete n[a],r.querySelector("use").setAttribute("href","./img/sprite.svg#icon-heart-outline");else{const l=I.find(d=>d._id===a);n[a]=l,r.querySelector("use").setAttribute("href","./img/sprite.svg#icon-heart-filled")}localStorage.setItem("likedRecipes",JSON.stringify(n)),console.log(n)}});window.addEventListener("load",()=>{J.init()});
//# sourceMappingURL=index.js.map
