document.addEventListener('DOMContentLoaded', () => {
    // 1. O SCRIPT VERIFICA SE EXISTE UM MODAL NA PÁGINA
    // Se a página não tiver o <div id="zoom-modal">, o script para aqui e não faz mais nada.
    // Isso protege suas páginas de projetos como authorial.html e commercial.html.
    const modal = document.getElementById('zoom-modal');
    if (!modal) {
        return; // Encerra a execução do script para esta página.
    }

    // 2. Se um modal existe, o script continua e seleciona os outros elementos
    const zoomedContent = document.getElementById('zoomed-content');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-img')); // O alvo são apenas as imagens e vídeos com a classe .gallery-img
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const closeBtn = document.getElementById('close-zoom');
    let currentIndex = 0;

    // Se não houver itens de galeria, também não faz nada.
    if (galleryItems.length === 0) {
        return;
    }

    // 3. A LÓGICA DO MODAL (FUNÇÕES)
    // Esta parte do código é a mesma que você já tem, agora centralizada aqui.
    function openZoom(index) {
        const item = galleryItems[index];
        const isVideo = item.tagName.toLowerCase() === 'video';
        zoomedContent.innerHTML = ''; // Limpa o conteúdo anterior

        let mediaElement;
        if (isVideo) {
            mediaElement = document.createElement('video');
            mediaElement.src = item.src;
            mediaElement.controls = true;
            mediaElement.autoplay = true;
            mediaElement.loop = true;
            mediaElement.muted = true;
        } else {
            mediaElement = document.createElement('img');
            mediaElement.src = item.src;
            mediaElement.alt = item.alt || 'Zoom';
        }
        mediaElement.style.maxWidth = '90vw';
        mediaElement.style.maxHeight = '90vh';
        zoomedContent.appendChild(mediaElement);

        modal.classList.add('active');
        currentIndex = index;
    }

    function closeZoom() {
        modal.classList.remove('active');
        zoomedContent.innerHTML = ''; // Limpa o conteúdo para parar a execução de vídeos
    }
    
    // 4. EVENT LISTENERS
    // Anexa os eventos de clique APENAS nos itens da galeria de mídia (.gallery-img)
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openZoom(index));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeZoom);
    if (prevBtn) prevBtn.addEventListener('click', () => openZoom((currentIndex - 1 + galleryItems.length) % galleryItems.length));
    if (nextBtn) nextBtn.addEventListener('click', () => openZoom((currentIndex + 1) % galleryItems.length));
    
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeZoom();
        if (e.key === 'ArrowRight') openZoom((currentIndex + 1) % galleryItems.length);
        if (e.key === 'ArrowLeft') openZoom((currentIndex - 1 + galleryItems.length) % galleryItems.length);
    });
});