import bunyan from "bunyan"

var log = bunyan.createLogger({
  name: "ssip", // Required
  level: "info", // Optional, see "Levels" section
  streams: [
    {
      level: "debug",
      stream: process.stdout
    }
  ],
  serializers: {
    req: bunyan.stdSerializers.req,
    err: bunyan.stdSerializers.err
  }
})

export default log
