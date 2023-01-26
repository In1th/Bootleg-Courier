<script lang="ts">
	import { Order, orderStore } from "$lib/stores/orderStore";
	import { userStore } from "$lib/stores/userStore";
	import { error } from "@sveltejs/kit";
	import OrderView from "$lib/components/OrderView.svelte";
	import Requests from "../Requests.svelte";

    if ($userStore.role !== 'admin'){
        throw error(400, {message: 'You are not authorized to view this', errorId: 'no-auth'})
    }

    let search = ''
	
	const refresh = async () => {
		$orderStore.orders = $orderStore.get($userStore.isAdmin, $userStore.id)
	}

	$: displayOrders = (os: Order[]) => os
		.filter(o => o.approved === 'pending')
		.filter(o => o.name.toLowerCase().includes(search))

	let date = '';
</script>

<svelte:head>
	<title>Orders</title>
	<meta name="description" content="Orders for this user"/>
</svelte:head>

<div class="text-column content">
	{#await $orderStore.orders}
		<p>Waiting ...</p>
	{:then orders} 
	<section>
		<label for='delivery'>Expected date to deliver: </label>
		<input id='delivery' type='date' bind:value={date}/>
	</section>
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
			<th colspan="2">Decision</th>
		</tr>
		{#each displayOrders(orders) as order}
			<OrderView {...order} isAdmin={true}>
				<Requests order={order} refresh={refresh} date={date}/>
			</OrderView>
		{:else}
			<tr><td colspan="8">No orders!</td></tr>
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
		gap: 10px;

		& div {
			margin-left: auto;
		}
	}
</style>