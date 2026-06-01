import { IPersistenceStrategy } from '../IPersistenceStrategy';
import { supabase } from '../../../lib/supabaseClient';

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
                    return data.map((h: any) => ({
                        id: h.id,
                        address: h.address,
                        type: h.type,
                        rent: h.rent,
                        status: h.status,
                        imageUrl: h.image_url,
                        amenities: h.amenities
                    })) as unknown as T[];
                }

                case 'users': {
                    const { data, error } = await supabase.from('profiles').select('*');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;
                    return data.map((p: any) => ({
                        id: p.id,
                        name: p.name,
                        email: p.email,
                        phone: p.phone,
                        status: p.status,
                        type: p.type
                    })) as unknown as T[];
                }

                case 'bookings': {
                    const { data, error } = await supabase.from('bookings').select('*, houses(address), profiles(name)');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;
                    return data.map((b: any) => ({
                        id: b.id,
                        houseId: b.house_id,
                        userId: b.user_id,
                        startDate: b.start_date,
                        endDate: b.end_date,
                        status: b.status,
                        houseName: b.houses?.address || 'Unknown Address',
                        userName: b.profiles?.name || 'Unknown Tenant'
                    })) as unknown as T[];
                }

                case 'contracts': {
                    const { data, error } = await supabase.from('contracts').select('*');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;
                    return data.map((c: any) => ({
                        id: c.id,
                        bookingId: c.booking_id,
                        startDate: c.start_date,
                        endDate: c.end_date,
                        status: c.status,
                        houseName: 'Live Contract Source',
                        userName: 'Tenant Profile'
                    })) as unknown as T[];
                }

                case 'payments': {
                    const { data, error } = await supabase.from('payments').select('*');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;
                    return data.map((p: any) => ({
                        id: p.id,
                        contractId: p.contract_id,
                        amount: p.amount,
                        dueDate: p.due_date,
                        paidDate: p.paid_date,
                        status: p.status,
                        transactionId: p.transaction_id
                    })) as unknown as T[];
                }

                case 'maintenance_requests': {
                    const { data, error } = await supabase.from('maintenance_requests').select('*, houses(address)');
                    if (error) throw error;
                    if (!data || data.length === 0) return defaultItems;
                    return data.map((m: any) => ({
                        id: m.id,
                        houseId: m.house_id,
                        houseName: m.houses?.address || 'Unknown House',
                        description: m.description,
                        status: m.status,
                        priority: m.priority,
                        reportedDate: m.reported_date
                    })) as unknown as T[];
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
                    const payload = (items as any[]).map(h => ({
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
                    const payload = (items as any[]).map(u => ({
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
                    const payload = (items as any[]).map(b => ({
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
                    const payload = (items as any[]).map(c => ({
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
                    const payload = (items as any[]).map(p => ({
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
