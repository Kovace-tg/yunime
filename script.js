// script.js - SISTEM FUNGSIONAL YUNIME V7 (Bar Rating & ID Jelas)

// =================================================================
// 0. DATA DUMMY (Template JELAS - Rating diubah ke skala 5.0)
// =================================================================
const YUNIME_DATA = [
    {
        id: 'CIT', // ID UTAMA
        title: 'Chitose-kun wa Ramune Bin no Naka',
        genre: 'Romance | School | Comedy | Harem',
        status: 'Ongoing',
        episodes: 2, // BATAS MAKSIMUM EPISODE
        rating: 7.5, // DARI SKALA 10.0
        release: '07/10/2025',
        description: 'Saku Chitose adalah siswa SMA yang populer dan tampak hidup sempurna — dikelilingi teman-teman, digemari cewek, dan percaya diri. Tapi hidupnya berubah ketika guru menyuruhnya membantu seorang siswa tertutup yang dikucilkan dari kelas. Dari situ, Saku mulai belajar arti sebenarnya dari “hidup di dunia nyata,” di balik topeng popularitasnya. Cerita ini menggambarkan dinamika sosial sekolah dengan realisme dan emosi yang dalam.',
        poster: 'chitose.jpg', 
        carousel_img: 'https://via.placeholder.com/1600x900/ff8c00/0f0f0f?text=AOT_CAROUSEL', 
        // PENTING: Ganti URL ini dengan link embed video (iframe)
        video_links: {
            1: 'ChitosekunwaRamuneBinnoNakaEpisode1.mp4', // CONTOH LINK VIDEO EP 1
            2: 'test.mp4',
            // ...
            24: 'URL_EMBED_VIDEO_EP_24' 
        }
    },
    {
        id: 'NET', // ID UNIK KEDUA
        title: 'Natsu e no Tunnel, Sayonara no Deguchi',
        genre: 'Romance | Drama | Mystery | Movie',
        status: 'Selesai',
        episodes: 1, // BATAS MAKSIMUM EPISODE
        rating: 9, // DARI SKALA 10.0
        release: '09/09/2022',
        description: 'Kaoru Tōno mendengar legenda tentang sebuah terowongan misterius bernama Urashima Tunnel. Konon, siapa pun yang melewatinya bisa mendapatkan apa pun yang diinginkan, tapi dengan harga: waktu di dunia luar berjalan sangat cepat. Suatu hari, Kaoru bertemu Anzu Hanaki, gadis baru di sekolahnya. Bersama, mereka memutuskan untuk menjelajahi terowongan itu, berharap menemukan kebahagiaan yang mereka cari — namun keduanya harus memilih antara masa lalu, masa depan, dan kehilangan yang tak bisa dihindari.',
        poster: 'net.jpg', 
        carousel_img: 'https://via.placeholder.com/1600x900/e07b00/0f0f0f?text=JJK_CAROUSEL', 
        video_links: {
            1: 'URL_VIDEO_JJK_EP_1',
            // ...
            47: 'URL_VIDEO_JJK_EP_47' 
        }
    }
];

