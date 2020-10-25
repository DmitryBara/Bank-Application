import { Get, Controller } from '@nestjs/common'

@Controller()
export class AppController {
    @Get()
    root(): string {
        return 'See API <a href="/api"> documentation </a>'
    }
}
