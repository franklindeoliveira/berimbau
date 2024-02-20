let velocidade = 1
let idsReproducao = [];

//document.querySelector("#velocidade").textContent = velocidade + "x"

document.querySelectorAll("[data-toque]").forEach(toque => {
    let audio = new Audio(`audio/${toque.dataset.toque}.mp3`)
    audio.autoPlay = false
    toque.addEventListener("click", function(event) {
        if (event.target.dataset.toque == "dom") {
            tocarDom()
        }
        if (event.target.dataset.toque == "tchi") {
            tocarTchi()
        }
        if (event.target.dataset.toque == "dim") {
            tocarDim()
        }
        if (event.target.dataset.toque == "domchi") {
            tocarDomChi()
        }
        event.target.value = ""
    })
})

//document.querySelector("#toque_personalizado").addEventListener("click", () => tocar(document.querySelector("#toque_personalizado_batidas").value))
//document.querySelector("#toque_angola").addEventListener("click", () => tocar(document.querySelector("#toque_angola_batidas").value))
//document.querySelector("#toque_sbp").addEventListener("click", () => tocar(document.querySelector("#toque_sbp_batidas").value))
//document.querySelector("#toque_sbg").addEventListener("click", () => tocar(document.querySelector("#toque_sbg_batidas").value))
//document.querySelector("#toque_angola2").addEventListener("click", () => tocar(document.querySelector("#toque_angola_batidas").value))
//document.querySelector("#toque_sbp2").addEventListener("click", () => tocar(document.querySelector("#toque_sbp_batidas").value))
//document.querySelector("#toque_sbg2").addEventListener("click", () => tocar(document.querySelector("#toque_sbg_batidas").value))
//document.querySelector("#parar").addEventListener("click", parar)
//document.querySelectorAll(".parar").forEach(pararAudio => pararAudio.addEventListener("click", parar))

/*
document.querySelector("#velocidade_mais").addEventListener("click", async function(event) {
    velocidade += 0.25
    document.querySelector("#velocidade").textContent = velocidade + "x"
})

document.querySelector("#velocidade_menos").addEventListener("click", async function(event) {
    velocidade -= 0.25
    document.querySelector("#velocidade").textContent = velocidade + "x"
})*/

function tocar(batidas) {
    console.log("#################### " + batidas)
    
    let batidasPartes = batidas.split(" ")

    let batidasValidas = true;
    let msgValidacao = "";
    batidasPartes.forEach(batida => {
        if (batida != "dom" && batida != "dim" && batida != "tchi" && batida != "domchi" && !batida.includes("s")) {
            batidasValidas = false;
            msgValidacao += "Simbolo '" + batida + "'' invalido. "
        }
    })

    if (!batidasValidas) {
        alert(msgValidacao)
        return
    }
    
    let timeout = 0
    let batidaParteIntervalo = 1
    batidasPartes.forEach(batidaParte => {
        if (batidaParte.includes("s")) {
            batidaParteIntervalo = Number(batidaParte.replace("s", ""))                    
        } else {
            batidaParteIntervalo = 1
        }

        timeout += batidaParteIntervalo * 1000 / velocidade
        
        if (batidaParte == "dom") {
            idsReproducao.push(setTimeout(tocarDom, timeout))
            batidaParteIntervalo = 1
        } else if (batidaParte == "tchi") {
            idsReproducao.push(setTimeout(tocarTchi, timeout))
            batidaParteIntervalo = 1
        } else if (batidaParte == "dim") {
            idsReproducao.push(setTimeout(tocarDim, timeout))
            batidaParteIntervalo = 1
        } else if (batidaParte == "domchi") {
            idsReproducao.push(setTimeout(tocarDomChi, timeout))
            batidaParteIntervalo = 1
        }
    })
    if (document.querySelector("#repetir") && document.querySelector("#repetir").checked) {
        idsReproducao.push(setTimeout(() => tocar(batidas), timeout))
    }            
}

function parar() {
    idsReproducao.forEach(idReproducao => {
        clearTimeout(idReproducao)
    })
    idsReproducao = []
}

function tocarTchi() {
    new Audio("audio/tchi.mp3").play()
}

function tocarDomChi() {
    new Audio("audio/domchi.mp3").play()
}

function tocarDim() {
    new Audio("audio/dim.mp3").play()
}

function tocarDom() {
    new Audio("audio/dom.mp3").play()
}

document.querySelector("#compartilhar").addEventListener("click", async function(event) {
    const response = await fetch('https://media.istockphoto.com/id/924098198/pt/vetorial/isolated-colorful-decorative-ornate-berimbau-with-caxixi-baqueta-and-dobrao-on-white.jpg?s=612x612&w=0&k=20&c=Tw57MSFN9X2-f-1PFnztcP2V9PLvO2HtlC36nFEzEPU=');
    const blob = await response.blob();
    const filesArray = [
        new File(
            [blob],
            'berimbau.jpg',
            {
            type: "image/jpeg"
            }
        )
        ];

    const shareData = {
        title: "Berimbau",
        text: "Aprenda a tocar Berimbau",
        url: "https://franklindeoliveira.github.io/berimbau",
        files: filesArray
    };
    await navigator.share(shareData);
})

document.querySelectorAll(".play-audio").forEach(audioPlay => audioPlay.addEventListener("click", playAudio))

function playAudio(event) {
    console.log(`tocando audio ...`)
    console.log(event.currentTarget)
    let play = event.currentTarget.querySelector("i")
    console.log(play.textContent)

    let playState = play.textContent

    document.querySelectorAll(".play-audio").forEach(audioPlay => {
        audioPlay.querySelector("i").textContent = "stop"
        audioPlay.classList.remove("playing")        
    })

    event.currentTarget.classList.add("playing")

    if (playState == "stop") {
        play.textContent = "play_arrow"
    } else {
        play.textContent = "stop"
        event.currentTarget.classList.remove("playing")
    }
}
