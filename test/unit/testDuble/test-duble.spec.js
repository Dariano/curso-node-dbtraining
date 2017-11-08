const sinon = require('sinon')
const UsersController = require('./users-controller')
const Database = require('./database')

describe('Test Double', () => {
    describe('FAKE - - UsersController getAll()', () => {
        it('deve retornar uma lista de usuarios', () => {
            const expectedDatabaseResponse = [{
                id: 1,
                name: 'John Doe',
                email: 'john@mail.com'
            }];

            const fakeDatabase = {
                findAll() {
                    return expectedDatabaseResponse;
                }
            }
            const usersController = new UsersController(fakeDatabase);
            const response = usersController.getAll();

            expect(response).to.be.eql(expectedDatabaseResponse);
        });
    });

    describe('SPY - UsersController getAll()', () => {
        it('deve chamar findAll do database com os parâmetros corretos', () => {
            const findAll = sinon.spy(Database, 'findAll');

            const usersController = new UsersController(Database);
            usersController.getAll();

            sinon.assert.calledWith(findAll, 'users');
            findAll.restore();
        });
    });

    describe('STUB - UsersController getAll()', () => {
        it('deve retornar uma lista de usuarios', () => {
          const expectedDatabaseResponse = [{
            id: 1,
            name: 'John Doe',
            email: 'john@mail.com'
          }];
      
          const findAll = sinon.stub(Database, 'findAll');
          findAll.withArgs('users').returns(expectedDatabaseResponse);
      
          const usersController = new UsersController(Database);
          const response = usersController.getAll();
      
          sinon.assert.calledWith(findAll, 'users');
          expect(response).to.be.eql(expectedDatabaseResponse);
          findAll.restore();
        });
      });

      describe('MOCK - UsersController getAll()', () => {
        it('deve chamar o database com os parâmetros corretos', () => {
          const databaseMock = sinon.mock(Database);
          databaseMock.expects('findAll').once().withArgs('users');
      
          const usersController = new UsersController(Database);
          usersController.getAll();
      
          databaseMock.verify();
          databaseMock.restore();
        });
      });
});