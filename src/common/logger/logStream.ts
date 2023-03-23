const chalk = require('chalk');
const dayjs = require('dayjs');
const split = require('split2');
const JSONParse = require('fast-json-parse');

const levels = {
  [60]: 'Fatal',
  [50]: 'Error',
  [40]: 'Warn',
  [30]: 'Info',
  [20]: 'Debug',
  [10]: 'Trace',
};

const colors = {
  [60]: 'megenta',
  [50]: 'red',
  [40]: 'yellow',
  [30]: 'blue',
  [20]: 'green',
  [10]: 'white',
};

interface ILogStream {
  format?: () => void
}

export class LogStream {
  public trans;
  private customFormat;

  constructor(options?: ILogStream) {
    this.trans = split((data) => {
      this.log(data);
    });
  }

  log(data) {
    data = this.jsonParse(data);
    const level = data.level || 30;
    data = this.format(data);
    console.log(chalk[colors[level]](data));
  }

  jsonParse(data) {
    const parsed = JSONParse(data);
    if (parsed.err) {
      return data;
    }
    return parsed.value;
  }

  format(data) {
    if (this.customFormat) {
      return this.customFormat(data);
    }

    const level = levels[data.level] || 'Info';
    const time = dayjs(data.time).format('YYYY-MM-DD HH:mm:ss.SSS A');
    const logId = data.logId || '_logId_';

    let reqInfo = '[-]';

    if (data.req) {
      reqInfo = `[${data.req.remoteAddress || ''} - ${data.req.method} - ${data.req.url}]`;
    }

    if (data.res) {
      reqInfo = JSON.stringify(data.res);
    }

    if (data?.req?.url && data?.req?.url.indexOf('/api/doc') > -1) {
      return null;
    }

    return `[${level}] [${time}] [${logId}] ${reqInfo} | ${data.stack || data.msg}`;
  }
}
