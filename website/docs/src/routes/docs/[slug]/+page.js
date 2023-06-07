// @ts-nocheck
import { error } from '@sveltejs/kit';

// import pre-bundled docs.json to avoid bundling again on runtime

import docsJSON from '/src/data/docs.json';
const docsArray = Array.from(docsJSON);

/** @type {import('./$types').PageLoad} */
// @ts-ignore
export function load({ params }) {
  // serve docu by slug matching with shortName
  const thisMfDocu = docsArray.find(item => item.shortName === params.slug);
  if (thisMfDocu) {
    return {
      content: thisMfDocu.contents.value,
      slug: params.slug
    };
  }
}
