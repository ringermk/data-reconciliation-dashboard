import type { BillingRecord } from '$lib/types/reconciliation';

export const sourceData: BillingRecord[] = [
	{
		recordId: 'ACCT-1001',
		customerName: 'Acme Health',
		balance: 1250.00
	},
	{
		recordId: 'ACCT-1002',
		customerName: 'Northside Clinic',
		balance: 875.25
	},
	{
		recordId: 'ACCT-1003',
		customerName: 'Westbrook Medical',
		balance: 2410.00
	},
	{
		recordId: 'ACCT-1004',
		customerName: 'Summit Diagnostics',
		balance: 640.75
	}
];