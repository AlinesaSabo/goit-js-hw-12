import{S,i as f}from"./assets/vendor-8c59ed88.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const q="https://pixabay.com/api/",P="45076495-063a30a4096c3d430f822662d";axios.defaults.baseURL=q;function p({page:t=1,per_page:a=15,q:n=""}={}){return axios.get("",{params:{page:t,per_page:a,q:n,key:P,image_type:"photo",orientation:"horizontal",safesearch:"true"}}).then(({data:i})=>i)}function m({hits:t}){const a=document.querySelector(".gallery"),n=t.map(({webformatURL:i,largeImageURL:e,tags:o,likes:l,views:v,comments:b,downloads:L})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${e}" target="_blank">
        <img class="gallery-image" src="${i}" alt="${o}">
      </a>
      <div class="gallery-info">
        <div class="info-item">
          <p class="info-label">Likes</p>
          <p class="info-value">${l}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Views</p>
          <p class="info-value">${v}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Comments</p>
          <p class="info-value">${b}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Downloads</p>
          <p class="info-value">${L}</p>
        </div>
      </div>
    </li>`).join("");a.insertAdjacentHTML("beforeend",n)}const d=document.querySelector(".gallery"),x=document.querySelector(".search-form"),g=document.querySelector(".loader"),c=document.querySelector('[data-action="load-more"]'),r={page:1,pageSize:15,q:"",maxPage:0};s();const y=new S(".gallery a",{captionsData:"alt",captionDelay:250});x.addEventListener("submit",w);async function w(t){t.preventDefault(),d.innerHTML="",c.removeEventListener("click",u),s();const a=t.currentTarget;if(r.q=a.elements.query.value.trim(),!r.q){d.innerHTML="";return}r.page=1,h();try{const{hits:n,totalHits:i}=await p(r);if(i===0){f.error({titleColor:"#FFFFFF",backgroundColor:"#EF4040",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",position:"topRight"}),s();return}r.maxPage=Math.ceil(i/r.pageSize),m({hits:n}),r.maxPage>1?(C(),c.addEventListener("click",u)):s(),y.refresh()}catch{}finally{F()}}async function u(){if(r.page>=r.maxPage){s();return}r.page+=1,h();try{const{hits:t}=await p(r);m({hits:t}),r.page>=r.maxPage&&(f.info({titleColor:"#FFFFFF",backgroundColor:"#FFA500",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FFFFFF",position:"topRight"}),s()),y.refresh(),M()}catch{}finally{F(),form.reset()}}function M(){const t=d.querySelector(".gallery-item");if(t){const{height:a}=t.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}}function h(){g.style.display="block"}function F(){g.style.display="none"}function C(){c.style.display="block"}function s(){c.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
