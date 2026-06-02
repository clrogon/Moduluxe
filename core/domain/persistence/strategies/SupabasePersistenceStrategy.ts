import { IPersistenceStrategy } from '../IPersistenceStrategy';
import { supabase } from '../../../lib/supabaseClient';
import { House, User, Booking, Contract, Payment, MaintenanceRequest } from '../../../../shared/types/index';

/**
 * Strong Type Definitions for Supabase Table Rows
 */
interface SupabaseHouseRow {
    id: string;
    address: string;
    type: string;
    rent: number;
    status: string;
    image_url: string;
    amenities: string[];
}

interface SupabaseProfileRow {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    type: string;
}

interface SupabaseBookingRow {
    id: string;
    house_id: string;
    user_id: string;
    start_date: string;
    end_date: string;
    status: string;
    houses?: { address: string } | null;
    profiles?: { name: string } | null;
}

interface SupabaseContractRow {
    id: string;
    booking_id: string;
    start_date: string;
    end_date: string;
    status: string;
}

interface SupabasePaymentRow {
    id: string;
    contract_id: string;
    amount: number;
    due_date: string;
    paid_date: string | null;
    status: string;
    transaction_id: string | null;
}

interface SupabaseMaintenanceRow {
    id: string;
    house_id: string;
    description: string;
    status: string;
    priority: string;
    reported_date: string;
    houses?: { address: string } | null;
}

/**
 * Supabase Cloud Persistence Strategy
 * Maps local domain objects into cloud-hosted tables over client-side REST.
 * Enables live multi-tenant/multi-user synchronization.
 */
export class SupabasePersistenceStrategy implements IPersistenceStrategy {
    public readonly id = 'supabase';
    public readonly name = 'Supabase PostgreSQL Cloud';
    public readonly description = 'Syncs files to your production Supabase database instance. Enables genuine persistent team collaboration.';
    public readonly isConfigurable = true;

    public async initialize(): Promise<boolean> {
        if (!supabase) {
            console.warn('SupabaseClient is currently unavailable. Ensure env variables are configured.');
            return false;
        }
        return true;
    }

    /**
     * Loads entities from Supabase with relational joins where appropriate.
     */
    public async load<T>(key: string, defaultItems: T[]): Promise<T[]> {
        if (!supabase) return defaultItems;

        try {
            switch (key) {
                case 'houses': {
                    const { data, error } = await supabase.from('houses').select('*');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;
                    
                    const rows = data as SupabaseHouseRow[];
                    const mapped: House[] = rows.map(h => ({
                        id: h.id,
                        address: h.address,
                        type: h.type,
                        rent: h.rent,
                        status: h.status,
                        imageUrl: h.image_url,
                        amenities: h.amenities
                    }));
                    return mapped as unknown as T[];
                }

                case 'users': {
                    const { data, error } = await supabase.from('profiles').select('*');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;

                    const rows = data as SupabaseProfileRow[];
                    const mapped: User[] = rows.map(p => ({
                        id: p.id,
                        name: p.name,
                        email: p.email,
                        phone: p.phone,
                        status: p.status,
                        type: p.type
                    }));
                    return mapped as unknown as T[];
                }

                case 'bookings': {
                    const { data, error } = await supabase.from('bookings').select('*, houses(address), profiles(name)');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;

                    const rows = data as unknown as SupabaseBookingRow[];
                    const mapped: Booking[] = rows.map(b => ({
                        id: b.id,
                        houseId: b.house_id,
                        userId: b.user_id,
                        startDate: b.start_date,
                        endDate: b.end_date,
                        status: b.status,
                        houseName: b.houses?.address || 'Unknown Address',
                        userName: b.profiles?.name || 'Unknown Tenant'
                    }));
                    return mapped as unknown as T[];
                }

                case 'contracts': {
                    const { data, error } = await supabase.from('contracts').select('*');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;

                    const rows = data as SupabaseContractRow[];
                    const mapped: Contract[] = rows.map(c => ({
                        id: c.id,
                        bookingId: c.booking_id,
                        startDate: c.start_date,
                        endDate: c.end_date,
                        status: c.status,
                        houseName: 'Live Contract Source',
                        userName: 'Tenant Profile'
                    }));
                    return mapped as unknown as T[];
                }

                case 'payments': {
                    const { data, error } = await supabase.from('payments').select('*');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;

                    const rows = data as SupabasePaymentRow[];
                    const mapped: Payment[] = rows.map(p => ({
                        id: p.id,
                        contractId: p.contract_id,
                        amount: p.amount,
                        dueDate: p.due_date,
                        paidDate: p.paid_date,
                        status: p.status,
                        transactionId: p.transaction_id
                    }));
                    return mapped as unknown as T[];
                }

                case 'maintenance_requests': {
                    const { data, error } = await supabase.from('maintenance_requests').select('*, houses(address)');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;

                    const rows = data as unknown as SupabaseMaintenanceRow[];
                    const mapped: MaintenanceRequest[] = rows.map(m => ({
                        id: m.id,
                        houseId: m.house_id,
                        houseName: m.houses?.address || 'Unknown House',
                        description: m.description,
                        status: m.status,
                        priority: m.priority,
                        reportedDate: m.reported_date
                    }));
                    return mapped as unknown as T[];
                }

                default: {
                    // Fall back to client space localStorage for nested dynamic maps or secondary parameters
                    const locallyStored = localStorage.getItem(`moduluxe_local_cache_${key}`);
                    return locallyStored ? JSON.parse(locallyStored) : defaultItems;
                }
            }
        } catch (err) {
            console.error(`Supabase persistence load issue with "${key}":`, err);
            return defaultItems;
        }
    }

