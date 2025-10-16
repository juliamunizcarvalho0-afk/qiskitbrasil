// ====== PROGRAMAÇÃO (cards que mostram conteúdo abaixo) ======
const dayCards = document.querySelectorAll(".day-card");

dayCards.forEach(card => {
  card.addEventListener("click", () => {
    const day = card.getAttribute("data-day");
    const schedule = document.getElementById(`day-${day}`);
    const isActive = schedule.classList.contains("active");

    // Esconde todos os outros
    document.querySelectorAll(".day-schedule").forEach(s => s.classList.remove("active"));

    // Se não estava ativo, mostra este logo abaixo do card clicado
    if (!isActive) {
      schedule.classList.add("active");
      card.insertAdjacentElement("afterend", schedule);
    }
  });
});


// ====== TIMELINE ======
(function setupTimeline() {
  const timelineIcons = document.querySelectorAll('.timeline-icon');
  if (!timelineIcons.length) return;

  const container = document.querySelector('.timeline-content');
  const panel = document.getElementById('timeline-panel');

  timelineIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = icon.closest('.timeline-item');
      if (!item) return;

      const isAlreadyOpen = item.classList.contains('open');

      // Fecha todos os itens e painel atual
      document.querySelectorAll('.timeline-item.open').forEach(i => i.classList.remove('open'));
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      panel.innerHTML = '';
      container.classList.remove('expanded-line');

      // Se o mesmo ícone foi clicado, só fecha e sai
      if (isAlreadyOpen) return;

      // Caso contrário, abre o painel
      const content = item.querySelector('.timeline-content-item');
      if (content) {
        const clone = content.cloneNode(true);
        clone.classList.add('timeline-panel-content');
        clone.classList.remove('timeline-content-item');
        clone.style.position = 'static';
        clone.style.transform = 'none';
        clone.style.display = 'block';

        panel.appendChild(clone);
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        container.classList.add('expanded-line');
        item.classList.add('open');

        // Scroll suave até o painel
        setTimeout(() => {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
    });
  });

  // Clique fora da timeline fecha o painel
  document.addEventListener('click', (e) => {
    const clickedInside = e.target.closest('.timeline-content') || e.target.closest('#timeline-panel');
    if (!clickedInside) {
      document.querySelectorAll('.timeline-item.open').forEach(i => i.classList.remove('open'));
      if (panel) {
        panel.classList.remove('open');
        panel.innerHTML = '';
        container.classList.remove('expanded-line');
      }
    }
  });
})();


// ====== MENU MOBILE ======
(function setupNav() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });

  window.addEventListener('scroll', function() {
    if (navMenu.classList.contains('open')) navMenu.classList.remove('open');
    if (hamburger.classList.contains('active')) hamburger.classList.remove('active');
  });
})();


// ====== COUNTDOWN ======
(function setupCountdown(){
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdownWrap = document.getElementById('countdown');
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !countdownWrap) return;

  const countdown = () => {
    const eventDate = new Date("2025-11-05T09:00:00").getTime();
    const now = new Date().getTime();
    const gap = eventDate - now;

    if (gap <= 0) {
      countdownWrap.innerHTML = "<p>O evento já começou!</p>";
      return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour   = minute * 60;
    const day    = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    daysEl.innerText = d.toString().padStart(2, "0");
    hoursEl.innerText = h.toString().padStart(2, "0");
    minutesEl.innerText = m.toString().padStart(2, "0");
    secondsEl.innerText = s.toString().padStart(2, "0");
  };

  setInterval(countdown, 1000);
  countdown();
})();
