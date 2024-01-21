# live-stream-scrape

This is a small implementation of a Next.js API that allows you to check if a streamer is live on Youtube or Twitch. This API was designed to be used to allow dynamic image generation when working with App Inventor.

## Usage

This app exposes the following two routes.

### `/api/[streamer]/twitch`

Returns a Twitch logo if the streamer is live, otherwise returns an empty image.

### `/api/[streamer]/youtube`

Returns a Youtube logo if the streamer is live, otherwise returns an empty image.

## Image Caching Circumvention

The best way to get around image caching when using something like App Inventor is to simply add a redundant query parameter to your image:

```js
img.src = `https://live-stream-scrape.vercel.app/?${Date.now()}`;
```
