window.addEventListener("load", () => countTotalUsers());

document.querySelector("button#btn-submit").addEventListener("click", () => handleSubmit());

const countTotalUsers = async () => {
  // const response = await axios.get('https://app.empresasmaggi.com.br/dashboard/parts/funcoes/abaixo-assinado/')

  const response = await axios.get(
    "http://painel/dashboard/parts/funcoes/abaixo-assinado/index.php"
  );

  if (response?.data.length === 0) {
    console.log("nenhum cadastro");
  }
  if (response?.data.length === 1) {
    console.log("1 pessoa cadastrou");
  }
  if (response?.data.length > 1) {
    console.log(`${response?.data.length} pessoas cadastraram`);
  }
};

const handleSubmit = async () => {
  event.preventDefault();
  const form = document.querySelector("#formularioCadastros");
  form.classList.add("was-validated");

  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  Swal.fire({
    title: "Salvando seu cadastro aguarde",
    icon: "info",
    didOpen: () => {
      Swal.showLoading()
    },
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  const formData = new FormData(form);

  // const response = axios.post('https://app.empresasmaggi.com.br/dashboard/parts/funcoes/abaixo-assinado/cadastrar.php')

  const response = await axios.post(
    "http://painel/dashboard/parts/funcoes/abaixo-assinado/cadastrar.php",
    formData
  );

    if(response?.status === 200){
      Swal.fire({
        title: 'Cadastro realizado com sucesso',
        icon: 'success',
        showConfirmButton: true
      })
    }

};
