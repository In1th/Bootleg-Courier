<script>
	import { Order, orderStore } from "$lib/stores/orderStore";

    export let order = new Order();
    export let date = ''
    export let refresh = () => {return;}

    const approve = async () => {
        if (date === ''){
            return;
        }
        order.deliveryTime = new Date(date)
        order.approved = 'approved'
        await $orderStore.approveOrder(order, 'approved');
        refresh()
    }

    const reject = async () => {
        if (date === ''){
            return;
        }
        order.deliveryTime = new Date(date)
        order.approved = 'rejected'
        await $orderStore.approveOrder(order, 'rejected')
        refresh()
    }
</script>

<td>
    <button on:click={approve}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 14L9 17L18 6" stroke="#33363F" stroke-width="2"/>
        </svg>
    </button>
</td>
<td>
    <button on:click={reject}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#33363F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="#33363F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> 
    </button>
</td>

<style lang="scss">
    button {
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        cursor: pointer;

        transition: all .1s ease-in;

        &:hover {
            background-color: rgba(0,0,0,.1);
        }
    }
</style>