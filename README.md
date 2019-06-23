<p align="center"><a href="https://calendz.app/" target="_blank" rel="noopener noreferrer"><img width="100" src="https://avatars3.githubusercontent.com/u/51510476?s=400&u=e110cf083bbc29eab84d4dceb85c94d7a87882db&v=4" alt="calendz's logo"></a></p>

<p align="center">
  <a href="https://travis-ci.com/calendz/calendz-front"><img src="https://travis-ci.com/calendz/calendz-front.svg?branch=develop" alt="Build status of develop branch"></a>
  <a href="https://www.codacy.com/app/arthur-woosy/calendz-front?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=calendz/calendz-front&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/a1ac982a16164432bf4a95d61a4fa2a1"/></a>
  <br>
  <a href="https://dependabot.com/"><img src="https://api.dependabot.com/badges/status?host=github&amp;repo=calendz/calendz-front" alt="Dependabot status"></a>
  <a href="https://dependabot.com/"><img src="https://img.shields.io/david/calendz/calendz-front.svg?maxAge=3600" alt="Dependencies status"></a>
  <br>
</p>

<h2 align="center">CALENDZ FRONT</h2>

---

## Introduction

Ce repository représente le front de calendz.

## Ecosystème

Le front de calendz est développé avec les frameworks et outils suivants* :

| Librairie        | Version | Description                                                                                                       |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| [Vue.js]         | 2.6.10  | Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.                 |
| [vue-cli]        | 3.1.3   | Standard Tooling for Vue.js Development.                                                                          |
| [vue-router]     | 3.0.6   | he official router for Vue.js                                                                                     |
| [vee-validate]   | 2.2.11  | Template Based Validation Framework for Vue.js                                                                    |
| [Babel]          | 7.4.5   | Babel is a compiler for writing next generation JavaScript.                                                       |
| [Node-sass]      | 4.12.0  | Node.js bindings to libsass.                                                                                      |
| [Boostrap]       | 4.3.1   | The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web. |

**(Liste non exhaustive, uniquement les librairies principales sont présentées)*

## Installation & utilisation

### Pré-requis

* Installer Node 10.15.3
* Créer un fichier `.env` à la source de ce repository contenant les valeurs suivantes (modifiables selon vos besoins)

      NODE_ENV=development
      APP_PORT=3000

### Lancement

* Lint : `npm run lint` (corrige la syntaxe du code grâce à [ESLint](https://github.com/eslint/eslint))
* Tests : `npm run test` (lance les tests effectués lors de l'intégration continue)
* Production : `npm run build` (build les fichiers statiques du site, à servir via un serveur web)
* Développement : `npm run serve` (lance avec [vue-cli](https://github.com/vuejs/vue-cli))

[Vue.js]: https://github.com/vuejs/vue
[vue-cli]: https://github.com/vuejs/vue-cli
[vue-router]: https://github.com/vuejs/vue-router
[vee-validate]: https://github.com/baianat/vee-validate
[Babel]: https://github.com/babel/babel
[Node-sass]: https://github.com/sass/node-sass
[Boostrap]: https://github.com/twbs/bootstrap
