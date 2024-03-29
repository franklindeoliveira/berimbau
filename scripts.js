let velocidade = 1
let idsReproducao = [];

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

document.querySelectorAll(".play-audio").forEach(audioPlay => audioPlay.addEventListener("click", playAudio))

function playAudio(event) {
    console.log(`tocando audio ...`)
    let tituloAudio = event.currentTarget.parentElement.querySelector("h5").textContent
    document.querySelector("#titulo_audio_tocando").textContent = tituloAudio
    document.querySelector("#visor_titulo_audio_tocando").textContent = tituloAudio

    if (tituloAudio == "Toque de Angola") {
        document.querySelector("#visor_simbolos_audio_tocando").innerHTML = "&#10761; &#10761; &#11044; &#128901; &#128901;"
    } else if (tituloAudio == "Toque São Bento Pequeno de Angola") {
        document.querySelector("#visor_simbolos_audio_tocando").innerHTML = "&#10761; &#10761; &#11044; &#128901;"
    } else if (tituloAudio == "Toque São Bento Grande de Angola") {
        document.querySelector("#visor_simbolos_audio_tocando").innerHTML = "&#10761; &#10761; &#11044; &#128901; &#128901;"
    }
    
    
    console.log(event.currentTarget)
    let playIcon = event.currentTarget.querySelector("i")
    console.log(playIcon.textContent)

    console.log(playIcon)

    let playState = playIcon.textContent

    document.querySelectorAll(".play-audio").forEach(audioPlay => {
        audioPlay.querySelector("i").textContent = "play_arrow"
        audioPlay.classList.add("stop")
        audioPlay.classList.remove("playing")
    })

    if (playState == "stop") {
        event.currentTarget.classList.remove("playing")
        event.currentTarget.classList.add("stop")
        playIcon.textContent = "play_arrow"    
    } else {
        event.currentTarget.classList.remove("stop")
        event.currentTarget.classList.add("playing")
        playIcon.textContent = "stop"    
    }
    parar()
    play(event.currentTarget)

}
