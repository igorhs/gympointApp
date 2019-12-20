import Membership from '../models/Memberships';

class MembershipController {
  async store(req, res) {
    const { title, duration, price } = await Membership.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async index(req, res) {
    const membership = await Membership.findAll();

    return res.json(membership);
  }

  async update(req, res) {
    const membership = await Membership.findOne({
      where: { title: req.body.title },
    });

    if (!membership) {
      res.status(400).json({ error: 'This membership plan does not exist' });
    }

    const { title, duration, price } = await membership.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    await Membership.destroy({
      where: { id: req.params.id },
    });

    return res.json();
  }
}

export default new MembershipController();
