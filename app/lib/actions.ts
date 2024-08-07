'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const InvoiceFormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});


const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];


    // Test it out:
    // insert into db here
    try {
        const res = await axios.post('Next/insertInvoice', { customerId, amount: amountInCents, status, date });
        console.log('inserted successfully');
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to insert invoice.');
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

}

const UpdateInvoice = InvoiceFormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    // Test it out:
    // update db here

    try {
        const res = await axios.put('Next/updateInvoice', {}/*, { id, customerId, amount: amountInCents, status }*/);
        console.log('updated successfully');
    } catch (error: any) {
        console.log('error: ' + error.message)
        //console.error('Database Error:', error);
        throw new Error('Failed to update invoice.');
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {

    try {
        const res = await axios.delete(`Next/deleteInvoice/${id}`);
        console.log('deleted successfully');
    } catch (error: any) {
        console.log('error: ' + error.message)
        //console.error('Database Error:', error);
        throw new Error('Failed to delete invoice.');
    } revalidatePath('/dashboard/invoices');
}

const UserFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
});

const UpdateUserSchema = UserFormSchema.omit({ id: true });

export async function updateCustomer(id: string, formData: FormData) {
    const { name, email } = UpdateUserSchema.parse({
        name: formData.get('name'),
        email: formData.get('email'),
    });

    // Test it out:
    // update db here

    try {
        const res = await axios.put('Next/updateCustomer'/*, { id: id, name: name, email: email}*/);
        console.log('updated successfully');
    } catch (error: any) {
        console.log('error: ' + error.message)
        //console.error('Database Error:', error);
        throw new Error('Failed to update customer.');
    }

    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {

    try {
        const res = await axios.delete(`Next/deleteCustomer/${id}`);
        console.log('deleted successfully');
    } catch (error: any) {
        console.log('error: ' + error.message)
        //console.error('Database Error:', error);
        throw new Error('Failed to delete customer.');
    } revalidatePath('/dashboard/customers');
}