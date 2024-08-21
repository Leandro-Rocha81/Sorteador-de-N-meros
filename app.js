exibirTextoNaTela()

function exibirTextoNaTela() {
    exibirTextoTela('label', 'Nenhum número sorteado até o momento');
}

function exibirTextoTela(tag, texto) {
    let campo = document.getElementById('resultado').querySelector(tag);
    campo.innerHTML = texto;
}

function exibirResultadoErrado(tag, texto) {
    let campo = document.getElementById('resultado').querySelector(tag);
    campo.innerHTML = texto;
}

function sortear() {
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);
    let mensagemValoresInvalidos = 'Insira valores válidos';
    
    if (isNaN(quantidade) || isNaN(de) || isNaN(ate) || quantidade <= 0 || de > ate) {
        exibirResultadoErrado('label', mensagemValoresInvalidos);
        return;
    }
    
    let numerosSorteados = [];
    
    for (let i = 0; i < quantidade; i++) {
        let numero = obterNumeroAleatorio(de, ate);
        
        while(numerosSorteados.includes(numero)){
            numero = obterNumeroAleatorio(de, ate);
        }
        
        numerosSorteados.push(numero);
    } 

    exibirResultadoErrado('label', `Os números sorteados são: ${numerosSorteados.join(', ')}.`);
    alterarStatusBotao()
}

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function limparCampo() {
    quantidade.value = ' ';
    de.value = ' ';
    ate.value = ' ';
    exibirTextoNaTela()
}

function alterarStatusBotao() {
    let botaoReiniciar = document.getElementById('btn-reiniciar');
    let botaoSortear = document.getElementById('btn-sortear');
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

function reiniciar() {
    limparCampo();
    exibirTextoNaTela();
    alterarStatusBotao();
}