// FUNGSI BARU UNTUK MENGHASILKAN BAR RATING BINTANG (Dipakai di index & anime)
function createStarRating(ratingValue, showValue = true) {
    const maxStars = 10;
    let stars = '';
    
    // Konversi nilai rating ke bintang terisi penuh (floor)
    const fullStars = Math.floor(ratingValue); 
    // Hitung sisa rating untuk bintang setengah
    // Anggap bintang setengah jika nilainya antara X.25 hingga X.75
    const hasHalfStar = ratingValue - fullStars >= 0.25 && ratingValue - fullStars < 0.75; 
    
    for (let i = 1; i <= maxStars; i++) {
        if (i <= fullStars) {
            // Bintang Penuh
            stars += '<span class="star filled">★</span>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            // Bintang Setengah (Menggunakan bintang penuh, tapi CSS akan memotongnya)
            stars += '<span class="star half">★</span>';
        } else {
            // Bintang Kosong
            stars += '<span class="star empty">☆</span>';
        }
    }
    
    if (showValue) {
        // Tambahkan nilai angka (hanya di detail)
        stars += `<span class="rating-value">${ratingValue}/10</span>`;
    }
    
    return `<div class="rating-bar">${stars}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    
    // Fungsi utilitas
    const getAnimeData = (id) => YUNIME_DATA.find(a => a.id === id);

    // =================================================================
    // 1. CAROUSEL OTOMATIS & PENCARIAN (index.html)
    // =================================================================
    const carousel = document.getElementById('main-carousel');
    if (carousel) {
        let currentIndex = 0;
        const items = carousel.getElementsByClassName('carousel-item');
        const totalItems = items.length;
        function moveToNext() {
            currentIndex = (currentIndex + 1) % totalItems;
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }
        setInterval(moveToNext, 4000);
    }
    
    const searchInput = document.getElementById('search-input');
    const animeCards = document.querySelectorAll('.anime-grid .anime-card');
    if (searchInput && animeCards.length > 0) {
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

    // PENTING: Mengisi Bar Rating di Kartu (index.html)
    document.querySelectorAll('.anime-card').forEach(card => {
        const urlParams = new URLSearchParams(card.href.split('?')[1]);
        const animeId = urlParams.get('id');
        const anime = getAnimeData(animeId);
        
        if (anime) {
            const ratingElement = card.querySelector('.rating');
            if (ratingElement) {
                // Menghasilkan bintang tanpa menampilkan nilai angka (showValue=false)
                ratingElement.innerHTML = createStarRating(anime.rating, false); 
            }
        }
    });


    // =================================================================
    // 2. PENGISIAN DETAIL ANIME & RATING BAR (anime.html)
    // =================================================================
    if (document.body.classList.contains('page-anime')) {
        const params = new URLSearchParams(window.location.search);
        const animeId = params.get('id');
        const anime = getAnimeData(animeId);

        if (anime) {
            document.title = `${anime.title} | YUNIME`;
            document.getElementById('anime-image').src = anime.poster;
            document.getElementById('detail-title').innerText = anime.title;
            document.getElementById('total-episode').innerText = `${anime.episodes} Episode / ${anime.status}`;
            document.getElementById('anime-genre').innerText = anime.genre;
            document.getElementById('release-date').innerText = anime.release;
            
            // Mengisi Bar Rating Bintang di Halaman Detail
            document.getElementById('detail-rating-bar').innerHTML = createStarRating(anime.rating, true); // showValue=true
            
            document.getElementById('anime-description-text').innerText = anime.description;

            // Membangun Daftar Episode (FIXED: Tidak Kosong)
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
            document.getElementById('detail-title').innerText = 'Anime Tidak Ditemukan';
            document.querySelector('.anime-meta-table').style.display = 'none';
        }
    }

    // =================================================================
    // 3. NAVIGASI EPISODE & VIDEO (episode.html)
    // =================================================================
    if (document.body.classList.contains('page-episode')) {
        const params = new URLSearchParams(window.location.search);
        const animeId = params.get('anime');
        let currentEp = parseInt(params.get('ep') || '1');
        const anime = getAnimeData(animeId);
        
        const prevBtn = document.getElementById('prev-ep-btn');
        const nextBtn = document.getElementById('next-ep-btn');
        const videoPlayer = document.getElementById('video-player');
        const backToAnimeLink = document.getElementById('back-to-anime');
        const downloadBtn = document.getElementById('download-btn'); // <-- Tombol Download diaktifkan kembali
        
        if (anime) {
            document.getElementById('current-episode-title').innerText = `${anime.title} - Episode ${currentEp}`;
            backToAnimeLink.href = `anime.html?id=${animeId}`;
            
            // Link yang digunakan untuk streaming dan download adalah SAMA
            const videoUrl = anime.video_links[currentEp] || '';
            
            // 1. Pasang Link Video (Streaming)
            videoPlayer.src = videoUrl;

            // 2. Pasang Link untuk Tombol Download
            downloadBtn.href = videoUrl;
            
            // 3. Tambahkan properti 'download' untuk memaksa browser mengunduh, bukan memutar
            downloadBtn.setAttribute('download', `${anime.title}_Episode_${currentEp}.mp4`);
            
            // Batasi Tombol "BACK"
            if (currentEp <= 1) {
                prevBtn.disabled = true;
            } else {
                prevBtn.onclick = () => {
                    window.location.href = `episode.html?anime=${animeId}&ep=${currentEp - 1}`;
                };
            }
            
            // Batasi Tombol "NEXT"
            if (currentEp >= anime.episodes) {
                nextBtn.disabled = true;
            } else {
                nextBtn.onclick = () => {
                    window.location.href = `episode.html?anime=${animeId}&ep=${currentEp + 1}`;
                };
            }
        }
    }
});