    /**
     * Upserts collections or elements into the cloud database tables.
     */
    public async save<T>(key: string, items: T[]): Promise<boolean> {
        if (!supabase) return false;

        try {
            switch (key) {
                case 'houses': {
                    const houses = items as unknown as House[];
                    const payload: SupabaseHouseRow[] = houses.map(h => ({
                        id: h.id,
                        address: h.address,
                        type: h.type,
                        rent: h.rent,
                        status: h.status,
                        image_url: h.imageUrl,
                        amenities: h.amenities
                    }));
                    const { error } = await supabase.from('houses').upsert(payload, { onConflict: 'id' });
                    if (error) throw error;
                    return true;
                }

                case 'users': {
                    const users = items as unknown as User[];
                    const payload: SupabaseProfileRow[] = users.map(u => ({
                        id: u.id,
                        name: u.name,
                        email: u.email,
                        phone: u.phone,
                        status: u.status,
                        type: u.type
                    }));
                    const { error } = await supabase.from('profiles').upsert(payload, { onConflict: 'id' });
                    if (error) throw error;
                    return true;
                }

                case 'bookings': {
                    const bookings = items as unknown as Booking[];
                    const payload: SupabaseBookingRow[] = bookings.map(b => ({
                        id: b.id,
                        house_id: b.houseId,
                        user_id: b.userId,
                        start_date: b.startDate,
                        end_date: b.endDate,
                        status: b.status
                    }));
                    const { error } = await supabase.from('bookings').upsert(payload, { onConflict: 'id' });
                    if (error) throw error;
                    return true;
                }

                case 'contracts': {
                    const contracts = items as unknown as Contract[];
                    const payload: SupabaseContractRow[] = contracts.map(c => ({
                        id: c.id,
                        booking_id: c.bookingId,
                        start_date: c.startDate,
                        end_date: c.endDate,
                        status: c.status
                    }));
                    const { error } = await supabase.from('contracts').upsert(payload, { onConflict: 'id' });
                    if (error) throw error;
                    return true;
                }

                case 'payments': {
                    const payments = items as unknown as Payment[];
                    const payload: SupabasePaymentRow[] = payments.map(p => ({
                        id: p.id,
                        contract_id: p.contractId,
                        amount: p.amount,
                        due_date: p.dueDate,
                        paid_date: p.paidDate,
                        status: p.status,
                        transaction_id: p.transactionId
                    }));
                    const { error } = await supabase.from('payments').upsert(payload, { onConflict: 'id' });
                    if (error) throw error;
                    return true;
                }

                default: {
                    localStorage.setItem(`moduluxe_local_cache_${key}`, JSON.stringify(items));
                    return true;
                }
            }
        } catch (err) {
            console.error(`Supabase persistence save issue with "${key}":`, err);
            return false;
        }
    }
}
