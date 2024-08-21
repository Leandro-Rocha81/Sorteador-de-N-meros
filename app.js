// Chama a função exibirTextoNaTela() ao carregar o script
exibirTextoNaTela();

// Função que exibe a mensagem inicial no campo de resultado
function exibirTextoNaTela() {
    exibirTextoTela('label', 'Nenhum número sorteado até o momento');
}

// Função auxiliar para exibir um texto em uma tag específica dentro do campo de resultado
function exibirTextoTela(tag, texto) {
    let campo = document.getElementById('resultado').querySelector(tag);
    campo.innerHTML = texto; // Define o conteúdo da tag como o texto fornecido
}

// Função para exibir uma mensagem de erro ou resultado no campo de resultado
function exibirResultadoErrado(tag, texto) {
    let campo = document.getElementById('resultado').querySelector(tag);
    campo.innerHTML = texto; // Define o conteúdo da tag como o texto fornecido
}

// Função principal que realiza o sorteio dos números
function sortear() {
    let quantidade = parseInt(document.getElementById('quantidade').value); // Obtém o valor do campo de quantidade
    let de = parseInt(document.getElementById('de').value); // Obtém o valor do campo "de"
    let ate = parseInt(document.getElementById('ate').value); // Obtém o valor do campo "até"
    let mensagemValoresInvalidos = 'Insira valores válidos'; // Mensagem padrão para valores inválidos
    
    // Verifica se os valores inseridos são válidos
    if (isNaN(quantidade) || isNaN(de) || isNaN(ate) || quantidade <= 0 || de > ate) {
        exibirResultadoErrado('label', mensagemValoresInvalidos); // Exibe mensagem de erro
        return;
    }
    
    let numerosSorteados = []; // Array para armazenar os números sorteados
    
    // Loop para sortear a quantidade de números definida
    for (let i = 0; i < quantidade; i++) {
        let numero = obterNumeroAleatorio(de, ate); // Sorteia um número aleatório
        
        // Verifica se o número já foi sorteado e, se sim, sorteia novamente até obter um número único
        while(numerosSorteados.includes(numero)){
            numero = obterNumeroAleatorio(de, ate);
        }
        
        numerosSorteados.push(numero); // Adiciona o número sorteado ao array
    } 

    // Exibe os números sorteados no campo de resultado
    exibirResultadoErrado('label', `Os números sorteados são: ${numerosSorteados.join(', ')}.`);
    alterarStatusBotao(); // Altera o estado dos botões após o sorteio
}

// Função para obter um número aleatório entre o mínimo e o máximo fornecidos
function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Retorna um número aleatório dentro do intervalo
}

// Função para limpar os campos de entrada e resetar o campo de resultado
function limparCampo() {
    quantidade.value = ' '; // Limpa o campo de quantidade
    de.value = ' '; // Limpa o campo "de"
    ate.value = ' '; // Limpa o campo "até"
    exibirTextoNaTela(); // Exibe a mensagem inicial novamente
}

// Função que altera o status dos botões (Sortear e Reiniciar) alternando entre habilitado e desabilitado
function alterarStatusBotao() {
    let botaoReiniciar = document.getElementById('btn-reiniciar');
    let botaoSortear = document.getElementById('btn-sortear');
    
    // Verifica o estado atual dos botões e alterna as classes CSS correspondentes
    if(botaoReiniciar.classList.contains('container__botao-desabilitado') || botaoSortear.classList.contains('container__botao')){
        botaoSortear.classList.remove('container__botao');
        botaoSortear.classList.add('container__botao-desabilitado');
        botaoReiniciar.classList.remove('container__botao-desabilitado');
        botaoReiniciar.classList.add('container__botao');
    } else {
        botaoSortear.classList.remove('container__botao-desabilitado');
        botaoSortear.classList.add('container__botao');
        botaoReiniciar.classList.remove('container__botao');
        botaoReiniciar.classList.add('container__botao-desabilitado');    
    }
}

// Função para reiniciar o sorteio, limpando os campos e resetando os botões
function reiniciar() {
    limparCampo(); // Limpa os campos de entrada
    exibirTextoNaTela(); // Exibe a mensagem inicial novamente
    alterarStatusBotao(); // Reseta o estado dos botões
}