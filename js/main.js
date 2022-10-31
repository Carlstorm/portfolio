import * as THREE from './three.module.js';
import {
    GLTFLoader
} from './GLTFLoader.js';
import {
    RGBELoader
} from './RGBELoader.js';
import {
    RoughnessMipmapper
} from './RoughnessMipmapper.js';
let camera, scene, renderer, container, thething, envMap1;

var animationtrans = 0;

let translimit = false;
// 3D props and vars
let speed, v2;
let dirAndPos = []
let isedge = false;
let st1 = document.getElementsByClassName("st2");
// scroll vars
let plusscroll = 0;
let vavavava = 0;
let Portenable = false;

// SVGDRAW VARS
let sup1 = 0
let sup2 = 0
let sup3 = 0
let sup4 = 0
let sup5 = 0
let sup6 = 0
let sup7 = 0
let sup8 = 0
let sup9 = 0
let sup10 = 0

// cursor stuff
let widthPP = window.innerWidth;
let heightPP = window.innerHeight;
let testebest
let testebest2
let waswas = 0;

let progress = 0;
let progress2 = 0;

let kkkktest = []


init();
function init() {
    container = document.createElement('div');
    container.id = "ModelContainer"
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(0, 0, 4);

    scene = new THREE.Scene();

    new RGBELoader()
        .setDataType(THREE.UnsignedByteType)
        .setPath('./envtext/')
        .load('studio_small_03_1k.hdr', function (texture) {

            envMap1 = pmremGenerator.fromEquirectangular(texture).texture;

            scene.environment = envMap1;
            texture.dispose();
            pmremGenerator.dispose();

            // use of RoughnessMipmapper is optional
            var roughnessMipmapper = new RoughnessMipmapper(renderer);

            var loader = new GLTFLoader().setPath('./');
            loader.load('eereretet.gltf', function (gltf) {

                gltf.scene.traverse(function (child) {
                    if (child.isMesh) {
                        roughnessMipmapper.generateMipmaps(child.material);
                    }
                });
                thething = gltf.scene.children[0]
                thething.position.y = -0.233
                thething.position.x = -0.033
                for (let i = 0; thething.children.length > i; i++) {
                    isedge = false;
                    for (let k = 0; thething.children[i].children.length > k; k++) {
                        let oldMat = thething.children[i].children[k].material;
                        if (oldMat.name == "OuterMat") {
                            isedge = true;

                        }
                    }
                    v2 = new THREE.Vector3(
                        thething.children[i].position.x,
                        thething.children[i].position.y,
                        thething.children[i].position.z,
                    )
                    let v1 = new THREE.Vector3(
                        thething.position.x + 0.18,
                        thething.position.y + 0.45,
                        thething.position.z + 0,
                    );

                    let dir = new THREE.Vector3();
                    dir.subVectors(v2, v1);

                    let wawa = dir.normalize();
                    let xxx = 0
                    let yyy = 0
                    let zzz = 0
                    if (wawa.x > 0) {
                        xxx = 1
                    } else {
                        xxx = -1
                    }
                    if (wawa.y > 0) {
                        yyy = 1
                    } else {
                        yyy = -1
                    }
                    if (wawa.z > 0) {
                        zzz = 1
                    } else {
                        zzz = -1
                    }

                    let distance = 0;
                    if ((v1.distanceTo(v2)) > 0.075) {
                    distance = (v1.distanceTo(v2))
                    } else {
                    distance = 0.075
                    }

                    let dirmultiplyery = 1;
                    if (wawa.y > 0) {
                        dirmultiplyery -= 0.2;
                    } 
                    if (wawa.x > 0 && wawa.y > 0) {
                        dirmultiplyery += 0.25;
                    } 
                    if (wawa.y < 0) {
                        dirmultiplyery -= 0.4;
                    } 
                    if (wawa.x > 0) {
                        dirmultiplyery += 0.5;
                    } 
                    if (wawa.x < 0) {
                        dirmultiplyery -= 0.4;
                    } 
                    if (isedge) {
                        dirmultiplyery += 2;
                    }

                    let dis1 = ((Math.abs(wawa.x))-Math.abs(wawa.x)/(distance)*10)
                    let dis2 = ((Math.abs(wawa.y))-Math.abs(wawa.y)/(distance)*10)
                    let dis3 = ((Math.abs(wawa.z))-Math.abs(wawa.z)/(distance)*10)

                    let dirnindeg = new THREE.Vector3(
                        (((Math.abs(dis1)*xxx)/777)*dirmultiplyery)*((Math.random() + 1) * 3),
                        (((Math.abs(dis2)*yyy)/777)*dirmultiplyery)*((Math.random() + 1) * 3),
                        ((Math.abs(dis3)*zzz)/777)*(dirmultiplyery)*((Math.random() + 1) * 3),
                    )


                    kkkktest.push(i)
                    var a = new Object();
                    a.pos = v2;
                    a.rotX = thething.children[i].rotation.x
                    a.rotY = thething.children[i].rotation.y
                    a.rotZ = thething.children[i].rotation.z
                    a.dir = dirnindeg
                    a.xxx = xxx
                    a.yyy = yyy
                    a.zzz = zzz
                    a.distance = v1.distanceTo(v2);
                    if (dir.x > 0) {
                        a.speedbuffX = 2
                    } else {
                        a.speedbuffX = 0.8
                    }


                    a.speedbuffZ = 4.33 - (dir.x * 3)
                    if (dir.x > -0.3) {
                        a.speedbuffZ = 5
                    } else {
                        a.speedbuffZ = 2
                    }

                    if (dir.y > 0) {
                        a.speedbuffY = 3
                    } else {
                        a.speedbuffY = 1
                    }
                    if (isedge) {
                        a.distance -= a.distance / 3
                    }
                    dirAndPos.push(a);

                    progress = (i / thething.children.length * 67) + progress2
                    if (progress > 99) {
                        progress = 100
                    }
                    document.getElementById("loaderbar").style.width = ""+progress+"%"
                }

                scene.add(gltf.scene);
                roughnessMipmapper.dispose();

                // initialize stokelenght
                for (let k = 0; k < st1.length; k++) {
                    st1[k].style.strokeDasharray = st1[k].getTotalLength();
                }
                setTimeout(function(){ 
                document.getElementById("loader").style.transition = "0s"; 
                document.getElementById("loader").style.opacity = 0; 
                document.getElementById("ModelContainer").style.opacity = 1;
                document.getElementById("hello").style.opacity = 1;
                animate();
            }, 400);

                
 
            },
            
            function (xhr) {
                progress2 = (xhr.loaded / xhr.total * 33)
                document.getElementById("loaderbar").style.width = ""+progress2+"%"
            }
            
            );

        });


    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.physicallyCorrectLights = true;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    var pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    widthPP = window.innerWidth;
    heightPP = window.innerHeight;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    vavavava = 0;
    render();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}


