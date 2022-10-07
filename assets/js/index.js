window.addEventListener('load', () => countTotalUsers());

const countTotalUsers = async () => {
  // const response = await axios.get('https://app.empresasmaggi.com.br/dashboard/parts/funcoes/abaixo-assinado/')

  const response = await axios.get('http://painel/dashboard/parts/funcoes/abaixo-assinado/index.php')

  if(response?.data.length === 0){
    console.log('nenhum cadastro');
  }
  if(response?.data.length === 1 ){
    console.log('1 pessoa cadastrou');
  }
  if(response?.data.length > 1){
    console.log(`${response?.data.length} pessoas cadastraram`);
  }
}

const handleSubmit = async () => {
  const form = document.querySelector('#formularioCadastros');

  const formData = new FormData(form);

  // const response = axios.post('https://app.empresasmaggi.com.br/dashboard/parts/funcoes/abaixo-assinado/cadastrar.php')

  const response = axios.post('http://painel/dashboard/parts/funcoes/abaixo-assinado/cadastrar.php')

  console.log(response)
}