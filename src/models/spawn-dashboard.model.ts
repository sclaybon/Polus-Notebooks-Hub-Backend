import {Entity, model, property} from '@loopback/repository';

@model()
export class SpawnDashboard extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  profile: string;

  @property({
    type: 'string',
    required: true,
  })
  dashboard: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;


  constructor(data?: Partial<SpawnDashboard>) {
    super(data);
  }
}

export interface SpawnDashboardRelations {
  // describe navigational properties here
}

export type SpawnDashboardWithRelations = SpawnDashboard & SpawnDashboardRelations;
