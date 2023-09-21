<template>
	<div class="square-button" @click="$emit('click', $event)" v-bind="$attrs">
		<slot />
	</div>
</template>

<style>
.square-button {
	/* background: rgba(255, 255, 255, 0.2); */
	display: flex;
	border: 1px solid var(--white);
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.5s;
}
.square-button:hover {
	background: var(--real-blue);
}
.square-button img {
	width: 1em;
}
</style>