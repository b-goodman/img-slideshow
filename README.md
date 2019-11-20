# img-slideshow

A custom element for displaying a transitioning slideshow of images.

```html
<!DOCTYPE html>
<html>
<head>
    <title>img-slideshow</title>
    <script type="module" src="./dist/index.js"></script>
</head>

<body>
    <img-slideshow base-url="https://picsum.photos" src='["/id/100/200/300", "/id/101/200/300", "/id/102/200/300"]' interval="3000" />
</body>

</html>
```

## Attributes

### `src`

String JSON array of URLs to use as image sources.

```html
src='["https://picsum.photos/id/100/200/300", "https://picsum.photos/id/101/200/300", "https://picsum.photos/id/102/200/300"]'
```

### `base-url`

Optionally specify a common root for each URL in `src`.

```html
<img-slideshow base-url="https://picsum.photos" src='["/id/100/200/300", "/id/101/200/300", "/id/102/200/300"]' />
```

is equivalent to

```html
<img-slideshow src='["https://picsum.photos/id/100/200/300", "https://picsum.photos/id/101/200/300", "https://picsum.photos/id/102/200/300"]' \>
```

### `interval`

Set the time between slide transitions (ms).
Defaults to `2000`.

## Events

### `"slidetransition"`

Emitted on transitioning to the next slide.

Handler callback has signature

```typescript
(e: {prevSlideIndex: number, newSlideIndex: number, totalSlides: number}) => void
```

## Methods

### `nextSlide(): void`

Advances the slideshow to the next slide, emmiting event `"slidetransition"` on transition.

### `prevSlide(): void`

Moves the slideshow back to show the previous slide.

### `goto(slideIndex: number): void`

Advances the slideshow to show the ith slide, using the indices of the `src` array starting from `0`.
Negative indices will count back from the last slide.

### `stop(): void`

Stops the slideshow.

### `start(): void`

(Re)starts the slideshow.
