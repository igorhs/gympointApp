import { addMonths, parseISO, isBefore, format } from 'date-fns';
import en from 'date-fns/locale/en-US';
// import * as Yup from 'yup';
import Registration from '../models/Registrations';
import Membership from '../models/Memberships';
import Student from '../models/Students';
import Mail from '../../lib/Mail';

class RegistrationController {
  async store(req, res) {
    /* const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    } */

    const { student_id, plan_id, start_date } = req.body;

    const checkPlan = await Membership.findOne({
      where: {
        id: plan_id,
      },
    });

    if (!checkPlan) {
      return res
        .status(400)
        .json({ error: 'This membership plan does not exist.' });
    }

    const checkStudent = await Student.findOne({
      where: { id: student_id },
    });

    if (!checkStudent) {
      return res.status(400).json({ error: 'This student was not registred.' });
    }

    const checkStudentAvaiability = await Registration.findOne({
      where: {
        student_id,
        plan_id,
      },
    });

    if (checkStudentAvaiability) {
      return res
        .status(400)
        .json({ error: 'This student is already enrolled.' });
    }

    if (isBefore(parseISO(start_date), new Date())) {
      res.status(400).json({ error: 'Past dates are not allowed.' });
    }

    const monthlyFee = checkPlan.duration * checkPlan.price;
    const date = addMonths(parseISO(start_date), checkPlan.duration);

    const registration = await Registration.create({
      plan_id,
      student_id,
      price: monthlyFee,
      start_date,
      end_date: date,
    });

    await Mail.sendMail({
      to: `${checkStudent.name} <${checkStudent.email}>`,
      subject: 'Now you are ready!',
      template: 'registration',
      context: {
        student: checkStudent.name,
        plan: checkPlan.title,
        price: checkPlan.price,
        end_date: format(registration.end_date, "MMMM', 'dd', 'yyyy", {
          locale: en,
        }),
      },
    });

    return res.json(registration);
  }

  async index(req, res) {
    const listRegistrations = await Registration.findAll();

    return res.json(listRegistrations);
  }

  async update(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      res.status(400).json({ error: 'This registration does not exist' });
    }

    const { plan_id } = req.body;

    const checkPlan = await Membership.findOne({
      where: {
        id: plan_id,
      },
    });

    if (!checkPlan) {
      return res
        .status(400)
        .json({ error: 'This membership plan does not exist.' });
    }

    const monthlyFee = checkPlan.duration * checkPlan.price;
    const date = addMonths(
      new Date(registration.start_date),
      checkPlan.duration
    );

    await Registration.update(
      {
        plan_id,
        price: monthlyFee,
        end_date: date,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      res.status(400).json({ error: 'This registration does not exist' });
    }

    await Registration.destroy({
      where: { id: req.params.id },
    });

    return res.json();
  }
}

export default new RegistrationController();
