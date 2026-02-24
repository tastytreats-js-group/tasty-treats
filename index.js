import{i as k,r as B,a as N}from"./assets/local_favorites-BgcPOv3F.js";import{a as _}from"./assets/vendor-C0Zqfgkc.js";const U="https://tasty-treats-backend.p.goit.global/api",f=_.create({baseURL:U,timeout:1e4});function j(e={}){const t={};return Object.entries(e).forEach(([a,n])=>{n==null||n===""||(t[a]=n)}),t}function g(e){if(e?.response){const t=e.response.data?.message||e.response.data?.error||`HTTP ${e.response.status}`;throw new Error(t)}throw e?.request?new Error("Network error. Please try again."):new Error(e?.message||"Unknown error")}async function V(){try{const{data:e}=await f.get("/events");return e}catch(e){return g(e)}}async function A(){try{const{data:e}=await f.get("/categories");return e}catch(e){return g(e)}}async function C(e={}){try{const{data:t}=await f.get("/recipes",{params:j(e)});return t}catch(t){return g(t)}}async function X(){try{const{data:e}=await f.get("/recipes/popular");return e}catch(e){return g(e)}}async function z(e){try{const{data:t}=await f.get(`/recipes/${e}`);return t}catch(t){return g(t)}}async function F(){try{const{data:e}=await f.get("/ingredients");return e}catch(e){return g(e)}}async function q(){try{const{data:e}=await f.get("/areas");return e}catch(e){return g(e)}}async function M(e,t){try{const{data:a}=await f.patch(`/recipes/${e}/rating`,t);return a}catch(a){return g(a)}}async function O(e){try{const{data:t}=await f.post("/orders/add",e);return t}catch(t){return g(t)}}const G=Object.freeze(Object.defineProperty({__proto__:null,createOrder:O,fetchAreas:q,fetchCategories:A,fetchEvents:V,fetchFilteredRecipes:C,fetchIngredients:F,fetchPopularRecipes:X,fetchRecipeDetails:z,rateRecipe:M},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".home-hero-btn"),t=document.getElementById("modal-root");e&&t&&e.addEventListener("click",()=>{t.insertAdjacentHTML("beforeend",`
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
            `),t.style.display="block",document.body.style.overflow="hidden",a()});function a(){const s=document.getElementById("orderLayer"),c=document.getElementById("orderForm"),d=document.getElementById("closeOrder"),u=()=>{s.remove(),t.style.display="none",document.body.style.overflow="auto"};d.onclick=u,s.onclick=i=>{i.target===s&&u()};const m=i=>{i.key==="Escape"&&(u(),window.removeEventListener("keydown",m))};window.addEventListener("keydown",m),c.addEventListener("submit",async i=>{i.preventDefault();const p=document.getElementById("submitOrderBtn"),y={name:c.name.value.trim(),phone:c.phone.value.trim(),email:c.email.value.trim(),comment:c.comment.value.trim()||""};p.disabled=!0,p.style.opacity="0.7";try{await O(y),n("Order successfully placed!"),setTimeout(()=>{u()},1e3)}catch(E){n("Error: "+E.message,"error"),p.disabled=!1,p.style.opacity="1"}})}function n(s,c="success"){let d=document.querySelector(".toast-container");d||(d=document.createElement("div"),d.className="toast-container",document.body.appendChild(d));const u=document.createElement("div");u.className=`toast ${c==="error"?"error":""}`,u.textContent=s,d.appendChild(u),setTimeout(()=>u.remove(),3e3)}const r=document.querySelectorAll(".home-slides"),v=document.querySelectorAll(".home-dot");function l(s){r.forEach(c=>c.style.display="none"),v.forEach(c=>c.classList.remove("active")),r[s]&&(r[s].style.display="flex",v[s].classList.add("active"))}v.forEach((s,c)=>s.addEventListener("click",()=>l(c))),r.length>0&&l(0)});const R={BASE_URL:"https://tasty-treats-backend.p.goit.global/api",ENDPOINTS:{POPULAR:"/recipes/popular"}},W=(e,t="")=>{console.error(`[${t}] Hata:`,e);const a=document.querySelector(".error-message");return a&&(a.textContent=`Veri yüklenirken hata oluştu: ${e.message}`,a.style.display="block"),null},J={async getPopularRecipes(){try{return(await _.get(`${R.BASE_URL}${R.ENDPOINTS.POPULAR}`)).data}catch(e){return W(e,"getPopularRecipes")}}},K={displayPopularRecipes(e){const t=document.querySelector(".recipe-list");t&&(t.innerHTML="",e.forEach(a=>{const n=document.createElement("li");n.classList.add("recipe-list-item"),n.dataset.id=a._id,n.dataset.popup="popup-food",n.dataset.recipe_name=a.title,n.innerHTML=`
        <img class="recipe-box-img" src="${a.preview}" alt="${a.title}" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${a.title}</h3>
          <p class="recipe-box-text">${a.description?.slice(0,90)}...</p>

        </div>
      `,t.appendChild(n)}),t.addEventListener("click",a=>{const n=a.target.closest(".recipe-list-item");if(!n)return;const r=n.dataset.recipe_name;console.log("Tıklanan data-recipe_name:",r)}))}},Q={async init(){try{const e=await J.getPopularRecipes();e&&K.displayPopularRecipes(e)}catch(e){console.error("Uygulama başlatılırken bir hata oluştu:",e)}}},Y="modulepreload",Z=function(e){return"/tasty-treats/"+e},x={},ee=function(t,a,n){let r=Promise.resolve();if(a&&a.length>0){let c=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),s=l?.nonce||l?.getAttribute("nonce");r=c(a.map(d=>{if(d=Z(d),d in x)return;x[d]=!0;const u=d.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${m}`))return;const i=document.createElement("link");if(i.rel=u?"stylesheet":Y,u||(i.as="script"),i.crossOrigin="",i.href=d,s&&i.setAttribute("nonce",s),document.head.appendChild(i),u)return new Promise((p,y)=>{i.addEventListener("load",p),i.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${d}`)))})}))}function v(l){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=l,window.dispatchEvent(s),!s.defaultPrevented)throw l}return r.then(l=>{for(const s of l||[])s.status==="rejected"&&v(s.reason);return t().catch(v)})};function te(e){const t=document.getElementById("modal-root");if(!t)return;t.insertAdjacentHTML("beforeend",`
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
    `);const n=document.getElementById("ratingLayer"),r=n.querySelector("#ratingForm"),v=n.querySelector("#closeRating"),l=n.querySelector("#ratingValue"),s=r.querySelectorAll('input[name="rate"]');s.forEach(m=>{m.addEventListener("change",i=>{l.textContent=`${parseFloat(i.target.value).toFixed(1)}`})});const c=()=>{n.remove()};v.onclick=c,n.onclick=m=>{m.target===n&&c()};function d(m,i="success"){let p=document.querySelector(".toast-container");p||(p=document.createElement("div"),p.className="toast-container",document.body.appendChild(p));const y=document.createElement("div");y.className=`toast ${i==="error"?"error":""}`,y.textContent=m,p.appendChild(y),setTimeout(()=>{y.remove(),p.childNodes.length===0&&p.remove()},3e3)}r.addEventListener("submit",async m=>{m.preventDefault();const i=r.rate.value,p=r.email.value,y=r.querySelector(".btn-submit");if(!i){d("Please select a star rating!","error");return}y.disabled=!0,y.style.opacity="0.7";try{await M(e,{rate:Number(i),email:p}),d("Rating sent successfully!"),setTimeout(()=>{c()},500)}catch(E){d("Error: "+(E.response?.data?.message||E.message),"error"),y.disabled=!1,y.style.opacity="1"}});let u="0.0";s.forEach(m=>{const i=r.querySelector(`label[for="${m.id}"]`);m.addEventListener("change",p=>{u=parseFloat(p.target.value).toFixed(1),l.textContent=u}),i.addEventListener("mouseenter",()=>{i.classList.add("is-hovering"),l.textContent=parseFloat(m.value).toFixed(1)}),i.addEventListener("mouseleave",()=>{i.classList.remove("is-hovering"),l.textContent=u})})}function ae(e){const t=document.getElementById("modal-root");if(!t)return;const n=k(e._id)?"Remove favorite":"Add to favorite";t.innerHTML=`
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
    `,t.style.display="flex",document.body.style.overflow="hidden",ne(t,e)}function ne(e,t){const a=e.querySelector("#closeModal"),n=e.querySelector(".modal-overlay"),r=e.querySelector(".btn-rating-open"),v=e.querySelector("#favBtn");v.onclick=()=>{k(t._id)?(B(t._id),v.textContent="Add to favorite"):(N(t),v.textContent="Remove favorite")},r&&(r.onclick=()=>{te(t._id)});const l=()=>{e.style.display="none",e.innerHTML="",document.body.style.overflow="auto"};a.onclick=l,n.onclick=c=>{c.target===n&&l()};const s=c=>{c.key==="Escape"&&(l(),window.removeEventListener("keydown",s))};window.addEventListener("keydown",s)}console.log("FILE IS RUNNING");let o={page:1,limit:re()};function re(){const e=window.innerWidth;return e>=1280?9:e>=768?8:6}async function w(){try{const e=await C(o);oe(e.results)}catch(e){console.error("Recipes could not load",e)}}w();function se(e){const t=Math.round(e);return Array.from({length:5},(a,n)=>`
        <svg class="star ${n<t?"star-filled":"star-empty"}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join("")}const I=document.querySelector(".recipeList");let D=[];async function oe(e){D=e,I.innerHTML=e.map(t=>`
            <li class="recipeCard" data-id="${t._id}">
                <div class="likeButton">
                    <svg class="like-icon">
                        <use href="../img/sprite.svg#icon-${k(t._id)?"heart-filled":"heart-outline"}"></use>
                    </svg>
                </div>
                <div class="rest">
                    <p class="recipeTitle">${t.title}</p>
                    <p class="recipeDescription">${t.description}</p>
                    <div class="ratingandbutton">
                        <div class="recipeRating">
                            <p class="rating">${t.rating}</p>
                            <div class="stars">${se(t.rating)}</div>
                        </div>
                        <button class="seeRecipe">See recipe</button>
                    </div>
                </div>
            </li>
        `).join(""),document.querySelectorAll(".recipeCard").forEach(t=>{const a=t.dataset.id,n=e.find(r=>r._id===a);t.style.backgroundImage=`linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${n.preview})`})}I&&I.addEventListener("click",async e=>{const t=e.target.closest(".seeRecipe");if(t){const n=t.closest(".recipeCard").dataset.id;try{const{fetchRecipeDetails:r}=await ee(async()=>{const{fetchRecipeDetails:l}=await Promise.resolve().then(()=>G);return{fetchRecipeDetails:l}},void 0),v=await r(n);ae(v)}catch(r){console.error("Tasty Error:",r)}}const a=e.target.closest(".likeButton");if(a){const r=a.closest(".recipeCard").dataset.id,v=a.querySelector("use");if(k(r))B(r),v.setAttribute("href","../img/sprite.svg#icon-heart-outline");else{const l=D.find(s=>s._id===r);N(l),v.setAttribute("href","../img/sprite.svg#icon-heart-filled")}}});console.log("RECIPES FILTER IS RUNNING");const T=document.getElementById("filterForm"),L=document.getElementById("searchInput"),S=document.getElementById("timeSelect"),h=document.getElementById("areaSelect"),b=document.getElementById("ingredientSelect");class ${constructor(t){this.select=t,this.wrapper=document.createElement("div"),this.wrapper.className="custom-select-wrapper",t.parentNode.insertBefore(this.wrapper,t),this.button=document.createElement("button"),this.button.className="custom-select-button",this.button.type="button",this.button.textContent=t.options[0].text,this.menu=document.createElement("div"),this.menu.className="custom-select-menu",Array.from(t.options).forEach((a,n)=>{const r=document.createElement("div");r.className="custom-select-item",r.textContent=a.text,a.disabled&&(r.style.display="none"),r.addEventListener("click",()=>{this.select.value=a.value,this.button.textContent=a.text,this.menu.classList.remove("active"),this.select.dispatchEvent(new Event("change",{bubbles:!0}))}),this.menu.appendChild(r)}),this.wrapper.appendChild(this.button),this.wrapper.appendChild(t),this.wrapper.appendChild(this.menu),this.button.addEventListener("click",a=>{a.preventDefault(),this.menu.classList.toggle("active")}),document.addEventListener("click",a=>{this.wrapper.contains(a.target)||this.menu.classList.remove("active")}),t.style.display="none"}reset(t){this.button.textContent=t,this.select.value=""}}async function P(){await ie(),await le();const e=new $(S),t=new $(h),a=new $(b);window.dropdownInstances={time:e,area:t,ingredient:a},S.value="",h.value="",b.value="",e.reset("40 min"),t.reset("Italian"),a.reset("Tomato"),ce()}async function ie(){try{const e=await F();console.log("Ingredients loaded:",e),b.innerHTML='<option value="" disabled>Tomato</option>',e.forEach(t=>{const a=document.createElement("option");a.value=t._id||t.name,a.textContent=t.name,b.appendChild(a)}),b.value=""}catch(e){console.error("Failed to load ingredients:",e)}}async function le(){try{const e=await q();console.log("All Areas from API:",JSON.stringify(e,null,2)),h.innerHTML='<option value="" disabled>Italian</option>',e.forEach((t,a)=>{const n=document.createElement("option");n.value=t.name,n.textContent=t.name,n.dataset.areaId=t._id,n.dataset.areaName=t.name,h.appendChild(n),console.log(`Area ${a}: value="${t.name}", name="${t.name}", _id="${t._id}"`)}),h.value=""}catch(e){console.error("Failed to load areas:",e)}}function ce(){T.addEventListener("submit",t=>{t.preventDefault()});let e;L.addEventListener("input",t=>{clearTimeout(e);const a=t.target.value.trim();a?L.classList.add("has-value"):L.classList.remove("has-value"),e=setTimeout(()=>{a?o.title=a:(delete o.title,delete o.q,delete o.keyword,delete o.search),o.page=1,console.log("Search triggered with title:",a,"Full params:",o),w()},300)}),S.addEventListener("change",t=>{const a=t.target.value;a?o.time=parseInt(a,10):delete o.time,o.page=1,console.log("Time filter applied:",a,"Full params:",o),w()}),h.addEventListener("change",t=>{const a=t.target.value;a?o.area=a:delete o.area,o.page=1,console.log("Area filter applied:",a,"Full params:",o),w()}),b.addEventListener("change",t=>{const a=t.target.value;a?o.ingredient=a:delete o.ingredient,o.page=1,console.log("Ingredient filter applied:",a,"Full params:",o),w()}),T.addEventListener("reset",t=>{t.preventDefault(),delete o.title,delete o.q,delete o.keyword,delete o.search,delete o.time,delete o.area,delete o.ingredient,o.page=1,L.value="",S.value="",h.value="",b.value="",window.dropdownInstances&&(window.dropdownInstances.time.reset("40 min"),window.dropdownInstances.area.reset("Italian"),window.dropdownInstances.ingredient.reset("Tomato")),console.log("Filters reset. Full params:",o),setTimeout(()=>w(),0)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",P):P();const H=document.querySelector(".categories-list");async function de(){const e=await A();H.innerHTML=e.map(t=>`<li class="category-item" data-name="${t.name}">
        ${t.name}
      </li>`).join("")}de();H.addEventListener("click",async e=>{if(!e.target.classList.contains("category-item"))return;const t=e.target.dataset.name;await C({category:t})});window.addEventListener("load",()=>{Q.init()});
//# sourceMappingURL=index.js.map
