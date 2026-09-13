<script lang="ts">
	interface Props {
		label: string;
		value: number;
	}

	let { label, value }: Props = $props();
</script>

<div class="summary-card">
	<p class="label">{label}</p>
	<p class="value">{value}</p>
</div>

<style>
	.summary-card {
		border: 1px solid #d9d9d9;
		border-radius: 8px;
		padding: 1rem;
		background: white;
	}

	.label {
		margin: 0 0 0.5rem;
		font-size: 0.9rem;
		color: #666;
	}

	.value {
		margin: 0;
		font-size: 1.75rem;
		font-weight: 700;
	}
</style>