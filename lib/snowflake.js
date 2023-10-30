import { Snowflake } from 'nodejs-snowflake';

const snowflake = new Snowflake({
  custom_epoch: 1698796800,
  instance_id: 1
});

export default snowflake;