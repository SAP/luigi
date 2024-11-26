//  npm test cem.test.js
const fs = require('fs');
const path = require('path');

const cemPath = "../public/dist/custom-elements.json"
const containerPath = "../src/LuigiContainer.svelte";
const compoundContainerPath = "../src/LuigiCompoundContainer.svelte";
const eventsPath = "../typings/constants/events.d.ts";


/**
 * adjusted from generateCEM.js
 * @param {string} fileContent - The content of the file as a string, which should contain a `props` object.
 * @returns {Array<string>} A string array with each element a prop as a string
 */
function getContainerProps(fileContent) {
  if (!fileContent || fileContent === '') {
    throw new Error('Cannot parse container props, fileContent is empty in parseContainerProps.');
  }
  const propsIndex = fileContent.indexOf('props:');
  if (propsIndex === -1) {
    throw new Error('No properties found.');
  }

  let openBraces = 0;
  let propsStart = fileContent.indexOf('{', propsIndex);
  let propsEnd = propsStart;

  let propStart = fileContent.indexOf('{', propsIndex);
  let propEnd = propStart
  let propsArray = [];

  for (let i = propsStart; i < fileContent.length; i++) {
    if (fileContent[i] === '{') {
      if (openBraces == 0){
        openBraces++;
        propStart = i+3;  // i+3 to get rid of ': {' from "props: {"
      } else if (openBraces != 0){
        openBraces++;
      }
    } else if (fileContent[i] === '}') {
      openBraces--;
      propEnd = i+1;
      propsArray.push(fileContent.substring(propStart, propEnd).trim());
      propStart = i+3;
    }

    if (openBraces === 0) {
      propsEnd = i;
      propsArray.pop();
      break;
    }
  }
  return propsArray;
}

function getPropName(prop) {
  // input: "activeFeatureToggleList: { type: 'Array', reflect: false, attribute: 'active-feature-toggle-list' }",
  // output: 'activeFeatureToggleList'

  let attributeStart = 0;
  let attributeEnd = prop.indexOf(":");

  let attributeValue = prop.substring(attributeStart, attributeEnd);
  return attributeValue;
}

function getFieldType(field) {
  // input: "activeFeatureToggleList: { type: 'Array', reflect: false, attribute: 'active-feature-toggle-list' }",
  // output: 'Array'

  let typeStart = field.indexOf("{ type: '") + "{ type: '".length;
  let typeEnd = field.indexOf("'", typeStart);
  
  let typeValue = field.substring(typeStart, typeEnd);
  return typeValue;
}

function getEvents(fileContent) {
  const lines = fileContent.split('\n');
  // ignore comments in events.d.ts (filter out lines that start with /**, *, */, //)
  const filteredLines = lines.filter(line => {
    return !line.trim().startsWith('/**') && 
            !line.trim().startsWith('*') && 
            !line.trim().startsWith('*/') &&
            !line.trim().startsWith('//');
  });
  const cleanedContent = filteredLines.join('\n');

  let events = [];
  let quotationMark = 0;
  let eventStart;
  let eventEnd;
  for (let i = 0; i < cleanedContent.length; i++){
    if (cleanedContent[i] === "'"){
      if (quotationMark === 0){
        quotationMark++;
        eventStart = i+1;
      } else if (quotationMark === 1){
        quotationMark--;
        eventEnd = i;
        events.push(cleanedContent.substring(eventStart, eventEnd));
      }
    }
  }
  return events;
}


