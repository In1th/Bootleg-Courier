<script>
    import { page } from '$app/stores';
</script>

<h1>An Error {$page.status} Has occured</h1>
<p>{$page.error?.message}</p>