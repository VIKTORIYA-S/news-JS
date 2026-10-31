import './news.css';
import { Article } from '../../../types/newsApi';
import { query } from '../../../utils/dom';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = query<HTMLTemplateElement>(document, '#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = document.importNode(newsItemTemp.content, true);

            if (idx % 2) query(newsClone, '.news__item').classList.add('alt');

            query(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            query(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
            query(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            query(newsClone, '.news__description-title').textContent = item.title;
            query(newsClone, '.news__description-source').textContent = item.source.name;
            query(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = query(document, '.news');
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
