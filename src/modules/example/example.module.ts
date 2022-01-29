import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleController } from './example.controller';
import { StudentEntity } from './example.entity';
import { ExampleService } from './example.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
