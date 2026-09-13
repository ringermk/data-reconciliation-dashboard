<script lang="ts">
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import type { ReconciliationRecord } from '$lib/types/reconciliation';

	interface Props {
		record: ReconciliationRecord;
		onClose: () => void;
	}

	let { record, onClose }: Props = $props();
</script>

<div class="details-panel">
	<div class="details-header">
		<div>
			<p class="eyebrow">Record Details</p>
			<h3>{record.recordId}</h3>
		</div>

		<button class="close-button" onclick={onClose} aria-label="Close record details">
			×
		</button>
	</div>

	<div class="record-summary">
		<div>
			<span class="label">Source</span>
			<strong>{record.sourceSystem}</strong>
		</div>

		<div>
			<span class="label">Target</span>
			<strong>{record.targetSystem}</strong>
		</div>

		<div>
			<span class="label">Status</span>
			<StatusBadge status={record.status} />
		</div>
	</div>

	<h4>Field Comparison</h4>

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Source Value</th>
				<th>Target Value</th>
				<th>Result</th>
			</tr>
		</thead>

		<tbody>
			{#each record.fields as field (field.fieldName)}
				<tr class:difference={!field.matches}>
					<td>{field.fieldName}</td>
					<td>{field.sourceValue || '—'}</td>
					<td>{field.targetValue || '—'}</td>
					<td>
						{#if field.matches}
							<span class="match">Match</span>
						{:else}
							<span class="different">Different</span>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.details-panel {
		margin-top: 1.5rem;
		padding: 1.5rem;
		border: 1px solid #d1d5db;
		border-radius: 10px;
		background: white;
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.06);
	}

	.details-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.details-header h3 {
		margin: 0;
		font-size: 1.4rem;
	}

	.eyebrow {
		margin: 0 0 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: #64748b;
	}

	.close-button {
		border: none;
		background: transparent;
		font-size: 1.5rem;
		cursor: pointer;
		color: #64748b;
	}

	.record-summary {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: #f8fafc;
		border-radius: 8px;
	}

	.record-summary div {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.label {
		font-size: 0.75rem;
		text-transform: uppercase;
		color: #64748b;
	}

	h4 {
		margin-bottom: 0.75rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid #e5e7eb;
	}

	th {
		background: #f8fafc;
		font-size: 0.8rem;
		color: #475569;
	}

	.difference {
		background: #fff7ed;
	}

	.match {
		color: #166534;
		font-weight: 600;
	}

	.different {
		color: #b45309;
		font-weight: 600;
	}
</style>