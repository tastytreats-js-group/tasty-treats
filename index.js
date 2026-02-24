import{i as k,r as B,a as N}from"./assets/local_favorites-D4wuWqlQ.js";import{a as P}from"./assets/vendor-C0Zqfgkc.js";const U="https://tasty-treats-backend.p.goit.global/api",y=P.create({baseURL:U,timeout:1e4});function H(e={}){const t={};return Object.entries(e).forEach(([a,n])=>{n==null||n===""||(t[a]=n)}),t}function h(e){if(e?.response){const t=e.response.data?.message||e.response.data?.error||`HTTP ${e.response.status}`;throw new Error(t)}throw e?.request?new Error("Network error. Please try again."):new Error(e?.message||"Unknown error")}async function j(){try{const{data:e}=await y.get("/events");return e}catch(e){return h(e)}}async function q(){try{const{data:e}=await y.get("/categories");return e}catch(e){return h(e)}}async function A(e={}){try{const{data:t}=await y.get("/recipes",{params:H(e)});return t}catch(t){return h(t)}}async function V(){try{const{data:e}=await y.get("/recipes/popular");return e}catch(e){return h(e)}}async function X(e){try{const{data:t}=await y.get(`/recipes/${e}`);return t}catch(t){return h(t)}}async function _(){try{const{data:e}=await y.get("/ingredients");return e}catch(e){return h(e)}}async function F(){try{const{data:e}=await y.get("/areas");return e}catch(e){return h(e)}}async function M(e,t){try{const{data:a}=await y.patch(`/recipes/${e}/rating`,t);return a}catch(a){return h(a)}}async function O(e){try{const{data:t}=await y.post("/orders/add",e);return t}catch(t){return h(t)}}const z=Object.freeze(Object.defineProperty({__proto__:null,createOrder:O,fetchAreas:F,fetchCategories:q,fetchEvents:j,fetchFilteredRecipes:A,fetchIngredients:_,fetchPopularRecipes:V,fetchRecipeDetails:X,rateRecipe:M},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".home-hero-btn"),t=document.getElementById("modal-root");e&&t&&e.addEventListener("click",()=>{t.insertAdjacentHTML("beforeend",`
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
            `),t.style.display="block",document.body.style.overflow="hidden",a()});function a(){const s=document.getElementById("orderLayer"),c=document.getElementById("orderForm"),i=document.getElementById("closeOrder"),u=()=>{s.remove(),t.style.display="none",document.body.style.overflow="auto"};i.onclick=u,s.onclick=l=>{l.target===s&&u()};const m=l=>{l.key==="Escape"&&(u(),window.removeEventListener("keydown",m))};window.addEventListener("keydown",m),c.addEventListener("submit",async l=>{l.preventDefault();const v=document.getElementById("submitOrderBtn"),f={name:c.name.value.trim(),phone:c.phone.value.trim(),email:c.email.value.trim(),comment:c.comment.value.trim()||""};v.disabled=!0,v.style.opacity="0.7";try{await O(f),n("Order successfully placed!"),setTimeout(()=>{u()},1e3)}catch(E){n("Error: "+E.message,"error"),v.disabled=!1,v.style.opacity="1"}})}function n(s,c="success"){let i=document.querySelector(".toast-container");i||(i=document.createElement("div"),i.className="toast-container",document.body.appendChild(i));const u=document.createElement("div");u.className=`toast ${c==="error"?"error":""}`,u.textContent=s,i.appendChild(u),setTimeout(()=>u.remove(),3e3)}const r=document.querySelectorAll(".home-slides"),p=document.querySelectorAll(".home-dot");function d(s){r.forEach(c=>c.style.display="none"),p.forEach(c=>c.classList.remove("active")),r[s]&&(r[s].style.display="flex",p[s].classList.add("active"))}p.forEach((s,c)=>s.addEventListener("click",()=>d(c))),r.length>0&&d(0)});const C={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},G=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},J={async getPopularRecipes(){try{return(await P.get(`${C.BASE_URL}${C.ENDPOINTS.POPULAR}`)).data}catch(e){return G(e,"getPopularRecipes")}}},W={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{const n=document.createElement("li");n.classList.add("recipe-list-item"),n.dataset.id=a._id,n.dataset.popup="popup-food",n.dataset.recipe_name=a.title,n.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${a.description?.slice(0,90)}...</p>

        </div>
      `,t.appendChild(n)}),t.addEventListener("click",a=>{const n=a.target.closest(".recipe-list-item");if(!n)return;const r=n.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",r)}))}},K={async init(){try{const e=await J.getPopularRecipes();e&&W.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}},Q="modulepreload",Y=function(e){return"/tasty-treats/"+e},R={},Z=function(t,a,n){let r=Promise.resolve();if(a&&a.length>0){let c=function(i){return Promise.all(i.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),s=d?.nonce||d?.getAttribute("nonce");r=c(a.map(i=>{if(i=Y(i),i in R)return;R[i]=!0;const u=i.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${m}`))return;const l=document.createElement("link");if(l.rel=u?"stylesheet":Q,u||(l.as="script"),l.crossOrigin="",l.href=i,s&&l.setAttribute("nonce",s),document.head.appendChild(l),u)return new Promise((v,f)=>{l.addEventListener("load",v),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${i}`)))})}))}function p(d){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=d,window.dispatchEvent(s),!s.defaultPrevented)throw d}return r.then(d=>{for(const s of d||[])s.status==="rejected"&&p(s.reason);return t().catch(p)})};function ee(e){const t=document.getElementById("modal-root");if(!t)return;t.insertAdjacentHTML("beforeend",`
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
    `);const n=document.getElementById("ratingLayer"),r=n.querySelector("#ratingForm"),p=n.querySelector("#closeRating"),d=n.querySelector("#ratingValue"),s=r.querySelectorAll('input[name="rate"]');s.forEach(m=>{m.addEventListener("change",l=>{d.textContent=`${parseFloat(l.target.value).toFixed(1)}`})});const c=()=>{n.remove()};p.onclick=c,n.onclick=m=>{m.target===n&&c()};function i(m,l="success"){let v=document.querySelector(".toast-container");v||(v=document.createElement("div"),v.className="toast-container",document.body.appendChild(v));const f=document.createElement("div");f.className=`toast ${l==="error"?"error":""}`,f.textContent=m,v.appendChild(f),setTimeout(()=>{f.remove(),v.childNodes.length===0&&v.remove()},3e3)}r.addEventListener("submit",async m=>{m.preventDefault();const l=r.rate.value,v=r.email.value,f=r.querySelector(".btn-submit");if(!l){i("Please select a star rating!","error");return}f.disabled=!0,f.style.opacity="0.7";try{await M(e,{rate:Number(l),email:v}),i("Rating sent successfully!"),setTimeout(()=>{c()},500)}catch(E){i("Error: "+(E.response?.data?.message||E.message),"error"),f.disabled=!1,f.style.opacity="1"}});let u="0.0";s.forEach(m=>{const l=r.querySelector(`label[for="${m.id}"]`);m.addEventListener("change",v=>{u=parseFloat(v.target.value).toFixed(1),d.textContent=u}),l.addEventListener("mouseenter",()=>{l.classList.add("is-hovering"),d.textContent=parseFloat(m.value).toFixed(1)}),l.addEventListener("mouseleave",()=>{l.classList.remove("is-hovering"),d.textContent=u})})}function te(e){const t=document.getElementById("modal-root");if(!t)return;const n=k(e._id)?"Remove favorite":"Add to favorite";t.innerHTML=`
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
    `,t.style.display="flex",document.body.style.overflow="hidden",ae(t,e)}function ae(e,t){const a=e.querySelector("#closeModal"),n=e.querySelector(".modal-overlay"),r=e.querySelector(".btn-rating-open"),p=e.querySelector("#favBtn");p.onclick=()=>{k(t._id)?B(t._id):N(t)};const d=i=>{i.detail.recipeId===t._id&&(p.textContent=i.detail.status?"Remove favorite":"Add to favorite")};window.addEventListener("favoritesUpdated",d),r&&(r.onclick=()=>{ee(t._id)});const s=()=>{e.style.display="none",e.innerHTML="",document.body.style.overflow="auto",window.removeEventListener("favoritesUpdated",d)};a.onclick=s,n.onclick=i=>{i.target===n&&s()};const c=i=>{i.key==="Escape"&&(s(),window.removeEventListener("keydown",c))};window.addEventListener("keydown",c)}console.log("FILE IS RUNNING");let o={page:1,limit:ne()};function ne(){const e=window.innerWidth;return e>=1280?9:e>=768?8:6}async function g(){try{const e=await A(o);oe(e.results)}catch(e){console.error("Recipes could not load",e)}}g();function re(e){const t=Math.round(e);return Array.from({length:5},(a,n)=>`
        <svg class="star ${n<t?"star-filled":"star-empty"}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join("")}const I=document.querySelector(".recipeList");let D=[];async function oe(e){D=e,I.innerHTML=e.map(a=>`
            <li class="recipeCard" data-id="${a._id}">
                <div class="likeButton">
                    <svg class="like-icon">
                        <use href="../img/sprite.svg#icon-${k(a._id)?"heart-filled":"heart-outline"}"></use>
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
            `).join(""),document.querySelectorAll(".recipeCard").forEach(a=>{const n=a.dataset.id,r=e.find(p=>p._id===n);a.style.backgroundImage=`linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${r.preview})`});const t=JSON.parse(localStorage.getItem("likedRecipes"))||{};document.querySelectorAll(".recipeCard").forEach(a=>{t[a.dataset.id]&&a.querySelector("use").setAttribute("href","../img/sprite.svg#icon-heart-filled")})}I&&I.addEventListener("click",async e=>{const t=e.target.closest(".seeRecipe");if(t){const n=t.closest(".recipeCard").dataset.id;try{const{fetchRecipeDetails:r}=await Z(async()=>{const{fetchRecipeDetails:d}=await Promise.resolve().then(()=>z);return{fetchRecipeDetails:d}},void 0),p=await r(n);te(p)}catch(r){console.error("Tasty Error:",r)}}const a=e.target.closest(".likeButton");if(a){const n=a.closest(".recipeCard").dataset.id;if(k(n))B(n),useEl.setAttribute("href","../img/sprite.svg#icon-heart-outline");else{const r=D.find(p=>p._id===n);N(r),useEl.setAttribute("href","../img/sprite.svg#icon-heart-filled")}}});window.addEventListener("favoritesUpdated",e=>{const{recipeId:t,status:a}=e.detail,n=document.querySelector(`.recipeCard[data-id="${t}"]`);if(n){const r=n.querySelector(".likeButton use");if(r){const p=a?"heart-filled":"heart-outline";r.setAttribute("href",`../img/sprite.svg#icon-${p}`)}}});console.log("RECIPES FILTER IS RUNNING");const x=document.getElementById("filterForm"),L=document.getElementById("searchInput"),S=document.getElementById("timeSelect"),b=document.getElementById("areaSelect"),w=document.getElementById("ingredientSelect");class ${constructor(t){this.select=t,this.wrapper=document.createElement("div"),this.wrapper.className="custom-select-wrapper",t.parentNode.insertBefore(this.wrapper,t),this.button=document.createElement("button"),this.button.className="custom-select-button",this.button.type="button",this.button.textContent=t.options[0].text,this.menu=document.createElement("div"),this.menu.className="custom-select-menu",Array.from(t.options).forEach((a,n)=>{const r=document.createElement("div");r.className="custom-select-item",r.textContent=a.text,a.disabled&&(r.style.display="none"),r.addEventListener("click",()=>{this.select.value=a.value,this.button.textContent=a.text,this.menu.classList.remove("active"),this.select.dispatchEvent(new Event("change",{bubbles:!0}))}),this.menu.appendChild(r)}),this.wrapper.appendChild(this.button),this.wrapper.appendChild(t),this.wrapper.appendChild(this.menu),this.button.addEventListener("click",a=>{a.preventDefault(),this.menu.classList.toggle("active")}),document.addEventListener("click",a=>{this.wrapper.contains(a.target)||this.menu.classList.remove("active")}),t.style.display="none"}reset(t){this.button.textContent=t,this.select.value=""}}async function T(){await se(),await ie();const e=new $(S),t=new $(b),a=new $(w);window.dropdownInstances={time:e,area:t,ingredient:a},S.value="",b.value="",w.value="",e.reset("40 min"),t.reset("Italian"),a.reset("Tomato"),le()}async function se(){try{const e=await _();console.log("Ingredients loaded:",e),w.innerHTML='<option value="" disabled>Tomato</option>',e.forEach(t=>{const a=document.createElement("option");a.value=t._id||t.name,a.textContent=t.name,w.appendChild(a)}),w.value=""}catch(e){console.error("Failed to load ingredients:",e)}}async function ie(){try{const e=await F();console.log("All Areas from API:",JSON.stringify(e,null,2)),b.innerHTML='<option value="" disabled>Italian</option>',e.forEach((t,a)=>{const n=document.createElement("option");n.value=t.name,n.textContent=t.name,n.dataset.areaId=t._id,n.dataset.areaName=t.name,b.appendChild(n),console.log(`Area ${a}: value="${t.name}", name="${t.name}", _id="${t._id}"`)}),b.value=""}catch(e){console.error("Failed to load areas:",e)}}function le(){x.addEventListener("submit",t=>{t.preventDefault()});let e;L.addEventListener("input",t=>{clearTimeout(e);const a=t.target.value.trim();a?L.classList.add("has-value"):L.classList.remove("has-value"),e=setTimeout(()=>{a?o.title=a:(delete o.title,delete o.q,delete o.keyword,delete o.search),o.page=1,console.log("Search triggered with title:",a,"Full params:",o),g()},300)}),S.addEventListener("change",t=>{const a=t.target.value;a?o.time=parseInt(a,10):delete o.time,o.page=1,console.log("Time filter applied:",a,"Full params:",o),g()}),b.addEventListener("change",t=>{const a=t.target.value;a?o.area=a:delete o.area,o.page=1,console.log("Area filter applied:",a,"Full params:",o),g()}),w.addEventListener("change",t=>{const a=t.target.value;a?o.ingredient=a:delete o.ingredient,o.page=1,console.log("Ingredient filter applied:",a,"Full params:",o),g()}),x.addEventListener("reset",t=>{t.preventDefault(),delete o.title,delete o.q,delete o.keyword,delete o.search,delete o.time,delete o.area,delete o.ingredient,o.page=1,L.value="",S.value="",b.value="",w.value="",window.dropdownInstances&&(window.dropdownInstances.time.reset("40 min"),window.dropdownInstances.area.reset("Italian"),window.dropdownInstances.ingredient.reset("Tomato")),console.log("Filters reset. Full params:",o),setTimeout(()=>g(),0)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",T):T();document.querySelector(".categories-btn").click();const ce=document.querySelector(".categories-list");async function de(){const e=await q();ce.innerHTML=e.map(t=>`
      <li class="category-item">
        <button 
          type="button"
          class="category-item-btn"
          data-name="${t.name}">
          ${t.name}
        </button>
      </li>
    `).join("")}de();const ue=document.querySelector(".categories-sec");ue.addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return;const t=e.target.closest('button[type="button"]');if(!t){delete o.category,o.page=1,g();return}const a=t.dataset.name;if(!a){delete o.category,o.page=1,g();return}o.category=a,o.page=1,g()});window.addEventListener("load",()=>{K.init()});
//# sourceMappingURL=index.js.map
