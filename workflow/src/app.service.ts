// import { Injectable } from '@nestjs/common';
// const fs = require("fs/promises");
// import { xml2json, json2xml } from 'xml-js';
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { xml2json, json2xml } from 'xml-js';
// //import {promises as fs} from "fs"
// //import { promisify } from 'util';
//  interface XmlData {
//     root: {
//       [key: string]: any;
//     };
//   } 

interface XmlData {
  [key: string]: any;
}

  // interface XmlData {
  //   root: any; // Update the type of the 'root' property based on your XML structure
  // }

 /*  another option
  type XmlData = {
    root: {
      [key: string]: any;
    };
  }; */
  

@Injectable()
export class AppService {
  async createXmlFile_xmljs(filename: string, inputData: any) {
        try {
            console.log("inputData====>",inputData)
          // We are Extracting the XML string from the input object
          const xmlData = inputData.xmlData;
          console.log("Input XML data:", xmlData, typeof xmlData);
          
          // We are Converting the XML string to a JSON object
          const jsonObj =xml2json(xmlData, { compact: true, spaces: 2 });
          //if compact false for each element we get below stuctue
          // "elements": [
          //   {
          //     "type": "instruction",
          //     "name": "",
          //     "instruction": "xml version = \"1.0\" "
          //   },
          //   {
          //     "type": "element",
          //     "name": "root",
          //     "attributes": {
          //       "town": "create"
          //     },
          console.log("Converted JSON:", jsonObj);
          
      
          // We are Converting the JSON object back to XML
          const convertedXml = json2xml(jsonObj, { compact: true, ignoreComment: true, spaces: 4 });
          //if we want to add comments also then we can keep ignorecommet : false
      
          console.log("Converted XML:", convertedXml);
      
          // Write the XML to the file
          await fs.writeFile(`${filename}.xml`, convertedXml);
          console.log(`File ${filename}.xml created`);
      
          return { message: `File ${filename}.xml created`, data: convertedXml };
        } catch (error) {
          console.error(error);
          throw new Error("Could not create file");
        }
      }


// Get all data of file
      async getXmlFile_xmljs(filename: string) {
        try {
          const data = await fs.readFile(`${filename}.xml`);
          console.log(data)
          return data;
        } catch (error) {
          console.error(error);
          throw new Error('Could not read file');
        }
      }
// get all files


  // async getAllXmlFiles() {
  //   try {
  //     const files = await fs.readdir(__dirname);
  //     const xmlFiles = files.filter((file) => file.endsWith('.xml'));
  //     return xmlFiles;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('Could not retrieve XML files');
  //   }
  // }


  

      // update data 
   
//we can add inner key but but not able to update means we have main key language {speak:yes} and we want to add read in language then we can but unable to replace speak and also unable to add or update outer key means language
      async  updateXmlFile_xmljs(filename: string, inputData: XmlData) {
        try {
          // Read the XML data from the file
          const xmlData = await fs.readFile(`${filename}.xml`, 'utf-8');
      
          // Remove any leading or trailing whitespace characters from the XML data
          //const trimmedXmlData = xmlData.trim();
      
          // Convert the XML data to a JavaScript object
          const jsonData = xml2json(xmlData, { compact: true, spaces: 2 });
          console.log("jsonData===>",jsonData)
          const jsonObj = JSON.parse(jsonData);
          console.log("jsonObj====>",jsonObj)
      
          // Update the values in the JavaScript object based on the input data
          const inputDataRootKeys = Object.keys(inputData.root);
          console.log("inputDataRootKeys====>",inputDataRootKeys)
          for (let i = 0; i < inputDataRootKeys.length; i++) {
            const key = inputDataRootKeys[i];
            if(!key ){
              throw console.error("key not found");
              
            }
            console.log("key====>",key)
            const value = inputData.root[key];
            console.log("value====>",value)
      
            if (typeof jsonObj.root[key] !== 'undefined') {
              if (typeof value === 'object') {
                // If the value is an object, we need to update each key-value pair in the object
                const valueKeys = Object.keys(value);
                console.log("valuekeys=====>",valueKeys)
                for (let i = 0; i < valueKeys.length; i++) {
                  const nestedKey = valueKeys[i];
                  console.log("nestedkey====>",nestedKey)
                  const nestedValue = value[nestedKey];
                  console.log("nestedvalue=====>",nestedValue)
                  jsonObj.root[key][nestedKey] = nestedValue;
                  console.log("jsonObj.root[key][nestedKey]._text=====>",jsonObj.root[key][nestedKey])
                }
              } else {
                // If the value is not an object, we can update it directly
                console.log("jsonObj.root[key]._text====>",jsonObj.root[key])
                jsonObj.root[key] = value;
              }
            }
          }
      
          // Convert the updated JavaScript object back to XML
          const updatedXmlData = json2xml(jsonObj, { compact: true, spaces: 4 });
      
          // Write the updated XML to the file
          await fs.writeFile(`${filename}.xml`, updatedXmlData);
      
          console.log(`File ${filename}.xml updated with new element`);
      
          return { message: `File ${filename}.xml updated with new element`, data: updatedXmlData };
        } catch (error) {
          console.error(error);
          throw new Error('Could not update file');
        }
      }
      

