import type { NextApiRequest, NextApiResponse } from 'next'

import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { FilesDBResponseData } from '@/types';

const ddbClient = new DynamoDBClient({
  region: process.env.NEXT_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY || ''
  }
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FilesDBResponseData[] | string>
) {
  try {
    const input = {
      TableName: process.env.NEXT_AWS_DYNAMODB_TABLE_NAME,
      FilterExpression: '#status <> :statusValue',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':statusValue': { S: 'uploading' }
      }
    };
    const command = new ScanCommand(input);
    const response = await ddbClient.send(command);

    const items: any = response.Items?.map((item) => unmarshall(item));

    return res.status(200).json(items || [])
  } catch (error) {
    console.log(error);
    return res.status(400).json(JSON.stringify(error))
  }
  
}