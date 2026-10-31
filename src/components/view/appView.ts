import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse, SourcesResponse } from '../../types/newsApi';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Partial<NewsResponse>): void {
        const values = data?.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: Partial<SourcesResponse>): void {
        const values = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
