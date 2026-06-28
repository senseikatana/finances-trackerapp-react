const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const MONTHS = months;
export const CURRENT_MONTH = months[currentMonth];
export const CURRENT_YEAR = currentYear;

export const EXPENSE_CATEGORIES = [
  'Alimentación', 'Restaurantes', 'Transporte', 'Ocio', 'Ropa',
  'Salud', 'Hogar', 'Tecnología', 'Regalos', 'Viajes', 'Mascotas', 'Otros',
];

export const INCOME_CATEGORIES = [
  'Nómina', 'Freelance', 'Inversiones', 'Ventas', 'Regalos', 'Reintegros', 'Otros',
];

export const FIXED_CATEGORIES = [
  'Vivienda', 'Suscripciones', 'Seguros', 'Transporte', 'Finanzas', 'Educación',
];

export const defaultData = {
  settings: {
    currency: '€',
    month: CURRENT_MONTH,
    year: CURRENT_YEAR,
  },

  income: [
    { id: 1, date: '', category: 'Nómina', concept: 'Nómina mensual', amount: 0, notes: '' },
  ],

  fixedExpenses: [
    { id: 1, category: 'Vivienda', concept: 'Alquiler / Hipoteca', provider: '', amount: 0, dueDate: 1, paid: false },
    { id: 2, category: 'Vivienda', concept: 'Agua', provider: '', amount: 0, dueDate: 15, paid: false },
    { id: 3, category: 'Vivienda', concept: 'Luz', provider: '', amount: 0, dueDate: 15, paid: false },
    { id: 4, category: 'Vivienda', concept: 'Internet', provider: '', amount: 0, dueDate: 1, paid: false },
    { id: 5, category: 'Suscripciones', concept: 'Netflix', provider: '', amount: 0, dueDate: 15, paid: false },
    { id: 6, category: 'Suscripciones', concept: 'Spotify', provider: '', amount: 0, dueDate: 15, paid: false },
    { id: 7, category: 'Finanzas', concept: 'Teléfono móvil', provider: '', amount: 0, dueDate: 1, paid: false },
  ],

  subscriptions: [
    {
      id: 1,
      name: 'Google One',
      category: 'Almacenamiento',
      provider: 'Google',
      amount: 1.99,
      billingCycle: 'monthly',
      nextPayment: new Date(currentYear, currentMonth + 1, 1).toISOString().split('T')[0],
      active: true,
      notes: '100 GB de almacenamiento',
    },
    {
      id: 2,
      name: 'Proton Unlimited',
      category: 'Email / VPN',
      provider: 'Proton AG',
      amount: 119.88,
      billingCycle: 'annual',
      nextPayment: new Date(currentYear + 1, 0, 1).toISOString().split('T')[0],
      active: true,
      notes: 'Email, VPN, Drive, Calendar, Pass',
    },
    {
      id: 3,
      name: 'Internxt Drive',
      category: 'Almacenamiento',
      provider: 'Internxt',
      amount: 54.84,
      billingCycle: 'annual',
      nextPayment: new Date(currentYear, 6, 1).toISOString().split('T')[0],
      active: true,
      notes: 'Almacenamiento en la nube cifrado',
    },
  ],

  variableExpenses: [],

  dailyRegister: [],

  budget: [
    { category: 'Vivienda', planned: 0 },
    { category: 'Suscripciones', planned: 0 },
    { category: 'Seguros', planned: 0 },
    { category: 'Transporte', planned: 0 },
    { category: 'Alimentación', planned: 0 },
    { category: 'Restaurantes', planned: 0 },
    { category: 'Ocio', planned: 0 },
    { category: 'Ropa', planned: 0 },
    { category: 'Salud', planned: 0 },
    { category: 'Otros', planned: 0 },
  ],

  savingsGoals: [
    { id: 1, name: 'Fondo de emergencia (3 meses)', target: 6000, saved: 0 },
    { id: 2, name: 'Vacaciones', target: 2000, saved: 0 },
    { id: 3, name: 'Capricho / Compra grande', target: 1000, saved: 0 },
    { id: 4, name: 'Inversión', target: 3000, saved: 0 },
  ],

  debts: [
    { id: 1, creditor: '', concept: 'Préstamo personal', total: 0, paid: 0, monthlyPayment: 0, notes: '' },
    { id: 2, creditor: '', concept: 'Tarjeta crédito', total: 0, paid: 0, monthlyPayment: 0, notes: '' },
  ],
};
