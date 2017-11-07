const supertest = require('supertest')
const chai = require('chai')
const Joi = require('joi')
const joiAssert = require('joi-assert')
const models = require('../../src/models')
const app = require('../../src/app')

global.app = app
global.request = supertest(app)
global.expect = chai.expect
global.models = models
global.Joi = Joi
global.joiAssert = joiAssert