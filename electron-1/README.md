# Electron 1
## Goal
Define `window.bx` global in the main window with the following signature:
```typescript
window.bx = {
  /**
   * Returns a promise resolving to the actual name of this challenge.
   * @see https://github.com/electron/electron/blob/master/docs/api/app.md#appgetname
   */
  getName(): Promise<string> {
    ...
  }
  /**
   * Returns a promise resolving to the actual version of this challenge.
   * @see https://github.com/electron/electron/blob/master/docs/api/app.md#appgetversion
   */
  getVersion(): Promise<string> {
    ...
  }
}
```

*NB: You should **NOT** use the [remote](https://electronjs.org/docs/api/remote) electron API.*

## Preparation
`cd` into this directory and install its dependencies `npm i`.
Then launch the challenge through `npm run start`.
Instructions are also visible from the application itself until you solved the challenge.
