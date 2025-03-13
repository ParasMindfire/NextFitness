import { sequelize } from '../db';

export const getAllUsers = async () => {
  return await sequelize.query('SELECT * FROM users');
};

export const getUserByEmail = async (email: string | undefined | null) => {
  // console.log("yahan aya ? ");
  return await sequelize.query('SELECT * FROM users WHERE email = ?', {
    replacements: [email],
  });
};

export const getUserById = async (id: number) => {
  console.log('id ', id);
  return await sequelize.query('SELECT * FROM users WHERE user_id = ?', {
    replacements: [id],
  });
};

export const insertUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string
) => {
  console.log(
    name + ' ' + email + ' ' + phone + ' ' + address + ' ' + password
  );
  return await sequelize.query(
    'INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
    { replacements: [name, email, password, phone, address] }
  );
};

export const updateUserPassword = async (
  email: string,
  newPassword: string
) => {
  return await sequelize.query(
    'UPDATE users SET password = ? WHERE email = ?',
    {
      replacements: [newPassword, email],
    }
  );
};

export const deleteUserByEmail = async (email: string) => {
  return await sequelize.query('DELETE FROM users WHERE email = ?', {
    replacements: [email],
  });
};

export const updateUserProfilePic = async (
  email: string,
  profilePic: string
) => {
  return await sequelize.query(
    'UPDATE users SET profile_pic = ? WHERE email = ?',
    {
      replacements: [profilePic, email],
    }
  );
};


export const deleteUserById=async(id: string)=>{
    return await sequelize.query("delete from useres where user_id=?",{
        replacements:[id]
    })
}