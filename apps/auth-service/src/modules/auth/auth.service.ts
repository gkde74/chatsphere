import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from './dto/register.dto';
import { UserRepository } from './repositories/user.repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      email,
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: 'User registered successfully.',
      data: {
        uuid: user.uuid,
        username: user.username,
        email: user.email,
      },
    };
  }

  async login(loginDto: LoginDto) {
    return {
      success: true,
      message: 'Login API will be implemented in the next session.',
    };
  }
}
