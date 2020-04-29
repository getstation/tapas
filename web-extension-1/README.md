# Web Extensions communication layer
Objective: implement real-time inter-process communication between some processes that are available in a Web Extension.

## Challenge
Replace the content of any page with a counter showing in real time how many time the extension popup has been opened.

### Important concepts to get started
If you are not familiar with what a Web Extension looks likes architecturaly speaking,
start by reading [Anatomy of an extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension).
It will introduce concepts such as
[background scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_scripts),
[content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts)
and [popups](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Popups)
which will be necessary to solve this challenge.

This challenge heavily relies on asynchronous communications between each processes of an Extension.
For that, you will mainly need to leverage [communications with background scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#Communicating_with_background_scripts)

This repository is based on the [Browser Extensions standard](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions).
As Chrome doesn't officialy support this API yet, we use [a polyfill developped by Mozilla](https://github.com/mozilla/webextension-polyfill)
in order to have a common codebase for all browsers.

### Constraints
- Clicking the Extension icon should open the popup (already done in this boilerplate)
- When the popup opens-up, it should increment a counter (named **C**) that will be available by any content script.
Hint: store the data through the [background page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background)
- When navigating to any web page, its content must be replaced by the following value:
`Popup opened <C> times`, with `<C>` being our **C** counter value.
- When the popup opens-up, if any page have the counter currently shown up, it's value should be updated in real-time.
For this a solution involving a subscription mechanism is preferable.

## Preparation
```sh
cd tapas/web-extension-1

# Install dependencies
npm install

# Run the app
npm start
```

## Where are things?
- `src` contains all business logic. This is where you will add/update files
  - `background/background.ts` entrypoint of the background script
  - `content_script/content_script.ts` entrypoint of the content script
  - `popup/popup.tsx` entrypoint of the popup UI logic
  - `popup/popup.html` entrypoint of the popup UI template
- `webpack` different webpack configs to ease development of the extension
- `tsconfig.json` puts in place the Typescript config that we are using at Station
- `.eslintrc` puts in place the linting rules that we are using at Station

NB: The extension supports hot reload, so the extension should refresh itself in dev mode

NB2: Prettier is also installed, you are invited to use it 😉

NB3: By default, it starts Chrome browser for development, by you can edit the `start` script to start Firefox instead

### How to debug
In Chrome: https://developer.chrome.com/extensions/tut_debugging

In Firefox: https://extensionworkshop.com/documentation/develop/debugging/

## Resources for Web Extensions
- [WebExtensions complete documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) - First documentation entry point
- [A lightweight polyfill library for Promise-based WebExtension APIs in Chrome](https://github.com/mozilla/webextension-polyfill) - Used in this challenge so that Firefox and Chrome use the same API ([the Browser Extensions standard](https://browserext.github.io/browserext/))
- [Chrome Extensions documentation](https://developer.chrome.com/extensions/devguide) - Sometimes the WebExtension typing does not perfectly match Chrome API signature. This helps to find the actual signature