let runani = true;
function explosion() {
    for (let i = 0; thething.children.length > i; i++) {

    thething.children[i].position.x = (dirAndPos[i].pos.x + (dirAndPos[i].dir.x*ScrollpercA)*(1+(speedmultiplyer*20)))
    thething.children[i].position.y = (dirAndPos[i].pos.y + (dirAndPos[i].dir.y*ScrollpercA)*(1+(speedmultiplyer*20)))
    thething.children[i].position.z = (dirAndPos[i].pos.z + (dirAndPos[i].dir.z*ScrollpercA)*(1+(speedmultiplyer*20)))

    thething.children[i].rotation.y = dirAndPos[i].rotY + ((Math.pow(dirAndPos[i].dir.z, 2))*ScrollpercA)*-8
    thething.children[i].rotation.z = dirAndPos[i].rotZ + ((Math.pow(dirAndPos[i].dir.z, 2))*ScrollpercA)*-8
    thething.children[i].rotation.x = dirAndPos[i].rotX + ((Math.pow(dirAndPos[i].dir.x, 2))*ScrollpercA)*-8
    if (i == thething.children.length-1) {
        runani = true;
    }
}
}

let ScrollpercA
let speedmultiplyer = 1.5;
function render() {
    renderer.render(scene, camera);

    // scroll aniValues
    let Startscroll = vavavava;
    let Slutscroll = window.pageYOffset;
    if (Startscroll > 0) {
        Startscroll * -1
    }
    if (Slutscroll < 0) {
        Slutscroll * -1
    }
    plusscroll = ((Startscroll - Slutscroll) / 30)
    vavavava -= plusscroll
    let ScrollpercB
    ScrollpercB = (vavavava / ((document.body.scrollHeight - window.innerHeight))).toFixed(5)
    ScrollpercA = ((ScrollpercB * 1.2) - 0.2).toFixed(5)
    if (ScrollpercA < 0) {
        ScrollpercA = 0;
    } else if (ScrollpercA > 1) {
        ScrollpercA = 1;
    }




if (!omigenable) {
    if (animationtrans2 >= 0.0001) {
        animationtrans2 -= (animationtrans2-0.0)/10

        camera.rotation.y = 1.2*animationtrans2
    
    }
    } else {
        if (animationtrans2 < 1) {
            animationtrans2 += (1-animationtrans2)/20
        }
        camera.rotation.y = 1.8*animationtrans2
}



if (!Portenable) {
if (animationtrans >= 0) {
    animationtrans -= (animationtrans)/10
    speedmultiplyer = animationtrans

}
} else {
    if (animationtrans < 1) {
        animationtrans += (1-animationtrans)/35
        speedmultiplyer = animationtrans

}

}



    // MOUSEMOVE ANIMATIONS

    if (testebest && testebest2) {
        let startposX2 = waswas
        let slutposX2 = ((testebest2 / widthPP - 1)) / 10
        let plusX2 = (startposX2 - slutposX2) / 20
        waswas -= plusX2
        thething.rotation.y = (-1.5 * ScrollpercB) + waswas

        let startposY2 = thething.rotation.x
        let slutposY2 = ((testebest / heightPP - 1)) / 10
        let plusY2 = (startposY2 - slutposY2) / 20
        thething.rotation.x -= plusY2
    } else {
        testebest = (heightPP / 2);
        testebest2 = (widthPP / 2);
    }


    // DRAW SVG values
    let sup = ScrollpercB * 20
    sup1 = sup - 5
    if (sup - 5 < 0) {
        sup1 = 0;
    } else {
        sup1 = sup - 5
    }
    // 2
    if (sup1 - 1 < 0) {
        sup2 = 0;
    } else if (sup1 - 1 > 1) {
        sup2 = 1;
    } else {
        sup2 = sup1 - 1
    }
    // 2
    if (sup1 - 2 < 0) {
        sup3 = 0;
    } else if (sup1 - 2 > 1) {
        sup3 = 1;
    } else {
        sup3 = sup1 - 2
    }
    // 3
    if (sup1 - 3 < 0) {
        sup4 = 0;
    } else if (sup1 - 3 > 1) {
        sup4 = 1;
    } else {
        sup4 = sup1 - 3
    }
    // 4
    if (sup1 - 4 < 0) {
        sup5 = 0;
    } else if (sup1 - 4 > 1) {
        sup5 = 1;
    } else {
        sup5 = sup1 - 4
    }
    // 5
    if (sup1 - 5 < 0) {
        sup6 = 0;
    } else if (sup1 - 5 > 1) {
        sup6 = 1;
    } else {
        sup6 = sup1 - 5
    }
    // 6
    if (sup1 - 6 < 0) {
        sup7 = 0;
    } else if (sup1 - 6 > 1) {
        sup7 = 1;
    } else {
        sup7 = sup1 - 6
    }
    // 7
    if (sup1 - 7 < 0) {
        sup8 = 0;
    } else if (sup1 - 7 > 1) {
        sup8 = 1;
    } else {
        sup8 = sup1 - 7
    }
    // 8
    if (sup1 - 8 < 0) {
        sup9 = 0;
    } else if (sup1 - 8 > 1) {
        sup9 = 1;
    } else {
        sup9 = sup1 - 8
    }
        // fill
    if (sup - 14 < 0) {
        sup10 = 0;
    } else {
        sup10 = (sup - 14) / 6
    }


    // SHOW or HIDE MENU
    if (window.pageYOffset / (document.body.scrollHeight - window.innerHeight) > 0.98) {
        document.getElementById("wrap").style.opacity = 1;
        document.getElementById("wrap").style.pointerEvents = "inherit";
        instaswitch = false;
    } else {
        document.getElementById("wrap").style.opacity = 0;
        document.getElementById("wrap").style.pointerEvents = "none";
    }

        // SHOW or HIDE DOWNARROW
        if (!instaswitch) {
        if (window.pageYOffset / (document.body.scrollHeight - window.innerHeight) < 0.1) {
                document.getElementById("downarrow").style.opacity = 0.33;
                document.getElementById("downarrow").style.pointerEvents = "initial";
        } else {
            document.getElementById("downarrow").style.opacity = 0;
            document.getElementById("downarrow").style.pointerEvents = "none";
        }
    }


requestAnimationFrame(explosion)
requestAnimationFrame(svgdraw)
// END OF ANI RENDER
}

