<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import * as AlertDialog from "./index.js";
	import { cn } from "@/utils.js"; // Removed flyAndScale if not exported

	type $$Props = AlertDialogPrimitive.ContentProps;

	let className: $$Props["class"] = undefined;
	export let transition: $$Props["transition"] = undefined; // Use default or another transition if needed
	export let transitionConfig: $$Props["transitionConfig"] = undefined;
	export { className as class };
</script>
<AlertDialog.Portal>
	<AlertDialog.Overlay />
	<AlertDialogPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(
			"bg-background fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg  sm:rounded-lg md:w-full",
			className
		)}
		{...$$restProps}
	>
		<slot />
	</AlertDialogPrimitive.Content>
</AlertDialog.Portal>
