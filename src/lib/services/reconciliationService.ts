import type {
	BillingRecord,
	FieldComparison,
	ReconciliationRecord
} from '$lib/types/reconciliation';

export function reconcileRecords(
	sourceRecords: BillingRecord[],
	targetRecords: BillingRecord[]
): ReconciliationRecord[] {
	return sourceRecords.map((sourceRecord, index) => {
		const targetRecord = targetRecords.find(
			(target) => target.recordId === sourceRecord.recordId
		);

		if (!targetRecord) {
			return createMissingRecord(sourceRecord, index);
		}

		const fields = compareFields(sourceRecord, targetRecord);

		const hasMismatch = fields.some((field) => !field.matches);

		return {
			id: index + 1,
			recordId: sourceRecord.recordId,
			sourceSystem: 'Legacy Billing',
			targetSystem: 'Modern Billing',
			status: hasMismatch ? 'Mismatch' : 'Matched',
			lastChecked: '2026-09-13 12:55',
			fields
		};
	});
}

function compareFields(
	source: BillingRecord,
	target: BillingRecord
): FieldComparison[] {
	return [
		{
			fieldName: 'Customer Name',
			sourceValue: source.customerName,
			targetValue: target.customerName,
			matches: source.customerName === target.customerName
		},
		{
			fieldName: 'Balance',
			sourceValue: formatCurrency(source.balance),
			targetValue: formatCurrency(target.balance),
			matches: source.balance === target.balance
		}
	];
}

function createMissingRecord(
	source: BillingRecord,
	index: number
): ReconciliationRecord {
	return {
		id: index + 1,
		recordId: source.recordId,
		sourceSystem: 'Legacy Billing',
		targetSystem: 'Modern Billing',
		status: 'Missing in Target',
		lastChecked: '2026-09-13 12:55',
		fields: [
			{
				fieldName: 'Customer Name',
				sourceValue: source.customerName,
				targetValue: '',
				matches: false
			},
			{
				fieldName: 'Balance',
				sourceValue: formatCurrency(source.balance),
				targetValue: '',
				matches: false
			}
		]
	};
}

function formatCurrency(value: number): string {
	return value.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD'
	});
}