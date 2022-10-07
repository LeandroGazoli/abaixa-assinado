window.addEventListener("load", () => countTotalUsers());

document.querySelector("button#btn-submit").addEventListener("click", () => handleSubmit());
const countTotalUsers = async () => {
  const response = await axios.get(
    "https://app.empresasmaggi.com.br/dashboard/parts/funcoes/abaixo-assinado/",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );

  // const response = await axios.get(
  //   "http://painel/dashboard/parts/funcoes/abaixo-assinado/index.php"
  // );

  let total = document.querySelector("#total");

  if (response?.data.length === 1) {
    let html = `1 pessoa já assinou.`;
    total.innerHTML = html;
  }
  if (response?.data.length > 1) {
    let html = `${response?.data.length} pessoas já assinaram.`;
    total.innerHTML = html;
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
      Swal.showLoading();
    },
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  const formData = new FormData(form);

  const response = axios.post(
    "https://app.empresasmaggi.com.br/dashboard/parts/funcoes/abaixo-assinado/cadastrar.php",
    formData,
    {
      headers: {                  
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
        "Content-Type": "application/json;charset=UTF-8"                   
    },
    }
  );

  // const response = await axios.post(
  //   "http://painel/dashboard/parts/funcoes/abaixo-assinado/cadastrar.php",
  //   formData
  // );

  if (response?.status === 200) {
    Swal.fire({
      title: "Cadastro realizado com sucesso",
      icon: "success",
      showConfirmButton: true,
    });
  }
};
