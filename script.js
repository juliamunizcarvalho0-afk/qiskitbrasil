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
  if (!timelineIcons || timelineIcons.length === 0) return;

  timelineIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = icon.closest('.timeline-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');

      const container = document.querySelector('.timeline-content');
      const panel = document.getElementById('timeline-panel');
      if (panel) {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        panel.innerHTML = '';
        if (container) container.classList.remove('expanded-line');
      }

      if (!isOpen && panel) {
        const content = item.querySelector('.timeline-content-item');
        if (content) {
          const clone = content.cloneNode(true);
          clone.classList.add('timeline-panel-content');
          clone.classList.remove('timeline-content-item');
          if (clone.id) clone.id = '';
          clone.style.position = 'static';
          clone.style.transform = 'none';
          clone.style.display = 'block';

          panel.appendChild(clone);
          panel.classList.add('open');
          panel.setAttribute('aria-hidden', 'false');
          if (container) container.classList.add('expanded-line');

          const scrollHeight = clone.scrollHeight || clone.getBoundingClientRect().height || 0;
          const viewportHalf = Math.floor(window.innerHeight * 0.6);
          const maxPanelHeight = Math.min(600, viewportHalf);

          const timelineRow = container.querySelector('.timeline-container');
          if (timelineRow) {
            panel.style.position = 'absolute';
            const rowOffsetTop = timelineRow.offsetTop || 0;
            const rowHeight = timelineRow.offsetHeight || 0;
            const topPos = rowOffsetTop + rowHeight + 8;
            panel.style.top = topPos + 'px';
            panel.style.left = '50%';
            panel.style.transform = 'translateX(-50%)';
            panel.style.width = Math.min(760, container.clientWidth - 40) + 'px';
          }

          if (scrollHeight + 24 > maxPanelHeight) {
            panel.style.maxHeight = maxPanelHeight + 'px';
            panel.style.overflow = 'auto';
          } else {
            panel.style.maxHeight = '';
            panel.style.overflow = '';
          }

          setTimeout(() => {
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 80);
        }
      } else {
        if (container) container.style.setProperty('--timeline-extra', '0px');
      }
    });
  });

  function closeTimelinePanel() {
    const panel = document.getElementById('timeline-panel');
    const container = document.querySelector('.timeline-content');
    if (panel) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      panel.innerHTML = '';
      panel.style.maxHeight = '';
      panel.style.overflow = '';
    }
    if (container) container.style.setProperty('--timeline-extra', '0px');
  }

  document.addEventListener('click', (e) => {
    const clickedInsideTimeline = !!e.target.closest('.timeline-content');
    const clickedInsidePanel = !!e.target.closest('#timeline-panel');
    if (!clickedInsideTimeline && !clickedInsidePanel) {
      closeTimelinePanel();
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
