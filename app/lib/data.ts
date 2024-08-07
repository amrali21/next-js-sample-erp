import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:44317/';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const result = await axios.get('Next/getRevenue');

    return result.data;

  } catch (error: any) {
    console.log('error message: ' + error.message);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = await axios.get('Next/getLatestInvoices');

    return result.data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = await axios.get('Next/getCardData')

    const numberOfInvoices = result.data.invoiceCount;
    const numberOfCustomers = result.data.customerCount;
    const totalPaidInvoices = formatCurrency(result.data.invoiceStatus.paid);
    const totalPendingInvoices = formatCurrency(result.data.invoiceStatus.pending);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    console.log(`params, query: ${query} itemsPerPage: ${ITEMS_PER_PAGE} offest: ${offset}`)

    const res = await axios.get('Next/fetchFilteredInvoices', { params: { query, itemsPerPage: ITEMS_PER_PAGE, offset } });

    return res.data;
  } catch (error: any) {
    console.log('error message: ' + error.message)
    //console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {

    const res = await axios.get('Next/fetchInvoicesPages', { params: { query } })

    const totalPages = Math.ceil(Number(res.data) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {

    const res = await axios.get('Next/fetchInvoiceById', { params: { id } })

    return res.data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers(query: string) {
  try {

    const res = await axios.get('Next/fetchCustomers', { params: { query: query } })
    const customers = res.data;

    return customers;

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchCustomerById(id: string) {
  try {

    const res = await axios.get('Next/fetchCustomerByID', { params: { id } })

    return res.data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
  }
}

export async function fetchCustomerPages(query: string) {
  try {

    const res = await axios.get('Next/fetchCustomerPages', { params: { query } })

    const totalPages = Math.ceil(Number(res.data) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchFilteredCustomers(query: string, currentPage: number) {
  try {

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const res = await axios.get('Next/fetchFilteredCustomers', { params: { query, itemsPerPage: ITEMS_PER_PAGE, offset } })
    const customers = res.data;

    return customers;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const res = await axios.get('Next/getUser', { params: { email } })

    return res.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
