export function query<T extends HTMLElement = HTMLElement>(parent: ParentNode, selector: string): T {
    const element = parent.querySelector<T>(selector);
    if (element === null) {
        throw new Error(`Element not found: ${selector}`);
    }
    return element;
}
