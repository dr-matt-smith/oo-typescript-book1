# Chapter 9, challenge 2 - Move down (teacher's solution)

A tested Playlist.moveDown method and a down-arrow button on every song.

Made from `ch09_project02_playlist`. Every change is marked with a `CHALLENGE 2` comment - search for `CHALLENGE` to find them.

## Running it

Open the project in Celbridge. The console at the bottom starts by itself, and runs `deno task dev`:

1. **builds** `src/` (TypeScript) and `public/` (HTML, CSS, images) into `dist/`
2. **tests** everything in `tests/`, printing the results in the console (in TAP format) and writing a
   readable report to `test_output/index.html` (and `test_output/summary.md`)
3. **watches** - every time you save a file in `src/`, `public/` or `tests/`, it does it all again

`dist/index.html` opens beside the console. After a rebuild, its preview's **refresh** button lights
up - press it to see your changes. The clipboard icon opens the test report.

The console's buttons: rebuild-and-watch, build once, test once, and lint. To use them while the
watcher is running, press **Ctrl+C** first to stop it.

No server is needed: `dist/` is a plain web page, so you can also open `dist/index.html` in any browser.

## What to look at

- `src/Playlist.ts` - a Playlist has Songs: a private array, copied in the constructor and copied
  again by `getSongs()`, whose return type is `readonly Song[]`
- `src/Song.ts` - every field `readonly`, so one Song object can be shared by the library and any
  playlist
- `tests/playlist.test.ts` - the last two tests catch the aliasing bugs: changing the array from
  `getSongs`, or the array given to the constructor, must not change the playlist
- `src/library.ts` - JSON data turned into Song objects with `map`
