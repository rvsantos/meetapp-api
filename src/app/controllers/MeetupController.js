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

    const checkFileExists = await File.findByPk(file_id);

    if (!checkFileExists) {
      return res.status(400).json({ errors: 'File does exists' });
    }

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
}

export default new MeetupController();
