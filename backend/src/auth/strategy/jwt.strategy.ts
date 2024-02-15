import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/entities/user/user.entity";
import { EntityManager } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor( configService: ConfigService, private manager: EntityManager) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("JWT_SECRET")
        });
    }
    async validate(payload: {sub: number, email: string }) {
        const user = await this.manager.findOneBy(User, {
            id: payload.sub
        })
        if (user === null) {
            throw new UnauthorizedException("")
        }
        return user;
    }
}