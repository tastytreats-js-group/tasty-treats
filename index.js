import{i as R,r as M,a as D}from"./assets/local_favorites-BgcPOv3F.js";import{a as T}from"./assets/vendor-C0Zqfgkc.js";const H="https://tasty-treats-backend.p.goit.global/api",f=T.create({baseURL:H,timeout:1e4});function U(e={}){const t={};return Object.entries(e).forEach(([a,n])=>{n==null||n===""||(t[a]=n)}),t}function h(e){if(e?.response){const t=e.response.data?.message||e.response.data?.error||`HTTP ${e.response.status}`;throw new Error(t)}throw e?.request?new Error("Network error. Please try again."):new Error(e?.message||"Unknown error")}async function j(){try{const{data:e}=await f.get("/events");return e}catch(e){return h(e)}}async function q(){try{const{data:e}=await f.get("/categories");return e}catch(e){return h(e)}}async function B(e={}){try{const{data:t}=await f.get("/recipes",{params:U(e)});return t}catch(t){return h(t)}}async function V(){try{const{data:e}=await f.get("/recipes/popular");return e}catch(e){return h(e)}}async function X(e){try{const{data:t}=await f.get(`/recipes/${e}`);return t}catch(t){return h(t)}}async function P(){try{const{data:e}=await f.get("/ingredients");return e}catch(e){return h(e)}}async function A(){try{const{data:e}=await f.get("/areas");return e}catch(e){return h(e)}}async function _(e,t){try{const{data:a}=await f.patch(`/recipes/${e}/rating`,t);return a}catch(a){return h(a)}}async function F(e){try{const{data:t}=await f.post("/orders/add",e);return t}catch(t){return h(t)}}const z=Object.freeze(Object.defineProperty({__proto__:null,createOrder:F,fetchAreas:A,fetchCategories:q,fetchEvents:j,fetchFilteredRecipes:B,fetchIngredients:P,fetchPopularRecipes:V,fetchRecipeDetails:X,rateRecipe:_},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".home-hero-btn"),t=document.getElementById("modal-root");e&&t&&e.addEventListener("click",()=>{t.insertAdjacentHTML("beforeend",`
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
            `),t.style.display="block",document.body.style.overflow="hidden",a()});function a(){const s=document.getElementById("orderLayer"),c=document.getElementById("orderForm"),d=document.getElementById("closeOrder"),u=()=>{s.remove(),t.style.display="none",document.body.style.overflow="auto"};d.onclick=u,s.onclick=i=>{i.target===s&&u()};const m=i=>{i.key==="Escape"&&(u(),window.removeEventListener("keydown",m))};window.addEventListener("keydown",m),c.addEventListener("submit",async i=>{i.preventDefault();const g=document.getElementById("submitOrderBtn"),y={name:c.name.value.trim(),phone:c.phone.value.trim(),email:c.email.value.trim(),comment:c.comment.value.trim()||""};g.disabled=!0,g.style.opacity="0.7";try{await F(y),n("Order successfully placed!"),setTimeout(()=>{u()},1e3)}catch(E){n("Error: "+E.message,"error"),g.disabled=!1,g.style.opacity="1"}})}function n(s,c="success"){let d=document.querySelector(".toast-container");d||(d=document.createElement("div"),d.className="toast-container",document.body.appendChild(d));const u=document.createElement("div");u.className=`toast ${c==="error"?"error":""}`,u.textContent=s,d.appendChild(u),setTimeout(()=>u.remove(),3e3)}const r=document.querySelectorAll(".home-slides"),p=document.querySelectorAll(".home-dot");function l(s){r.forEach(c=>c.style.display="none"),p.forEach(c=>c.classList.remove("active")),r[s]&&(r[s].style.display="flex",p[s].classList.add("active"))}p.forEach((s,c)=>s.addEventListener("click",()=>l(c))),r.length>0&&l(0)});const $={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},G=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},J={async getPopularRecipes(){try{return(await T.get(`${$.BASE_URL}${$.ENDPOINTS.POPULAR}`)).data}catch(e){return G(e,"getPopularRecipes")}}},W={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{const n=document.createElement("li");n.classList.add("recipe-list-item"),n.dataset.id=a._id,n.dataset.popup="popup-food",n.dataset.recipe_name=a.title,n.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${a.description?.slice(0,90)}...</p>

        </div>
      `,t.appendChild(n)}),t.addEventListener("click",a=>{const n=a.target.closest(".recipe-list-item");if(!n)return;const r=n.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",r)}))}},K={async init(){try{const e=await J.getPopularRecipes();e&&W.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}},Q="modulepreload",Y=function(e){return"/tasty-treats/"+e},C={},Z=function(t,a,n){let r=Promise.resolve();if(a&&a.length>0){let c=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),s=l?.nonce||l?.getAttribute("nonce");r=c(a.map(d=>{if(d=Y(d),d in C)return;C[d]=!0;const u=d.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${m}`))return;const i=document.createElement("link");if(i.rel=u?"stylesheet":Q,u||(i.as="script"),i.crossOrigin="",i.href=d,s&&i.setAttribute("nonce",s),document.head.appendChild(i),u)return new Promise((g,y)=>{i.addEventListener("load",g),i.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${d}`)))})}))}function p(l){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=l,window.dispatchEvent(s),!s.defaultPrevented)throw l}return r.then(l=>{for(const s of l||[])s.status==="rejected"&&p(s.reason);return t().catch(p)})};function ee(e){const t=document.getElementById("modal-root");if(!t)return;t.insertAdjacentHTML("beforeend",`
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
    `);const n=document.getElementById("ratingLayer"),r=n.querySelector("#ratingForm"),p=n.querySelector("#closeRating"),l=n.querySelector("#ratingValue"),s=r.querySelectorAll('input[name="rate"]');s.forEach(m=>{m.addEventListener("change",i=>{l.textContent=`${parseFloat(i.target.value).toFixed(1)}`})});const c=()=>{n.remove()};p.onclick=c,n.onclick=m=>{m.target===n&&c()};function d(m,i="success"){let g=document.querySelector(".toast-container");g||(g=document.createElement("div"),g.className="toast-container",document.body.appendChild(g));const y=document.createElement("div");y.className=`toast ${i==="error"?"error":""}`,y.textContent=m,g.appendChild(y),setTimeout(()=>{y.remove(),g.childNodes.length===0&&g.remove()},3e3)}r.addEventListener("submit",async m=>{m.preventDefault();const i=r.rate.value,g=r.email.value,y=r.querySelector(".btn-submit");if(!i){d("Please select a star rating!","error");return}y.disabled=!0,y.style.opacity="0.7";try{await _(e,{rate:Number(i),email:g}),d("Rating sent successfully!"),setTimeout(()=>{c()},500)}catch(E){d("Error: "+(E.response?.data?.message||E.message),"error"),y.disabled=!1,y.style.opacity="1"}});let u="0.0";s.forEach(m=>{const i=r.querySelector(`label[for="${m.id}"]`);m.addEventListener("change",g=>{u=parseFloat(g.target.value).toFixed(1),l.textContent=u}),i.addEventListener("mouseenter",()=>{i.classList.add("is-hovering"),l.textContent=parseFloat(m.value).toFixed(1)}),i.addEventListener("mouseleave",()=>{i.classList.remove("is-hovering"),l.textContent=u})})}function te(e){const t=document.getElementById("modal-root");if(!t)return;const n=R(e._id)?"Remove favorite":"Add to favorite";t.innerHTML=`
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
                    <button class="btn-favorite" id="favBtn">${n}</button>
                    <button class="btn-rating-open" data-id="${e._id}">Give a rating</button>
                </div>
            </div>
        </div>
    `,t.style.display="flex",document.body.style.overflow="hidden",ae(t,e)}function ae(e,t){const a=e.querySelector("#closeModal"),n=e.querySelector(".modal-overlay"),r=e.querySelector(".btn-rating-open"),p=e.querySelector("#favBtn");p.onclick=()=>{R(t._id)?(M(t._id),p.textContent="Add to favorite"):(D(t),p.textContent="Remove favorite")},r&&(r.onclick=()=>{ee(t._id)});const l=()=>{e.style.display="none",e.innerHTML="",document.body.style.overflow="auto"};a.onclick=l,n.onclick=c=>{c.target===n&&l()};const s=c=>{c.key==="Escape"&&(l(),window.removeEventListener("keydown",s))};window.addEventListener("keydown",s)}console.log("FILE IS RUNNING");let o={page:1,limit:ne()};function ne(){const e=window.innerWidth;return e>=1280?9:e>=768?8:6}async function v(){try{const e=await B(o);oe(e.results)}catch(e){console.error("Recipes could not load",e)}}v();function re(e){const t=Math.round(e);return Array.from({length:5},(a,n)=>`
        <svg class="star ${n<t?"star-filled":"star-empty"}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join("")}const I=document.querySelector(".recipeList");let O=[];async function oe(e){O=e,I.innerHTML=e.map(a=>`
            <li class="recipeCard" data-id="${a._id}">
                <div class="likeButton">
                    <svg class="like-icon">
                        <use href="../img/sprite.svg#icon-${R(a._id)?"heart-filled":"heart-outline"}"></use>
                    </svg>
                </div>
                <div class="rest">
                    <p class="recipeTitle">${a.title}</p>
                    <p class="recipeDescription">${a.description}</p>
                    <div class="ratingandbutton">
                        <div class="recipeRating">
                            <p class="rating">${a.rating}</p>
                            <div class="stars">${re(a.rating)}</div>
                        </div>
                        <button class="seeRecipe">See recipe</button>
                    </div>
                </div>
            </li>
            `).join(""),document.querySelectorAll(".recipeCard").forEach(a=>{const n=a.dataset.id,r=e.find(p=>p._id===n);a.style.backgroundImage=`linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${r.preview})`});const t=JSON.parse(localStorage.getItem("likedRecipes"))||{};document.querySelectorAll(".recipeCard").forEach(a=>{t[a.dataset.id]&&a.querySelector("use").setAttribute("href","../img/sprite.svg#icon-heart-filled")})}I&&I.addEventListener("click",async e=>{const t=e.target.closest(".seeRecipe");if(t){const n=t.closest(".recipeCard").dataset.id;try{const{fetchRecipeDetails:r}=await Z(async()=>{const{fetchRecipeDetails:l}=await Promise.resolve().then(()=>z);return{fetchRecipeDetails:l}},void 0),p=await r(n);te(p)}catch(r){console.error("Tasty Error:",r)}}const a=e.target.closest(".likeButton");if(a){const n=a.closest(".recipeCard").dataset.id,r=JSON.parse(localStorage.getItem("likedRecipes"))||{};if(r[n])delete r[n],a.querySelector("use").setAttribute("href","./img/sprite.svg#icon-heart-outline");else{const p=O.find(l=>l._id===n);r[n]=p,a.querySelector("use").setAttribute("href","./img/sprite.svg#icon-heart-filled")}localStorage.setItem("likedRecipes",JSON.stringify(r)),console.log(r)}});console.log("RECIPES FILTER IS RUNNING");const x=document.getElementById("filterForm"),L=document.getElementById("searchInput"),S=document.getElementById("timeSelect"),b=document.getElementById("areaSelect"),w=document.getElementById("ingredientSelect");class k{constructor(t){this.select=t,this.wrapper=document.createElement("div"),this.wrapper.className="custom-select-wrapper",t.parentNode.insertBefore(this.wrapper,t),this.button=document.createElement("button"),this.button.className="custom-select-button",this.button.type="button",this.button.textContent=t.options[0].text,this.menu=document.createElement("div"),this.menu.className="custom-select-menu",Array.from(t.options).forEach((a,n)=>{const r=document.createElement("div");r.className="custom-select-item",r.textContent=a.text,a.disabled&&(r.style.display="none"),r.addEventListener("click",()=>{this.select.value=a.value,this.button.textContent=a.text,this.menu.classList.remove("active"),this.select.dispatchEvent(new Event("change",{bubbles:!0}))}),this.menu.appendChild(r)}),this.wrapper.appendChild(this.button),this.wrapper.appendChild(t),this.wrapper.appendChild(this.menu),this.button.addEventListener("click",a=>{a.preventDefault(),this.menu.classList.toggle("active")}),document.addEventListener("click",a=>{this.wrapper.contains(a.target)||this.menu.classList.remove("active")}),t.style.display="none"}reset(t){this.button.textContent=t,this.select.value=""}}async function N(){await se(),await ie();const e=new k(S),t=new k(b),a=new k(w);window.dropdownInstances={time:e,area:t,ingredient:a},S.value="",b.value="",w.value="",e.reset("40 min"),t.reset("Italian"),a.reset("Tomato"),le()}async function se(){try{const e=await P();console.log("Ingredients loaded:",e),w.innerHTML='<option value="" disabled>Tomato</option>',e.forEach(t=>{const a=document.createElement("option");a.value=t._id||t.name,a.textContent=t.name,w.appendChild(a)}),w.value=""}catch(e){console.error("Failed to load ingredients:",e)}}async function ie(){try{const e=await A();console.log("All Areas from API:",JSON.stringify(e,null,2)),b.innerHTML='<option value="" disabled>Italian</option>',e.forEach((t,a)=>{const n=document.createElement("option");n.value=t.name,n.textContent=t.name,n.dataset.areaId=t._id,n.dataset.areaName=t.name,b.appendChild(n),console.log(`Area ${a}: value="${t.name}", name="${t.name}", _id="${t._id}"`)}),b.value=""}catch(e){console.error("Failed to load areas:",e)}}function le(){x.addEventListener("submit",t=>{t.preventDefault()});let e;L.addEventListener("input",t=>{clearTimeout(e);const a=t.target.value.trim();a?L.classList.add("has-value"):L.classList.remove("has-value"),e=setTimeout(()=>{a?o.title=a:(delete o.title,delete o.q,delete o.keyword,delete o.search),o.page=1,console.log("Search triggered with title:",a,"Full params:",o),v()},300)}),S.addEventListener("change",t=>{const a=t.target.value;a?o.time=parseInt(a,10):delete o.time,o.page=1,console.log("Time filter applied:",a,"Full params:",o),v()}),b.addEventListener("change",t=>{const a=t.target.value;a?o.area=a:delete o.area,o.page=1,console.log("Area filter applied:",a,"Full params:",o),v()}),w.addEventListener("change",t=>{const a=t.target.value;a?o.ingredient=a:delete o.ingredient,o.page=1,console.log("Ingredient filter applied:",a,"Full params:",o),v()}),x.addEventListener("reset",t=>{t.preventDefault(),delete o.title,delete o.q,delete o.keyword,delete o.search,delete o.time,delete o.area,delete o.ingredient,o.page=1,L.value="",S.value="",b.value="",w.value="",window.dropdownInstances&&(window.dropdownInstances.time.reset("40 min"),window.dropdownInstances.area.reset("Italian"),window.dropdownInstances.ingredient.reset("Tomato")),console.log("Filters reset. Full params:",o),setTimeout(()=>v(),0)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",N):N();document.querySelector(".categories-btn").click();const ce=document.querySelector(".categories-list");async function de(){const e=await q();ce.innerHTML=e.map(t=>`
      <li class="category-item">
        <button 
          type="button"
          class="category-item-btn"
          data-name="${t.name}">
          ${t.name}
        </button>
      </li>
    `).join("")}de();const ue=document.querySelector(".categories-sec");ue.addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return;const t=e.target.closest('button[type="button"]');if(!t){delete o.category,o.page=1,v();return}const a=t.dataset.name;if(!a){delete o.category,o.page=1,v();return}o.category=a,o.page=1,v()});window.addEventListener("load",()=>{K.init()});
//# sourceMappingURL=index.js.map
