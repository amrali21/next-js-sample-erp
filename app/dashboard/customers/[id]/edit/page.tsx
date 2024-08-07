import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers, fetchCustomerById } from '@/app/lib/data';
import EditCustomerForm from '@/app/ui/customers/edit-form';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const customer = await fetchCustomerById(id);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: '/dashboard/customers' },
                    {
                        label: 'Edit User',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditCustomerForm customer={customer} />
        </main>
    );
}