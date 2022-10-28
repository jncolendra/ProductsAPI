'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    'product',
    {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      product_name: 'string',
      product_sku: { type: 'string', unique: true },
      product_description: 'string',
      product_image: 'string',
      product_category: 'string',
    },
    callback,
  );
};

exports.down = function (db, callback) {
  db.dropTable('product', { ifExists: true }, callback);
};

exports._meta = {
  version: 1,
};
