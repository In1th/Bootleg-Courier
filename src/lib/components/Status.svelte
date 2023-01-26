<script lang='ts'>

	import type { Status } from "$lib/stores/orderStore";

    export let status: Status;
</script>

{#if status === 'approved'}
    <section title="Your order was approved!">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 14L9 17L18 6" stroke="#33363F" stroke-width="2"/>
        </svg>
    </section>    
{:else if status === 'rejected'}
    <section title="Your order was rejected. Tough luck!">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#33363F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="#33363F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>   
    </section>
{:else}
    <section title='Your order is waiting for admin to approve.'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#33363F" stroke-width="2"/>
            <path d="M16.5 12H12.25C12.1119 12 12 11.8881 12 11.75V8.5" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
        </svg>    
    </section>
{/if}