 /*  async editWord(filePath: string, oldWord: string, newWord: string): Promise<void> {
    const readFile = promisify(fs.readFile); 
    const writeFile = promisify(fs.writeFile); 
    try { 
      const data = await readFile(filePath, 'utf-8');
       const regex = new RegExp(`\\b${oldWord}\\b`, 'g'); 
       const newData = data.replace(regex, newWord); 
       await writeFile(filePath, newData, 'utf-8'); 
      } 
      catch (err) { throw new Error(`Failed to edit word: ${err}`); }
  }
 */

//not working prpoperly
  async  updateXmlFile_xmljs1(filename: string, inputData: XmlData) {
    try {
      // Read the XML data from the file
      const xmlData = await fs.readFile(`${filename}.xml`, 'utf-8');
  
      // Convert the XML data to a JavaScript object
      const jsonData = xml2json(xmlData, { compact: true, spaces: 2 });
      const jsonObj = JSON.parse(jsonData);
  
      // If the XML data doesn't have a "root" element, use the top-level element as the key
      const topLevelElement = jsonObj.root ? "root" : Object.keys(jsonObj)[0];
//TODO need to add code for root element here
    //     // Use the appropriate interface based on the presence of "root" element
    // const updatedData: XmlData = jsonObj.root ? { root: {} } : {};

    //  // Use the appropriate interface based on the presence of "root" element
    //  const updatedData: XmlData = jsonObj.root ? { root: {} } : {};
  
      // Update the values in the JavaScript object based on the input data
      const inputDataKeys = Object.keys(inputData);
      for (let i = 0; i < inputDataKeys.length; i++) {
        const key = inputDataKeys[i];
        const value = inputData[key];
  
        if (typeof jsonObj[topLevelElement][key] !== 'undefined') {
          if (typeof value === 'object') {
            // If the value is an object, we need to update each key-value pair in the object
            const valueKeys = Object.keys(value);
            for (let j = 0; j < valueKeys.length; j++) {
              const nestedKey = valueKeys[j];
              const nestedValue = value[nestedKey];
              jsonObj[topLevelElement][key][nestedKey] = nestedValue;
            }
          } else {
            // If the value is not an object, we can update it directly
            jsonObj[topLevelElement][key] = value;
          }
        }
      }
  
      // Convert the updated JavaScript object back to XML
      const updatedXmlData = json2xml(jsonObj, { compact: true, spaces: 4 });
  
      // Write the updated XML to the file
      await fs.writeFile(`${filename}.xml`, updatedXmlData);
  
      console.log(`File ${filename}.xml updated with new elements`);
  
      return { message: `File ${filename}.xml updated with new1 elements`, data: updatedXmlData };
    } catch (error) {
      console.error(error);
      throw new Error('Could not update file');
    }
  }  
  
  //**       sending json data to create xml file      issue it does not take root elements automatically file does not open in browser  // but in case of xml2js it takes it automatically but it create problem for bpmn file    */

  async  createXmlFile_json(filename: string, inputData: any) {
    try {
      const jsonInput = inputData; // Assign the JSON data directly
      
      // Convert the JSON object to XML
      const convertedXml = json2xml(jsonInput, { compact: true, ignoreComment: true, spaces: 4 });
      
      console.log("Converted XML:", convertedXml);
  
      // Write the XML to the file
      await fs.writeFile(`${filename}.xml`, convertedXml);
      console.log(`File ${filename}.xml created`);
  
      return { message: `File ${filename}.xml created`, data: convertedXml };
    } catch (error) {
      console.error(error);
      throw new Error("Could not create file");
    }
    }

  }

