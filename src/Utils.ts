import http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

class Utils {


  /**
   * If valueToSet is not empty set it, 
   * otherwise check env key otherwise sets defaultValue
   * 
   * setProperty
   */
  static getPropertyValueComparing(
    valueToSet: any,
    envPropertyNameToCheck: string,
    defaultValue: any = null
  ): any {
    if (valueToSet === null || valueToSet === undefined) {
      valueToSet = Reflect.has(process.env, envPropertyNameToCheck) ?
        Reflect.get(process.env, envPropertyNameToCheck) :
        defaultValue;
    }
    return valueToSet;
  }
}

export default Utils;