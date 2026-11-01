import './sources.css';
import { SourceButton } from '../../../types/newsApi';
import { query } from '../../../utils/dom';

class Sources {
    draw(data: SourceButton[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = query<HTMLTemplateElement>(document, '#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);

            query(sourceClone, '.source__item-name').textContent = item.name;
            query(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        query(document, '.sources').append(fragment);
    }
}

export default Sources;
