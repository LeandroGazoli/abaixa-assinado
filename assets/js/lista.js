window.addEventListener("load", () => getAllCadastros());
const getAllCadastros = async () => {
  // const response = await axios.get(
  //   "http://painel/dashboard/parts/funcoes/abaixo-assinado/index.php"
  // );

  const response = await axios.get("https://source.empresasmaggi.com.br/api/cadastros");

  const table = document.querySelector("tbody");

  console.log(response);
  if (response?.data.length < 1) {
    table.innerHTML =
      '<td colspan="3" class="text-center bg-light">Nenhum registro encontrado</td>';
  } else {
    let data = response?.data.map((e, index) => {
      return `<tr>
      <th scope="row">${index +1}</th>
      <td>${e.nome}</td>
      <td>${e.numero_cadastro}</td>
      </tr>`;
    });
    table.innerHTML = data.join("");
  }
};
