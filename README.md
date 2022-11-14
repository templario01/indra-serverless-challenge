# Serverless backend with Node.js

API URL: https://ch5zkx5skh.execute-api.us-east-2.amazonaws.com<br/>
Documentacion: https://app.swaggerhub.com/apis-docs/templario01/serverless/0.0.1
### Arquitectura

|__ src<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|__ services<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__ people<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__ species<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__ starships<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|__ shared<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__ mocks<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__ utils<br/>

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