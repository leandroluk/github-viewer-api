import { ClassProvider, Module } from '@nestjs/common';
import { CompareHashAdapter } from './compare-hash';
import { CreateHashAdapter } from './create-hash';
import { CreateJwtTokenAdapter } from './create-jwt-token';
import { CreateUuidAdapter } from './create-uuid';
import { VerifyJwtTokenAdapter } from './verify-jwt-token';

const providers: ClassProvider[] = [
  { provide: 'ICompareHashAdapter', useClass: CompareHashAdapter },
  { provide: 'ICreateHashAdapter', useClass: CreateHashAdapter },
  { provide: 'ICreateJwtTokenAdapter', useClass: CreateJwtTokenAdapter },
  { provide: 'ICreateUuidAdapter', useClass: CreateUuidAdapter },
  { provide: 'IVerifyJwtTokenAdapter', useClass: VerifyJwtTokenAdapter },
];

@Module({
  providers,
  exports: providers,
})
export class AdaptersModule {}
