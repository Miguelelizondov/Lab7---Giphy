const API_KEY = 'nbqUY5ARP9z1QnlcnhNTFd6zDACBkvzE';

$(document).ready(function () {
  const temas = ['Futbol', 'Formula 1', 'Anime', 'Animals', 'Piano'];
  const divTemasButtons = document.getElementById('animal-buttons');
  const form = document.getElementById('tema-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const temaNuevo = document.getElementById('tema-input').value;
    temas.push(temaNuevo);
    $('#temas-buttons').empty();
    temas.forEach(createButton);
  });
  temas.forEach(createButton);
});

const createButton = (tema) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'giphyButton';
  button.id = tema + 'button';
  button.innerHTML = 'Press me for ' + tema;

  button.addEventListener('click', () => {
    searchTema(tema);
  });
  $('#temas-buttons').append(button);
};
const createImages = (request) => {
  const container = document.createElement('div');
  const image = document.createElement('img');
  const title = document.createElement('h4');
  const rating = document.createElement('p');
  const imageURL = request['images']['fixed_height_still']['url'];
  const gifURL = request['images']['fixed_height']['url'];
  image.className = 'giphyImage';
  image.setAttribute('moving', 'false');
  title.innerHTML = 'Title: ' + request['title'];
  rating.innerHTML = 'Rating: ' + request['rating'];
  image.src = imageURL;
  image.addEventListener('click', () => {
    if (image.getAttribute('moving') == 'false') {
      image.setAttribute('moving', 'true');
      image.src = gifURL;
    } else {
      image.setAttribute('moving', 'false');
      image.src = imageURL;
    }
  });
  container.append(title);
  container.append(rating);
  container.append(image);
  $('#temas').append(container);
};
const searchTema = (tema) => {
  $('#temas').empty();
  const request = $.get(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${tema}&limit=10`,
  );
  request.done(function (data) {
    console.log(data.data.forEach(createImages));
  });
};
