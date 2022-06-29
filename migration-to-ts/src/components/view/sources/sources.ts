import './sources.css';

interface Data {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    country: string;
    language: string;
}

class Sources {
    draw(data: Data[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone: HTMLElement | Node = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true);

            ((sourceClone as HTMLElement).querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            ((sourceClone as HTMLElement).querySelector('.source__item') as HTMLElement).setAttribute(
                'data-source-id',
                item.id
            );

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
