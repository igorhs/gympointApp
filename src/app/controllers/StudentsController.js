import Student from '../models/Students';

class StudentsController {
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'This student is already enrolled' });
    }

    const { name, email, age, weight, height } = await Student.create(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const student = await Student.findOne({ where: { email: req.body.email } });

    if (!student) {
      return res.status(400).json({ error: 'This e-mail does not exist' });
    }

    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentsController();
