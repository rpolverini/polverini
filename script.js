document.addEventListener('DOMContentLoaded', function () {
  // Typing animation (reemplaza jQuery typeIt)
  const typeEl = document.querySelector('.type-it');
  const originalText = typeEl.textContent;
  typeEl.textContent = '';
  let i = 0;
  const typingTimer = setInterval(function () {
    typeEl.textContent += originalText[i++];
    if (i >= originalText.length) clearInterval(typingTimer);
  }, 80);

  // Resalta ~ en el prompt del terminal
  const promptSpan = document.getElementById('span');
  promptSpan.innerHTML = promptSpan.innerHTML.replace(
    '~',
    '<span style="color:#2ecc71;font-weight:bold">~</span>'
  );

  // Muestra los resultados después del delay
  setTimeout(function () {
    document.querySelector('.result').style.display = 'block';
  }, 3500);

  // Referencias almacenadas una vez — sobreviven a cambios de clase
  const winEl      = document.querySelector('.window');
  const bashEl     = document.querySelector('.bash');
  const afterClose = document.querySelector('.afterclose');
  let state = 'normal'; // 'normal' | 'minimized' | 'maximized'

  document.querySelector('button.close').addEventListener('click', function () {
    winEl.style.display = 'none';
    afterClose.style.display = 'block';
  });

  document.querySelector('button.open').addEventListener('click', function () {
    // Siempre restaura a estado normal al reabrir
    winEl.classList.remove('windowmin', 'windowmax');
    winEl.classList.add('window');
    bashEl.classList.remove('bashmax');
    bashEl.style.display = '';
    winEl.style.display = '';
    afterClose.style.display = 'none';
    state = 'normal';
  });

  document.querySelector('button.maximize').addEventListener('click', function () {
    if (state === 'normal') {
      winEl.classList.replace('window', 'windowmax');
      bashEl.classList.add('bashmax');
      state = 'maximized';
    } else if (state === 'maximized') {
      winEl.classList.replace('windowmax', 'window');
      bashEl.classList.remove('bashmax');
      state = 'normal';
    } else if (state === 'minimized') {
      winEl.classList.replace('windowmin', 'window');
      bashEl.style.display = '';
      state = 'normal';
    }
  });

  document.querySelector('button.minimize').addEventListener('click', function () {
    if (state === 'normal') {
      winEl.classList.replace('window', 'windowmin');
      bashEl.style.display = 'none';
      state = 'minimized';
    } else if (state === 'maximized') {
      winEl.classList.replace('windowmax', 'windowmin');
      bashEl.classList.remove('bashmax');
      bashEl.style.display = 'none';
      state = 'minimized';
    }
  });
});
