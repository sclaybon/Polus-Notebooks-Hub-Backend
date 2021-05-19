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
      host: 'polus-notebooks-hub.ci.aws.labshare.org',
      // port: '30358',
      path: '/hub/api/users/swazoo.claybon@labshare.org/server',
      method: 'DELETE',
      headers: {
        'Authorization': 'token fff6cea84cff4f4aba855c6afae9a13b'
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

    console.log("entering /spawnDashboard");

    const https = require('https');
    var uri = '/hub/api/users/'+spawnDashboard.email.toLowerCase()+'/server';

    //grab the file extension by splitting the array and grabbing the last element
    var extension = spawnDashboard.dashboard.split('.')[spawnDashboard.dashboard.split('.').length - 1];

    if(extension == "py"){
      spawnDashboard.profile = "Streamlit Dashboard Variable App";
    } else if (extension == "ipynb") {
      spawnDashboard.profile = "Voila Dashboard Variable App";
    }

    const data = JSON.stringify({
      profile: spawnDashboard.profile,
      dashboard: spawnDashboard.dashboard
    });

    const options = {
      hostname: 'polus-notebooks-hub.ci.aws.labshare.org',
      path: uri,
      method: 'POST',
      headers: {
        'Authorization': 'token fff6cea84cff4f4aba855c6afae9a13b',
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    console.log("profile: " + spawnDashboard.profile);
    console.log("email: " + spawnDashboard.email);
    console.log("dashboard: " + spawnDashboard.dashboard);
    console.log("uri: " + uri);


    const req = https.request(options, (res: any) => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', (d: string | Buffer) => {
        process.stdout.write(d)
      })
    });

    req.on('error', (error: any) => {
      console.error(error)
    });


    req.write(data);

    console.log("leaving /spawnDashboard");

    req.end();    

    return "spawning dashboard";  
  }  

}