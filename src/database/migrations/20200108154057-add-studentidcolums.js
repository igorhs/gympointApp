module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('help_orders', 'student_id', {
      type: Sequelize.INTEGER,

      references: { model: 'students', key: 'id' },
      onUpdate: 'CASCADE', // caso o conteúdo seja alterado.
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('students', 'student_id');
  },
};
