import Help from '../models/HelpOrders';
import Student from '../models/Students';

class HelpOrderController {
  async store(req, res) {
    const checkStudent = await Student.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!checkStudent) {
      return res.status(400).json({
        error:
          'You are not registered, so you are not allowed to make a help order.',
      });
    }

    const { question } = req.body;

    const help = await Help.create({
      question,
      student_id: checkStudent.id,
    });

    return res.json(help);
  }

  async index(req, res) {
    const unanswered = await Help.findAll({
      where: {
        answer: null,
      },
    });

    return res.json(unanswered);
  }
}

export default new HelpOrderController();
