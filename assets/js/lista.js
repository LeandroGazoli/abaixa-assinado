window.addEventListener("load", () => getAllCadastros());
const getAllCadastros = async () => {
  // const response = await axios.get(
  //   "http://painel/dashboard/parts/funcoes/abaixo-assinado/index.php"
  // );

  const response = await axios.get(
    "https://app.empresasmaggi.com.br/dashboard/parts/funcoes/abaixo-assinado/index.php"
  );

  const table = document.querySelector("tbody");

  if (response?.data.length === 0) {
    table.innerHTML =
      '<td colspan="3" class="text-center bg-light">Nenhum registro encontrado</td>';
  }
  let data = response?.data.map((e) => {
    return `<tr>
    <th scope="row">${e.id}</th>
    <td>${e.nome}</td>
    <td>${e.numero_cadastro}</td>
    </tr>`;
  });

  table.innerHTML = data.join("");
};
