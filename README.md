# Serverless backend with Node.js

API URL: https://ch5zkx5skh.execute-api.us-east-2.amazonaws.com
Documentacion: https://app.swaggerhub.com/apis-docs/templario01/serverless/0.0.1
### Arquitectura

|__ src
&nbsp;&nbsp;&nbsp;&nbsp;|__ services
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__ people
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__ species
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__ starships
&nbsp;&nbsp;&nbsp;&nbsp;|__ shared
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__ mocks
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__ utils

### Tests
##### Dependencias
```
$ npm instal
```
##### Ejecutar tests
```
$ npm run test
```
##### Covertura de tests
```
$ npm run test:coverage
$ npm run test:coverage:report
```