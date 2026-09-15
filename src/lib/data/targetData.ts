import type { BillingRecord } from '$lib/types/reconciliation';

export const targetData: BillingRecord[] = [
	{
		recordId: 'ACCT-1001',
		customerName: 'KU Health',
		balance: 1250.00
	},
	{
		recordId: 'ACCT-1002',
		customerName: 'AdventHealth Shawnee',
		balance: 825.25
	},
	{
		recordId: 'ACCT-1004',
		customerName: 'Mosaic Diagnostics',
		balance: 640.75
	}
];