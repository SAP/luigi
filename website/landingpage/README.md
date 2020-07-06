[![Netlify Status](https://api.netlify.com/api/v1/badges/bc94a377-3681-456e-9318-a915b71038b9/deploy-status)](https://app.netlify.com/sites/dazzling-roentgen-7c50f8/deploys)

Luigi landingpage, deployed via netlify and accessible at https://luigi-project.io


## Blog entry creation

Create a .md file in /blog with schema: `YYYY-MM-DD-page-slug.md`

Front Matter data allows to set SEO title, description as well as author (can be single or list). Layout must be `blog`.
Excerpt content for overview page is separated with `<!-- Excerpt -->`.

```markdown
---
title: Our first blog entry
description: This is our first blog entry and it introduces our new blog section.
author:
  - Name 1
  - Name 2
layout: blog
---

This is a collection of advanced use cases and example implementations. If you are new to Luigi, take a look at our [Getting Started](/docs/getting-started.md) section first.
<!-- Excerpt -->

Google's `id_token` contains basic identity data like name and user ID, which allows for this data to be shown in the profile.

1. one
2. two
3. three

- another
- unordered
- list
- entry
```