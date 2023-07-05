import {Controller, Get, Render} from '@nestjs/common';

@Controller('search')
export class SearchController {

    @Render('search')
    @Get('/')
    public async getPage() {
        //
    }
}
