// aos
AOS.init()


// music
var tempMusic = ''
music = document.querySelector('.music')
if (tempMusic) {
    music.src = tempMusic
}

// Door Mulai
function mulai() {
    // back to top
    window.scrollTo(0, 0)

    // sound door
    var soundDoor = document.querySelector('.sound-door')
    soundDoor.play()

// door section
    var doorSection = $('#door-section')
    var doors = document.querySelectorAll('.door')
    doors.forEach(function (door, index) {
        var direction = (index === 0) ? -1 : 1
        door.style.transform = 'rotateY(' +(79 * direction) + 'deg)'
    })

// set Timeout
setTimeout(function () {
    // music play
    music.play()
    doorSection.css('transform', 'scale(6)')
}, 600)

// Set timeout door
setTimeout(function () {
    doorSection.css('opacity', 0)
    $('body').removeClass('overFlow-hidden')
    $('body').addClass('transition')
    doorSection.css('display', 'none')
}, 2000)
}

// button music
var isPlaying = true;


function toggleMusic(event) {
  event.preventDefault();
  const musicButton = document.getElementById('music-button');

  if (isPlaying) {
    musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>';
    musicButton.classList.remove('rotate');
    musicButton.style.transform = 'translateY(0)'
    music.pause();
  } else {
    musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>';
    musicButton.classList.add('rotate');
    music.play();
  }

  isPlaying = !isPlaying;
}


// countdown
var countdownDate = new Date("may 16, 2025 09:00:00").getTime()

var x =setInterval(function () {
  var now = new Date().getTime()

  var distance = countdownDate - now

  var days = Math.floor(distance / (1000 * 60 * 60 * 24))
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24))/ (1000 * 60 * 60))
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((distance % (1000 * 60)) / 1000)

  document.getElementById('countdown-wedding').innerHTML = `
        <div class="col-lg-1  col-3"><div class="text-center p-2 rounded text-light"><h5>${days}</h5> Hari</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${hours}</h5> Jam</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${minutes}</h5> Menit</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${seconds}</h5> Detik</div></div>`

  if (distance < 0) {
    clearInterval(x)
    document.getElementById('countdown-wedding').innerHTML = "<span class='text-center p-3 rounded text-light m-2'><h2>Sudah dimulai!</h2></span>"
  }
}, 1000)

// nama sambutan
const urlParams = new URLSearchParams(window.location.search)
const panggilan = urlParams.get('p')
const nama = urlParams.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')
namaSambutan.innerText = `${panggilan} ${nama},`

// copy text
function copyText(el) {
  // Cari elemen nomor rekening dari parent
  const cardNumberElement = el.closest('.credit-card').querySelector('.card-number');
  const content = cardNumberElement.innerText.trim().replace(/\s+/g, '');

  // Salin ke clipboard menggunakan Clipboard API (lebih modern)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(content).then(() => {
      // Feedback sukses
      el.innerHTML = '<i class="fas fa-check"></i> Berhasil disalin!';
      setTimeout(() => {
        el.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
    }).catch(err => {
      console.error('Gagal menyalin teks: ', err);
    });
  } else {
    // Fallback untuk browser lama
    const temp = document.createElement('textarea');
    document.body.appendChild(temp);
    temp.value = content;
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);

    // Feedback sukses
    el.innerHTML = '<i class="fas fa-check"></i> Berhasil disalin!';
    setTimeout(() => {
      el.innerHTML = '<i class="fas fa-copy"></i> Copy';
    }, 2000);
  }
}


// rsvp Section
window.addEventListener("load", function() { 
  const form = document.getElementById('rsvp-form');
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const status = document.getElementById('status').value;
    const nama = document.getElementById('nama').value.trim();

    if (nama === "") {
      Swal.fire({
        icon: "error",
        text: "Nama Harus Diisi"
      });
      return;
    }

    if (status == "0") {
      Swal.fire({
        icon: "error",
        text: "Pilih salah satu status terlebih dahulu!"
      });
      return;
    }

    const data = new FormData(form);
    const action = e.target.action;
    const input = form.querySelectorAll('input, select, button');
    input.forEach(input => {
      input.disabled = true;
    });

    fetch(action, {
      method: 'POST',
      body: data
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "Konfirmasi kehadiran Anda berhasil terkirim!"
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        text: error
      });
    })
    .finally(() => {
      input.forEach(input => {
        input.disabled = false;
      });
    });
  });
});

$(document).ready(function() {
  // Load komentar yang tersimpan
  loadComments();
  
  // Handle form submission
  $('#commentForm').submit(function(e) {
      e.preventDefault();
      const commentText = $('#commentInput').val().trim();
      
      if(commentText) {
          addComment(commentText);
          $('#commentInput').val(''); // Clear input
      }
  });
});

function addComment(text) {
  const timestamp = new Date().toLocaleString();
  const commentHTML = `
      <div class="comment-item">
          <p>${text}</p>
          <small>${timestamp}</small>
      </div>
  `;
  
  // Simpan ke localStorage
  saveCommentToStorage({ text, timestamp });
  
  // Tampilkan komentar
  $('#commentsContainer').prepend(commentHTML);
}

function saveCommentToStorage(comment) {
  let comments = JSON.parse(localStorage.getItem('invitationComments') || '[]');
  comments.push(comment);
  localStorage.setItem('invitationComments', JSON.stringify(comments));
}

function loadComments() {
  const comments = JSON.parse(localStorage.getItem('invitationComments') || '[]');
  comments.forEach(comment => {
      $('#commentsContainer').prepend(`
          <div class="comment-item">
              <p>${comment.text}</p>
              <small>${comment.timestamp}</small>
          </div>
      `);
  });
}
