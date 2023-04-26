import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      times: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.TIME),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });

    await queryInterface.createTable('Shows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      movieId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Movies',
          key: 'id',
        },
      },
      showroomId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'ShowRooms',
          key: 'id',
        },
      },
      isBookedOut: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      startTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      endTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });

    await queryInterface.createTable('Showrooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cinemaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      movie_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Movies',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });

    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      showroomId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'ShowRooms',
          key: 'id',
        },
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM('regular', 'vip', 'couple', 'super_vip'),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });

    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      showId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Shows',
          key: 'id',
        },
      },
      seatId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });

  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('Bookings');
    await queryInterface.dropTable('Seats');
    await queryInterface.dropTable('Showrooms');
    await queryInterface.dropTable('Shows');
    await queryInterface.dropTable('Movies');
  },
};