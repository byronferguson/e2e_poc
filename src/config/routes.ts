import { NestHealthModule } from '@bigblueswimschool/nest-health-plugin';
import { NestInfoModule } from '@bigblueswimschool/nest-info-plugin';
import { Routes } from 'nest-router';

export const routes: Routes = [
  {
    // UPDATE: Service Base Path
    path: 'template',
    children: [
      {
        path: 'health',
        module: NestHealthModule,
      },
      {
        path: 'info',
        module: NestInfoModule,
      },
    ],
  },
];
