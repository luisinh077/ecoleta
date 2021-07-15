function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

        // função anônima que está retornando valor((res) => {return res.json})
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUfs()

function getCities(event) {
    //const citySelect = document.querySelector("select[name=city]")
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    //Pegando o index dentro do json para mudar dinamicamente o input escondido com o nome em vez do id
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)

        // função anônima que está retornando valor((res) => {return res.json})
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

//Fazendo uma procura dentro do documento pelo select que tem o nome uf
document.querySelector("select[name=uf]")
    // Ouvidor de eventos - fica de olho em tudo e toda ação
    .addEventListener("change", getCities)


// Itens de coleta
// Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // Verificar se tem itens selecionados, se sim
    // Pegar os itens
    const alreadySelected = selectedItems.findIndex(item => {

        return item == itemId

        // const itemFound = item == itemId

        // return itemFound
    })

    // Se já estiver selecionado
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // Se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    // Atualizar o input escondido com os dados selecionados
    collectedItems.value = selectedItems

}