let animationtrans2 = 0;

function svgdraw() {
    if (sup1 <= 1) {
        st1[10].style.strokeDashoffset = st1[10].getTotalLength() - st1[10].getTotalLength() * (sup1)
    }
    if (sup2 <= 1) {
        st1[9].style.strokeDashoffset = st1[9].getTotalLength() - st1[9].getTotalLength() * (sup2)
    }
    if (sup3 <= 1) {
        st1[8].style.strokeDashoffset = st1[8].getTotalLength() - st1[8].getTotalLength() * (sup3)
    }
    if (sup4 <= 1) {
        st1[7].style.strokeDashoffset = st1[7].getTotalLength() - st1[7].getTotalLength() * (sup4)
    }
    if (sup5 <= 1) {
        st1[6].style.strokeDashoffset = st1[6].getTotalLength() - st1[6].getTotalLength() * (sup5)
    }
    if (sup6 <= 1) {
        st1[5].style.strokeDashoffset = st1[5].getTotalLength() - st1[5].getTotalLength() * (sup6)
    }
    if (sup7 <= 1) {
        st1[4].style.strokeDashoffset = st1[4].getTotalLength() - st1[4].getTotalLength() * (sup7)
    }
    if (sup8 <= 1) {
        st1[3].style.strokeDashoffset = st1[3].getTotalLength() - st1[3].getTotalLength() * (sup8)
    }
    if (sup9 <= 1) {
        st1[2].style.strokeDashoffset = st1[2].getTotalLength() - st1[2].getTotalLength() * (sup8)
    }
    if (sup9 <= 1) {
        st1[1].style.strokeDashoffset = st1[1].getTotalLength() - st1[1].getTotalLength() * (sup9)
    }
    if (sup10 <= 1) {
        st1[0].style.width = "" + 100 * sup10 + "%"
    }
}

