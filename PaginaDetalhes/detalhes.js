async function buscarDetalhesDoPais() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoPais = urlParams.get('code');

    if (codigoPais) {
        try {
            // Faz uma requisição à API em português
            const resposta = await fetch(`https://restcountries.com/v3.1/alpha/${codigoPais}?fullText=true`);
            const dados = await resposta.json();

            // Verifica se há dados e mostra os detalhes
            if (dados && dados.length > 0) {
                mostrarDetalhesDoPais(dados[0]); // O país está na posição 0 do array retornado
            } else {
                console.error("Nenhum dado encontrado para o país.");
            }
        } catch (error) {
            console.error("Erro ao buscar detalhes do país:", error);
        }
    } else {
        console.error("Nenhum código de país encontrado na URL.");
    }
}

// Função para mostrar os detalhes do país na página
function mostrarDetalhesDoPais(pais) {
    // Atualiza a bandeira na div
    document.getElementById('bandeira').src = pais.flags.png;
    document.getElementById('bandeiraEmCima').src = pais.flags.png; // Adicionando a bandeira em cima

    // Atualiza o nome oficial do país
    document.getElementById('nomeOficial').textContent = pais.name.official || "Não disponível";

    // Atualiza a capital, lidando com a possibilidade de não estar disponível
    document.getElementById('capital').textContent = pais.capital ? pais.capital[0] : "Não disponível";

    // Atualiza as línguas faladas no país
    const linguas = pais.languages ? Object.values(pais.languages).join(', ') : "Não disponível";
    document.getElementById('lingua').textContent = linguas;

    // Traduzir a moeda
    const traducaoMoeda = {
        "USD": "Dólar Americano",
        "BRL": "Real Brasileiro",
        "EUR": "Euro",
        "JPY": "Iene Japonês",
        "GBP": "Libra Esterlina",
        // Adicione mais traduções conforme necessário
    };

    // Atualiza a moeda
    const moedaCodigo = pais.currencies ? Object.keys(pais.currencies)[0] : null;
    const moeda = moedaCodigo ? traducaoMoeda[moedaCodigo] || moedaCodigo : "Não disponível";
    document.getElementById('moeda').textContent = moeda;

    // Atualiza a região/continente
    document.getElementById('continente').textContent = pais.region || "Não disponível";

    // Atualiza a população, formatando com separador de milhar
    document.getElementById('populacao').textContent = pais.population ? pais.population.toLocaleString() : "Não disponível";

    // Atualiza a área geográfica
    document.getElementById('area').textContent = pais.area ? `${pais.area.toLocaleString()} km²` : "Não disponível";

    // Cria o link para o Google Maps com as coordenadas
    document.getElementById('mapa').href = `https://www.google.com/maps/place/${pais.latlng[0]},${pais.latlng[1]}`;
}

// Chama a função ao carregar a página
buscarDetalhesDoPais();
