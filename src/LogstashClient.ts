import http from 'http';
import { isNull } from 'util';
import * as dotenv from 'dotenv';

class LogstashClient {
  private host: string;
  private protocol: string;
  private port: number;
  private requestOptions: any;

  constructor(logstashProtocol: string | null = null, logstashHost: string | null = null, logstashPort: string | number | null = null) {
    dotenv.config();
    if (isNull(logstashProtocol)) {
      this.protocol = process.env.LOGSTASH_PROTOCOL ? process.env.LOGSTASH_PROTOCOL : "http";
    }
    else {
      this.protocol = logstashProtocol;
    }
    if (isNull(logstashHost)) {
      this.host = process.env.LOGSTASH_HOST ? process.env.LOGSTASH_HOST : "localhost";
    }
    else {
      this.host = logstashHost;
    }
    if (isNull(logstashPort)) {
      this.port = process.env.LOGSTASH_PORT ? parseInt(process.env.LOGSTASH_PORT) : 9500;
    }
    else {
      this.port = (typeof logstashPort === 'string') ? parseInt(logstashPort) : logstashPort;

    }
    this.initializeRequestOptions();
  }

  private initializeRequestOptions() {
    this.requestOptions = {
      host: this.host,
      port: this.port,
      path: "",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': null
      }
    }
  }

  private setContentLength(body: object | string) {
    var stringBody = body instanceof String ? body : JSON.stringify(body);
    this.requestOptions["headers"]["Content-Length"] = stringBody;
  }

  public makePost(body: object, callback: any) {
    var stringBody = JSON.stringify(body);
    this.setContentLength(stringBody);
    var successfull = false;
    const req = http.request(this.requestOptions, (res: any) => {
      console.log(res.statusCode);  
      res.on('data', (d: any) => {
        console.log(d);
      });
      res.on('end',() => {
        callback(true);
      });
    });

    req.on('error', (error) => {
      console.log(error);
      callback(false);
    });

    req.end();
  }
}

export default LogstashClient;