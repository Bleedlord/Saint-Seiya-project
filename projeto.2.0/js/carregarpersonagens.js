
const somClique = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
somClique.volume = 0.5;

function criarCard(personagem) {
    const card = document.createElement("div");
    card.classList.add("card");

    const imagemPadrao = "https://placehold.co/300x400/111/fff?text=Saint+Seiya";
    
    const imagemInicial = personagem.image ? personagem.image : imagemPadrao;

    card.innerHTML = `
        <img src="${imagemInicial}" alt="${personagem.name}" onerror="this.onerror=null; this.src='${imagemPadrao}';">
        <div class="produtos">
            <h2>${personagem.name}</h2>
            <p><strong>Titulo:</strong> ${personagem.titulo || ''}</p>
            <p><strong>Genero:</strong> ${personagem.genero  || ''}</p>
            <p><strong>Rank:</strong> ${personagem.rank || ''}</p>
            <p><strong>Constelação:</strong> ${personagem.constellation || ''}</p>
        </div>
    `;
    card.addEventListener('click', () => {
        try {
            somClique.currentTime = 0;
            somClique.play().catch(e => console.log("Aguardando interação para tocar o som..."));
        } catch (error) {
            console.log("Erro ao tocar o áudio:", error);
        }
    });

    return card;
}

function renderizarCards(dados) {
    const cardpersonagem = document.getElementById("cardpersonagens"); 
    
    if (!cardpersonagem) {
        console.error("ERRO Crítico: A div #cardpersonagens realmente não existe no DOM ainda.");
        return;
    }
    
    cardpersonagem.innerHTML = "";

    dados.characters.forEach(personagem => {
        const card = criarCard(personagem);
        cardpersonagem.appendChild(card);
    });
}

async function carregarAPI() {
    try {
        const resposta = await fetch('https://back-end-saint-seiya-api.onrender.com/v1/saint-seiya/characters');
        
        if (!resposta.ok) {
            throw new Error("Erro ao buscar API");
        }
        
        const dados = await resposta.json();
        console.log("Dados recebidos:", dados);
        
        const verificarEFeito = setInterval(() => {
            if (document.getElementById("cardpersonagens")) {
                clearInterval(verificarEFeito);
                renderizarCards(dados);
            }
        }, 100);

    } catch (error) {
        console.log("ERRO:", error);
    }
}

carregarAPI();
