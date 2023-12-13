const visor = {
    matricula: document.querySelector('.visor.matricula'),
    nome: document.querySelector('.visor.nome'),
    idade: document.querySelector('.visor.idade'),
    status: document.querySelector('.visor.status'),
    m2: document.querySelector('.insideContent.m2'),
    m3: document.querySelector('.insideContent.m3'),
    error: document.querySelector('.par.error')
}

function verifyId(method) {
    let input = document.querySelector(`.${method}.id`);

    if (!input.value) {
        input.style.boxShadow = '0 0 .25vh .25vh rgb(247, 99, 99)'
    }
}

function redirectPage(destination) {
    window.location.href = `${destination}.html`;
}

function requestResult(aluno, method) {

    clearInputData(method);

    visor.matricula.innerHTML = aluno.matricula;
    visor.nome.innerHTML = aluno.nome;
    visor.idade.innerHTML = aluno.idade;
    visor.status.innerHTML = (method == 'delete') ? 'Desligado' : (aluno.status) ? 'Ativo' : 'Desligado';
    visor.m2.style.display = 'block';
    visor.m3.style.display = 'none';
}

function errorApi(method, error) {
    clearInputData(method)

    let verbo = '';

    switch (method) {
        case 'post':
            verbo = 'cadastrar';
            break;
        case 'put':
            verbo = 'delete';
            break;
        case 'delete':
            verbo = 'deletar';
            break;
    }

    visor.m2.style.display = 'none';
    visor.m3.style.display = 'block';
    visor.error.innerHTML = `Error ao ${verbo} aluno: "${error}"`;
}

function clearInputData(method) {
    let input = Array.from(document.getElementsByClassName(method));

    if (method == 'put') {
        document.querySelector('.check.name').checked = false;
        document.querySelector('.check.age').checked = false;
        document.querySelector('.put.name').disabled = 'true';
        document.querySelector('.put.name').disabled = 'true';
    }

    input.forEach(element => {
        element.value = '';
    });
}

function verAlunos(alunos) {

    console.log(alunos[0])

    for (let i = 0; i < alunos.length; i++) {
        if (i == 0) {
            document.querySelector('#id').innerHTML = `<p>${alunos[i].matricula}</p>`;
            document.querySelector('#name').innerHTML = `<p>${alunos[i].nome}</p>`;
            document.querySelector('#age').innerHTML = `<p>${alunos[i].idade}</p>`;
            document.querySelector('#status').innerHTML = (alunos[i].status) ? `<p>Ativo</p>` : `<p>Desligado</p>`;

        } else {
            document.querySelector('#id').innerHTML += `<p>${alunos[i].matricula}</p>`;
            document.querySelector('#name').innerHTML += `<p>${alunos[i].nome}</p>`;
            document.querySelector('#age').innerHTML += `<p>${alunos[i].idade}</p>`;
            document.querySelector('#status').innerHTML += (alunos[i].status) ? `<p>Ativo</p>` : `<p>Desligado</p>`;
        }
    }
}

