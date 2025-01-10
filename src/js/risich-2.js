// const BASE_URL = "https://the-one-api/v2/";
// const END_POINT = "character";
// const KEY = 'somebearerkey';

// function getCharacter() {
//     const param = new URLSearchParams({
//         limit: 30,
//         page: 1,
//     });
//     const option = {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${KEY}`
//         }
//     }

//     fetch(`${BASE_URL}${END_POINT}?${param}`, option)
//         .then(resp => console.log(resp))
// }

const BASE_URL = "https://api.themoviedb.org/3/";
const ENDPOINT = 'trending/movie/day';
const API_KEY = 'someapikey';
const URL_POSTERS = 'https://image.tmdb.org/t/p/w500'
const list = document.querySelector('.js-list');
const loadMore = document.querySelector('.js-load');
const target = document.querySelector('.js-guard');
let currentPage = 1;
const options = {
  root: null,
  rootMargin: "30px",
  threshold: 1.0,
};
const observer = new IntersectionObserver(onLoad, options);

loadMore.addEventListener('click', onLoad);

function onLoad() {
    currentPage += 1;
    getTrending(currentPage)
        .then(data => {
            list.insertAdjacentHTML('beforeend', createMarkup(data.results));
            
            if (data.page === data.total_pages) {
                loadMore.hidden = true;
            }
    })
    .catch(err => console.log(err));
};

function getTrending(page=1) {
    return fetch(`${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&page=${page}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
};

getTrending()
then(data => {
    list.insertAdjacentHTML('beforeend', createMarkup(data.results));
    observer.observe(target);
    if (data.page !== data.total_pages) {
        loadMore.hidden = false;
    }
})
    .catch(err => console.log(err));

function createMarkup(arr) {
    return arr.map(({ poster_path, title }) => {
        `<li>
            <img src="${URL_POSTERS}${poster_path}" alt="${title}">
            <h2>${title}</h2>
        </li>`
    }).join('')
};

function onLoad(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            currentPage += 1;
            getTrending(currentPage)
            .then(data => {
                list.insertAdjacentHTML('beforeend', createMarkup(data.results));
                if (data.page === data.total_pages) {
                    observer.unobserve(target)
                }
            }
    )
            .catch(err => console.log(err));
        }
    });
}

