window.addEventListener("load", () => countTotalUsers());

document.querySelector("button#btn-submit").addEventListener("click", () => handleSubmit());
const countTotalUsers = async () => {
  // await fetch("https://app.empresasmaggi.com.br/abaixo-assinado/", {
  //   headers: {
  //     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  //   },
  //   mode: 'cors'
  // });

  // const response = await axios.get("https://app.empresasmaggi.com.br/abaixo-assinado/", {
  //   mode: "no-cors",
  //   crossDomain: true,
  // });

  const response = await axios.default.get("https://source.empresasmaggi.com.br/api/cadastros");

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

  const response = await axios.default.post("https://source.empresasmaggi.com.br/api/cadastros", formData);

  // const response = await axios.post(
  //   "http://painel/dashboard/parts/funcoes/abaixo-assinado/cadastrar.php",
  //   formData
  // );

  console.log(response);

  if (response?.status === 200) {
    Swal.fire({
      title: "Cadastro realizado com sucesso",
      icon: "success",
      showConfirmButton: true,
    });
  } else {
    Swal.fire({
      text: "No momento não foi possível fazer o cadastro tente novamete em alguns minutos.",
      icon: 'error',
      showConfirmButton: true
    })
  }
};
