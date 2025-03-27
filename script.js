document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-ingresso");
  const inputFoto = document.getElementById("foto");
  const areaUpload = document.getElementById("area-upload");
  const textoUpload = document.getElementById("texto-upload");
  const botaoResetar = document.getElementById("botao-resetar");

  areaUpload.addEventListener("click", () => {
    inputFoto.click();
  });


  inputFoto.addEventListener("change", () => {
    if (inputFoto.files[0]) {
      textoUpload.textContent = inputFoto.files[0].name;
    }
  });


  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = formulario.nome.value.trim();
    const email = formulario.email.value.trim();
    const arquivo = inputFoto.files[0];

    if (!nome || !email) {
      alert("Por favor, preencha nome e e-mail.");
      return;
    }

    if (!validarEmail(email)) {
      alert("E-mail inválido.");
      return;
    }

    if (arquivo && arquivo.size > 500 * 1024) {
      alert("Imagem deve ter no máximo 500KB.");
      return;
    }

    document.getElementById("saida-nome-ingresso").textContent = nome;
    document.getElementById("saida-email-ingresso").textContent = email;
    const fotoIngresso = document.getElementById("ingresso-foto");

    if (arquivo) {
      const leitor = new FileReader();
      leitor.onload = (e) => {
        fotoIngresso.src = e.target.result;
        mostrarIngresso();
      };
      leitor.readAsDataURL(arquivo);
    } else {
      fotoIngresso.src = "https://via.placeholder.com/60";
      mostrarIngresso();
    }
  });


  botaoResetar.addEventListener("click", () => {
    document.getElementById("ingresso").classList.add("escondido");
    document.getElementById("area-reset").classList.add("escondido");
    formulario.reset();
    textoUpload.textContent = "Clique para selecionar uma imagem";
    document.getElementById("ingresso-foto").src = "";
  });

  function validarEmail(email) {
    return email.includes("@") &&
      email.includes(".") &&
      email.indexOf("@") < email.lastIndexOf(".");
  }

  function mostrarIngresso() {
    document.getElementById("ingresso").classList.remove("escondido");
    document.getElementById("area-reset").classList.remove("escondido");
  }
});
