<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import { Notpad } from '@/helpers/notpad';
  import * as ContextMenu from '@/components/ui/context-menu';
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  type Props = {
    type: 'menubar' | 'contextmenu';
  };

  const { type }: Props = $props();
  const dateTimeFormats = ['hh:mm A', 'HH:mm', 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
  let now: number = $state(Date.now());

  onMount(() => {
    const ONE_MINUTE = 60 * 1000;

    /**
     * https://stackoverflow.com/a/10797177/14781260
     */
    function repeatEvery(func: () => void, interval: number) {
      var now = new Date(),
        delay = interval - (now.getTime() % interval);

      function start() {
        func();
        setInterval(func, interval);
      }

      setTimeout(start, delay);
    }

    repeatEvery(() => (now = Date.now()), ONE_MINUTE);
  });

  const menuItems = [
    { label: 'Undo', shortcut: 'Ctrl+Z', action: () => Notpad.editOptions.undo() },
    { label: 'Redo', shortcut: 'Ctrl+Y', action: () => Notpad.editOptions.redo() },
    { type: 'separator' },
    { label: 'Cut', shortcut: 'Ctrl+X', action: () => Notpad.editOptions.cut() },
    { label: 'Copy', shortcut: 'Ctrl+C', action: () => Notpad.editOptions.copy() },
    { label: 'Paste', shortcut: 'Ctrl+V', action: () => Notpad.editOptions.paste() },
    { label: 'Delete', shortcut: 'Delete', action: () => Notpad.editOptions.delete() },
    { type: 'separator' },
    { label: 'Select All', shortcut: 'Ctrl+A', action: () => Notpad.editOptions.selectAll() },
    { label: 'Time/Date' }
    // {
    //   subs: [
    //     {
    //       label: 'Bold',
    //       action: makeBold
    //     },
    //     {
    //       label: 'Italic',
    //       action: makeItalic
    //     },
    //     {
    //       label: 'Underline',
    //       action: makeUnderline
    //     }
    //   ],
    //   label: 'Text'
    // }
  ];

  const Separator = $derived(type === 'menubar' ? Menubar.Separator : ContextMenu.Separator);
  const Sub = $derived(type === 'menubar' ? Menubar.Sub : ContextMenu.Sub);
  const SubTrigger = $derived(type === 'menubar' ? Menubar.SubTrigger : ContextMenu.SubTrigger);
  const SubContent = $derived(type === 'menubar' ? Menubar.SubContent : ContextMenu.SubContent);
  const Item = $derived(type === 'menubar' ? Menubar.Item : ContextMenu.Item);
</script>

{#each menuItems as item}
  {#if item.type === 'separator'}
    <Separator />
  {:else if item.label == 'Time/Date'}
    <Sub>
      <SubTrigger>{item.label}</SubTrigger>
      <SubContent>
        {#each dateTimeFormats as format}
          {@const dateTimeContent = dayjs(now).format(format)}

          <Item
            onclick={() => {
              Notpad.editOptions.insertOrReplace({
                content: dateTimeContent
              });
            }}
          >
            {dateTimeContent}
          </Item>
        {/each}
      </SubContent>
    </Sub>
    <!-- {:else if item.subs}
    <Sub>
      <SubTrigger>{item.label}</SubTrigger>

      <SubContent>
        {#each item.subs as subItem}
          <Item onclick={subItem.action}>
            {subItem.label}
          </Item>
        {/each}
      </SubContent>
    </Sub> -->
  {:else}
    <Menubar.Item onclick={item.action}>
      {item.label}
      {#if item.shortcut}
        <Menubar.Shortcut>{item.shortcut}</Menubar.Shortcut>
      {/if}
    </Menubar.Item>
  {/if}
{/each}
