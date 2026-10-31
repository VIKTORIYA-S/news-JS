export type RequestOptions = Record<string, string>;
export enum HttpMethod {
    GET = 'GET',
}

export type Callback<T> = (data: T) => void;

export interface GetRespParams {
    endpoint: string;
    options?: RequestOptions;
}

class Loader {
    private baseLink: string;
    private options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: GetRespParams,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: HttpMethod, endpoint: string, callback: Callback<T>, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
