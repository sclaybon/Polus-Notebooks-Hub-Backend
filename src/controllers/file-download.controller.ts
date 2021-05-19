// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';

import fs from 'fs';
import path from 'path';
import {promisify} from 'util';

const readdir = promisify(fs.readdir);
const SANDBOX = path.resolve(__dirname, '/opt/shared/notebooks');

export class FileDownloadController {
  constructor() {}

  @get('/files', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  // async listFiles() {
  //   const files = await readdir(SANDBOX);

  //   return files;
  // }

  async listFiles() {
    console.log("reading the files");
    const files = await dirTree(SANDBOX);
    console.log(files);
    return files;
  }

  
}

function dirTree(filename: any): any{

  var stats = fs.lstatSync(filename);

  let info: any = {};

  info = {
      path: filename,
      name: path.basename(filename)
  };

  if (stats.isDirectory()) {

      // info.type = "folder";
      info.children = fs.readdirSync(filename).map(function(child) {
          return dirTree(filename + '/' + child);
      });

  } else {
      // Assuming it's a file. In real life it could be a symlink or
      // something else!
      info.type = "file";
  }

  return info;
}

