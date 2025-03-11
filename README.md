<div align="center">

![cli-html Logo](assets/logo.svg)

# cli-html

[![Made with love](assets/badge-made-with-love.svg)](https://github.com/mistweaverco/cli-html-node/graphs/contributors)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/mistweaverco/cli-htmlnode?style=for-the-badge)](https://github.com/mistweaverco/cli-html-node/releases/latest)

[Usage](#usage) • [How it works](#how-it-works) • [Honroable Mentions](#honroable-mentions)

<p></p>

Render HTML in the Terminal.

Supports some fancy stuff and has TypeScript support.

<p></p>

</div>

## Usage

```sh
npm i @mistweaverco/cli-html
```

```js
import cliHtml from '@mistweaverco/cli-html';

const html = `
<h1>Hello World</h1>
`

console.log(cliHtml(html));
```

## How it works

cli-html uses [chalk](https://www.npmjs.com/package/chalk) to style the output.

We're purposely stuck on v4.0.1,
because this version supports `chalk` to be bundled with the package.

This way you can completly bundle the package and use it in your CLI applications.

## Honroable Mentions

- [cli-html](https://www.npmjs.com/package/cli-html)

This package was based-off `cli-html`,
but we wanted TypeScript support and also it being able to be fully bundled.

The orginal one relied on some packages that did not make this possible.

Also the original package says that it's not supported/maintained anymore.

- [chalk](https://www.npmjs.com/package/chalk)

We couldn't have done this without `chalk`.

- [parse5](https://www.npmjs.com/package/parse5)

Does all the heavy lifting for parsing the HTML.
