import { Module } from '@nestjs/common';
import { ModulesModule } from './book/modules/modules.module';

@Module({
  imports: [ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
