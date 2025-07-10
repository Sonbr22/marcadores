 const grid = document.getElementById('numberGrid');
    const savedMarked = JSON.parse(localStorage.getItem('markedNumbers')) || [];

    for (let i = 1; i <= 600; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = i;

      if (savedMarked.includes(i)) {
        cell.classList.add('marked');
      }

      cell.addEventListener('click', () => {
        cell.classList.toggle('marked');
        const index = savedMarked.indexOf(i);
        if (index === -1) {
          savedMarked.push(i);
        } else {
          savedMarked.splice(index, 1);
        }
        localStorage.setItem('markedNumbers', JSON.stringify(savedMarked));
      });

      grid.appendChild(cell);
    }

    // Detecta iOS
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;

    if (isIos && !isInStandaloneMode) {
      document.getElementById('iosMessage').style.display = 'block';
    }

    // Instalação Android
    let deferredPrompt;
    const banner = document.getElementById('installBanner');
    const btnInstall = document.getElementById('installBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      banner.style.display = 'block';
    });

    btnInstall.addEventListener('click', async () => {
      banner.style.display = 'none';
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        deferredPrompt = null;
      }
    });

    if (!window.matchMedia('(display-mode: standalone)').matches && !deferredPrompt && !isIos) {
      banner.style.display = 'none';
    }