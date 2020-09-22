module.exports = function(sequelize, DataTypes) {
    const Vehicle = sequelize.define("Vehicle", {
        category: DataTypes.STRING,
		make: DataTypes.STRING,
		model: DataTypes.STRING,
		series: DataTypes.STRING,
		plantCountry: DataTypes.STRING,
		year: DataTypes.INTEGER
    });

    Vehicle.associate = function(model) {
        Vehicle.belongsTo(model.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Vehicle;
};