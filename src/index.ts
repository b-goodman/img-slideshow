import setAttributeTuples from "set-attribute-tuples";
import style from "./index.scss";

enum Attributes {
    src = "src",
    interval = "interval",
    baseUrl = "base-url",
}

export default class ImgSlideshow extends HTMLElement {
    static get observedAttributes() {
        return Object.keys(Attributes);
    }

    constructor() {
        super();

        this.slideElements = this.src.map( ( url, index ) => {
            const slide = document.createElement("img");
            const id = index.toString();
            setAttributeTuples(slide, [ ["src", this.baseUrl ? this.baseUrl+url : url], ["key", id], ["id", id], ["class", `${index == 0 ? "visible" : ""}`] ]);
            return slide;
        });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>${style}</style>
        `;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.slideElements.forEach( el => shadowRoot.appendChild(el) );
    }

    get src(): string[] {
        return JSON.parse(this.getAttribute(Attributes.src) || "[]")
    }

    set src(newSrc: string[]) {
        this.setAttribute(Attributes.src, JSON.stringify(newSrc));
    }

    get interval(): number {
        return parseInt(this.getAttribute(Attributes.interval) || "2000");
    }

    set interval(newInterval: number) {
        this.setAttribute(Attributes.interval, newInterval.toString())
    }

    get baseUrl(): string | undefined {
        return this.getAttribute(Attributes.baseUrl) || undefined;
    }

    set baseUrl(newBaseUrl: string | undefined) {
        this.setAttribute(Attributes.baseUrl, newBaseUrl || "");
    }

    // attributeChangedCallback(name: string, _oldVal: string, newVal: string) {}

    connectedCallback() {
        this.start();
    }

    disconnecetdCallback() {
        clearInterval(this.intervalID)
    }

    public start = () => {
        this.intervalID = window.setInterval( this.nextSlide, this.interval);
    }

    public stop = () => {
        window.clearInterval(this.intervalID)
    }

    public nextSlide = () => {
        const totalSlides = this.src.length;
        const prevSlideIndex = this.currentSlideIndex;
        const newSlideIndex = (prevSlideIndex + 1) % totalSlides;
        const prevSlide = this.slideElements[prevSlideIndex];
        prevSlide.classList.remove("visible");
        const nextSlide = this.slideElements[newSlideIndex];
        nextSlide.classList.add("visible");
        this.currentSlideIndex = newSlideIndex;
        this.slideTransitionHandler({prevSlideIndex, newSlideIndex, totalSlides})
    }

    private intervalID?: number;
    private currentSlideIndex: number = 0;
    private slideElements: Array<HTMLImageElement>;

    private slideTransitionHandler(slideIndices:{prevSlideIndex:number, newSlideIndex:number, totalSlides:number,}){
        this.dispatchEvent(new CustomEvent("slidetransition", {composed: true, bubbles: true, detail: slideIndices}));
    }

}

window.customElements.define("img-slideshow", ImgSlideshow);

