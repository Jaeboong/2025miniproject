'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // 1. 먼저 studies 테이블이 존재하는지 확인
      const tables = await queryInterface.showAllTables();
      if (tables.includes('studies')) {
        console.log('studies 테이블이 이미 존재합니다.');
        return;
      }

      // 2. problems 테이블의 컬럼 존재 여부 확인 후 제거
      const problemColumns = await queryInterface.describeTable('problems');
      
      if (problemColumns.solved_at) {
        await queryInterface.removeColumn('problems', 'solved_at');
      }
      if (problemColumns.user_answer) {
        await queryInterface.removeColumn('problems', 'user_answer');
      }
      if (problemColumns.is_correct) {
        await queryInterface.removeColumn('problems', 'is_correct');
      }
      if (problemColumns.attempt_count) {
        await queryInterface.removeColumn('problems', 'attempt_count');
      }

      // 3. studies 테이블 생성
      await queryInterface.createTable('studies', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        member_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'members',
            key: 'member_id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        problem_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'problems',
            key: 'problem_id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        is_correct: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        subject: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        question: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        answer: {
          type: Sequelize.STRING(5),
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });

      console.log('마이그레이션이 성공적으로 완료되었습니다.');
    } catch (error) {
      console.error('마이그레이션 중 오류 발생:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // 1. studies 테이블이 존재하는지 확인 후 삭제
      const tables = await queryInterface.showAllTables();
      if (tables.includes('studies')) {
        await queryInterface.dropTable('studies');
      }

      // 2. problems 테이블의 컬럼 존재 여부 확인 후 추가
      const problemColumns = await queryInterface.describeTable('problems');
      
      if (!problemColumns.solved_at) {
        await queryInterface.addColumn('problems', 'solved_at', {
          type: Sequelize.DATE,
          allowNull: true
        });
      }
      if (!problemColumns.user_answer) {
        await queryInterface.addColumn('problems', 'user_answer', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      if (!problemColumns.is_correct) {
        await queryInterface.addColumn('problems', 'is_correct', {
          type: Sequelize.BOOLEAN,
          allowNull: true
        });
      }
      if (!problemColumns.attempt_count) {
        await queryInterface.addColumn('problems', 'attempt_count', {
          type: Sequelize.INTEGER,
          defaultValue: 0
        });
      }

      console.log('롤백이 성공적으로 완료되었습니다.');
    } catch (error) {
      console.error('롤백 중 오류 발생:', error);
      throw error;
    }
  }
}; 