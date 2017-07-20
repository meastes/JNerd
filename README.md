# JNerd
## Description
JNerd is a Spring Boot and Angular starter project. The goal of the project is to write a minimal application that:

- Defines a basic framework to build a maintainable, full-stack application
- Uses modern best practices on both the server and client technologies
- Have a separation between the client and server applications, so that each team can work independently and productively

## Usage
1. Clone this repo ex:
```
git clone https://github.com/meastes/JNerd.git
```

1. Run the Spring Boot project with
```
cd boot
./gradlew bootRun
```

1. Run the Angular project with
```
cd angular
npm start
```
Or run with a mock API
```
cd angular
npm install
npm run swagger (requires a running Spring Boot application locally)
npm run webMock
```

## Features
Application

- Authentication with JWT
- RESTful web service
- Client app completely in Angular

Angular Project

- Angular 1.5.5
- ES2015 using BabelJS
- Angular Material
- Angular UI Router
- Swagger Mock API (Mocks the Spring Boot REST API)
- Gulp build process
- Gulp connect server with live reloading

Spring Project

- Spring Boot 1.3.3
- Gradle build process
- RESTful endpoints with Spring Web
    - Secured with Spring Security
    - API documentation with SpringFox (Swagger)
- File-based H2 Development database
- Email with Spring Mail and Thymeleaf templates
- Database entities with JPA and Hibernate
- Live reloading with Spring-Loaded

## NPM Build Scripts
- `npm start` or `npm run web` - Builds and starts web server and file watcher. Requests data from Spring Boot server.
- `npm run webMock` - Builds and starts web server with file watcher. Requests data from the mock API layer. Requires running `npm run swagger` at least once while Spring Boot is running.
- `npm run swagger` - Downloads the current API documentation from the Spring Boot server.
- `npm run mail` - Starts a 'fake SMTP server', which will output emails in the console.
- `npm run war` - Builds the application as a WAR file for deployment. Located in the `angular/dist` folder.

## Gradle Build Scripts
- `bootRun` - Runs the application on a local server.
- `bootRepackage` - Builds the application as a WAR file for deployment. Located in the `boot/build/libs` folder.

## TODO
- Spring Boot
    - Document all possible error codes from REST endpoints
    - Testing framework and examples
    - Liquibase support
- Angular 2
    - Unit tests
    - Minify for stringify not working for Angular 2 HTML
    - Translations
    - Better visuals (angular material)
