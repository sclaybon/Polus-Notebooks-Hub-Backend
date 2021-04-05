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
const SANDBOX = path.resolve(__dirname, '../../sandbox');

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
  async listFiles() {
    const files = await readdir(SANDBOX);

    return files;
  }
  
}
