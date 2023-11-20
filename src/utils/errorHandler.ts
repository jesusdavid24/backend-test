function errorHandler(exception: unknown) {
  const message =
    typeof exception === 'string'
      ? exception.toUpperCase()
      : exception instanceof Error
      ? exception.message
      : 'Something was wrong';

  return message;
}

export default errorHandler;