const url = 'https://api.themoviedb.org/3/';
const key = 'c67d750d553f2a633ba6465ef442abb8';

$(document).ready(function () {
  $(window).on('scroll', () => {
    if (window.scrollY > 70) {
      $('header').addClass('header-active');
    } else {
      $('header').removeClass('header-active');
    }
  });

  //   function heroMovie() {
  //     $.ajax({
  //       url: `${url}/discover/movie?api_key=${key}`,
  //       success: function ({ results }) {
  //         // $('.hero-detail h1').text(results[0].original_title);
  //         // $('.hero-img img').attr(
  //         //   'src',
  //         //   `https://image.tmdb.org/t/p/w500${results[0].poster_path}`
  //         // );
  //         // $('.hero-desc').text(results[0].overview);
  //       },
  //     });
  //   }

  function listMovie() {
    $.ajax({
      url: `${url}/discover/movie?api_key=${key}`,
      success: function ({ results }) {
        render(results);
        console.log(results);
      },
    });
  }

  function createElement(movie) {
    return $('.movies').append(`
    <div class="movies-item" data-id=${movie.id}>
        <div class="movie-card">
            <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt="thumb"
            class="movie-thumb"
            />
            <div class="rate"><span>IMDB</span> 7.5</div>
            <div class="movie-card-title">${movie.original_title}</div>
        </div>
    </div>
    `);
  }

  function render(data) {
    data.forEach((movie) => {
      createElement(movie);
    });

    $('.movies-item').click(function () {
      const id = $(this).data('id');
      $.ajax({
        url: `${url}/movie/${id}?api_key=${key}`,
        success: function (res) {
          getVideo(id);
          $('.modal').fadeIn();
          $('#modal-title').text(res.original_title);
          $('#modal-desc').text(res.overview);
        },
      });
    });

    $('.close-btn').click(function () {
      $('iframe').removeAttr('src');
      $('.modal').fadeOut();
    });
  }

  function getVideo(id) {
    $.ajax({
      url: `${url}/movie/${id}/videos?api_key=${key}`,
      success: function ({ results }) {
        console.log(results[results.length - 1]);
        $('iframe').attr(
          'src',
          `https://www.youtube.com/embed/${results[results.length - 1].key}`
        );
      },
    });
  }
  //   heroMovie();
  listMovie();
});
