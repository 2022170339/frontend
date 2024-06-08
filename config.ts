import { faker } from '@faker-js/faker';

export const adminMenus = [
  {
    title: 'Employees',
    href: '/admin/employee'
  },
  {
    title: 'Payroll',
    href: '/admin/payroll'
  },
  {
    title: 'Attendance',
    href: '/admin/attendance'
  },
  {
    title: 'Settings',
    href: '/admin/settings'
  }
]

export const users = [
  ...Array.from({ length: 100 }).map((_, index) => ({
    id: index + 1,
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    birthDate: faker.date.birthdate(),
    position: faker.person.jobTitle(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress()
  }))
]
