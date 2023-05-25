// @ts-nocheck
import { error } from '@sveltejs/kit';
// import { getParsedDocs } from '../../../plugins/parser';
import docsJSON from '/src/data/docs.json';
const docsArray = Array.from(docsJSON);
/** @type {import('./$types').PageLoad} */
// @ts-ignore
export function load({ params }) {
  console.log(params);
  // if (params?.slug === 'hello-world') {
  // let a = fetch(`docs.json`).then(r => r.json()).then(docs => {
  //     console.log(docs);
  // });

  // console.log(typeof docsArray, docsArray[10].contents.value);
  // console.log('00001', docsArray)
  const thisMfDocu = docsArray.find(item => item.shortName === params.slug);
  if (thisMfDocu) {
    // console.log('~TEST', thisMfDocu)
    return {
      title: 'Hello world!',
      content: thisMfDocu.contents.value,
      slug: params.slug
    };
  } else {
    return {
      title: 'NO DOCU FOUND FOR THIS SLUGGG:' + params.slug + ' !!!',
      content: 'no content here',
      slug: params.slug
    };
  }

  // fetch('/static/data/docs.json').then((docs) => {
  //     console.log(docs)
  // })
  // getParsedDocs().then((docs) => {
  //     // console.log(typeof docs, JSON.stringify(docs).substring(0, 1000), typeof (Array.from(docs)))
  //     const mf_docu = Array.from(docs).filter(item => item.shortName === params.slug);

  // })

  // }

  // throw error(404, 'Not found');
}
