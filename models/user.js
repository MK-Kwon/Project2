module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define("User", {
        first: DataTypes.STRING,
        last: DataTypes.STRING,
        email: DataTypes.STRING
    });
    return User;
};
