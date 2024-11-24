<script lang="ts">
  interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { ...props }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}
  ><path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.063 3.5H12A1.5 1.5 0 0 1 13.5 5v6a1.5 1.5 0 0 1-1.5 1.5h-1.441l-.029-.03c-.75-.75-.78-1.425-.78-3.22A.75.75 0 0 0 9 8.5H7.753c.018-1.895.162-3.441 1.31-5m-1.777 0H4A1.5 1.5 0 0 0 2.5 5v6A1.5 1.5 0 0 0 4 12.5h4.714c-.38-.76-.45-1.574-.462-2.5H7a.75.75 0 0 1-.75-.75v-.07c0-1.89 0-3.791 1.036-5.68M1 5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3zm9.25 2.25a.75.75 0 0 0 1.5 0v-1a.75.75 0 0 0-1.5 0zM4.75 8A.75.75 0 0 1 4 7.25v-1a.75.75 0 0 1 1.5 0v1a.75.75 0 0 1-.75.75"
    clip-rule="evenodd"
  /></svg
>
