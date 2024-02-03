# Hashcode Validator

The Hashcode Validator is an application that gives the user the ability to quickly generate the hash value of a file
and compare it to another hash value

## Features

- Select a file or move it via drag & drop into the application
- Generate the hash values of the file in SHA-256, SHA-512 or MD5
- Compare the original hash value (e.g. from the info on the website) with the generated one

## Tech

Hashcode Validator is build with:

- [node.js] - Server-side JavaScript runtime environment
- [electron] - Framework that enables the development of cross-platform desktop applications 
- [electron-builder] - Library that simplifies the process of packaging and distributing Electron applications


## Installation

You can use the binaries in the release section or build the application yourself.
To build the application yourself, just download the project, go into the project folder and execute:

```sh
npm run build
```

This creates the binaries to your operating system in the dist folder

## Development

To run the application in development mode just go top the project directory and execute:

```sh
npm run debug
```

Starting the application in normal mode:

```sh
npm start
```

## License

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <https://nodejs.org>
   [electron]: <https://www.electronjs.org/docs/latest/tutorial/installation>
   [electron-builder]: <https://www.electron.build/index.html>

