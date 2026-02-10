import { Router } from 'express';

export const downloadRouter = Router();

downloadRouter.get('/:id', (req, res) => {
  // TODO: Implement report download
  res.json({ message: `Download for analysis ${req.params.id}` });
});
