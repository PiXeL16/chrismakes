---
title: "This Website"
description: "Chris Makes Website"
date: 2024-10-15T05:00:00Z
image: "/images/posts/this-website/this-website.webp"
categories: ["Web Development"]
authors: ["Chris J"]
tags: ["Astro", "Tailwind CSS", "JAMstack", "Performance", "Engineering"]
draft: false
---

This simple website took 2 days to put together, and it's based on very accesible and open source technologies.

Astro is a great framework for building fast, content-focused websites. It offers several key features that make it stand out:

1. **Component-Based Architecture**: Astro allows you to build your site using components from various frameworks or plain HTML/CSS/JavaScript.

2. **Static Site Generation**: By default, Astro generates static HTML, resulting in extremely fast load times and improved SEO.

3. **Partial Hydration**: Astro's "Islands" architecture allows you to selectively hydrate interactive components, keeping the overall JavaScript payload minimal.

Everything is opensource and the repo can be found [here](https://github.com/PiXeL16/chrismakes)

## Core Technologies

### Astro Framework

At the heart of this website is [Astro](https://astro.build/), a modern static site generator that offers several key advantages:

1. **Partial Hydration**: Astro allows us to ship zero JavaScript by default, hydrating components only when necessary. This significantly reduces the bundle size and improves load times.

2. **Component Islands**: We can mix and match components from various frameworks (React, Vue, Svelte) within the same page, thanks to Astro's unique architecture.

3. **Static Site Generation (SSG)**: Astro pre-renders pages at build time, resulting in lightning-fast load times and improved SEO.

### Tailwind CSS

For styling, we're using [Tailwind CSS](https://tailwindcss.com/), a utility-first CSS framework. Tailwind offers:

1. **Rapid Development**: With utility classes, we can quickly prototype and build consistent UI components.

2. **Customization**: The `tailwind.config.js` file allows us to tailor the design system to our specific needs.

3. **Optimized Output**: Tailwind's purge feature ensures that only the CSS we actually use is included in the final build.

## Performance Optimizations

### Asset Optimization

1. **Image Optimization**: Astro's built-in image optimization automatically generates responsive images and applies lazy loading.

2. **Font Subsetting**: We use [Fontsource](https://fontsource.org/) to load only the character sets we need, reducing font file sizes.

## Content Management

### Markdown and MDX

All content is written in Markdown or MDX, which offers several benefits:

1. **Ease of Writing**: Content can be created and edited without dealing with complex CMS interfaces.

2. **Version Control**: Markdown files can be easily tracked in Git, providing a history of content changes.

3. **Component Embedding**: MDX allows us to embed dynamic components within our content when needed.

### Content Collections

Astro's Content Collections feature helps us organize and validate our content:

1. **Type Safety**: We define schemas for our content, ensuring consistency and catching errors early.

2. **Automatic Routing**: Astro can generate routes based on our content structure, simplifying site architecture.

## Search Functionality

I implement search using [Fuse.js](https://fusejs.io/), a lightweight fuzzy-search library:

1. **Client-Side Search**: The search index is generated at build time and loaded on-demand, keeping initial page loads fast.

2. **Fuzzy Matching**: Fuse.js allows for typo-tolerant searches, improving the user experience.

## Build and Deployment

Our build process is automated using GitHub Actions:

1. **Continuous Integration**: Every push to the main branch triggers a new build.

2. **Environment Variables**: Sensitive data is stored securely as GitHub Secrets and injected during the build process.

3. **Deployment**: Successful builds are automatically deployed to Netlify.
