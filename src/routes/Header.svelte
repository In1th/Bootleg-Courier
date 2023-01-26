<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { firebaseStore } from '$lib/stores/firebaseStore';
	import { orderStore } from '$lib/stores/orderStore';
	import {userStore} from '$lib/stores/userStore';
	import { signOut } from 'firebase/auth';
	
	$: userPhotoUrl = $userStore.photoUrl ? $userStore.photoUrl : `https://avatars.dicebear.com/api/identicon/${$userStore.name}.svg?background=%23ffffff`

	const logOut = () => {
		signOut($firebaseStore.auth!).then(() => {
		  goto('/');
		  $userStore.loggedIn = false;
		  $orderStore.orders = $orderStore.cheat();
		});
	}

</script>

<header>
	<div class="corner main-button">
		<a href="/" title='go to home'>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#clip0_2_8319)">
				<path
					d="M12.279 1.66949C12.0999 1.59772 11.9001 1.59772 11.721 1.66949L2.769 5.24999L6.375 6.69149L15.606 2.99999L12.279 1.66949ZM17.625 3.80849L8.394 7.49999L12 8.94149L21.231 5.24999L17.625 3.80849ZM22.5 6.35849L12.75 10.2585V22.1415L22.5 18.2415V6.35999V6.35849ZM11.25 22.143V10.257L1.5 6.35849V18.243L11.25 22.143ZM11.1645 0.275988C11.7008 0.061487 12.2992 0.061487 12.8355 0.275988L23.529 4.55399C23.668 4.60971 23.7872 4.70578 23.8711 4.82982C23.9551 4.95387 24 5.10021 24 5.24999V18.243C23.9998 18.5427 23.9098 18.8355 23.7417 19.0836C23.5735 19.3317 23.3348 19.5238 23.0565 19.635L12.279 23.946C12.0999 24.0178 11.9001 24.0178 11.721 23.946L0.945 19.635C0.666377 19.524 0.427414 19.3321 0.258963 19.084C0.0905126 18.8358 0.000309494 18.5429 0 18.243L0 5.24999C3.48599e-05 5.10021 0.0449156 4.95387 0.128861 4.82982C0.212805 4.70578 0.331969 4.60971 0.471 4.55399L11.1645 0.275988Z" fill="white"/>
				</g>
				<defs>
				<clipPath id="clip0_2_8319">
				<rect width="24" height="24" fill="white"/>
				</clipPath>
				</defs>
			</svg>
		</a>
	</div>

	{#if $userStore.loggedIn}
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Dashboard</a>
			</li>
			<li aria-current={$page.url.pathname === '/orders' ? 'page' : undefined}>
				<a href="/orders">Your Orders</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/history') ? 'page' : undefined}>
				<a href="/history">History</a>
			</li>
			{#if $userStore.role === 'admin'}
			<li aria-current={$page.url.pathname.startsWith('/orders/all') ? 'page' : undefined}>
				<a href="/orders/all">All Orders</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/requests') ? 'page' : undefined}>
				<a href="/requests">Requests</a>
			</li>
			{/if}
		</ul>
	</nav>
	{/if}
	

	{#if $userStore.loggedIn}
		<div class="corner last">
			<button on:click={logOut} title="Click to log out">
				<img src={userPhotoUrl} alt={`${$userStore.name}`} />
			</button>
		</div>
	{/if}
</header>

<style lang='scss'>
	header {
		display: flex;
		justify-content: space-between;
		margin: .5em 1.5em;
		background-color: var(--login-color);
		border-radius: 2em 2em 0 2em;
	}

	.main-button{
		background-color: var(--color-theme-1);
		border-radius: 2em;
	}

	.corner {
		width: 3em;
		height: 3em;

		& a {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
		}

		& img {
			border-radius: 1em;
			width: 2em;
			height: 2em;
			object-fit: contain;
		}
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.last{
		margin-left: auto;
		width: 5em;
    	display: flex;
    	justify-content: center;
		background-color: var(--color-theme-1);
		border-radius: 0 1.5em 0 0;
		& button {
			background: none;
			box-shadow: none;
			border: none;
			cursor: pointer;
			
			padding: 0;
		}
	}

</style>
