//@ts-nocheck
// i do not know how TS works for typing, sorry.
import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = 'https://gogoanime.film/';
const Genres = [
    'action',
    'adventure',
    'cars',
    'comedy',
    'crime',
    'dementia',
    'demons',
    'drama',
    'dub',
    'ecchi',
    'family',
    'fantasy',
    'game',
    'gourmet',
    'harem',
    'hentai',
    'historical',
    'horror',
    'josei',
    'kids',
    'magic',
    'martial-arts',
    'mecha',
    'military',
    'Mmusic',
    'mystery',
    'parody',
    'police',
    'psychological',
    'romance',
    'samurai',
    'school',
    'sci-fi',
    'seinen',
    'shoujo',
    'shoujo-ai',
    'shounen',
    'shounen-ai',
    'slice-of-Life',
    'space',
    'sports',
    'super-power',
    'supernatural',
    'suspense',
    'thriller',
    'vampire',
    'yaoi',
    'yuri',
    'isekai',
];

export const scrapeGenre = async({ list = [], genre, page = 1 }) => {
    try {
        genre = genre.trim().replace(/ /g, '-').toLowerCase();

        if (Genres.indexOf(genre) > -1) {
            const genrePage = await axios.get(`${BASE_URL}genre/${genre}?page=${page}`);
            const $ = cheerio.load(genrePage.data);

            $('div.last_episodes > ul > li').each((i, elem) => {
                list.push({
                    animeId: $(elem).find('p.name > a').attr('href').split('/')[2],
                    animeTitle: $(elem).find('p.name > a').attr('title'),
                    animeImg: $(elem).find('div > a > img').attr('src'),
                    releasedDate: $(elem).find('p.released').text().replace('Released: ', '').trim(),
                    animeUrl: BASE_URL + '/' + $(elem).find('p.name > a').attr('href'),
                });
            });
            return list;
        }
        return { error: 'Genre Not Found' };
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};