'use strict';

const createError = require('http-errors');
const expect = require('chai').expect;
const sinon = require('sinon');

const errorHandler = require('../../../src/middleware/errorHandler');

describe.only('Error handler middleware - errorHandler.js', function root() {
  it('should just call next (no error passed)', function test() {
    const resStub = sinon.spy();
    const req = {
      logger: {
        error: sinon.stub()
      }
    };
    const middleware = errorHandler();

    middleware(null, req, resStub, () => {
      expect(resStub.callCount).to.equal(0);
      expect(req.logger.error.callCount).to.equal(0);
    });
  });

  describe('4XX Errors', function() {
    it('should not log the error (400)', function test(done) {
      const req = {
        logger: {
          error: sinon.stub()
        }
      };
      const res = {
        status: () => { return res; },
        json: payload => {
          expect(payload).to.have.property('detail', 'Bad Request');
          expect(statusSpy.callCount).to.equal(1);
          expect(jsonSpy.callCount).to.equal(1);
          expect(req.logger.error.callCount).to.equal(0);

          done();
        },
        send: () => {}
      };

      const statusSpy = sinon.spy(res, 'status');
      const jsonSpy = sinon.spy(res, 'json');

      const middleware = errorHandler();
      const error = createError(400);

      middleware(error, req, res);
    });

    it('should not log the error (401)', function test(done) {
      const req = {
        logger: {
          error: sinon.stub()
        }
      };
      const res = {
        status: () => { return res; },
        json: payload => {
          expect(payload).to.have.property('detail', 'Unauthorized');
          expect(statusSpy.callCount).to.equal(1);
          expect(jsonSpy.callCount).to.equal(1);
          expect(req.logger.error.callCount).to.equal(0);

          done();
        },
        send: () => {}
      };

      const statusSpy = sinon.spy(res, 'status');
      const jsonSpy = sinon.spy(res, 'json');

      const middleware = errorHandler();
      const error = createError(401);

      middleware(error, req, res);
    });

    it('should not log the error (403)', function test(done) {
      const req = {
        logger: {
          error: sinon.stub()
        }
      };
      const res = {
        status: () => { return res; },
        json: payload => {
          expect(payload).to.have.property('detail', 'Forbidden');
          expect(statusSpy.callCount).to.equal(1);
          expect(jsonSpy.callCount).to.equal(1);
          expect(req.logger.error.callCount).to.equal(0);

          done();
        },
        send: () => {}
      };

      const statusSpy = sinon.spy(res, 'status');
      const jsonSpy = sinon.spy(res, 'json');

      const middleware = errorHandler();
      const error = createError(403);

      middleware(error, req, res);
    });
  });
});
