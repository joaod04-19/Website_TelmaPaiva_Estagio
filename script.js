document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
        ANTES E DEPOIS (SLIDER)
    ============================= */
    const sliders = document.querySelectorAll('.before-after-card');

    sliders.forEach(slider => {
        const afterImg = slider.querySelector('.image-after');
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


    /* ============================
        CARROSEL (EFEITO NETFLIX)
    =============================== */
    const track = document.querySelector('.before-after-track');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (track && nextBtn && prevBtn) {

        let index = 0;
        const cardWidth = 380;

        nextBtn.addEventListener('click', () => {

            index++;
            track.style.transform = `translateX(-${index * cardWidth}px)`;

            if (index >= track.children.length - 3) {

                setTimeout(() => {

                    track.appendChild(track.children[0]);

                    track.style.transition = "none";
                    track.style.transform =
                        `translateX(-${(index - 1) * cardWidth}px)`;

                    index--;

                    setTimeout(() => {
                        track.style.transition =
                            "transform 0.5s ease";
                    });

                }, 500);
            }

        });

        prevBtn.addEventListener('click', () => {

            if (index > 0) {
                index--;
                track.style.transform =
                    `translateX(-${index * cardWidth}px)`;
            }

        });

    }

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

const form = document.querySelector('.form-budget');

if (form) {

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        const nome = form.querySelector('input[name="name"]').value;
        const contacto = form.querySelector('input[name="contact"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const distrito = form.querySelector('input[name="district"]').value;
        const concelho = form.querySelector('input[name="council"]').value;
        const servico = form.querySelector('select[name="service"]').value;
        const mensagem = form.querySelector('textarea[name="mensage"]').value;

        const texto =
            `Olá, gostaria de pedir um orçamento:

                Nome: ${nome}
                Contacto: ${contacto}
                Email: ${email}

                Distrito: ${distrito}
                Concelho: ${concelho}

                Serviço: ${servico}

                Mensagem: ${mensagem}`;

        const numero = "351963457815";

        const url =
            `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

        window.open(url, '_blank');

    });

}