describe('Custom Element Manifest Validation', () => {
  let cem;
  let luigiContainerFile;
  let luigiContainerProps;

  let eventNames;

  beforeAll(() => {
    // Load the generated custom-elements.json file
    const cemFilePath = path.resolve(__dirname, cemPath);
    cem = JSON.parse(fs.readFileSync(cemFilePath, 'utf-8'));

    const luigiContainerFilePath = path.resolve(__dirname, containerPath)
    luigiContainerFile = fs.readFileSync(luigiContainerFilePath, 'utf-8').replace(/\r\n/g, '\n');  // replace \r\n with normal new-line char \n
    luigiContainerProps = getContainerProps(luigiContainerFile);

    const luigiEventsPath = path.resolve(__dirname, eventsPath);
    eventNames = getEvents(fs.readFileSync(luigiEventsPath, 'utf-8').replace(/\r\n/g, '\n'));

    // console.log("cem:" + "\n" + JSON.stringify(cem, null, 2));  // for full cem.json
    // console.log(cem);   

    console.log("luigiContainerProps Array:");
    console.log(luigiContainerProps);

    //console.log("eventNames from events.d.ts:");
    //console.log(eventNames);

  });

  test('CEM file exists', () => {
    const cemFilePath = path.resolve(__dirname, cemPath);
    // Check if cem file exists
    expect(fs.existsSync(cemFilePath)).toBe(true);
  });

  test('All Fields exist in CEM', () => {
    let containerPropNames = [];
    let cemPropNames = [];

    for(let i = 0; i < luigiContainerProps.length; i++) {
      containerPropNames.push(getPropName(luigiContainerProps[i]));
    }

    // cem.modules[0] is for LuigiContainer
    let cemMembers = cem.modules[0].declarations[0].members;
    for(let i = 0; i < cemMembers.length; i++) {
      if (cemMembers[i].kind == "field"){
        cemPropNames.push(cemMembers[i].name);
      }
    }

    let allFieldsExist = true;
    for (let i = 0; i < containerPropNames.length; i++){
      if(!cemPropNames.includes(containerPropNames[i])){
        allFieldsExist = false;
      }
    }
    expect(allFieldsExist).toBe(true);
  })

  test('All fields have correct type', () => {
    let wrongTypes = [];
    // cem.modules[0] is for LuigiContainer
    let cemMembers = cem.modules[0].declarations[0].members;

    // 1. for each name in containerPropNames, get the type
      let allFieldsCorrectType = true;
      for(let i = 0; i < luigiContainerProps.length; i++) {
        let propName = getPropName(luigiContainerProps[i]);
        let propType = getFieldType(luigiContainerProps[i]);
        for(let j = 0; j < cemMembers.length; j++) {
          if (cemMembers[j].kind === "field"){
            // 2. look for the corresponding "name" in CEM and check the "text"
            if (cemMembers[j].name === propName){
              switch (propType) {
                case 'Array':
                  // compare type in Container
                  if (!(cemMembers[j].type.text === "Array<string>")){
                    wrongTypes.push(cemMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                case 'String':
                  if (!(cemMembers[j].type.text === "string")){
                    wrongTypes.push(cemMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                case 'Object':
                  if (!(cemMembers[j].type.text === "object")){
                    wrongTypes.push(cemMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                case 'Boolean':
                  if (!(cemMembers[j].type.text === "boolean")){
                    wrongTypes.push(cemMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                default:
                   throw new Error("unknown type: " + propType)
              }
            }
          }
        }
      }
    if (wrongTypes.length != 0){
      throw new Error("these props have the wrong type: " + wrongTypes)
    }
    expect(allFieldsCorrectType).toBe(true);
  })

  test('CEM contains all events', () => {
    let cemEvents = [];
    let cemEvent;
    for (let i = 0; i < cem.modules[0].declarations[0].events.length; i++){
      cemEvent = cem.modules[0].declarations[0].events[i].name;
      cemEvents.push(cemEvent);
    }
    // test if all elements of eventNames are in cemEvents
    let allEventsExist = true;
    for(let i = 0; i < eventNames.length; i++) {
      if(!cemEvents.includes(eventNames[i])){
        allEventsExist = false;
        throw new Error("event: " + "'" + eventNames[i] + "'" + " does not exist in CEM");
      }
    }
    expect(allEventsExist).toBe(true);
  });
});
