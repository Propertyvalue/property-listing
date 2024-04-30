'use strict';

/**
 * buy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::buy.buy');
