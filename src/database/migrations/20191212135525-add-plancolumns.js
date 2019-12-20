module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('registrations', 'plan_id', {
      type: Sequelize.INTEGER,

      references: { model: 'memberships', key: 'id' },
      onUpdate: 'CASCADE', // caso o conteúdo seja alterado.
      onDelete: 'SET NULL', // caso em algum momento o conteúdo seja deletado.
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('students', 'plan_id');
  },
};
