export const Data = {
  bike: {
    brand: /Achiever/i,
    type: /Stadtrad/i,
    frame: '1000000',
  },
  dates: { kaufdatum: '02.11.2025', versicherungsbeginn: '01.12.2025' },
  priceRange: /bis 3\.500,00 €/,
  user: {
    firstName: 'Shorooq',
    lastName: 'Hasan',
    dateOfBirth: '12.01.1994',
    email: 'shorooq.hasan@gmail.com',
    phoneNumber: '+491234567890',
    houseNumber: '123',
    street: 'Heidestraße 23',
    city: 'Berlin',
    zipCode: '10115',
    country: 'Deutschland',
    state: 'Berlin',
    addressQuery: 'Heidestraße 23, Berlin', // Keep for backward compatibility
  },
  payment: {
    IBAN: 'DE58417406935110435708',
    firstName: 'Shorooq',
    lastName: 'Hasan',
  },
} as const;
