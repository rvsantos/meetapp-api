import { isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import Signup from '../models/Signup';

class SignupController {
  async store(req, res) {
    const { id } = req.params;

    const meetupExists = await Meetup.findByPk(id);

    if (!meetupExists) {
      return res.status(400).json({ errors: 'Meetup does not exists.' });
    }

    if (isBefore(meetupExists.date, new Date())) {
      return res.status(400).json({ errors: 'Registration closed' });
    }

    const duplicateSignup = await Signup.findOne({
      where: {
        meetup_id: id,
        user_id: req.userId
      }
    });

    if (duplicateSignup) {
      return res
        .status(400)
        .json({ error: 'You already sign up on this meetup' });
    }

    const duplicateDate = await Signup.findAndCountAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          attributes: ['id', 'title', 'date'],
          where: { date: meetupExists.date }
        }
      ]
    });

    if (duplicateDate.count > 0) {
      return res
        .status(400)
        .json({ errors: 'You can only sign up for one meetup at same day.' });
    }

    const signup = await Signup.create({
      meetup_id: id,
      user_id: req.userId
    });

    return res.json(signup);
  }
}

export default new SignupController();
