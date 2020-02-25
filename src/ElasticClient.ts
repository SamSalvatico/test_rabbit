import {
  Client,
  // Object that contains the type definitions of every API method
  RequestParams,
  // Interface of the generic API response
  ApiResponse,
} from '@elastic/elasticsearch'

import * as dotenv from 'dotenv';
const http = require('http');

dotenv.config();
const elasticUrl = process.env.ELASTIC_URL;
const client = new Client({ node: elasticUrl })

// Define the type of the body for the Search request
interface SearchBody {
  query: {
    match: { foo: string }
  }
}

// Complete definition of the Search response
interface ShardsResponse {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
}

interface Explanation {
  value: number;
  description: string;
  details: Explanation[];
}

interface SearchResponse<T> {
  took: number;
  timed_out: boolean;
  _scroll_id?: string;
  _shards: ShardsResponse;
  hits: {
    total: number;
    max_score: number;
    hits: Array<{
      _index: string;
      _type: string;
      _id: string;
      _score: number;
      _source: T;
      _version?: number;
      _explanation?: Explanation;
      fields?: any;
      highlight?: any;
      inner_hits?: any;
      matched_queries?: string[];
      sort?: string[];
    }>;
  };
  aggregations?: any;
}

// Define the interface of the source object
interface Source {
  foo: string
}

async function run(): Promise<void> {
  // Define the search parameters
  const searchParams: RequestParams.Search<SearchBody> = {
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  }


  client.index()    // Craft the final type definition
  const response: ApiResponse<SearchResponse<Source>> = await client.search(searchParams)
  console.log(response.body)
}

run().catch(console.log)