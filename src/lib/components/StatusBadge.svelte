<script lang="ts">
	import type { ReconciliationStatus } from '$lib/types/reconciliation';

	interface Props {
		status: ReconciliationStatus;
	}

	let { status }: Props = $props();
</script>

<span
	class="status-badge"
	class:matched={status === 'Matched'}
	class:mismatch={status === 'Mismatch'}
	class:missing={status === 'Missing in Target'}
>
	{status}
</span>

<style>
	.status-badge {
		display: inline-block;
		border-radius: 999px;
		padding: 0.3rem 0.7rem;
		font-size: 0.8rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.matched {
		background: #dcfce7;
		color: #166534;
	}

	.mismatch {
		background: #fef3c7;
		color: #92400e;
	}

	.missing {
		background: #fee2e2;
		color: #991b1b;
	}
</style>