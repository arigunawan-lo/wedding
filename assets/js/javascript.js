
// 
const music = document.getElementById('wedding-music');
  const playButton = document.getElementById('play-music-btn');
  
  // Fungsi untuk memulai musik ketika tombol diklik
  playButton.addEventListener('click', function() {
    music.play();  // Memulai musik
  });

  // Tambahkan event listener untuk memeriksa ketika musik selesai dan lakukan looping
  music.addEventListener('ended', function() {
    music.currentTime = 0; // Mulai dari awal
    music.play(); // Putar ulang musik
  });

$(document).ready(function() {
    function displayComments() {
      const comments = JSON.parse(localStorage.getItem('comments')) || [];
      $('#commentsList').empty();
  
      comments.forEach(comment => {
        const statusClass = comment.status === 'Hadir' ? 'status' : 'status tidak-hadir';
        $('#commentsList').append(`
          <div class="comment">
            <strong>${comment.nama}</strong> - <span class="${statusClass}">${comment.status}</span>
            <p>${comment.comment}</p>
          </div>
        `);
      });
    }
  
    // Event untuk mengirimkan form
    $('#rsvp-comment-form').on('submit', function(event) {
      event.preventDefault();
  
      const nama = $('#nama').val().trim();
      const status = $('#status').val();
      const comment = $('#comment').val().trim();
  
      if (nama && status && comment) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ nama, status, comment });
  
        localStorage.setItem('comments', JSON.stringify(comments));
        displayComments();
        $('#rsvp-comment-form')[0].reset(); // Reset form
      } else {
        alert('Mohon lengkapi semua kolom sebelum mengirim.');
      }
    });
  
    displayComments(); // Tampilkan komentar saat halaman dimuat
  });