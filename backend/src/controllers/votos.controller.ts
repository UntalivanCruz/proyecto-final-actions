import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Votos} from '../models';
import {VotosRepository} from '../repositories';

export class VotosController {
  constructor(
    @repository(VotosRepository)
    public votosRepository : VotosRepository,
  ) {}

  @post('/votos')
  @response(200, {
    description: 'Votos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Votos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votos, {
            title: 'NewVotos',
            exclude: ['id'],
          }),
        },
      },
    })
    votos: Omit<Votos, 'id'>,
  ): Promise<Votos> {
    return this.votosRepository.create(votos);
  }

  @get('/votos/count')
  @response(200, {
    description: 'Votos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Votos) where?: Where<Votos>,
  ): Promise<Count> {
    return this.votosRepository.count(where);
  }

  @get('/votos')
  @response(200, {
    description: 'Array of Votos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Votos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Votos) filter?: Filter<Votos>,
  ): Promise<Votos[]> {
    return this.votosRepository.find(filter);
  }

  @patch('/votos')
  @response(200, {
    description: 'Votos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votos, {partial: true}),
        },
      },
    })
    votos: Votos,
    @param.where(Votos) where?: Where<Votos>,
  ): Promise<Count> {
    return this.votosRepository.updateAll(votos, where);
  }

  @get('/votos/{id}')
  @response(200, {
    description: 'Votos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Votos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Votos, {exclude: 'where'}) filter?: FilterExcludingWhere<Votos>
  ): Promise<Votos> {
    return this.votosRepository.findById(id, filter);
  }

  @patch('/votos/{id}')
  @response(204, {
    description: 'Votos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votos, {partial: true}),
        },
      },
    })
    votos: Votos,
  ): Promise<void> {
    await this.votosRepository.updateById(id, votos);
  }

  @put('/votos/{id}')
  @response(204, {
    description: 'Votos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() votos: Votos,
  ): Promise<void> {
    await this.votosRepository.replaceById(id, votos);
  }

  @del('/votos/{id}')
  @response(204, {
    description: 'Votos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.votosRepository.deleteById(id);
  }
}
