<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Order } from "$lib/models/dtos";
	import { orderStore } from "$lib/stores/orderStore";
	import { userStore } from "$lib/stores/userStore";
	import { error } from "@sveltejs/kit";

    let name = '';
    let quantity = 1;
    let price = 0.0;

    const onSubmit = async () => {
        try{ 
            await $orderStore.setOrder({
                id: '0',
                name: name,
                contractor: $userStore.id,
                approved: 'pending',
                quantity: quantity,
                cost: price,
                deliveryTime: new Date()
            } as Order);
            name = '';
            goto('/orders')
            alert('Order has been requested! The administrator will review this order. You can go back to orders.') //devil's work
        } catch (e: unknown){
            throw error(400);
        }
    }

    const goBack = () => goto('/orders')
</script>

<section>
    <b>Request a new order.</b>
    <form on:submit={onSubmit}>
        <label for='orderName'>Order name</label>
        <input id='orderName'bind:value={name} required/>
        <label for='orderQuantity'>Quantity</label>
        <input id='orderQuantity' type="number" min="1" bind:value={quantity}/>
        <label for='orderValue'>Value</label>
        <div>
            <span>$</span>
            <input id='orderValue' type="number" step="0.01" bind:value={price}/>
        </div>
        <input type="submit" value="Request Order"/>
    </form>
    <button on:click={goBack}>Go back</button>
</section>

<style lang="scss">
    section, form {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 3rem;
    }

    input {
        width: 10rem;
    }
</style>