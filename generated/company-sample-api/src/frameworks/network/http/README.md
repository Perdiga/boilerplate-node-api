# Http

Interface que define contrato para fazer requisições http.

---

### Como usar

1. Importe a biblioteca `Http` para fazer requisições http.

   ```typescript
    import * as Network from '../../http';

    const http = new Network.Http;
    const url = 'https://jsonplaceholder.typicode.com/users/1';
    const response: Network.HttpResponse = await http.get(url);

   ```

--- 

### Métodos disponíveis:

| Método | Descrição |
| --- | --- |
| Http.get | Faz uma requisição do tipo GET. Opcionais: query string, headers e types |
| Http.post | Faz u requisição do tipo POST. Opcionais: body, query string, headers e types. |
| Http.put | Faz um requisição do tipo PUT. Opcionais: body, query string, headers e types. |
| Http.patch | Faz um requisição do tipo PATCH. Opcionais: body, query string, headers e types. |
| Http.delete | Faz um requisição do tipo DELETE Opcionais: headers, query string e types. |
| Http.request | Faz um requisição do tipo CUSTOM utilizando o objeto `RequestOptions` como parâmetro. |
