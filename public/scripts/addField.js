// Procurar o botao
document.querySelector('#add-time').addEventListener('click', cloneField);
// Quando clilcar no botao

// Execute uma ação
function cloneField(){

    // Duplicar os campos. Que campos?
    const newFieldConteiner = document.querySelector('.schedule-item').cloneNode(true);
    
    // Pegar os campos. Que campos?
    const fields = newFieldConteiner.querySelectorAll('input');

    // Para cada campo, limpar
    fields.forEach(function(field){
        // Pegar o field do momento
        field.value = "";
    });
    
    //  Colocar na página. onde??
    document.querySelector('#schedule-item').appendChild(newFieldConteiner);

}