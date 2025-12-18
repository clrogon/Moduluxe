
import { LocalizationPreferences } from '../../shared/types/index';

export const formatCurrency = (amount: number, prefs: LocalizationPreferences) => {
  if (amount === undefined || amount === null) return '';
  try {
    return new Intl.NumberFormat(prefs.language, {
      style: 'currency',
      currency: prefs.currency,
    }).format(amount);
  } catch (e) {
    // Fallback if locale/currency code is invalid
    return `${prefs.currency} ${amount.toFixed(2)}`;
  }
};

export const formatDate = (dateStr: string | null | undefined, prefs: LocalizationPreferences) => {
  if (!dateStr) return 'N/A';
  try {
      const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
      if (isNaN(date.getTime())) return dateStr;
      return new Intl.DateTimeFormat(prefs.language).format(date);
  } catch (e) {
      return String(dateStr);
  }
};
