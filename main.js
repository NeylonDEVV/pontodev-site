(function () {
  var cfg = window.PONTO_CONFIG || {};
  var digits = String(cfg.whatsapp || "").replace(/\D/g, "");
  var insta = String(cfg.instagram || "").replace(/^@/, "");

  // Ano no rodapé
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // Canais de contato
  function fmtPhone(d) {
    var m = d.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
    return m ? "(" + m[1] + ") " + m[2] + "-" + m[3] : "+" + d;
  }
  document.querySelectorAll("[data-contact]").forEach(function (a) {
    var type = a.getAttribute("data-contact");
    var label = a.querySelector("span");
    if (type === "email" && cfg.email) {
      a.href = "mailto:" + cfg.email;
      label.textContent = cfg.email;
    } else if (type === "whatsapp" && digits) {
      a.href = "https://wa.me/5561998057228" + digits;
      label.textContent = "WhatsApp: " + fmtPhone(digits);
    } else if (type === "instagram" && insta) {
      a.href = "https://instagram.com/" + insta;
      label.textContent = "@" + insta;
    } else {
      a.href = "#contato";
      a.removeAttribute("target");
    }
  });

  // Menu mobile
  var header = document.getElementById("header");
  var toggle = header.querySelector(".menu-toggle");
  function setMenu(open) {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  toggle.addEventListener("click", function () {
    setMenu(!header.classList.contains("menu-open"));
  });
  header.querySelectorAll(".nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      setMenu(false);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header.classList.contains("menu-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Animação ao rolar
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // Formulário → WhatsApp ou e-mail
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements;
    if (!form.checkValidity()) {
      note.textContent = "Preencha nome, e-mail válido e mensagem.";
      var bad = form.querySelector(":invalid");
      if (bad) bad.focus();
      return;
    }
    var texto =
      "Olá, ponto dev! Vim pelo site.\n\n" +
      "Nome: " +
      f.nome.value +
      "\n" +
      (f.empresa.value ? "Empresa: " + f.empresa.value + "\n" : "") +
      "E-mail: " +
      f.email.value +
      "\n" +
      "Serviço: " +
      f.servico.value +
      "\n\n" +
      f.mensagem.value;

    var useWhats = cfg.formDestino !== "email" && digits;
    if (useWhats) {
      window.open(
        "https://wa.me/" + digits + "?text=" + encodeURIComponent(texto),
        "_blank",
        "noopener",
      );
      note.textContent = "Abrimos o WhatsApp com sua mensagem. É só enviar!";
    } else if (cfg.email) {
      window.location.href =
        "mailto:" +
        cfg.email +
        "?subject=" +
        encodeURIComponent("Novo contato pelo site — " + f.nome.value) +
        "&body=" +
        encodeURIComponent(texto);
      note.textContent = "Abrimos seu app de e-mail com a mensagem pronta.";
    } else {
      note.textContent =
        "Contato ainda não configurado (edite o arquivo config.js).";
    }
  });
})();
