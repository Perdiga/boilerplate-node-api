import { Container, decorate, injectable } from 'inversify';
import 'reflect-metadata';
import { Controller } from 'tsoa';
import { GetUserUseCase } from '../../../core/usecases/GetUserUseCase';
import { UserService } from '../../../core/usecases/service/UserService';
import { UserEntity } from '../../../core/domain/entities/UserEntity';
import { UserController } from '../../../entrypoints/controllers/UserController';
import { UserSampleNetworkProvider } from '../../../providers/network/UserSampleNetworkProvider';
import { UserDatabaseProvider } from '../../../providers/database/UserDatabaseProvider';
import { AppInterfaces } from '../../../core/domain/entities/base/appInterfaces';
import * as Network from '../../network/axios/HttpAxios';
import { PgRepository } from '../../repositories/pg/pgRepository';
import Http from '../../network/http/http';

const iocContainer = new Container();
decorate(injectable(), Controller);

// Frameworks/Infrastructure
iocContainer.bind<Http>(AppInterfaces.Http).to(Network.HttpAxios);
iocContainer.bind<PgRepository>(AppInterfaces.Repository).to(PgRepository);

// Providers
// iocContainer.bind<UserService>(AppInterfaces.UserService).to(UserSampleNetworkProvider);
iocContainer.bind<UserService>(AppInterfaces.UserService).to(UserDatabaseProvider);

// Core/Use Cases
iocContainer.bind<GetUserUseCase>(GetUserUseCase).to(GetUserUseCase);

// Core/Domain
iocContainer.bind<UserEntity>(UserEntity).to(UserEntity);

// Entrypoint/Controllers
iocContainer.bind<UserController>(UserController).to(UserController);

export { iocContainer };
