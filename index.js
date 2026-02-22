import"./assets/header-oYee1k3G.js";import{a as w}from"./assets/vendor-C0Zqfgkc.js";const P="https://tasty-treats-backend.p.goit.global/api",f=w.create({baseURL:P,timeout:1e4});function _(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{a==null||a===""||(t[n]=a)}),t}function v(e){if(e?.response){const t=e.response.data?.message||e.response.data?.error||`HTTP ${e.response.status}`;throw new Error(t)}throw e?.request?new Error("Network error. Please try again."):new Error(e?.message||"Unknown error")}async function q(){try{const{data:e}=await f.get("/events");return e}catch(e){return v(e)}}async function B(){try{const{data:e}=await f.get("/categories");return e}catch(e){return v(e)}}async function L(e={}){try{const{data:t}=await f.get("/recipes",{params:_(e)});return t}catch(t){return v(t)}}async function C(){try{const{data:e}=await f.get("/recipes/popular");return e}catch(e){return v(e)}}async function I(e){try{const{data:t}=await f.get(`/recipes/${e}`);return t}catch(t){return v(t)}}async function N(){try{const{data:e}=await f.get("/ingredients");return e}catch(e){return v(e)}}async function A(){try{const{data:e}=await f.get("/areas");return e}catch(e){return v(e)}}async function S(e,t){try{const{data:n}=await f.patch(`/recipes/${e}/rating`,t);return n}catch(n){return v(n)}}async function k(e){try{const{data:t}=await f.post("/orders",e);return t}catch(t){return v(t)}}const O=Object.freeze(Object.defineProperty({__proto__:null,createOrder:k,fetchAreas:A,fetchCategories:B,fetchEvents:q,fetchFilteredRecipes:L,fetchIngredients:N,fetchPopularRecipes:C,fetchRecipeDetails:I,rateRecipe:S},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".home-hero-btn"),t=document.getElementById("modal-root");e&&t&&e.addEventListener("click",()=>{t.insertAdjacentHTML("beforeend",`
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
            `),t.style.display="block",document.body.style.overflow="hidden",n()});function n(){const o=document.getElementById("orderLayer"),s=document.getElementById("orderForm"),l=document.getElementById("closeOrder"),u=()=>{o.remove(),t.style.display="none",document.body.style.overflow="auto"};l.onclick=u,o.onclick=i=>{i.target===o&&u()};const p=i=>{i.key==="Escape"&&(u(),window.removeEventListener("keydown",p))};window.addEventListener("keydown",p),s.addEventListener("submit",async i=>{i.preventDefault();const m=document.getElementById("submitOrderBtn"),y={name:s.name.value.trim(),phone:s.phone.value.trim(),email:s.email.value.trim(),comment:s.comment.value.trim()||""};m.disabled=!0,m.style.opacity="0.7";try{await k(y),a("Order successfully placed!"),setTimeout(()=>{u()},1e3)}catch(g){a("Error: "+g.message,"error"),m.disabled=!1,m.style.opacity="1"}})}function a(o,s="success"){let l=document.querySelector(".toast-container");l||(l=document.createElement("div"),l.className="toast-container",document.body.appendChild(l));const u=document.createElement("div");u.className=`toast ${s==="error"?"error":""}`,u.textContent=o,l.appendChild(u),setTimeout(()=>u.remove(),3e3)}const r=document.querySelectorAll(".home-slides"),c=document.querySelectorAll(".home-dot");function d(o){r.forEach(s=>s.style.display="none"),c.forEach(s=>s.classList.remove("active")),r[o]&&(r[o].style.display="flex",c[o].classList.add("active"))}c.forEach((o,s)=>o.addEventListener("click",()=>d(s))),r.length>0&&d(0)});const h={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},T=(e,t="")=>{console.error(`[${t}] Hata:`,e);const n=document.querySelector(".error-message");return n&&(n.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,n.style.display="block"),null},M={async getPopularRecipes(){try{return(await w.get(`${h.BASE_URL}${h.ENDPOINTS.POPULAR}`)).data}catch(e){return T(e,"getPopularRecipes")}}},F={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(n=>{const a=document.createElement("li");a.classList.add("recipe-list-item"),a.dataset.id=n._id,a.dataset.popup="popup-food",a.dataset.recipe_name=n.title,a.innerHTML=`
        <img class="recipe-box-img" src="${n.preview}" alt="${n.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${n.title}</h3>
          <p class="recipe-box-text">${n.description?.slice(0,90)}...</p>

        </div>
      `,t.appendChild(a)}),t.addEventListener("click",n=>{const a=n.target.closest(".recipe-list-item");if(!a)return;const r=a.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",r)}))}},H={async init(){try{const e=await M.getPopularRecipes();e&&F.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}},U="modulepreload",D=function(e){return"/tasty-treats/"+e},E={},j=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),o=d?.nonce||d?.getAttribute("nonce");r=s(n.map(l=>{if(l=D(l),l in E)return;E[l]=!0;const u=l.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const i=document.createElement("link");if(i.rel=u?"stylesheet":U,u||(i.as="script"),i.crossOrigin="",i.href=l,o&&i.setAttribute("nonce",o),document.head.appendChild(i),u)return new Promise((m,y)=>{i.addEventListener("load",m),i.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function c(d){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=d,window.dispatchEvent(o),!o.defaultPrevented)throw d}return r.then(d=>{for(const o of d||[])o.status==="rejected"&&c(o.reason);return t().catch(c)})};function X(e){const t=document.getElementById("modal-root");if(!t)return;t.insertAdjacentHTML("beforeend",`
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
    `);const a=document.getElementById("ratingLayer"),r=a.querySelector("#ratingForm"),c=a.querySelector("#closeRating"),d=a.querySelector("#ratingValue"),o=r.querySelectorAll('input[name="rate"]');o.forEach(p=>{p.addEventListener("change",i=>{d.textContent=`${parseFloat(i.target.value).toFixed(1)}`})});const s=()=>{a.remove()};c.onclick=s,a.onclick=p=>{p.target===a&&s()};function l(p,i="success"){let m=document.querySelector(".toast-container");m||(m=document.createElement("div"),m.className="toast-container",document.body.appendChild(m));const y=document.createElement("div");y.className=`toast ${i==="error"?"error":""}`,y.textContent=p,m.appendChild(y),setTimeout(()=>{y.remove(),m.childNodes.length===0&&m.remove()},3e3)}r.addEventListener("submit",async p=>{p.preventDefault();const i=r.rate.value,m=r.email.value,y=r.querySelector(".btn-submit");if(!i){l("Please select a star rating!","error");return}y.disabled=!0,y.style.opacity="0.7";try{await S(e,{rate:Number(i),email:m}),l("Rating sent successfully!"),setTimeout(()=>{s()},500)}catch(g){l("Error: "+(g.response?.data?.message||g.message),"error"),y.disabled=!1,y.style.opacity="1"}});let u="0.0";o.forEach(p=>{const i=r.querySelector(`label[for="${p.id}"]`);p.addEventListener("change",m=>{u=parseFloat(m.target.value).toFixed(1),d.textContent=u}),i.addEventListener("mouseenter",()=>{i.classList.add("is-hovering"),d.textContent=parseFloat(p.value).toFixed(1)}),i.addEventListener("mouseleave",()=>{i.classList.remove("is-hovering"),d.textContent=u})})}const R="favoriteRecipes",$=()=>JSON.parse(localStorage.getItem(R))||[];function z(e){const t=document.getElementById("modal-root");if(!t)return;const r=$().some(c=>c._id===e._id)?"Remove favorite":"Add to favorite";t.innerHTML=`
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
    `,t.style.display="flex",document.body.style.overflow="hidden",V(t,e)}function V(e,t){const n=e.querySelector("#closeModal"),a=e.querySelector(".modal-overlay"),r=e.querySelector(".btn-rating-open"),c=e.querySelector("#favBtn");c.onclick=()=>{let s=$();const l=s.findIndex(u=>u._id===t._id);l===-1?(s.push(t),c.textContent="Remove favorite"):(s.splice(l,1),c.textContent="Add to favorite"),localStorage.setItem(R,JSON.stringify(s))},r&&(r.onclick=()=>{X(t._id)});const d=()=>{e.style.display="none",e.innerHTML="",document.body.style.overflow="auto"};n.onclick=d,a.onclick=s=>{s.target===a&&d()};const o=s=>{s.key==="Escape"&&(d(),window.removeEventListener("keydown",o))};window.addEventListener("keydown",o)}console.log("FILE IS RUNNING");let G={page:1,limit:J()};function J(){const e=window.innerWidth;return e>=1280?9:e>=768?8:6}async function W(){try{const e=await L(G);console.log(e),Y(e.results)}catch(e){console.error("Recipes could not load",e)}}W();function K(e){const t=Math.round(e);return Array.from({length:5},(n,a)=>`
        <svg class="star ${a<t?"star-filled":"star-empty"}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join("")}const b=document.querySelector(".recipeList");let x=[];async function Y(e){x=e,b.innerHTML=e.map(t=>`
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
                            <div class="stars">${K(t.rating)}</div>
                        </div>
                        <button class="seeRecipe">See recipe</button>
                    </div>
                </div>
            </li>
            `).join(""),document.querySelectorAll(".recipeCard").forEach(t=>{const n=t.dataset.id,a=e.find(r=>r._id===n);t.style.backgroundImage=`linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${a.preview})`})}b&&b.addEventListener("click",async e=>{const t=e.target.closest(".seeRecipe");if(t){const a=t.closest(".recipeCard").dataset.id;try{const{fetchRecipeDetails:r}=await j(async()=>{const{fetchRecipeDetails:d}=await Promise.resolve().then(()=>O);return{fetchRecipeDetails:d}},void 0),c=await r(a);z(c)}catch(r){console.error("Tasty Error:",r)}}const n=e.target.closest(".likeButton");if(n){const a=n.closest(".recipeCard").dataset.id,r=JSON.parse(localStorage.getItem("likedRecipes"))||{};if(r[a])delete r[a],n.querySelector("use").setAttribute("href","../img/sprite.svg#icon-heart-outline");else{const c=x.find(d=>d._id===a);r[a]=c,n.querySelector("use").setAttribute("href","../img/sprite.svg#icon-heart-filled")}localStorage.setItem("likedRecipes",JSON.stringify(r)),console.log(r)}});window.addEventListener("load",()=>{H.init()});
//# sourceMappingURL=index.js.map
