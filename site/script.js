let carros = JSON.parse(localStorage.getItem("carros")) || []; // pega as informações guardadas no localStorage (não perder os dados mesmo reiniciando a página). Se não tiver nada, carros[] só vai ficar vazio sem exibir erro.

document.addEventListener("DOMContentLoaded", listarCarros); // faz com que o script só rode após o carregamento do HTML.


function registrarCarro() { // Usei o trim pra excluir espaços antes e depois das palavras com excessão do meio
    let nome = document.getElementById("nomeCarro").value.trim();
    let ano = parseInt(document.getElementById("anoCarro").value)

    if (!nome) {
        alert("O nome do carro não pode estar vazio.");
        return;
    }

    if (carros.some(carro => carro.nome.toLowerCase() === nome.toLowerCase())) { // pra impedir de ter registro de nome duplicado
        alert("Este carro já foi registrado.");
        return;
    }

    nome = capitalizarNome(nome); // exibe as primeiras letras como maiúsc


    if ( nome && ano >= 1970 && ano <=2025) {
        carros.push({ nome: nome, ano: ano });
        salvarNoLocalStorage();
        alert(`${nome} (${ano}) adicionado!`)
        

        document.getElementById("nomeCarro").value = "";
        document.getElementById("anoCarro").value = "";

        listarCarros()
    } else {
        alert("Preencha corretamente.")
    }
}

function listarCarros() {
    let lista = document.getElementById("listaCarros");
    lista.innerHTML = "";

    let carrosOrdenados = [...carros].sort((a, b) => b.ano - a.ano); // pra ordenar por ordem de ano



    if (carrosOrdenados.length === 0) {
        lista.innerHTML = "Não há carros registrados."
    } else {
        carrosOrdenados.forEach((carro, index) => {
            let item = document.createElement("li");
            item.innerHTML = `
                ${index + 1} - ${carro.nome} (${carro.ano}) 
                <button class = "removerCarro" onclick="removerCarro(${index})">❌</button>
            `;
            lista.appendChild(item);
        });
    }
}

function renovarAno() {
    let id = parseInt(document.getElementById("idCarro").value) - 1
    let novoAno = parseInt(document.getElementById("novoAno").value)

    if (id >= 0 && id < carros.length && novoAno > carros[id].ano && novoAno <= 2025) {
        carros[id].ano = novoAno;
        salvarNoLocalStorage();
        alert("Ano atualizado!");
        listarCarros();
    } else {
        alert("Ano inválido ou ID incorreto.")
    }

}

function limparRegistro() {

    if (confirm("Tem certeza que deseja limpar o registro?")) {
        carros = []
        salvarNoLocalStorage();
        listarCarros();
        alert("Sistema reiniciado.")

        

        limparInputs("nomeCarro", "anoCarro", "idCarro", "novoAno");
        
    }

}
function salvarNoLocalStorage() {
    localStorage.setItem("carros", JSON.stringify(carros)); // converte o array em string json que é como pode ser guardado no localStorage
}

function filtrarCarros() {
    let filtro = document.getElementById("pesquisaCarro").value.toLowerCase();
    let lista = document.getElementById("listaCarros");
    lista.innerHTML = "";

    let carrosFiltrados = carros
        .filter(carro => carro.nome.toLowerCase().includes(filtro))
        .sort((a, b) => b.ano - a.ano);

    if (carrosFiltrados.length === 0) {
        lista.innerHTML = "Nenhum carro encontrado.";
    } else {
        carrosFiltrados.forEach((carro, index) => {
            let item = document.createElement("li");
            item.textContent = `${index + 1} - ${carro.nome} (${carro.ano})`;
            lista.appendChild(item);
        });
    }
}

function limparInputs(...ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}

function removerCarro(index) {
    if (confirm(`Tem certeza que deseja remover ${carros[index].nome}?`)) {
        carros.splice(index, 1);
        salvarNoLocalStorage();
        listarCarros();
    }
}

function capitalizarNome(nome) {
    return nome
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
        .join(' ');
}