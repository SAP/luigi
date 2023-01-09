## Overview

# Contributing to Luigi
We want to make contributing to this project as easy and transparent as possible.

## Our development process
We use GitHub to track issues and feature requests, as well as accept pull requests.

## Pull requests
You are welcome to contribute with your pull requests. These steps explain the contribution process:

1. Fork the repository and create your branch from `master`.
2. Run `npm install` in the root folder. This will install pre-commit and pre-push hooks that will take care about certain required preconditions.
3. [Add tests](#testing) for your code, especially if you are updating the Luigi Core and Client API.
4. If you've changed APIs, update the documentation. You can find more details on how to do that [here](docs/content-guidelines.md/#API-documentation).
5. If you are adding documentation, follow the [content guidelines](docs/content-guidelines.md).
6. Make sure the tests pass. Our [pipeline](https://travis-ci.com/SAP/luigi) is running the unit and e2e tests for your PR and will indicate any issues.
7. Sign the Developer Certificate of Origin (DCO).

## Testing

> **NOTE:** You should always add [*unit tests*](https://github.com/SAP/luigi/tree/master/core/test) if you are adding code to our repository.

 If you've added code that is exposed as an API or configuration, additionally add e2e tests to [js-test-app](https://github.com/SAP/luigi/tree/master/test/e2e-test-application/e2e/tests/0-js-test-app).

To let tests run locally, run `cd test/e2e-js-test-application && npm run dev` and `cd test/e2e-test-application && npm run e2e:open` and click on the test in the *js-test-application* category.

## Issues
We use GitHub issues to track bugs. Please ensure your description is
clear and includes sufficient instructions to reproduce the issue.

## License
By contributing to Luigi, you agree that your contributions will be licensed
under its [Apache-2.0 license](LICENSE).
