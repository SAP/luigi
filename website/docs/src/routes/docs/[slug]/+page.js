// @ts-nocheck
import { error } from '@sveltejs/kit';

// export const prerender = true

// import pre-bundled docs.json to avoid bundling again on runtime

// import docsJSON from '/src/data/docs.json';
import docsJSON from '$lib/data/docs.json';

// console.log(docsJSON)
const docsArray = Array.from(docsJSON);

/** @type {import('./$types').PageLoad} */
// @ts-ignore
export function load({ params }) {
  // const listOfSlugs = docsArray.map(item => {
  //   return {
  //     slug: item.shortName
  //   }
  // });
  // console.log(listOfSlugs)
  // serve docu by slug matching with shortName
  const thisMfDocu = docsArray.find(item => item.shortName === params.slug);
  if (thisMfDocu) {
    return {
      content: thisMfDocu.contents.value,
      slug: params.slug
    };
  }
}

/**
 * Custom functions used to prerender all pages in the slugs for static serving the site in Netlify
 * @returns list of all possible slugs
 */
// export function entries() {
//   const listOfSlugs = docsArray.map(item => {
//     return {
//       slug: item.shortName
//     }
//   });
//   console.log(101, listOfSlugs);

//   console.log('ANother one')
//   return [
//     { slug: 'docs' }
//   ]
//   // return listOfSlugs;
// }

export const prerender = true;
