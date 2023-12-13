async function getData() {
    const url = 'http://localhost:4004/users/';

    const response = await fetch(url)

    if (response.ok) {
        const alunos = await response.json();
        verAlunos(alunos);
    } else {
        const error = await response.text();
        console.log('ERRO: ', error);
    }
}

async function postData() {

    let body = extractData('post');

    if (!body.nome || !body.idade)
        if (body.nome && !body.idade)
            return alert('IDADE INVÁLIDA')
        else
            return alert('DADOS INCOMPLETOS');

    const url = 'http://localhost:4004/users/';

    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
        requestResult(await response.json(), 'post');
    } catch (e) {
        console.log('DEU ERRO, CATCH SEPARATE')
        errorApi('post', e);
    }
}

async function putData() {
    let body = extractData('put', true);

    if (!body.id)
        return alert('MATRÍCULA NECESSÁRIA');

    if (!verifyCheckBox().nome)
        delete body.nome;
    else if (!body.nome)
        return alert('NOME NECESSÁRIO');

    if (!verifyCheckBox().idade)
        delete body.idade;
    else if (!body.idade)
        return alert('IDADE NECESSÁRIA');

    if (!('nome' in body) && !('idade' in body))
        return alert('DADOS INSUFICIENTES');


    const url = `http://localhost:4004/users/${body.id}`;

    delete body.id;

    try {
        const response = await fetch(url,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
        requestResult(await response.json(), 'put');
    } catch (e) {
        console.log('DEU ERRO, CATCH SEPARATE')
        errorApi('put', e);
    }
}

async function deleteData() {
    let body = extractData('delete', true);

    if(!body.id)
        return alert('MATRÍCULA NECESSÁRIA')

    const url = `http://localhost:4004/users/${body.id}`;

    try {
        const response = await fetch(url,
            {
                method: 'DELETE',
            })
        requestResult(await response.json(), 'delete');
    } catch (e) {
        console.log('DEU ERRO, CATCH SEPARATE')
        errorApi('delete', e);
    }
}

function extractData(method, id = false) {

    if (id && method == 'delete')
        return {
            id: document.querySelector(`.${method}.id`).value
        }

    let ageCheck = /^([1-9]{1,2}|[1-9]{1}0)$/;

    let data = {
        nome: (document.querySelector(`.${method}.name`).value) ? (document.querySelector(`.${method}.name`).value) : null,
        idade: (ageCheck.test(document.querySelector(`.${method}.age`).value)) ? (document.querySelector(`.${method}.age`).value) : null
    }

    if (id)
        data.id = document.querySelector(`.${method}.id`).value;

    return data;
}

function verifyCheckBox(param = undefined) {
    if (param) {
        let checkBox = document.querySelector(`.check.${param}`).checked;

        if (checkBox)
            document.querySelector(`.put.${param}`).disabled = false;
        else
            document.querySelector(`.put.${param}`).disabled = true;
    }

    return {
        nome: document.querySelector(`.check.name`).checked,
        idade: document.querySelector(`.check.age`).checked
    }
}