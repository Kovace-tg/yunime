// script.js - SISTEM FUNGSIONAL YUNIME V13 (Logika Status Baru, Rating Mark)

// =================================================================
// 0. DATA SENTRAL (DATA ANIME) 
// =================================================================
const YUNIME_DATA = [
    {
        id: 'CIT', 
        title: 'Chitose-kun wa Ramune Bin no Naka',
        genre: 'Romance | School | Comedy | Harem',
        status: 'Ongoing',
        episodes: 2, // Jumlah episode saat ini untuk ongoing
        rating: 7.5, 
        release: '07/10/2025',
        description: 'Saku Chitose adalah siswa SMA yang populer dan tampak hidup sempurna — dikelilingi teman-teman, digemari cewek, dan percaya diri. Tapi hidupnya berubah ketika guru menyuruhnya membantu seorang siswa tertutup yang dikucilkan dari kelas. Dari situ, Saku mulai belajar arti sebenarnya dari “hidup di dunia nyata,” di balik topeng popularitasnya. Cerita ini menggambarkan dinamika sosial sekolah dengan realisme dan emosi yang dalam.',
        poster: 'chitose.jpg', 
        carousel_img: 'citposter.jpg', 
        video_links: {
            1: {
                embed: 'https://drive.google.com/file/d/VIDEO_ID_EP1_ANDA/preview', 
                download: 'https://drive.google.com/file/d/VIDEO_ID_EP1_ANDA/view' 
            },
            2: {
                embed: 'https://drive.google.com/file/d/VIDEO_ID_EP2_ANDA/preview',
                download: 'https://drive.google.com/file/d/VIDEO_ID_EP2_ANDA/view'
            }
        }
    },
    {
        id: 'NET', 
        title: 'Natsu e no Tunnel, Sayonara no Deguchi',
        genre: 'Romance | Drama | Mystery | Sci-FI | Movie',
        status: 'Selesai',
        episodes: 1, // Total episode (untuk selesai)
        rating: 9.0, 
        release: '09/09/2022',
        description: 'Kaoru Tōno mendengar legenda tentang sebuah terowongan misterius bernama Urashima Tunnel. Konon, siapa pun yang melewatinya bisa mendapatkan apa pun yang diinginkan, tapi dengan harga: waktu di dunia luar berjalan sangat cepat. Suatu hari, Kaoru bertemu Anzu Hanaki, gadis baru di sekolahnya. Bersama, mereka memutuskan untuk menjelajahi terowongan itu, berharap menemukan kebahagiaan yang mereka cari — namun keduanya harus memilih antara masa lalu, masa depan, dan kehilangan yang tak bisa dihindari.',
        poster: 'net.jpg', 
        carousel_img: 'netposter.jpg', 
        video_links: {
            1: {
                embed: 'https://drive.google.com/file/d/VIDEO_ID_EP1_NET/preview',
                download: 'https://drive.google.com/file/d/VIDEO_ID_EP1_NET/view'
            }
        }
    },
    // TAMBAHKAN ANIME BARU DI SINI:
    {
        id: 'KNW', 
        title: 'Kimi no Na Wa',
        genre: 'Romance | Drama | Supernatural | Movie',
        status: 'Selesai',
        episodes: 1, 
        rating: 9.3, 
        release: '26 Agustus 2016',
        description: 'Mitsuha, gadis dari desa kecil, dan Taki, cowok dari Tokyo, tiba-tiba mulai bertukar tubuh tanpa alasan yang jelas. Awalnya mereka panik, tapi lama-lama mulai menikmati kehidupan satu sama lain. Namun, saat mereka mencoba bertemu langsung, mereka menyadari ada rahasia besar yang memisahkan ruang dan waktu di antara mereka.',
        poster: 'knw.jpg', 
        carousel_img: 'knwposter.jpg', 
        video_links: {
            1: {
                embed: 'https://drive.google.com/file/d/VIDEO_ID_VIN1/preview', 
                download: 'https://drive.google.com/file/d/VIDEO_ID_VIN1/view' 
            },
            2: {
                embed: 'https://drive.google.com/file/d/VIDEO_ID_VIN2/preview',
                download: 'https://drive.google.com/file/d/VIDEO_ID_VIN2/view'
            },
            // ... Tambahkan link episode lainnya hingga 24 di sini
        }
    }
    // STOP MENAMBAHKAN ANIME DI SINI
];

