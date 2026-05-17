const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shrink', window.scrollY > 60);
  }, { passive: true });

  /* === GALLERY CAROUSEL === */
  (function () {
    const photos = [
      'images/photo-01.jpg','images/photo-02.jpg','images/photo-03.jpg',
      'images/photo-04.jpg','images/photo-05.jpg','images/photo-06.jpg',
      'images/photo-07.jpg'
    ];
    let cur = 0, busy = false, autoTimer;

    const backdrop  = document.getElementById('gcBackdrop');
    const frame     = document.getElementById('gcFrame');
    const img       = document.getElementById('gcImg');
    const imgNext   = document.getElementById('gcImgNext');
    const counter   = document.getElementById('gcCur');
    const thumbs    = document.querySelectorAll('.gc-thumb');
    const btnPrev   = document.getElementById('gcPrev');
    const btnNext   = document.getElementById('gcNext');

    function setBackdrop(src) {
      backdrop.style.backgroundImage = `url('${src}')`;
    }

    function goTo(idx, dir) {
      if (busy || idx === cur) return;
      busy = true;
      const next = (idx + photos.length) % photos.length;

      // Preload next image
      imgNext.src = photos[next];
      imgNext.onload = () => {
        // Outgoing: scale-up + fade
        img.classList.add('gc-leave');
        // Incoming: scale-up from slightly smaller
        imgNext.classList.add('gc-enter');
        imgNext.style.opacity = '0';

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            img.style.opacity       = '0';
            img.style.transform     = 'scale(1.05)';
            imgNext.style.opacity   = '1';
            imgNext.style.transform = 'scale(1)';
            imgNext.style.transition = 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)';
          });
        });

        setTimeout(() => {
          img.src = photos[next];
          img.style.opacity    = '1';
          img.style.transform  = 'scale(1)';
          img.style.transition = 'none';
          imgNext.style.opacity = '0';
          imgNext.style.transition = 'none';
          imgNext.style.transform = 'scale(0.97)';

          cur = next;
          counter.textContent = String(cur + 1).padStart(2, '0');
          thumbs.forEach((t, i) => t.classList.toggle('active', i === cur));
          setBackdrop(photos[cur]);

          setTimeout(() => {
            img.style.transition = 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)';
            busy = false;
          }, 50);
        }, 560);
      };
    }

    function next() { goTo(cur + 1); }
    function prev() { goTo(cur - 1); }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 4500);
    }

    btnNext.addEventListener('click', () => { next(); resetAuto(); });
    btnPrev.addEventListener('click', () => { prev(); resetAuto(); });

    thumbs.forEach(t => {
      t.addEventListener('click', () => { goTo(+t.dataset.idx); resetAuto(); });
    });

    // Keyboard
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { next(); resetAuto(); }
      if (e.key === 'ArrowLeft')  { prev(); resetAuto(); }
    });

    // Touch swipe
    let tx = 0;
    frame.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    frame.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); resetAuto(); }
    });

    // Tilt on mousemove
    frame.addEventListener('mousemove', e => {
      const r  = frame.getBoundingClientRect();
      const x  = (e.clientX - r.left)  / r.width  - 0.5;
      const y  = (e.clientY - r.top)   / r.height - 0.5;
      img.style.transform = `scale(1.03) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    frame.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
    frame.style.perspective = '1200px';

    // Init
    img.style.transition = 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)';
    setBackdrop(photos[0]);
    resetAuto();
  })();

document.querySelectorAll('[data-magnet]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
