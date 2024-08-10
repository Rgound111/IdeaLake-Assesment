// script.js

document.querySelector('.play-button').addEventListener('click', function () {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.style.display = 'flex';

    const videoSrc = document.getElementById('youtubeVideo').src;
    document.getElementById('youtubeVideo').src = videoSrc + "?autoplay=1"; 
});


// script.js

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.sc-card');
    const viewMoreBtn = document.createElement('button');
    viewMoreBtn.className = 'view-more';
    viewMoreBtn.innerText = 'View More';

    if (window.innerWidth <= 768) {
        for (let i = 3; i < cards.length; i++) {
            cards[i].style.display = 'none';
        }

        cards[2].after(viewMoreBtn);

        viewMoreBtn.addEventListener('click', function () {
            for (let i = 3; i < cards.length; i++) {
                cards[i].style.display = 'flex';
            }
            viewMoreBtn.style.display = 'none'; 
        });
    }
});


/// For carousel ///

document.addEventListener('DOMContentLoaded', function () {
    const fcCardsContainer = document.querySelector('.fc-cards');
    const fcCards = document.querySelectorAll('.fc-card');
    const numCards = fcCards.length;
    let currentCardIndex = 0;

    function updateCarousel() {
        if (window.innerWidth <= 768) {
            const offset = -currentCardIndex * 100;
            fcCardsContainer.style.transform = `translateX(${offset}%)`;
            paginationDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentCardIndex);
            });
        } else {
            fcCardsContainer.style.transform = 'none'; 
        }
    }

    const pagination = document.querySelector('.carousel-bullets');
    fcCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentCardIndex = index;
            updateCarousel();
        });
        pagination.appendChild(dot);
    });

    const paginationDots = document.querySelectorAll('.carousel-bullets .dot');

    let startX = 0;
    let isSwiping = false;

    fcCardsContainer.addEventListener('touchstart', function (event) {
        if (window.innerWidth <= 768) {
            startX = event.touches[0].clientX;
            isSwiping = true;
        }
    });

    fcCardsContainer.addEventListener('touchmove', function (event) {
        if (isSwiping && window.innerWidth <= 768) {
            const currentX = event.touches[0].clientX;
            const diffX = startX - currentX;

            if (diffX > 50 && currentCardIndex < numCards - 1) {
                currentCardIndex++;
                updateCarousel();
                isSwiping = false;
            } else if (diffX < -50 && currentCardIndex > 0) {
                currentCardIndex--;
                updateCarousel();
                isSwiping = false;
            }
        }
    });


    function updatePaginationVisibility() {
        if (window.innerWidth > 768) {
            pagination.style.display = 'none';
        } else {
            pagination.style.display = 'flex';
        }
    }

    window.addEventListener('resize', function () {
        updateCarousel();
        updatePaginationVisibility();
    });

    updatePaginationVisibility();
    updateCarousel();
});
