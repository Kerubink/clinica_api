const form = document.getElementById('patient-form');
const tableBody = document.getElementById('patient-table').querySelector('tbody');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    const patient = { name, email, dataNascimento, telefone, endereco };

    const response = await fetch('https://api-prevencao-suicidio-m4.onrender.com/api/paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
    });

    if (response.ok) {
        alert('Paciente adicionado com sucesso!');
        loadPatients(); 
        form.reset(); 
    } else {
        alert('Erro ao adicionar paciente.');
    }
});

async function loadPatients() {
try {
const response = await fetch('https://api-prevencao-suicidio-m4.onrender.com/api/pacientes');
const responseData = await response.json();

console.log('Dados recebidos da API:', responseData);

const patients = responseData.pacientes;

if (Array.isArray(patients)) {
    tableBody.innerHTML = '';
    patients.forEach((patient, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = index + 1;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = patient.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = patient.email;
        row.appendChild(emailCell);

        const dataNascimentoCell = document.createElement('td');
        dataNascimentoCell.textContent = new Date(patient.dataNascimento).toLocaleDateString();
        row.appendChild(dataNascimentoCell);

        const telefoneCell = document.createElement('td');
        telefoneCell.textContent = patient.telefone;
        row.appendChild(telefoneCell);

        const enderecoCell = document.createElement('td');
        enderecoCell.textContent = patient.endereco;
        row.appendChild(enderecoCell);

        tableBody.appendChild(row);
    });
} else {
    console.error('A propriedade "data" não é um array:', patients);
}
} catch (error) {
console.error('Erro ao carregar pacientes:', error);
}
}
window.onload = loadPatients;