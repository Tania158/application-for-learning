# Application for learning Angular Project

Application for learning
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.

## Built With

- [![Angular][angular.io]][angular-url]
- [![Angular Material][material.angular.io]][material.angular-url]
- [![TypeScript][typescript.com]][typescript-url]
- [![RxJS][rxjs.dev]][rxjs-url]
- [![NgRx][ngrx.io]][ngrx-url]
- [![NPM][npm.com]][npm-url]
- [![NodeJS][nodejs.org]][nodejs-url]
- [![Git][git.com]][git-url]
- [![Bootstrap][bootstrap.com]][bootstrap-url]
- [![Firebase][firebase.com]][firebase-url]

## Installation

Below is an example of how you can installing and setting up your app. This template doesn't rely on any external dependencies or services.

1. Get a free API Key at [https://www.postman.com/aninix/workspace/genesis-front-end-school/overview](https://www.postman.com/aninix/workspace/genesis-front-end-school/overview)
2. Clone the repo
   ```sh
   git clone https://github.com/Tania158/application-for-learning.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
   The application will automatically reload if you change any of the source files.
   ```sh
   ng serve
   ```

## Features:

- created two components for the course feed page and course view page.
- routing for the application is configured. The routing module 'app-routing.module.ts' defines routes for both the course feed page and the course view page.
- implemented pagination on the course feed page to display the last 10 courses.
- implemented the hover functionality to play videos without sound when hovering over a course.
- implemented the course view page to display the first video, course details, and list of lessons.
- a video playback service has been created. An Observable is created in the service to track changes in the video URL. When the URL changes, used hls.js to load the video and created an Observable to track the video progress and state changes.
- a video player is created in the course view component using the video element and the Angular ViewChild decorator to access the element in the component. When the component is initialized, the video URL of the Observable from the playback service is subscribed and the src attribute of the video element is updated.
- implemented the functionality to save the progress of watching the video and the lesson of the course locally.
- implemented the functionality to block lessons if necessary and display a message to the user.
- errors from the API have been worked out (network error, ...);
- adaptive for the mobile version;

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[typescript.com]: https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[firebase.com]: https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=ffca28
[firebase-url]: https://firebase.google.com/
[material.angular.io]: https://img.shields.io/badge/Angular-3f51b5?style=for-the-badge&logo=angular&logoColor=white
[material.angular-url]: https://material.angular.io/
[npm.com]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com/
[nodejs.org]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[nodejs-url]: https://nodejs.org/
[rxjs.dev]: https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white
[rxjs-url]: https://rxjs.dev/
[git.com]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[git-url]: https://git-scm.com/
[ngrx.io]: https://img.shields.io/badge/ngrx-412945?style=for-the-badge&logo=reactivex&logoColor=84438a
[ngrx-url]: https://ngrx.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
