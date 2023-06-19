
# BuchWeb

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

Install BuchWeb with npm

```bash
  cd BuchWeb
  npm install
  npm run dev
```

## Changes

### Port

We changed the default Port 3000 (NextJS) to Port 3002, so that the server doesn't run on the same port as the backend.

If you run:

```
  npm run dev 
```

It runs:

```
  next dev -p 3002
```

### Turbopack

["Turbopack (beta) is an incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js."](https://nextjs.org/docs/architecture/turbopack)

#### Why should you use Turbopack?

["[...]we wanted Turbopack to bundle the code in the development server. Turbopack can do it much faster, especially for larger applications, because it is written in Rust and skips optimization work that is only necessary for production"](https://turbo.build/pack/docs/why-turbopack)
  
#### How to implement Turbopack?

Instead of running the server with:

```
  next dev -p 3002
```

We ran the server with:

```
  next dev --turbo -p 3002
```

## Project Directory Structure

````
├───.github/
│   └───workflows/
├───.next/
├───node_modules/
├───public/
│   └───book.png
└───src/
    ├───app/
    │   ├───(search)/
    │   │   ├───isbn/
    │   │   │   ├───loading.tsx
    │   │   │   ├───page.module.css
    │   │   │   └───page.tsx
    │   │   └───titel/
    │   │       ├───loading.tsx
    │   │       ├───page.module.css
    │   │       └───page.tsx
    │   ├───books/
    │   │   ├───loading.tsx
    │   │   ├───page.module.css
    │   │   └───page.tsx
    │   ├───create/
    │   │   ├───loading.tsx
    │   │   ├───page.module.css
    │   │   ├───page.tsx
    │   │   └───CreateBooks.tsx
    │   └───notes/
    │       ├───page.module.css
    │       └───page.tsx
    ├───favicon.ico
    ├───global.css
    ├───layout.tsx
    ├───login.tsx
    ├───page.module.css
    ├───page.tsx
    └───SearchBook.tsx
````

## API Reference

### Get all books

```javascript
 axios.get(`https://localhost:3000/rest/`).then((res) => {
      ...})
```
