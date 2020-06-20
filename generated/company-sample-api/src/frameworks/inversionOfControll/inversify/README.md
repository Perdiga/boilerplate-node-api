
## Inversify.JS

InversifyJS is an inversion of control (IoC) container for TypeScript and JavaScript applications. An IoC container uses a class constructor to identify and inject its dependencies.

InversifyJS was developed with 4 main objectives:

1. Allow TypeScript / JavaScript developers to write code that meets the principles of SOLID.
2. Facilitate and encourage adherence to OOP and IoC best practices.
3. Add as little runtime overhead as possible.
4. Provide a cutting edge development experience.

---

## how to use

Each time a dependency is added to the project, it must be declared in the `inversify.js` file. 

E.g.:
``` javascript
import { TestInterface } from 'Interfaces';
import { AppInterfaces } from '../../../domain/entities/base/appInterfaces';
import { TesteClasse } from 'Classes';

iocContainer.bind<TesteInterface>(AppInterfaces.TestInterface).to(TestInterface);
```






