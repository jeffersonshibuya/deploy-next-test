import type { NextApiRequest, NextApiResponse } from 'next'

import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { FilesDBResponseData } from '@/types';

const ddbClient = new DynamoDBClient({
  region: process.env.NEXT_AWS_REGION,
  credentials: {
    accessKeyId: 'AKIARQKPMY4YVNNZCMXV',
    secretAccessKey: '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'
  }
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FilesDBResponseData[] | string>
) {
  try {
    const input = {
      TableName: 'terraform-gasos-ballot-upload-library',
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
    return res.status(500).json(JSON.stringify(error))
  }
  
}