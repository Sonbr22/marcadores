  const grid = document.getElementById('numberGrid');
    let db;

    const request = indexedDB.open('tabela1200DB', 1);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore('marcados', { keyPath: 'numero' });
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      carregarTabela();
    };

    function carregarTabela() {
      const transaction = db.transaction('marcados', 'readonly');
      const store = transaction.objectStore('marcados');
      const getAll = store.getAll();

      getAll.onsuccess = () => {
        const marcados = getAll.result.map(item => item.numero);
        for (let i = 1; i <= 1200; i++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.textContent = i;

          if (marcados.includes(i)) {
            cell.classList.add('marked');
          }

          cell.addEventListener('click', () => toggleMarca(i, cell));
          grid.appendChild(cell);
        }
      };
    }

    function toggleMarca(numero, cell) {
      const transaction = db.transaction('marcados', 'readwrite');
      const store = transaction.objectStore('marcados');

      if (cell.classList.contains('marked')) {
        store.delete(numero);
        cell.classList.remove('marked');
      } else {
        store.put({ numero });
        cell.classList.add('marked');
      }
    }

    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;

    if (isIos && !isInStandaloneMode) {
      document.getElementById('iosMessage').style.display = 'block';
    }