// =================================================================
// FUNGSI UMUM (Diperbarui V13)
// =================================================================

const getAnimeData = (id) => YUNIME_DATA.find(a => a.id === id);

// FUNGSI BARU V13: Logika Status Episode Sesuai Permintaan
function formatEpisodeStatus(status, totalEpisodes) {
    if (status.toLowerCase() === 'ongoing') {
        return `Ongoing`; // Hanya tampilkan 'Ongoing'
    }
    // Jika Selesai, tampilkan total episode
    return `${totalEpisodes} Episode`;
}

// FUNGSI BARU V13: MENGHASILKAN RATING MARK (Logo Bintang + Angka)
function createRatingMark(ratingValue) {
    // Membulatkan rating ke satu desimal jika perlu, untuk tampilan yang rapi
    const displayRating = ratingValue.toFixed(ratingValue % 1 === 0 ? 0 : 1);
    
    return `
        <div class="rating-mark-container">
            <div class="rating-mark">
                <span>★</span>${displayRating}/10
            </div>
        </div>
    `;
}

function updateSearchFunctionality(searchInput) {
    const animeCards = document.querySelectorAll('.anime-grid .anime-card');
    if (!searchInput || animeCards.length === 0) return;

    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        animeCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const genre = card.dataset.genre || '';
            
            if (title.includes(searchTerm) || genre.includes(searchTerm)) {
                card.style.display = 'block'; 
            } else {
                card.style.display = 'none'; 
            }
        });
    });
}

function renderAnimeGrid(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; 

    data.forEach(anime => {
        const rawGenres = anime.genre.split(' | ');
        const genresForSearch = rawGenres.join(', ').toLowerCase();

        const genreTagsHtml = rawGenres.map(genre => 
            `<span class="genre-tag">${genre}</span>`
        ).join('');

        const card = document.createElement('a');
        card.href = `anime.html?id=${anime.id}`;
        card.classList.add('anime-card');
        card.setAttribute('data-genre', genresForSearch);

        card.innerHTML = `
            <img src="${anime.poster}" alt="${anime.title}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <div class="genre-tags-container">${genreTagsHtml}</div> 
                <div class="rating-mark-container">${createRatingMark(anime.rating)}</div> 
            </div>
        `;
        container.appendChild(card);
    });

    const searchInput = document.getElementById('search-input');
    if(searchInput) updateSearchFunctionality(searchInput);
}

function renderCarousel(data, containerId) {
    const carousel = document.getElementById(containerId);
    if (!carousel) return;

    carousel.innerHTML = ''; 

    data.slice(0, 5).forEach(anime => { 
        const genres = anime.genre.split(' | ').join(', ').toLowerCase();
        
        // Gunakan formatEpisodeStatus untuk teks status
        const displayStatus = formatEpisodeStatus(anime.status, anime.episodes);

        const item = document.createElement('a');
        item.href = `anime.html?id=${anime.id}`;
        item.classList.add('carousel-item');
        item.setAttribute('data-genre', genres);

        item.innerHTML = `
            <img src="${anime.carousel_img}" alt="${anime.title}">
            <div class="carousel-overlay">
                <div class="overlay-info">
                    <h2>${anime.title}</h2>
                    <p>Total Episode: <span class="episode-status">${displayStatus}</span></p>
                </div>
            </div>
        `;
        carousel.appendChild(item);
    });

    initCarousel(carousel);
}

function initCarousel(carousel) {
    let currentIndex = 0;
    const items = carousel.getElementsByClassName('carousel-item');
    const totalItems = items.length;
    function moveToNext() {
        currentIndex = (currentIndex + 1) % totalItems;
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }
    if (totalItems > 1) {
        setInterval(moveToNext, 4000);
    }
}


