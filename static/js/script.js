/*interações e comportamentos*/


/* =================================
   1. ELEMENTOS DA PAGINA
================================= */

const botoesHumor = document.querySelectorAll("[data-humor]");
const mensagemHumor = document.querySelector("#mensagem-humor");
const botaoRegistrar = document.querySelector("#registrar-dia");
const campoAnotacao = document.querySelector("#anotacao");
const mensagemRegistro = document.querySelector("#mensagem-registro");
const listaRegistros = document.querySelector("#lista-registros");

const resumoHumores = document.querySelector("#resumo-humores");
const graficoHumores = document.querySelector("#grafico-humores");
const seletorMes = document.querySelector("#mes-consulta");
const botaoMesAtual = document.querySelector("#mes-atual");

const CHAVE_REGISTROS = "moodBloomRegistros";

let humorSelecionado = null;


/* =================================
   2. CONFIGURACAO DOS HUMORES
================================= */

const humoresDoGrafico = [
    { nome: "Feliz", emoji: "😊", cor: "#F7C9DF" },
    { nome: "Triste", emoji: "😢", cor: "#B9A0E8" },
    { nome: "Irritado", emoji: "😡", cor: "#F0A6A6" },
    { nome: "Assustado", emoji: "😱", cor: "#F6D69A" },
    { nome: "Ótimo", emoji: "😊", cor: "#C5E7D8" },
    { nome: "Bem", emoji: "🙂", cor: "#E8B7D1" },
    { nome: "Normal", emoji: "😐", cor: "#C8C4F0" },
    { nome: "Mal", emoji: "😔", cor: "#F0B7A8" },
    { nome: "Péssimo", emoji: "😢", cor: "#D7B8E8" }
];


/* =================================
   3. CARREGAR REGISTROS SALVOS
================================= */

function carregarRegistros() {
    const dadosSalvos = localStorage.getItem(CHAVE_REGISTROS);

    if (dadosSalvos === null) {
        return [];
    }

    try {
        const registros = JSON.parse(dadosSalvos);
        return Array.isArray(registros) ? registros : [];
    } catch {
        return [];
    }
}


/* =================================
   4. MOSTRAR OS REGISTROS
================================= */


function mostrarRegistros() {
    const registros = carregarRegistros();

    listaRegistros.replaceChildren();

    if (registros.length === 0) {
        const aviso = document.createElement("p");

        aviso.className = "historico-vazio";
        aviso.textContent = "Seu primeiro registro começa hoje. 💜";

        listaRegistros.appendChild(aviso);
    } else {
        registros.slice().reverse().forEach(function (registro) {
            const cartao = document.createElement("article");
            const titulo = document.createElement("h3");
            const data = document.createElement("p");
            const anotacao = document.createElement("p");

            const humor = humoresDoGrafico.find(function (item) {
                return item.nome === registro.humor;
            });

            const emoji = humor ? humor.emoji : "🌸";

            cartao.className = "cartao-registro";
            titulo.className = "titulo-registro";
            data.className = "data-registro";
            anotacao.className = "anotacao-registro";

            titulo.textContent = emoji + " " + registro.humor;

            const dataRegistro = new Date(registro.data);

            data.textContent = dataRegistro.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });

            anotacao.textContent = registro.anotacao
                ? registro.anotacao
                : "Nenhuma anotação por aqui. 🌷";

            cartao.append(titulo, data, anotacao);
            listaRegistros.appendChild(cartao);
        });
    }

    mostrarResumoMensal();
}



/* =================================
   5. SELECIONAR UM HUMOR
================================= */

botoesHumor.forEach(function (botao) {
    botao.addEventListener("click", function () {
        botoesHumor.forEach(function (outroBotao) {
            outroBotao.classList.remove("humor-selecionado");
        });

        botao.classList.add("humor-selecionado");
        humorSelecionado = botao.dataset.humor;

        mensagemHumor.textContent =
            "Você escolheu: " + humorSelecionado + " 💜";

        mensagemRegistro.textContent = "";
    });
});


/* =================================
   6. SALVAR UM REGISTRO
================================= */

