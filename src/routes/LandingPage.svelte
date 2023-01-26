<script>

	import { userStore } from "$lib/stores/userStore";

</script>

<section class="content">
	<h1>
		Welcome to my pain, {$userStore.name}
	</h1>
	<section>
		<p>You are a {$userStore.role}. That means you can:</p>
		{#if $userStore.role === 'user'}
			<ul>
			<li>View your own orders</li>
			<li>Request new orders</li>
			<li>Delete your own orders</li>
			</ul>
		{:else}
			<ul>
				<li>View your own orders</li>
				<li>Request new orders</li>
				<li>Delete orders</li>
				<li>Approve requested orders</li>
			</ul>
		{/if}
	</section>
</section>
