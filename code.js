var todosPaises = [];
var todosPaisesDiv = document.getElementById('listaPaises'); // Use o ID correto para a lista de países
var total = document.getElementById('qtPaises'); // Use o ID correto para a contagem de países

async function consultarPaises() {
    try {
        const resposta = await fetch("https://restcountries.com/v3.1/all");
        const dados = await resposta.json();
        todosPaises = dados; // Armazena todos os países na variável global

        mostrarPaises(todosPaises);

        // Adiciona o evento de entrada para o campo de busca
        document.getElementById('campoBusca').addEventListener('input', () => {
            pesquisarPais(document.getElementById('campoBusca'));
        });

        // Adiciona eventos para os filtros de continente
        const filtros = document.querySelectorAll('input[name="filtros"]');
        filtros.forEach(filtro => {
            filtro.addEventListener('change', () => {
                listarPaisesPeloFiltro(filtro);
            });
        });

    } catch (error) {
        console.error("Erro ao consultar API de países:", error);
    }
}

function mostrarPaises(paises) {
    todosPaisesDiv.innerHTML = ""; // Limpa o conteúdo anterior
    total.innerHTML = paises.length; // Atualiza o total de países

    paises.forEach(pais => {
        const paisDiv = document.createElement("div");
        paisDiv.classList.add("pais");
        paisDiv.id = pais.cca2; // Identificador único para o país

        paisDiv.innerHTML = `
            <img width="150" src="${pais.flags.png}" alt="Bandeira de ${pais.name.common}" />
            <p>${pais.translations.por.common}</p>
        `;

        // Redireciona para a página de detalhes ao clicar no país
        paisDiv.addEventListener("click", () => {
            window.location.href = `PaginaDetalhes/detalhes.html?code=${pais.cca2}`;
        });
        
        todosPaisesDiv.appendChild(paisDiv);
    });
}


function pesquisarPais(input) {
    const paisBuscado = input.value.toLowerCase();
    const resultaBusca = todosPaises.filter(pais => {
        const nome = pais.translations.por.common.toLowerCase();
        return nome.startsWith(paisBuscado);
    });

    mostrarPaises(resultaBusca);
}

function listarPaisesPeloFiltro(input) {
    const url = input.value !== "todos" ? "region/" + input.value : "all"; // Use 'region/' ou 'all'
    buscarTodosPaises(url);
}

async function buscarTodosPaises(param) {
    const resposta = await fetch("https://restcountries.com/v3.1/" + param);
    const dados = await resposta.json();
    todosPaises = dados;

    mostrarPaises(todosPaises);
}

// Chama a função ao carregar a página
consultarPaises();
