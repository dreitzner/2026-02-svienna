export function wait(ms = 1) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function lazyComponentLoader(componentName: string) {
	await wait(2000);
	if (componentName === 'PinkSquare')
		return (await import('$lib/component/PinkSquare.svelte')).default;
	if (componentName === 'BlueCircle')
		return (await import('$lib/component/BlueCircle.svelte')).default;
	if (componentName === 'RedSemicircle')
		return (await import('$lib/component/RedSemicircle.svelte')).default;
	if (componentName === 'GreenTriangle')
		return (await import('$lib/component/GreenTriangle.svelte')).default;
	return (await import('$lib/component/Fallback.svelte')).default;
}
