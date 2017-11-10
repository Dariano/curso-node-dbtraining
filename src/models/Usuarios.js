const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define('Usuarios', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      }, {
        hooks: {
          beforeCreate: (usuario) => {
            const salt = bcrypt.genSaltSync();
            usuario.set('password', bcrypt.hashSync(usuario.password, salt));
          },
        },
        classMethods: {
          isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
        },
      })
    
      return Usuarios;
}