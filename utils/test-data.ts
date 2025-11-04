export const Data = {
  bike: { type: /Lasten.*Transportrad/i, brand: /Achiever/i, frame: '1000000' },
  dates: { kaufdatum: '02.11.2025', versicherungsbeginn: '01.12.2025' },
  priceTier: /bis 3\.500,00 €/,
  user: {
    first: 'Shorooq', last: 'Hasan', dob: '12.01.1994',
    addressQuery: 'Heidestraße 23, Berlin',
    email: 'shery.s@gmail.com'
  }
} as const;