// =================================================================
// INISIALISASI DOM 
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. INDEX.HTML (Halaman Beranda) ---
    if (document.body.classList.contains('page-index')) {
        renderCarousel(YUNIME_DATA, 'main-carousel');
        renderAnimeGrid(YUNIME_DATA, 'anime-list');
    }

    // --- 2. ANIME.HTML (Halaman Detail) ---
    if (document.body.classList.contains('page-anime')) {
        const params = new URLSearchParams(window.location.search);
        const animeId = params.get('id');
        const anime = getAnimeData(animeId);

        if (anime) {
            document.title = `${anime.title} | YUNIME`;
            
            // Poster dan Judul terpisah
            document.getElementById('anime-image').src = anime.poster;
            document.getElementById('detail-title').innerText = anime.title;
            
            // LOGIKA STATUS BARU V13
            const displayStatus = formatEpisodeStatus(anime.status, anime.episodes);
            document.getElementById('total-episode').innerText = displayStatus; 
            
            // LOGIKA GENRE TAGS 
            const genreContainer = document.getElementById('anime-genre');
            const rawGenres = anime.genre.split(' | ');
            const genreTagsHtml = rawGenres.map(genre => 
                `<span class="genre-tag genre-tag-detail">${genre}</span>`
            ).join('');
            genreContainer.innerHTML = genreTagsHtml;
            
            document.getElementById('release-date').innerText = anime.release;
            
            // Menggunakan Rating Mark V13
            document.getElementById('detail-rating-mark').innerHTML = createRatingMark(anime.rating); 
            document.getElementById('anime-description-text').innerText = anime.description;

            const epContainer = document.getElementById('episode-list-container');
            epContainer.innerHTML = ''; 
            for (let i = 1; i <= anime.episodes; i++) {
                const epLink = document.createElement('div');
                epLink.classList.add('episode-item');
                epLink.innerHTML = `
                    <a href="episode.html?anime=${anime.id}&ep=${i}">
                        <span>Episode ${i}: Tonton Sekarang!</span>
                        <span style="color: var(--accent);">▶ Tonton</span>
                    </a>
                `;
                epContainer.appendChild(epLink);
            }
        } else {
            document.title = '404 | YUNIME';
            document.getElementById('detail-title').innerText = 'Anime Tidak Ditemukan';
            const metaTable = document.querySelector('.anime-meta-table');
            if(metaTable) metaTable.style.display = 'none';
        }
    }

    // --- 3. EPISODE.HTML (Halaman Nonton) --- 
    if (document.body.classList.contains('page-episode')) {
        const params = new URLSearchParams(window.location.search);
        const animeId = params.get('anime');
        let currentEp = parseInt(params.get('ep') || '1');
        const anime = getAnimeData(animeId);
        
        const prevBtn = document.getElementById('prev-ep-btn');
        const nextBtn = document.getElementById('next-ep-btn');
        const videoPlayer = document.getElementById('video-player');
        const downloadBtn = document.getElementById('download-btn'); 
        
        if (anime) {
            document.title = `Nonton ${anime.title} Ep ${currentEp} | YUNIME`;
            document.getElementById('current-episode-title').innerText = `${anime.title} - Episode ${currentEp}`;
            
            const backToAnimeLink = document.getElementById('back-to-anime');
            if (backToAnimeLink) {
                backToAnimeLink.href = `anime.html?id=${animeId}`;
            }
            
            const epLinks = anime.video_links[currentEp] || {};
            
            const embedUrl = epLinks.embed || '';
            const downloadUrl = epLinks.download || '';
            
            videoPlayer.src = embedUrl;
            downloadBtn.href = downloadUrl;
            downloadBtn.removeAttribute('download'); 
            downloadBtn.setAttribute('target', '_blank'); 
            
            if (currentEp <= 1) {
                prevBtn.disabled = true;
                prevBtn.classList.remove('btn'); 
                prevBtn.classList.remove('btn-nav-ep'); // Hilangkan style V13
            } else {
                prevBtn.disabled = false;
                prevBtn.classList.add('btn', 'btn-nav-ep');
                prevBtn.onclick = () => {
                    window.location.href = `episode.html?anime=${animeId}&ep=${currentEp - 1}`;
                };
            }
            
            if (currentEp >= anime.episodes) {
                nextBtn.disabled = true;
                nextBtn.classList.remove('btn');
                nextBtn.classList.remove('btn-nav-ep'); // Hilangkan style V13
            } else {
                nextBtn.disabled = false;
                nextBtn.classList.add('btn', 'btn-nav-ep');
                nextBtn.onclick = () => {
                    window.location.href = `episode.html?anime=${animeId}&ep=${currentEp + 1}`;
                };
            }
        } else {
             document.title = '404 | YUNIME';
             document.getElementById('current-episode-title').innerText = 'Episode Tidak Ditemukan';
        }
    }
});
