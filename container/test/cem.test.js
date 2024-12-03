//  npm test cem.test.js
const fs = require('fs');
const path = require('path');

const cemPath = "../public/dist/custom-elements.json"
const containerPath = "../src/LuigiContainer.svelte";
const containerTypingsPath = "../typings/LuigiContainer.svelte.d.ts";
const compoundCPath = "../src/LuigiCompoundContainer.svelte";
const compoundCTypingsPath = "../typings/LuigiCompoundContainer.svelte.d.ts";
const eventsPath = "../typings/constants/events.d.ts";


/**
 * adjusted from generateCEM.js getContainerProps()
 * @param {string} fileContent - The content of the file as a string, which should contain a `props` object.
 * @returns {Array<string>} A string array with each element being a prop
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
  // let propsEnd = propsStart;

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
      // propsEnd = i;
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

  let typeStart = field.indexOf("type: '") + "type: '".length;
  let typeEnd = field.indexOf("'", typeStart);
  
  let typeValue = field.substring(typeStart, typeEnd);
  return typeValue;
}

function getMethods(fileContent) {
  const lines = fileContent.split('\n');
  // ignore comments in LuigiContainer.svelte.d.ts (filter out lines that start with /**, *, */, //)
  const filteredLines = lines.filter(line => {
    return !line.trim().startsWith('/**') && 
            !line.trim().startsWith('*') && 
            !line.trim().startsWith('*/') &&
            !line.trim().startsWith('//');
  });
  let methods = [];
  for (let i = 0; i < filteredLines.length; i++){
    let methodNameEnd = filteredLines[i].indexOf("(");
    if (methodNameEnd != -1){
      let methodName = filteredLines[i].substring(0, filteredLines[i].indexOf('(')).trim();
      methods.push(methodName);
    }
  }
  return methods;
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
  let luigiContainerTypingsFile;
  let containerMethodNames

  let luigiCompoundCFile; 
  let luigiCompoundCProps;
  let luigiCompoundCTypingsFile;
  let compoundCMethodNames

  let eventNames;

  beforeAll(() => {
    // Load the generated custom-elements.json file
    const cemFilePath = path.resolve(__dirname, cemPath);
    cem = JSON.parse(fs.readFileSync(cemFilePath, 'utf-8'));

    const luigiContainerPath = path.resolve(__dirname, containerPath)
    luigiContainerFile = fs.readFileSync(luigiContainerPath, 'utf-8').replace(/\r\n/g, '\n');  // replace \r\n with normal new-line char \n
    luigiContainerProps = getContainerProps(luigiContainerFile);
    const luigiContainerTypingsPath = path.resolve(__dirname, containerTypingsPath)
    luigiContainerTypingsFile = fs.readFileSync(luigiContainerTypingsPath, 'utf-8').replace(/\r\n/g, '\n');
    containerMethodNames = getMethods(luigiContainerTypingsFile);
    
    const luigiCompoundCPath = path.resolve(__dirname, compoundCPath)
    luigiCompoundCFile = fs.readFileSync(luigiCompoundCPath, 'utf-8').replace(/\r\n/g, '\n');  // replace \r\n with normal new-line char \n
    luigiCompoundCProps = getContainerProps(luigiCompoundCFile);
    const luigiCompoundCTypingsPath = path.resolve(__dirname, compoundCTypingsPath)
    luigiCompoundCTypingsFile = fs.readFileSync(luigiCompoundCTypingsPath, 'utf-8').replace(/\r\n/g, '\n');
    compoundCMethodNames = getMethods(luigiCompoundCTypingsFile);

    const luigiEventsPath = path.resolve(__dirname, eventsPath);
    eventNames = getEvents(fs.readFileSync(luigiEventsPath, 'utf-8').replace(/\r\n/g, '\n'));

    // console.log("cem:" + "\n" + JSON.stringify(cem, null, 2));  // for full cem.json
    // console.log(cem);   

    // console.log(luigiCompoundCProps);

    // console.log("eventNames from events.d.ts:");
    // console.log(eventNames);

  });

  test('CEM file exists', () => {
    const cemFilePath = path.resolve(__dirname, cemPath);
    // Check if cem file exists
    expect(fs.existsSync(cemFilePath)).toBe(true);
  });

  test('CEM contains all fields', () => {
    let containerPropNames = [];  // contains all container props extracted from LuigiContainer.svelte
    let cemContainerPropNames = [];   // contains all container props(fields) from the cem file
    let containerMissingFields = [];

    let compoundCPropNames = [];
    let cemCompoundCPropNames = [];
    let compoundCMissingFields = [];

    for(let i = 0; i < luigiContainerProps.length; i++) {
      containerPropNames.push(getPropName(luigiContainerProps[i]));
    }
    for(let i = 0; i < luigiCompoundCProps.length; i++) {
      compoundCPropNames.push(getPropName(luigiCompoundCProps[i]));
    }

    // cem.modules[0] is for LuigiContainer
    let cemContainerMembers = cem.modules[0].declarations[0].members;
    for(let i = 0; i < cemContainerMembers.length; i++) {
      if (cemContainerMembers[i].kind == "field"){
        cemContainerPropNames.push(cemContainerMembers[i].name);
      }
    }
    // cem.modules[1] is for LuigiCompoundContainer
    let cemCompoundCMembers = cem.modules[1].declarations[0].members;
    for(let i = 0; i < cemCompoundCMembers.length; i++) {
      if (cemCompoundCMembers[i].kind == "field"){
        cemCompoundCPropNames.push(cemCompoundCMembers[i].name);
      }
    }

    let allFieldsExist = true;
    for (let i = 0; i < containerPropNames.length; i++){
      if(!cemContainerPropNames.includes(containerPropNames[i])){
        containerMissingFields.push(containerPropNames[i]);
        allFieldsExist = false;
      }
    }
    for (let i = 0; i < compoundCPropNames.length; i++){
      if(!cemCompoundCPropNames.includes(compoundCPropNames[i])){
        compoundCMissingFields.push(compoundCPropNames[i]);
        allFieldsExist = false;
      }
    }
    if (!allFieldsExist){
      throw new Error("missing CONTAINER fields in cem: {" + containerMissingFields + "}\n" + 
        "missing COMPOUND CONTAINER fields in cem: {" + compoundCMissingFields + "}"
      )
    }
    expect(allFieldsExist).toBe(true);
  })

  test('CEM fields have correct type', () => {
    let allFieldsCorrectType = true;
    let wrongContainerTypes = [];
    // cem.modules[0] is for LuigiContainer
    let cemContainerMembers = cem.modules[0].declarations[0].members;
    for(let i = 0; i < luigiContainerProps.length; i++) {
      // 1. for each name in luigiContainerProps, get the type
      let propName = getPropName(luigiContainerProps[i]);
      let propType = getFieldType(luigiContainerProps[i]);
      for(let j = 0; j < cemContainerMembers.length; j++) {
        if (cemContainerMembers[j].kind === "field"){
          // 2. look for the corresponding "name" in CEM and check the "text"
          if (cemContainerMembers[j].name === propName){
            if (propName === "context" || propName === "webcomponent"){
              if (!(cemContainerMembers[j].type.text === "any")){
                wrongContainerTypes.push(cemContainerMembers[j].name);
                allFieldsCorrectType = false;
              }
            }
            else{
              switch (propType) {
                case 'Array':
                  if (!(cemContainerMembers[j].type.text === "Array<string>")){
                    wrongContainerTypes.push(cemContainerMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                case 'String':
                  if (!(cemContainerMembers[j].type.text === "string")){
                    wrongContainerTypes.push(cemContainerMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                case 'Object':
                  if (!(cemContainerMembers[j].type.text === "object")){
                    wrongContainerTypes.push(cemContainerMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                case 'Boolean':
                  if (!(cemContainerMembers[j].type.text === "boolean")){
                    wrongContainerTypes.push(cemContainerMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                default:
                  throw new Error("CONTAINER: " + propName + " has unknown type: " + propType)
              }
            }
          }
        }
      }
    }
    // same for Compound Container
    let wrongCompoundCTypes = [];
    // cem.modules[1] is for LuigiCompoundContainer
    let cemCompoundCMembers = cem.modules[1].declarations[0].members;
    for(let i = 0; i < luigiCompoundCProps.length; i++) {
      // 1. for each name in containerPropNames, get the type
      let propName = getPropName(luigiCompoundCProps[i]);
      let propType = getFieldType(luigiCompoundCProps[i]);
      for(let j = 0; j < cemCompoundCMembers.length; j++) {
        if (cemCompoundCMembers[j].kind === "field"){
          // 2. look for the corresponding "name" in CEM and check the "text"
          if (cemCompoundCMembers[j].name === propName){
            if (propName === "context" || propName === "webcomponent"){
              if (!(cemCompoundCMembers[j].type.text === "any")){
                wrongCompoundCTypes.push(cemCompoundCMembers[j].name);
                allFieldsCorrectType = false;
              }
            }
            else{
              switch (propType) {
                case 'Array':
                  if (!(cemCompoundCMembers[j].type.text === "Array<string>")){
                    wrongCompoundCTypes.push(cemCompoundCMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                case 'String':
                  if (!(cemCompoundCMembers[j].type.text === "string")){
                    wrongCompoundCTypes.push(cemCompoundCMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                case 'Object':
                  if (!(cemCompoundCMembers[j].type.text === "object")){
                    wrongCompoundCTypes.push(cemCompoundCMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                case 'Boolean':
                  if (!(cemCompoundCMembers[j].type.text === "boolean")){
                    wrongCompoundCTypes.push(cemCompoundCMembers[j].name);
                    allFieldsCorrectType = false;
                  }
                  break;
                default:
                    throw new Error("COMPOUND CONTAINER: " + propName + " has unknown type: " + propType)
              }
            }
          }
        }
      }
    }
    if (!allFieldsCorrectType){
      throw new Error("these CONTAINER props have the wrong type: {" + wrongContainerTypes + "}\n" + 
        "these COMPOUND CONTAINER props have the wrong type: {" + wrongCompoundCTypes + "}"
      )
    }
    expect(allFieldsCorrectType).toBe(true);
  })

  test('CEM contains all methods', () => {
    // Luigi Container
    let cemContainerMembers = cem.modules[0].declarations[0].members;
    let cemContainerMethods = [];
    let missingContainerMethods = [];
    // Luigi Compound Container
    let cemCompoundCMembers = cem.modules[1].declarations[0].members;
    let cemCompoundCMethods = [];
    let missingCompoundCMethods = [];

    for (let i = 0; i < cemContainerMembers.length; i++){
      if (cemContainerMembers[i].kind === "method"){
        cemContainerMethods.push(cemContainerMembers[i].name);
      }
    }
    for (let i = 0; i < cemCompoundCMembers.length; i++){
      if (cemCompoundCMembers[i].kind === "method"){
        cemCompoundCMethods.push(cemCompoundCMembers[i].name);
      }
    }
    // test if all elements of containerMethodNames are in cemContainerMethods (same for compoundContainer)
    let allMethodsExist = true;
    for(let i = 0; i < containerMethodNames.length; i++) {
      if(!cemContainerMethods.includes(containerMethodNames[i])){
        allMethodsExist = false;
        missingContainerMethods.push(containerMethodNames[i]);
      }
    }
    for(let i = 0; i < compoundCMethodNames.length; i++) {
      if(!cemCompoundCMethods.includes(compoundCMethodNames[i])){
        allMethodsExist = false;
        missingCompoundCMethods.push(compoundCMethodNames[i]);
      }
    }
    if (!allMethodsExist){
      throw new Error("these CONTAINER methods are missing in CEM: {" + missingContainerMethods + "}\n" + 
        "these COMPOUND CONTAINER methods are missing in CEM: {" + missingCompoundCMethods + "}"
      )
    }
    expect(allMethodsExist).toBe(true);
  });

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
