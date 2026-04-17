const db = require("../configs/db");

exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

exports.createUser = async (user) => {
  const [result] = await db.query(
    `INSERT INTO users (email, password_hash, role_id)
     VALUES (?, ?, ?)`,
    [user.email, user.password_hash, user.role_id || 2],
  );

  return {
    id: result.insertId,
    email: user.email,
    role_id: user.role_id || 2,
  };
};

exports.createMemberProfile = async (profile) => {
  await db.query(
    `INSERT INTO member_profile (user_id, first_name, middle_name, last_name, address, phone_number, license_number)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      profile.user_id,
      profile.first_name,
      profile.middle_name,
      profile.last_name,
      profile.address,
      profile.phone_number,
      profile.license_number,
    ],
  );
};
