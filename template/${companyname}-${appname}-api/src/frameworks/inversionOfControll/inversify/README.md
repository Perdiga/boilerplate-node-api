
## Inversify.JS

O InversifyJS é um contêiner de inversão de controle (IoC) para aplicativos TypeScript e JavaScript. 
Um contêiner de IoC usa um construtor de classe para identificar e injetar suas dependências.

O InversifyJS foi desenvolvido com 4 objetivos principais:

* Permitir que desenvolvedores de TypeScript/JavaScript escrevam códigos que cumpram os princípios do SOLID.
* Facilitar e incentivar a adesão às melhores práticas de POO e IoC.
* Adicionar o mínimo possível de sobrecarga de tempo de execução.
* Fornecer uma experiência de desenvolvimento de última geração.
---

## Como usar

 Cada vez que um dependência for adicionada ao projeto, ela deve ser declarada no arquivo do `inversify.js`
 
 Por exemplo
 ``` javascript

import { TesteInterface } from 'Interfaces';
import { AppInterfaces } from '../../../domain/entities/base/appInterfaces';
import { TesteClasse } from 'Classes';

iocContainer.bind<TesteInterface>(AppInterfaces.TesteInterface).to(TesteClasse);

 ```






