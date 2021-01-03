let pedidos = []

const loadPedidos = function(){
    const pedidosJSON = sessionStorage.getItem('pedidos')
    
    if(pedidosJSON !== null){
        return JSON.parse(pedidosJSON)
    } else {
        return []
    }
}

const savePedidos = function(){
    sessionStorage.setItem('pedidos', JSON.stringify(pedidos))
}

const apagaTemp = function(){
    sessionStorage.removeItem('temp')
}
 
pedidos = loadPedidos()

const tempJSON = sessionStorage.getItem('temp')
const novarr = JSON.parse(tempJSON)
console.log(novarr)

//mostra o nome do pedido na pagina
const mostraNomeDoPedido = document.querySelector('#nomePedido')
mostraNomeDoPedido.textContent = novarr[0].prodt

//mostra a imagem do pedido na pagina
const imagemApresentacao = document.querySelector('#imagemApr')
imagemApresentacao.setAttribute('src', `/products/${novarr[0].img}/image`)

//pega o q foi digitado em obs
const pegaObs = document.querySelector('#insereObs')

//botao que esta na page
const botaoConfirmaInsere = document.querySelector('#confirmaInsere')

if(novarr[0].prodt === 'Batata Frita Gourmet'){
    const txtmolho = document.querySelector('#textoMolho')
    txtmolho.setAttribute('style', 'display:none;')

    const txtValor = document.querySelector('#textoValor')
    txtValor.setAttribute('style', 'display:none;')

    const lstMolho = document.querySelector('#listaMolho')
    lstMolho.setAttribute('style', 'display:none;')

    const showBatata = document.querySelector('#infoBatata')
    showBatata.removeAttribute('style')
}

if(novarr[0].prodt === 'Milkshake'){
    const saborMilk = document.querySelector('#secMilk')
    saborMilk.removeAttribute('style', 'display: none;')
}

if(novarr[0].tp === 'suco'){
    const saborJuice = document.querySelector('#secSuco')
    saborJuice.removeAttribute('style', 'display: none;')
}

if(novarr[0].prodt === 'Batata Frita Gourmet - Mista 400g' || novarr[0].prodt === 'Rolinho de Macaxeira Crocante' || novarr[0].tp === 'milkshake' || novarr[0].tp === 'suco'){
    const txtmolho = document.querySelector('#textoMolho')
    txtmolho.setAttribute('style', 'display:none;')

    const txtValor = document.querySelector('#textoValor')
    txtValor.setAttribute('style', 'display:none;')

    const lstMolho = document.querySelector('#listaMolho')
    lstMolho.setAttribute('style', 'display:none;')
}

if(novarr[0].prodt === 'Rolinhos Primavera'){
    const saborRolinn = document.querySelector('#secRolinho')
    saborRolinn.removeAttribute('style', 'display: none;')
}

if(novarr[0].tp === 'crepes'){
    const saborLata = document.querySelector('#secLata')
    saborLata.removeAttribute('style', 'display: none;')
}

