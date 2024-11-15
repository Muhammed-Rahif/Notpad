# Icons

Icons are taken from: https://icones.js.org/

## Icon Usage

Icons used in this project are sourced from [Icones](https://icones.js.org/). The preferred icon set is Lucide, although other icon sets are also allowed.

## Icon Usage

Icons used in this project are sourced from [Icones](https://icones.js.org/). The preferred icon set is Lucide, although other icon sets are also allowed.

### Adding a New Icon

To add a new icon, follow these steps:
1. Create a new file in the `src/lib/components/icons` directory with an appropriate name.
 The file name should be `<IconName>.svelte`.
2. Copy the icon from [Icones](https://icones.js.org/) using the website's "copy as svelte component" feature and paste it into the new icon file.
3. Import the icon in your Svelte components using the following syntax:

    ```svelte
    import TheIcon from '@/components/icons/<IconName>.svelte';
    ```

