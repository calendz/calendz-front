<p align="center"><a href="https://calendz.app/" target="_blank" rel="noopener noreferrer"><img width="100" src="https://avatars3.githubusercontent.com/u/51510476?s=400&u=e110cf083bbc29eab84d4dceb85c94d7a87882db&v=4" alt="calendz's logo"></a></p>

<p align="center">
  <a href="https://travis-ci.com/calendz/calendz-front"><img src="https://travis-ci.com/calendz/calendz-front.svg?branch=develop" alt="Build status of develop branch"></a>
  <a href="https://www.codacy.com/app/calendz/front?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=calendz/calendz-front&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/031c9c14be87456889c2772d66aaff3b"/></a>
  <br>
  <a href="https://dependabot.com/"><img src="https://api.dependabot.com/badges/status?host=github&amp;repo=calendz/calendz-front" alt="Dependabot status"></a>
  <a href="https://dependabot.com/"><img src="https://img.shields.io/david/calendz/calendz-front.svg?maxAge=3600" alt="Dependencies status"></a>
  <br>
</p>

<h2 align="center">CALENDZ FRONT</h2>

---

## Introduction

Ce repository représente le front de calendz.

## Écosystème

Le front de calendz est développé avec les frameworks et outils suivants* :

| Librairie        | Version | Description                                                                                                       |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| [Vue.js]         | 2.6.12  | Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.                 |
| [vue-cli]        | 3.12.1  | Standard Tooling for Vue.js Development.                                                                          |
| [vue-router]     | 3.4.3   | The official router for Vue.js                                                                                    |
| [vuex]           | 3.5.1   | Centralized State Management for Vue.js.                                                                          |
| [vee-validate]   | 2.2.15  | Template Based Validation Framework for Vue.js                                                                    |
| [Axios]          | 0.20.0  | Promise based HTTP client for the browser and node.js                                                             |
| [Fullcalendar]   | 4.4.2   | Full-sized drag & drop event calendar                                                                             |
| [SweetAlert2]    | 9.17.1  | A beautiful, responsive, highly customizable and accessible (WAI-ARIA) replacement for JavaScript's popup boxes.  |
| [Babel]          | 7.9.6   | Babel is a compiler for writing next generation JavaScript.                                                       |
| [Node-sass]      | 4.14.1  | Node.js bindings to libsass.                                                                                      |
| [Bootstrap]      | 4.3.1   | The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web. |

**(Liste non exhaustive, uniquement les librairies principales sont présentées)*

## Installation & utilisation

### Pré-requis

* Installer Node 12.18.3
* Créer un fichier `.env` à la source de ce repository contenant les valeurs suivantes (modifiables selon vos besoins)

      NODE_ENV=development
      VUE_APP_API_URL=http://localhost:3001/v1
      VUE_APP_API_CALENDAR_URL=http://localhost:3000/v1

### Lancement

* Lint : `npm run lint` (corrige la syntaxe du code grâce à [ESLint](https://github.com/eslint/eslint))
* Tests : `npm run test` (lance les tests effectués lors de l'intégration continue)
* Production : `npm run build` (build les fichiers statiques du site, à servir via un serveur web)
* Développement : `npm run serve` (lance avec [vue-cli](https://github.com/vuejs/vue-cli))

[Vue.js]: https://github.com/vuejs/vue
[vue-cli]: https://github.com/vuejs/vue-cli
[vue-router]: https://github.com/vuejs/vue-router
[vuex]: https://github.com/vuejs/vuex
[vee-validate]: https://github.com/baianat/vee-validate
[Axios]: https://github.com/axios/axios
[Fullcalendar]: https://github.com/fullcalendar/fullcalendar
[SweetAlert2]: https://github.com/sweetalert2/sweetalert2
[Babel]: https://github.com/babel/babel
[Node-sass]: https://github.com/sass/node-sass
[Bootstrap]: https://github.com/twbs/bootstrap
