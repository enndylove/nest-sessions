import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as useragent from 'useragent'; 
import { Request } from 'express';
import * as crypto from 'node:crypto'

@Injectable()
export class SessionService {
  async generateSessionId(): Promise<object> {
    const id = uuidv4();
    const secret = crypto.createSecretKey(Buffer.from(id, 'utf-8'));
    let hmac = crypto.createHmac('md5', secret);
    let hash = hmac.update(id).digest('hex');
    return {
      id,
      hash
    };
  }

  async getDeviceInfo(req: Request): Promise<Record<string, any>> {
    const userAgent = useragent.parse(req.headers['user-agent'] || '');
    return {
      ip: req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress,
      headers: req.headers,
      cookies: req.cookies,
      userAgent: {
        browser: userAgent.family,
        version: userAgent.toVersion(),
        os: userAgent.os.family,
        device: userAgent.device.family,
      },
    };
  }
}
