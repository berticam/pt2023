import { Body, Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { LoginDto } from "./Dto/login.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req){
    //hocem dobiti podatke o trenutnem userju
    return req.user;
  }
}
