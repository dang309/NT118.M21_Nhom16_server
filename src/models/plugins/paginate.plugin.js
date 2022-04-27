/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filters, options) {
    let sort = 'createdAt';
    const actualFilters = {};
    let limit = 10;
    let page = 1;
    let skip = 0;
    if (options) {
      if (options.sortBy) {
        const sortingCriteria = [];
        options.sortBy.split(',').forEach((sortOption) => {
          const [key, order] = sortOption.split(':');
          sortingCriteria.push((order === 'desc' ? '-' : '') + key);
        });
        sort = sortingCriteria.join(' ');
      }

      limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
      page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
      skip = (page - 1) * limit;
    }

    if (filters && filters.length) {
      JSON.parse(filters).forEach((filter) => {
        switch (filter.operator) {
          case '=':
            return Object.assign(actualFilters, { [filter.key]: filter.value });
          case '>':
            return Object.assign(actualFilters, { [filter.key]: { $gt: filter.value } });
          case '>=':
            return Object.assign(actualFilters, { [filter.key]: { $gte: filter.value } });
          case '<':
            return Object.assign(actualFilters, { [filter.key]: { $lt: filter.value } });
          case '<=':
            return Object.assign(actualFilters, { [filter.key]: { $lte: filter.value } });
          case 'regex':
            return Object.assign(actualFilters, { [filter.key]: { $regex: filter.value, $options: 'i' } });
          default:
            return actualFilters;
        }
      });
    }

    const countPromise = this.countDocuments(actualFilters).exec();
    let docsPromise = this.find(actualFilters).sort(sort).skip(skip).limit(limit);

    if (options && options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
