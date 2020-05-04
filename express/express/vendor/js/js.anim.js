setTimeout(function () {
    const ifContent = document.getElementById('iframe-on');
    const canvaS = document.createElement('iframe');
    canvaS.style.border = '0';
    canvaS.className = 'shadow';
    canvaS.id = 'iFrame';
    canvaS.src = 'https://www.google.com/maps/d/u/0/embed?mid=1viuYHY76P6mHxPjxGjvdlVthE7AumjrA';
    canvaS.allowFullscreen = true;
    ifContent.innerHTML = null;
    ifContent.appendChild(canvaS);
}, 2000)
