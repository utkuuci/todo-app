# TODO APP

### Uygulamanın ER Diagramı aşağıdaki gibidir.

![MarineGEO circle logo](/images/erdiagram.PNG "ER Diagram")

### Uygulamanın backend servisi 4 controller ve seristen oluşmaktadır.

1. Auth Controller ve Service
2. User Controller ve Service
3. Todo Controller ve Service
4. Message Controller ve Service

Uygulamada Authentication ve Authorization için JWT ve Passport.js kullanıldı.

### Uygulamanın Temel Diagramı aşağıdaki gibidir.
![MarineGEO circle logo](/images/appdiagram.png "App Diagram")

### Altta ki kod bloğu @UseGuards() decorator için yapılmış bir Strategy amaç kod kalabalığını azaltmak.

```typescript
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
```

### Auth klasörünün decorators klasörünün içindeki @GetUser() decoratörü bulunmaktadır. Bunun yapmamdaki sebep her seferinde EntityManager service dosyasının içinde kullanıp kullanıcıyı her methodda aratmadan tek bir decorator sayesinde alabiliyorum

```typescript
export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request: Express.Request = ctx.switchToHttp().getRequest()
        if (data) {
            return request.user[data];
        }
        return request.user;
    }
) 
```

### Örnek Kullanımı
```typescript
@UseGuards(JwtGuard)
@Post("/create")
createTodo(@GetUser() user: User, @Body() todoCreateDto: TodoCreateDto){
  return this.todoService.createTodo(user, todoCreateDto)
}
```

### Docker contaier için frontend için node:18-alpine, backend için ise node:18 versiyonunu kullandım

### Aşağıdaki görüdüğünüz docker-compose.yaml dosyasında tüm servisleri ayağa kaldırıken belli bir sıraya göre containerlar çalışıyor. İlk önce database ayağa kalkması gerekir eğer backend önce kalkar ise veritabanına bağlanamadığı için loglar da error vericektir. Database ayağa kalktıktan sonra backend sonrasında frontend kalkmata ve böylece hiçbir sorun olmadan servislerimiz çalışacaktır.
```yaml
version: '3.5'

services:
  postgresql:
    container_name: postgresql
    image: postgres
    restart: always
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=1234
      - POSTGRES_DB=posteffectai
  frontend:
    build: ./frontend
    depends_on:
      - backend
    restart: always
    ports:
      - 3000:8080
  backend:
    build: ./backend
    depends_on:
      - postgresql
    restart: always
    ports:
      - 5000:4000
  
```
