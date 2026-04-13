document.addEventListener("DOMContentLoaded", () => {

  /* ===================
     ANIMAÇÃO AO SCROLL
  ====================== */
  const elementos = document.querySelectorAll('.animation');

  if (elementos.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ativo');
        }
      });
    }, {
      threshold: 0.3
    });

    elementos.forEach(el => observer.observe(el));
  }


  /* ========================
     ANTES E DEPOIS (SLIDER)
  =========================== */

  const sliders = document.querySelectorAll('.before-after');

  sliders.forEach(slider => {
    const afterImg = slider.querySelector('.img-after');
    const line = slider.querySelector('.slider-line');
    const handle = slider.querySelector('.slider-handle');

    let isDragging = false;

    const move = (x) => {
      const rect = slider.getBoundingClientRect();
      let position = x - rect.left;

      if (position < 0) position = 0;
      if (position > rect.width) position = rect.width;

      const percent = (position / rect.width) * 100;

      afterImg.style.clipPath = `inset(0 0 0 ${percent}%)`;;
      line.style.left = percent + "%";
      handle.style.left = percent + "%";
    };

    slider.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (isDragging) move(e.clientX);
    });

    slider.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (isDragging) move(e.touches[0].clientX);
    });
  });


  /* ==========================
     CAROUSEL (EFEITO NETFLIX)
  ============================= */

  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  let index = 0;
  const cardWidth = 380; // largura + gap

  nextBtn.addEventListener('click', () => {
    index++;
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    // LOOP
    if (index >= track.children.length - 3) {
      setTimeout(() => {
        track.appendChild(track.children[0]);
        track.style.transition = "none";
        track.style.transform = `translateX(-${(index - 1) * cardWidth}px)`;
        index--;
        setTimeout(() => {
          track.style.transition = "transform 0.5s ease";
        });
      }, 500);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }
  });

});

/* ===============================
    FORMULÁRIO (PEDIR ORÇAMENTO)  
================================== */

// efeito focus automático no clicar na label
document.querySelectorAll('.form-group label').forEach(label => {
  label.addEventListener('click', () => {
    label.previousElementSibling.focus();
  });
});

const form = document.querySelector('.form-orcamento');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = form.querySelector('input[type="text"]').value;
  const contacto = form.querySelectorAll('input[type="text"]')[1].value;
  const email = form.querySelector('input[type="email"]').value;
  const servico = form.querySelector('select').value;
  const mensagem = form.querySelector('textarea').value;

  const texto = `Olá, gostaria de pedir um orçamento:%0A%0A
                Nome: ${nome}%0A
                Contacto: ${contacto}%0A
                Email: ${email}%0A
                Serviço: ${servico}%0A
                Mensagem: ${mensagem}`;

  const numero = "351963457815"; // 👉 mete aqui o número da Telma

  const url = `https://wa.me/${numero}?text=${texto}`;

  window.open(url, '_blank');
});