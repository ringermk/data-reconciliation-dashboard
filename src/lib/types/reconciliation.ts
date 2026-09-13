export type ReconciliationStatus =
	| 'Matched'
	| 'Mismatch'
	| 'Missing in Target';

export type ReconciliationFilter = 'All' | ReconciliationStatus;

export interface BillingRecord {
	recordId: string;
	customerName: string;
	balance: number;
}

export interface FieldComparison {
	fieldName: string;
	sourceValue: string;
	targetValue: string;
	matches: boolean;
}

export interface ReconciliationRecord {
	id: number;
	recordId: string;
	sourceSystem: string;
	targetSystem: string;
	status: ReconciliationStatus;
	lastChecked: string;
	fields: FieldComparison[];
}