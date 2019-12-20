module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('registrations', 'student_id', {
      type: Sequelize.INTEGER,

      references: { model: 'students', key: 'id' },
      onUpdate: 'CASCADE', // caso o conteúdo seja alterado.
      onDelete: 'SET NULL', // caso em algum momento o conteúdo seja deletado.
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('students', 'student_id');
  },
};
