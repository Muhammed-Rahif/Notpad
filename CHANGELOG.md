# [1.0.0-alpha.4](https://github.com/Muhammed-Rahif/Notpad/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2024-12-02)


### Bug Fixes

* **dialog:** made content scrollable, header & footer sticky ([1a2b443](https://github.com/Muhammed-Rahif/Notpad/commit/1a2b4431694071bc62eeb31249db065928c4b500))
* **editor:** fake caret animation improvements ([b6d83b1](https://github.com/Muhammed-Rahif/Notpad/commit/b6d83b101b5bae5ed7bb03a708b8e21ad58f5394))
* **files:** file dialogs reappear after cancellation (open/save/save As) ([dc7c4a7](https://github.com/Muhammed-Rahif/Notpad/commit/dc7c4a768106ff0cd163a263ff8e493bf5af41e5)), closes [#243](https://github.com/Muhammed-Rahif/Notpad/issues/243)
* **menubar:** only show latest release downloads ([0ad3b44](https://github.com/Muhammed-Rahif/Notpad/commit/0ad3b44a76cc27e1b0a829e58961cab73bf350cd))
* **mobile:** status bar content are misaligned ([576e5b7](https://github.com/Muhammed-Rahif/Notpad/commit/576e5b7de308e7a2bb6790979b1450821ca8a02a))
* **responsiveness:** editor title overlapping if maxlength are met ([e526055](https://github.com/Muhammed-Rahif/Notpad/commit/e5260551e6d785d0cdaed0b7cc8d73ce72c9c636))
* **shortcuts:** remove unwanted trigger button from shortcuts dialog that caused scroll issues ([ed6f9a7](https://github.com/Muhammed-Rahif/Notpad/commit/ed6f9a72669357d6093865313371c8993472dcaf))
* **storage:** refining data from inavailable values of editor caused content merge ([35fa06b](https://github.com/Muhammed-Rahif/Notpad/commit/35fa06b5092e7853d30b38f482305602d115e5bf))
* **storage:** when new values introduced they take default values in case of old users ([aa6c0cd](https://github.com/Muhammed-Rahif/Notpad/commit/aa6c0cdaaa199d1a1f5cc6f618f3207a6bfe801e)), closes [#242](https://github.com/Muhammed-Rahif/Notpad/issues/242)
* **svelte:** svelte 5 `run` replaced using `effect` ([0eab892](https://github.com/Muhammed-Rahif/Notpad/commit/0eab892362a0f84234a8fb47fdf9ddd469abb451))
* **tauri:** minimum width & height are added; exit not working on tauri ([5cc5847](https://github.com/Muhammed-Rahif/Notpad/commit/5cc58472b6dd5a023fe7eb58cb46fcee709304c5))
* temp ([92def1d](https://github.com/Muhammed-Rahif/Notpad/commit/92def1d2a4930f968faa07893f6fdea7dd29c6c4))
* **vite:** `manualChunks` incorrect config with pnpm ([733a8c9](https://github.com/Muhammed-Rahif/Notpad/commit/733a8c93c2a163f1f2461d4d6fae7c31706ecfae))


### Features

* editing filename limit update ([81f95b0](https://github.com/Muhammed-Rahif/Notpad/commit/81f95b0c3224be5465093db1759a574e2ba4c832))
* **menubar:** add a new button Display All Shortcuts ([d2d8374](https://github.com/Muhammed-Rahif/Notpad/commit/d2d837456070e7f9b924236df802402bc5ec35d6))

# [1.0.0-alpha.3](https://github.com/Muhammed-Rahif/Notpad/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2024-11-18)

### Bug Fixes

- **editor:** fake caret dispositioned when toggling line numbers ([d6c7370](https://github.com/Muhammed-Rahif/Notpad/commit/d6c7370b380bdff7338911da2015722fa16f8d6d))
- **editor:** inifinite recursion in editor caret position update ([fe9df2b](https://github.com/Muhammed-Rahif/Notpad/commit/fe9df2b53953c487076cc412b5818bb4a4ba9b84)), closes [#234](https://github.com/Muhammed-Rahif/Notpad/issues/234)
- **logo:** remove app logo white background color ([5568d65](https://github.com/Muhammed-Rahif/Notpad/commit/5568d6512d0e9d8aaacdc18b6d92e55b278de5db)), closes [#236](https://github.com/Muhammed-Rahif/Notpad/issues/236)
- **tauri:** search on google not wokring on tauri ([db17944](https://github.com/Muhammed-Rahif/Notpad/commit/db17944ac275feb962795f57e980da4081e11347)), closes [#235](https://github.com/Muhammed-Rahif/Notpad/issues/235)

# [1.0.0-alpha.2](https://github.com/Muhammed-Rahif/Notpad/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2024-11-18)

### Bug Fixes

- **about:** version is undefined and repo url is incorrect ([a1fc34c](https://github.com/Muhammed-Rahif/Notpad/commit/a1fc34c786888eae7be491a2e443e7299f693fcc))
- **editor:** add line numbers on left exit animation ([16cb4d1](https://github.com/Muhammed-Rahif/Notpad/commit/16cb4d13e44ca4dfa1026fb6b3ccc4d9b860999b))
- **editor:** line no correctly aligned ([f7f2794](https://github.com/Muhammed-Rahif/Notpad/commit/f7f27949e9064f5da6c55f137d98f4d8d495b788))
- **file:** save/open file issues on cross platform browsers ([aa71537](https://github.com/Muhammed-Rahif/Notpad/commit/aa71537cb47773a506747a92284b8f4ddec0b500))
- **loading:** update loading animation ([a581755](https://github.com/Muhammed-Rahif/Notpad/commit/a581755e3008535c87350d35d81430a52f07bc13))
- **menubar:** download button animate on mount ([418f000](https://github.com/Muhammed-Rahif/Notpad/commit/418f000e5d97abd7837b3cf29560bcb244ba0f93))
- **menubar:** hide download button until lg ([a9743b1](https://github.com/Muhammed-Rahif/Notpad/commit/a9743b110f35754e9fd70cd49adb0f6b6e5521e9))
- **tauri:** failed to get updater configuration: plugins > updater doesn't exist ([161d32a](https://github.com/Muhammed-Rahif/Notpad/commit/161d32acd44f71dd8ed37428741e2708aca829d6))
- **view-options:** line numbers displaying issues; toggle line number in settings ([95b0b99](https://github.com/Muhammed-Rahif/Notpad/commit/95b0b998d4d5bc85198a3b60be031b8266545562))

### Features

- **menubar:** add download button for web ([59f7e45](https://github.com/Muhammed-Rahif/Notpad/commit/59f7e4556d53cc48b0d604abc4c6535dfbe44690))
- **menubar:** add download-button ([ed13660](https://github.com/Muhammed-Rahif/Notpad/commit/ed136602f9b30fd4d640e4dc211136b9c97eb12c))
- **menubar:** add GitHub button to menubar `help` ([4216ea9](https://github.com/Muhammed-Rahif/Notpad/commit/4216ea960f947753df9b2f2e1a81f100f863faec))

# 1.0.0-alpha.1 (2024-10-15)

### Bug Fixes

- can’t save or open file on mobile devices ([94f80a0](https://github.com/Muhammed-Rahif/Notpad/commit/94f80a0f26f613b5bc3225e0d7f2aa2371c1bb60)), closes [#182](https://github.com/Muhammed-Rahif/Notpad/issues/182)
- **config:** svelte with neutralino problems ([00a9656](https://github.com/Muhammed-Rahif/Notpad/commit/00a965664b07f6f68314822e480ec087deb89f7f))
- **editor:** editor title close button bg color ([b639bd4](https://github.com/Muhammed-Rahif/Notpad/commit/b639bd43b88233d97908bc976767b69ffeb51da2))
- **gh-pages:** blank page ([55be62f](https://github.com/Muhammed-Rahif/Notpad/commit/55be62fe532480c48135240ade0e70cc7b57f34f))
- **menubar:** close the notepad ([333c6a8](https://github.com/Muhammed-Rahif/Notpad/commit/333c6a8effc1d16cfa275a7d57f6dfd2778dbb62))
- **menubar:** dark mode label is not dynamic ([9f4968b](https://github.com/Muhammed-Rahif/Notpad/commit/9f4968bd005888939b27c08ddad8443e39f4bf81)), closes [#195](https://github.com/Muhammed-Rahif/Notpad/issues/195)
- **print:** print with large content adds a scrollbar ([2111f84](https://github.com/Muhammed-Rahif/Notpad/commit/2111f84b180ea0c2fd071733459a8110db28550e))
- **pwa:** vite-pwa not offline compatible ([f860d07](https://github.com/Muhammed-Rahif/Notpad/commit/f860d07bd0b081bbe5e9a3daf72036588e1db037))
- **statusbar:** move statusbar to a new component ([629d145](https://github.com/Muhammed-Rahif/Notpad/commit/629d145d2ff48711d3b91dbee34f2147430415b5))
- **tauri:** menubar file options support on tauri ([4bb4883](https://github.com/Muhammed-Rahif/Notpad/commit/4bb48838357634c2d83496fb8e8b86c9f877ee6f))

### Features

- Add character count feature to textarea ([53c826e](https://github.com/Muhammed-Rahif/Notpad/commit/53c826e86cfd7c1d426373aaee267d24f40bb4e9))
- **editor:** open text files from local ([8f0935a](https://github.com/Muhammed-Rahif/Notpad/commit/8f0935acd66923801964c24729920d551161575c))
- **files:** save and save as ([ad68c28](https://github.com/Muhammed-Rahif/Notpad/commit/ad68c28a89e1eae8fb9f70d5dc9b82360fd3a539))
- migrate to svelte from sveltekit ([a77d5d9](https://github.com/Muhammed-Rahif/Notpad/commit/a77d5d98509d7f69393d41f7b89e378d90ffdf89))
- print active editor ([2db8efe](https://github.com/Muhammed-Rahif/Notpad/commit/2db8efea1ffd53ab28459979b6f8751b66f278e8))
- **tauri:** replace neutralino using tauri ([8ea0897](https://github.com/Muhammed-Rahif/Notpad/commit/8ea089784fe7a790d85c1df236d6f52366e81956))
