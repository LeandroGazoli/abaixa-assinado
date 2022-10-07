window.addEventListener("load", () => countTotalUsers());

document.querySelector("button#btn-submit").addEventListener("click", () => handleSubmit());
const countTotalUsers = async () => {

  const response = await axios.get("https://source.empresasmaggi.com.br/api/cadastros");

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

  // event.target.disabled = true

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

  const response = await axios.post("https://source.empresasmaggi.com.br/api/cadastros", formData);

  if (response?.status === 200) {
    event.target.disabled = false
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

    event.target.disabled = false
  }
};
