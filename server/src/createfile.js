const fs = require('fs');
const path = require('path');

// Usage: node createFiles.js admin user js
const args = process.argv.slice(2);
const [folderName, fileName, fileExtension] = args;

if (!folderName || !fileName || !fileExtension) {
  console.error('Usage: node createFiles.js FolderName FileName FileExtension');
  process.exit(1);
}

// Define the directories
const controllerDir = path.join(__dirname, 'controllers', folderName);
const routeDir = path.join(__dirname, 'routes', folderName);

// Ensure the directories exist
fs.mkdirSync(controllerDir, { recursive: true });
fs.mkdirSync(routeDir, { recursive: true });

// Define file names
const controllerFileName = `${fileName}.controller.${fileExtension}`;
const routeFileName = `${fileName}.routes.${fileExtension}`;

// Define the content for the controller file
const controllerContent = `
const Create${fileName} = asyncHandler(async(req,res)=>{})
const Update${fileName} = asyncHandler(async(req,res)=>{})
const Get${fileName} = asyncHandler(async(req,res)=>{})
const Delete${fileName} = asyncHandler(async(req,res)=>{})
`;

// Define the content for the route file
const routeContent = `'use strict';

const { Router } = require("express");
const router = Router();

router
// define

module.exports = router;

`;

// Write the controller file
fs.writeFileSync(path.join(controllerDir, controllerFileName), controllerContent, 'utf8');

// Write the route file
fs.writeFileSync(path.join(routeDir, routeFileName), routeContent, 'utf8');

console.log(`Controller and route files created successfully in ${folderName}.`);