// events
window.addEventListener("mousemove", function (event) {
    testebest = (heightPP / 2) + event.clientY;
    testebest2 = (widthPP / 2) + event.clientX;
})

let omigenable = false;
let currentpage = "hello";
let Prevtarget = null;
// click omig
document.getElementById("Omig").addEventListener("click", () => pagehandler("profilwrap", 0))
document.getElementById("PortMen").addEventListener("click", () => pagehandler("portmenutexts", 1))
document.getElementById("OmigCall").addEventListener("click", () => pagehandler("portmenutexts", 1))
document.getElementById("mail").addEventListener("click", (event) => mailcopyhandler(event))

let copieretmail = false;
function mailcopyhandler(e) {
        var elem = document.createElement("textarea");
        document.body.appendChild(elem);
        elem.value = "carl-storm@hotmail.com"
        elem.select();
        document.execCommand("copy");
        document.body.removeChild(elem);
    hidetextbut(2)
    setTimeout(function(){
    copieretmail = true;
    showtextbut(2)
    if (!mailHcheck) {
        setTimeout(function(){
            hidetextbut(2)
        }, 750)
    }
    }, 400)
}

function pagehandler(page, target) {
    if (page != currentpage) {
        disableScroll();
        if (target == 1) {
            // document.getElementsByClassName("butimg")[0].src = "../icons/Omig.svg"
            Portenable = true
            omigenable = false;
        } else {
            // document.getElementsByClassName("butimg")[1].src = "../icons/Port.svg"
            omigenable = true;
        }
    } else {
        enableScroll();;
        page = "hello"
        Portenable = false;

        if (target == 1) {
            // document.getElementsByClassName("butimg")[1].src = "../icons/Port.svg"
        } else {
            // document.getElementsByClassName("butimg")[0].src = "../icons/Omig.svg"
            omigenable = false;
        }
    }
    pagechange(page, currentpage, target, Prevtarget);
    currentpage = page;
    if (target == Prevtarget) {
        Prevtarget = null;
    } else {
        Prevtarget = target;
    }
}

