module.exports = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      const next = args[args.length - 1];

      if (typeof next === 'function') {
        return next(error);
      }

      throw error;
    }
  };
};
