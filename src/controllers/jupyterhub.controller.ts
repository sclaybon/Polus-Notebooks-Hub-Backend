import { resolveList } from '@loopback/context';
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
import{SpawnDashboard} from '../models';


export class JupyterhubController {
  
  constructor() {}

  //header 'Authorization', 'token c91907c3f8d0441db3e1e054238877ce'
  //URI http://192.168.99.161:30358/hub/api/users/admin/server'

  @del('/stopDashboard', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'Stop your dashboard server',
      },
    },
  })
  async stopDashboard(): Promise<any> {

    console.log('entering stopDashboard method');

    const http = require('http');
    const options = {
      host: '192.168.99.161',
      port: '30358',
      path: '/hub/api/users/admin/server',
      method: 'DELETE',
      headers: {
        'Authorization': 'token c91907c3f8d0441db3e1e054238877ce'
      }
    };

    let request = http.request(options,function(res:any){
      console.log("stopping dashboard");
    });

    request.on('error', function(e: any) {
      console.error(e);
    });

    request.end();

    console.log('leaving stopDashboard method');

    return "stopping dashboard";
  }

  @post('/spawnDashboard', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'Stop your dashboard server',
      },
    },
  })
  async spawnDashboard(

  @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SpawnDashboard),
        },
      },
    }) spawnDashboard: SpawnDashboard

  ): Promise<any> {

    console.log('entering spawnDashboard method');

    const http = require('http');
    const options = {
      host: '192.168.99.161',
      port: '30358',
      path: '/hub/api/users/admin/server',
      method: 'POST',
      headers: {
        'Authorization': 'token c91907c3f8d0441db3e1e054238877ce'
      },
      body: spawnDashboard,
      json: true
    };

    let request = http.request(options,function(res:any){
      console.log("spawning dashboard");
    });

    request.on('error', function(e: any) {
      console.error(e);
    });

    request.end();

    console.log('leaving spawnDashboard method');

    return "spawning dashboard";  
  }  

}