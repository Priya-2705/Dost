import User from '@/models/User';
import bcrypt from 'bcryptjs';

/**
 * Creates a default superadmin if one doesn't exist.
 */
export async function initSuperAdmin() {
  const adminEmail = 'admin@dost.com';
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Dost@2705', 10);

    await User.create({
      firstName: 'Super',
      lastName: 'Admin',
      dob: '1990-01-01',
      email: adminEmail,
      password: hashedPassword,
      profession: 'Admin',
      address: 'Dost HQ',
      role: 'superadmin',
    });

    console.log('Superadmin created');
  } else {
    console.log('Superadmin already exists');
  }
}