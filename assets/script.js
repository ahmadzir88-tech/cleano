
function initMenu(){
  const btn=document.querySelector(".menu-btn");
  const links=document.querySelector(".nav-links");
  if(!btn || !links) return;
  btn.addEventListener("click",()=>{
    links.classList.toggle("open");
    btn.textContent = links.classList.contains("open") ? "✕" : "☰";
  });
}

function initFilters(){
  const buttons=document.querySelectorAll(".filter-btn");
  const cards=document.querySelectorAll("[data-category]");
  if(!buttons.length) return;

  buttons.forEach(btn=>btn.addEventListener("click",()=>{
    buttons.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const filter=btn.dataset.filter;
    cards.forEach(card=>{
      const visible = filter==="alles" || card.dataset.category===filter;
      card.hidden = !visible;
    });
  }));
}

function initContact(){
  const form=document.getElementById("contactForm");
  if(!form) return;
  form.addEventListener("submit",event=>{
    event.preventDefault();
    form.reset();
    const notice=document.getElementById("formNotice");
    if(notice){
      notice.style.display="block";
      notice.textContent="Bedankt! Je bericht is ontvangen in deze demonstratie.";
    }
  });
}

function initProductLinks(){
  const links = window.CLEANO_PRODUCT_LINKS || {};
  document.querySelectorAll("[data-product-link]").forEach(button=>{
    const key=button.dataset.productLink;
    const url=(links[key] || "").trim();

    if(/^https?:\/\//i.test(url)){
      button.href=url;
      button.target="_blank";
      button.rel="noopener noreferrer";
      button.classList.remove("link-pending");
      button.setAttribute("aria-label", button.textContent.trim() + " — opent externe website");
    }else{
      button.href="#";
      button.classList.add("link-pending");
      button.addEventListener("click",event=>{
        event.preventDefault();
        alert("De bestellink is nog niet ingesteld. Zodra de URL beschikbaar is, kan die worden toegevoegd in assets/product-links.js.");
      });
    }
  });
}

function initReveal(){
  const items=document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){
    items.forEach(el=>el.classList.add("visible"));
    return;
  }
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  items.forEach(el=>observer.observe(el));
}

document.addEventListener("DOMContentLoaded",()=>{
  initMenu();
  initFilters();
  initContact();
  initProductLinks();
  initReveal();
});