botaoRegistrar.addEventListener("click", function () {
    if (!humorSelecionado) {
        mensagemRegistro.textContent =
            "Escolha um humor antes de registrar. 🌷";
        return;
    }

    const novoRegistro = {
        humor: humorSelecionado,
        anotacao: campoAnotacao.value.trim(),
        data: new Date().toISOString()
    };

    const registros = carregarRegistros();
    registros.push(novoRegistro);

    try {
        localStorage.setItem(
            CHAVE_REGISTROS,
            JSON.stringify(registros)
        );

        campoAnotacao.value = "";
        mensagemRegistro.textContent =
            "Seu dia foi registrado com carinho! 💜";

        mostrarRegistros();
    } catch {
        mensagemRegistro.textContent =
            "Não foi possível salvar. Verifique o armazenamento do navegador.";
    }
});


/* =================================
   7. ESCOLHER O MES
================================= */

function obterMesAtual() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");

    return ano + "-" + mes;
}

seletorMes.value = obterMesAtual();

seletorMes.addEventListener("change", function () {
    mostrarResumoMensal();
});

botaoMesAtual.addEventListener("click", function () {
    seletorMes.value = obterMesAtual();
    mostrarResumoMensal();
});


/* =================================
   8. RESUMO E GRAFICO MENSAL
================================= */

function mostrarResumoMensal() {
    const mesEscolhido = seletorMes.value || obterMesAtual();
    const [anoEscolhido, mesEscolhidoNumero] =
        mesEscolhido.split("-").map(Number);

    const registrosDoMes = carregarRegistros().filter(function (registro) {
        const dataRegistro = new Date(registro.data);

        return (
            dataRegistro.getMonth() + 1 === mesEscolhidoNumero &&
            dataRegistro.getFullYear() === anoEscolhido
        );
    });

    const totais = humoresDoGrafico.map(function (humor) {
        return {
            ...humor,
            quantidade: registrosDoMes.filter(function (registro) {
                return registro.humor === humor.nome;
            }).length
        };
    });

    resumoHumores.replaceChildren();
    graficoHumores.replaceChildren();

    totais.forEach(function (humor) {
        const cartao = document.createElement("div");
        const nome = document.createElement("span");
        const total = document.createElement("strong");

        cartao.className = "resumo-humor";
        nome.textContent = humor.emoji + " " + humor.nome;
        total.textContent = humor.quantidade;

        cartao.append(nome, total);
        resumoHumores.appendChild(cartao);
    });

    const maiorTotal = Math.max(
        1,
        ...totais.map(function (humor) {
            return humor.quantidade;
        })
    );

    if (registrosDoMes.length === 0) {
        const aviso = document.createElement("p");
        aviso.className = "grafico-vazio";
        aviso.textContent =
            "Seus registros deste mês aparecerão aqui. 💜";

        graficoHumores.appendChild(aviso);
        return;
    }

    totais.forEach(function (humor) {
        const coluna = document.createElement("div");
        const valor = document.createElement("span");
        const barra = document.createElement("div");
        const rotulo = document.createElement("span");

        coluna.className = "coluna-grafico";
        valor.className = "valor-grafico";
        barra.className = "barra-grafico";
        rotulo.className = "rotulo-grafico";

        valor.textContent = humor.quantidade;

        barra.style.height =
            (humor.quantidade / maiorTotal * 150) + "px";

        barra.style.backgroundColor = humor.cor;
        barra.setAttribute("aria-hidden", "true");

        rotulo.textContent = humor.emoji + " " + humor.nome;

        coluna.append(valor, barra, rotulo);
        graficoHumores.appendChild(coluna);
    });
}


/* =================================
   9. INICIALIZAR A PAGINA
================================= */

mostrarRegistros();



/*qerySelectorAll -Encontra todos os botões com a etiqueta de humor
addEventListener("click", ...)	- Executa uma ação quando alguém clica.
classList.add() -	Adiciona uma classe visual ao botão escolhido.
dataset.humor	- Lê o humor definido no HTML.
textContent	- Atualiza a mensagem que aparece na página. */