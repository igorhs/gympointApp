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

    console.log(date);

    const countCheckins = await Checkins.findAll({
      where: {
        student_id: checkRegistration,
        [Op.between]: [startOfWeek(parseISO(date)), endOfWeek(parseISO(date))],
      },
      limit: 5,
    });

    console.log(countCheckins);

    if (countCheckins.count() > 5) {
      return res
        .status(400)
        .json({ error: 'You exceeded entrance number in a week.' });
    }

    const checkin = await Checkins.create({
      student_id: checkRegistration,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
