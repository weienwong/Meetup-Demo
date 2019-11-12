const SDK = require('@zesty-io/sdk')
const https = require('https')

require('dotenv').config()

const DEV_TOKEN = process.env.DEV_TOKEN
const INSTANCE_ZUID = process.env.INSTANCE_ZUID
const MODEL_ZUID = process.env.MODEL_ZUID

const sdk = new SDK(INSTANCE_ZUID, DEV_TOKEN)
// create a new item
const payload = {
  data: {
    moisture: Math.random() * 100
  }
}

async function publishItem (instanceZUID, modelZUID, itemZUID, version) {
  const options = {
    method: 'POST',
    hostname: `${instanceZUID}.api.zesty.io`,
    path: `/v1/content/models/${modelZUID}/items/${itemZUID}/publishings`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEV_TOKEN}`
    }
  }

  const req = https.request(options, function (res) {
    const chunks = []

    res.on('data', function (chunk) {
      chunks.push(chunk)
    })

    res.on('end', function (chunk) {
      const body = Buffer.concat(chunks)
      console.log(body.toString())
    })

    res.on('error', function (error) {
      console.error(error)
    })
  })

  const postData = {
    version: version,
    publishAt: 'now',
    unpublishAt: '2019-12-31'
  }
  req.write(JSON.stringify(postData))
  req.end()
}

setInterval(() => {
  const payload = {
    data: {
      moisture: `${Math.random() * 100}`
    }
  }

  sdk.instance.createItem(MODEL_ZUID, payload).then(res => {
    if (res.statusCode === 201) {
      const itemZUID = res.data.ZUID
      publishItem(INSTANCE_ZUID, MODEL_ZUID, itemZUID, 1)
    } else {
      console.error('failed to create item')
      console.error(res)
    }
  })
}, 5000)