function disableScroll() { 
        window.onscroll = function() { 
            window.scrollTo(0, document.body.scrollHeight); 
        }; 
} 
 
function enableScroll() { 
    window.onscroll = function() {}; 
} 


window.jumptobot = () => arrowfunk();
let instaswitch = false;
function arrowfunk() {
    instaswitch = true;
    window.scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
     });
     document.getElementById("downarrow").style.opacity = 0;
     document.getElementById("downarrow").style.pointerEvents = "none";
}



let changeprocess = false;
function pagechange(pageTo, pageOn, target, Prevtarget) {
    changeprocess = true;


    document.getElementsByClassName("butimg")[target].parentElement.style.opacity = 0
    hidetextbut(target)  
    document.getElementsByClassName("butimg")[target].parentElement.style.pointerEvents = "none";
    if (Prevtarget != target && Prevtarget != null) {
    document.getElementsByClassName("butimg")[Prevtarget].parentElement.style.opacity = 0
}
    document.getElementById(pageOn).style.opacity = 0;
    document.getElementById(pageOn).style.pointerEvents = "none";


            setTimeout(function(){
                changeprocess = false;
                document.getElementsByClassName("butimg")[target].parentElement.style.opacity = opacityamount
                document.getElementsByClassName("butimg")[target].parentElement.style.pointerEvents = "inherit";


                // document.getElementsByClassName("butimg")[target].parentElement.classList.style.opacity = opacityamount;
                if (Prevtarget != target) {
                    document.getElementsByClassName("butimg")[target].src = "svgs/Cross.svg"
                    if (opacityamount > 0.5) {
                        showtextbut(target);
                    }
                    if (Prevtarget != null) {
                        document.getElementsByClassName("butimg")[Prevtarget].parentElement.style.opacity = 0.33
                        document.getElementsByClassName("butimg")[Prevtarget].parentElement.style.pointerEvents = "inherit";
                    if (Prevtarget == 1) {
                        document.getElementsByClassName("butimg")[Prevtarget].src = "svgs/Port.svg"
                    } else {
                        document.getElementsByClassName("butimg")[Prevtarget].src = "svgs/Omig.svg"
                    }
                 }
                } else {
                    if (target == 0) {
                        document.getElementsByClassName("butimg")[target].src = "svgs/Omig.svg"
                    } else {
                        document.getElementsByClassName("butimg")[target].src = "svgs/Port.svg"
                    }
                    if (opacityamount > 0.5) {
                        showtextbut(target);
                    }
                    }
                




                    document.getElementById(pageTo).style.opacity = 1;
                    document.getElementById(pageTo).style.pointerEvents = "inherit";
            }, 400)
}



