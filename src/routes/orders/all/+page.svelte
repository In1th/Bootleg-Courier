<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Order } from "$lib/models/dtos";
	import { orderStore } from "$lib/stores/orderStore";
	import { userStore } from "$lib/stores/userStore";
	import { error } from "@sveltejs/kit";
	import DeleteOrder from "../../DeleteOrder.svelte";
	import OrderView from "../../OrderView.svelte";

    if (!$userStore.loggedIn){
		throw error(400, {message: 'You are not authorized to view this', errorId: 'no-auth'})
    }

    let search = ''
	
	const refresh = async () => {
		$orderStore.orders = $orderStore.get($userStore.isAdmin, $userStore.id)
	}

	$: displayOrders = (os: Order[]) => os
		.filter(o => o.name.toLowerCase().includes(search))

</script>

<svelte:head>
	<title>Orders</title>
	<meta name="description" content="Orders for this user" />
</svelte:head>

<div class="text-column">
	{#await $orderStore.orders}
		<p>Waiting ...</p>
	{:then orders} 
	<section>
		<input placeholder="search" bind:value={search}/>
		<div>
			<button on:click={refresh}>Refresh</button>
		</div>
	</section>
	<table id='orders'>
		<tr>
			<th>Order</th>
			<th>Contracted By</th>
			<th>Quantity</th>
			<th>Cost</th>
			<th>Status</th>
			<th>Delivery By</th>
			<th></th>
		</tr>
		{#each displayOrders(orders) as order}
			<OrderView {...order} isAdmin={true}>
				<DeleteOrder id={order.id} callbackDelete={refresh}/>
			</OrderView>
		{:else}
			<tr><td colspan="7">No orders!</td></tr>
		{/each}
	</table>
	{/await}
</div>

<style lang="scss">
	table{
		min-width: 48rem;
	}
	section {
		display: flex;

		& div {
			margin-left: auto;
		}
	}
</style>