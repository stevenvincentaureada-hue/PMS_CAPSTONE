const bcrypt = require("bcrypt");
const userRepo = require("../repositories/user.repository");
const { generateToken } = require("../utils/jwt");

const registerDto = require("../dtos/auth/register.dto");
const loginDto = require("../dtos/auth/login.dto");

// REGISTER
exports.register = async (body) => {
  const data = registerDto(body);

  const existing = await userRepo.findByEmail(data.email);

  if (existing) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await userRepo.createUser({
    email: data.email,
    password_hash: hashedPassword,
    role_id: 2,
  });

  await userRepo.createMemberProfile({
    user_id: user.id,
    first_name: data.first_name,
    middle_name: data.middle_name,
    last_name: data.last_name,
    address: data.address,
    phone_number: data.phone_number,
    license_number: data.license_number,
  });

  return {
    message: "User registered successfully",
    user,
  };
};

// LOGIN
exports.login = async (body) => {
  const data = loginDto(body);

  const user = await userRepo.findByEmail(data.email);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(data.password, user.password_hash);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role_id,
    },
  };
};
