!function(){let e=document.getElementById("header-search");e.addEventListener("input",()=>{let t=e.value.toLowerCase();document.querySelectorAll(".card").forEach(e=>{e.querySelector(".card-text").textContent.toLowerCase().includes(t)?e.style.display="block":e.style.display="none"})})}();