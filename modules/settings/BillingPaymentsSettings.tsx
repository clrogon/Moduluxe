import React from 'react';
import { Subscription, PaymentMethod, BillingInvoice, BillingInvoiceStatus } from '../../shared/types/index';
import { CreditCardIcon } from '../../components/ui/icons/Icons';

interface BillingPaymentsSettingsProps {
    subscription: Subscription;
    paymentMethods: PaymentMethod[];
    invoices: BillingInvoice[];
}

const StatusPill: React.FC<{ status: BillingInvoiceStatus }> = ({ status }) => {
    const statusClasses = {
        Paid: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Failed: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
            {status}
        </span>
    );
};

const BillingPaymentsSettings: React.FC<BillingPaymentsSettingsProps> = ({ subscription, paymentMethods, invoices }) => {
    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-6 flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                    <CreditCardIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">Billing & Payments</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your subscription, payment methods, and view invoices.</p>
                </div>
            </div>
            
            {/* Subscription Plan */}
            <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Subscription Plan</h4>
                <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600 flex justify-between items-center">
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white">{subscription.plan} Plan</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">${subscription.price}/month - Renews on {subscription.renewalDate}</p>
                    </div>
                    <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Upgrade Plan</button>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Payment Methods</h4>
                <ul className="mt-4 space-y-3">
                    {paymentMethods.map(method => (
                        <li key={method.id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border dark:border-gray-600 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{method.details} {method.isDefault && <span className="text-xs text-green-600 dark:text-green-400">(Default)</span>}</span>
                            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Remove</button>
                        </li>
                    ))}
                </ul>
                 <button className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">+ Add new payment method</button>
            </div>

            {/* Invoice History */}
            <div className="p-6">
                 <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Invoice History</h4>
                 <div className="mt-4 border-t border-gray-200 dark:border-gray-600">
                    <table className="w-full">
                        <thead className="sr-only">
                            <tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th><th>Action</th></tr>
                        </thead>
                         <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                             {invoices.map(invoice => (
                                 <tr key={invoice.id}>
                                     <td className="py-3 text-sm text-gray-600 dark:text-gray-300">{invoice.date}</td>
                                     <td className="py-3 text-sm font-medium text-gray-800 dark:text-gray-100">{invoice.description}</td>
                                     <td className="py-3 text-sm text-gray-600 dark:text-gray-300">${invoice.amount.toFixed(2)}</td>
                                     <td className="py-3"><StatusPill status={invoice.status} /></td>
                                     <td className="py-3 text-right">
                                         <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Download</button>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                    </table>
                 </div>
            </div>
        </div>
    );
};

export default BillingPaymentsSettings;
