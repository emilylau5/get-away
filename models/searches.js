module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    userId: DataTypes.INTEGER,
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    queryString: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });
  //associate search with hotels
  Search.associate = function(models) {
    Search.hasMany(models.Hotel, {
      onDelete : "cascade"
    });
  };

  return Search;
}