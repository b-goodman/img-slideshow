declare class ImgSlideshow extends HTMLElement {
    static get observedAttributes(): string[];
    constructor();
    get src(): string[];
    set src(newSrc: string[]);
    get interval(): number;
    set interval(newInterval: number);
    get baseUrl(): string | undefined;
    set baseUrl(newBaseUrl: string | undefined);
    connectedCallback(): void;
    disconnecetdCallback(): void;
    start: () => void;
    stop: () => void;
    nextSlide: () => void;
    private intervalID?;
    private currentSlideIndex;
    private slideElements;
    private slideTransitionHandler;
}

export default ImgSlideshow;
