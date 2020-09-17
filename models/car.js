module.exports = function(sequelize, DataTypes) {
    const Car = sequelize.define("Car", {
        make: DataTypes.STRING,
		model: DataTypes.STRING,
		series: DataTypes.STRING,
		plantCountry: DataTypes.STRING,
		year: DataTypes.INTEGER
    });
    return Car;
};

