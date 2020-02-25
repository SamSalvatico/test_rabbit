import http from 'http';
import { isNull } from 'util';
import * as dotenv from 'dotenv';
import Utils from './Utils';

class LogstashClient {
  private host: string;
  private protocol: string;
  private port: number;
  private requestOptions: any;

  constructor(logstashProtocol: string | null = null, logstashHost: string | null = null, logstashPort: string | number | null = null) {
    dotenv.config();
    this.protocol = Utils.getPropertyValueComparing(logstashProtocol, "LOGSTASH_PROTOCOL", "http");
    this.host = Utils.getPropertyValueComparing(logstashHost, "LOGSTASH_HOST", "localhost");
    this.port = parseInt(
      Utils.getPropertyValueComparing(logstashPort, "LOGSTASH_PORT", "9500")
    );
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
      res.on('end', () => {
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