function hidetextbut(dis) {
    if (dis == 0) {
        document.getElementsByClassName("wawawa")[dis].style.clipPath = "polygon(0% 0, 0% 0, 0% 100%, 0% 100%)"
        document.getElementsByClassName("coolLittleThing")[dis].style.left = "0px";
    } else {
        document.getElementsByClassName("wawawa")[dis].style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
        document.getElementsByClassName("coolLittleThing")[dis].style.right = "-0px";
    }
    document.getElementsByClassName("wawawa")[dis].style.opacity = 0;
    document.getElementsByClassName("coolLittleThing")[dis].style.opacity = 0;
}

function showtextbut(dis, changetext) {
    if (dis < 2) {
    if (dis == 0) {
        if (document.getElementsByClassName("butimg")[dis].src.includes("Cross")) {
            document.getElementsByClassName("wawawa")[dis].innerHTML = "Tilbage til forside"
        } else {
            document.getElementsByClassName("wawawa")[dis].innerHTML = "Om mig"
        }
        document.getElementsByClassName("wawawa")[dis].style.clipPath = "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)"
        document.getElementsByClassName("coolLittleThing")[dis].style.left = "calc(100% + 10px)";
    } else {
        if (document.getElementsByClassName("butimg")[dis].src.includes("Cross")) {
            document.getElementsByClassName("wawawa")[dis].innerHTML = "Tilbage til forside"
        } else {
            document.getElementsByClassName("wawawa")[dis].innerHTML = "Mine kompetencer"
        }
        document.getElementsByClassName("wawawa")[dis].style.clipPath = "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)"
        document.getElementsByClassName("coolLittleThing")[dis].style.right = "calc(100% + 10px)";
    }
    } else {
        if (copieretmail) {
            document.getElementsByClassName("wawawa")[dis].innerHTML = "Mail kopieret!"
        } else {
            document.getElementsByClassName("wawawa")[dis].innerHTML = "Kopier E-mailadresse?" 
        }
        document.getElementsByClassName("wawawa")[dis].style.clipPath = "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)"
        document.getElementsByClassName("coolLittleThing")[dis].style.right = "calc(100% + 10px)";
    }
    document.getElementsByClassName("wawawa")[dis].style.opacity = 0.8;
    document.getElementsByClassName("coolLittleThing")[dis].style.opacity = 0.8;
}

document.getElementsByClassName("wawawa")[0].style.clipPath = "polygon(0% 0, 0% 0, 0% 100%, 0% 100%)"
document.getElementsByClassName("coolLittleThing")[0].style.left = "-0px";



let opacityamount = 0.33;
let prevbutton = null;
let mailHcheck = false;
document.getElementById("wrap").addEventListener("mouseover", function (event) {

    if (event.target.classList.contains("butimg")) {
        mailHcheck = false;
        opacityamount = 1;
        if (!changeprocess) {
            event.target.parentElement.style.opacity = opacityamount;
            prevbutton = event.target;
            if (event.target.parentElement.id == "Omig") {
                showtextbut(0)
            } else if (event.target.parentElement.id == "PortMen") {
                showtextbut(1)  
            } else if (prevbutton.parentElement.id == "mail") {
                mailHcheck = true;
                showtextbut(2)  
            }
        }
    } else {
        mailHcheck = false;
        opacityamount = 0.33;
        if (!changeprocess && prevbutton != null) {
            prevbutton.parentElement.style.opacity = opacityamount;
            if (prevbutton.parentElement.id == "Omig") {
                hidetextbut(0)
            } else if (prevbutton.parentElement.id == "PortMen") {
                hidetextbut(1)  
            } else if (prevbutton.parentElement.id == "mail") {
                hidetextbut(2)  
                copieretmail = false;
            }
        }
    }


})


