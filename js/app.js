const sections = Array.from(document.querySelectorAll("section"));

// Creating Nav Menu
const nav = document.querySelector(".nav");

const addNavLinks = () => {
    const list = document.createElement("ul");
    list.classList.add("nav-menu");

    for(i in sections){
        const listItem = document.createElement("li"),
        navLink = document.createElement("a");
        navLink.classList.add("nav-link");
        navLink.dataset.id = `${sections[i].id}`;
        navLink.href = `#${sections[i].id}`;
        navLink.textContent = `Section ${(parseInt(i)) + 1}`;
        listItem.appendChild(navLink);

        list.appendChild(listItem);
    }

    nav.appendChild(list);
}

const scrollNav = () => {
    const scrolled = window.pageYOffset;

    if(scrolled > 80)
        nav.classList.add("scrollnav");
    else
        nav.classList.remove("scrollnav");
}

window.addEventListener("DOMContentLoaded", addNavLinks);

window.addEventListener("scroll", scrollNav);

// Scroll By Clicking on Nav Links

nav.addEventListener("click",(e) => {
    e.preventDefault();
    let navLink;
    if(e.target.classList.contains("nav-link")){
        navLink = e.target;
        
        const id = navLink.dataset.id;
        sections.forEach(sec => {
            if(id == sec.id){
                let y = sec.offsetTop;
                if(window.innerWidth < 347){
                    y -= 50;
                }
                window.scrollTo({top: y,behavior: "smooth"});
            }
        });
    }
});


// Add Active State For Nav Links

let secTop = [];
let secHeight = [];
let secID = [];

for(i in sections){
    secTop[i] = sections[i].getClientRects()[0].top - 80;
    secHeight[i] = sections[i].getClientRects()[0].height;
    secID[i] = sections[i].id;
}


window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    
    for(i=0;i<sections.length;i++){
        if(scrolled > secTop[i] && scrolled <= secTop[i] + secHeight[i]){
           document.querySelector(`.nav-link[href*=${secID[i]}]`).parentElement.classList.add("active");
        }else{
            document.querySelector(`.nav-link[href*=${secID[i]}]`).parentElement.classList.remove("active");
        }
    }
});
