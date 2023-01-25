<script lang='ts'>
	import { Order } from "$lib/models/dtos";
	import { orderStore } from "$lib/stores/orderStore";
	import { userStore } from "$lib/stores/userStore";
	import DeleteOrder from "../DeleteOrder.svelte";
	import OrderView from "../OrderView.svelte";
	import './tableStyle.scss';

	let search = ''
	
	const refresh = async () => {
		$orderStore.orders = $orderStore.get($userStore.isAdmin, $userStore.id)
	}

	$: displayOrders = (os: Order[]) => os
		.filter(o => o.contractor === $userStore.id)
		.filter(o => o.name.toLowerCase().includes(search))
		.filter(o => !Order.pastDelivery(o))

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
				<a href="/orders/new">
					<button>+</button>
				</a>
				<button on:click={refresh}>Refresh</button>
			</div>
		</section>
		<table id='orders'>
			<tr>
				<th>Order</th>
				<th>Quantity</th>
				<th>Cost</th>
				<th>Status</th>
				<th>Delivery By</th>
				<th></th>
			</tr>
			{#each displayOrders(orders) as order}
				<OrderView {...order} isAdmin={false}>
					<DeleteOrder id={order.id} callbackDelete={refresh}/>
				</OrderView>
			{:else}
				<tr><td colspan="6">No orders!</td></tr>
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
