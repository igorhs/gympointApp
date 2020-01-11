import { startOfWeek, endOfWeek, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Checkins from '../models/Checkins';
import Registration from '../models/Registrations';

class CheckinController {
  async store(req, res) {
    const checkRegistration = await Registration.findOne({
      where: {
        student_id: req.params.id,
      },
    });

    if (!checkRegistration) {
      return res.status(400).json({
        error:
          'Check-in was not allowed. Please, register so you can get in the gym.',
      });
    }
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date.' });
    }

    const countCheckins = await Checkins.findAndCountAll({
      where: {
        student_id: checkRegistration.student_id,
      },
      [Op.between]: [startOfWeek(parseISO(date)), endOfWeek(parseISO(date))],
    });

    if (countCheckins.count > 4) {
      return res
        .status(400)
        .json({ error: 'You exceeded entrance number in a week.' });
    }

    const checkin = await Checkins.create({
      student_id: checkRegistration.student_id,
    });

    return res.json(checkin);
  }

  async index(req, res) {
    const checkRegistration = await Registration.findOne({
      where: {
        student_id: req.params.id,
      },
    });

    if (!checkRegistration) {
      return res.status(400).json({
        error:
          'This registration does not exist. Please, register so you can check in the gym.',
      });
    }

    const listCheckins = await Checkins.findAll({
      where: {
        student_id: checkRegistration.student_id,
      },
    });

    return res.json(listCheckins);
  }
}

export default new CheckinController();
