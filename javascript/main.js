const info1 = document.querySelector(".hive")
const info2 = document.querySelector(".ilo")
const info3 = document.querySelector(".jad")
const scrolling = document.querySelector('.scroll')
const text = document.querySelector('.base')

info1.addEventListener('click',()=>{
    scrollBy(0,1500)
})

info2.addEventListener('click',()=>{
    scrollBy(0,300)
})

info3.addEventListener('click',()=>{
    scrollBy(0,1000)
})

const observateur = new IntersectionObserver(entries => {
    entries.forEach(entry=>{
        if (!entry.isIntersecting){
            scrolling.classList.add("animation")
            text.classList.add("animationText")
        }else{
            scrolling.classList.remove('animation')
            text.classList.remove('animationText')
        }

    })
})

observateur.observe(document.querySelector('.navbar'))
