import { format } from 'date-fns';
import en from 'date-fns/locale/en-US';
import Help from '../models/HelpOrders';
import MailAnswer from '../../lib/MailAnswer';
import Student from '../models/Students';

class AnswerController {
  async index(req, res) {
    const questionbyUser = await Help.findAll({
      where: {
        student_id: req.params.id,
      },
    });

    return res.json(questionbyUser);
  }

  async store(req, res) {
    const checkQuestion = await Help.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!checkQuestion) {
      return res.status(400).json({
        error: 'This help order does not exist. Please, try again.',
      });
    }

    const date = new Date();

    await checkQuestion.update({
      answer: req.body.answer,
      answer_at: date,
    });

    const student = await Student.findOne({
      where: {
        id: checkQuestion.student_id,
      },
    });

    await MailAnswer.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Our team have just replied you!',
      template: 'answer',
      context: {
        student: student.name,
        question: checkQuestion.question,
        answer: checkQuestion.answer,
        answer_at: format(checkQuestion.answer_at, "MMMM', 'dd', 'yyyy", {
          locale: en,
        }),
      },
    });

    return res.json(checkQuestion);
  }
}

export default new AnswerController();
