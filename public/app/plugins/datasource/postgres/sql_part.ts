import { SqlPartDef, SqlPart } from 'app/core/components/sql_part/sql_part';

let index = [];

function createPart(part): any {
  let def = index[part.type];
  if (!def) {
    return null;
  }

  return new SqlPart(part, def);
}

function register(options: any) {
  index[options.type] = new SqlPartDef(options);
}

register({
  type: 'column',
  style: 'label',
  params: [{ type: 'column', dynamicLookup: true }],
  defaultParams: ['value'],
});

register({
  type: 'expression',
  style: 'expression',
  label: 'Expr:',
  params: [
    { name: 'left', type: 'string', dynamicLookup: true },
    { name: 'op', type: 'string', dynamicLookup: true },
    { name: 'right', type: 'string', dynamicLookup: true },
  ],
  defaultParams: ['value', '=', 'value'],
});

register({
  type: 'macro',
  style: 'label',
  label: 'Macro:',
  params: [],
  defaultParams: [],
});

register({
  type: 'aggregate',
  style: 'label',
  params: [{ name: 'name', type: 'string', dynamicLookup: true }],
  defaultParams: ['avg'],
});

register({
  type: 'alias',
  style: 'label',
  params: [{ name: 'name', type: 'string', quote: 'double' }],
  defaultParams: ['alias'],
});

register({
  type: 'time',
  style: 'function',
  label: 'time',
  params: [
    {
      name: 'interval',
      type: 'interval',
      options: ['$__interval', '1s', '10s', '1m', '5m', '10m', '15m', '1h'],
    },
    {
      name: 'fill',
      type: 'string',
      options: ['none', 'NULL', '0'],
    },
  ],
  defaultParams: ['$__interval', 'none'],
});

register({
  type: 'special',
  style: 'label',
  params: [
    {
      name: 'function',
      type: 'string',
      options: ['increase', 'rate'],
    },
  ],
  defaultParams: ['increase'],
});

export default {
  create: createPart,
};
