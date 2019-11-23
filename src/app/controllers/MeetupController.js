import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number()
        .positive()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, location, date, file_id } = req.body;

    if (isBefore(parseISO(date), new Date())) {
      return res.status(400).json({ error: 'Past date are invalid' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      file_id,
      user_id: req.userId
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      file_id: Yup.number().positive()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const checkMeetupExist = await Meetup.findByPk(id);

    if (!checkMeetupExist) {
      return res.status(400).json({ errors: 'Meetup does not exists' });
    }

    const { date } = req.body;

    if (isBefore(parseISO(date), new Date())) {
      return res.status(400).json({ error: 'Past date are invalid' });
    }

    if (req.userId !== checkMeetupExist.user_id) {
      return res
        .status(400)
        .json({ error: 'You not are the owner this profile' });
    }

    const meetup = await checkMeetupExist.update(req.body);

    return res.json(meetup);
  }
}

export default new MeetupController();
