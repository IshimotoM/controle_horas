// ********* CODIGO PARA CADASTRO DE PROJETOS E CONTROLE DE HORAS *********

// Verificar se o usuario deseja cadastrar um novo projeto ou alterar um existente;
// IF (Criar === true) liberar pagina de cadastro - (Nome, data de inicio, prazo de entrega, cliente ou pessoal, linguagem);
// IF (Alterar === true) perguntar qual projeto gostaria de alterar e depois liberar area para adicionar os novos horarios;
// Cadastrar horario de inicio;
// Cadastrar horario de termino;
// Gerar relatorio (Quantas horas foram gastas no total, qual a media de tempo trabalhado, qual o custo do projeto baseado no valor/hr);


// Declaracao das constantes dos modulos.
const colors = require("colors");
const read = require("readline-sync");
const fs = require("fs");


// Armezamento dos projetos;
const listaDeProjetos = [];

// Funcao para questionamento se quer criar ou alterar um projeto;
/*
function perguntaAcao(){
    const palavraCriar = "'CRIAR'".cyan;
    const palavraAlterar = "'ALTERAR'".cyan;

    const nomeUsuario = read.question("Digite seu nome, usuario: ");
    console.log(`Olá ${nomeUsuario}, o que gostaria de fazer hoje?`);
    console.log(`Digite ${palavraCriar} para criar um novo projeto OU ${palavraAlterar} para alterar um projeto existente.`);
    let respostaUsuario = read.question("Digite sua opção: ").toLowerCase();
    
    if (respostaUsuario === "criar"){
        cadastraNovoProjeto();
    } else {
        console.log("Qual projeto quer alterar?")
        for (let i = 0; i < listaDeProjetos.length; i++){
            console.log(listaDeProjetos[i].titulo);
        };
        alteraProjeto()
    };
};
*/

// Funcao para cadastro de novo projeto;
function cadastraNovoProjeto(){
    const novoProjeto = {
        id: listaDeProjetos.length,
        titulo: read.question("Digite o titulo do projeto: ").toLowerCase(),
        dataInicio: read.question("Digite a data de inicio do projeto (Ex: Dia/Mes/Ano): "),
        prazoEntrega: read.question("Digite o prazo de entrega do projeto (Ex: Dia/Mes/Ano): "),
        cliente: read.question("Digite o nome do cliente (se for um projeto pessoal, digite 'Pessoal'): ").toLowerCase(),
        linguagem: read.question("Digite a linguagem que sera utilizada: ").toLowerCase(),
        horariosStart: [],
        horariosStop: [],
    };

    listaDeProjetos.push(novoProjeto);
    
    criaArquivoLista();
};

// Funcao para adicionar os horarios de inicio e termino de um projeto;
function adicionaHorarios(){
    console.log("Qual projeto quer alterar?")
    for (let i = 0; i < listaDeProjetos.length; i++){
        console.log(listaDeProjetos[i].titulo);
    };
    const projetoSelecionado = read.question("Digite o projeto: ").toLowerCase();
    
    for (let j = 0; j < listaDeProjetos.length; j++){
        if (listaDeProjetos[j].titulo === projetoSelecionado) {
            const horarioStart = read.question("Digite o horario de inicio (Ex: 16:37): ");
            listaDeProjetos[j].horariosStart.push(horarioStart);
            const horarioStop = read.question("Digite o horario de termino (Ex: 19:26): ");
            listaDeProjetos[j].horariosStop.push(horarioStop);
        };
    };
    criaArquivoLista();
};

function leituraArquivoLista(){
    const leituraLista = fs.readFileSync("./lista-projetos.json", {encoding: "utf-8"});
    const leituraListaObj = JSON.parse(leituraLista);
    return leituraListaObj;
};

function criaArquivoLista(){
    fs.writeFileSync("./lista-projetos.json", JSON.stringify(listaDeProjetos), {encoding: "utf-8"});
}

//perguntaAcao();
cadastraNovoProjeto();
cadastraNovoProjeto();
adicionaHorarios();
adicionaHorarios();
adicionaHorarios();
console.log(leituraArquivoLista());
