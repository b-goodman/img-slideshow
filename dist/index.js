function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var src = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sets multiple attributes to an Element.
 * @param el The Element to set.
 * @param attributeTuples An array of string tuples representing the attribute name and intended value.
 */
var setAttributeTuples = function (el, attributeTuples) {
    attributeTuples.forEach(function (tuple) {
        el.setAttribute(tuple[0], tuple[1]);
    });
    return el;
};
exports.default = setAttributeTuples;
});

var setAttributeTuples = unwrapExports(src);

var css = ":host{display:block}img{position:absolute;left:0;top:0;opacity:0;z-index:1;-webkit-transition:opacity 1s;-moz-transition:opacity 1s;-o-transition:opacity 1s;transition:opacity 1s}.visible{opacity:1;z-index:2}";

var Attributes;
(function (Attributes) {
    Attributes["src"] = "src";
    Attributes["interval"] = "interval";
    Attributes["baseUrl"] = "base-url";
})(Attributes || (Attributes = {}));
class ImgSlideshow extends HTMLElement {
    constructor() {
        super();
        this.start = () => {
            this.intervalID = window.setInterval(this.nextSlide, this.interval);
        };
        this.stop = () => {
            window.clearInterval(this.intervalID);
        };
        this.nextSlide = () => {
            const totalSlides = this.src.length;
            const prevSlideIndex = this.currentSlideIndex;
            const newSlideIndex = (prevSlideIndex + 1) % totalSlides;
            const prevSlide = this.slideElements[prevSlideIndex];
            prevSlide.classList.remove("visible");
            const nextSlide = this.slideElements[newSlideIndex];
            nextSlide.classList.add("visible");
            this.currentSlideIndex = newSlideIndex;
            this.slideTransitionHandler({ prevSlideIndex, newSlideIndex, totalSlides });
        };
        this.currentSlideIndex = 0;
        this.slideElements = this.src.map((url, index) => {
            const slide = document.createElement("img");
            const id = index.toString();
            setAttributeTuples(slide, [["src", this.baseUrl ? this.baseUrl + url : url], ["key", id], ["id", id], ["class", `${index == 0 ? "visible" : ""}`]]);
            return slide;
        });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>${css}</style>
        `;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.slideElements.forEach(el => shadowRoot.appendChild(el));
    }
    static get observedAttributes() {
        return Object.keys(Attributes);
    }
    get src() {
        return JSON.parse(this.getAttribute(Attributes.src) || "[]");
    }
    set src(newSrc) {
        this.setAttribute(Attributes.src, JSON.stringify(newSrc));
    }
    get interval() {
        return parseInt(this.getAttribute(Attributes.interval) || "2000");
    }
    set interval(newInterval) {
        this.setAttribute(Attributes.interval, newInterval.toString());
    }
    get baseUrl() {
        return this.getAttribute(Attributes.baseUrl) || undefined;
    }
    set baseUrl(newBaseUrl) {
        this.setAttribute(Attributes.baseUrl, newBaseUrl || "");
    }
    connectedCallback() {
        this.start();
    }
    disconnecetdCallback() {
        clearInterval(this.intervalID);
    }
    slideTransitionHandler(slideIndices) {
        this.dispatchEvent(new CustomEvent("slidetransition", { composed: true, bubbles: true, detail: slideIndices }));
    }
}
window.customElements.define("img-slideshow", ImgSlideshow);

export default ImgSlideshow;
