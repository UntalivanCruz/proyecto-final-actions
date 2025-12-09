import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnMongoDataSource} from '../datasources';
import {Votos, VotosRelations} from '../models';

export class VotosRepository extends DefaultCrudRepository<
  Votos,
  typeof Votos.prototype.id,
  VotosRelations
> {
  constructor(
    @inject('datasources.conn_mongo') dataSource: ConnMongoDataSource,
  ) {
    super(Votos, dataSource);
  }
}
