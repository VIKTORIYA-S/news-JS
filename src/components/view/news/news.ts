import './news.css';
import { Article } from '../../../types/newsApi';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = this.query<HTMLTemplateElement>(document, '#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = document.importNode(newsItemTemp.content, true);

            if (idx % 2) this.query(newsClone, '.news__item').classList.add('alt');

            this.query(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            this.query(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
            this.query(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            this.query(newsClone, '.news__description-title').textContent = item.title;
            this.query(newsClone, '.news__description-source').textContent = item.source.name;
            this.query(newsClone, '.news__description-content').textContent = item.description;
            this.query(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = this.query(document, '.news');
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }

    private query<T extends HTMLElement = HTMLElement>(parent: ParentNode, selector: string): T {
        const element = parent.querySelector<T>(selector);
        if (element === null) {
            throw new Error(`Element not found: ${selector}`);
        }
        return element;
    }
}

export default News;
