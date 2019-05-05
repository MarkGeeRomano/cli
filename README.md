# Music Collection

## Starting the CLI
There are executable files for mac, linux, and win included in the repo in `bin.zip`. You can simply click those or use `npm start`. Shouldn't need to `chmod`. There is no need for `npm i` unless you want to run tests.

## A note about tests
The integrated tests use child processes to pipe stdin into the spawned CLIs. AVA tests run concurrently, and I think that's jamming up the tests when they all run at once. I've added a `skip` to all tests but the first, and you can remove one `skip` at a time if you'd like to check each test. They will pass this way, otherwise they hang.

To test, run `npm test`.

## Other
Great challenge! :D

Executables packaged with the very awesome [`pkg`](https://github.com/zeit/pkg)