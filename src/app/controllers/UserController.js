import User from '../models/user';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = req.body;

    return res.status(201).json({
      id,
      name,
      email
    });
  }
}

export default new UserController();
