document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ticket-form");
    const ticketSection = document.getElementById("ticket");
    const ticketName = document.getElementById("ticket-name");
    const ticketEmail = document.getElementById("ticket-email");
    const ticketPhoto = document.getElementById("ticket-photo");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const photoFile = form.photo.files[0];

        if (!name || !email) return alert("Por favor, preencha todos os campos obrigatórios.");
        if (!isValidEmail(email)) return alert("Por favor, insira um e-mail válido.");

        ticketName.textContent = `Nome: ${name}`;
        ticketEmail.textContent = `E-mail: ${email}`;

        if (photoFile) {
            const isValidType = ["image/jpeg", "image/png", "image/gif"].includes(photoFile.type);
            const isValidSize = photoFile.size <= 2 * 1024 * 1024;

            if (!isValidType) return alert("Por favor, envie uma imagem JPG, PNG ou GIF.");
            if (!isValidSize) return alert("A imagem deve ter no máximo 2MB.");

            const reader = new FileReader();
            reader.onload = (e) => {
                ticketPhoto.src = e.target.result;
                ticketSection.classList.remove("hidden");
                ticketSection.style.display = "block";
            };
            reader.readAsDataURL(photoFile);
        } else {
            ticketPhoto.src = "";
            ticketSection.classList.remove("hidden");
            ticketSection.style.display = "block";
        }
    });

    const isValidEmail = (email) => {
        return email.includes("@") && email.includes(".") && email.indexOf("@") < email.lastIndexOf(".");
      };
      
});
