import { Container, decorate, injectable } from 'inversify';
import 'reflect-metadata';
import { Controller } from 'tsoa';
import { GetUserUseCase } from '../../../core/usecases/GetUserUseCase';
import { UserService } from '../../../core/usecases/service/UserService';
import { UserEntity } from '../../../core/domain/entities/UserEntity';
import { UserController } from '../../../entrypoints/controllers/UserController';
import { UserSampleNetworkProvider } from '../../../providers/network/UserSampleNetworkProvider';
import { AppInterfaces } from '../../../core/domain/entities/base/appInterfaces';
import * as Network from '../../network/axios/HttpAxios';
import Http from '../../network/http/http';

const iocContainer = new Container();
decorate(injectable(), Controller);

// Frameworks/Infrastructure
iocContainer.bind<Http>(AppInterfaces.Http).to(Network.HttpAxios);

// Providers
iocContainer.bind<UserService>(AppInterfaces.UserService).to(UserSampleNetworkProvider);

// Core/Use Cases
iocContainer.bind<GetUserUseCase>(GetUserUseCase).to(GetUserUseCase);

// Core/Domain
iocContainer.bind<UserEntity>(UserEntity).to(UserEntity);

// Entrypoint/Controllers
iocContainer.bind<UserController>(UserController).to(UserController);

export { iocContainer };
