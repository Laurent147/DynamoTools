const Dynamoose = require('dynamoose');
const { convertDuration } = require('./index')

class dynamoQuery {
  constructor(schema, tableName, globalAWSConfig) {
    const ddb = new Dynamoose.aws.ddb.DynamoDB(globalAWSConfig);
    // const ddb = new Dynamoose.aws.sdk.DynamoDB(globalAWSConfig);
    Dynamoose.aws.ddb.set(ddb);
    
    const tableSchema = new Dynamoose.Schema(schema, {
      throughput: {
        read: 15,
        write: 5
      },
      useNativeBooleans: true,
      useDocumentTypes: true,
      timestamps: true,
      saveUnknown: true
    });

    this.model = Dynamoose.model(tableName, tableSchema); // DEV_ENTRY // LOCAL_ENTRY
  }

  async findItemById (key, id) {
    const start = new Date().getTime();
    try {
      const resp = await this.model
        .query(key)
        .eq(id)
        .exec();
      console.log(`Query ended in ${convertDuration(start)}`);
      return resp ? resp.toJSON() : null;
    } catch (error) {
      console.log('There was a error....\n',error);
      console.log(`Query ended in ${new Date().getTime() - start}ms`);
      return null;
    }
  };

  async findItemCount (key, id) {
    const start = new Date().getTime();
    try {
      const resp = await this.model
        .query(key)
        .eq(id)
        .all()
        .count()
        .exec();
      console.log(`Query ended in ${convertDuration(start)}`);
      return resp;
    } catch (error) {
      console.log('There was a error....\n',error);
      console.log(`Query ended in ${new Date().getTime() - start}ms`);
      return null;
    }
  };

  async findItemCountByIndex (key, id, index) {
    const start = new Date().getTime();
    try {
      const resp = await this.model
        .query(key)
        .eq(id)
        .using(index)
        .all()
        .count()
        .exec();
      console.log(`Query ended in ${convertDuration(start)}`);
      return resp;
    } catch (error) {
      console.log('There was a error....\n',error);
      console.log(`Query ended in ${new Date().getTime() - start}ms`);
      return null;
    }
  };

}

module.exports = dynamoQuery;
