// request via JavaScript ajax 4 passos
// 01 criar a váriavel
xhttp = new XMLHttpRequest();
var lista;
var api = "/api/produto/";

function listar() {
    // 02 definição do nosso request (forma e endereço)
    xhttp.open("GET", api);
    // 03 manda de fato a request
    xhttp.send();
    // 04 execução quando tiver a devolutiva do request
    xhttp.onload = function () {
        lista = this.responseText;
        // console.log(lista);
        lista = JSON.parse(lista);
        // console.log(lista);
        texto = "";
        i = 0;
        for (const u of lista) {
            texto += `<tr onclick='editar(${i})'><td>${u.nome}</td><td>${u.descricao}</td><td>R$ ${u.valor.toFixed(2)}</td></tr>`;
            i++;
        }
        document.getElementById('lista').innerHTML = texto;
    }
}

function editar(i) {
    u = lista[i];
    document.getElementById("nome").value = u.nome;
    document.getElementById("descricao").value = u.descricao;
    document.getElementById("valor").value = u.valor;
    document.getElementById("img").value = u.img;
    document.getElementById("id").value = u.id;
}

function gravar() {
    //alert("Estamos dentro da function incluir");
    var item = {};
    item.nome = document.getElementById("nome").value;
    item.descricao = document.getElementById("descricao").value;
    item.valor = document.getElementById("valor").value;
    item.img = document.getElementById("img").value;
    // console.log(item);

    item.id = document.getElementById("id").value;
    if (item.id > 0) {
        acao = "PUT"; // alteração
    } else {
        acao = "POST"; // incluir
    }

    xhttp.open(acao, api);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(item));
    xhttp.onload = function () {
        // console.log(this.responseText);
        listar();
        limpar();
    }
}

function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("img").value = "";
    document.getElementById("id").value = "";
}

function apagar() {
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        listar();
        limpar();
    }
}
listar();