botaoConfirmaInsere.addEventListener('click', (e) => {
    e.preventDefault()    
    let boxes = document.querySelectorAll('.checado')
    let rs = ''

    for(let i = 0; i < boxes.length; i++){
        if(boxes[i].checked === true){
            rs += boxes[i].value + ", "
        }
    }

    let counter = document.querySelectorAll('input[type=checkbox]:checked').length

    //batata
    
    const porcaoBatata350g = document.querySelector('#portion350g')
    const saborCalab = document.querySelector('#saborCal')

    //milkshake
    const sabormor = document.querySelector('#saborMorango')
    const saboresco = document.querySelector('#saborChoresco') 
    const sabortine = document.querySelector('#saborTine')
    
    //suco
    // const saborGoi = document.querySelector('#saborGoiaba')
    // const saborCaj = document.querySelector('#saborCaja')
    // const saborMarac = document.querySelector('#saborMaracuja')
    // const saborManga = document.querySelector('#saborManga')
    // const saborTam = document.querySelector('#saborTamarindo')
    // const saborA = document.querySelector('#saborAbac')

    //sabor rolinhos primavera
    const saborCatu = document.querySelector('#saborCatupiry')

    //opcao bebida lata
    const saborCoca = document.querySelector('#saborCoca')

    if(novarr[0].tp === 'crepes'){
        if(saborCoca.checked){
            pedidos.push({
                qtd: novarr[0].qt, 
                product: novarr[0].prodt + ' Bebida: Coca cola lata' + ' Obs: ' + pegaObs.value,
                obs: ' Obs: ' + pegaObs.value,
                price: novarr[0].price, 
                categoria: novarr[0].tp,
                subt: novarr[0].qt * novarr[0].price
            })
            savePedidos()
            apagaTemp()
            location.assign('/confirma')
        }else{
            pedidos.push({
                qtd: novarr[0].qt, 
                product: novarr[0].prodt + ' Bebida: Fanta lata' + ' Obs: ' + pegaObs.value,
                obs: ' Obs: ' + pegaObs.value,
                price: novarr[0].price, 
                categoria: novarr[0].tp,
                subt: novarr[0].qt * novarr[0].price
            })
            savePedidos()
            apagaTemp()
            location.assign('/confirma')
        }
    }
    else{
        if(rs == ""){
            pedidos.push({
                qtd: novarr[0].qt, 
                product: novarr[0].prodt + ' Obs: ' + pegaObs.value,
                obs: ' Obs: ' + pegaObs.value,
                price: novarr[0].price, 
                categoria: novarr[0].tp,
                subt: novarr[0].qt * novarr[0].price
            })
            savePedidos()
            apagaTemp()
            location.assign('/confirma')
        }else{
            pedidos.push({
                qtd: novarr[0].qt, 
                product: novarr[0].prodt + ' Obs: ' + pegaObs.value + ' - Molhos: ' + rs,
                obs: ' Obs: ' + pegaObs.value,
                molhos: ' - Molhos: ' + rs,
                price: novarr[0].price, 
                categoria: novarr[0].tp,
                subt: novarr[0].qt * novarr[0].price
            })
            savePedidos()
            apagaTemp()
            location.assign('/confirma')
        }
    }

    // else if(gettemp()[0].produto === 'Rolinhos Primavera'){
    //     if(saborCatu.checked){
    //         criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Catupiry Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     }else{
    //         criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Camarão Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     }
    // }else if(gettemp()[0].tipo === 'suco'){
    //     // if(saborGoi.checked){
    //     //     criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Goiaba Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     // }else if(saborCaj.checked){
    //     //     criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Cajá Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     // }else if(saborMarac.checked){
    //     //     criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Maracujá Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     // }else if(saborManga.checked){
    //     //     criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Manga Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     // }else if(saborTam.checked){
    //     //     criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Tamarindo Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     // }else if(saborA.checked){
    //     //     criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Abacaxi c/ Hortelã Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     // }else{
    //     //     criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Pitanga Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     // }
    //     const sucos = document.querySelectorAll('input[name=saborMilkSuquin]:checked')
    //     let sucoEscolhido = ''
    //     for(let i = 0; i < sucos.length; i++){
    //         if(sucos[i].checked === true){
    //             sucoEscolhido += sucos[i].value + ", "
    //         }
    //     }
    //     criaPedidos(novarr[0].qt, novarr[0].prodt + ' '+ sucoEscolhido + ' ' + pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    // }else if(gettemp()[0].produto === 'Milkshake'){
    //     if(sabormor.checked){
    //         criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Morango Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     }else if(saboresco.checked){
    //         criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Milkchoresco Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     }else if(sabortine.checked){
    //         criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Milkmaltine Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     }else{
    //         criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Sabor Milktropical Obs: '+ pegaObs.value, gettemp()[0].preco, gettemp()[0].tipo)
    //     }
    // }else if(gettemp()[0].produto === 'Batata Frita Gourmet'){
    //     const txtmolho = document.querySelector('#textoMolho')
    //     txtmolho.setAttribute('style', 'display:none;')
    
    //     const txtValor = document.querySelector('#textoValor')
    //     txtValor.setAttribute('style', 'display:none;')
    
    //     const lstMolho = document.querySelector('#listaMolho')
    //     lstMolho.setAttribute('style', 'display:none;')
    
    //     const showBatata = document.querySelector('#infoBatata')
    //     showBatata.removeAttribute('style')

    //     if(porcaoBatata350g.checked){
    //         if(saborCalab.checked){
    //             if(rs == ""){
    //                 criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Calabresa 350g Obs: '+ pegaObs.value, 13.99, gettemp()[0].tipo)
    //             }else{
    //                 criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Calabresa 350g Obs: '+ pegaObs.value + ' - Molhos: ' + rs, 13.99 + (counter * 2), gettemp()[0].tipo)
    //             }
    //         }else{
    //             if(rs == ""){
    //                 criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Charque e Cheddar 350g Obs: '+ pegaObs.value, 13.99, gettemp()[0].tipo)
    //             }else{
    //                 criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Charque e Cheddar 350g Obs: '+ pegaObs.value + ' - Molhos: ' + rs, 13.99 + (counter * 2), gettemp()[0].tipo)
    //             }
    //         }
    //     }else{
    //         if(saborCalab.checked){
    //             if(rs == ""){
    //                 criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Calabresa 400g Obs: '+ pegaObs.value, 15.99, gettemp()[0].tipo)
    //             }else{
    //                 criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Calabresa 400g Obs: '+ pegaObs.value + ' - Molhos: ' + rs, 15.99 + (counter * 2), gettemp()[0].tipo)
    //             }
    //         }else{
    //             if(rs == ""){
    //                 criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Charque e Cheddar 400g Obs: '+ pegaObs.value, 15.99, gettemp()[0].tipo)
    //             }else{
    //                 criaPedidos(gettemp()[0].qtd, gettemp()[0].produto + ' Charque e Cheddar 400g Obs: '+ pegaObs.value + ' - Molhos: ' + rs, 15.99 + (counter * 2), gettemp()[0].tipo)
    //             }
    //         }
    //     }
    // }

    location.assign('./confirma')
    
})

