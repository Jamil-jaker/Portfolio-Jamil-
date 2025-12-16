// Cargar año dinámico en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Click en enlaces cierra menú en móvil
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
  }
});

// Cargar proyectos desde JSON
async function loadProjects() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    const container = document.getElementById("projects-container");
    container.innerHTML = "";

    data.proyectos.forEach((proyecto) => {
      const card = document.createElement("article");
      card.className = "project-card";

      card.innerHTML = `
        <span class="project-pill">${proyecto.tipo}</span>
        <h3>${proyecto.nombre}</h3>
        <p class="project-meta">${proyecto.descripcion}</p>
        <div class="project-tags">
          ${proyecto.tecnologias
            .map((t) => `<span>${t}</span>`)
            .join("")}
        </div>
        <p class="project-learned"><strong>Aprendizaje / objetivo:</strong> ${proyecto.aprendizaje}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando proyectos:", error);
  }
}

loadProjects();

// Manejo del formulario (simulado)
function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById("form-status");
  status.style.color = "#38bdf8";
  status.textContent =
    "Gracias por tu mensaje. Tu consulta se ha registrado correctamente (simulación).";
  e.target.reset();
}
