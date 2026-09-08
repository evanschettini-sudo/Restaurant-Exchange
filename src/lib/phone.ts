const E164_US_PHONE = /^\+1[2-9]\d{9}$/;

export function normalizeUsPhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  const nationalNumber =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  const normalized = `+1${nationalNumber}`;

  return E164_US_PHONE.test(normalized) ? normalized : null;
}

export function formatUsPhone(value: string): string {
  const normalized = normalizeUsPhone(value);
  if (!normalized) return value;

  const digits = normalized.slice(2);
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
