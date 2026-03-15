# Open Preview Peek

![Open Preview Peek](./readme-assets/main.png)

A browser extension that lets you quickly check how a webpage's Open Graph and Twitter metadata would be displayed when links to the page are posted on various social media platforms and messaging apps. Meant to help with web development and debugging, ideal for use when developing web apps locally. Similar to the Open Graph preview viewer offered by Vercel for app-deployments made on the Vercel platform, except this extension works on any webpage, including when you're developing locally.

## How it works

The extension reads a webpage's `meta` tags, specifically the Open Graph (`og:*`) and Twitter (`twitter:*`) tags, and renders previews of how the page would roughly look when shared on different platforms.
Supported previews:

- X (Twitter)
- Slack
- LinkedIn
- Discord
- WhatsApp
- Code - *Shows the actual values associated with each of the concerned `meta` tags. Helps identify any missing or invalid values.*

## How do I use it?

1. Open the webpage you wish to test.
2. Open the Open Preview Peek extension popup.
3. Switch between the various tabs to inspect what each platform's preview would roughly look like.
4. Examine the `Code` tab to review the underlying property values to identify issues with your metatags.

## Theme, Settings & Hotkeys

You may switch between light and dark themes.

- Use the theme button in the footer to toggle between themes.
- Use the settings button in the footer to open the settings panel, which includes a hotkey guide and a couple of options to customize the extension's behavior.

## Use alongside local web app development

The extension is designed to be used when testing local under-development web apps as well. Values for `og:image` and `twitter:image`, for example, may be URLs with either the `https` protocol, or with `http` as long as the host is `localhost` (all other kinds of `http` URLs are blocked).

## Working with the source code

1. You'll need [bun](https://bun.com/docs/installation).
2. Install all dependencies (`bun install`).
3. Build the popup and the content script:

    ```bash
    bun run build && bun run build:content
    ```

4. Load/reload the generated `dist` folder into your browser as an unpacked extension. You'll also have to reload any existing tabs for the built content script to be injected into them and for the extension to work on those tabs.

Run `bun run watch` to automatically rebuild the extension whenever you make changes to the source code. Any changes to the content script will require you to perform step 4 again. Changes to the popup source should reflect after a quick close-and-reopen of the popup.

## Gotchas

- The extension simply reads the webpage's `meta` tags and renders previews based on those values. It does not take into consideration whether those `meta` tags are, for example, easily accessible by web scrapers/crawlers/bots used by these platforms to render their previews (say, if the `meta` tags are added dynamically by client-side JavaScript well after initial load) -- one of many factors that determine whether the webpage's preview would actually render correctly in practice.
- Currently, `summary` and `summary_large_image` are the only supported values for the `twitter:card` property -- values `app` and `player` are not supported. If `twitter:card` is set to either `app` or `player`, the preview for X (Twitter) falls back to the `summary` card design, and a note is included under the card describing this behavior.
