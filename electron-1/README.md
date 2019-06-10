# Electron and injected APIs
The objective of this challenge is to declare and implement a new API on the Window object in an Electron application.

## Challenge
Define `window.bx` global in the main window with the following signature:
```typescript
window.bx = {
  /**
   * Returns a promise resolving to the actual name of this electron application.
   * @see https://github.com/electron/electron/blob/master/docs/api/app.md#appgetname
   */
  getName(): Promise<string> {
    // Value should come from `electron.app.getName()`
    ...
  }
  /**
   * Returns a promise resolving to the actual version of this electron application.
   * @see https://github.com/electron/electron/blob/master/docs/api/app.md#appgetversion
   */
  getVersion(): Promise<string> {
    // Value should come from `electron.app.getVersion()`
    ...
  }
}
```
_Instructions are also visible from the application itself until you solved the challenge._

## Constraints

- You are **NOT** allowed to enable `nodeIntegration` flag
- You are **NOT** allowed to use the [remote](https://electronjs.org/docs/api/remote) electron API

## Preparation

```sh
cd tapas/electron-1

# Install dependencies
npm install

# Run the app
npm start
```

## Resources for Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs
