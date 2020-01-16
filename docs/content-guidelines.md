# Content Guidelines

This page contains instructions on how to create documentation for Luigi. It defines the rules for each of these topics:
* [Structure](#structure)
* [Metadata](#metadata)
* [Audience and language](#audience-and-language)
* [Format](#format)
* [Links](#links)
* [Screenshots and diagrams](#screenshots-and-diagrams)
* [Glossary](#glossary)

## Overview

Luigi documentation is written in Markdown and stored on GitHub. The Markdown files are then rendered on the main documentation page using Sapper. Find more about what GitHub-flavored Markdown is [here](https://github.github.com/gfm).

Documentation resides in the `luigi/docs` folder in the [Luigi repository](https://github.com/SAP/luigi).

## Structure

Documentation on the Luigi website follows the structure below. When adding a new document, you need to place it into one of the five main categories depending on its topic.

### Basics

- [Getting started](getting-started.md)
- [Architecture](luigi-architecture.md)

### Luigi Core

- [Installation](application-setup.md)
- [Basic navigation](navigation-configuration.md)
- [Advanced navigation](navigation-advanced.md)
- [Navigation parameters reference](navigation-parameters-reference.md)
- [Authorization](authorization-configuration.md)
- [Authorization events](authorization-events.md)
- [General settings](general-settings.md)
- [Lifecycle hooks](lifecycle-hooks.md)
- [UI features](luigi-ux-features.md)
- [API](luigi-core-api.md)

### Luigi Client

- [Installation](luigi-client-setup.md)
- [API](luigi-client-api.md)

### Advanced

- [Custom messages](communication.md)

### Examples

- [Angular](https://github.com/SAP/luigi/tree/master/core/examples/luigi-example-angular)
- [Vue](https://github.com/SAP/luigi/tree/master/core/examples/luigi-example-vue)
- [React](https://github.com/SAP/luigi/tree/master/core/examples/luigi-example-react)

## Metadata

In order to render documentation correctly on the Luigi website, you need to add metadata to the Markdown documents on GitHub.

### Navigation metadata

This type of metadata determines where to display the document in the navigation structure of the Luigi website. It must be written as a JSON object surrounded by `<!--meta` `meta-->` tags. For example:

```json
<!-- meta
{
  "node": {
    "label": "Overview",
    "category": {
      "label": "Basics"
    },
    "metaData": {
      "categoryPosition": 1,
      "position": 0
    }
  }
}
meta -->
```

### Alert blocks metadata

To draw the reader's attention to something, you can use the quote block option in Markdown. Directly above the quote block, add metadata which determines whether the alert box on the website will be green (`success`) or yellow (`warning`).

Use one of these three options for alert blocks:

```
<!-- add-attribute:class:warning -->
>**NOTE:** Necessary information
```
```
<!-- add-attribute:class:success -->
>**TIP:** Useful, but not strictly necessary information
```
```
<!-- add-attribute:class:warning -->
>**WARNING:** Very important information
```



## Audience and language

The audience of this documentation consists mainly of developers interested in implementing a micro frontend UI solution. It is assumed the reader already has basic knowledge of web development. Do not explain general concepts unrelated to Luigi except if they are instrumental for working with the feature you are describing.

When writing documentation, adhere to a few basic rules:
- Use active voice. For example, instead of writing "Luigi Client should be installed...", write "Install Luigi Client..."
- Do not use slang or abbreviations. This also means you should not use contractions ("don't" instead of "do not") or short forms ("info" instead of "information").
- Use the present tense.
- Use concise language and avoid long blocks of text. Lists, tables, or subheadings can help you with that.
- Give practical examples of features instead of only using words to explain them. Additionally, link to [Luigi Fiddle](https://fiddle.luigi-project.io/) as a tool where users can experiment with features.

## Format

This section provides you with guidelines on how to format and organize your text.

### Headings

Use H1 headings only at the start of the document to indicate the document name.

Only use H2 and H3 headings to organize your content into categories. Do not use H4 headings or lower.

### Lists

Lists are very useful for breaking up text and providing instructions.

- Use bullet points (created with * or -) for lists involving general explanations.
- Use numbered lists only for step-by-step instructions.

### Tables

Use tables when content needs comparison or to organize small bits of information. Avoid long sentences or paragraphs inside tables.

You can find an example of a table in the [Styles](#styles) section of this document.

### Code snippets

Surround code snippets with the Markdown code block tag and specify the programming language. Make sure to indent code correctly using your text editor (2 space indentation is the default).

For example:

```javascript
Luigi.setConfig({
  routing: {
    nodeParamPrefix: '~'
  },
```

is better than:

```
Luigi.setConfig({
    routing: {
        nodeParamPrefix: '~'
    },
```

### Styles

Depending on the type of content,  use different types of text, for example, **bolded** or `code`.

|     Type           |      Font          |    Example    |
|--------------------|:------------------:|---------------|
| Parameters         |      **bold**     | **viewGroup** |
| Attributes | **bold** | **collapsible** |
| Values         |      `code`     | `true`, `false` |
| Dynamic parameters         |      `code`        | `{userId}`    |
| Folders, paths, filenames  |      `code`        | Open `basicConfiguration.js` inside `assets/luigi-config`|
| Code snippets      |      `code`        | See [this section](#code-snippets) |
| Functions          |      `code`     | `showLoadingIndicator()` |

## Links

If the link is within the same folder on GitHub, use only the relative path. For all other links, including external links, use the absolute path, starting with `https://`.

To link to a section within a document, use the title of that section as an anchor. For example:

```
[Link to the "custom messages" section in the "communication" document](communication.md#custom-messages)
```

## Screenshots and diagrams

When adding screenshots or diagrams, adhere to the following rules:

- Only use high-resolution images.
- Only use screenshots or diagrams if necessary, as too many of them can create visual noise.
- As an alternative to screenshots, point to [Luigi Fiddle](https://fiddle.luigi-project.io/) or other Luigi examples when you want to illustrate a concept.

## Glossary

This section contains terminology frequently used in the Luigi documentation.

* **Luigi Core** - the main application and the settings used to configure it.
* **Luigi Client** - the micro frontend within Luigi Core and the API used to connect the two.
* **Luigi Fiddle** - a [page](https://fiddle.luigi-project.io/) where you can configure an example Luigi application and explore Luigi functions.
* **Parameters** - the parameters that can be used to configure Luigi in the Luigi configuration file, for example **category**, **viewUrl**, and more.
* **Dynamic parameters** - the parameters that can be added to create a dynamically changeable path.
* **Attributes** - the "sub properties" of parameters. For example, the **category** parameter can have **label**, **icon**, and **collapsible** as attributes.