// document.getElementsByClassName("portxplainanibox")[0].style.height = ""+document.getElementsByClassName("portxplainewrap")[0].offsetHeight+"px"
// // document.getElementsByClassName("portxplainanibox")[0].style.opacity = 0

// document.getElementsByClassName("bgimg")[0].style.backgroundImage = "url(../imgs/labyrixbg.jpg)"
// document.getElementsByClassName("bgimg")[1].style.backgroundImage = "url(../imgs/wtwimg.jpg)"
// document.getElementsByClassName("bgimg")[2].style.backgroundImage = "url(../imgs/notdoebg.jpg)"
// document.getElementsByClassName("bgimg")[3].style.backgroundImage = "url(../imgs/notdoebg.jpg)"
// document.getElementsByClassName("bgimg")[4].style.backgroundImage = "url(../imgs/notdoebg.jpg)"
// // document.getElementsByClassName("bgimg")[5].style.opacity = 0.4

// document.getElementsByClassName("portOewrap")[0].addEventListener("mouseover", hoverfunk, false)
// document.getElementsByClassName("portOewrap")[0].addEventListener("mouseleave", hoverfunkleave, false)

// document.getElementsByClassName("portxplainanibox")[0].style.height = "0px"

// portxplainewrap


// let savedOid = null;
// let activemen = 0;
// let outie = true;
// function hoverfunk(e) {
//     if (e.target != e.currentTarget) {
//         outie = false;
//         if (savedOid != null && activemen != 0) {
//             document.getElementsByClassName("portxplainanibox")[0].style.opacity = "0"
//             document.getElementsByClassName("portxplainanibox")[0].style.height = "2px"
//             document.getElementsByClassName("bgimg")[savedOid].style.transition = "0.75s"
//             document.getElementsByClassName("bgimg")[savedOid].style.opacity = 0;
//             setTimeout(function(){hejdu() }, 450);
//         }
//         document.getElementsByClassName("bgimg")[e.target.id].style.transition = "1.5s"
//         document.getElementsByClassName("bgimg")[e.target.id].style.opacity = 1;
//         savedOid = e.target.id;

//         if (activemen == 0) {
//             hejdu();
//         }
//     }
// }

// function hoverfunkleave() {
//     outie = true;
//     document.getElementsByClassName("portxplainanibox")[0].style.height = "2px"
//     document.getElementsByClassName("portxplainanibox")[0].style.opacity = "0"
//         document.getElementsByClassName("bgimg")[savedOid].style.transition = "0.5s"
//         document.getElementsByClassName("bgimg")[savedOid].style.opacity = 0;
//         setTimeout(function(){hejdu() }, 450);
//     }

function hejdu() {
    if (savedOid != null) {
        if (!outie) {
            document.getElementsByClassName("portxplainanibox")[0].style.opacity = "1"
            document.getElementsByClassName("portxplainewrap")[0].style.opacity = "1"
            document.getElementsByClassName("portxplainewrap")[0].innerHTML = portdesc[savedOid]
    document.getElementsByClassName("portxplainanibox")[0].style.height = ""+document.getElementsByClassName("portxplainewrap")[0].offsetHeight+"px"
            activemen = 1;
        } else {
            activemen = 0;
        }
    }
}



let portdesc1 = `
<h2>LABY22RIX</h2>
<p>Visuel representation af en "labyrint løser"</p>
`
let portdesc2 = `
<h2>kommer snart</h2>
<p>Film foreslag</p>
`
let portdesc3 = `
<h2>kommer snart</h2>
<p>...</p>
`
let portdesc4 = `
<h2>kommer snart</h2>
<p>...</p>
`
let portdesc5 = `
<h2>kommer snart</h2>
<p>...</p>
`
let portdesc = []
portdesc.push(portdesc1, portdesc2, portdesc3, portdesc4, portdesc5)
