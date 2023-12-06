const KEY_BD = '@usuariosprojeto' /* criou uma chave */

var listaRegistros = {
    ultimoIdGerado:0,
    usuarios:[]
}

var FILTRO = '' /* pesquisa */


function gravarBD(){ /* gravar banco de dados */
/* deixar salvo no pc */ localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros) ) /* tem a funcao de transformar valores do JS em uma string */
}


function lerBD(){ /* ler o banco de dados */
    const data = localStorage.getItem(KEY_BD) /* vai analisar pra ver se existe alguma coisa gravado */
    if(data){ /* se tiver, vai mostrar oq tem */
        listaRegistros = JSON.parse(data) /* transformou a string em dados */
    }
    desenhar()
}


function pesquisar(value){
    FILTRO = value;
    desenhar()
}


function desenhar(){ /* para mostrar a tabela */
    const tbody = document.getElementById('listaRegistrosBody') /* selecionar o elemento atraves do ID */
    if(tbody){
        var data = listaRegistros.usuarios;
        if(FILTRO.trim()){ /* vai verificar se tem alguma coisa escrita no filtro */
            const expReg = eval(`/${FILTRO.trim().replace(/[^\d\w]+/g,'.*')}/i`) /* expressao regular é um conjunto especifico de caracteres para serem caracteres "palavras" */
            data = data.filter( usuario => {
                return expReg.test( usuario.nome ) || expReg( usuario.status )
            } )
        }
        data = data
            .sort( (a, b) => { /* para ficar em ordem alfabetica */
                return a.nome < b.nome ? -1 : 1
            })

            .map( usuario => { /* vai desenhar a tabela ja com as informacoes novas*/ 
                return `<tr> 
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.funcao}</td>
                        <td>${usuario.curso}</td>
                        <td>${usuario.validade}</td>
                        <td>${usuario.status}</td>
                        <td>
                            <button onclick='vizualizar("cadastro",false,${usuario.id})'>Editar</button>
                            <button class='vermelho' onclick='perguntarSeDeleta(${usuario.id})'>Excluir</button> 
                        </td>
                    </tr>`
            } )
        tbody.innerHTML = data.join('') /* para nao retornar em forma de array e o espaço vazio para nao retornar com virgula */
    }
}


function insertUsuario(nome, funcao, curso, validade, status){ /* inserir novas informaçoes */
    const id = listaRegistros.ultimoIdGerado + 1;
    listaRegistros.ultimoIdGerado = id;
    listaRegistros.usuarios.push({ /* inserir as informacoes desejadas */
        id, nome, funcao, curso, validade, status
    })
    gravarBD() /* toda vez que add um novo usuario, vai salvar */
    desenhar()
    vizualizar('lista')
}


function editUsuario(id, nome, funcao, curso, validade, status){ /* modificar informacoes */
    var usuario = listaRegistros.usuarios.find( usuario => usuario.id == id )
    usuario.nome = nome;
    usuario.funcao = funcao;
    usuario.curso = curso;
    usuario.validade = validade;
    usuario.status = status;
    gravarBD()
    desenhar()
    vizualizar('lista') /* atualiza na hora */
}


function deleteUsuario(id){ /* excluir um usuario */
    listaRegistros.usuarios = listaRegistros.usuarios.filter( usuario => {
        return usuario.id != id 
        
    } )
    gravarBD()
    desenhar()
}


function perguntarSeDeleta(id){ /* para confirmar a exclusao */
    if(confirm('Clique em OK para confirmar a exclusão do ID: '+id+"")){
        deleteUsuario(id)
    }
}


function limparEdicao(){
    document.getElementById('nome').value = ''
    document.getElementById('funcao').value = ''
    document.getElementById('curso').value = ''
    document.getElementById('validade').value = ''
    document.getElementById('status').value = ''
}


function vizualizar(pagina, novo=false, id=null){ /* null = vazio */
    document.body.setAttribute('page',pagina)
    if(pagina === 'cadastro'){
        if(novo) limparEdicao() /* se for verdadeiro, vai limpar a edicao */
        if(id){
            const usuario = listaRegistros.usuarios.find( usuario => usuario.id == id ) /* vai buscar o usuarip que tenha o mesmo ID que foi informado */
            if(usuario){
                document.getElementById('id').value = usuario.id
                document.getElementById('nome').value = usuario.nome
                document.getElementById('funcao').value = usuario.funcao
                document.getElementById('curso').value = usuario.curso
                document.getElementById('validade').value = usuario.validade
                document.getElementById('status').value = usuario.status;

            }
        }
        document.getElementById('nome').focus() /* serve para focar quando selecionar o elemento */
        document.getElementById('funcao').focus()
        document.getElementById('curso').focus()
        document.getElementById('validade').focus()
        document.getElementById('status').focus()
    }
}


function submit(e){
    e.preventDefault() /* evita que quando estiver na aba edicao, a pagina nao recarregue e perca as informacoes ja colocadas */
    const data = { /* vai ficar salvo no proprio pc */
        id: document.getElementById('id').value,
        nome: document.getElementById('nome').value,
        funcao: document.getElementById('funcao').value,
        curso: document.getElementById('curso').value,
        validade: document.getElementById('validade').value,
        status: document.getElementById('status').value,
    }
    if(data.id){ /* vai verificar se tem algum ID */
        editUsuario(data.id, data.nome, data.funcao, data.curso, data.validade, data.status) /* se existir, edite o usuario */
    }else{ /* se nao existir, crie um novo usuario */
        insertUsuario( data.nome, data.funcao, data.curso, data.validade, data.status)
    }
}


window.addEventListener('load', () => { /* addEventListener serve pra criar uma funcao para quando um evento especifico acontece (tipo quando passar o mouse por cima) */
    lerBD()
    document.getElementById('cadastroRegistro').addEventListener('submit', submit)
    document.getElementById('inputPesquisa').addEventListener('keyup', e => {
        pesquisar(e.target.value)
    })

})