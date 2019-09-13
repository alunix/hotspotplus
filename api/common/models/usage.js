'use strict'
var app = require('../../server/server')
var utility = require('../../server/modules/utility')
var Q = require('q')
var kafka = require('kafka-node')
var config = require('../../server/modules/config.js')
var logger = require('../../server/modules/logger')
var log = logger.createLogger()
var _ = require('underscore')
var kafkaClient = new kafka.KafkaClient({
  kafkaHost: process.env.KAFKA_IP + ':' + process.env.KAFKA_PORT
})
const db = require('../../server/modules/db.factory')

var kafkaProducer = new kafka.Producer(kafkaClient, {partitionerType: 2})
var redis = require('redis')
var redisClient = redis.createClient(config.REDIS.PORT, config.REDIS.HOST)

kafkaProducer.on('ready', function () {
  log.warn('Producer ready...')
  kafkaClient.refreshMetadata([config.ACCOUNTING_TOPIC], function (error) {
    log.debug('@refreshMetadata Error:', error)
  })
})

kafkaProducer.on('error', function (error) {
  log.error('Producer preparation failed:', error)
})

module.exports = function (Usage) {

  Usage.calculateUsage = async (sessionId, usage) => {
    let {upload, download, sessionTime} = usage
    const previewsUsage = await Usage.getUsageFromCache(sessionId)
    if (previewsUsage) {
      upload = upload - previewsUsage.upload
      download = download - previewsUsage.download
      sessionTime = sessionTime - previewsUsage.sessionTime
    }
    return {upload, download, sessionTime}
  }

  Usage.getUsage = async (startDate, endDate, ctx) => {
    var businessId = ctx.currentUserId
    const result = await db.getBusinessUsage(businessId,startDate,endDate);
    return result;
  }

  Usage.remoteMethod('getUsage', {
    description: 'Get usage report.',
    accepts: [
      {
        arg: 'startDate',
        type: 'number',
        required: true,
        description: 'Start Date',
      },
      {
        arg: 'endDate',
        type: 'number',
        required: true,
        description: 'End Date',
      },
      {arg: 'options', type: 'object', http: 'optionsFromRequest'},
    ],
    returns: {root: true}
  })

  Usage.reportStatus = async () => {
    const dbInfo = await db.getDatabaseInfo();
    const info = {};
    for(const tb of dbInfo){
      info[tb.table] = tb
    }
    return {
      db:info
    };
  }

  Usage.remoteMethod('reportStatus', {
    description: 'Get report.',
    accepts: [],
    returns: {root: true}
  })

  Usage.getTopMembers = async (startDate, endDate, ctx) => {

    var businessId = ctx.currentUserId
    var fromDate = Number.parseInt(startDate)
    var toDate = Number.parseInt(endDate)
    const limit = 10
    const skip = 0

    const result = await db.getTopMembersByUsage(
      businessId,
      fromDate,
      toDate,
      limit,
      skip
    )
    const username = [];
    const upload = [];
    const download = [];
    const sessionTime = [];
    for(const res of result){
      username.push(res.username)
      upload.push(Number(res.upload))
      download.push(Number(res.download))
      sessionTime.push(Number(res.sessionTime))
    }
    return {
      username,
      upload,
      download,
      sessionTime
    }
  }

  Usage.remoteMethod('getTopMembers', {
    description: 'Get Top Members.',
    accepts: [
      {
        arg: 'startDate',
        type: 'number',
        required: true,
        description: 'Start Date',
      },
      {
        arg: 'endDate',
        type: 'number',
        required: true,
        description: 'End Date',
      },
      {arg: 'options', type: 'object', http: 'optionsFromRequest'},
    ],
    returns: {root: true}
  })

  Usage.cacheUsage = function (usage) {
    return Q.promise((resolve, reject) => {
      redisClient.set(
        usage.sessionId,
        JSON.stringify(usage),
        'EX',
        3600
        , function (error) {
          if (error) {
            log.error('failed to cache usage', error)
            throw new Error(error)
          }
          return resolve()
        })
    })
  }

  Usage.getUsageFromCache = function (sessionId) {
    return Q.promise((resolve, reject) => {
      redisClient.get(sessionId, (error, usage) => {
        if (error) {
          log.error(`failed to get usage from cache by id: ${sessionId}`)
          throw new Error(error)
        }
        if (!usage) {
          log.warn('previews session is empty');
          return resolve()
        }
        return resolve(JSON.parse(usage))
      })
    })
  }

}
