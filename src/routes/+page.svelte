<script lang="ts">
	import StatusBadge from '$lib/components/StatusBadge.svelte';
    import SummaryCard from '$lib/components/SummaryCard.svelte';
    import { sourceData } from '$lib/data/sourceData';
    import { targetData } from '$lib/data/targetData';
    import { reconcileRecords } from '$lib/services/reconciliationService';
    import RecordDetails from '$lib/components/RecordDetails.svelte';

    import type {
        ReconciliationFilter,
        ReconciliationRecord
    } from '$lib/types/reconciliation';

    const reconciliationData = reconcileRecords(sourceData, targetData);
	const totalRecords = reconciliationData.length;
	const matchedRecords = reconciliationData.filter(
		(record) => record.status === 'Matched'
	).length;
	const mismatchedRecords = reconciliationData.filter(
		(record) => record.status === 'Mismatch'
	).length;
	const missingRecords = reconciliationData.filter(
		(record) => record.status === 'Missing in Target'
	).length;

    const filterOptions: ReconciliationFilter[] = [
	'All',
	'Matched',
	'Mismatch',
	'Missing in Target'
    ];

    let selectedStatus = $state<ReconciliationFilter>('All');
    let selectedRecord = $state<ReconciliationRecord | null>(null);
    let searchTerm = $state('');

    let filteredRecords = $derived(
	reconciliationData.filter((record) => {
		const matchesStatus =
			selectedStatus === 'All' ||
			record.status === selectedStatus;

		const search = searchTerm.trim().toLowerCase();

		const matchesSearch =
			search === '' ||
			record.recordId.toLowerCase().includes(search) ||
			record.sourceSystem.toLowerCase().includes(search) ||
			record.targetSystem.toLowerCase().includes(search);

		return matchesStatus && matchesSearch;
	})
);
</script>

<svelte:head>
	<title>Data Reconciliation Dashboard</title>
</svelte:head>

<main>
	<h1>Data Reconciliation Dashboard</h1>

	<p>
		Compare records between legacy and modern systems and identify
		data discrepancies.
	</p>

	<section>
		<h2>Summary</h2>

        <div class="summary-grid">
            <SummaryCard label="Total Records" value={totalRecords} />
            <SummaryCard label="Matched" value={matchedRecords} />
            <SummaryCard label="Mismatched" value={mismatchedRecords} />
            <SummaryCard label="Missing in Target" value={missingRecords} />
        </div>
	</section>

	<section>
		<h2>Reconciliation Results</h2>

        <div class="search-container">
            <label for="record-search">Search records</label>

            <input
                id="record-search"
                type="search"
                placeholder="Search by record ID or system..."
                bind:value={searchTerm}
            />
        </div>

        <p class="result-count">
            Showing {filteredRecords.length} of {totalRecords} records
        </p>

        <div class="filters">
            {#each filterOptions as option (option)}
                <button
                    class:active={selectedStatus === option}
                    aria-pressed={selectedStatus === option}
                    onclick={() => selectedStatus = option}
                >
                    {option}
                </button>
            {/each}
        </div>

		<table>
			<thead>
				<tr>
					<th>Record ID</th>
					<th>Source</th>
					<th>Target</th>
					<th>Status</th>
					<th>Last Checked</th>
				</tr>
			</thead>

			<tbody>
                {#if filteredRecords.length > 0}
                    {#each filteredRecords as record (record.id)}
                        <tr>
                            <td>
                                <button
                                    class="record-link"
                                    onclick={() => selectedRecord = record}
                                >
                                    {record.recordId}
                                </button>
                            </td>

                            <td>{record.sourceSystem}</td>
                            <td>{record.targetSystem}</td>

                            <td>
                                <StatusBadge status={record.status} />
                            </td>

                            <td>{record.lastChecked}</td>
                        </tr>
                    {/each}
                {:else}
                    <tr>
                        <td colspan="5" class="no-results">
                            No reconciliation records match your search.
                        </td>
                    </tr>
                {/if}
            </tbody>
		</table>
        {#if selectedRecord}
            <RecordDetails
                record={selectedRecord}
                onClose={() => selectedRecord = null}
            />
        {/if}
	</section>
</main>

<style>
	main {
		max-width: 1100px;
		margin: 0 auto;
		padding: 2rem;
		font-family:
			Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
			sans-serif;
		color: #1f2937;
	}

	h1 {
		margin-bottom: 0.5rem;
	}

	h2 {
		margin-top: 2rem;
	}

	.summary-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-bottom: 2rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		overflow: hidden;
	}

	th,
	td {
		padding: 0.9rem 1rem;
		text-align: left;
		border-bottom: 1px solid #e5e7eb;
	}

	th {
		background: #f8fafc;
		font-size: 0.85rem;
		font-weight: 600;
		color: #475569;
	}

	td {
		font-size: 0.9rem;
	}

	tbody tr:hover {
		background: #f8fafc;
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

    .filters {
	display: flex;
	gap: 0.5rem;
	margin-bottom: 1rem;
}

.filters button {
	border: 1px solid #d1d5db;
	border-radius: 6px;
	padding: 0.5rem 0.9rem;
	background: white;
	color: #374151;
	font-size: 0.85rem;
	cursor: pointer;
}

.filters button:hover {
	background: #f3f4f6;
}

.filters button.active {
	background: #1e293b;
	border-color: #1e293b;
	color: white;
}

.record-link {
	border: none;
	padding: 0;
	background: transparent;
	color: #2563eb;
	font: inherit;
	font-weight: 600;
	cursor: pointer;
}

.record-link:hover {
	text-decoration: underline;
}

.search-container {
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	max-width: 420px;
	margin-bottom: 1rem;
}

.search-container label {
	font-size: 0.8rem;
	font-weight: 600;
	color: #475569;
}

.search-container input {
	width: 100%;
	border: 1px solid #d1d5db;
	border-radius: 6px;
	padding: 0.65rem 0.8rem;
	font: inherit;
}

.search-container input:focus {
	outline: 2px solid #93c5fd;
	outline-offset: 1px;
	border-color: #3b82f6;
}

.result-count {
	margin: 0 0 0.75rem;
	font-size: 0.8rem;
	color: #64748b;
}

.no-results {
	padding: 2rem;
	text-align: center;
	color: #64748b;
}
</style>