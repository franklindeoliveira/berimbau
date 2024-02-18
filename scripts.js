let velocidade = 1
        let idsReproducao = [];

        document.querySelector("#velocidade").textContent = velocidade + "x"

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

        

        document.querySelector("#toque_personalizado").addEventListener("click", () => tocar(document.querySelector("#toque_personalizado_batidas").value))
        document.querySelector("#toque_angola").addEventListener("click", () => tocar(document.querySelector("#toque_angola_batidas").value))
        document.querySelector("#toque_sbp").addEventListener("click", () => tocar(document.querySelector("#toque_sbp_batidas").value))
        document.querySelector("#toque_sbg").addEventListener("click", () => tocar(document.querySelector("#toque_sbg_batidas").value))
        document.querySelector("#toque_angola2").addEventListener("click", () => tocar(document.querySelector("#toque_angola_batidas").value))
        document.querySelector("#toque_sbp2").addEventListener("click", () => tocar(document.querySelector("#toque_sbp_batidas").value))
        document.querySelector("#toque_sbg2").addEventListener("click", () => tocar(document.querySelector("#toque_sbg_batidas").value))
        document.querySelector("#parar").addEventListener("click", parar)
        document.querySelectorAll(".parar").forEach(pararAudio => pararAudio.addEventListener("click", parar))

        function tocar(batidas) {
            
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
            if (document.querySelector("#repetir").checked) {
                idsReproducao.push(setTimeout(() => tocar(batidas), timeout))
            }            
        }

        function parar() {
            idsReproducao.forEach(idReproducao => {
                clearTimeout(idReproducao)
            })
            idsReproducao = []
        }
        
        document.querySelector("#velocidade_mais").addEventListener("click", async function(event) {
            velocidade += 0.25
            document.querySelector("#velocidade").textContent = velocidade + "x"
        })

        document.querySelector("#velocidade_menos").addEventListener("click", async function(event) {
            velocidade -= 0.25
            document.querySelector("#velocidade").textContent = velocidade + "x"
        })

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
            const shareData = {
                title: "Berimbau",
                text: "Aprenda a tocar Berimbau",
                url: "https://franklindeoliveira.github.io/berimbau",
            };
            await navigator.share(shareData);
        })