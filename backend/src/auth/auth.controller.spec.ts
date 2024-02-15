import { Test, TestingModule } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { EntityManager } from "typeorm";
import { AuthLoginDto, AuthSignupDto } from "./dto";
import { Request, Response, query } from "express";
import { HttpStatus } from "@nestjs/common";


describe('AuthController', () => {
    let controller: AuthController
    let manager: EntityManager

    const requestMock = {
        query: {}
    } as unknown as Request
    
    const responseMock = {
        status: jest.fn(x => ({
            send: jest.fn(y => y)
        })),
        send: jest.fn(x => x)
    } as unknown as Response
    

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController]
        }).compile()
        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })

    describe('Login', () => {
        it('should return jwt token', () => {
            const dto = new AuthLoginDto();
            dto.email = 'ahmet@gmail.com'
            dto.password = 'qwerty' 
            controller.login(dto)
            expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.CREATED);
        })
    })

    describe('Signup', () => {
        it('should return jwt token', () => {
            const dto = new AuthSignupDto();
            dto.email = 'ahmet2@gmail.com'
            dto.password = 'qwerty'
            dto.passwordCheck = 'qwerty'
            dto.firstName = 'ahmet'
            dto.lastName = 'ahmt' 
            controller.login(dto)
            expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.CREATED);
        })
    })
});