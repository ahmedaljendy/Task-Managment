import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { SignInDto, SignUpDto } from 'src/dtos/dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signup(dto: SignUpDto) {
    // check if email exists
    const { name, email, password } = dto;
    const user = await this.usersRepository.findOne({ where: { email } });
    //if it exists -> thro error
    if (user) {
      throw new ConflictException(
        `user with this ${email} already exist , do you want to sign in ? `,
      );
    }
    // hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = this.usersRepository.create({
      name,
      email,
      password,
    });

    this.usersRepository.save(newUser);

    // return new user without password
    return {
      user: newUser,
    };
  }

  async signin(dto: SignInDto) {
    const { email, password } = dto;
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['password'],
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET')!,
    });

    return {
      user: email,
      token,
    };
  }

  async validateOrCreateUser(profile: any) {
    let user: User | null = await this.usersRepository.findOne({
      where: { provider: profile.provider, providerId: profile.providerId },
    });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const newUser = this.usersRepository.create({
        ...profile,
        password: hashedPassword,
      });

      user = (await this.usersRepository.save(newUser)) as unknown as User;
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return { user, token };
  }
}
