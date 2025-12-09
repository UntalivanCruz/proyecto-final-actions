import {Entity, model, property} from '@loopback/repository';

@model()
export class Votos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  candidatoId: string;

  @property({
    type: 'number',
    default: 0,
  })
  cantidad?: number;

  @property({
    type: 'string',
    default: 'FFFFFF',
  })
  color?: string;


  constructor(data?: Partial<Votos>) {
    super(data);
  }
}

export interface VotosRelations {
  // describe navigational properties here
}

export type VotosWithRelations = Votos & VotosRelations;
