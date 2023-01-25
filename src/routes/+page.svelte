<script lang='ts'>
	import { firebaseStore } from '$lib/stores/firebaseStore';
	import { userStore } from '$lib/stores/userStore';
	import { initializeApp } from 'firebase/app';
	import { getAuth, browserSessionPersistence, setPersistence } from 'firebase/auth';
	import LandingPage from './LandingPage.svelte';
	import LoginScreen from './LoginScreen.svelte';

	export let data;

	if (!$firebaseStore.app){
		$firebaseStore.app = initializeApp(data);
	}
	if(!$firebaseStore.auth){
		$firebaseStore.auth = getAuth($firebaseStore.app)
		setPersistence($firebaseStore.auth, browserSessionPersistence);
	}
	
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if !$userStore.loggedIn}
		<LoginScreen/>
	{:else}
		<LandingPage/>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
