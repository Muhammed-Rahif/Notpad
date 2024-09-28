<!-- Improved compatibility of back to top link: See: https://github.com/Muhammed-Rahif/Notepad/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://muhammed-rahif.github.io/Notepad/">
    <img src="public/logo.png" alt="Logo" width="80" >
  </a>
  <h3 align="center">Notepad</h3>

  <p align="center">
    Windows like notepad for cross platform.
    <br />
    <a href="https://github.com/Muhammed-Rahif/Notepad/releases"><strong>Releases »</strong></a>
    <br />
    <br />
    <a href="https://muhammed-rahif.github.io/Notepad/">Live</a>
    ·
    <a href="https://github.com/Muhammed-Rahif/Notepad/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/Muhammed-Rahif/Notepad/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#screenshot">Screenshot</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running">Running</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
<!-- ## About The Project -->
<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

## Screenshot

[![Product Name Screen Shot][product-screenshot]](https://muhammed-rahif.github.io/Notepad/)

## Built With

[![Svelte][svelte-logo]][svelte-url]
[![Tailwindcss][tailwind-logo]][tailwind-url]
[![Shadcn][shadcnui-logo]][shadcnui-url]
[![Tauri][tauri-logo]][tauri-url]

[svelte-logo]: https://img.shields.io/badge/svelte-000000?style=for-the-badge&logo=svelte
[svelte-url]: https://svelte.dev/
[tailwind-logo]: https://img.shields.io/badge/tailwind-000000?style=for-the-badge&logo=tailwindcss
[tailwind-url]: https://tailwindcss.com/
[shadcnui-logo]: https://img.shields.io/badge/shadcn/svelte-000000?style=for-the-badge&logo=shadcnui&logoColor=orange
[shadcnui-url]: https://shadcn-svelte.com/
[tauri-logo]: https://img.shields.io/badge/Tauri-000000?style=for-the-badge&logo=tauri
[tauri-url]: https://tauri.app/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is how you can setup this project locally.
To get a local copy up and running follow these steps.

### Prerequisites

- [Node.js with npm](https://nodejs.org/en/download/)

### Installation

_Below is how to install and set up the app._

1. Clone the repo
   ```sh
   git clone https://github.com/Muhammed-Rahif/Notepad.git
   ```
1. Get inside:
   ```sh
   cd Notepad
   ```
1. Install npm packages
   ```sh
   npm install
   ```

### Running the project

#### Development:

- Svelte:
  ```sh
  npm run dev
  ```

#### Preview:

```sh
npm run build
npm run preview
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Semantic Release
- [x] Desktop Support
- [ ] Multi-language Support
  - [ ] Chinese
  - [ ] Spanish
  - [ ] Malayalam

See the [open issues](https://github.com/Muhammed-Rahif/Notepad/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Refer [CONTRIBUTING.md](CONTRIBUTING.md).

### Top contributors:

<a href="https://github.com/Muhammed-Rahif/Notepad/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Muhammed-Rahif/Notepad" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Muhammed Rahif - [@Muhammed_Rahif](https://x.com/Muhammed_Rahif) - rahifpalliyalil@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Resources that are helpful and would like to give credit to.

- [Localforage](https://localforage.github.io/localForage)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## FAQ

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `allowJs` in the TS template?**

While `allowJs: false` would indeed prevent the use of `.js` files in the project, it does not prevent the use of JavaScript syntax in `.svelte` files. In addition, it would force `checkJs: false`, bringing the worst of both worlds: not being able to guarantee the entire codebase is TypeScript, and also having worse typechecking for the existing JavaScript. In addition, there are valid use cases in which a mixed codebase may be relevant.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store';
export default writable(0);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Muhammed-Rahif/Notepad.svg?style=for-the-badge
[contributors-url]: https://github.com/Muhammed-Rahif/Notepad/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Muhammed-Rahif/Notepad.svg?style=for-the-badge
[forks-url]: https://github.com/Muhammed-Rahif/Notepad/network/members
[stars-shield]: https://img.shields.io/github/stars/Muhammed-Rahif/Notepad.svg?style=for-the-badge
[stars-url]: https://github.com/Muhammed-Rahif/Notepad/stargazers
[issues-shield]: https://img.shields.io/github/issues/Muhammed-Rahif/Notepad.svg?style=for-the-badge
[issues-url]: https://github.com/Muhammed-Rahif/Notepad/issues
[license-shield]: https://img.shields.io/github/license/Muhammed-Rahif/Notepad.svg?style=for-the-badge
[license-url]: https://github.com/Muhammed-Rahif/Notepad/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/Muhammed-Rahif
[product-screenshot]: public/screenshot.png
