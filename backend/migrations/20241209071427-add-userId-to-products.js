'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',  // Tên bảng users
        key: 'id'        // Trỏ tới cột id của bảng users
      },
      onDelete: 'CASCADE'  // Khi user bị xóa, các sản phẩm liên quan cũng bị xóa
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'userId');
  }
};

