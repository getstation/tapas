const { Observable } = require("rxjs");

module.exports = (stream) =>
  new Observable((observer) => {
    const dataHandler = (data) => {
      observer.next(data);
    };

    const errorHandler = (err) => {
      observer.error(err);
    };

    const endHandler = () => {
      observer.complete();
    };

    stream.addListener("data", dataHandler);
    stream.addListener("error", errorHandler);
    stream.addListener("end", endHandler);

    return () => {
      stream.removeListener("data", dataHandler);
      stream.removeListener("error", errorHandler);
      stream.removeListener("end", endHandler);
    };
  });
