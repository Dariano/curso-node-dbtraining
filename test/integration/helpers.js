const supertest = require('supertest')
const chai = require('chai')
const app = require('../../src/app')
const models = require('../../src/models')
const config = require('../../src/config/config')[process.env.NODE_ENV]

global.app = app
global.request = supertest(app)
global.expect = chai.expect
global.config = config
global.models = models