<script lang='ts'>
	import { Order } from "$lib/stores/orderStore";
	import Status from "./orders/Status.svelte";

    export let {id, name, contractor, cost, quantity, approved, deliveryTime}: Order = new Order();
    export let isAdmin = false;

    $: date = approved === 'approved'? 
        deliveryTime.toDateString() : 
        approved === 'rejected'? 'N/A': 'waiting for approval';
</script>

<tr id={`order ${name}-${contractor}`}>
    <td>{name}</td>
    {#if isAdmin}
        <td>{contractor}</td>
    {/if}
    <td class="centered">x{quantity}</td>
    <td class="centered">{cost}</td>
    <td>
        <Status status={approved}/>
    </td>
    <td>{date}</td>
    <slot/>
</tr>

<style lang='scss'>
    .centered{
        text-align: center;
    }
</style>