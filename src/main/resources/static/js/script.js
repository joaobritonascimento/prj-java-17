qtCarrinho = 0;
function addCarrinho(elemento, i) {
    if (elemento.classList.length == 2) {
        qtCarrinho--;
        document.getElementById("qt-produto").innerHTML = qtCarrinho;
        elemento.classList.remove("produto-selecionado");
        lsProduto[i].carrinho = false;
    } else {
        qtCarrinho++;
        document.getElementById("qt-produto").innerHTML = qtCarrinho;
        elemento.classList.add("produto-selecionado");
        p = lsProduto[i];
        p.carrinho = true;
        p.quantidade = 1;
        p.valorParcial = p.valor * p.quantidade;
    }

}

xhttp = new XMLHttpRequest();

function buscarProduto() {
    xhttp.open("GET", "/api/produto/");
    xhttp.send();
    xhttp.onload = function () {
        lsProduto = this.responseText;
        lsProduto = JSON.parse(lsProduto);
        clonarProdutos(lsProduto);
    }
}

function clonarProdutos(lsProduto) {
    txProduto = "";
    i = 0;
    for (produto of lsProduto) {
        // console.log(produto);
        txProduto += `
        <div class="produto" onclick="addCarrinho(this,${i})">
        <img src="${produto.img}" alt="">
        <p class="nome">${produto.nome}</p>
        <p class="valor">R$ ${produto.valor.toFixed(2)}</p>
        </div>
        `;
        produto.carrinho = false;
        i++;
    }
    document.getElementById("lsProduto").innerHTML = txProduto;
}

buscarProduto();

tela = "lsProduto";

function carrinho() {
    tbody = "";
    pedido = "Segue o meu pedido\n";
    i = 0;
    it = 1;
    valorFinal = 0;
    for (p of lsProduto) {
        if (p.carrinho) {
            tbody += `<tr>
            <td>${p.nome}</td>
            <td>${p.valor.toFixed(2)}</td>
            <td>${p.quantidade}</td>
            <td>${p.valorParcial.toFixed(2)}</td>
            <td><span onclick="add(${i},${it},1)">+</span>
                <span onclick="add(${i},${it},-1)">-</span></td>
            </tr>`;
            it++;
            valorFinal += p.valorParcial;
            pedido += `${p.nome} ${p.valor.toFixed(2)} x (${p.quantidade}) = ${p.valorParcial.toFixed(2)} \n`;
        }
        i++;
    }
    tbody += `
        <tr><td colspan="3">Valor Final</td><td>${valorFinal.toFixed(2)}</td></tr>
        `
    pedido += `Valor Final = ${valorFinal.toFixed(2)} \n`
    document.getElementsByTagName("tbody")[0].innerHTML = tbody;

}

function mudarTela() {
    if (tela == "lsProduto") {
        document.getElementById("lsQuantidade").style.display = "block";
        document.getElementById("lsProduto").style.display = "none";
        tela = "lsQuantidade";
    } else {
        document.getElementById("lsQuantidade").style.display = "none";
        document.getElementById("lsProduto").style.display = "block";
        tela = "lsProduto";
    }
}

function add(i, it, opc) {
    p = lsProduto[i];
    p.quantidade = p.quantidade + opc;
    p.valorParcial = p.quantidade * p.valor;
    if (p.quantidade == 0) {
        p.carrinho = false;
        elemento = document.getElementsByClassName("produto")[i];
        addCarrinho(elemento, i)
    }
    carrinho();
    // tr = document.getElementsByTagName("tr")[it];
    // tr.getElementsByTagName("td")[2].innerHTML = p.quantidade;
    // tr.getElementsByTagName("td")[3].innerHTML = p.valorParcial;
}

function enviarWhatsApp() {


    //fone = "5561985600361";

    nome = document.getElementById("nome").value;
    fone = document.getElementById("fone").value;

    if (nome == '') {
        alert("Nome obrigatório");
        return false;
    }

    if (qtCarrinho == 0) {
        alert("Escolha 1 produto");
        return false;
    }

    pedido += `Cliente: ${nome}`;
    pedido = encodeURI(pedido);
    link = `https://api.whatsapp.com/send?phone=${fone}&text=${pedido}`;
    window.open(link, '_blank');
}