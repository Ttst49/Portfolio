const deg = (a) => Math.PI / 180 * a
const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1))
const opt = {
    particles: window.width / 500 ? 1000 : 500,
    noiseScale: 0.009,
    angle: Math.PI / 180 * -90,
    h1: rand(0, 360),
    h2: rand(0, 360),
    s1: rand(20, 90),
    s2: rand(20, 90),
    l1: rand(30, 80),
    l2: rand(30, 80),
    strokeWeight: 1.2,
    tail: 82,
}
const Particles = []
let time = 0
/*
document.body.addEventListener('click', () => {
    opt.h1 = rand(0, 360)
    opt.h2 = rand(0, 360)
    opt.s1 = rand(20, 90)
    opt.s2 = rand(20, 90)
    opt.l1 = rand(30, 80)
    opt.l2 = rand(30, 80)
    opt.angle += deg(random(60, 60)) * (Math.random() > .5 ? 1 : -1)

    for (let p of Particles) {
        p.randomize()
    }
})
*/
class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.lx = x
        this.ly = y
        this.vx = 0
        this.vy = 0
        this.ax = 0
        this.ay = 0
        this.hueSemen = Math.random()
        this.hue = this.hueSemen > .5 ? 20 + opt.h1 : 20 + opt.h2
        this.sat = this.hueSemen > .5 ? opt.s1 : opt.s2
        this.light = this.hueSemen > .5 ? opt.l1 : opt.l2
        this.maxSpeed = this.hueSemen > .5 ? 1 : 1
    }

    randomize() {
        this.hueSemen = Math.random()
        this.hue = this.hueSemen > .5 ? 20 + opt.h1 : 20 + opt.h2
        this.sat = this.hueSemen > .5 ? opt.s1 : opt.s2
        this.light = this.hueSemen > .5 ? opt.l1 : opt.l2
        this.maxSpeed = this.hueSemen > .5 ? 1 : 1
    }

    update() {
        this.follow()

        this.vx += this.ax
        this.vy += this.ay

        var p = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        var a = Math.atan2(this.vy, this.vx)
        var m = Math.min(this.maxSpeed, p)
        this.vx = Math.cos(a) * m
        this.vy = Math.sin(a) * m

        this.x += this.vx
        this.y += this.vy
        this.ax = 0
        this.ay = 0

        this.edges()
    }


    follow() {
        let angle = (noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale)) * Math.PI * 0.5 + opt.angle

        this.ax += Math.cos(angle)
        this.ay += Math.sin(angle)

    }

    updatePrev() {
        this.lx = this.x
        this.ly = this.y
    }

    edges() {
        if (this.x < 0) {
            this.x = width
            this.updatePrev()
        }
        if (this.x > width) {
            this.x = 0
            this.updatePrev()
        }
        if (this.y < 0) {
            this.y = height
            this.updatePrev()
        }
        if (this.y > height) {
            this.y = 0
            this.updatePrev()
        }
    }

    render () {
        stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`)
        line(this.x, this.y, this.lx, this.ly)
        this.updatePrev()
    }
}



function setup() {
    createCanvas(windowWidth, windowHeight)
    for (let i = 0; i < opt.particles; i++) {
        Particles.push(new Particle(Math.random() * width, Math.random() * height))
    }
    strokeWeight(opt.strokeWeight)
}



function draw() {
    time++
    background(0, 100 - opt.tail )

    for (let p of Particles) {
        p.update()
        p.render()
    }
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}


const homeButton = document.querySelector(".home")
const projectsButton = document.querySelector(".projects")
const infoButton = document.querySelector(".infos")
const contactButton = document.querySelector(".contact")
const templatingZone = document.querySelector(".zone")
const contactPanel = document.querySelector(".contactPanel")


let homeTemplate = "<div class='texting'>" +
    "I'm a passionate web developer with a strong foundation in front-end and back-end technologies. My journey in the world of web development started years ago and since then, I've been dedicated to creating responsive and user-friendly web applications. I thrive on challenges and enjoy staying up to date with the latest trends in the field. <br>" +
    "<br>I have always believed that code is a way to express oneself without speaking, simply by striving to make each of code better than the previous one." +
    "</div>"




let projectsTemplate ="<div class='texting'>" + "bonjue" + "</div>"

let infosTemplate ='<div class="texting">'+
    "<br>" +
    "Skills<br>" +
    "<br>" +
    "- Front-end Development: HTML5, CSS3, JavaScript,Angular, React, Vue.js, TypeScript<br>" +
    "- Back-end Development: Symfony, Node.js, Python, Express, Django<br>" +
    "- Databases: PostgreSQL, MongoDB, MySQL <br>" +
    "- Version Control: Git, GitHub<br>" +
    "- Deployment and Hosting: Linode, Vultr<br>" +
    "<br>" +

    "Contact<br>" +
    "<br>" +
    "<a class='link' href='https://fr.linkedin.com/in/thibaut-stachnick'>- LinkedIn</a><br>" +
    "<a class='link' href='https://github.com/ttst49'>- GitHub</a><br>" +
    "<a class='link' href='mailto:thibautstachnick@gmail.com'>- Email</a><br>" +
    "<br>" +
    "Feel free to connect with me on LinkedIn or explore my GitHub repositories to learn more about my work and projects!<br>" +
    "</div>"


let contactTemplate = "Let's turn your good idea into reality together! Or perhaps you just want to have a chat with me, either way, it's all right below. <a onclick=\"showContactPanel()\" class='btn btn-primary'>Contact me</a>"


homeButton.addEventListener("click",()=>{
    projectsButton.classList.remove("active")
    infoButton.classList.remove("active")
    contactButton.classList.remove("active")
    homeButton.classList.add("active")
    templatingZone.innerHTML = homeTemplate
})
projectsButton.addEventListener("click",()=>{
    homeButton.classList.remove("active")
    infoButton.classList.remove("active")
    contactButton.classList.remove("active")
    projectsButton.classList.add("active")
    templatingZone.innerHTML = projectsTemplate
})
infoButton.addEventListener("click",()=>{
    projectsButton.classList.remove("active")
    homeButton.classList.remove("active")
    contactButton.classList.remove("active")
    infoButton.classList.add("active")
    templatingZone.innerHTML = infosTemplate
})
contactButton.addEventListener("click",()=>{
    projectsButton.classList.remove("active")
    infoButton.classList.remove("active")
    homeButton.classList.remove("active")
    contactButton.classList.add("active")
    templatingZone.innerHTML = contactTemplate
})

function showContactPanel(){
    contactPanel.classList.add("showing")
}

function hideContactPanel(){
    contactPanel.classList.remove("showing")
}

