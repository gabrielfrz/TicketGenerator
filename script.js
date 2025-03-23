document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("ticket-form");
    const ticketSection = document.getElementById("ticket");
    const ticketName = document.getElementById("ticket-name");
    const ticketEmail = document.getElementById("ticket-email");
    const ticketPhoto = document.getElementById("ticket-photo");

    

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        // Captura os valores do formulário
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const photoInput = document.getElementById("photo");
        const photoFile = photoInput.files[0];

        // Validações
        if (name === "" || email === "") {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }
        if (photoFile) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!validImageTypes.includes(photoFile.type)) {
                alert("Por favor, envie uma imagem nos formatos JPG, PNG ou GIF.");
                return;
            }
        
            if (photoFile.size > 2 * 1024 * 1024) { // 2MB de limite
                alert("A imagem deve ter no máximo 2MB.");
                return;
            }
        
            const reader = new FileReader();
            reader.onload = function (e) {
                ticketPhoto.src = e.target.result;
            
                ticketSection.classList.remove("hidden");
            };
            
            reader.readAsDataURL(photoFile);
        } else {
            ticketPhoto.src = "";
            ticketSection.classList.remove("hidden");
          // Garante que o ingresso apareça mesmo sem imagem
        }
        

        // Preenche os dados do ingresso
        ticketName.textContent = `Nome: ${name}`;
        ticketEmail.textContent = `E-mail: ${email}`;

        // Exibe a seção do ingresso
        ticketSection.style.display = "block";

    });

    // 🔹 Função corrigida para validar e-mails corretamente
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
});
