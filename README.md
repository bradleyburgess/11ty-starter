# 11ty starter

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Essential next steps](#essential-next-steps)
- [Usage](#usage)
  - [Shortcodes](#shortcodes)
  - [OpenGraph](#opengraph)

## Overview

This is my [11ty](https://11ty.dev) starter template, with some useful plugins,
scripts, and so on out of the box.

## Features

This starter / template doesn't aim to be a total one-stop-shop, but it does
attempt to include an array of common and useful features out-of-the-box:

- [Nunjucks](https://mozilla.github.io/nunjucks/api.html) (but you could easily 
  modify it to use Liquid or something else)
- bundled and minified (S)CSS and JS, using 
  [Parcel.js](https://parceljs.org)
- minimized HTML in production, using 
  [`html-minifier`](https://www.npmjs.com/package/html-minifier)
- image optimization with 
  [`eleventy-img`](https://www.11ty.dev/docs/plugins/image/) shortcode
- generated OpenGraph meta and image tags
- optimized favicons using 
  [`eleventy-plugin-gen-favicons`](https://www.npmjs.com/package/eleventy-plugin-gen-favicons)
- checking for broken links using 
  [`eleventy-plugin-broken-links`](https://www.npmjs.com/package/eleventy-plugin-broken-links)
- code linting with `eslint` and formatting with `prettier`
- convenient `dev` and `build` npm scripts
- GitHub action for checking Lighthouse scores after build, including
  caching of `yarn` dependencies and built output
- dependabot pull requests for dependency updates

## Getting Started

1. Click "Use this template" above
2. `git clone` the repo locally
3. `yarn` to install dependencies
4. `yarn start` to start local development
5. `yarn build` to build for production

## Essential next steps

1. Edit the `sitemeta.json` file in `src/_data` and add your details
   - title
   - url (production)
   - twitter handle
   - author
   - description
   - favicon
2. Place your favicon in the `src/img` directory
3. Make sure the correct filename is specified in the `sitemeta.json`. 
   (This filename should be relative to the project directory, 
   e.g. `./src/img/favicon.svg`)

## Usage
### Shortcodes

There are some useful shortcodes out of the box.

### `image`

This is used for local or remote image optimiztion with `eleventy-img`. 

The syntax is:

```njk
{% image "src", "alt" %}
```

NOTE: `src` is relative to `./src/img`. All images should be placed in this 
directory. Sub-directories are allowed, but you must specify them when using 
the `image` shortcode.

E.g.:

```njk
{% image "foo/bar.jpg", "alt" %}
```

... will source an image located at `./src/img/foo/bar.jpg`.

All images are outputted to `dist/img`, regardless of which sub-directory they
are in, if any.

Optionally, you can specify further options, including:

| Option    | Default                               | Accepted                   | Description                                       |
| --------- | ------------------------------------- | -------------------------- | ------------------------------------------------- |
| `formats` | `['webp', 'avif', 'jpg']`             | Array of formats           | Specify which formats to output                   |
| `loading` | `"lazy"`                              | `"lazy"` or `"eager"`      | whether to use lazy loading                       |
| `sizes`   | `["100vw"]`                           | Array of media query sizes | Specify sizes of media query sizes used on screen |
| `widths`  | `[600, 1200, 1800, 2400, 4200, null]` | array of pixel sizes       | Sizes to output                                   |

You can use any or all of the options by passing them after the required `src` 
and `alt` values:

```njk
{% image "example.jpg", "An example image", loading="eager", widths=[600] %}
```

### `ogimage`

This shortcode is used to add the OpenGraph image meta tags.

```njk
{% ogimage "src", "alt" %}
```

This feature can be used via variables in frontmatter or in `.njk` templates:

```md
---
layout: 'layouts/example.njk'
og_image:
  src: 'example.jpg'
  alt: 'The alt text'
---
```

`width` and `format` can be set in `11ty/constants/settings.js`.

### OpenGraph

OpenGraph meta tags are set using the `ogimage` shortcode (as above), and by
setting the `title` and `description` variables in frontmatter or elsewhere.

```md
---
layout: foo.njk
title: "Page title"
description: "An example page"
og_image:
  src: example.jpg
  alt: "the image alt"
---

This is an example page with OG meta tags.
```
