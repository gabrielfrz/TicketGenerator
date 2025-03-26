document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-ingresso");
    const inputFoto = document.getElementById("foto");
    const areaUpload = document.getElementById("area-upload");
    const textoUpload = document.getElementById("texto-upload");
  
    areaUpload.addEventListener("click", (e) => {
      if (e.target.id === "area-upload" || e.target.id === "texto-upload") {
        inputFoto.click();
      }
    });
  
    areaUpload.addEventListener("dragover", (e) => {
      e.preventDefault();
      areaUpload.style.backgroundColor = "#36114d";
    });
  
    areaUpload.addEventListener("dragleave", () => {
      areaUpload.style.backgroundColor = "#1c0235";
    });
  
    areaUpload.addEventListener("drop", (e) => {
      e.preventDefault();
      areaUpload.style.backgroundColor = "#1c0235";
      const arquivo = e.dataTransfer.files[0];
      inputFoto.files = e.dataTransfer.files;
      textoUpload.textContent = arquivo.name;
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
  
      const secaoIngresso = document.getElementById("ingresso");
      const nomeSaida = document.getElementById("saida-nome-ingresso");
      const emailSaida = document.getElementById("saida-email-ingresso");
      const fotoIngresso = document.getElementById("ingresso-foto");
  
      nomeSaida.textContent = nome;
      emailSaida.textContent = email;
  
      if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = (e) => {
          fotoIngresso.src = e.target.result;
          secaoIngresso.classList.remove("escondido");
          document.getElementById("area-reset").classList.remove("escondido");
        };
        leitor.readAsDataURL(arquivo);
      } else {
        fotoIngresso.src = "https://via.placeholder.com/60";
        secaoIngresso.classList.remove("escondido");
        document.getElementById("area-reset").classList.remove("escondido");
      }
    });
  
    const validarEmail = (email) =>
      email.includes("@") &&
      email.includes(".") &&
      email.indexOf("@") < email.lastIndexOf(".");
  });

  const botaoResetar = document.getElementById("botao-resetar");
  
  botaoResetar.addEventListener("click", () => {
    document.getElementById("ingresso").classList.add("escondido");
    document.getElementById("area-reset").classList.add("escondido");
    document.getElementById("formulario-ingresso").reset();
    document.getElementById("texto-upload").textContent = "Arraste e solte ou clique para enviar uma imagem";
    document.getElementById("ingresso-foto").src = "";
  });
  