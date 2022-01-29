import { databaseConfigService } from '../config/database-config.service';
import fs = require('fs');

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(databaseConfigService.getTypeOrmConfig(), null, 2),
);
